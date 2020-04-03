<template>
	<view class="btomnavBox">
		<view class="btomnav uni-flex" v-for="(item,index) in list" :key="index" @click="goDetailPage(item)">
			<view class="btomnavimg">
				<image :src="item.img" mode="aspectFit"></image>
			</view>
			<view class="btomnavtx fx1">{{item.title}}</view>
			<view class="btomnavzxx"><uni-icon type="arrowright" color="#888888" size="16"></uni-icon></view>
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
				list: [{
					title: this.$t('common').b_alipay,
					img: "../../static/images/2019_a006_41.png",
					url: 'account/bindalipay'
				}, {
					title: this.$t('common').b_weChat,
					img: "../../static/images/2019_a006_38.png",
					url: 'account/bindwechat'
				}, {
					title:this.$t('common').b_bank,
					img: "../../static/images/2019_a006_40.png",
					url: 'account/userbank'
				}]
			}
		},
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').cd_management
      })
    },
		methods: {
			// 导航
			goDetailPage(e) {
				let path = e.url ? e.url : e;
				let url = ~path.indexOf('platform') ? path : '/pages/' + path;
				uni.navigateTo({
					url: url
				});
				return false;
			}
		}
	}
</script>

<style>
	
</style>
