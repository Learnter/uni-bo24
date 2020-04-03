<template>
  <view class="guide" :style="{ height: screenHeight+ 'px' }">
    <swiper class="flex1" interval="3000" :show-indicators="false" :auto-play="autoPlay" @change="sliderChange"
      :infinite="false" :forbid-slide-animation="false">
      <swiper-item class="flex1" v-for="(img, index) in imageList" :key="index">
        <view class="flex1" @click="launchAppIndex">
          <image class="flex1" mode="aspectFill" :style="{ width: screenWidth+ 'px',height: screenHeight+ 'px' }" :src="img.src" />

        </view>
      </swiper-item>
    </swiper>
    <view class="swiper-to-home" @click="launchApp"><text class="swiper-to-home-text">跳过</text></view>
  </view>
</template>

<script>
  const SystemInfo = uni.getSystemInfoSync();
  export default {
    data() {
      return {
        imageList: [{
            src: '../../static/images/boot/guide_1.9.png'
          },
          {
            src: '../../static/images/boot/guide_2.9.png'
          },
          {
            src: '../../static/images/boot/guide_3.9.png'
          }
        ],
        autoPlay: false,
        currIndex: 0,
        screenWidth: SystemInfo.screenWidth,
        screenHeight: SystemInfo.screenHeight
      };
    },
    onLoad() {
      // console.log(SystemInfo);
    },
    methods: {
      sliderChange(e) {
        // console.log(e);
        this.currIndex = e.detail.current;
      },
      launchAppIndex() {
        // console.log('launchAppIndex');
        if (this.imageList.length == this.currIndex + 1) {
          this.launchApp();
        } else {
          return;
        }
      },
      launchApp() {
        var me = this;
        // 直接到APP 且下次不再显示引导页
        uni.setStorage({
          key: 'launchFlag',
          data: true,
          success() {
            let token = me.$catchs.get("app_user_info"); //token存在直接跳转到首页
            if (token) {
              uni.switchTab({
                url: '/pages/index/index'
              });
            } else {
              uni.redirectTo({
                url: '/pages/login/login'
              });
            }
          }
        });
      }
    }
  };
</script>
<style scoped>
  .guide {
    display: flex;
    height: 100%;
    flex-direction: column;
    flex: 1;
  }

  .flex1 {
    flex: 1;
  }

  .apptestnnnn {
    border-width: 1px;
    border-color: #4cd964;
    border-style: solid;
  }

  .apptest {
    border-width: 1px;
    border-color: #007aff;
    border-style: solid;
  }

  .swiper-to-home {
    position: absolute;
    z-index: 999;
    right: 40rpx;
    top: 80rpx;
  }

  .swiper-to-home-text {
    color: #ffffff;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-width: 1rpx;
    border-color: #ffffff;
    border-style: solid;
    border-radius: 30rpx;
    font-size: 28rpx;
    padding-top: 5rpx;
    padding-bottom: 5rpx;
    padding-left: 25rpx;
    padding-right: 25rpx;
  }

  .indicator {
    width: 714rpx;
    height: 30rpx;
    position: absolute;
    bottom: 50rpx;
    left: 1rpx;
    item-color: #f6f6f6;
    item-selected-color: #fd575c;
    item-size: 20rpx;
  }
</style>
