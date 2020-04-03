<template>
	<view class="recoeBox">
    <view v-for="(lItem,lIndex) in logsList" :key="lIndex">
      <navigator class="tradparLi uni-flex" :url="'/pages/exchange/fireExchange/exflDetails?logId='+lItem.id"  hover-class="none" >
          <view class="tradparLiimg"><image :src="lItem.logo" mode=""></image></view>
          <view class="fx1">
          	<view class="tradparLitx">{{lItem.mid}}</view>
          	<view class="tradparLitime">{{lItem.add_time}}</view>
          </view>
          <view class="tradparshuu">{{lItem.to_block}}</view>
      </navigator>
    </view>
    <view class="stayBox" v-if="showEmpty == true">
    	<image src="/static/images/by_24.png" mode="" style="width:300rpx;height:200rpx;"></image>
    	<view>{{i18n.logEmpty}}</view>
    </view>
	</view>
</template>
<script>
 export default {   
   data(){
     return {
       showEmpty:false,
       stopPull:false,
       logsList:[],//日志列表
       reConfig:{ //请求配置
         mid:2,
         page:0,
         size:10
       }
     }
   },
   computed:{
     i18n(){
       return this.$t('common');
     }
   },
   onLoad(){
    uni.setNavigationBarTitle({
      title:this.$t('navText').hz_ec_log
    })
   },
   onReady() {
     this.fetchLogs();
   },
   onReachBottom(){ //上拉加载
     this.loadMore();
   },
   methods:{
     fetchLogs(){
       uni.showLoading({
         title:this.$t('warn').load,
         mask:true
       })
       this.showEmpty = false;
       this.$request.get(this.$KPI.exchange.exFireLogs,this.reConfig).then(res => {
         // console.log(res);
          if(res.code === 200 && res.data){
            if(res.data.length === 0){
             this.showEmpty = true;
            }else{
              this.logsList = this.logsList.concat(res.data);
              this.reConfig.page++;
            }
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
          setTimeout(()=>{
            uni.hideLoading();
          },1000)  
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
          this.$request.get(this.$KPI.exchange.exFireLogs,this.reConfig).then( res => {
             if(res.code === 200 && res.data){
               if(res.data.length === 0){
                 this.stopPull = true;
                   setTimeout(()=> {
                     uni.showToast({
                       icon:'none',
                       title:this.$t('warn').pullEnd,
                       position:'bottom',
                       duration:2000
                     })
                   },1000)
                   return false;
               }else{
                   this.logsList =  this.logsList.concat(res.data);
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
			color:#333333;
			padding-top:50%;
		}
	
</style>
