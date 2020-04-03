<template>
	<view class="content">
		<view class="topsbgydaBox">
			<view class="topsbgyCont">
				<view class="uni-padding-wrap uni-common-mt">
					<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
					 :activeColor="activeColor"></uni-segmented-control>
				</view>
			</view>
		</view>
		<view class="findcontBox" ref="scrollBox">
			<view>
				<view class="myordListBox" v-for="(oItem,oIndex) in orderList" :key="oIndex">
					<view class="myordLitl">
						<view class="myordLitlimg">{{i18n.orderNum}}：{{oItem.order_sn}}</view>
						<view class="myordLitlzt">{{oItem.status}}</view>
					</view>
					<view class="dandcaList" v-for="(cItem,cIndex) in oItem.goods" :key="cIndex" @click="orderDetail(oItem)">
						<view class="dandcaLiimg">
							<image :src="cItem.picture" lazy-load mode=""></image>
						</view>
						<view class="dandcaLiCont">
							<view class="dandcaLitl">{{cItem.goods_name}}</view>
							<view class="shuljge">
								<view class="danshu">X{{cItem.goods_num}}</view>
								<view class="danjie">￥{{cItem.shop_price}}</view>
							</view>
						</view>
					</view>
					<view class="gdshshpBox">
						<text class="text_1">{{i18n.common}}  {{oItem.total_num}} {{i18n.itmes}}</text>
						<text class="text_2">{{i18n.sum}}：</text>
						<text class="text_3">￥{{oItem.order_amount}}</text>
					</view>
					<view class="gdsdbczBox" v-show="oItem.status_type == 1">
						<navigator :url="'/pages/order/confirmpay?parentId='+oItem.order_id" class="gdsdbcOne">{{i18n.payment}}</navigator>
						<view class="gdsdbcTwo" @click="cancelOrder(oItem,oIndex)">{{i18n.cancel}}</view>
					</view>
					<view class="gdsdbczBox" v-show="oItem.status_type == 3">
						<view class="gdsdbcTwo" @tap="comfirmOrder(oItem,oIndex)">{{i18n.comfirm}}</view>
					</view>
					<!-- <view class="gdsdbczBox" v-show="oItem.status_type == 9">
						<view class="gdsdbcTwo">已完成</view>
					</view> -->
				</view>
			</view>
			<view class="stayBox" v-if="showEmpty == true">
				<image src="/static/images/a024laner_116.png"></image>
				<!-- <view>{{i18n.empty}}</view> -->
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				showEmpty: false, //显示空数据
				stopPull: false, //暂停上拉加载
				current: 0,
				activeColor: '#158DFF',
				styleType: 'text',
				orderList: [],
				orderConfig: {
					status: 0,
					page: 0,
					size: 10
				}
			}
		},
    computed:{
      /*订单导航列表*/
      items(){
        let list = [];
       let {allOrders,unpaid,undeliver,unpick,finish} = this.$t('common');
       list.push(allOrders,unpaid,undeliver,unpick,finish);
        return list;
      },
      /*订单导航列表*/
      i18n(){
        return this.$t('odform');
      }
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').m_orders
      })
      // #ifdef APP-PLUS
        this.$mp.page.$getAppWebview().setTitleNViewButtonStyle(0, {
            text:this.$t('navText').mall
        });  
      //#endif
    },
		onReady() {
			this.fetchOrders();
		},
		onReachBottom() { //上拉加载
			this.loadMore();
		},
		onPullDownRefresh() { //下拉刷新
			this.pullRefresh();
		},
		methods: {
			pullRefresh() { //下拉刷新
				this.orderConfig.page = 0;
				this.showEmpty = false;
				this.stopPull = false;
				this.$request.get(this.$KPI.shops.orderList,this.orderConfig).then(res => {
					if (res.code === 200 && res.data) {
						if (res.data.length > 0) {
							this.orderList = res.data;
							this.orderConfig.page++;
						} else {
							this.orderList = [];
							this.showEmpty = true;
						}
						setTimeout(() => {
							uni.showToast({
								icon: "loading",
								title: this.$t('warn').refreshSuccess
							})
						}, 800)
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
					setTimeout(() => {
						uni.stopPullDownRefresh();
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
					this.$request.get(this.$KPI.shops.orderList, this.orderConfig).then(res => {
						if (res.code === 200 && res.data) {
							if (res.data.length === 0) {
								this.stopPull = true;
								setTimeout(() => {
									uni.showToast({
										icon: 'none',
										title:  this.$t('warn').pullEnd,
										position: 'bottom'
									})
								}, 800)
							} else {
								this.orderList = this.orderList.concat(res.data);
								this.orderConfig.page++;
							}
						} else {
							uni.showToast({
								icon: "none",
								title: res.msg
							})
						}
						setTimeout(() => {
							uni.hideLoading();
						}, 500)
					})
				}
			},
			fetchOrders() { //订单列表
        /*首次加载清空数组*/
          this.showEmpty = false;
          this.stopPull = false;
          this.orderList = [];
        /*首次加载清空数组*/  
        
        uni.showLoading({
        	title: this.$t('warn').load,
        	mask: true
        })
        
				this.$request.get(this.$KPI.shops.orderList, this.orderConfig).then(res => {
					if (res.code === 200 && res.data) {
						if (res.data.length === 0) {
							this.showEmpty = true;
						} else {
							this.orderList = res.data;
							this.orderConfig.page++;
						}
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
          setTimeout(() => {
            uni.hideLoading();
          },1000)   
				})
			},
			onClickItem(index) { //切换订单导航
				if(this.current !== index) {
					this.current = index;
					this.orderConfig.page = 0;
					this.orderConfig.status = index;
					this.fetchOrders();
				}
			},
			cancelOrder(obj, index) { //取消订单
				uni.showModal({
					title: this.$t('warn').tipTitle,
					content: this.$t('warn').askCancel,
          confirmText:this.$t('common').comfirm,
          cancelText:this.$t('common').cancel,
					success: (res) => {
						if (res.confirm) {
							let data = {
								order_id: obj.order_id
							}
							this.$request.post(this.$KPI.shops.cancelOrder, data).then(res => {
								if (res.code === 200) {
									this.orderList.splice(index, 1);
									uni.showToast({
										icon: "success",
										title: this.$t('warn').cancelSuccess,
										position: "bottom"
									})
								} else {
									uni.showToast({
										title: res.msg
									});
								}
							})
						}
					}
				});
			},
			comfirmOrder(obj, index) { //确认订单
				uni.showModal({
					title: this.$t('warn').tipTitle,
					content: this.$t('warn').askReceived,
          confirmText:this.$t('common').comfirm,
          cancelText:this.$t('common').cancel,
					success: (res) => {
						if (res.confirm) {
							let data = {
								order_id: obj.order_id
							}
							this.$request.post(this.$KPI.shops.confirmDelivery, data).then(res => {
								if (res.code === 200) {
									this.orderList.splice(index, 1);
								} else {
									uni.showToast({
										icon: "none",
										title: res.msg
									});
								}
							})
						}
					}
				});
			},
			orderDetail(obj) { //订单详情
				uni.navigateTo({
					url: "/pages/order/orderdata?parentId=" + obj.order_id
				})
			}
		},
		onNavigationBarButtonTap(e) {
			uni.switchTab({
				url: '/pages/shop/shopindex'
			})
		}
	}
</script>

<style>
	@import url("odform.css");
</style>
