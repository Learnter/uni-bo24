<template>
  <view>
    <form @submit="formSubmit">
      <view class="whlonBox">
        <view class="uni-form-item uni-column qxloninputBox">
          <view class="with-fun qxloninput">
            <input class="uni-input" type="number" disabled="true" :placeholder="i18n.accountHolder" placeholder-style="color:#C4D8D8;"  v-model="retrieve.account" />
          </view>
        </view>

        <view class="uni-form-item uni-column qxloninputBox">
          <view class="with-fun qxloninput">
            <input class="uni-input" placeholder-class="uni-ellipsis" :placeholder="i18n.mobile_code" placeholder-style="color:#C4D8D8;" v-model="retrieve.mobile_code" />
            <button type="primary" class="textyzm" @click="fetchMobleCode" v-if="validDuration">{{i18n.timeOut+'('+timeOut+')s'}}</button>
            <button type="primary" class="textyzm" @click="fetchMobleCode" v-else>{{i18n.testGetCode}}</button>
          </view>
        </view>
        <view class="btn-area whlogbtnBox">
          <button formType="submit" class="whlogbtn">{{i18n.promptly}}</button>
        </view>
      </view>
    </form>
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
        retrieve: {
          id: '', //账号id
          code: '', //手机唯一标识符
          account: '', //账号
          mobile_code: '' //短信验证码
        },
        timeOut: 0, //短信验证码过期时间
        validDuration: false, //短信是否在发送期间
        clearTimer: null //定时器
      }
    },
    computed: {
      i18n() {
        return this.$t('bind');
      }
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').removeBind
      })
    },
    onReady() {
      // #ifdef APP-PLUS
      /*获取手机唯一标识*/
      plus.device.getInfo({
        success: (res) => {
          this.retrieve.code = res.uuid;
        }
      })
      /*获取手机唯一标识*/
      // #endif
      this.fetchShowCode();
      this.fetchbindInfo();
    },
    methods: {
      fetchbindInfo() { //获取绑定信息
        this.$request.get(this.$KPI.login.bindInfo).then(res => {
          if (res.code === 200) {
            if (res.data && Object.keys(res.data).length !== 0) {
              this.retrieve.id = res.data[0].id;
              this.retrieve.account = res.data[0].account;
            }
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      fetchShowCode() { //获取验证码过期时间
        this.$request.get(this.$KPI.common.Info).then(res => {
          if (res.code === 200) {
            if (res.data && Object.keys(res.data).length !== 0) {
              this.timeOut = res.data.send_sms_time_out;
            }
          } else {
            uni.showToast({
              icon: "none",
              title: res.msg
            })
          }
        })
      },
      fetchMobleCode() { //获取短信验证码
      
        let {account} = this.retrieve;
        
        if (this.validDuration) { //短信发送期间防止重复获取
          uni.showToast({
            icon: "none",
            title: this.i18n.loopTip
          })
          return false;
        }
        let data = {
          mobile: account,
          type: 4
        }
        this.$request.post(this.$KPI.common.securityCode, data).then(res => {
          if (res.code === 200) {
            this.validDuration = true;
            uni.showToast({
              icon: "none",
              title: this.i18n.sendTip
            })
            this.clearTimer = setInterval(() => {
              if (this.timeOut === 0) {
                this.validDuration = false;
                this.timeOut = 60;
                clearInterval(this.clearTimer);
              } else {
                this.timeOut--;
              }
            }, 1000);
          } else {
            uni.showToast({
              icon: "none",
              title: res.msg
            })
          }
        })
      },
      formSubmit() { //解除绑定
      
        this.$request.post(this.$KPI.login.removeBind, this.retrieve).then(res => {
          
          if (res.code === 200) {
            
            uni.showToast({
              icon: 'loading',
              title: this.i18n.successTip
            })
            
            /*解绑成功,清空缓存.跳转登录页面*/
            this.$catchs.clear();
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/login/login'
              });
            }, 2000);
           /*解绑成功,清空缓存.跳转登录页面*/
           
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      }
    }
  }
</script>

<style>
  @import url("../forgot/index.css");
</style>
