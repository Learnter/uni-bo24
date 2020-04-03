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
					title: this.$t('securityinfo').loginPwd,
					img: "../../static/images/a024laner_76.png",
					url: 'user/sapassword'
				}, {
					title: this.$t('securityinfo').tradePwd,
					img: "../../static/images/a024laner_77.png",
					url: 'user/savesecpwd'
				}, 
        {
        	title: this.$t('securityinfo').a_manage_hby,
        	img: "../../static/images/a024laner_78.png",
        	url: 'user/hby_address'
        }
        //,{ USDT地址绑定
				// 	title: this.$t('securityinfo').a_manage_usdt,
				// 	img: "../../static/images/a024laner_78.png",
				// 	url: 'user/address'
				// }
        ]
			}
		},
		onLoad() {
		  uni.setNavigationBarTitle({
		    title:this.$t('navText').sf_management
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
