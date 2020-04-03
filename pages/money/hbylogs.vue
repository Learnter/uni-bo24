<template>
	<view>
		<view class="ssordsetlBoxHe">
			<view class="uni-flex ssordsetlBox">
				<view class="fx1 ssordsetl" @click="mobilebtn">{{i18n.category}}<image src="/static/images/a024laner_83.png" mode="widthFix" class="zxia"></image>
				</view>
				<view class="fx1 ssordsetl" @click="pricebtn">{{i18n.date}}<image src="/static/images/a024laner_83.png" mode="widthFix" class="zxia"></image>
				</view>
				<view class="fx1 ssordsetl" @click="amountbtn">{{i18n.sort}}<image src="/static/images/a024laner_83.png" mode="widthFix" class="zxia"></image>
				</view>
			</view>
		</view>
		<!-- 分类弹窗 s -->
		<view class="ssordupBox" :class="mobileup == true ? 'ssordupBoxActive' : ''">
			<view class="aiysbBox">
				<view class="fenle" :class="curentType === mIndex ?'activeType':''" v-for="(mItem,mIndex) in moneyTypes" :key="mIndex"
				 @click="selType(mItem,mIndex)">{{mItem.name}}</view>
			</view>
		</view>
		<!-- 分类弹窗 e -->
		<!-- 日期弹窗 s -->
		<view class="ssordupBox" :class="priceup == true ? 'ssordupBoxActive' : ''">
			<view class="aiysbBox">
				<view class="uni-flex">
					<view class="fx1 aiysbiqujian">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input selectSeaInput">{{date}}</view>
						</picker>
					</view>
					<view class="zhizhi">{{i18n.to}}</view>
					<view class="fx1 aiysbiqujian">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange_2">
							<view class="uni-input selectSeaInput">{{date_2}}</view>
						</picker>
					</view>
					<button type="primary" class="aiysbtn" @click="dateSort">
						<image src="/static/images/a024laner_81.png" mode="widthFix"></image>
					</button>
				</view>
			</view>
		</view>
		<!-- 日期弹窗 e -->
		<!-- 排序弹窗 s -->
		<view class="ssordupBox" :class="amountup == true ? 'ssordupBoxActive' : ''">
			<view class="aiysbBox">
				<view class="fenle" :class="timeType === tIndex?'activeType':''" @click="timeSort(tItem,tIndex)" v-for="(tItem,tIndex) in timeArray"
				 :key="tIndex">{{tItem.title}}</view>
			</view>
		</view>
		<!-- 排序弹窗 e -->

		<!-- 列表 s -->
		<view class="recoeBox">
			<view v-for="(lItem,lIndex) in moneyLogs" :key="lIndex">
				<navigator class="tradparLi uni-flex" :url="'/pages/money/hbyDetails?logId='+lItem.id">
					<view class="tradparLiimg">
						<image src="/static/images/logo3.png" mode=""></image>
					</view>
					<view class="fx1">
						<view class="tradparLitx">{{lItem.type}}</view>
						<view class="tradparLitime">{{lItem.edit_time}}</view>
					</view>
					<view class="tradparshuu">{{lItem.money}}</view>
				</navigator>
			</view>
			<view class="stayBox" v-if="showEmpty == true">
				<image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
				<view>{{i18n.logEmpty}}</view>
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
			const currentDate = this.getDate({
				format: true
			});
			return {
        showEmpty:false,
        stopPull:false,
				date: currentDate,
				date_2: currentDate,
				curentType: '', //当前选择的分类类型
				timeType: '', //当前选择的时间类型
				sellup: false,
				mobileup: false,
				priceup: false,
				amountup: false,
				moneyLogs: [], //钱包日志记录
				moneyTypes: [], //钱包分类
				timeArray: [{
					id: 1,
					title: this.$t('common').asc,
					type: 'asc'
				}, {
					id: 2,
					title: this.$t('common').desc,
					type: 'desc'
				}],
				reConfig: { //请求配置
					type: '',
					start_time: '',
					end_time: '',
					page: 0,
					size: 10,
          order_type:'desc'
				}
			}
		},
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').assetLog
      })
    },
		onReady() {
			this.fetchType();
			this.fetchLogs();
		},
		onReachBottom() {
			this.loadMore();
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
      i18n(){
        return this.$t('common');
      }
		},
		methods: {
			fetchType() { //获取钱包分类
				this.$request.get(this.$KPI.HbyAsset.assetType).then(res => {
					if (res.code === 200){
					   if(res.data && Object.keys(res.data).length !== 0){
					     this.moneyTypes = res.data;
					     let all = {id:0,name:this.$t('common').all};
					     this.moneyTypes.unshift(all);
					   }
					}else{
					  uni.showToast({
					    icon:'none',
					    title:res.msg
					  })
					}
				})
			},
			fetchLogs() { //获取钱包日志
      
        uni.showLoading({
        	title:this.$t('warn').load,
        	mask: true
        })
        
        this.showEmpty = false;
				this.$request.get(this.$KPI.HbyAsset.assetLogs,this.reConfig).then(res => {
					// console.log(res);
					if (res.code === 200) {
						if ( res.data && Object.keys(res.data).length !== 0) {
                this.moneyLogs = res.data;
                this.reConfig.page++;
						} else {
							  this.showEmpty = true;
						}
					}else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
         setTimeout(() => {
         	uni.hideLoading();
         }, 1000) 
			  })
			},
			loadMore() { //加载更多
        if(this.stopPull == true){
          return false;
        }else{
          uni.showLoading({
          	title:this.$t('warn').load,
          	mask: true
          })
          this.$request.get(this.$KPI.HbyAsset.assetLogs,this.reConfig).then(res => {
          	if (res.code === 200) {
          		if (res.data && res.data.length === 0) {
                this.stopPull = true
          			setTimeout(() => {
          				uni.showToast({
          					icon: 'none',
          					title:this.$t('warn').pullEnd,
          					position: 'bottom',
          					duration: 2000
          				})
          			}, 1000)
          			return false;
          		} else {
          			this.moneyLogs = this.moneyLogs.concat(res.data);
          			this.reConfig.page++;
          		}
          	} else {
          		uni.showToast({
          			icon: "none",
          			title: res.msg
          		})
          	}
          	setTimeout(() => {
          		uni.hideLoading();
          	}, 1000)
          })
        }
			},
			selType(obj, index) { //选择分类
				// console.log(obj,index);
				this.curentType = index;
        this.stopPull = false;
				this.reConfig.type = obj.id;
				this.mobileup = false;
				this.reConfig.page = 0;
				this.moneyLogs = [];
				this.fetchLogs();
			},
			timeSort(obj, index) { //时间排序
				this.timeType = index;
        this.stopPull = false;
				this.reConfig.order_type = obj.type;
				this.amountup = false;
				this.reConfig.page = 0;
				this.moneyLogs = [];
				this.fetchLogs();
			},
			dateSort(){ //日期排序
        this.stopPull = false;
				this.priceup = false;
				this.reConfig.page = 0;
				this.moneyLogs = [];
				this.fetchLogs();
			},
			// 分类 s
			mobilebtn() {
				this.priceup = false;
				this.amountup = false;
				if (this.mobileup == false) {
					this.mobileup = true;
				} else {
					this.mobileup = false;
				}
			},
			// 日期 s
			pricebtn() {
				this.mobileup = false;
				this.amountup = false;
				if (this.priceup == false) {
					this.priceup = true;
				} else {
					this.priceup = false;
				}
			},
			amountbtn() {
				this.priceup = false;
				this.mobileup = false;
				if (this.amountup == false) {
					this.amountup = true;
				} else {
					this.amountup = false;
				}
			},
			// 日期选择 s
			bindDateChange: function(e) {
				this.date = e.target.value;
				this.reConfig.start_time = e.target.value;
			},
			bindDateChange_2: function(e) {
				this.date_2 = e.target.value;
				this.reConfig.end_time = e.target.value;
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style>
	page {
		background: #f5f5f5;
	}

	.ssordsetlBoxHe {
		height:110rpx;
	}

	.ssordsetlBox {
		position: fixed;
		z-index: 100;
		left: 0rpx;
		width: 100%;
		text-align: center;
		background: #1283F2;
		padding: 30rpx 0rpx;
		border-bottom: 1px solid rgba(211, 240, 240, 0.1);
	}

	.ssordsetl {
		color: #ffffff;
		height: 50rpx;
		line-height: 50rpx;
    font-size:30rpx;
	}

	.ssordsetl .zxia {
		width: 14rpx;
		height: 9rpx;
		position: relative;
		top: -10rpx;
		left: 10rpx;
	}

	.ssordupBox {
		position: fixed;
		left: 0px;
		top: 90rpx;
		right: 0px;
		bottom: 0px;
		width: 100%;
		min-height: 200rpx;
		background: rgba(0, 0, 0, 0.6);
		z-index: 800;
		overflow: auto;
		visibility: hidden;
		opacity: 0;
		filter: alpha(opacity=0);
		transition: All 0.15s ease-in-out;
		-webkit-transition: All 0.1s ease-in-out;
		-moz-transition: All 0.1s ease-in-out;
		-o-transition: All 0.1s ease-in-out;
	}

	/* #ifdef H5 */
	.ssordupBox {
		position: fixed;
		left: 0px;
		top: 180rpx;
		right: 0px;
		bottom: 0px;
		width: 100%;
		min-height: 200rpx;
		background: rgba(0, 0, 0, 0.6);
		z-index: 800;
		overflow: auto;
		visibility: hidden;
		opacity: 0;
		filter: alpha(opacity=0);
		transition: All 0.15s ease-in-out;
		-webkit-transition: All 0.1s ease-in-out;
		-moz-transition: All 0.1s ease-in-out;
		-o-transition: All 0.1s ease-in-out;
	}
	/* #endif */

	.ssordupBoxActive {
		visibility: visible;
		opacity: 1;
		filter: alpha(opacity=100);
	}

	.aiysbBox {
		background: #1283F2;
		padding: 30rpx;
	}

	.aiysbiqujian .uni-input {
		height: 80rpx;
		line-height: 80rpx;
		color: #D3F0F0;
		font-size: 28rpx;
		background: #1283F2;
		padding: 0rpx;
		border: 1px solid rgba(211, 240, 240, 0.1);
		border-radius: 6rpx;
		text-align: center;
	}

	.aiysbinput input {
		border: 1px solid rgba(211, 240, 240, 0.1);
		color: #D3F0F0;
		font-size: 28rpx;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0rpx 20rpx;
		border-radius: 6rpx;
		text-align: left;
	}

	.aiysbtn {
		border: none;
		padding: 0rpx 20rpx;
		margin: 0rpx 0rpx 0rpx 30rpx;
		line-height: 80rpx;
	}

	.aiysbtn:after {
		border: none;
	}

	.aiysbtn image {
		width: 40rpx;
		height: 40rpx;
	}

	.zhizhi {
		color: #D3F0F0;
		line-height: 80rpx;
		padding: 0rpx 15rpx;
	}

	.amounthe {
		border: 1px solid rgba(211, 240, 240, 0.1);
		color: #A5D6FA;
		font-size: 28rpx;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0rpx 20rpx;
		border-radius: 6rpx;
		margin-right: 30rpx;
	}

	.amountheActive {
		color: #ffffff;
		border: 1px solid #D3F0F0;
	}

	.fenle {
		display: inline-block;
		border: 1px solid rgba(211, 240, 240, 0.1);
		color: #A5D6FA;
		font-size: 28rpx;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0rpx 24rpx;
		border-radius: 6rpx;
		margin: 0rpx 20rpx 20rpx 0rpx;
	}

	.activeType {
		font-weight: 600;
		font-size: 28rpx;
		box-shadow: 0 0 8px 0px #035DB4;
	}
</style>
