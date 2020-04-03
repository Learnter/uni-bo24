<template>
  <view class="recoeBox">
    <view>
      <view class="tradparLi" v-for="(rItem,rIndex) in rcLogs" :key="rIndex">
        <view class="tradparztai">{{rItem.status}}</view>
        <view class="tradparLitx">{{i18n.rc_usdt}} {{rItem.add_num}}</view>
        <view class="tradparLitime">{{i18n.toAddress}}：{{rItem.user_address}}</view>
        <view class="tradparLitime">{{i18n.outAddress}}：{{rItem.web_address}}</view>
        <view class="tradparLitime">{{rItem.add_time}}</view>
      </view>
    </view>
    <view class="stayBox" v-if="showEmpty">
      <image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
      <view>{{common.logEmpty}}</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        showEmpty: false,
        stopPull: false,
        rcLogs: [],
        rcConfig: {
          page: 0,
          size: 10
        }
      }
    },
	computed:{
	   i18n(){
		  return this.$t('rechargechzlist'); 
	   },
	   common(){
		  return this.$t('common');
	   }
	},
    onLoad() {
	   uni.setNavigationBarTitle({
		  title:this.$t('navText').rc_usdt_log
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
	    uni.showLoading({
		  mask:true,
		  title:this.$t('warn').load
	    }) 
        this.$request.get(this.$KPI.USDT.rcLogs, this.rcConfig).then(res => {
          if (res.code === 200 && res.data) {
            if (res.data.length === 0) {
              this.showEmpty = true;
            } else {
              this.rcLogs = res.data;
              this.rcConfig.page++;
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
      loadMore() { //加载更多
        if (this.stopPull == true) {
          return false;
        } else {
		  uni.showLoading({
			  mask:true,
			  title:this.$t('warn').load
		  }) 
          this.$request.get(this.$KPI.USDT.rcLogs, this.rcConfig).then(res => {
            if (res.code === 200 && res.data) {
              if (res.data.length === 0) {
                this.stopPull = true;
                uni.showToast({
                  icon: 'none',
                  title: this.$t('warn').pullEnd,
                  position: "bottom"
                })
              } else {
                this.rcLogs = this.rcLogs.concat(res.data);
                this.rcConfig.page++;
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
