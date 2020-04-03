<template>
  <view class="content">
    <view class="bannerBox">
      <swiper autoplay="true" indicator-dots="true" indicator-color="#aaaaaa" indicator-active-color="#ffffff" circular="true" 
      style="width:100%;height:100%">
        <swiper-item v-for="(img,key) in swipers" :key="key">
          <image :src="img" style="width:100%;height:100%"/>
        </swiper-item>
      </swiper>
    </view>
    <!-- 商品列表 s -->
    <scroll-view scroll-y="true" class="spanplibBox clearfix" @scrolltolower="loadMore">
    	<view class="spanplibHe"  v-for="(gItem,gIndex) in goods" :key="gIndex">
    		<navigator class="spanplibCont"  :url="'/pages/goods/goodsinfo?good_id='+gItem.goods_id" hover-class="none" >
    			<view class="spanplibimg"><image lazy-load="true" :src="gItem.picture"  mode="widthFix"></image></view>
    			<view class="spanplmdaboc">
    				<view class="spanplmcc">{{gItem.goods_name}}</view>
    				<view class="spanplmjg">￥{{gItem.shop_price*1}}</view>
    				<!-- <view class="spanplmfk">{{gItem.sales_sum}}人已付款</view> -->
    			</view>				
    		</navigator>
    	</view>
		
		<!--无商品-->
		<view class="stayBox" v-if="showEmpty">
		  <image src="/static/images/a024laner_105.png" mode="" style="width:400rpx;height:500rpx"></image>
		  <view>
		    <navigator class="cartBtn" :url="'/pages/merchant/releasecomm?store_id='+reConfig.store_id" open-type="redirect"
		      hover-class="none">
		     {{common.release}}
		    </navigator>
		  </view>
		</view>
		<!--无商品-->
    </scroll-view>
    <!-- 商品列表 e -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        stopPull:false,
        showEmpty:false,
        swipers: ['static/images/a024laner_102.png'],// 轮播图 
        goods: [], //商品列表
        reConfig: { //列表请求配置
          store_id: '',
          page: 0,
          size: 10
        },
        banConfig:{ //轮播请求配置
          store_id:''
        }
      }
    },
    computed:{
      common(){
        return this.$t('common');
      }
    },
    onLoad(option) {
      uni.setNavigationBarTitle({
      	title:this.$t('navText').mc_shop
      })
      if (option.store_id) {
        this.reConfig.store_id = option.store_id;
        this.banConfig.store_id = option.store_id;
      }
    },
    onReady() {
      this.fetchStoreInfo();
      this.fetchStoreBanner();
    },
    methods: {
      fetchStoreInfo() { //获取商品列表
       uni.showLoading({
        mask:true,
        title:this.$t('warn').load
        })
        this.$request.get(this.$KPI.BsnSystem.Goods, this.reConfig).then(res => {
          if (res.code === 200) {
            if (res.data && res.data.length !== 0) {
              this.goods = res.data;
              this.reConfig.page++;
            } else {
              this.goods = [];
              this.showEmpty = true;
            }
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
		   setTimeout(()=>{
			 uni.hideLoading();
		  },1000)
        })
      },
      fetchStoreBanner(){ //获取店铺轮播图
        this.$request.get(this.$KPI.BsnSystem.storeBanner,this.banConfig).then(res => {
          if(res.code === 200){
            if(res.data && res.data.length !== 0){
              this.swipers = res.data;
              console.log(res.data);
            }
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      loadMore(){ //加载更多
        if(this.stopPull == true){
          return false;
        }else{
          uni.showLoading({
            mask:true,
            title:this.$t('warn').load
          })
          this.$request.get(this.$KPI.BsnSystem.Goods,this.reConfig).then( res => {
            if(res.code === 200 && res.data){
               if(res.data.length === 0){
                 this.stopPull = true;
                 setTimeout(()=> {
                    uni.showToast({
                      icon:'none',
                      title:this.$t('warn').pullEnd,
                      position:"bottom",
                      duration:2000
                    })
                 },1000)
                 return false;
               }else{
                 this.goods = this.goods.concat(res.data);
                 this.reConfig.page++;
               }
            }else{
               uni.showToast({
                icon:"none",
                title:res.msg
              })
            }
            setTimeout(()=>{
               uni.hideLoading();
            },1000)
          })
        }
      },
    }
  }
</script>

<style>
  page,.content{
    background:#f5f5f5;
    width:100%;
    height:100%;
  }
  
  .bannerBox{
    width:100%;
    height:300rpx;
  }
  
 .spanplibBox {
    width:100%;
	  height:calc(100% - 300rpx);
    box-sizing:border-box;
    padding: 20rpx 10rpx 10rpx 10rpx;
  }

 /deep/.uni-swiper-wrapper{
  border-radius:10rpx;
  }
  .spanplibHe {
    width: 50%;
    float: left;
  }

  .spanplibCont {
    background: #ffffff;
    border-radius: 8rpx;
    width: 96%;
    margin: 0 auto;
    margin-bottom: 10rpx;
  }

  .spanplibimg {
    width: 100%;
    height: 300rpx;
    text-align: center;
    overflow: hidden;
    padding:10rpx;
    box-sizing:border-box;
  }

  .spanplibimg image {
    width: 100%;
    height: 300rpx;
  }

  .spanplmdaboc {
    padding: 5rpx 15rpx 15rpx 15rpx;
  }

  .spanplmcc {
    font-size: 26rpx;
    line-height: 35rpx;
    height: 70rpx;
    color: #333333;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .spanplmjg {
    color: #FF0000;
    font-size: 24upx;
    line-height: 35rpx;
  }
  .spanplibimg image{
    width:100%;
    height:100% !important;
    border-radius:10rpx;
  }

  .spanplmfk {
    color: #888888;
    font-size: 24upx;
    line-height: 30rpx;
  }

  .stayBox {
    padding-top: 20%;
  }

  .cartBtn {
    width: 300rpx;
    height: 80rpx;
    line-height: 80rpx;
    margin: auto;
    background: burlywood;
    border-radius: 40rpx;
    font-size: 32rpx;
    box-shadow: 0 16rpx 6rpx indianred;
  }
  
</style>
