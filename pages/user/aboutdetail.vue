<template>
	<view>
		<view class="aboutopBox">
    <image :src="usInfo.logo" mode="widthFix"></image>
    <view class="aboutoptx">2.0.0 版本</view>
		</view>
		<view class="abouCont" v-html="showContent">
    </view>
	</view>
</template>

<script>
  export default{
    data(){
      return{
        usInfo:{},
        showContent:''
      }
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').aboutUs
      })
    },
    onReady(){
      this.fetchDetail();
    },
    methods:{
      fetchDetail(){
        this.$request.get(this.$KPI.aboutUs.default).then(res => {
          if(res.code === 200 && res.data ){
            if(!res.data || res.data == {}){
              uni.showToast({
                icon:"none",
                title:'空数据,请联系管理员!'
              })
            }else{
              this.usInfo = res.data;
              if(res.data.content){
                 this.showContent = res.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"');
              }
            }
          }
        })
      }
    }
  }
</script>

<style>
	.aboutopBox {
		background: #158DFF;
		padding: 100rpx;
		text-align: center;
	}

	.aboutopBox image {
		width: 160rpx;
		height: 160rpx;
	}
	.aboutoptx {
		color: #ffffff;
	}

	.abouCont {
		font-size: 26rpx;
		color: #333333;
		line-height: 60rpx;
		padding: 30rpx;
		text-indent:60rpx;
	}
</style>
