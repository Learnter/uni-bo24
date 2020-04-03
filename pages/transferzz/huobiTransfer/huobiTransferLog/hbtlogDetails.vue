<template>
	<view class="logDetail">
		<view class="uni-flex logHead">
      <view class="uni-flex-item logBox">
        <view class="logImg">
            <image :src="detailInfo.logo" mode=""></image>
        </view>
      </view>
      <text class="uni-flex-item">{{i18n.account}}：{{detailInfo.user_id}}</text>
		</view>
    <view class="logList">
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.money}}：</view>
         <view class="textColor">{{detailInfo.money}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.toAccount}}：</view>
         <view class="textColor">{{detailInfo.to_uid}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.actual}}：</view>
         <view class="textColor">{{detailInfo.to_money}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.poundage}}：</view>
         <view class="textColor">{{detailInfo.fee}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.currency}}：</view>
         <view class="textColor">HBY</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.time}}：</view>
         <view class="textColor">{{detailInfo.add_time}}</view>
       </view>
       <view>
         <view class="fx1">{{i18n.note}}：</view>
         <view class="textColor">{{detailInfo.note}}</view>
       </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailInfo:{},
        reConfig:{
          id:''
        }
			}
		},
    computed:{
      i18n(){
        return this.$t('transferDetails');
      }
    },
    onLoad(option) {
      uni.setNavigationBarTitle({
          title:this.$t('navText').transferDetail
        })
      this.reConfig.id = option.logId;
      this.fetchDetails();
    },
		methods: {
			fetchDetails(){
        this.$request.get(this.$KPI.transfer.hbylogsDetail,this.reConfig).then(res => {
          if(res.code === 200){      
            if(res.data && Object.keys(res.data).length !== 0){
              this.detailInfo = res.data;
            }
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
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
    font-size:32rpx;
  }
  .fx1{
    font-size:30rpx;
  }
  .logBox{
    display:flex;
    justify-content:flex-end;
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
    box-sizing:border-box;
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
    font-size:28rpx;
  }
</style>