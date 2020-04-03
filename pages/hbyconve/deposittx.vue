<template>
	<view class="shuruknzdBox">
		<form @submit="formSubmit">		
			<view class="conhbytopBox">
				<view class="conhbytopCont">
					<view class="uni-flex conhbytltBox">
						<view class="conhbytlt">{{deInfo.hby_name}}</view>
						<view class="fx1 conhbytlzx"><image src="/static/images/2019a056_15.png" mode=""></image></view>
					</view>
					<view class="conhbyshu">{{deInfo.hby_money || 0}}</view>
					<view class="conusdttlt">{{deInfo.cny_money || 0}}</view>					
				</view>
				<image src="/static/images/a024laner_68.png" mode="aspectFit" class="conhbytbg"></image>
			</view>
			<view class="sshulvBox">
				<text class="text_1">{{i18n.rate}}：</text>
				<text class="text_2">{{deInfo.hui_per}}</text>
			</view>
			
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.wd_count}}：（USDT）</view>
				<view class="with-fun qxloninput">
					<input type="digit" v-model="deConfig.carry_add_num" class="uni-input" :placeholder="holder.extractNum" placeholder-style="color:#A5D6FA;" />				
				</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">USDT {{i18n.wl_address}}：</view>
				<view class="qxlondizh">{{deInfo.usdt_address}}</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.tradePwd}}：</view>
				<view class="with-fun qxloninput">
					<input type="password" v-model="deConfig.secpwd" class="uni-input" :placeholder="holder.dealPwd" placeholder-style="color:#A5D6FA;" />				
				</view>
			</view>
			<view class="btn-area whlogbtnBox">
				<button formType="submit" class="whlogbtn">{{i18n.submit}}</button>
			</view>
		</form>
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
				deInfo:{},
				deConfig:{
				  carry_add_num:'',
				  secpwd:''
				}
			}
		},
		computed:{
			i18n(){
				return this.$t('deposittx');
			},
			holder(){
				return this.$t('holder');
			}
		},
    onLoad(){ 
	  uni.setNavigationBarTitle({
	  	title:this.$t('navText').wd_usdt
	  })
    },
	onReady() {
	  this.fetchDeInfo();
	},
	methods: {		
		fetchDeInfo(){
			this.$request.get(this.$KPI.USDT.convert,{type:2}).then(res => {
			  if(res.code === 200 && res.data !== {}){
				this.deInfo = res.data;
            }
        })
      },
      formSubmit(){ //提现操作
       let {carry_add_num,secpwd} = this.deConfig;
        if(carry_add_num.trim().length === 0){
          uni.showToast({
            icon:'none',
            title:this.$t('warn').emptyNumber
          })
          return false;
        }else if(secpwd.trim().length === 0){
          uni.showToast({
            icon:'none',
            title:this.$t('warn').dealPwdEmpty
          })
          return false;
        }
        this.$request.post(this.$KPI.USDT.dsAction,this.deConfig).then(res => {
          if(res.code === 200){
            uni.showToast({
              icon:'success',
              title:this.$t('warn').extractSuccess
            });
            this.deConfig.carry_add_num ='';
            this.deConfig.secpwd = '';
            this.fetchDeInfo();
          }else{
            uni.showToast({
              icon:"none",
              title:res.msg
            })
          }
        })
      }	
	},
	// 转账日志
	onNavigationBarButtonTap(e) {
		uni.navigateTo({
			url: '/pages/hbyconve/deposittxlist'
		});
	}
}
</script>

<style>
	page {
		background: #158DFF;
	}
	.conhbytopBox {
		background: #1283F2;
		border-radius: 10rpx;
		position: relative;
		overflow: hidden;
		min-height: 240rpx;
		padding: 30rpx;
	}
	.conhbytbg {
		position: absolute;
		top:25%;
		left:45%;
		z-index: 1;
		height: 250rpx !important;
	}
	.conhbytopCont {
		position: relative;
		z-index: 10;
	}
	.conhbytltBox {
		line-height: 50rpx;
	}
	.conhbytlt {
		color: #ffffff;
		font-size: 26rpx;
		line-height: 50rpx;
	}
	.conhbytlzx {
		line-height: 50rpx;
		padding-left: 10rpx;
	}
	.conhbytlzx image {
		width: 10rpx;
		height: 14rpx;
	}
	.conhbyshu {
		font-size: 55rpx;
		color: #ffffff;
	}
	.conusdttlt {
		color: #7CBCFC;
		font-size: 24rpx;
		margin-top: 10rpx;
	}
	.conusdtshu {
		color: #7CBCFC;
		font-size: 30rpx;
	}
	.sshulvBox {
		padding:10rpx 0rpx 30rpx 0rpx;
	}
	.sshulvBox .text_1 {
		color: #A5D6FA;
		font-size: 26rpx;
	}
	.sshulvBox .text_2 {
		color: #ffffff;
		font-size: 26rpx;
	}
	
	
</style>
