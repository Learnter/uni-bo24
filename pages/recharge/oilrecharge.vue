<template>
	<view>
		<view class="apbaogBox">
			<form>
				<view class="aprechBox">
					<view class="aprechinptBox ">
						<view class="aprechinptl">{{i18n.cardNum}}：</view>
						<input type="text" v-model="reachargeConfig.oil_account" maxlength="19" :placeholder="i18n.cardHolder" class="aprechinput fx1" />
					</view>
					<view class="aprechinptBox">
						<view class="aprechinptl">{{i18n.mobileNum}}：</view>
						<input type="text" v-model="reachargeConfig.oil_mobile" maxlength="11" :placeholder="i18n.mobileHolder" class="aprechinput fx1" />
					</view>
					<view class="aprechinptBox">
						<view class="aprechinptl">{{i18n.tradePwd}}：</view>
						<input type="password" v-model="reachargeConfig.secpwd" :placeholder="i18n.tradePwdHolder" class="aprechinput fx1" />
					</view>
				</view>
				<view class="aprectitle">{{i18n.topUpType}}：</view>
				<view class="ykdeBoxHe">
					<radio-group @change="selReacharge">
						<view class="uni-flex ykdeBox">
							<view class="ykdeimg">
								<image src="/static/images/zsh.png" mode=""></image>
							</view>
							<view class="fx1 ykdetext">{{i18n.type1}}</view>
							<view class="ykdexzan">
								<label class="radio">
									<radio value="1" checked="true" />
								</label>
							</view>
						</view>
						<view class="uni-flex ykdeBox">
							<view class="ykdeimg">
								<image src="/static/images/zsy.png" mode=""></image>
							</view>
							<view class="fx1 ykdetext">{{i18n.type2}}</view>
							<view class="ykdexzan">
								<label class="radio">
									<radio value="2" />
								</label>
							</view>
						</view>
					</radio-group>
				</view>
				<view class="aprectitletwo">{{i18n.amount}}：</view>
				<view class="aprejexzBoxhe clearfix">
					<view class="aprejexzBox" v-for="(item,index) in list" :key="index">
						<view class="aprejexzHe" @click="gospec(item,index)" :class="spec == index ? 'aprejexzHeActive' : ''">
							<view class="aprejexzqs">{{item.num}}{{i18n.rmb}}</view>
							<view class="aprejexzsj">{{i18n.price}}：{{item.money}} HBY</view>
						</view>
					</view>
				</view>
				<view class="btn-area ocyknBox">
					<button @click="formSubmit" class="whlogbtn" :class="spec !== null ?'activeRecharge':''">{{i18n.comfirm}}</button>
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
				spec: 0,
				list: [],
				reachargeType: { //充值类型
					type: 1
				},
				reachargeConfig: { //充值配置
					oil_account: '',
					oil_mobile: '',
					secpwd: '',
					chargeType: '',
					money: ''
				}
			}
		},
    computed:{
      i18n(){
        return this.$t('oilrecharge');
      }
    },
		onLoad(){
			uni.setNavigationBarTitle({
				title:this.$t('navText').oc_recharge
			})
		},
    onReady() {
      this.fetchRechargelist();
    },
		methods: {
			fetchRechargelist() { //充值列表
				this.$request.get(this.$KPI.recharge.oilCardRecharge, this.reachargeType).then(res => {
					if (res.code === 200 ) {
             if(res.data && res.data.length !== 0){
               this.list = res.data;
               this.reachargeConfig.money = res.data[0].num;
             }
					}else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
				})
			},
			selReacharge(e) { //选择充值方式
				this.reachargeType.type = e.detail.value;
				this.spec = 0;
				this.fetchRechargelist();
			},
			formSubmit() { //充值提交
// 				let {
// 					oil_account,
// 					oil_mobile,
// 					secpwd
// 				} = this.reachargeConfig;
// 				if (oil_account.trim().length === 0) {
// 					uni.showToast({
// 						icon: "none",
// 						title: '请输入油卡卡号'
// 					})
// 					return false;
// 				} else if (oil_mobile.trim().length === 0) {
// 					uni.showToast({
// 						icon: "none",
// 						title: '请输入手机号码'
// 					})
// 					return false;
// 				} else if (secpwd.trim().length === 0) {
// 					uni.showToast({
// 						icon: "none",
// 						title: '请输入密码'
// 					})
// 					return false;
// 				} else if (this.spec == null) {
// 					uni.showToast({
// 						icon: "none",
// 						title: '请选择充值金额'
// 					})
// 					return false;
// 				}
// 
				uni.showModal({
					title: this.i18n.amount,
					content: this.reachargeConfig.money + this.i18n.rmb,
          confirmText:this.$t('common').comfirm,
          cancelText:this.$t('common').cancel,
					success: (res) => {
						if (res.confirm) {
							this.$request.post(this.$KPI.recharge.oilCardRechargeAction, this.reachargeConfig).then(res => {
								if (res.code === 200) {
									uni.showToast({
										icon: 'loading',
										title: this.$t('warn').topUpSuccess,
										duration: 1000
									})
								} else {
									uni.showToast({
										icon: 'none',
										title: res.msg,
										duration: 2000
									})
								}
								this.spec = null;
							})
						}
					}
				})
			},
			gospec(obj, index) { //选择充值金额
				this.spec = index;
				this.reachargeConfig.money = obj.num; //获取充值金额
			}
		},
		onNavigationBarButtonTap(e) { // 充值记录
			uni.navigateTo({
				url: '/pages/recharge/oilrelist'
			});
		}
	}
</script>

<style>
	@import url("oilrecharge.css");

	.activeRecharge {
		background-color: #158DFF;
		transition: all 0.5s ease-in-out;
	}
</style>
