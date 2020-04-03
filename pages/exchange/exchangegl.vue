<template>
	<view class="btomnavBox">
		<navigator class="btomnav uni-flex" url="/pages/exchange/exchangefer" hover-class="none">
			<view class="btomnavimg">
				<image src="/static/images/a024laner_58.png" mode="aspectFit"></image>
			</view>
			<view class="btomnavtx fx1">{{i18n.vote}}</view>
			<view class="btomnavzxx"><uni-icon type="arrowright" color="#888888" size="16"></uni-icon></view>
		</navigator>
    
    
    <!-- <navigator class="btomnav uni-flex" url="/pages/exchange/assetExchange/assetExchange" hover-class="none"> -->
    <view class="btomnav uni-flex" @tap="temporaryOpen" >
        <view class="btomnavimg">
          <image src="/static/images/a024laner_66.png" mode="aspectFit"></image>
        </view>
        <view class="btomnavtx fx1">{{i18n.assets}}</view>
        <view class="btomnavzxx"><uni-icon type="arrowright" color="#888888" size="16"></uni-icon></view>
    </view>
    
    <!-- </navigator> -->
    
    
    <navigator class="btomnav uni-flex" url="/pages/exchange/hbyExchange/hbyExchange" hover-class="none">
    	<view class="btomnavimg">
    		<image src="/static/images/a024laner_65.png" mode="aspectFit"></image>
    	</view>
    	<view class="btomnavtx fx1">{{i18n.huoZhong}}</view>
    	<view class="btomnavzxx"><uni-icon type="arrowright" color="#888888" size="16"></uni-icon></view>
    </navigator>
    <navigator class="btomnav uni-flex" url="/pages/exchange/fireExchange/fireExchange" hover-class="none">
    	<view class="btomnavimg">
    		<image src="/static/images/a024laner_64.png" mode="aspectFit"></image>
    	</view>
    	<view class="btomnavtx fx1">{{i18n.hby}}</view>
    	<view class="btomnavzxx"><uni-icon type="arrowright" color="#888888" size="16"></uni-icon></view>
    </navigator>
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
			}
		},
    computed:{
      i18n(){
        return this.$t('exchangegl');
      }
    },
    onLoad() {
       uni.setNavigationBarTitle({
         title:this.$t('navText').management
       })
    },
		methods: {
			goDetailPage(e) {// 导航
				let path = e.url ? e.url : e;
				let url = ~path.indexOf('platform') ? path : '/pages/' + path;
				uni.navigateTo({
					url: url
				});
				return false;
			},
      temporaryOpen(){ //优化中。。。
        uni.showToast({
          icon:'none',
          title:this.$t('warn').optimize
        })
      }
		}
	}
</script>

<style>
	
</style>
