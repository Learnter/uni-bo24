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
    <view class="recoeBox">
      <view>
        <view class="myrfelist uni-flex" v-for="(item,index) in orderList" :key="index">
          <div class="myrfebuying">{{item.trade_msg}}</div>
          <view class="fx1">
            <view class="myrfetext_1 uni-flex" style="justify-content: space-between;">
              <view class="">{{i18n.count}}：{{item.num}} </view>
              <block v-if="item.days!=0&&item.hours!=0&&item.minutes!=0&&item.seconds!=0">
                <uni-countdown :day="item.days" :hour="item.hours" :minute="item.minutes" :second="item.seconds" color="#FFFFFF"
                  background-color="#00B26A" border-color="#00B26A" />
              </block>
            </view>
            <view class="myrfetext_1 uni-flex" style="justify-content: space-between;">
              <view class="">{{i18n.price}}：{{item.actual_price}}</view>
              <navigator class="myrfezta" :url="'/pages/flametrad/matchdeta?parentId='+item.id" hover-class="none">
                {{item.is_type_msg}}
                <image src="/static/images/a024laner_82.png" mode="widthFix" class="zyou"></image>
              </navigator>
            </view>
            <view class="myrfetext_1">{{i18n.amount}}：{{item.money}}</view>
            <view class="myrfetext_2">{{i18n.time}}：{{item.add_time}}</view>
          </view>
          <view class="myrfeztaBox">
          </view>
        </view>
        <view class="stayBox" v-if="showEmpty == true">
          <image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
          <view style="color:#FFFFFF">{{i18n.emptyOrder}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control_1.vue'
  import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
  export default {
    components: {
      uniSegmentedControl,
      uniCountdown
    },
    data() {
      return {
        showEmpty: false,
        stopPull: false,
        items: [this.$t('myorder').all,this.$t('myorder').Wremit,this.$t('myorder').Wgather],
        current: 0,
        activeColor: '#ffffff',
        styleType: 'text',
        orderList: [],
        orderConfig: {
          type: 0,
          page: 0,
          size: 10
        }
      }
    },
    computed:{
      i18n(){
        return this.$t('myorder');
      }
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').myorder
      })
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
        /*刷新加载,清空数组,重新获取新数据*/
        this.showEmpty = false;
        this.stopPull = false;
        this.orderList = [];
        this.orderConfig.page = 0;
        /*刷新加载,清空数组,重新获取新数据*/
        this.$request.get(this.$KPI.fireDeal.deals, this.orderConfig).then(res => {
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
                title: this.$t('warn').refreshSuccess
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
            title:this.$t('warn').load,
            mask:true
          })
          this.$request.get(this.$KPI.fireDeal.deals, this.orderConfig).then(res => {
            if (res.code === 200 && res.data) {
              if (res.data.length === 0) {
                this.stopPull = true;
                setTimeout(() => {
                  uni.showToast({
                    icon: 'none',
                    title:this.$t('warn').pullEnd,
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
            }, 500)
          })
        }
      },
      fetchOrders() { //订单列表
        /*首次加载,清空数组,重新获取新数据*/
        this.showEmpty = false;
        this.stopPull = false;
        this.orderList = [];
        this.orderConfig.page = 0;
        /*首次加载,清空数组,重新获取新数据*/
        
        uni.showLoading({
          title:this.$t('warn').load,
          mask:true
        })

        this.$request.get(this.$KPI.fireDeal.deals, this.orderConfig).then(res => {
          // console.log(res);
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
          }, 500)
          
        })
      },
      onClickItem(index) { //切换订单导航
        if (this.current !== index) {
          this.current = index;
          this.orderConfig.type = index;
          this.fetchOrders();
        }
      },
      // formatDuring(obj,mss){ //时间戳转
      //   obj.days = parseInt(mss / (1000 * 60 * 60 * 24));
      //   obj.hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      //   obj.minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      //   obj.seconds = (mss % (1000 * 60)) / 1000;
      // }
    }
  }
</script>

<style>
  page {
    background: #158DFF;
  }

  .topsbgyCont {
    background: #1283F2;
    border-bottom: 2px solid #3B9DFC;
  }

  .myrfelist {
    background: #1283F2;
    border-radius: 6rpx;
    padding: 15rpx 30rpx 15rpx 15rpx;
    margin-bottom: 20rpx;
  }

  .myrfebuying {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    text-align: center;
    line-height: 80rpx;
    background: linear-gradient(top, #58BF37, #9BEA5D);
    color: #ffffff;
    margin: 40rpx 20rpx 0rpx 0rpx;
  }

  .myrfeselling {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    text-align: center;
    line-height: 80rpx;
    background: linear-gradient(top, #DA8F2D, #EFC643);
    color: #ffffff;
    margin: 40rpx 20rpx 0rpx 0rpx;
  }

  .myrfetext_1 {
    color: #ffffff;
    font-size: 24rpx;
  }

  .myrfetext_2 {
    color: #A5D6FA;
    font-size: 24rpx;
  }

  .myrfeztaBox {
    padding-top: 50rpx;
  }

  .myrfezta {
    color: #A5D6FA;
    font-size: 26rpx;
  }

  .myrfezta .zyou {
    width: 10rpx;
    height: 14rpx;
    position: relative;
    top: -5rpx;
    left: 8rpx;
  }
</style>
