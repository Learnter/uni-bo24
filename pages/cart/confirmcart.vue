<template>
	<view>
		<view class="querenddanBox">
			<view class="confimTopCont">
				<view class="toponameanddhBox">
					<view class="toponameanddh">
						<view class="toponame" v-text="addressInfo.username"></view>
						<view class="topodh" v-text="addressInfo.mobile"></view>
					</view>
					<view class="topoweizhBox uni-flex">
						<text class="text_1">{{i18n.address}}：</text>
						<text class="uni-ellipsis uni-flex-item" v-text="address"></text>
					</view>
				</view>
				<navigator class="locationaa" url="/pages/address/addressindex" hover-class="none">
					<uni-icon class="i" type="arrowright" color="#666666" size="22"></uni-icon>
				</navigator>
			</view>

			<view class="dandcanBox" v-for="(sItem,sIndex) in shopsList" :key="sIndex">
				<view class="dandcanTl">
					<image :src="sItem.logo" mode=""></image>
					<view class="dandcanTltx" v-text="sItem.name"></view>
				</view>
				<view class="dandcaList" v-for="(gItem,gIndex) in sItem.goods" :key="gIndex">
					<view class="dandcaLiimg">
						<image :src="gItem.picture" mode=""></image>
					</view>
					<view class="dandcaLiCont">
						<view class="dandcaLitl" v-text="gItem.goods_name"></view>
						<view class="danshu">X {{gItem.goods_num}}</view>
						<view class="shuljge">
							<view class="danshu">{{gItem.spec_name}}</view>
							<view class="danjie">￥{{gItem.goods_price}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部 s -->
		<view class="dibuButdbBox">
			<view class="dibuButdLeft">
				<view class="uButdLeftBox">
					<view class="yiyouhui">
						<!-- 已优惠￥8.00 -->
					</view>
					<view class="huijisa">{{i18n.total}}：</view>
					<view class="qiansq">￥{{sumPrice}}</view>
				</view>
			</view>
			<view class="dibutqujsuyjs" @click="suborder">{{i18n.submit}}</view>
		</view>
		<!-- 底部 e -->
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	export default {
		data() {
			return {
				reConfig: { //请求参数
					cart_id: ''
				},
				addressInfo: {
          username:'',
          mobile:'' 
        }, //收货地址
				shopsList: {}, //商品列表
				sumPrice: 0, //总金额
			}
		},
		components: {
			uniIcon
		},
		onLoad(option) {
      uni.setNavigationBarTitle({
        title:this.$t('navText').cf_order
      })
			if (option.car_id) {
				this.reConfig.cart_id = option.car_id;
			}
		},
		onShow() {
			this.fetchData();
		},
		computed: {
			address() { //拼接地址
				let {province,city,district,address} = this.addressInfo;
				return province + city + district + address;
			},
			commitConfig() { //提交请求参数
				let attr = {
					address_id: this.addressInfo.id,
					cart_id: []
				}
				for (let key in this.shopsList) {
					this.shopsList[key].goods.forEach(childItem => {
						if (childItem.selected) {
							attr.cart_id.push(childItem.id)
						}
					})
				}
				return attr;
			},
      i18n(){
        return this.$t('confirmcart');
      }
		},
		methods: {
			fetchData() {
				this.$request.get(this.$KPI.shops.confirmOrder, this.reConfig).then(res => {
					if (res.code === 200) {
						// console.log(res.data);
						if (res.data.address_info && res.data.address_info !== {}) {
							this.addressInfo = res.data.address_info;
						}
						if (res.data.list && res.data.list !== {}) {
							this.shopsList = res.data.list;
						}
						if (res.data.total_price) {
							this.sumPrice = res.data.total_price;
						}

					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})
			},
			suborder() {
				this.$request.post(this.$KPI.shops.commitOrder, this.commitConfig).then(res => {
					if (res.code === 200) {
						if (res.data && Object.keys(res.data).length !== 0) {
							uni.showToast({
								icon: 'loading',
								title: this.$t('warn').submitSuccess
							})
							setTimeout(() => {
								uni.navigateTo({
									url: "/pages/order/confirmpay?order_sn=" + res.data.order_sn
								});
							}, 1500)
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})
			}
		}
	}
</script>

<style>
	@import url("confirmcart.css");
</style>
