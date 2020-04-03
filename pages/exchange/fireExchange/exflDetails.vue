<template>
	<view class="logDetail">
		<view class="uni-flex logHead">
     <view class="uni-flex-item logBox">
       <view class="logImg">
             <image src="/static/images/head.png"></image>
       </view>
     </view>
      <text class="uni-flex-item">{{i18n.account}}：{{detailInfo.user_id}}</text>
		</view>
    <view class="logList">
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.wallety}}：</view>
         <view class="textColor">{{detailInfo.mid}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.count}}：</view>
         <view class="textColor">{{detailInfo.to_block}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.price}}：</view>
         <view class="textColor">{{detailInfo.block_price}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.poundage}}：</view>
         <view class="textColor">{{detailInfo.fee}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.toAccount}}：</view>
         <view class="textColor">{{detailInfo.to_bid}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.actual}}：</view>
         <view class="textColor">{{detailInfo.money}}</view>
       </view>
       <view class="uni-flex logRow">
        <view class="fx1">{{i18n.time}}：</view>
        <view class="textColor">{{detailInfo.add_time}}</view>
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
          return this.$t('exflDetails');
        }
      },
	    onLoad(option) {
        uni.setNavigationBarTitle({
          title:this.$t('navText').hz_ec_details
        })
	      this.reConfig.id = option.logId;
	    },
      onReady() {
        this.fetchDetails();
      },
			methods: {
				fetchDetails(){
	        this.$request.get(this.$KPI.exchange.exflDetails,this.reConfig).then(res => {
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
</script>

<style scoped>
  @import url("../../transferzz/transferDetails.css");
  .logBox{
    display:flex;
    justify-content:flex-end;
  }
  
  .logRow:nth-child(5){
    border:none;
  }
  
  .logRow:nth-child(6){
     border-bottom:1rpx solid #EFF0F2;
  }

</style>

