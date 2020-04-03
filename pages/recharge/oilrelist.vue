<template>
	<view class="recoeBox">
    <view  v-for="(item,index) in logList" :key="index">
      <!-- <navigator class="tradparLi uni-flex" :url="'/pages/recharge/olDetails?logId='+item.id"  hover-class="none"> -->
        <view class="tradparLi uni-flex">
          <view class="fx1">
          	<view class="tradparLitx">{{records.type}}（{{item.c_money}}）</view>
          	<view class="tradparLitime">{{item.add_time}}</view>
          </view>
          <view class="tradparshuuchu">{{item.k_money}} {{item.bid}}</view>
        </view>
      	
      <!-- </navigator> -->
    </view>
		
    <view class="stayBox" v-if="showEmpty == true">
    	<image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
    	<view>{{i18n.logEmpty}}</view>
    </view>
	</view>
</template>

<script>
  export default {
    data(){
      return{
        showEmpty:false,
        stopPull:false,
        logList:[],
        logConfig:{
          page:0,
          size:10
        }
      }
    },
   computed:{
     i18n(){
       return this.$t('common');
     },
     records(){
       return this.$t('oilrelist');
     }
   },
   onLoad() {
     uni.setNavigationBarTitle({
     	title:this.$t('navText').oc_rc_record
     })
   },
    onReady(){
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
        this.$request.get(this.$KPI.recharge.oilCardRechargeLogs,this.logConfig).then( res => {
            if(res.code === 200 && res.data){
              if(res.data.length !== 0){
                this.logList = res.data;
                this.logConfig.page++;
              }else{
                this.showEmpty = true;
              }
            }else{
              uni.showToast({
                icon:'none',
                title:res.msg,
                duration:2000
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
            this.$request.get(this.$KPI.recharge.oilCardRechargeLogs,this.logConfig).then( res => {
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
                     this.logList =  this.logList.concat(res.data);
                     this.logConfig.page++;
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
