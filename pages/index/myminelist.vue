<template>
	<view>
		<view class="apmymilistBox">
			<view class="apmymilist uni-flex" v-for="(mItem,mIndex) in mills" :key="mIndex" :class="mItem.status === 1 ? 'apmymilistActive':''">
				<view class="apmymimg">
					<image :src="mItem.logo" mode="aspectFit"></image>
				</view>
				<view class="fx1 apmymdatt">
					<view class="apmymmche">{{mItem.name}}</view>
					<view class="apmymmms">{{i18n.sumYield}}：{{mItem.total_output}}</view>
					<view class="apmymmms">{{i18n.dayYield}}：{{mItem.dividend_num}}</view>
					<view class="apmymmms">{{i18n.price}}：{{mItem.deposit}}</view>
				</view>
				<view class="apmymmanBox" v-if="mItem.status == 1">
					<view class="apmymman">{{i18n.operation}}</view>
				</view>
				<view class="apmymmanBox" v-if="mItem.status == 2" @click="gospdpopup(mItem)">
					<view class="apmymman">{{i18n.buy}}</view>
				</view>
			</view>
		</view>
    <view class="stayBox" v-if="showEmpty == true">
    	<image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
    	<view>{{i18n.millEmpty}}</view>
    </view>
		<!-- 弹窗 s -->
		<view class="spdpopupBox" :class="spdpopup == true ? 'spdpopupBoxActive' : ''">
			<view class="spdpopupContBaba">
				<view class="spdpopupCont">
					<view class="spdpopuptl">{{i18n.isPurchase}}？</view>
					<form @submit="formSubmit" >
						<view class="confirinpt">
							<input type="password" v-model="buyConfig.secpwd" :placeholder="i18n.transactionPwd" />
						</view>
						<view class="confirinpt uni-flex">
							<input type="text" v-model="buyConfig.verify_code" :placeholder="i18n.verify_code" class="fx1" placeholder-class="uni-ellipsis"/>
							<image :src="graphImg"  class="yzm" @click="fetchGraphCode"></image>
						</view>
						<view class="btn-area confirBtnBox">
							<button formType="submit" class="confirBtn">{{i18n.submit}}</button>
						</view>
					</form>
				</view>
				<view class="guanbiBox" @click="backpdpopup">
					<uni-icon class="i" type="closeempty" color="#ffffff" size="38"></uni-icon>
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
        showEmpty:false,
				graphImg:'',
				mills: [],
				spdpopup: false,
				buyConfig:{ //购买配置
					id:'',
					secpwd:'',
					verify_code:''
				}
			}
		},
    computed:{
      i18n(){
        return this.$t('mill');
      }
    },
    onLoad(){
      uni.setNavigationBarTitle({
        title:this.$t('navText').millShop
      })
      // #ifdef APP-PLUS  
      this.$mp.page.$getAppWebview().setTitleNViewButtonStyle(0, {
            text:this.$t('navText').ml_r_button
        });
      //#endif
    },
		onReady(){
			this.fetchMills();
		},
		onPullDownRefresh() { //下拉刷新
			this.fetchMills()
		},
		methods: {
			fetchGraphCode() { //获取图形验证码 
				this.$request.get(this.$KPI.common.graphCode, {
					type:'mine'
				}).then(res => {
					this.graphImg = res;
				})
			},
			fetchMills() { //获取矿机列表
        this.showEmpty = false;
				this.$request.get(this.$KPI.millShop.mills).then(res => {
					if (res.code === 200 && res.data ) {
            if(res.data.length === 0){
              this.showEmpty = true;
            }else{
              this.mills = res.data;
            }	
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
					setTimeout(() => {
						uni.stopPullDownRefresh(); //停止下拉刷新
					}, 1000)
				})
			},
			gospdpopup(obj) { //点击购买矿机
				this.fetchGraphCode();
				this.spdpopup = true;
				this.buyConfig.id = obj.id;
			},
			backpdpopup() { //关闭购买页面
				this.buyConfig.id = '';
				this.buyConfig.secpwd = '';
				this.buyConfig.verify_code = '';
				this.spdpopup = false;
			},
			formSubmit(){ //提交购买   
			    let {id,secpwd,verify_code} = this.buyConfig;
				if(!secpwd || secpwd.trim().length === 0){
					uni.showToast({
					  icon:"none",
					  title:this.$t('warn').passwordEmpty,
					  positon:'top'
					})
					return false;
				}else if(!verify_code || verify_code.trim().length === 0){
					uni.showToast({
						icon:'none',
						title:this.$t('warn').graphCodeEmpty,
						position:'top'
					})
					return false;
				}
				this.$request.post(this.$KPI.millShop.buyMill,this.buyConfig).then(res => {
					if(res.code === 200){
						uni.showToast({
							icon:'loading',
							title:this.$t('warn').buySuccess,
							position:'top'
						})
           this.spdpopup = false;
           this.fetchMills();
					}else{
						uni.showToast({
							icon:'none',
							title:res.msg
						})
					}
				});
			}
		},
		// 我的矿机
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/mine/mymine'
			});
		}
	}
</script>

<style>
	@import url("myminelist.css");
	.spdpopupBox{
	 z-index:999;
	}
  .apmymmanBox{
    word-wrap: break-word;
  }
</style>
