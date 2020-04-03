<template>
  <view>
    <!-- 头部定位、搜索框-->
    <view class="homeTopBaBa">
      <view class="homeTopHe">
        <view class="homeTop">
         <!-- <navigator class="homeTopLogo" url="shoplist" hover-class="none">
            <uni-icon class="i" type="location-filled" color="forestgreen" size="26"></uni-icon>
          </navigator> -->
          <view class="homedssplink uni-flex-item">
            <navigator class="edssplinkzi" url="/pages/OfflineStore/searchOf" hover-class="none">
              <uni-icon class="i" type="search" color="#ffffff" size="22"></uni-icon>
              <text class="text_1 uni-flex-item">{{holder.searchKeyword}}</text>
            </navigator>
          </view>
        </view>
      </view>
    </view>
    <!-- 头部定位、搜索框-->
    <!-- 商家分类-->
   <!-- <view class="setNavCont clearfix">
      <navigator class="setNav" url="/pages/OfflineStore/storeList/storeList" hover-class="none">
        <image src="/static/images/scicon_2.png" mode=""></image>
        <view class="setNavtx">商品分类</view>
      </navigator>
      <navigator class="setNav" url="/pages/OfflineStore/storeList/storeList" hover-class="none">
        <image src="/static/images/scicon_3.png" mode=""></image>
        <view class="setNavtx">我的订单</view>
      </navigator>
      <navigator class="setNav" url="/pages/OfflineStore/storeList/storeList" hover-class="none">
        <image src="/static/images/scicon_4.png" mode=""></image>
        <view class="setNavtx">购物车</view>
      </navigator>
      <navigator class="setNav" url="/pages/OfflineStore/storeList/storeList" hover-class="none">
        <image src="/static/images/scicon_5.png" mode=""></image>
        <view class="setNavtx">收货地址</view>
      </navigator>
      <navigator class="setNav" url="/pages/OfflineStore/storeList/storeList" hover-class="none">
        <image src="/static/images/scicon_2.png" mode=""></image>
        <view class="setNavtx">商品分类</view>
      </navigator>
      <navigator class="setNav" url="/pages/OfflineStore/storeList/storeList" hover-class="none">
        <image src="/static/images/scicon_3.png" mode=""></image>
        <view class="setNavtx">我的订单</view>
      </navigator>
      <navigator class="setNav" url="/pages/OfflineStore/storeList/storeList" hover-class="none">
        <image src="/static/images/scicon_4.png" mode=""></image>
        <view class="setNavtx">购物车</view>
      </navigator>
      <navigator class="setNav" url="/pages/OfflineStore/storeList/storeList" hover-class="none">
        <image src="/static/images/scicon_5.png" mode=""></image>
        <view class="setNavtx">收货地址</view>
      </navigator>
    </view> -->
    <!-- 商家分类-->
    
    <!--商家推荐-->
    <view class="">
      <view class="uni-flex recommendHead">
        <text class="rheadText">{{i18n.recommend}}</text>
        <navigator class="rheadMore" url="/pages/OfflineStore/storeList/storeList" hover-class="none">
          {{i18n.more}}<uni-icon class="i" type="arrowright" size="20"></uni-icon>
        </navigator>
      </view>
      <view class="" v-for="(item,index) in recommends" :key="index">
         <navigator :url="'/pages/OfflineStore/storeDetail/storeDetail?store_id='+item.store_id" class="recommendList uni-flex" hover-class="none">
           <view class="rlImg" >
             <image :src="item.logo" style="width:100%;height:100%;"></image>
           </view>
           <view class="uni-flex-item rlRight">
             <view class="rlrow rlrow_1">{{item.name}}</view>
             <view class="">
               <view class="rlbottom">{{i18n.province}}：{{item.address_large.split('-')[0]}}</view>
               <view class="rlbottom">{{i18n.city}}：{{item.address_large.split('-')[1]}}</view>
               <view class="rlbottom">{{i18n.district}}：{{item.address_large.split('-')[2]}}</view>
               <view class="rlbottom uni-ellipsis">{{i18n.address}}：{{item.address_large.split('-')[3]}}</view>         
             </view>
           </view>
         </navigator>
      </view>
    </view>
    <!--商家推荐-->

  </view>
</template>

<script>
  import uniIcon from '@/components/uni-icon/uni-icon.vue'
  import uniRate from '@/components/uni-rate/uni-rate.vue'
  export default {
    data() {
      return {
        recommends:[] //推荐店铺列表
      }
    },
    computed:{
      i18n(){
        return this.$t('OfflineStore');
      },
      holder(){
        return this.$t('holder');
      }
    },
    onLoad() {
      // this.whichLanguage('线下店铺','OFFLINE STORE');
      uni.setNavigationBarTitle({
        title:this.$t('navText').ol_store
      })
      this.fetchGoods();
    },
    methods: {
      fetchGoods(){
        this.$request.get(this.$KPI.lineStore.recommend).then(res => {
          if(res.code === 200){
            if(res.data && Object.keys(res.data).length !== 0){
             this.recommends = res.data;
            }
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      }
    },
    components: {
      uniIcon,
      uniRate
    }
  }
</script>

<style scoped>
  /*头部定位,搜索样式*/
/*  .homeTopBaBa {
    height: 100rpx;
  }

  .homeTopHe {
    width: 100%;
    height: 100rpx;
    z-index: 100;
  }
 */
  .homeTop {
    display: flex;
    padding:30rpx 20rpx;
    background: #FFFFFF;
    border-bottom: 1rpx solid #EFF0F2;
  }

  .homeTopLogo {
    width: 50rpx;
    height: 50rpx;
  }

  .homeTopLogo image {
    width: 100%;
    height: 100%;
  }


  .edssplinkzi {
    background: #ECECEC;
    height: 70rpx;
    line-height: 70rpx;
    color: #ffffff;
    border-radius: 10rpx;
  }

  .edssplinkzi .i {
    display: inline-block;
    margin: 0rpx 15rpx;
  }

  .edssplinkzi .text_1 {
    /* font-size: 30rpx;*/
    color: #ffffff;
  }

  /*头部定位,搜索样式*/


  /*联盟商家样式*/
  .setNavCont {
    /* padding: 20upx 0upx 0rpx 0rpx; */
    box-shadow: 0rpx 3rpx 20rpx #E3E3E3;
    background: #ffffff;
  }

  .setNav {
    width: 25%;
    text-align: center;
    padding: 20upx 0upx;
    float: left;
  }

  .setNav image {
    width: 50upx;
    height: 50upx;
    margin-bottom: 5upx;
  }

  .setNavtx {
    color: #333333;
    font-size: 24upx;
  }
  /*联盟商家样式*/
  
  /*商家推荐*/
  .recommendHead{
    padding:24rpx 20rpx;
    justify-content:space-between;
    align-items:center;
    position:relative;
  }
 
  .rheadText{
    border-left: 6rpx solid cadetblue;
    padding-left: 10rpx;
    font-size: 34rpx;
    font-weight: 700;
  }
  
  .rheadMore{
    color:#C0C0C0;
  }
  
  .recommendList{
    padding:16rpx 20rpx;
    border-top:1rpx solid #EFF0F2;
  }
  
  .rlImg{
    width:200rpx;
    height:200rpx;
    padding:10rpx;
    flex-shrink:0;
  }
  
  .rlRight{
    overflow: hidden;
    margin-left:10rpx;
  }
  
  .rlrow{
    line-height:1.5;
  }
  
  .rlrow_1{
    font-weight:600;
    font-size:36rpx;
  }
  
  .rlbottom{
    /*color:#C2C2C2;*/
    line-height:40rpx;
  }
  
  .rlbottom text{
    padding:0 10rpx;
    border-right:4rpx solid #C2C2C2;
  }
  
  .rlbottom text:last-child{
    padding:0 10rpx;
    border-right:none;
  }
  /*商家推荐*/
</style>
