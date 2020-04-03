<template>
  <view>
    <form @submit="formSubmit">
      <view class="whlonBox">
        <view class="whlontitle">{{i18n.title}}</view>
        <view class="qxlontitlems">{{i18n.titleDetail}}</view>
        <view class="uni-form-item uni-column qxloninputBox">
          <view class="with-fun qxloninput">
            <input class="uni-input" type="number" :placeholder="i18n.accountHolder" placeholder-style="color:#C4D8D8;" v-model="retrieve.account"
              @input="clearInput"  @blur="phoneOrEmail"/>
            <view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
          </view>
        </view>
        <view class="uni-form-item uni-column qxloninputBox">
          <view class="with-fun qxloninput">
            <input class="uni-input" :password="showPassword" :placeholder="i18n.resetHolder" placeholder-style="color:#C4D8D8;" v-model="retrieve.password" />
            <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
          </view>
        </view>
        <view class="uni-form-item uni-column qxloninputBox">
          <view class="with-fun qxloninput">
            <input class="uni-input" :password="showSecpwd" :placeholder="i18n.confirmHolder" placeholder-style="color:#C4D8D8;"
              v-model="retrieve.repassword" />
            <view class="uni-icon uni-icon-eye" :class="[!showSecpwd ? 'uni-active' : '']" @click="changeSecpwd"></view>
          </view>
        </view>
        <view class="uni-form-item uni-column qxloninputBox" v-show="isShowVerifyCode || isShowMobileCode">
          <view class="with-fun qxloninput">
            <input class="uni-input" :placeholder="i18n.verify_code" placeholder-style="color:#C4D8D8;" v-model="retrieve.verify_code" />
            <image :src="graphImg" class="yzm" @tap="fetchGraphCode"></image>
          </view>
        </view>
        <view class="uni-form-item uni-column qxloninputBox" v-show="isShowMobileCode">
          <view class="with-fun qxloninput">
            <input class="uni-input" placeholder-class="uni-ellipsis" :placeholder="i18n.mobile_code" placeholder-style="color:#C4D8D8;" v-model="retrieve.mobileCode" />
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
          account: '', //账号
          password: '', //密码
          repassword: '', //确认密码
          verify_code: '', //图形验证码
          mobileCode: '' //短信验证码
        },
        timeOut: 0, //短信验证码过期时间
        validDuration: false, //短信是否在发送期间
        clearTimer: null, //定时器
        isShowVerifyCode: false, //是否显示图形验证码框
        isShowMobileCode: false, //是否显示短信验证码框
        graphImg: '', //验证码图片
        showClearIcon: false ,//显示清空图标
        showPassword: true,//显示密码
        showSecpwd:true,//显示重置密码
        isEmail:false //是否为邮箱
      }
    },
    computed:{
         i18n(){
           return this.$t('forgot');
         }
       },
    onReady() {
      this.fetchShowCode();
      this.fetchGraphCode();
    },
    methods: {
      fetchShowCode() { //获取图形、短信验证码开关
        this.$request.get(this.$KPI.common.Info).then(res => {
          if (res.code === 200 ) {
            if(res.data && Object.keys(res.data).length !== 0){
              this.isShowVerifyCode = res.data.verif_code;
              this.isShowMobileCode = res.data.register_sms_switch;
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
      fetchGraphCode() { //获取图形验证码 
        this.$request.get(this.$KPI.common.graphCode, {
          type: 'forgot'
        }).then(res => {
          this.graphImg = res;
        })
      },
      fetchMobleCode() { //获取短信验证码
      
        let {account,verify_code} = this.retrieve;
        
        if (account.trim().length === 0) { //手机号码验证
          uni.showToast({
            icon: "none",
            title: this.$t('warn').accountEmpty
          })
          return false;
        }
        
        if (verify_code.trim().length === 0) {
          uni.showToast({
            icon: "none",
            title: this.$t('warn').graphCodeEmpty
          })
          return false;
        }
        
        if (this.validDuration) { //短信发送期间防止重复获取
          uni.showToast({
            icon: "none",
            title: this.$t('warn').loopTip
          })
          return false;
        }
        
        /*手机号或邮箱找回密码*/
        let data = {};
        let reUrl = '';
        if(this.isEmail){
             reUrl = this.$KPI.common.emailCode;
             data = {email:account,verify_code:verify_code,check_code:'forgot'};
          }else{
             reUrl = this.$KPI.common.securityCode;
             data = {mobile:account,type:1,verify_code:verify_code,check_code:'forgot'};
         }
         /*手机号或邮箱找回密码*/
         
        
        this.$request.post(reUrl, data).then(res => {
          if (res.code === 200) {
            this.validDuration = true;
            uni.showToast({
              icon: "none",
              title: this.$t('warn').sendTip
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
      authentication() { //注册验证
        let {account,password,repassword,verify_code,mobileCode} = this.retrieve;
        if (account.trim().length > 0) { //手机号码验证
          // if (!(/^1[3456789]\d{9}$/.test(account))) {
          //   uni.showToast({
          //     icon: "none",
          //     title: "请输入有效的手机号码"
          //   })
          //   return false;
          // }
        } else {
          uni.showToast({
            icon: "none",
            title: this.$t('warn').accountEmpty
          })
          return false;
        }

        if (password.trim().length > 0) { //登录密码验证
          // if (!(/^[0-9A-Za-z]{6,}$/.test(password))) {
          //   uni.showToast({
          //     icon: "none",
          //     title: "密码长度最少6位!"
          //   })
          //   return false;
          // }
        } else {
          uni.showToast({
            icon: "none",
            title: this.$t('warn').passwordEmpty
          })
          return false;
        }

        if (repassword.trim().length > 0) { //密码再次验证
          if (repassword != password) {
            uni.showToast({
              icon: "none",
              title: this.$t('warn').pwdAuthentication
            })
            return false;
          }
        } else {
          uni.showToast({
            icon: "none",
            title: this.$t('warn').passwordEmpty
          })
          return false;
        }

        if (this.isShowVerifyCode) { //验证图形码
          if (verify_code.trim().length > 0) {
            // if (!(/^[0-9A-Za-z]{4}$/.test(verify_code))) {
            //   uni.showToast({
            //     icon: "none",
            //     title: "验证码为4位数字、字母!"
            //   })
            //   return false;
            // }
          } else {
            uni.showToast({
              icon: "none",
              title: this.$t('warn').graphCodeEmpty
            })
            return false;
          }
        }

        if (this.isShowMobileCode) { //验证短信码
          if (mobileCode.trim().length > 0) {
            // if (!(/^[0-9A-Za-z]{4,}$/.test(mobileCode))) {
            //   uni.showToast({
            //     icon: "none",
            //     title: "短信验证码为4-6位数字、字母!"
            //   })
            //   return false;
            // }
          } else {
            uni.showToast({
              icon: "none",
              title: this.$t('warn').securityCodeEmpty
            })
            return false;
          }
        }

        this.$request.post(this.$KPI.regiter.retrieve, this.retrieve).then(res => {
          if (res.code === 200) {
            uni.showToast({
              icon: "none",
              title: this.$t('warn').pwdResetSuccess
            })
            setTimeout(() => {
              uni.redirectTo({
                url: '/pages/login/login'
              });
            }, 1000)
          } else {
            uni.showToast({
              icon: "none",
              title: res.msg
            })
          }
        })
      },
      formSubmit() { //找回密码
        this.authentication();
      },
      /*判断手机号找回还是邮箱找回*/
       phoneOrEmail(){
          let {account} = this.retrieve;
          
          if(account.trim().length === 0){ 
              uni.showToast({
                icon:"none",
                title:this.$t('warn').accountEmpty
              })
              return false;
           }
           if(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(account)){
             this.isEmail = true;
           }else{
             this.isEmail = false;
           }      
       },
      /*判断手机号找回还是邮箱找回*/
      changePassword: function() {
      	this.showPassword = !this.showPassword;
      },
      changeSecpwd(){
        this.showSecpwd = !this.showSecpwd;
      },
      clearInput: function(event) {
        if (event.target.value.length > 0) {
          this.showClearIcon = true;
        } else {
          this.showClearIcon = false;
        }
      },
      clearIcon: function() {
        this.retrieve.account = '';
        this.showClearIcon = false;
      }
    }
  }
</script>

<style>
  @import url("index.css");
</style>
