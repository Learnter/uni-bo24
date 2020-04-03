<template>
	<view class="btomnavBox">
		<navigator url="/pages/transferzz/huobiTransfer/huobiTransfer" class="btomnav uni-flex" hover-class="none">
			<view class="btomnavimg">
				<image :src="block_info.logo" mode="aspectFit"></image>
			</view>
			<view class="btomnavtx fx1">{{block_info.name_cn}}</view>
			<view class="btomnavzxx">
				<uni-icon type="arrowright" color="#888888" size="16"></uni-icon>
			</view>
		</navigator>
		<navigator url="/pages/transferzz/transfer" class="btomnav uni-flex" hover-class="none">
			<view class="btomnavimg">
				<image :src="money_info.logo" mode="aspectFit"></image>
			</view>
			<view class="btomnavtx fx1">{{money_info.name_cn}}</view>
			<view class="btomnavzxx">
				<uni-icon type="arrowright" color="#888888" size="16"></uni-icon>
			</view>
		</navigator>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				block_info: {},
				money_info: {}
			}
		}, 
		onLoad() {
      uni.setNavigationBarTitle({
          title:this.$t('navText').tf_manage
        })
			this.fetchTransfer();
		},
		methods: {
			fetchTransfer() {
				this.$request.get(this.$KPI.transfer.transferList).then(res => {
					if (res.code === 200 && res.data && res.data !== {}) {
						if (res.data.block_info) {
							this.block_info = res.data.block_info;
						}
						if (res.data.money_info) {
							this.money_info = res.data.money_info;
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

</style>
