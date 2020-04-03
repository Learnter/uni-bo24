<template>
	<view>
    <!-- 轮播图 s -->
    <view class="shangclbbBox">
    	<view class="shangclbb">
    		<swiper autoplay="true" indicator-dots="true" indicator-color="#aaaaaa" indicator-active-color="#ffffff" circular="true"
    		 style="height:300rpx;">
    			<swiper-item v-for="(sItem,sIndex) in storeInfo.banner_img" :key="sIndex">
    				<!-- <image lazy-load="true" :src="sItem.ad_img" style="height:250upx;width:100%;" /> -->
            	<image lazy-load="true" :src="sItem" style="height:100%;width:100%;" />
    			</swiper-item>
    		</swiper>
    	</view>
    </view>
    <!-- 轮播图 e -->
    
    <view class="storeInfo uni-flex">
      <image :src="storeInfo.logo_img"></image>
      <view class="uni-flex-item">
        <view>{{storeInfo.name}}</view>
      <!--  <view>超市店铺</view>
        <view>消费0次</view> -->
        <view>{{i18n.bs_hours}}：{{runTime}}</view>
      </view>
      <!-- <view class="watch">
        <uni-icon type="star" color="#888888" size="22"></uni-icon>
        <text>收藏1</text>
      </view> -->
    </view>
   
    <view class="listBox">
      <view class="btomnav uni-flex">
      	<view class="btomnavimg">
      		<image src="/static/images/ssp_7.png" mode="aspectFit"></image>
      	</view>
      	<view class="btomnavtx fx1 ">{{storeInfo.phone}}</view>
      	<view class="btomnavzxx phoneImg" @click.stop="dial">
      		<image src="/static/images/ssp_6.png" style="width:100%;height:100%;"></image>
      	</view>
      </view>
      <view class="btomnav uni-flex" @click="location">
      	<view class="btomnavimg">
      		<image src="/static/images/ssp_8.png" mode="aspectFit"></image>
      	</view>
      	<view class="btomnavtx fx1 uni-ellipsis">{{storeInfo.address_details}}</view>
      	<view class="btomnavzxx">
      		<uni-icon type="arrowright" color="#888888" size="20"></uni-icon>
      	</view>
      </view>
     <!-- <navigator class="btomnav uni-flex" url="/pages/login/cancelBind"  hover-class="none">
      	<view class="btomnavimg">
      		<image src="/static/images/ssp_9.png" mode="aspectFit"></image>
      	</view>
      	<view class="btomnavtx fx1">店铺简介</view>
      	<view class="btomnavzxx">
      		<uni-icon type="arrowright" color="#888888" size="20"></uni-icon>
      	</view>
      </navigator> -->
      <navigator class="btomnav uni-flex" :url="'/pages/merchant/mystore?store_id='+storeInfo.store_id"  hover-class="none">
      	<view class="btomnavimg">
      		<image src="/static/images/ssp_10.png" mode="aspectFit"></image>
      	</view>
      	<view class="btomnavtx fx1">{{i18n.online_store}}</view>
      	<view class="btomnavzxx">
      		<uni-icon type="arrowright" color="#888888" size="20"></uni-icon>
      	</view>
      </navigator>
    </view>
<!--    <button  class="buttonBox" @click="payDetails">我要结账</button> -->
	</view>
</template>

<script>
  import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
    components: {
      uniIcon
    },
		data() {
			return {
        storeInfo:{
          banner_img:[],
          logo_img:'',
          start_time:'',
          end_time:'',
          latitude:'',
          longitude:'',
          address:'',
          address_details:'',
          name:'',
          phone:'',
          store_id:''
        },
				reConfig:{
          store_id:''
        }
			}
		},
    computed:{
      runTime(){
        let {start_time,end_time} = this.storeInfo;
        let time = '';
        if(start_time && end_time){
          time = start_time+"-"+end_time;
        }
        return time
      },
      i18n(){
        return this.$t('OfflineStore')
      }
    },
    onLoad(option) {
      uni.setNavigationBarTitle({
        title:this.$t('navText').ol_st_details
      })
      this.reConfig.store_id = option.store_id;
    },
    onReady() {
      this.fetchDetails();
    },
		methods: {
      fetchDetails(){
        this.$request.get(this.$KPI.lineStore.details,this.reConfig).then(res => {
          if(res.code === 200){
             if(res.data && Object.keys(res.data).length !== 0){
              this.storeInfo = res.data;
             }
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      /*拨打电话*/
			dial(){
        let {phone} = this.storeInfo;
        uni.makePhoneCall({
          phoneNumber:phone
        });
      },
      /*拨打电话*/
      
      /*打开定位*/
      location(){
        let {address,address_details,latitude,longitude} = this.storeInfo;
        // console.log(this.storeInfo);
        uni.openLocation({
          latitude:parseFloat(latitude),
          longitude:parseFloat(longitude),
          name:address,
          address:address_details
        })
      }
      /*打开定位*/
      
      /*支付详情页面*/
      // payDetails(){
      //  uni.navigateTo({
      //    url:'/pages/OfflineStore/payDetail/payDetail'
      //  }) 
      // }
     /*支付详情页面*/
		}
	}
</script>

<style>
  
 .storeInfo{
   padding:20rpx;
 }
 
 .storeInfo image{
   width:180rpx;
   height:200rpx;
   padding: 0 20rpx;
 }
 
 .watch{
   display:flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   border-left: 2rpx solid #EFF0F2;
   padding: 0 20rpx;
 }
 
 .btomnav{
   padding:30rpx;
 }
 
 .btomnavtx{
   font-size:30rpx;
 }
 
 .phoneImg{
   width:60rpx;
   height:60rpx;
   border-left:4rpx solid #EFF0F2;
   padding-left:20rpx;
 }
 
 .buttonBox{
  margin: 70rpx 20rpx;
  height:80rpx;
  line-height: 80rpx;
  background:#ED5208;
  color:#F0F0F2;;
 }
</style>
