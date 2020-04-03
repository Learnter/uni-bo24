<template>
  <view class="matcheBox">
    <view class="matcheHe">
      <view class="uni-flex matcheTle">
        <view class="fx1 matchetlmc">{{details.trade_msg}} {{details.order_sn}}</view>
        <view class="matchetqian" v-show="details.money">￥{{details.money}}</view>
      </view>
      <view class="uni-flex matcheztbab">
        <view class="fx1 matchezttu">
          <image src="/static/images/new_7.png" mode="widthFix"></image>
        </view>
        <view class="matcheztai">{{details.is_type_msg}}</view>
      </view>
      <view class="uni-flex">
        <view class="fx1 pbsheBox">
          <view class="pbshetext">{{i18n.count}} * {{i18n.price}}</view>
          <view class="pbshetext">{{details.num}}*{{details.actual_price}}</view>
        </view>
        <view class="fx1 pbsheBox">
          <view class="pbshetext">{{i18n.r_deadline}}</view>
          <view class="pbshetext">{{details.d_time}}</view>
        </view>
        <view class="fx1 pbsheBox">
          <view class="pbshetext">{{i18n.c_deadline}}</view>
          <view class="pbshetext">{{details.s_time}}</view>
        </view>
      </view>
      <view class="pbbttlie">
        <text class="text_1">
          {{i18n.payAccount}}：{{details.buy_account}} &nbsp;&nbsp;&nbsp;{{i18n.c_code}}：{{details.check_code}}
        </text>
      </view>
      <view class="pbbttlie uni-flex">
        <view class="fx1 zfumcm">{{i18n.name}}</view>
        <view>{{details.buy_username}}</view>
      </view>
      <view class="pbbttlie uni-flex" v-if="details.zfb_info">
        <view class="fx1 zfumcm">{{i18n.alipay}}</view>
        <view>{{details.zfb_info.zfb_name}}</view>
      </view>
      <view class="pbbttlie uni-flex" v-if="details.wx_info">
        <view class="fx1 zfumcm">{{i18n.weChat}}</view>
        <view>{{details.wx_info.wx_name}}</view>
      </view>
      <view class="pbbttlie uni-flex" v-if="details.bank_info">
        <view class="fx1 bakzfumcm">{{i18n.bank}}</view>
        <view class="nknformb">
          <view>{{details.bank_info.opening_id}} {{details.bank_info.bank_address}}</view>
          <view class="uni-flex">
            <view>{{details.bank_info.bank_account}}</view>
            <view class="nknfofuz" @click="copyBtn(details.bank_info.bank_account)">{{i18n.copy}}</view>
          </view>
        </view>
      </view>

      <view class="uni-flex yuatextBox">
        <view class="yuadian"></view>
        <view class="yuatext">{{i18n.tips1}}</view>
      </view>
      <view class="uni-flex yuatextBox">
        <view class="yuadian"></view>
        <view class="yuatext">{{i18n.tips2}}</view>
      </view>
      <view class="uni-flex yuatextBox">
        <view class="yuadian"></view>
        <view class="yuatext">{{i18n.tips3}}：{{details.add_time}}</view>
      </view>
      <view class="pbbttlie">
        <text class="text_1">{{i18n.credentials}}</text>
      </view>

      <!-- 确认付款 -->
      <block v-if="details.d_true && details.is_type == 1">
        <view class="">
          <!-- 上传按钮 s -->
          <view class="shctanzwei" @click="upFile">
            <image src="/static/images/jiatu.png" mode=""></image>
          </view>
          <view class="shctanzwei" v-for="(rItem,rIndex) in reviewSrc" :key="rIndex">
            <image :src="rItem" mode=""></image>
          </view>
          <!-- 上传按钮 s -->
        </view>
        <view>
          <button type="primary" class="confirBtn" @click="comfirm">{{i18n.remit}}</button>
        </view>
      </block>
      <!-- 确认付款 -->

      <!-- 显示打款图片凭证 -->
      <view v-if="details.is_type !== 1">
        <view class="shctanzwei" v-for="(pItem,pIndex) in details.pay_img" :key="pIndex">
          <image :src="pItem" mode=""></image>
        </view>
      </view>
      <!--  显示打款图片 s -->

     <!--重点-->
      <block >
        <!-- 等待卖方确认收款-->
        <view v-if="details.s_true && (details.is_type == 1 || details.is_type == 2)">
          <button type="primary" class="confirBtn" @click="comfirmReceipt">{{i18n.gather}}</button>
        </view>
        <!-- 等待卖方确认收款-->
        
        <!-- 等待买方收款-->
        <view v-else-if="!details.d_true && (details.is_type == 1 || details.is_type == 2) && details.user_id == details.buy_uid">
          <button type="primary" class="whlogbtn">{{i18n.w_gather}}</button>
        </view>
        <!-- 等待买方收款-->
        <!-- 等待买方打款-->
        <view v-else-if="!details.d_true && (details.is_type == 1 || details.is_type == 2) && details.user_id == details.sell_uid">
          <button type="primary" class="whlogbtn">{{i18n.w_remit}}</button>
        </view>
        <!-- 等待买方打款-->
        
      </block>
     <!--重点--> 

      <!-- 留言-->
      <view class="confirBtnBox">
        <button type="primary" class="confirBtn" @click="mymesgelink">{{i18n.message}}</button>
      </view>
      <!-- 留言-->

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        reviewSrc: [],
        details: {}, //商品详情
        order: { //详情请求配置
          id: ''
        },
        reQuest: { //确认付款配置
          id: '',
          img: []
        }
      }
    },
    computed:{
      i18n(){
        return this.$t('matchdeta');
      }
    },
    onLoad(option) {
      uni.setNavigationBarTitle({
        title:this.$t('navText').matchdeta
      });
      this.setNavRightBotton(this.$t('navText').mg_record);
      this.order.id = option.parentId;
      this.reQuest.id = option.parentId;
    },
    onReady() {
      this.fetchDetail();
    },
    methods: {
      fetchDetail() {
        this.$request.get(this.$KPI.fireDeal.details, this.order).then(res => {
          if (res.code === 200) {
            if (res.data && Object.keys(res.data).length !== 0) {
              this.details = res.data;
            }
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      comfirm() { //购买方确认付款
        uni.showModal({
          title: this.$t('warn').tipTitle,
          content: this.$t('warn').askRemit,
          success: (res) => {
            if (res.confirm) {
              this.$request.post(this.$KPI.fireDeal.payment, this.reQuest).then(res => {
                if (res.code === 200) {
                  uni.showToast({
                    icon: 'loading',
                    title: this.$t('warn').remitSuccess
                  })
                  this.fetchDetail();
                } else {
                  uni.showToast({
                    icon: 'none',
                    title: res.msg
                  })
                }
              })
            }
          }
        })
      },
      comfirmReceipt() { //售卖方确认收款
        this.$request.post(this.$KPI.fireDeal.receipt, this.order).then(res => {
          if (res.code === 200) {
            uni.showToast({
              icon: 'loading',
              title: this.$t('warn').proceedSuccess
            })
            this.fetchDetail();
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      upFile() { //上传文件
        uni.chooseImage({
          count: 3,
          success: (res) => {
            res.tempFilePaths.forEach(item => { //多图上传
              this.$request.upload(this.$KPI.common.upFile, item, 'pay_img', {
                'field': 'pay_img'
              }).then(res => {
                if (res.code === 200) {
                  if (res.data && res.data !== {}) {
                    this.reviewSrc.push(res.data.show_src);
                    this.reQuest.img.push(res.data.src);
                  }
                } else {
                  uni.showToast({
                    icon: "none",
                    title: res.msg
                  })
                  return false;
                }
              })
            })
          }
        })
      },
      copyBtn(msg) { //复制信息
        uni.setClipboardData({
          data: msg,
          success: (res) => {
            uni.showToast({
              icon: "success",
              title: this.$t('warn').copySuccess
            })
          }
        })
      },
      //我要留言
      mymesgelink() {
        uni.navigateTo({
          url: '/pages/flametrad/mymesge?parent_id=' + this.details.id
        });
      },
      // 留言记录
      onNavigationBarButtonTap(e) {
        uni.navigateTo({
          url: '/pages/flametrad/mymesgelist?parent_id='+this.details.id
        });
      }
    }
  }
</script>

<style>
  page {
    background: #158DFF;
  }

  .matcheBox {
    padding: 0rpx 20rpx;
  }

  .matcheHe {
    background: rgba(211, 240, 240, 0.1);
    padding: 20rpx;
    border-radius: 6rpx;
  }

  .matcheTle {
    padding-bottom: 15rpx;
    border-bottom: 2rpx solid rgba(211, 240, 240, 0.1);
  }

  .matchetlmc {
    font-size: 26rpx;
    color: #ffffff;
  }

  .matchetqian {
    color: #52FAEA;
  }

  .matchezttu {
    padding-top: 5rpx;
  }

  .matchezttu image {
    width: 40rpx;
    height: 36rpx;
  }

  .matcheztai {
    color: #FFCD42;
  }

  .matcheztbab {
    padding: 10rpx 0rpx;
  }

  .pbsheBox {
    text-align: center;
  }

  .pbshetext {
    font-size: 24rpx;
    color: #A5D6FA;
  }

  .pbbttlie {
    background: #158DFF;
    padding: 10rpx;
    border-radius: 6rpx;
    margin: 20rpx 0rpx;
    color: #ffffff;
  }

  .pbbttlie .text_1 {
    font-size: 24rpx;
    color: #ffffff;
    border-left: 4rpx solid #FFCD42;
    padding-left: 15rpx;
  }

  .yuatextBox {
    margin-bottom: 15rpx;
  }

  .yuadian {
    width: 10rpx;
    height: 10rpx;
    background: #FFCD42;
    border-radius: 50%;
    margin: 17rpx 15rpx 0rpx 0rpx;
  }

  .yuatext {
    font-size: 24rpx;
    color: #A5D6FA;
  }

  .shctanzwei {
    width: 150rpx;
    height: 150rpx;
    display: inline-block;
    margin: 0rpx 15rpx 15rpx 0rpx;
  }

  .shctanzwei image {
    width: 100%;
    height: 100%;
  }

  .nknformb {
    text-align: right;
  }

  .nknfofuz {
    height: 46rpx;
    line-height: 44rpx;
    color: #FFCD42;
    border: 2rpx solid #FFCD42;
    padding: 0rpx 15rpx;
    border-radius: 6rpx;
    margin-left: 20rpx;
    font-size: 26rpx;
  }

  .zfumcm {
    color: #A5D6FA;
  }

  .bakzfumcm {
    color: #A5D6FA;
    padding-top: 25rpx;
  }
</style>
