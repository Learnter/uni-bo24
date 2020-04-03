<template>
  <view>
    <view class="outBox uni-flex">
      <view class="storeImg">
        <image src="/static/images/luckyDraw.png" style="width:100%;height:100%"></image>
      </view>
      <view class="uni-flex-item storeInfo">
        <view class="storeName">天天优铺经理</view>
      </view>
    </view>
    <view class="inputBox uni-flex">
      <text>消费总额：</text>
      <input class="uni-flex-item consume" type="text" placeholder="请输入消费总额" value="" placeholder-class="consumeHolder" />
    </view>
    <view class="payBox">
        <radio-group  @change="selReacharge">
          <view class="uni-flex ykdeBox">
            <view class="ykdeimg">
              <image src="/static/images/logo3.png" mode=""></image>
            </view>
            <view class="fx1 ykdetext">HBY支付</view>
            <view class="ykdexzan">
              <label class="radio">
                <radio value="1" checked="true" />
              </label>
            </view>
          </view>
          <view class="uni-flex ykdeBox">
            <view class="ykdeimg">
              <image src="/static/images/zsy.png" mode=""></image>
            </view>
            <view class="fx1 ykdetext">火种支付</view>
            <view class="ykdexzan">
              <label class="radio">
                <radio value="2" />
              </label>
            </view>
          </view>
        </radio-group>
    </view>
    <view class="inputBox uni-flex">
      <text>二级密码：</text>
      <input class="uni-flex-item consume" type="text" placeholder="请输入二级密码" value="" placeholder-class="consumeHolder" />
    </view>
    <button class="buttonBox">确认支付</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      selReacharge(e) { //选择充值方式
      
      },
    }
  }
</script>

<style scoped>
  .outBox {
    padding:20rpx;
    border-bottom: 1rpx solid #EFF0F2;
    font-size:32rpx;
  }
  
  .inputBox{
    padding:20rpx;
    border-bottom: 1rpx solid #EFF0F2;
    font-size:32rpx;
    align-items:center;
  }

  .storeImg {
    width: 180rpx;
    height: 200rpx;
  }
    
  .storeInfo{
    padding-left:20rpx;
  }
  
  .storeName {
    color: #E4BD0A;
    font-size:36rpx;
  }
  
  .InputBox{

  }

  .consume {
    color: gray;
  }
  
  .payBox{
    padding:0 20rpx;
    border-bottom: 1rpx solid #EFF0F2;
  }
  
  .ykdeBox {
  	margin:20rpx 0;
  }
  
  .ykdetext {
  	line-height: 80rpx;
  	height: 80rpx;
  	padding-left: 30rpx;
    font-size:32rpx;
  }
  
  .ykdexzan {
  	margin-top: 15rpx;
  }
  
  .ykdeimg image {
  	width: 80rpx;
  	height: 80rpx;
  }

  .consumeHolder {
    /* text-align: center; */
    font-size: 28rpx;
  }

  .storeName {
    color: #E4BD0A;
  }

  .buttonBox {
    margin: 70rpx 20rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: #ED5208;
    color: #F0F0F2;
  }
 
</style>
