<template>
	<view class="recoeBox">
		<view class="tradparLi uni-flex" v-for="(pItem,pIndex) in pdLogs" :key="pIndex">
			<view class="tradparLiimg"><image :src="pItem.logo" mode=""></image></view>
			<view class="fx1">
				<view class="tradparLitx">{{i18n.dialogsTitle}}</view>
				<view class="tradparLitime">{{pItem.edit_time}}</view>
			</view>
			<view class="tradparshuu">{{pItem.money}}</view>
		</view>
    <view class="stayBox" v-show="showEmpty == true">
      <image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
      <view>{{common.logEmpty}}</view>
    </view>
	</view>
</template>

<script>
  export default{
    data(){
      return{
        showEmpty:false,//显示空记录
        stopPull:false,//暂停上拉
        pdLogs:[],//日志数组
        pdConfig:{ //日志请求参数
          page:0,
          size:10
        }
      }
    },
    computed:{
      i18n(){
        return this.$t('gather');
      },
      common(){
        return this.$t('common');
      }
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').p_record
      })
    },
    onReady(){
      this.fetchLogs();
    },
    onReachBottom(){
      this.loadMore();
    },
    methods:{
      fetchLogs(){ //获取日志
        this.showEmpty = false;
        uni.showLoading({
          title:this.$t('warn').load,
          mask:true
        })
        this.$request.get(this.$KPI.transfer.proceedsLogs,this.pdConfig).then(res => {
          if(res.code === 200 && res.data){
               if(res.data.length === 0){
                this.showEmpty = true; 
               }else{
                 this.pdLogs = res.data;
                 this.pdConfig.page++;
               }
            }else{
              uni.showToast({
                icon:'none',
                title:res.msg
              })
            } 
          setTimeout(()=>{
             uni.hideLoading();
            },500)  
        })
      },
      loadMore(){ //加载更多
        if(this.stopPull == true){
          return false;
        }else{
          uni.showLoading({
            title:this.$t('warn').load,
            mask:true
          })
          this.$request.get(this.$KPI.transfer.proceedsLogs,this.pdConfig).then(res => {
            if(res.code === 200 && res.data){
              if(res.data.length === 0){
                this.stopPull = true;
                uni.showToast({
                  icon:'none',
                  title:this.$t('warn').pullEnd,
                  position:"bottom"
                })
              }else{
                 this.pdLogs = this.pdLogs.concat(res.data);
                 this.pdConfig.page++;
              }
            }else{
              uni.showToast({
                icon:"none",
                title:res.msg
              })
            }
            setTimeout(()=>{
              uni.hideLoading();
            },500)
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
</style>
