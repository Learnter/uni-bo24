<template>
	<view>
		<view class="serbgBox">
			<image src="../../static/images/a024laner_92.png" mode=""></image>
		</view>
		<view class="serContBox">
			<view class="fanhuiBack" @click="fanhuiBack">
				<uni-icon type="arrowthinleft" color="#ffffff" size="26"></uni-icon>
			</view>
			<view class="dynamihd">
				<image src="../../static/images/a024laner_90-2.png" mode="widthFix"></image>
				<view class="dynamihdtx">{{i18n.mining}}</view>
			</view>
			<view class="serdizuo"><image src="../../static/images/a024laner_91.png" mode="widthFix"></image></view>
		</view>
		<view class="serbtomBox">
			<view class="sertitle">{{millInfo.number}}</view>
			<view class="sertims_1">{{opNumber}}</view>
			<view class="sertims_2">{{i18n.hashrate}}：{{millInfo.power}} GH/s</view>
			<view class="sertims_3">{{i18n.obtain}}：{{millInfo.dividend_num}}</view>
			<view class="sertims_3">{{i18n.total}}：{{millInfo.all_power}} GH/s</view>
		</view>
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
         mill:{ //矿机id
           id:''
         },
         opNumber:0,
         millInfo:{}
			}
		},
    computed:{
      i18n(){
        return this.$t('service');
      }
    },
    onLoad(option){
      this.mill.id = option.mill_id;
    },
    onReady(){
      this.fetchOutPut();
      this.fetchMillInfo();
    },
		methods: {
      fetchOutPut(){ //矿机产出量
        this.$request.get(this.$KPI.millShop.fetchNumber,this.mill).then(res => {  
          if(res.code === 200 && res.data && res.data != {}){
            this.opNumber = res.data.num;
          }
        })
      },
      fetchMillInfo(){ //获取矿机信息
        this.$request.get(this.$KPI.millShop.workMessage,this.mill).then(res => {
           // console.log(res);
          if(res.code === 200 && res.data && res.data != {}){
            this.millInfo = res.data;
          }
        })
      },
			fanhuiBack(){
				uni.navigateBack({
				    delta: 1
				});
			}
		}
	}
	
</script>

<style>
  page{
    background:#050143;
  }
	.serbgBox {
		position: fixed;
		left:0rpx;
		top:0rpx;
		right:0rpx;
		bottom:0rpx;
		z-index: 1;
		overflow: hidden;
	}
	.serbgBox image {
		width: 100%;
		min-height: 100%;
	}
	.serbgBox img {
		width: 100%;
		min-height: 100%;
	}
	
	.serContBox {
		position: relative;
		z-index: 100;
		padding: 20rpx;
	}
	/* #ifdef APP-PLUS */
		.serContBox {
			position: relative;
			z-index: 100;
			padding: 60rpx 20rpx 20rpx 20rpx;
		}
	/* #endif */
	
	.fanhuiBack {
		width: 70rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		background: rgba(0,0,0,0.2);
		border-radius: 50%;
	}
	.serbtomBox {
		position: fixed;
		left:0rpx;
		bottom:0rpx;
		width: 100%;
		z-index: 100;
		padding: 0rpx 0rpx 10rpx 0rpx;
	}
	.sertitle {
		padding:10rpx 0rpx 0rpx 30rpx;
		color:#00D3FF;
		font-size:30rpx;
		background-image:-webkit-linear-gradient(bottom,#FCA830,#FA8A3A,red); 
		-webkit-background-clip:text; 
		-webkit-text-fill-color:transparent; 
	}
	.sertims_1 {
		color: #ffffff;
		font-size: 50rpx;
		padding: 0rpx 30rpx 30rpx 30rpx;
	}
	.sertims_2 {
		color: #ffffff;
		font-size: 30rpx;
		padding: 0rpx 30rpx 20rpx 30rpx;
	}
	.sertims_3 {
		color: #ffffff;
		font-size: 24rpx;
		padding: 0rpx 30rpx 20rpx 30rpx;
	}
	
	.dynamihd{
	    animation: dynamiztai_d 2s infinite;
	    text-align: center;
		position: relative;
		top:150rpx;
	}
	.dynamihd image {
		width: 30%;
	}
	.dynamihdtx {
		color: #ffffff;
		font-size: 26rpx;
	}
	@-webkit-keyframes dynamiztai_d {
	    0% {
	        transform: translate(0px, 0px);
	    }
	    50% {
	        transform: translate(0px, -20px);
	    }
	    100% {
	        transform: translate(0px, 0px);
	    }
	}
	@-moz-keyframes dynamiztai_d {
	    0% {
	        transform: translate(0px, 0px);
	    }
	    50% {
	        transform: translate(0px, -20px);
	    }
	    100% {
	        transform: translate(0px, 0px);
	    }
	}
	@-o-keyframes dynamiztai_d {
	    0% {
	        transform: translate(0px, 0px);
	    }
	    50% {
	        transform: translate(0px, -20px);
	    }
	    100% {
	        transform: translate(0px, 0px);
	    }
	}
	@keyframes dynamiztai_d {
	    0% {
	        transform: translate(0px, 0px);
	    }
	    50% {
	        transform: translate(0px, -20px);
	    }
	    100% {
	        transform: translate(0px, 0px);
	    }
	}
	
	.serdizuo {
		text-align: center;
	}
	.serdizuo image {
		width:80%;
	}
	
	
</style>