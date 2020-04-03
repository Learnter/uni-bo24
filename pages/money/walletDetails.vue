<template>
	<view class="logDetail">
		<view class="logHead">
     <view class="logBox">
       <view class="logImg">
           <image src="/static/images/head.png"></image>
       </view>
     </view>
      <view class="logMoney">{{detailInfo.money}}</view>
		</view>
    <view class="logList">
       <view class="uni-flex logRow">
         <view class="">{{i18n.way}}：</view>
         <view class="textColor fx1">{{detailInfo.is_type}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="">{{i18n.total}}：</view>
         <view class="textColor fx1">{{detailInfo.total}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="">{{i18n.note}}：</view>
         <view class="textColor fx1 uni-ellipsis">{{detailInfo.note}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="">{{i18n.time}}：</view>
         <view class="textColor fx1">{{detailInfo.edit_time}}</view>
       </view>
       <view class="uni-flex logRow">
         <view class="">{{i18n.uId}}：</view>
         <view class="textColor fx1">{{detailInfo.come_uid}}</view>
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
          return this.$t('billing');
        }
      },
	    onLoad(option) {
        uni.setNavigationBarTitle({
          title:this.$t('navText').bl_details
        })
	      this.reConfig.id = option.logId;
	    },
      onReady() {
        this.fetchDetails();
      },
			methods: {
				fetchDetails(){
	        this.$request.get(this.$KPI.moneyManage.logsDetail,this.reConfig).then(res => {
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
    justify-content:center;
  }
  
  .logMoney{
    height:80rpx;
    line-height:80rpx;
    font-size:40rpx;
    color:red;
    text-align:center;
    
  }
  
  .logRow:nth-child(5){
   border:none;
  }
  
  .logRow:nth-child(3){
    border-bottom:1rpx solid #EFF0F2;
  }
  
  .textColor{
    text-align:right;
  }

</style>
