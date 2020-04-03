<template>
  <view>
    <view class="busiceTopBox">
      <view class="busiceTodata uni-flex">
        <view class="busiceTodataimg">
          <image :src="storeInfo.logo" mode=""></image>
        </view>
        <view class="fx1">
          <view class="busiceTodatamc">{{storeInfo.account}}</view>
          <view class="busiceTodatatjr">{{i18n.referees}}：{{storeInfo.tjr_account}}</view>
        </view>
      </view>
      <view class="uni-flex">
        <view class="fx1">
          <view class="busishjd">{{storeInfo.order_all}}</view>
          <view class="busishwzd">{{i18n.cumulative}}</view>
        </view>
        <view class="busishgex"></view>
        <view class="fx1">
          <view class="busishjd">{{storeInfo.day_order_trade}}</view>
          <view class="busishwzd">{{i18n.today_deal}}</view>
        </view>
        <view class="busishgex"></view>
        <view class="fx1">
          <view class="busishjd">{{storeInfo.day_order}}</view>
          <view class="busishwzd">{{i18n.today_orders}}</view>
        </view>
      </view>
      <view class="uni-swiper-msg busishmsgbox">
        <view class="uni-swiper-msg-icon" style="width: 70rpx;line-height: 60rpx;">
          <image src="/static/images/a024laner_100.png" mode="widthFix" style="height:40rpx;"></image>
        </view>
        <swiper autoplay="true" circular="true" interval="3000" class="apinxgdtx">
          <swiper-item v-for="(nItem, nIndex) in notices" :key="nIndex">
            <navigator :url="'/pages/notice/noticedata?parentId='+nItem.id" hover-class="none">{{nItem.title}}</navigator>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view class="busicezhBox">
      <view class="butitlez">{{i18n.od_management}}</view>
      <view class="uni-flex">
        <navigator :url="'/pages/merchant/businessOrder?index=1&store_id='+storeInfo.store_id" class="fx1 busiddglBox"
          hover-class="none">
          <view class="busiddglimg">
            <image src="/static/images/a024laner_101.png" mode="widthFix"></image>
            <view class="busiddglsju" v-if="storeInfo.order_one">{{storeInfo.order_one}}</view>
          </view>
          <view class="busiddgltx">{{i18n.w_paid}}</view>
        </navigator>
        <navigator :url="'/pages/merchant/businessOrder?index=2&store_id='+storeInfo.store_id" class="fx1 busiddglBox"
          hover-class="none">
          <view class="busiddglimg">
            <image src="/static/images/a024laner_93.png" mode="widthFix"></image>
            <view class="busiddglsju" v-if="storeInfo.order_two">{{storeInfo.order_two}}</view>
          </view>
          <view class="busiddgltx">{{i18n.w_delivery}}</view>
        </navigator>
        <navigator :url="'/pages/merchant/businessOrder?index=3&store_id='+storeInfo.store_id" class="fx1 busiddglBox"
          hover-class="none">
          <view class="busiddglimg">
            <image src="/static/images/a024laner_94.png" mode="widthFix"></image>
            <view class="busiddglsju" v-if="storeInfo.order_three">{{storeInfo.order_three}}</view>
          </view>
          <view class="busiddgltx">{{i18n.w_confirm}}</view>
        </navigator>
        <navigator :url="'/pages/merchant/businessOrder?index=4&store_id='+storeInfo.store_id" class="fx1 busiddglBox"
          hover-class="none">
          <view class="busiddglimg">
            <image src="/static/images/a024laner_95.png" mode="widthFix"></image>
            <view class="busiddglsju" v-if="storeInfo.order_nine">{{storeInfo.order_nine}}</view>
          </view>
          <view class="busiddgltx">{{i18n.finish}}</view>
        </navigator>
      </view>
    </view>

    <view class="busicezhBox">
      <view class="butitlez">{{i18n.st_management}}</view>
      <view class="uni-flex">
        <navigator :url="'/pages/merchant/mystore?store_id='+storeInfo.store_id" class="fx1 busiddglBox" hover-class="none">
          <view class="busiddglimg">
            <image src="/static/images/a024laner_96.png" mode="widthFix"></image>
            <view class="busiddglsju" v-if="storeInfo.goods_num">{{storeInfo.goods_num}}</view>
          </view>
          <view class="busiddgltx">{{i18n.gd_management}}</view>
        </navigator>
        <navigator :url="'/pages/merchant/releasecomm?store_id='+storeInfo.store_id" class="fx1 busiddglBox"
          hover-class="none">
          <view class="busiddglimg">
            <image src="/static/images/a024laner_97.png" mode="widthFix"></image>
          </view>
          <view class="busiddgltx">{{i18n.rl_goods}}</view>
        </navigator>
        <navigator url="/pages/merchant/financeLogs" class="fx1 busiddglBox" hover-class="none">
          <view class="busiddglimg">
            <image src="/static/images/a024laner_98.png" mode="widthFix"></image>
          </view>
          <view class="busiddgltx">{{i18n.fn_management}}</view>
        </navigator>
        <navigator url="/pages/merchant/setupshop" class="fx1 busiddglBox" hover-class="none">
          <view class="busiddglimg">
            <image src="/static/images/a024laner_99.png" mode="widthFix"></image>
          </view>
          <view class="busiddgltx">{{i18n.mc_set}}</view>
        </navigator>
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        notices: [],
        storeInfo: {}
      }
    },
	computed:{
		i18n(){
			return this.$t('businescenter');
		}
	},
	onLoad() {
	  uni.setNavigationBarTitle({
	  	title:this.$t('navText').bs_center
	  })
	},
    onShow() {
      this.fetchStoreInfo();
      this.fetchNotices();
    },
    methods: {
      fetchStoreInfo() { //商家信息
        this.$request.get(this.$KPI.BsnSystem.storeInfo).then(res => {
          // console.log(res);
          if (res.code === 200) {
            if (res.data && Object.keys(res.data).length !== 0) {
              this.storeInfo = res.data;
            }
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      fetchNotices() { //获取公告列表
        this.$request.get(this.$KPI.index.notice).then(res => {
          if (res.code === 200 && res.data && res.data != []) {
            this.notices = res.data;
          } else {
            uni.showToast({
              icon: "none",
              title: res.msg
            })
          }
        })
      }
    }
  }
</script>

<style>
  @import url("businescenter.css");

  .busishmsgbox {
    background: #EBF4FF;
  }
</style>
