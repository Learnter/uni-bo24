<template>
	<view class="meslistBox">
		<view class="meslist" v-for="(lItem,lIndex) in logsList" :key="lIndex">
			<view class="meslislxx">{{lItem.message}}：</view>
			<view class="meslisCont clearfix">
				 {{lItem.content}}
         <block v-for="(pItem,pIndex) in lItem.pay_img" :key="pIndex">
           	<image :src="pItem" mode=""></image>
         </block>
				</view>
			<view class="meslistime">{{i18n.time}}：{{lItem.add_time}}</view>
		</view>
    <view class="stayBox" v-if="showEmpty == true">
    	<image src="/static/images/by_24.png" style="width:300upx;height:200upx;"></image>
    	<view>{{i18n.emptyMessage}}</view>
    </view>
	</view>
</template>

<script>
  export default {
    data(){
      return {
        showEmpty:false,
        stopPull:false,
        logsList:[],//留言列表
        reConfig:{ //请求配置
          tid:'',
          page:0,
          size:10
        }
      }
    },
    computed:{
      i18n(){
        return this.$t('mymesgelist');
      }
    },
    onLoad(option){
      uni.setNavigationBarTitle({
        title:this.$t('navText').mg_record
      });
      this.reConfig.tid = option.parent_id;
    },
    onReady() {
      this.fetchLogs();
    },
    onReachBottom(){ //上拉加载
      this.loadMore();
    },
    methods:{
      fetchLogs(){
        this.showEmpty = false;
        this.$request.get(this.$KPI.fireDeal.messages,this.reConfig).then(res => {
           if(res.code === 200){
             if(res.data  && res.data.length === 0){
              this.showEmpty = true;
             }else{
               this.logsList = res.data;
               this.reConfig.page++;
             }
           }else{
             uni.showToast({
               icon:'none',
               title:res.msg
             })
           }
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
            this.$request.get(this.$KPI.exchange.exLogs,this.reConfig).then( res => {
               if(res.code === 200 ){
                 if(res.data && res.data.length === 0){
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
		background: #F4F5F6;
	}
	.meslistBox {
		padding: 20rpx;
	}
	.meslist {
		margin-bottom: 20rpx;
		background: #ffffff;
		border-radius: 10rpx;
		padding: 20rpx;
	}
	.meslislxx {
		font-size: 24rpx;
		color: #158DFF;
		padding: 5rpx 0rpx;
	}
	.meslisCont {
		font-size: 24rpx;
		color: #999999;
		padding: 5rpx 0rpx;
	}
	.meslisCont image {
		width: 100rpx;
		height: 100rpx;
		float: left;
	}
	.meslistime {
		font-size: 24rpx;
		color: #999999;
	}
	.meslistzt {
		font-size: 24rpx;
		color: #999999;
	}
	.meslistztActive {
		font-size: 24rpx;
		color: #158DFF;
	}
	.yihuifCont {
		background: #F4F5F6;
		border-radius: 10rpx;
		padding: 20rpx;
		color: #666666;
		font-size: 24rpx;
	}
</style>
