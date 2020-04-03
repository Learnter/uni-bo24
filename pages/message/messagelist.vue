<template>
	<view class="meslistBox">
    <view>
      <view class="meslist"  v-for="(lItem,lIndex) in msgList" :key="lIndex">
        <view class="uni-flex">
          <view class="fx1 meslisttl">{{i18n.title}}：{{lItem.title}}</view>
          <view class="meslistztActive">{{lItem.status}}</view>
        </view>
        <view class="meslislxx">{{i18n.type}}：{{lItem.type}}</view>
        <view class="meslisCont clearfix">
          {{lItem.content}}
          <image v-show="lItem.thumb" :src="lItem.thumb" mode=""></image>
        </view>
        <view class="meslistime">2019-06-12 21:29:37</view>
        <view class="yihuifCont" v-show="lItem.reply">
          {{lItem.reply}}
          <view class="meslistime" style="text-align: right;">{{lItem.reply_time}}</view>  
        </view>
      </view>
    </view>
    <view class="stayBox" v-if="showEmpty">
    	<image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
    	<view>{{common.logEmpty}}</view>
    </view>
	</view>
</template>
<script>
  export default{
    data(){
      return{
        showEmpty:false,
        stopPull:false,
        msgList:[],
        msgConfig:{
          page:0,
          size:10
        }
      }
    },
    computed:{
      i18n(){
        return this.$t('messageindex');
      },
      common(){
        return this.$t('common');
      }
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').ms_list
      })
    },
    onReady(){
      this.fetchMessageList();
    },
    onReachBottom(){
      this.loadMore();
    },
    methods:{
      fetchMessageList(){ //获取留言列表
        uni.showLoading({
          mask:true,
          title:this.$t('warn').load
        })
        this.$request.get(this.$KPI.leaveMessage.lMessagelList,this.msgConfig).then(res => {
          if(res.code === 200 && res.data ){
            if(res.data.length === 0){
              this.showEmpty = true;
            }else{
              this.msgList = res.data;
              this.msgConfig.page++;
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
        if(this.stopPull){
          return false;
        }else{
          uni.showLoading({
            mask:true,
            title:this.$t('warn').load
          })
          
          this.$request.get(this.$KPI.leaveMessage.lMessagelList,this.msgConfig).then(res => {
            if(res.code === 200 && res.data ){
              if(res.data.length === 0){
                this.stopPull = true;
                uni.showToast({
                  icon:'none',
                  title:this.$t('warn').pullEnd,
                  position:'bottom'
                })
              }else{
                this.msgList = this.msgList.concat(res.data);
                this.msgConfig.page++;
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
 .stayBox {
      text-align: center;
      color:#333333;
      padding-top:50%;
    }
</style>
