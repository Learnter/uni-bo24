<template>
	<view class="apbindaBox">
		<view class="apbindaCont">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.bs_name}}：</view>
					<view class="with-fun bindiiut">
						<input type="text" class="uni-input" v-model="reConfig.name" :placeholder="holder.bs_name" placeholder-style="color:#888888;" />
					</view>
				</view>
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.bs_tel}}：</view>
					<view class="with-fun bindiiut">
						<input type="number" class="uni-input" v-model="reConfig.phone" :placeholder="holder.bs_tel" placeholder-style="color:#888888;" />
					</view>
				</view>
				<view class="uni-form-item uni-column bindiiutBox">
					<view class="uni-list-cell uni-list-cell-pd">
						<view class="uni-list-cell-db">{{i18n.open_offline}}：</view>
						<switch :checked="isEnable" style="transform:scale(0.8)" @change="switchShop" />
					</view>
				</view>
				<block v-if="isEnable">
					<view class="uni-list-cell uni-list-cell-pd bindiiutBox">
						<view>{{i18n.sel_category}}：</view>
						<view class="uni-flex-item" style="margin-left:20rpx">
							<xfl-select :list="catelist" :clearable="false" :showItemNum="5" :listShow="false" :isCanInput="false"
							 :style_Container="'height:70rpx; font-size:28rpx;'" :placeholder="holder.bs_type" :selectHideType="'hideAll'"
							 @change="selCategory">
							</xfl-select>
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-pd bindiiutBox">
						<view>{{i18n.bs_hours}}：</view>
						<view class="uni-flex uni-flex-item uni-inline-item">
							<view class="uni-list-cell-db">
								<picker mode="time" :value="timeStart" start="00:00" end="24:00" @change="bindTimeChange1">
									<view class="uni-input timeFlex">{{reConfig.timeStart|| (common.begin_time)}}</view>
								</picker>
							</view>
							<view class="zhizhi">{{common.to}}</view>
							<view class="uni-list-cell-db">
								<picker mode="time" :value="timeEnd" start="00:00" end="24:00" @change="bindTimeChange2">
									<view class="uni-input timeFlex">{{reConfig.timeEnd|| (common.end_time)}}</view>
								</picker>
							</view>
						</view>
					</view>
				</block>
				<view class="uni-flex logoFlex">
					<view class="">
						<view>{{i18n.bs_logo}}：</view>
						<view class="binshcan" @click="openAlbum">
							<image src="/static/images/jiatu.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="bindrewimg">
						<image lazy-load :src="reviewSrc"></image>
					</view>
				</view>

				<view class="uni-flex logoFlex">
					<view class="">
						<view>{{i18n.bs_banner}}：</view>
						<view class="binshcan" @click="upBenner">
							<image src="/static/images/jiatu.png" mode="widthFix"></image>
						</view>
					</view>

					<!-- benner图位置 s -->
					<view class="sgctbannimg uni-flex-item">
						<swiper autoplay="true" indicator-dots="true" indicator-color="#aaaaaa" indicator-active-color="#ffffff" circular="true"
						 style="width:100%;height:160rpx">
							<swiper-item v-for="(sItem,sIndex) in swipers" :key="sIndex" style="width:100%;height:160rpx">
								<image lazy-load="true" :src="sItem" style="width:100%;height:160rpx" />
							</swiper-item>
						</swiper>
					</view>
					<!-- benner图位置 e  -->
				</view>
				<view class="btn-area confirBtnBox">
					<button formType="submit" class="confirBtn">{{i18n.submit}}</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import xflSelect from '@/components/xfl-select/xfl-select.vue';
	export default {
		data() {
			return {
				isChoose: false,
				isEnable: false,
				reviewSrc: '', //logo_Url
				swipers: [], // 轮播图
				reConfig: {
					name: '',
					phone: '',
					logo: '',
					banner: [],
					cat_id: '',
					of_store: false,
					timeStart: '',
					timeEnd: '',
					latitude: '',
					longitude: '',
          address:'',
          address_details:''
          
				},
				timeStart: '',
				timeEnd: '',
				catelist: [], //分类列表
			}
		},
    computed:{
      i18n(){
        return this.$t('setupshop');
      },
      holder(){
       return this.$t('holder'); 
      },
      common(){
        return this.$t('common');
      }
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').bs_set
      })
    },
		onReady() {
			this.fetchSetUpInfo();
		},
		methods: {
			fetchSetUpInfo() { //获取商家设置信息
				this.$request.get(this.$KPI.BsnSystem.setUp).then(res => {
					// console.log(res);
					if (res.code === 200) {
						if (res.data && Object.keys(res.data).length !== 0) {
							this.reConfig = res.data;
              
              /*logo 和 轮播图*/
              if(!res.data.logo_img){
                this.reviewSrc = '/static/images/shililogo.png';
              }else{
                this.reviewSrc = res.data.logo_img; 
              }
              if(!res.data.banner_img){
                this.swipers = ['/static/images/a024laner_102.png']
              }else{
                this.swipers = res.data.banner_img;
              }
              /*logo 和 轮播图*/

							this.catelist = res.data.cate_list;
							this.isEnable = res.data.of_store;
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})
			},
			formSubmit() { //提交设置
				let {
					name,
					phone,
					logo,
					banner
				} = this.reConfig;
				if (name.trim().length === 0) {
					uni.showToast({
						icon: "none",
						title: this.$t('warn').empty_bs_name
					})
					return false;
				} else if (phone.trim().length === 0) {
					uni.showToast({
						icon: "none",
						title: this.$t('warn').empty_bs_tel
					})
					return false;
				} else if (logo.trim().length === 0) {
					uni.showToast({
						icon: 'none',
						title: this.$t('warn').empty_bs_logo
					})
					return false;
				} else if (banner.length === 0) {
					uni.showToast({
						icon: 'none',
						title: this.$t('warn').empty_bs_banner
					})
					return false;
				}
				this.$request.post(this.$KPI.BsnSystem.commitSetUp, this.reConfig).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'loading',
							title: this.$t('warn').uploadSuccess
						})
						this.fetchSetUpInfo();
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			openAlbum() { //上传LOGO
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.$request.upload(this.$KPI.common.upFile, res.tempFilePaths[0], 'logo', {
							'field': 'logo'
						}).then(res => {
							if (res.code === 200 && res.data && res.data !== {}) {
								this.reviewSrc = res.data.show_src;
								this.reConfig.logo = res.data.src;
							} else {
								uni.showToast({
									icon: "none",
									title: res.msg
								})
							}
						})
					}
				});
			},
			upBenner() { //上传banner
				uni.chooseImage({
					count: 6,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						/*上传轮播前,清空数组*/
						this.swipers = [];
						this.reConfig.banner = []
						/*上传轮播前,清空数组*/
						res.tempFilePaths.forEach(item => {
							this.$request.upload(this.$KPI.common.upFile, item, 'logo', {
								'field': 'logo'
							}).then(res => {
								if (res.code === 200 && res.data && res.data !== {}) {
									this.swipers.push(res.data.show_src);
									this.reConfig.banner.push(res.data.src);
								} else {
									uni.showToast({
										icon: "none",
										title: res.msg
									})
								}
							})
						})
					}
				})
			},
		    switchShop(e) { //开启线下商家  Switch bug 需要延迟赋值
				this.isEnable = !this.isEnable;
				if (e.target.value == true) {
					uni.chooseLocation({
						success: (res) => {
							this.reConfig.latitude = res.latitude; //定位纬度
							this.reConfig.longitude = res.longitude; //经度
              this.reConfig.address = res.name; // 定位地址
              this.reConfig.address_details = res.address; //商家详情地址
              // console.log(res);
							setTimeout(()=>{
								this.isEnable = true;
							},500)
						}
					})
					this.$nextTick(() =>{
						this.isEnable = !this.isEnable;
					})
				}
			},
			selCategory(e) { //商家分类
				this.reConfig.cat_id = e.orignItem.cat_id;
			},
			bindTimeChange1(e) {
				this.timeStart = this.reConfig.timeStart = e.target.value;

			},
			bindTimeChange2(e) {
				this.timeEnd = this.reConfig.timeEnd = e.target.value;
			}
		},
		components: {
			xflSelect
		}
	}
</script>

<style>
	@import url("../account/bindcss.css");

	.binshcan {
		display: inline-block;
		padding-top: 50rpx;
	}

	.bindrewimg {
		width: 160rpx;
		height: 160rpx;
		overflow: hidden;
		border-radius: 10rpx;
	/* 	background: url('/static/images/shililogo.png')no-repeat center;
		background-size: cover; */
		margin-left: 20rpx;
	}

	.bindrewimg image {
		width: 100%;
		height: 100%;
	}

	.logoFlex {
		align-items: flex-end;
	}

	.sgctbannimg {
		width: 100%;
		height: 160rpx;
	/* 	background: url('/static/images/a024laner_102.png')no-repeat center;
		background-size: cover; */
		margin-left: 20rpx;
	}

	.sgctbannimg image {
		width: 100%;
		border-radius: 10rpx;
		vertical-align: top;
	}

	.uni-list-cell-pd {
		padding: 20rpx 0;
	}

	.uni-list-cell::after {
		left: 0;
	}

	.timeFlex {
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgb(136, 136, 136);
	}
</style>
