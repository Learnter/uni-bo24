<template>
  <view>
    <view class="apinxtopBox" ref="headBox">
      <view class="apinxtopCOnt uni-flex">
        <view class="apinxtozwei"></view>
        <view class="fx1">
          <image src="/static/images/a024laner_20.png" mode="aspectFit" class="lohoing"></image>
        </view>
        <view class="apinxtozwei" @click="scanBtn">
          <image src="/static/images/a024laner_38_1.png" mode="aspectFit"></image>
        </view>
      </view>
    </view>
    <swiper :indicator-dots="true" indicator-color="rgba(255,255,255,0.7)" next-margin="30rpx" previous-margin="30rpx"
      current="0" @change="swiperChange" indicator-active-color="#4395FC" :autoplay="true" :interval="3000" :duration="800"
      class="bannImgBox" circular="true">
      <swiper-item v-for="(sItem,sIndex) in swipers" :key="sIndex" class="bannImgHe">
        <a :href="sItem.link_url">
          <image :src="sItem.ad_img" class="bannImg" :class="pto == (sIndex - 1)?'ptonggActive' : ''" />
        </a>
      </swiper-item>
    </swiper>
    <view class="apinxsjzhBox uni-flex">
      <view class="fx1 apinxsjzhHe" v-for="(aItem,aIndex) in assets" :key="aIndex" @click="assetLogs(aItem,aIndex)">
        <view class="apinxsjzhtx uni-ellipsis">{{aItem.money}}</view>
        <view class="apinxsjzhshu">{{aItem.name}}</view>
      </view>
    </view>
    <view class="apinxgdBox">
      <view class="uni-swiper-msg">
        <view class="uni-swiper-msg-icon">
          <!-- <image src="/static/images/a024laner_2.png" mode="aspectFit"></image> -->
          {{common.notice}}
        </view>
        <swiper autoplay="true" circular="true" interval="5000" class="apinxgdtx">
          <swiper-item v-for="(nItem, nIndex) in notices" :key="nIndex">
            <navigator :url="'/pages/notice/noticedata?parentId='+nItem.id" hover-class="none">{{nItem.title}}</navigator>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view class="apinNavBox clearfix">
      <navigator url="/pages/procewm/procewmindex" class="apinNav" hover-class="none">
        <image src="/static/images/a024laner_5.png" mode="aspectFit"></image>
        <view class="apinNavtx">{{i18n.gather}}</view>
      </navigator>

      <navigator url="/pages/transferzz/transfergl" class="apinNav" hover-class="none">
        <image src="/static/images/a024laner_11.png" mode="aspectFit"></image>
        <view class="apinNavtx">{{i18n.transfer}}</view>
      </navigator>
      <navigator url="/pages/exchange/exchangegl" class="apinNav" hover-class="none">
        <image src="/static/images/a024laner_4.png" mode="aspectFit"></image>
        <view class="apinNavtx">{{i18n.conversion}}</view>
      </navigator>
      <navigator url="/pages/team/teamindex" class="apinNav" hover-class="none">
        <image src="/static/images/a024laner_9.png" mode="aspectFit"></image>
        <view class="apinNavtx">{{i18n.share}}</view>
      </navigator>
      
      
      <navigator url="/pages/game/dial/dial" class="apinNav" hover-class="none">
      	<image src="/static/images/a024laner_39.png" mode="aspectFit"></image>
      	<view class="apinNavtx">{{i18n.game}}</view>
      </navigator>
      
      
      <!-- <navigator url="/pages/recharge/oilrecharge" class="apinNav" hover-class="none"> -->
      <view class="apinNav" @tap="temporaryOpen">
        <image src="/static/images/a024laner_60.png" mode="aspectFit"></image>
        <view class="apinNavtx">{{i18n.OC_recharge}}</view>
      </view>
      <!-- </navigator> -->
      
      
      <navigator url="/pages/commercial/commercial" class="apinNav" hover-class="none">
        <image src="/static/images/a024laner_3.png" mode="aspectFit"></image>
        <view class="apinNavtx">{{i18n.CML_college}}</view>
      </navigator>
      <view  class="apinNav" @tap="outLink('https://m.hbg.com/zh-cn')">
        <image src="/static/images/a024laner_8.png" mode="aspectFit"></image>
        <view class="apinNavtx">{{i18n.HB_network}}</view>
      </view>
      
      <navigator url="/pages/OfflineStore/OfflineStore" class="apinNav" hover-class="none">
      <!-- <view class="apinNav" @tap="temporaryOpen"> -->
        <image src="/static/images/a024laner_106.png" mode="aspectFit"></image>
        <view class="apinNavtx">{{i18n.OL_store}}</view>
      <!-- </view> -->
      </navigator>
      
      <!-- <navigator url="/pages/recharge/phonecharge" class="apinNav" hover-class="none"> -->
      <view class="apinNav" @tap="temporaryOpen">
        <image src="/static/images/a024laner_56.png" mode="aspectFit"></image>
        <view class="apinNavtx">{{i18n.phone_recharge}}</view>
      </view>
      <!-- </navigator> -->
      
	  
	  <view  class="apinNav"  @tap="outLink('https://www.taobao.com/')">
	  	<image src="/static/images/a024laner_40.png" mode="aspectFit"></image>
	  	<view class="apinNavtx">{{i18n.taobao}}</view>
	  </view>
	  <view class="apinNav"  @tap="outLink('https://www.yy.com/')">
	  	<image src="/static/images/a024laner_41.png" mode="aspectFit"></image>
	  	<view class="apinNavtx">{{i18n.YY}}</view>
	  </view>
	  <view class="apinNav" @tap="outLink('https://www.fliggy.com/')" >
	  	<image src="/static/images/a024laner_42.png" mode="aspectFit"></image>
	  	<view class="apinNavtx">{{i18n.fliggy}}</view>
	  </view>
    
    
	 <!-- <navigator url="../public/stay" class="apinNav" hover-class="none">
	  	<image src="/static/images/a024laner_43.png" mode="aspectFit"></image>
	  	<view class="apinNavtx">{{i18n.lottery}}</view>
	  </navigator> -->
    <view class="apinNav" @tap="temporaryOpen">
     <image src="/static/images/a024laner_43.png" mode="aspectFit"></image>
     <view class="apinNavtx">{{i18n.lottery}}</view>
    </view>
    
    
	 <!-- <navigator url="../public/stay" class="apinNav" hover-class="none">
	  	<image src="/static/images/a024laner_45.png" mode="aspectFit"></image>
	  	<view class="apinNavtx">{{i18n.estate}}</view>
	  </navigator> -->
    <view class="apinNav" @tap="temporaryOpen">
      <image src="/static/images/a024laner_45.png" mode="aspectFit"></image>
      <view class="apinNavtx">{{i18n.estate}}</view>
    </view>
    
	 <!-- <navigator url="../public/stay" class="apinNav" hover-class="none">
	  	<image src="/static/images/a024laner_46.png" mode="aspectFit"></image>
	  	<view class="apinNavtx">{{i18n.travel}}</view>
	  </navigator> -->
    <view class="apinNav" @tap="temporaryOpen">
      <image src="/static/images/a024laner_46.png" mode="aspectFit"></image>
      <view class="apinNavtx">{{i18n.travel}}</view>
    </view>
    
    
	  <view  class="apinNav"  @tap="outLink('https://www.jinse.com')">
	  	<image src="/static/images/a024laner_47.png" mode="aspectFit"></image>
	  	<view class="apinNavtx">{{i18n.finance}}</view>
	  </view>
    
	  <!-- <navigator url="../public/stay" class="apinNav" hover-class="none">
	  	<image src="/static/images/a024laner_50.png" mode="aspectFit"></image>
	  	<view class="apinNavtx">{{i18n.APPdownload}}</view>
	  </navigator> -->
    <view class="apinNav" @tap="temporaryOpen">
      <image src="/static/images/a024laner_50.png" mode="aspectFit"></image>
      <view class="apinNavtx">{{i18n.APPdownload}}</view>
    </view>
    </view>

    <!-- 公告弹窗 s -->
    <view class="anncempoupBox" :class="annceup == true ? 'anncempoupBoxActive' : ''">
      <view class="spdpopupContBaba">
        <view class="anncemContBox">
          <div class="anncemtle">{{i18n.newNotice}}</div>
          <view class="anncemCont">
            <navigator :url="'/pages/notice/noticedata?parentId='+pItem.id" class="anncemList" v-for="(pItem,pIndex) in popNotices"
              :key="pIndex">
              <view class="gbxqlink">{{pItem.title}}
                <image src="../../static/images/zy.png" mode="" class="zyou"></image>
              </view>
              <view class="gbxqlimshu">
                {{pItem.describe_msg}}
              </view>
            </navigator>
          </view>
        </view>
        <view class="guanbiBox" @click="annceup = false">
          <uni-icon class="i" type="closeempty" color="#ffffff" size="38"></uni-icon>
        </view>
      </view>
    </view>
    <!-- 公告弹窗 e -->

    <!-- 红包弹窗 s -->
    <view class="anncempoupBox" :class="redpacup == true ? 'anncempoupBoxActive' : ''" >
      <view class="spdpopupContBaba">
        <view class="redhbBox">
          <image src="/static/images/a024laner_85.png" mode="widthFix" class="redhbbg"></image>
          <view class="redhbCont">
            <view class="redhbshuq">{{rpNum}}</view>
            <view class="redhbsbtn" @click="snatchRedPacket">{{i18n.receive}}</view>
          </view>
        </view>
        <view class="guanbiBox" @click="redpacup = false">
          <uni-icon class="i" type="closeempty" color="#ffffff" size="38"></uni-icon>
        </view>
      </view>
    </view>
    <!-- 红包弹窗 e -->

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
        annceup: false, //公告弹窗
        redpacup: false, //红包弹窗
        swipers: [], //轮播图列表
        pto:0, // 轮播图索引
        notices: [], //公告列表
        assets: [], //资产列表
        rpNum: '', //红包数量
        popNotices: [] //弹窗公告
      }
    },
    computed:{
      i18n(){
        return this.$t('index');
      },
      common(){
        return this.$t('common');
      }
    },
    onLoad(){
      /*设置底部栏文字语言*/
      this.setBottomTabBar();
      /*设置底部栏文字语言*/
      this.fetchRedPacup();
      this.fetchPopNotice();
      this.fetchSwipers();
      this.fetchNotices();
    },
    onShow() { //每次页面显示都请求数据
      this.fetchAssets();
    },
    methods: {
      fetchRedPacup() { //获取红包数据
        this.$request.get(this.$KPI.index.redPacketNum).then(res => {
          if (res.code === 200 && res.data && res.data != {}) {
            this.rpNum = res.data.num;
            if (res.data.num !== 0) {
              this.redpacup = true;
            }
          }
        })
      },
      fetchPopNotice() { //获取弹窗公告列表
        this.$request.get(this.$KPI.index.popNotice).then(res => {
          if (res.code === 200 && res.data && res.data.length !== 0) {
            this.popNotices = res.data;
            this.annceup = true;
          }
        })
      },
      snatchRedPacket() { //领取红包
        this.$request.post(this.$KPI.index.redPacketAction).then(res => {
          if (res.code === 200) {
            uni.showToast({
              icon: 'success',
              title: this.i18n.drawSuccess,
              position: 'top'
            })
            this.redpacup = false;
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg,
              position: 'top'
            })
          }
        })
      },
      fetchSwipers() { //获取轮播图列表
        this.$request.get(this.$KPI.common.swiper, {
          type: 'user_index'
        }).then(res => {
          if (res.code === 200 && res.data && res.data != {}) {
            this.swipers = res.data;
          } else {
            uni.showToast({
              icon: "none",
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
      },
      fetchAssets() { //获取资产
        this.$request.get(this.$KPI.index.assets).then(res => {
          // console.log(res);
          if (res.code === 200 && res.data && res.data != []) {
            this.assets = res.data;
          } else {
            uni.showToast({
              icon: "none",
              title: res.msg
            })
          }
        })
      },
      assetLogs(obj, index) { //资产日志
        if (index === 2) {
          uni.navigateTo({
            url: '/pages/money/hbylogs'
          })
        } else {
          uni.navigateTo({
            url: '/pages/money/walletlog?parentId=' + obj.id
          })
        }
      },
      swiperChange(e) { // 切换轮播图 s
        this.pto = e.detail.current;
      },
      scanBtn() { //打开扫描
        uni.scanCode({
          success: (res) => {
            if (res.result) {
              uni.navigateTo({
                url: '/pages/transferzz/huobiTransfer/hbyScanTransfer?payeeInfo=' + res.result
              })
            }
          }
        })
      },
      outLink(url){ //跳转外链
       // #ifdef APP-PLUS
          /*App端调用外链*/
           plus.runtime.openURL(url); 
          /*App端调用外链*/
       // #endif
       
       // #ifdef H5
           window.location.href = url;
       // #endif  
      },
      temporaryOpen(){ //功能开发中
        uni.showToast({
          icon:'none',
          title:this.$t('warn').develop
        })
      }
    }
  }
</script>
<style>
  @import url("index.css");
</style>
