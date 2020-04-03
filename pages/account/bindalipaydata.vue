<template>
	<view class="binimg">
		<image src="../../static/images/zfbzn.png" mode="widthFix"></image>
	</view>
</template>

<script>
  export default {
    data(){
      return{
        
      }
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').s_g_alipay
      })
    }
  }
</script>

<style>
	.binimg image {
		width: 100%;
	}
</style>
