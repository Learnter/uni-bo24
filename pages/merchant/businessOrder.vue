<template>
  <view>
    <view class="topsbgydaBox">
      <view class="topsbgyCont">
        <view class="uni-padding-wrap uni-common-mt">
          <uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
            :activeColor="activeColor"></uni-segmented-control>
        </view>
      </view>
    </view>
    <view class="findcontBox">
      <view>
        <view class="myordListBox" v-for="(oItem,oIndex) in orderList" :key="oIndex">
          <view class="myordLitl">
            <view class="myordLitlimg">{{i18n.orderNum}}：{{oItem.order_sn}}</view>
            <view class="myordLitlzt">{{oItem.status}}</view>
          </view>
          <view class="dandcaList" v-for="(cItem,cIndex) in oItem.goods" :key="cIndex" @click="orderDetail(oItem)">
            <view class="dandcaLiimg">
              <image :src="cItem.picture" lazy-load ></image>
            </view>
            <view class="dandcaLiCont">
              <view class="dandcaLitl">{{cItem.goods_name}}</view>
              <view class="shuljge">
                <view class="danshu">X{{cItem.goods_num}}</view>
                <view class="danjie">￥{{cItem.shop_price}}</view>
              </view>
            </view>
          </view>
          <view class="gdshshpBox">
            <text class="text_1">{{i18n.common}}&nbsp;{{oItem.total_num}}&nbsp;{{i18n.itmes}}</text>
            <text class="text_2">{{i18n.sum}}：</text>
            <text class="text_3">￥{{oItem.order_amount}}</text>
          </view>
          <view class="gdsdbczBox" v-show="oItem.status_type == 2">
            <view class="uni-flex logistics" style="padding-bottom:16rpx;">
              <text>{{i18n.LogisticsNum}}：</text>
              <input ref="input1" placeholder-class="uni-ellipsis" class="logisticsNum uni-flex-item" type="number" :placeholder="holder.logisticsNum"  @blur="InputSerialNumber" />
            </view>
			<view class="uni-flex">
			   <view class="uni-flex logistics flx1">
			     <text>{{i18n.LogisticsName}}：</text>
			     <input ref="input2" placeholder-class="uni-ellipsis"  class="logisticsNum uni-flex-item" type="text" :placeholder="holder.logisticsName"  @blur="InputConpanyName" />
			   </view>
			   <view class="sendConfim" @click="sendOrder(oItem,oIndex)">{{i18n.cf_delivery}}</view>
			</view>
            
          </view>
         <!-- <view class="gdsdbczBox" v-show="oItem.status_type == 3">
            <view class="gdsdbcTwo" @tap="comfirmOrder(oItem,oIndex)">确认收货</view>
          </view> -->
         <!-- <view class="gdsdbczBox" v-show="oItem.status_type == 9">
            <view class="gdsdbcTwo">已完成</view>
          </view> -->
        </view>
      </view>
      <view class="stayBox" v-if="showEmpty == true">
        <image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
        <view>{{i18n.empty}}</view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
  import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
  export default {
    components: {
      uniSegmentedControl
    },
    data() {
      return {
        showEmpty: false, //显示空数据
        stopPull: false, //暂停上拉加载
        items: [
          this.$t('common').all,
          this.$t('common').unpaid,
          this.$t('common').undeliver,
          this.$t('common').unpick,
          this.$t('common').finish
        ],
        current: 0,
        activeColor: '#158DFF',
        styleType: 'text',
        orderList: [],
        orderConfig: { //订单列表请求配置
          store_id: '',
          status: 0,
          page: 0,
          size: 10
        },
        sendConfig: { //确定发货请求配置
          id: '', //发货id
          shipping_name: '', //物流公司名称
          shipping_code: '', //物流订单单号
        }
      }
    },
	computed:{
		i18n(){
			return this.$t('businessOrder');
		},
		holder(){
			return this.$t('holder');
		}
	},
    onLoad(option) {
	  uni.setNavigationBarTitle({
	  	title:this.$t('navText').bs_orders
	  })
      if (option.index) {
        let index = parseInt(option.index);
        this.current = index;
        this.orderConfig.status = index;
      }
      if (option.store_id) {
        this.orderConfig.store_id = option.store_id;
      }
    },
    onReady() {
      this.fetchOrders();
    },
    onReachBottom() { //上拉加载
      this.loadMore();
    },
    onPullDownRefresh() { //下拉刷新
      this.pullRefresh();
    },
    methods: {
      pullRefresh() { //下拉刷新
        this.orderConfig.page = 0;
        this.showEmpty = false;
        this.stopPull = false;
        this.$request.get(this.$KPI.BsnSystem.orders,this.orderConfig).then(res => {
          if (res.code === 200 && res.data) {
            if (res.data.length > 0) {
              this.orderList = res.data;
              this.orderConfig.page++;
            } else {
              this.orderList = [];
              this.showEmpty = true;
            }
            setTimeout(() => {
              uni.showToast({
                icon: "none",
                title: this.$t('warn').refreshSuccess,
                position:"top"
              })
            }, 800)
          } else {
            uni.showToast({
              icon: "none",
              title: res.msg
            })
          }
          setTimeout(() => {
            uni.stopPullDownRefresh();
          }, 500)
        })
      },
      loadMore() { //加载更多
        if (this.stopPull == true) {
          return false;
        } else {
          uni.showLoading({
            title: this.$t('warn').load,
            mask: true
          })
          this.$request.get(this.$KPI.BsnSystem.orders,this.orderConfig).then(res => {
            if (res.code === 200 && res.data) {
              if (res.data.length === 0) {
                this.stopPull = true;
                setTimeout(() => {
                  uni.showToast({
                    icon: 'none',
                   title: this.$t('warn').pullEnd,
                    position: 'bottom'
                  })
                }, 800)
              } else {
                this.orderList = this.orderList.concat(res.data);
                this.orderConfig.page++;
              }
            } else {
              uni.showToast({
                icon: "none",
                title: res.msg
              })
            }
            setTimeout(() => {
              uni.hideLoading();
            }, 1000)
          })
        }
      },
      fetchOrders() { //订单列表 
      /*首次加载,清空数组,重新获取首页数据*/
        this.showEmpty = false;
        this.stopPull = false;
        this.orderList = [];
        this.orderConfig.page = 0;
      /*首次加载,清空数组,重新获取首页数据*/  
	  
	  uni.showLoading({
	    title: this.$t('warn').load,
	    mask: true
	  })
	  
        this.$request.get(this.$KPI.BsnSystem.orders,this.orderConfig).then(res => {
          if (res.code === 200 && res.data) {
            if (res.data.length === 0) {
              this.showEmpty = true;
            } else {
              this.orderList = res.data;
              this.orderConfig.page++;
            }
          } else {
            uni.showToast({
              icon: "none",
              title: res.msg
            })
          }
		  setTimeout(() => {
		    uni.hideLoading();
		  }, 1000)
        })
      },
      onClickItem(index) { //切换订单导航
        if(this.current !== index) {
            this.current = index;
            this.orderConfig.status = index;
            this.fetchOrders();
        }
      },
      InputSerialNumber(e){ //输入物流订单号
        this.sendConfig.shipping_code = e.detail.value;
      },
      InputConpanyName(e){ //输入物流公司名称
        this.sendConfig.shipping_name = e.detail.value;
      },
      sendOrder(obj, index) { //确认发货
        let {shipping_name,shipping_code} = this.sendConfig;
        if(shipping_code.trim().length === 0){
          uni.showToast({
            icon:'none',
            title:this.$t('holder').logisticsNum
          })
          return false;
        }else if(shipping_name.trim().length === 0){
          uni.showToast({
            icon:'none',
            title:this.$t('holder').logisticsName
          })
          return false;
        }
        this.sendConfig.id = obj.order_id; 
        this.$request.post(this.$KPI.BsnSystem.confirmSend,this.sendConfig).then(res => {
          if(res.code === 200){
            uni.showToast({
              icon:'loading',
              title:this.$t('warn').cf_delivery
            })
            /*清除输入框信息*/
             this.$refs.input1[index].inputValue = '';
             this.$refs.input2[index].inputValue = '';
            /*清除输入框信息*/
            setTimeout(()=>{
              /*刷新新数据*/
              this.fetchOrders();
              /*刷新新数据*/
            },2000)
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      // comfirmOrder(obj, index) { //确认订单
      //   uni.showModal({
      //     title: '温馨提示',
      //     content: '客户是否已签收？',
      //     success: (res) => {
      //       if (res.confirm) {
      //         let data = {
      //           order_id: obj.order_id
      //         }
      //         this.$request.post(this.$KPI.shops.confirmDelivery,data).then(res => {
      //           if (res.code === 200) {
      //             this.orderList.splice(index, 1);
      //           } else {
      //             uni.showToast({
      //               icon: "none",
      //               title: res.msg
      //             });
      //           }
      //         })
      //       }
      //     }
      //   });
      // },
      orderDetail(obj) { //订单详情
        uni.navigateTo({
          url: "/pages/order/orderdata?parentId=" + obj.order_id
        })
      }
    },
    onNavigationBarButtonTap(e) {
      uni.switchTab({
        url: '/pages/shop/shopindex'
      })
    }
  }
</script>

<style>
  @import url("../shop/odform.css");

  .logistics {
    text-align: left;
    width: 100%;
    height: 60rpx;
    line-height: 60rpx;
    align-items: center;
  }

  .logisticsNum {
    height: 50rpx;
    border: 1rpx solid #C2C2C2;
    padding: 4rpx 8rpx;
    font-size: 28rpx;
    color: #999999;
  }

  .sendConfim {
    border: 1px solid #bbbbbb;
    background: #ffffff;
    color: #333333;
    padding: 0rpx 10rpx;
    min-width: 120rpx;
    text-align: center;
    margin-left: 10rpx;
    border-radius: 6rpx;
	box-sizing: content-box;
  }
</style>
