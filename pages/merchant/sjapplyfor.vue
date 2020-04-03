<template>
  <view class="apbindaBox">
    <view class="apbindaCont">
      <form @submit="formSubmit">
        <view class="uni-form-item uni-column bindiiutBox">
          <view>{{i18n.bs_name}}</view>
          <view class="with-fun bindiiut">
            <input type="text" class="uni-input" v-model="applyConfig.name" :placeholder="holder.bs_name" placeholder-style="color:#888888;" />
          </view>
        </view>
        <view class="uni-form-item uni-column bindiiutBox">
          <view>{{i18n.bs_tel}}</view>
          <view class="with-fun bindiiut">
            <input type="number" class="uni-input" v-model="applyConfig.phone" :placeholder="holder.bs_tel" placeholder-style="color:#888888;" />
          </view>
        </view>
        <view class="uni-form-item uni-column bindiiutBox">
          <view>{{i18n.bs_address}}</view>
          <view class="with-fun bindiiut">
            <input type="text" v-model="applyConfig.address" class="uni-input" :placeholder="holder.bs_address" placeholder-style="color:#888888;" />
          </view>
        </view>
        <view class="uni-form-item uni-column bindiiutBox">
          <view>{{i18n.tradePwd}}</view>
          <view class="with-fun bindiiut">
            <input type="password" v-model="applyConfig.re_store_pwd" class="uni-input" :placeholder="holder.dealPwd" placeholder-style="color:#888888;" />
          </view>
        </view>
        <view class="uni-flex">
          <view class="fx1 uploadBox">
            <view>{{i18n.bs_logo}}</view>
            <view class="binshcan" @click="openAlbum">
              <image src="/static/images/jiatu.png" mode="widthFix"></image>
            </view>
          </view>
          <view class="bindrewimg">
              <image :src="reviewSrc"></image>
          </view>
        </view>
        <block>
          <view class="btn-area confirBtnBox" v-if="applyConfig.status === 0">
            <button formType="submit"  class="confirBtn">{{i18n.submit}}</button>
          </view>
          <view class="btn-area confirBtnBox" v-else-if="applyConfig.status === 1">
            <button type="primary"  class="confirBtn">{{i18n.success}}</button>
          </view>
          <view class="btn-area confirBtnBox" v-else-if="applyConfig.status === 2">
            <button type="default" disabled="true" class="confirBtn">{{i18n.audit}}</button>
          </view>
          <view class="btn-area confirBtnBox"  v-else-if="applyConfig.status === 3">
            <button formType="submit" type="warn" class="confirBtn" style="background:#e64340;">{{i18n.reject}}</button>
          </view>
        </block>
      </form>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        reviewSrc: '', //图片的地址
        applyConfig: { //申请配置
          name: '',
          address: '',
          phone: '',
          re_store_pwd: '',
          logo: ''
        }
      }
    },
    computed:{
      i18n(){
        return this.$t('sjapplyfor');
      },
      holder(){
        return this.$t('holder');
      }
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').bs_application
      })
    },
    onReady(){
      this.fetchBaseMsg();
    },
    methods: {
      fetchBaseMsg(){ //商家基本信息
        this.$request.get(this.$KPI.BsnSystem.baseMsg).then(res => {
          if(res.code === 200){
            if(res.data && Object.keys(res.data).length !== 0){
              this.applyConfig = res.data;
              this.reviewSrc = res.data.logo;
            }
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      formSubmit() { //提交申请
        let {name,address,phone,re_store_pwd,logo} = this.applyConfig;
        if (name.trim().length === 0) {
          uni.showToast({
            icon: "none",
            title: this.$t('warn').empty_bs_name
          })
          return false;
        } else if (phone.trim().length === 0) {
          uni.showToast({
            icon: "none",
            title: this.$t('warn').empty_bs_tel
          })
          return false;
        } else if (address.trim().length === 0) {
          uni.showToast({
            icon: 'none',
            title: this.$t('warn').empty_bs_address
          })
          return false;
        } else if (re_store_pwd.trim().length === 0) {
          uni.showToast({
            icon: 'none',
            title: this.$t('warn').dealPwdEmpty
          })
          return false;
        } else if (logo.trim().length === 0) {
          uni.showToast({
            icon: 'none',
            title: this.$t('warn').empty_bs_logo
          })
          return false;
        }

        this.$request.post(this.$KPI.BsnSystem.apply, this.applyConfig).then(res => {
          if (res.code === 200) {
            uni.showToast({
              icon: "loading",
              title: this.$t('warn').applySuccess
            })
            this.fetchBaseMsg();
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      openAlbum() { //上传商家LOGO
        uni.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            this.$request.upload(this.$KPI.common.upFile, res.tempFilePaths[0], 'logo', {
              'field': 'logo'
            }).then(res => {
              if (res.code === 200 && res.data && res.data !== {}) {
                this.reviewSrc = res.data.show_src;
                this.applyConfig.logo = res.data.src;
              } else {
                uni.showToast({
                  icon: "none",
                  title: res.msg
                })
              }
            })
          }
        });
      }
    }
  }
</script>

<style>
  @import url("../account/bindcss.css");
  .uploadBox{
    display:flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .bindrewimg {
  	width: 300rpx;
    height:300rpx;
  	position: relative;
    border-radius:10rpx;
  	overflow: hidden;
    background: url('/static/images/shililogo.png')no-repeat center;
    background-size: cover;
  }
</style>
