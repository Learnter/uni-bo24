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
         <view class="fx1">{{i18n.outWallet}}：</view>
         <view class="textColor">{{detailInfo.mid}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.outMoney}}：</view>
         <view class="textColor">{{detailInfo.money}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="fx1">{{i18n.toAccount}}：</view>
         <view class="textColor">{{detailInfo.to_mid}}</view>
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
          return this.$t('exlDetails');
        }
      },
	    onLoad(option) {
		  uni.setNavigationBarTitle({
				title:this.$t('navText').tel_rc_details
			})
	      this.reConfig.id = option.logId; 
	    },
		onReady() {
		  this.fetchDetails();
		},
			methods: {
				fetchDetails(){
	        this.$request.get(this.$KPI.exchange.exlDetails,this.reConfig).then(res => {
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
  @import url("../transferzz/transferDetails.css");
  .logBox{
    display:flex;
    justify-content:flex-end;
  }

</style>

