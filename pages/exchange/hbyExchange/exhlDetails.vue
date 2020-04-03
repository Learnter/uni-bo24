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
         <view class="fx1">{{i18n.way}}：</view>
         <view class="textColor">{{detailInfo.name_cn}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.count}}：</view>
         <view class="textColor">{{detailInfo.block_num}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.price}}：</view>
         <view class="textColor">{{detailInfo.block_price}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.asset}}：</view>
         <view class="textColor">{{detailInfo.to_mid}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.amount}}：</view>
         <view class="textColor">{{detailInfo.to_money}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.time}}：</view>
         <view class="textColor">{{detailInfo.add_time}}</view>
       </view>
       <view class="">
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
          return this.$t('exhlDetails');
        }
      },
	    onLoad(option) {
        uni.setNavigationBarTitle({
          title:this.$t('navText').hby_ec_details
        })
	      this.reConfig.id = option.logId;
	      this.fetchDetails();
	    },
			methods: {
				fetchDetails(){
	        this.$request.get(this.$KPI.exchange.exhlDetails,this.reConfig).then(res => {
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

