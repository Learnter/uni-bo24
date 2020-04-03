<template>
	<view>
		<view class="bdrdatopBox">
			<view class="returnpubc uni-flex">
				<view @tap="switchTab">
					<uni-icon class="i" type="arrowthinleft" color="#ffffff" size="30"></uni-icon>
				</view>
				<view class="returnpubctl fx1">{{i18n.title}}</view>
				<view class="returnpzww"></view>
			</view>

			<view class="bdrdatopCont">
				<view class="bdrdatoptx">{{i18n.name}}</view>
				<view class="bdrdatoptxshu">{{kindInfo.money}}</view>
			</view>
			<view class="paybinavBox">
				<view class="paynavtopBox">
					<view class="paynavtop">
						<view class="uni-flex paynavqhhe">
							<navigator class="fx1 paynavqh" url="/pages/flametrad/paybill" hover-class="none">{{i18n.pay}}</navigator>
							<view class="fx1 paynavqh paynavqhactive">{{i18n.sale}}</view>
						</view>
					</view>
				</view>
				<view class="uni-flex bllnavlinkBox">
					<view class="fx1 bllnavlink" @click="publupfb">{{i18n.rlOder}}<image src="/static/images/a024laner_83.png" mode="widthFix"
						 class="zxia"></image>
					</view>
					<navigator url="/pages/flametrad/myorder" class="fx1 bllnavlink" hover-class="none" >{{i18n.mOrder}}</navigator>
					<navigator url="/pages/flametrad/tradrecord" class="fx1 bllnavlink" hover-class="none">{{i18n.tRecord}}</navigator>
					<navigator url="/pages/flametrad/ordersearsell" class="fx1 bllnavlink" hover-class="none">{{i18n.search}}<image src="/static/images/a024laner_82.png" mode="widthFix"
						 class="zyou"></image>
					</navigator>
				</view>
			</view>
			<view class="bdrdatopzw"></view>
		</view>
		<!-- 列表 s -->
		<view class="billistlbBox">
			<view class="billistlbHe uni-flex" v-for="(item,index) in sellList" :key="index">
				<view class="fx1">
					<view class="uni-flex">
						<view class="billismcc">{{item.uid}}</view>
						<view class="fx1 billishk" v-if="item.pay_info">
							<image src="/static/images/2019_a006_41.png" v-show="item.pay_info.zfb" mode=""></image>
							<image src="/static/images/2019_a006_38.png" v-show="item.pay_info.wx" mode=""></image>
							<image src="/static/images/2019_a006_40.png" v-show="item.pay_info.bank" mode=""></image>
						</view>
					</view>
					<view class="billisjine">
						<text class="text_1">{{i18n.count}}：{{item.stay_num}}</text>
						<text class="text_2">{{i18n.amount}}：{{item.price}}</text>
					</view>
					<view class="billisjine">
						<text class="text_1">{{i18n.recent}}：{{item.lately}}</text>
						<text class="text_2">{{i18n.dealNum}}：{{item.deal_num}}</text>
					</view>
				</view>
				<view class="chshanczan" @click="sellcsanup(item)">{{i18n.buy}}<image src="/static/images/a024laner_83.png" mode="widthFix"
					 class="zxia"></image>
				</view>
			</view>
			<view class="stayBox" v-if="showEmpty">
				<image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
				<view style="color:#FFFFFF">{{i18n.emptyOrder}}</view>
			</view>
		</view>
		<!-- 列表 e -->

		<!-- 购买弹窗 s -->
		<view class="chzopupBox" :class="sellup == true ? 'chzopupBoxActive' : ''">
			<view class="sellpopupupcontBox">
				<view class="sellpopupupcont">
					<form>
						<view class="sellpoptlmc">{{i18n.buyFire}}</view>
						<view class="uni-flex sellpopshe">
							<view class="fx1">
								<view class="sellpoptshu">{{buyInfo.price}}</view>
								<view class="sellpopttx">{{i18n.price}}</view>
							</view>
							<view class="fx1">
								<view class="sellpoptshu">{{buyInfo.stay_num}}</view>
								<view class="sellpopttx">{{i18n.count}}</view>
							</view>
						</view>
						<view class="seltishiBox uni-flex">
							<image src="/static/images/2019a056_105.png" mode="widthFix"></image>
							<view class="seltishi fx1">{{i18n.checkInfo}}</view>
						</view>
						<view class="uni-flex paczinputBox">
							<view class="paczinptl">{{i18n.count}}</view>
							<view class="fx1 paczinput">
								<input type="number" v-model="buyConfig.num" :placeholder="holder.count" />
							</view>
						</view>
						<view class="uni-flex paczinputBox">
							<view class="paczinptl">{{i18n.tradePwd}}</view>
							<view class="fx1 paczinput">
								<input type="password" v-model="buyConfig.secpwd"  placeholder-class="uni-ellipsis" :placeholder="holder.dealPwd" />
							</view>
						</view>
						<view class="uni-flex confirBtnBox">
							<button class="fx1 confirqux" type="primary" @click="sellcancel">{{common.cancel}}</button>
							<view class="paczgxx"></view>
							<button class="fx1 confirBtn" type="primary" @click="buySubmit">{{common.comfirm}}</button>
						</view>
					</form>
				</view>
			</view>
		</view>
		<!-- 购买弹窗 e -->

		<!-- 发布订单 s -->
		<view class="qxbzxzBox" :class="publup == true ? 'qxbzxzBoxActive' : ''">
			<view class="qxpopupupcontBox">
				<view class="qxasbiltle">{{i18n.rlOder}}</view>
				<view class="uni-flex">
					<view class="fx1 fxzhian">
						<view class="mahmabuy" @click="fabubuyup">{{i18n.pay}}</view>
						<view class="mahmatx">{{i18n.rlCheck}}</view>
					</view>
					<!-- <view class="fx1 fxzhian">
						<view class="mahmasell" @click="fabusellup">卖</view>
						<view class="mahmatx">发布卖单</view>
					</view> -->
				</view>
				<view class="qxasbilqux" @click="publupqix">{{common.cancel}}</view>
			</view>
		</view>
		<!-- 发布订单 e -->

		<!-- 发布买单 s -->
		<view class="fabubuydan" :class="fabubuyzt == true ? 'fabubuydanActive' : ''">
			<view class="sellpopupupcontBox">
				<view class="sellpopupupcont">
					<form>
						<view class="sellpoptlmc">{{i18n.rlCheck}}</view>
						<view class="seltitztdj">{{i18n.price}}：{{kindInfo.price}}</view>
						<view class="uni-flex paczinputBox">
							<view class="paczinptl">{{i18n.count}}</view>
							<view class="fx1 paczinput">
								<input type="text" v-model="rbuyConfig.num" :placeholder="holder.count" />
							</view>
						</view>
						<view class="uni-flex paczinputBox">
							<view class="paczinptl">{{i18n.tradePwd}}</view>
							<view class="fx1 paczinput">
								<input type="password" v-model="rbuyConfig.secpwd"  placeholder-class="uni-ellipsis" :placeholder="holder.dealPwd" />
							</view>
						</view>
						<view class="uni-flex seltitledah">
							<view class="seltitle">{{i18n.payWay}}：</view>
							<view class="fx1">
								<checkbox-group @change="buyPayMethod">
									<label>
										<checkbox value="zfb" />{{i18n.alipay}}
									</label>
									<label>
										<checkbox value="wx" />{{i18n.weChat}}
									</label>
									<label>
										<checkbox value="bank" />{{i18n.bank}}
									</label>
								</checkbox-group>
							</view>
						</view>
						<view class="uni-flex confirBtnBox">
							<button class="fx1 confirqux" type="primary" @click="fabubuyqx">{{common.cancel}}</button>
							<view class="paczgxx"></view>
							<button class="fx1 confirBtn" type="primary" @click="publickBuy">{{common.comfirm}}</button>
						</view>
					</form>
				</view>
			</view>
		</view>
		<!-- 发布买单 e -->

		<!-- 发布卖单 s -->
		<!-- <view class="faselldan" :class="fabusellzt == true ? 'faselldanActive' : ''">
			<view class="sellpopupupcontBox">
				<view class="sellpopupupcont">
					<form>
						<view class="sellpoptlmc">发布卖单</view>
						<view class="seltitztdj">当前价格：{{kindInfo.price}}</view>
						<view class="uni-flex paczinputBox">
							<view class="paczinptl">卖出数量</view>
							<view class="fx1 paczinput">
								<input type="text" v-model="rSellConfig.num" placeholder="请输入需要卖出的数量" />
							</view>
						</view>
						<view class="uni-flex paczinputBox">
							<view class="paczinptl">交易密码</view>
							<view class="fx1 paczinput">
								<input type="password" v-model="rSellConfig.secpwd" placeholder="请输入交易密码" />
							</view>
						</view>
						<view class="uni-flex seltitledah">
							<view class="seltitle">收款方式：</view>
							<view class="fx1">
								<checkbox-group @change="sellPayMethod">
									<label>
										<checkbox value="zfb" />支付宝
									</label>
									<label>
										<checkbox value="wx" />微信
									</label>
									<label>
										<checkbox value="bank" />银行卡
									</label>
								</checkbox-group>
							</view>
						</view>
						<view class="uni-flex confirBtnBox">
							<button class="fx1 confirqux" type="primary" @click="fabusellqx">取消</button>
							<view class="paczgxx"></view>
							<button class="fx1 confirBtn" type="primary" @click="publickSell">确认</button>
						</view>
					</form>
				</view>
			</view>
		</view> -->
		<!-- 发布卖单 e -->


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
				showEmpty: false,
				stopPull: false,
				sellup: false,
				publup: false,
				fabubuyzt: false,
				fabusellzt: false,
				kindInfo: { //火种信息
					money: 0,
					price: 0
				},
				sellConfig: { //卖家列表配置
					page: 0,
					size: 10
				},
				sellList: [],
				buyInfo: {}, //购买火种信息
				buyConfig: { //购买请求配置
					id: '',
					num: '',
					secpwd: ''
				},
				rbuyConfig: { //发布买单配置
					num: '',
					secpwd: '',
					price: '',
					pay_info: []
				},
				rSellConfig: { //发布卖单配置
					num: '',
					secpwd: '',
					price: '',
					pay_info: []
				}
			}
		},
    computed:{
      i18n(){
        return this.$t('salebill');
      },
      common(){
        return this.$t('common');
      },
      holder(){
        return this.$t('holder');
      }
    },
		onReady() {
			this.fetchBalance();
			this.fetchPayList();
		},
		onReachBottom() {
			this.loadMore();
		},
		methods: {
			fetchBalance() { //获取余额
				this.$request.get(this.$KPI.fireDeal.balance).then(res => {
					if (res.code === 200 && res.data) {
						this.kindInfo = res.data;
					}
				})
			},
			fetchPayList() { //获取卖家列表
        uni.showLoading({
        	title: this.$t('warn').load,
        	mask: true
        })
				this.showEmpty = false;
				this.$request.get(this.$KPI.fireDeal.sellList, this.sellConfig).then(res => {
					if (res.code === 200 && res.data) {
						if (res.data.length === 0) {
							this.showEmpty = true;
						} else {
							this.sellList = res.data;
							this.sellConfig.page++;
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
          setTimeout(() => {
          	uni.hideLoading();
          }, 500)
				})
			},
			loadMore() { //加载更多
				if (this.stopPull == true) {
					return false;
				} else {
					uni.showLoading({
						title: this.$t('warn').load,
						mask: true
					})
					this.$request.get(this.$KPI.fireDeal.sellList, this.sellConfig).then(res => {
						if (res.code === 200 && res.data) {
							if (res.data.length === 0) {
								this.stopPull = true;
								uni.showToast({
									icon: 'none',
									title: this.$t('warn').pullEnd,
									position: "bottom"
								})
							} else {
								this.sellList = this.sellList.concat(res.data);
								this.sellConfig.page++;
							}
						} else {
							uni.showToast({
								icon: "none",
								title: res.msg
							})
						}
					})
					setTimeout(() => {
						uni.hideLoading();
					}, 500)
				}
			},
			switchTab() {
				uni.switchTab({
					url: '/pages/index/propertzc'
				});
			},
			sellcsanup(obj) { // 显示购买弹窗
				this.sellup = true;
				this.buyInfo = obj;
				this.buyConfig.id = obj.id;
			},
			sellcancel() { //关闭购买弹窗
				this.sellup = false;
				this.buyConfig.num = ''; //清除配置信息
				this.buyConfig.secpwd = '';
			},
			buySubmit() { //提交购买
				let {
					id,
					num,
					secpwd
				} = this.buyConfig;
				if (num.trim().length === 0) {
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
				this.$request.post(this.$KPI.fireDeal.sellAction, this.buyConfig).then(res => {
					// console.log(res);
					if (res.code === 200) {
						uni.showToast({
							icon: 'loading',
							title: this.$t('warn').buySuccess
						})
						this.sellup = false; //关闭弹窗
						this.buyConfig.num = ''; //清除配置信息
						this.buyConfig.secpwd = '';
						this.sellConfig.page = 0; //重新获取新数据
						this.fetchPayList();
						this.fetchBalance();
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				});
			},
			// 发布订单 s
			publupfb() {
				this.publup = true;
			},
			publupqix() {
				this.publup = false;
			},
			// 发布订单 e
      
			// 发布买单 s
			fabubuyup() { //显示发布买单弹窗
				this.fabubuyzt = true;
				this.publup = false;
			},
			fabubuyqx() { //关闭发布买单弹窗
				this.fabubuyzt = false;
				this.rbuyConfig.num = '', //清除配置信息
					this.rbuyConfig.secpwd = '';
			},
			buyPayMethod(e) { //买单支付方式
				this.rbuyConfig.pay_info = e.detail.value;
			},
			publickBuy() { //发布买单提交
				let {
					num,
					secpwd,
					pay_info
				} = this.rbuyConfig;
				if (num.trim().length === 0) {
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
				} else if (pay_info.length === 0) {
					uni.showToast({
						icon: 'none',
						title: this.$t('warn').payWay
					})
					return false;
				}
				this.rbuyConfig.price = this.kindInfo.price;
				this.$request.post(this.$KPI.fireDeal.publickBuy, this.rbuyConfig).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: this.$t('warn').releaseSuccess
						})
						this.fabubuyzt = false; //关闭发布弹窗
						this.rbuyConfig.num = '', //清除配置信息
							this.rbuyConfig.secpwd = '';
						this.buyConfig.page = 0; //重新获取新数据
						this.fetchPayList();
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})
			},
			// 发布买单 e
			// 发布卖单 s
			fabusellup() { //显示卖单弹窗
				this.fabusellzt = true;
				this.publup = false;
			},
			fabusellqx() { //关闭卖单弹窗
				this.fabusellzt = false;
				this.rSellConfig.num = ''; //清除配置信息
				this.rSellConfig.secpwd = '';
			},
			sellPayMethod(e) { //卖单支付方式
				this.rSellConfig.pay_info = e.detail.value;
			},
			publickSell() { //发布卖单提交
				let {
					num,
					secpwd,
					pay_info
				} = this.rSellConfig;
				if (num.trim().length === 0) {
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
				} else if (pay_info.length === 0) {
					uni.showToast({
						icon: 'none',
						title: this.$t('warn').payWay
					})
					return false;
				}
				this.rSellConfig.price = this.kindInfo.price;
				this.$request.post(this.$KPI.fireDeal.publickSell, this.rSellConfig).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: this.$t('warn').releaseSuccess
						})
						this.fabusellzt = false; //关闭发布弹窗
						this.rSellConfig.num = '', //清除配置信息
							this.rSellConfig.secpwd = '';
						this.buyConfig.page = 0; //重新获取新数据
						this.fetchPayList();
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})
			}
			// 发布卖单 e
		}
	}
</script>

<style>
	@import url("billcss.css");

	page {
		background: #1283F2;
	}
</style>
