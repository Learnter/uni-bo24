<template>
  <view class="recoeBox">
    <view>
      <view class="tradparLi" v-for="(dItem,dIndex) in dsLogs" :key="dIndex">
        <view class="tradparztai">{{dItem.usdt_name}}</view>
        <view class="tradparLitx">{{i18n.wd_usdt}} {{dItem.add_num}}</view>
        <view class="tradparLitime">{{i18n.address}}：{{dItem.user_address}}</view>
        <view class="tradparLitime">{{i18n.procedure}}：{{dItem.fee_num}}</view>
        <view class="tradparLitime">{{dItem.add_time}}</view>
      </view>
    </view>
    <view class="stayBox" v-if="showEmpty">
      <image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
      <view>{{i18n.logEmpty}}</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        showEmpty: false,
        stopPull: false,
        dsLogs: [],
        dsConfig: {
          page: 0,
          size: 10
        }
      }
    },
	computed:{
	  i18n(){
		return this.$t('deposittxlist');
	  },
	  common(){
		return this.$t('common');
	  }
	},
    onLoad() {
	  uni.setNavigationBarTitle({
	  	title:this.$t('navText').wd_usdt_log
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
        this.$request.get(this.$KPI.USDT.dsLogs, this.dsConfig).then(res => {
          if (res.code === 200 && res.data) {
            if (res.data.length === 0) {
              this.showEmpty = true;
            } else {
              this.dsLogs = res.data;
              this.dsConfig.page++;
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
          this.$request.get(this.$KPI.USDT.dsLogs, this.dsConfig).then(res => {
            if (res.code === 200 && res.data) {
              if (res.data.length === 0) {
                this.stopPull = true;
                uni.showToast({
                  icon: 'none',
                  title: this.$t('warn').pullEnd,
                  position: "bottom"
                })
              } else {
                this.dsLogs = this.dsLogs.concat(res.data);
                this.dsConfig.page++;
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
