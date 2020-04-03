<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="swiper-tab-list" :class="tabIndex==index ? 'active' : ''"
			 :id="'_'+tab.id" :data-current="index" @click="tapTab($event,tab)">{{tab.name}}</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" :duration="300" @change="changeTab">
			<swiper-item v-for="(nItem,nIndex) in newsitems" :key="nIndex">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(nIndex)">
					<block v-for="(dItem,dIndex) in nItem.data" :key="dIndex">
						<navigator class="cmlist uni-flex" :url="'/pages/commercial/comDetail?parent_id='+dItem.id" hover-class="none">
							<image :src="dItem.thumb" class="cmlImg" mode="widthFix"></image>
							<view class="uni-flex-item">
								<view class="newslistlitl" v-text="dItem.title"></view>
								<view class="newslistlitx" v-text="dItem.desc"></view>
								<view class="newslistlitime" v-text="dItem.add_time"></view>
							</view>
						</navigator>
					</block>
					<view class="uni-tab-bar-loading">
						{{nItem.loadingText}}
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>

	export default {
		data() {
			return {
				showEmpty: false, //空数据
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				newsitems: [], //内容列表
				tabBars: [], //导航栏
				reConfig: { //请求配置
					cart_id: '',
					page: 0,
					size: 10
				}
			}
		},
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').cm_college
      })
    },
		onReady() {
			this.fetchCategory();
		},
		methods: {
			async fetchCategory() { //获取导航栏
				await this.$request.get(this.$KPI.commercial.categofy).then(res => {
					if (res.code === 200 && res.data.length !== 0) {
            /*添加全部导航*/
            let tabArr = res.data;
            let all = {id:0,name:this.$t('common').all};
            tabArr.unshift(all);
            this.tabBars = tabArr;
             /*添加全部导航*/
						this.reConfig.cart_id =  this.tabBars[0].id;
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})

				this.newsitems = await this.randomfn();

				await this.fetchList();
			},
			fetchList() { //获取内容列表
				this.showEmpty = false;
				this.$request.get(this.$KPI.commercial.list, this.reConfig).then(res => {
					if (res.code === 200) {
						if (res.data && res.data.length === 0) {
							this.showEmpty = true;
							this.newsitems[this.tabIndex].data = [];
						} else {
							this.newsitems[this.tabIndex].data = res.data;
							this.reConfig.page++;
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})
			},
			loadMore(e) { //加载更多
				setTimeout(() => {
					this.addData(e);
				}, 1000);
			},
			addData(e) {
        this.newsitems[e].loadingText = this.$t('loadMore');
				this.$request.get(this.$KPI.commercial.list, this.reConfig).then(res => {
					if (res.code === 200) {
						if (res.data && res.data.length === 0) {
							this.newsitems[e].loadingText = this.$t('noMore');
						} else {
							this.newsitems[e].data = this.newsitems[e].data.concat(res.data);
							this.reConfig.page++;
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})
			},
			async changeTab(e) { //左右滑动
				let index = e.target.current;
				if (this.isClickChange){
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;

				for (let i = 0; i < index; i++) {

					/*元素选择器不能为数字开头,所以添加下划线*/
					let id = "_" + this.tabBars[i].id;
					/*元素选择器不能为数字开头,所以添加下划线*/

					let result = await this.getElSize(id);
					width += result.width;
				}

				/*元素选择器不能为数字开头,所以添加下划线*/
				let element_id = "_" + this.tabBars[index].id;
				/*元素选择器不能为数字开头,所以添加下划线*/

				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize(element_id),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				this.isClickChange = false;
				this.tabIndex = index; //一旦访问data就会出问题

				/*获取对应id的数据*/
				this.reConfig.cart_id = this.tabBars[index].id;
				this.reConfig.page = 0;
				this.fetchList();
				/*获取对应id的数据*/
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					// console.log(id);
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			async tapTab(e, obj) { //点击tab-ba
				let tabIndex = e.target.dataset.current;
        
				if (this.tabIndex === tabIndex) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar");
					let tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = tabIndex;
				}
				this.reConfig.page = 0;
				this.reConfig.cart_id = obj.id;
				this.fetchList();
			},
			randomfn() {
				let ary = [];
				for (let i = 0, length = this.tabBars.length; i < length; i++) {
					let aryItem = {
						loadingText: this.$t('noMore'),
						data: []
					};
					ary.push(aryItem);
				}
				return ary;
			}
		},
	}
</script>

<style>
	.uni-swiper-tab {
		border-bottom: 1px solid #f2f2f2;
	}

	.uni-tab-bar-loading {
		text-align: center;
		font-size: 28upx;
		color: #999;
	}

	.list {
		padding: 10rpx;
		background: #f5f5f5;
	}

	.cmlist {
		padding: 20rpx 20rpx 12rpx 20rpx;
		background: #ffffff;
		color: #333333;
		line-height: 40rpx;
		border-radius: 4rpx;
		margin-bottom: 12rpx;
	}

	.cmlImg {
		width: 30%;
		margin-right: 20rpx;
		max-height: 180rpx;
		overflow: hidden;
	}

	.newslistlitl {
		color: #111111;
		margin-bottom: 6rpx;
		font-size: 32rpx;
	}

	.newslistlitx {
		font-size: 24rpx;
	}

	.newslistlitime {
		font-size: 24rpx;
		color: #888888;
		margin-top: 10rpx;
	}
</style>
