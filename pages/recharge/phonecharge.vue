<template>
	<view>
		<view class="apbaogBox">
			<form>
				<view class="aprechBox">
					<view class="aprechinptBox">
						<view class="aprechinptl">{{i18n.mobileNum}}：</view>
						<input type="text" :placeholder="i18n.mobileHolder" maxlength="11" class="aprechinput fx1"  v-model="rechargeConfig.mobile" />
					</view>
					<view class="aprechinptBox">
						<view class="aprechinptl">{{i18n.tradePwd}}：</view>
						<input type="password" :placeholder="i18n.tradePwdHolder" class="aprechinput fx1" v-model="rechargeConfig.secpwd" />
					</view>
				</view>
				<view class="aprectitle">{{i18n.amount}}：</view>
				<view class="aprejexzBoxhe clearfix">
					<view class="aprejexzBox" v-for="(item,index) in list" :key="index">
						<view class="aprejexzHe" @click="gospec(item,index)" :class="spec == index ? 'aprejexzHeActive' : ''">
							<view class="aprejexzqs">{{item.num}}{{i18n.rmb}}</view>
							<view class="aprejexzsj">{{i18n.price}}：{{item.money}} HBY</view>
						</view>
					</view>
				</view>
			</form>
		</view>
		<view class="chzxuwtsBox">
			<view class="chzxuwtstl">{{i18n.note}}：</view>
			<view class="chzxuwtCont">
				<view>{{i18n.tips1}}</view>
				<view>{{i18n.tips2}}</view>
				<view>{{i18n.tips3}}</view>
				<view>{{i18n.tips4}}</view>
			</view>
		</view>

		<!-- 弹窗 s -->
		<view class="chzopupBox" :class="chzopup == true ? 'chzopupBoxActive' : ''">
			<view class="chztbtleBox uni-flex">
				<view class="chztzwei"></view>
				<view class="fx1 chztbtle">{{i18n.topUpTips}}</view>
				<view class="chztzwei" @click="chzopupan">
					<uni-icon type="close" color="#ffffff" size="24"></uni-icon>
				</view>
			</view>
			<view class="chztbtCont">
				<view class="chztbttext_1">{{rechargeItem.num}}{{i18n.rmb}}</view>
				<view class="chztbttext_2">{{i18n.price}}：{{rechargeItem.money}} HBY</view>
				<view class="btn-area whlogbtnBox">
					<button class="whlogbtn" @click="formSubmit">{{i18n.comfirm}}</button>
				</view>
			</view>
		</view>
		<!-- 弹窗 e -->

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
				spec: 100,
				chzopup: false,
				list: [], //充值金额列表
				rechargeItem: {}, //选中的充值金额
				rechargeConfig: { //充值配置参数
					mobile: '', //手机号
					secpwd: '', //交易密码
					money: '' //充值金额
				}
			}
		},
    computed:{
      i18n(){
        return this.$t('phonecharge');
      }
    },
    onLoad(){
       uni.setNavigationBarTitle({
       	title:this.$t('navText').tel_recharge
       })
    },
		onReady() {
			this.fetchRechargelist();
		},
		// 充值记录
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/recharge/phonechlist'
			});
		},
		methods: {
			fetchRechargelist() { //充值列表
				this.$request.get(this.$KPI.recharge.telRecharge).then(res => {
					if (res.code === 200 && res.data && res.data.length != 0) {
						this.list = res.data;
					}
				})
			},
			gospec(obj, index) { //点击充值参数列表
				this.spec = index;
				this.chzopup = true;
				this.rechargeItem = obj;
				this.rechargeConfig.money = obj.num;
			},
			chzopupan() {
				this.chzopup = false;
				this.spec = 100;
			},
			formSubmit() { //提交表单
				this.$request.post(this.$KPI.recharge.telRechargeAction, this.rechargeConfig).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'loading',
							title: this.$t('warn').topUpSuccess,
							duration: 2000
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg,
							duration: 2000
						})
					}
					this.chzopup = false;
					this.spec = 100;
				})
			}
		}
	}
</script>

<style>
	@import url("phonecharge.css");
</style>
