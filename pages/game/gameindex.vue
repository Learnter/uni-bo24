<template>
	<view class="gamedaBox">
		<navigator url="/pages/game/dial/dial" class="gamedatopimg" hover-class="none">
    <!-- <view class="gamedatopimg"> -->
			<image src="/static/images/luckyDraw.png" mode="widthFix"></image>
    <!-- </view> -->
		</navigator>
    
    <block v-for="(gItem,gIndex) in games" :key="gIndex">
      <view class="gamedatle">{{gIndex}}</view>
      <view class="clearfix">
      	<view class="gamedNavHe" v-for="(cItem,cIndex) in gItem" :key="cIndex">
      		<view :url="cItem.gram_url"  class="gamedNav" @tap="outLink(cItem)">
      			<image :src="cItem.gram_logo" mode="widthFix"></image>
      			<view class="gamedNavtx">{{cItem.gram_name}}</view>
      			<view class="gamedNavxz">{{cItem.gram_mood}}人</view>
      		</view>
      	</view>
      </view>	
    </block>
	</view>
</template>

<script>
  export default {
    data(){
      return{
        games:{}
      }
    },
    onLoad(){
     this.whichLanguage('游戏中心','GAME HUB');
    }, 
    onReady() {
      this.fetchGames();
    },
    methods:{
      fetchGames(){ 
        this.$request.get(this.$KPI.games.recommend).then(res => {
          if(res.code === 200){
            this.games = res.data;
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      outLink(obj){
        // #ifdef APP-PLUS
           /*App端调用外链*/
            plus.runtime.openURL(obj.gram_url); 
           /*App端调用外链*/
        // #endif
        
        // #ifdef H5
            window.location.href = obj.gram_url;
        // #endif  
      }
    }
  }
</script>

<style>
	.gamedaBox {
		padding: 20rpx;
	}
	.gamedatopimg image {
		width: 100%;
		border-radius: 10rpx;
	}
	.gamedatle {
		padding: 20rpx 10rpx 0rpx 10rpx;
		font-size: 28rpx;	
		font-weight: 600;
	}
	.gamedNavHe {
		width: 25%;
		float: left;
	}
	.gamedNav {
		display: block;
		padding-top: 25rpx;
		width:90%;
		margin: 0 auto;
		text-align: center;
	}
	.gamedNav image {
		width: 135rpx;
		height: 135rpx;
		border-radius: 15rpx;
	}
	.gamedNavtx {
		color: #333333;
		font-size: 26rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.gamedNavxz {
		color: #999999;
		font-size: 24rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	
	
	
</style>
