<template>
	<view>
		<view class="usebakBox">
			<view class="usebakList"  v-for="(lItem,lIndex) in bankList" :key="lIndex">
				<view class="usebakCont uni-flex">
					<view class="usebakCimg"><image :src="lItem.logo" mode="widthFix"></image></view>
					<view class="fx1">
						<view class="usebakmimz">{{lItem.opening_id}}</view>
						<view class="usebakmzh">
							<text class="text_1">****</text>
							<text class="text_1">****</text>
							<text class="text_1">****</text>
							<text class="text_1">****</text>
							<text class="text_2">{{lItem.bank_account}}</text>
						</view>
						<view class="uni-flex">
							<view class="fx1 usbcazuolan">{{lItem.default_msg}}</view>
							<view class="fx1 usbcazuolan" @click="editBankInfo(lItem)">{{i18n.edit}}</view>
							<view @click="removeBank(lItem,lIndex)"><uni-icon style="z-index:999" type="trash" color="#ffffff" size="26"></uni-icon></view>
						</view>
					</view>					
				</view>
				<image src="/static/images/a024laner_68.png" mode="aspectFit" class="usebakbgg"></image>
			</view>
      <view class="stayBox" v-if="showEmpty" >
      	<image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
      	<view style="color:#FFFFFF">{{i18n.emptyBank}}</view>
      </view>
		</view>
		<view class="usebakBtn" @click="bankaddan">+{{i18n.addBank}}</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
        showEmpty:false,
				bankList:[]
			}
		},
    computed:{
      i18n(){
        return this.$t('userbank');
      }
    },
    onLoad() {
     uni.setNavigationBarTitle({
       title:this.$t('navText').userBank
     })
    },
    onShow(){
      this.fetchBankList();
    },
		methods: {
      fetchBankList(){ //获取银行列表
         this.showEmpty = false;
         this.$request.get(this.$KPI.receipt.bankList).then( res => {
           if(res.code === 200){
              if(res.data && res.data.length !== 0){
                this.bankList = res.data;
              }else{
                this.showEmpty = true;
              }
           }else{
             uni.showToast({
               icon:'none',
               title:res.msg
             })
           }
         })
      },
      removeBank(obj,index){ //移除银行卡
       // console.log(obj,index);
         uni.showModal({
           title:this.$t('warn').tipTitle,
           content:this.$t('warn').askDelete,
           confirmText:this.$t('common').comfirm,
           cancelText:this.$t('common').cancel,
           success: (res) => {
             if(res.confirm){
               this.$request.post(this.$KPI.receipt.removeBankCard,{id:obj.id}).then(res => {
                  if(res.code === 200){
                    this.bankList.splice(index,1);
                    uni.showToast({
                      icon:'success',
                      title:this.$t('warn').deleteSuccess
                    })
                  }else{
                    uni.showToast({
                      icon:'none',
                      title:res.msg
                    })
                  }
               })
             }
           }
         })
      },
      editBankInfo(obj){ //修改银行卡信息
        uni.navigateTo({
          url:'/pages/account/bankEdit?b_id='+obj.id
        })
      },
			bankaddan(){ //添加新银行卡
				uni.navigateTo({
					url: '/pages/account/bankadd'
				});
			}
		}
	}
	
</script>

<style>
	page {
	 background: #1283F2;
	}
	.usebakBox {
		padding:20rpx 20rpx 100rpx 20rpx;
	}
	.usebakList {
		padding: 30rpx 20rpx 30rpx 30rpx;
		background: linear-gradient(left,#6AB4FC,#3198FC);
		border-radius: 10rpx;
		position: relative;
		overflow: hidden;
		margin-bottom: 20rpx;
	}
	.usebakbgg {
		position: absolute;
		top:15%;
		left:40%;
		z-index: 1;
		height: 130rpx !important;
	}
	
	.usebakBtn {
		position: fixed;
		left:0rpx;
		bottom:0rpx;
		z-index: 100;
		width: 100%;
		line-height: 40rpx;
		background: #158DFF;
		color: #ffffff;
		text-align: center;
		padding: 30rpx 0rpx;
	}
	.usebakCimg {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		overflow:hidden;
		background: #ffffff;
		margin-right: 20rpx;
	}
	.usebakCimg image {
		width: 100%;
		height: 100%;
	}
	.usebakmimz {
		line-height: 80rpx;
		color: #ffffff;
	}
	.usebakmzh .text_1 {
		margin-left: 10rpx;
		color: #FDCC00;
	}
	.usebakmzh .text_2 {
		margin-left: 10rpx;
		color: #ffffff;
	}
	.usbcazuolan {
		color: #ffffff;
		line-height: 52rpx;
		height: 52rpx;
		margin-top: 10rpx;
	}
	.usbcazshac {
		height: 52rpx;
	}
	
  .stayBox {
  		text-align: center;
  		color:#333333;
  		padding-top:50%;
  	}
	
</style>
