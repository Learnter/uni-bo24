<template>
  <view class="apmyminBox">
    <view>
      <view class="apmyminList" v-for="(mItem,mIndex) in millsList" :key="mIndex">
        <view class="apmymintlBox uni-flex">
          <view class="fx1 apmymintl">
            <text class="text_1">{{mItem.mine_name}}</text>
            <text class="text_2">（{{mItem.status}}...）</text>
          </view>
          <view class="apmyminckk" @click="servicean(mItem)">{{i18n.watch}}</view>
        </view>
        <view class="apmyminCont clearfix">
          <view class="apmytlene">
            <text class="text_1">{{i18n.price}}：</text>
            <text class="text_2">{{mItem.deposit}}</text>
          </view>
          <view class="apmytlene">
            <text class="text_1">{{i18n.gather}}：</text>
            <text class="text_2">{{mItem.dividend_num}}</text>
          </view>
          <view class="apmytlene">
            <text class="text_1">{{i18n.hashrate}}：</text>
            <text class="text_2">{{mItem.power}}</text>
          </view>
          <view class="apmytlene">
            <text class="text_1">{{i18n.time}}：</text>
            <text class="text_2">{{mItem.last_dividend_time}}</text>
          </view>
          <view class="apmytlene">
            <text class="text_1">{{i18n.total}}：</text>
            <text class="text_2">{{mItem.dividend_num}}</text>
          </view>
        </view>
      </view>
    </view>
    <!--无商品-->
    <view class="stayBox" v-if="showEmpty">
      <image src="/static/images/a024laner_105.png" mode="" style="width:400rpx;height:500rpx"></image>
      <view>
        <navigator class="cartBtn" url="/pages/index/myminelist" open-type="switchTab" hover-class="none">
         {{i18n.buy}}
        </navigator>
      </view>
    </view>
    <!--无商品-->
  </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        showEmpty: false,
        millsList: []
      }
    },
    computed:{
      i18n(){
        return this.$t('mymine');
      }
    },
    onLoad(){
     uni.setNavigationBarTitle({
       title:this.$t('navText').myMill
     })
    },
    onReady() {
      this.fetchMills();
    },
    methods: {
      fetchMills() {
        uni.showLoading({
          title:this.$t('warn').load,
          mask:true
        })
        this.showEmpty = false;
        this.$request.get(this.$KPI.millShop.myUserList).then(res => {
          if (res.code === 200) {
            if (res.data.length === 0) {
              this.showEmpty = true;
            } else {
              this.millsList = res.data;
            }
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
          setTimeout(()=>{
            uni.hideLoading();
          },1000)
        })
      },
      servicean(obj) {
        uni.navigateTo({
          url: "/pages/mine/service?mill_id=" + obj.id
        });
      }
    }
  }
</script>

<style>
  @import url("mymine.css");

  .stayBox {
    padding-top: 20%;
  }

  .cartBtn {
    width: 300rpx;
    height: 80rpx;
    line-height: 80rpx;
    margin: auto;
    background: burlywood;
    border-radius: 40rpx;
    font-size: 32rpx;
    box-shadow: 0 16rpx 6rpx indianred;
  }
</style>
