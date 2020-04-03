<template>
  <view class="recoeBox">
    <view>
      <view class="tradparLi uni-flex" v-for="(cItem,cIndex) in cvLogs" :key="cIndex">
        <view class="fx1">
          <view class="tradparLitx">{{common.exchange}} {{cItem.usdt_name}} {{cItem.usdt_num}}</view>
          <view class="tradparLitime">{{cItem.add_time}}</view>
        </view>
        <view class="tradparshuuchu">{{cItem.block_num}} {{cItem.bid}}</view>
      </view>
    </view>
    <view class="stayBox" v-if="showEmpty">
      <image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
      <view>{{common.logEmpty}}</view>
    </view>
    <!-- 		<view class="tradparLi uni-flex">
			<view class="fx1">
				<view class="tradparLitx">兑换 USDT 150.0000</view>
				<view class="tradparLitime">2019-07-06 20:39:46</view>
			</view>
			<view class="tradparshuuchu">- 690.0000 HBY</view>
		</view>
		<view class="tradparLi uni-flex">
			<view class="fx1">
				<view class="tradparLitx">兑换 USDT 150.0000</view>
				<view class="tradparLitime">2019-07-06 20:39:46</view>
			</view>
			<view class="tradparshuuchu">- 690.0000 HBY</view>
		</view>
		<view class="tradparLi uni-flex">
			<view class="fx1">
				<view class="tradparLitx">兑换 USDT 150.0000</view>
				<view class="tradparLitime">2019-07-06 20:39:46</view>
			</view>
			<view class="tradparshuuchu">- 690.0000 HBY</view>
		</view>
		<view class="tradparLi uni-flex">
			<view class="fx1">
				<view class="tradparLitx">兑换 USDT 150.0000</view>
				<view class="tradparLitime">2019-07-06 20:39:46</view>
			</view>
			<view class="tradparshuuchu">- 690.0000 HBY</view>
		</view>
		<view class="tradparLi uni-flex">
			<view class="fx1">
				<view class="tradparLitx">兑换 USDT 150.0000</view>
				<view class="tradparLitime">2019-07-06 20:39:46</view>
			</view>
			<view class="tradparshuuchu">- 690.0000 HBY</view>
		</view>
		<view class="tradparLi uni-flex">
			<view class="fx1">
				<view class="tradparLitx">兑换 USDT 150.0000</view>
				<view class="tradparLitime">2019-07-06 20:39:46</view>
			</view>
			<view class="tradparshuuchu">- 690.0000 HBY</view>
		</view>
		<view class="tradparLi uni-flex">
			<view class="fx1">
				<view class="tradparLitx">兑换 USDT 150.0000</view>
				<view class="tradparLitime">2019-07-06 20:39:46</view>
			</view>
			<view class="tradparshuuchu">- 690.0000 HBY</view>
		</view>
		<view class="tradparLi uni-flex">
			<view class="fx1">
				<view class="tradparLitx">兑换 USDT 150.0000</view>
				<view class="tradparLitime">2019-07-06 20:39:46</view>
			</view>
			<view class="tradparshuuchu">- 690.0000 HBY</view>
		</view>
		<view class="tradparLi uni-flex">
			<view class="fx1">
				<view class="tradparLitx">兑换 USDT 150.0000</view>
				<view class="tradparLitime">2019-07-06 20:39:46</view>
			</view>
			<view class="tradparshuuchu">- 690.0000 HBY</view>
		</view> -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        showEmpty: false,
        stopPull: false,
        cvLogs: [],
        cvConfig: {
          page: 0,
          size: 10
        }
      }
    },
	computed:{
		common(){
			return this.$t('common');
		}
	},
    onLoad() {
	  uni.setNavigationBarTitle({
		 title:this.$t('navText').ec_usdt_log
	  })
    },
	onReady() {
	  this.fetchLogs();
	},
    onReachBottom() {
      this.loadMore();
    },
    methods: {
      fetchLogs() { //获取日志列表
        this.$request.get(this.$KPI.USDT.cvLogs, this.cvConfig).then(res => {
          if (res.code === 200 && res.data) {
            if (res.data.length === 0) {
              this.showEmpty = true;
            } else {
              this.cvLogs = res.data;
              this.cvConfig.page++;
            }
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      loadMore() { //加载更多
        if (this.stopPull == true) {
          return false;
        } else {
          uni.showLoading({
            mask:true,
            title:this.$t('warn').load
          })
          
          this.$request.get(this.$KPI.USDT.cvLogs, this.cvConfig).then(res => {
            if (res.code === 200 && res.data) {
              if (res.data.length === 0) {
                this.stopPull = true;
                uni.showToast({
                  icon: 'none',
                  title: this.$t('warn').pullEnd,
                  position: "bottom"
                })
              } else {
                this.cvLogs = this.cvLogs.concat(res.data);
                this.cvConfig.page++;
              }
            } else {
              uni.showToast({
                icon: "none",
                title: res.msg
              })
            }
            setTimeout(()=>{
               uni.hideLoading();
            },1000)
          })
        }
      }
    }
  }
</script>

<style>
  page {
    background: #f5f5f5;
  }
  .stayBox {
    text-align: center;
    color: #333333;
    padding-top: 50%;
  }
</style>
