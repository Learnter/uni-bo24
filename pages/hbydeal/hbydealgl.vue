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
					title: "HBY买入",
					img: "../../static/images/a024laner_88.png",
					url: 'hbydeal/hbybuy'
				}, {
					title: "HBY卖出",
					img: "../../static/images/a024laner_87.png",
					url: 'hbydeal/hbysell'
				}]
			}
		},
		methods: {
			goDetailPage(e) {// 导航
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
