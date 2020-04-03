<template>
	<view class="shuruknzdBox">
		<form @submit="formSubmit">
			<view class="conhbytopBox">
				<view class="conhbytopCont">
					<view class="uni-flex conhbytltBox">
						<view class="conhbytlt">{{cvInfo.hby_name}}</view>
						<view class="fx1 conhbytlzx">
							<image src="/static/images/2019a056_15.png" mode=""></image>
						</view>
					</view>
					<view class="conhbyshu">{{cvInfo.hby_money}}</view>
					<view class="conusdttlt">{{cvInfo.usdt_name}}</view>
					<view class="conusdtshu">{{cvInfo.usdt_money || 0}}</view>
				</view>
				<image src="/static/images/a024laner_68.png" mode="aspectFit" class="conhbytbg"></image>
			</view>
			<view class="sshulvBox">
				<text class="text_1">{{i18n.rate}}：</text>
				<text class="text_2">{{cvInfo.hui_per}}</text>
			</view>

			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.ec_count}}（USDT）：</view>
				<view class="with-fun qxloninput">
					<input type="number" class="uni-input" v-model="cvConfig.to_add_num" :placeholder="holder.count" placeholder-style="color:#A5D6FA;" />
				</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.tradePwd}}：</view>
				<view class="with-fun qxloninput">
					<input type="number" password class="uni-input" v-model="cvConfig.secpwd" :placeholder="holder.dealPwd" placeholder-style="color:#A5D6FA;" />
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
				cvInfo: {}, //兑换信息
				cvConfig: { //兑换配置
					to_add_num: '',
					secpwd: ''
				}
			}
		},
		computed:{
		   i18n(){
			 return this.$t('conversion');
		   },
		   holder(){
			   return this.$t('holder');
		   }
		},
		onLoad() {
		   uni.setNavigationBarTitle({
				title:this.$t('navText').ec_usdt
			})
		},
		onReady() {
		  this.fetchCvInfo();
		},
		methods: {
			fetchCvInfo() { //获取兑换信息
				this.$request.get(this.$KPI.USDT.convert, {type:1}).then(res => {
					if (res.code === 200 && res.data !== {}) {
						this.cvInfo = res.data;
					}
				})
			},
			formSubmit() {
				let {
					to_add_num,
					secpwd
				} = this.cvConfig;
				if (to_add_num.trim().length === 0) {
					uni.showToast({
						icon: 'none',
						title: this.$t('warn').emptyNumber
					})
					return false;
				} else if (secpwd.trim().length === 0) {
					uni.showToast({
						icon: 'none',
						title: this.$t('warn').dealPwdEmpty
					})
					return false;
				}
				this.$request.post(this.$KPI.USDT.cvAction, this.cvConfig).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'success',
							title: this.$t('warn').exchangeSuccess
						});
						this.cvConfig.to_add_num = '';
						this.cvConfig.secpwd = '';
						this.fetchCvInfo();
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				});
			},
		},
		onNavigationBarButtonTap(e) { // 转账日志
			uni.navigateTo({
				url: '/pages/hbyconve/conversionlist'
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
		top: 25%;
		left: 45%;
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
		padding: 10rpx 0rpx 30rpx 0rpx;
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
