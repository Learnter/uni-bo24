<template>
	<view class="logDetail">
		<view class="uni-flex logHead">
      <view class="logImg">
         <image src="/static/images/a024laner_19.png" mode=""></image>
      </view>
      <text>账号：10000</text>
		</view>
    <view class="logList">
       <view class="uni-flex logRow">
         <view class="fx1">转出金额</view>
         <view class="textColor">fghydfgh</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">收款账号</view>
         <view class="textColor">fghydfgh</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">实际到账</view>
         <view class="textColor">fghydfgh</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">手续费比例</view>
         <view class="textColor">fghydfgh</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">转账货币</view>
         <view class="textColor">fghydfgh</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">创建时间</view>
         <view class="textColor">fghydfgh</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">备注</view>
         <view class="textColor">fghydfgh</view>
       </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailInfo:{}
			}
		},
    onLoad() {
      this.fetchDetails();
    },
		methods: {
			fetchDetails(){
        
      }
		}
	}
</script>

<style scoped>
  page,.logDetail{
    width:100%;
    min-height:100%;
    background:#F0F0F2;
  }
  .logHead{
    padding:20rpx;
    align-items:center;
    justify-content:center;
    border-bottom:1rpx solid #EFF0F2;
    background:#FFFFFF;
  }
  .logImg{
    width:100rpx;
    height:100rpx;
    border:4rpx solid cornflowerblue;
    border-radius:50%;
    margin-right:20rpx;
  }
  .logImg image{
    width:100%;
    height:100%;
    padding:10rpx;
  }
  .logList{
    padding:20rpx 20rpx 30rpx;
    background:#FFFFFF;
  }
  .logRow{
   padding:10rpx 0rpx;
   font-size:30rpx;
  }
  
  .logRow:nth-child(5){
    border-bottom:1rpx solid #EFF0F2;
  }

  .textColor{
    color:#C2C2C2;
    font-size:26rpx;
  }

</style>
