<template>
	<view>
		<form @submit="formSubmit" >
      <view class="tbuiconBox">
        <!-- 	<button formType="reset" class="tbuicon">
            <uni-icon type="refresh-filled" color="#ffffff" size="36" class="i"></uni-icon>
          </button>-->	
			</view>
			<view class="whlonBox">
				<view class="whlontitle">{{i18n.title}}</view>
				<view class="qxlontitlems">{{i18n.where}}</view>
				<view class="languaBox uni-flex">
					<div class="languatl">{{i18n.language}}</div>
					<view class="languaCont fx1" @click="gospdpopup">{{language}}</view>
				</view>
				<view class="uni-form-item uni-column qxloninputBox">
					<view class="with-fun qxloninput">
						<input class="uni-input"  :placeholder="i18n.accountHolder" placeholder-style="color:#C4D8D8;" v-model="user.account" @input="clearInput" @blur="isFirseLogin"/>
						<view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
					</view>
				</view>
				<view class="uni-form-item uni-column qxloninputBox">				
					<view class="with-fun qxloninput">
						<input class="uni-input" :password="showPassword" :placeholder="i18n.passwordHolder" placeholder-style="color:#C4D8D8;"  v-model="user.password"/>
						<view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
					</view>
				</view>
        <block>
          <view class="uni-form-item uni-column qxloninputBox">
            <view class="with-fun qxloninput">
              <input class="uni-input" type="number" :placeholder="i18n.verify_code" placeholder-style="color:#C4D8D8;" v-model="user.verify_code"/>
              <image :src="graphImg"  class="yzm" @tap="fetchGraphCode"></image>
            </view>
          </view>
          <view class="uni-form-item uni-column qxloninputBox" v-if="isFirstLogin" >
            <view class="with-fun qxloninput">
              <input class="uni-input" type="number" :placeholder="i18n.mobile_code" placeholder-style="color:#C4D8D8;" v-model="user.mobile_code" />
              <button type="primary" class="textyzm" @click="fetchMobleCode" v-if="validDuration">{{i18n.timeOut+'('+timeOut+')s'}}</button>
              <button type="primary" class="textyzm" @click="fetchMobleCode" v-else>{{i18n.testGetCode}}</button>
            </view>
          </view>
        </block>
				<view class="btn-area whlogbtnBox">
					<button formType="submit" class="whlogbtn">{{i18n.confirm}}</button>
				</view>
				<view class="uni-flex">
					<view>
						<navigator url="../forgot/index" hover-class="none" class="qxlogLinka">{{i18n.forget}}</navigator>
					</view>
          <view class="fx1">
          	<navigator url="../reg/index" hover-class="none" class="qxlogLinka qxlogLinkams uni-flex">
          		<text class="text_1 fx1">{{i18n.inquiry}}</text>
          		<text class="text_2">{{i18n.register}}</text>
          	</navigator>
          </view>
				</view>
				<view class="qxbesLinkTle">
					<view class="qxbesLintx">{{i18n.otherMethods}}</view>
				</view>
				<view class="qxbesLinanBox">
					<view class="qxbesLinan">
						<image src="../../static/images/wexin.png" mode="aspectFit"></image>
						<view class="qxbesLinantx">{{i18n.weChat}}</view>
					</view>
				</view>
			</view>
		</form>
		
		
		<!-- 语言选择弹窗 s -->
		<view class="qxbzxzBox" :class= "spdpopup == true ? 'qxbzxzBoxActive' : ''">
			<view class="qxpopupupcontBox">
				<view class="qxasbiltle ">{{i18n.language}}</view>
				<view class="qxasbiltext" v-for="(lang,index) in langList" :key="index" @click="langListAn(lang,index)">				
					{{lang.name}}
				</view>				
				<view class="qxasbilqux" @click="backpdpopup">{{i18n.cancle}}</view>
			</view>
		</view>
		<!-- 语言选择弹窗 e -->
		
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
        timeOut:0, //短信验证码过期时间
        validDuration:false, //短信是否在发送期间
        isFirstLogin:false,//是否首次登陆
        graphImg:'', //图形验证码图片
        user:{
          account:'',//账号
          password:'',//密码
          verify_code:'',//图形验证码        
          mobile_code:'',//首次登陆手机验证码
          code:'',//手机唯一标识
        },
				showClearIcon: false,
				showPassword: true,
				spdpopup:false,
				language:"简体中文",
        // 语言选择 s
        langList: [{
        	name: '简体中文',
          value:'zh-cn'
        }, {
        	name: 'English',
          value:'en-us'
        }, {
        	name: '日本語',
          value:'JP'
        }, {
        	name: '한국어',
          value:'KR'
        }],
        index: 0,
			}
		},
   computed:{
        i18n(){
          return this.$t('login');
        }
      },
    onLoad() {
      // #ifdef APP-PLUS
         /*获取手机唯一标识,防止其他设备登录 */
          plus.device.getInfo({
            success:(res) =>{
              uni.setStorageSync('uuid',res.uuid);
            }
          })
         /*获取手机唯一标识,防止其他设备登录 */
      // #endif
    },
    onReady(){
      this.fetchGraphCode();
      this.fetchShowCode();
    },
		methods: {
      fetchShowCode() { //获取手机、邮箱验证码过期时间
        this.$request.get(this.$KPI.common.Info).then(res => {
          if (res.code === 200 ) {
            if(res.data && Object.keys(res.data).length !== 0){
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
      authentication(){ //登录验证
        let {account,password,verify_code} = this.user;       
          if(account.trim().length > 0){
              // if(!(/^1[3456789]\d{9}$/.test(account)) && !(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(account))){
              //   uni.showToast({
              //     icon:"none",
              //     title:"请输入正确的手机或邮箱账号"
              //   })
              //   return false;
              // }
           }else{
              uni.showToast({
               icon:"none",
               title:this.$t('warn').accountEmpty
             })
             return false;
           }
           
          if(password.trim().length > 0){
             // if(!(/^[0-9A-Za-z]{6,}$/.test(password))){
             //   uni.showToast({
             //     icon:"none",
             //     title:"密码长度最少6位!"
             //   })
             //   return false;
             // }
          }else{
             uni.showToast({
              icon:"none",
              title:this.$t('warn').passwordEmpty
            })
            return false;
          }
         
         if(verify_code.trim().length > 0){
            // if(!/^[0-9A-Za-z]{4}$/.test(verify_code)){
            //    uni.showToast({
            //     icon:"none",
            //     title:"验证码为4位数字、字母!"
            //   })
            //   return false;
            // }
         }else{
           uni.showToast({
             icon:"none",
             title:this.$t('warn').graphCodeEmpty
           })
           return false;
         }
          this.$request.post(this.$KPI.login.into,this.user).then(res => { 
             if(res.code === 200 && res.data && res.data != {}){
               this.$catchs.put('app_user_info',res.data);
               uni.switchTab({
                 url: '/pages/index/index'
               });
             }else{
                uni.showToast({
                 icon:"none",
                 title:res.msg
               })
              this.fetchGraphCode(); 
             }
         })
      },       
      fetchGraphCode(){ //获取图形验证码 
        this.$request.get(this.$KPI.common.graphCode,{type:'login'}).then( res => {
           this.graphImg = res;
        })
      },
      formSubmit(){ //登录
        this.authentication();
      },
      isFirseLogin(){//首次登陆判断
        if(this.user.account.trim().length === 0){
          uni.showToast({
            icon:'none',
            title:this.$t('warn').accountEmpty
          })
          return false;
        }
        this.$request.post(this.$KPI.login.isFirst,{account:this.user.account}).then(res => {
          if(res.code === 200){
              this.isFirstLogin = res.data.is_first;
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      fetchMobleCode() { //获取短信,邮箱验证码
        let {account,verify_code} = this.user;
        if (account.trim().length === 0) { //手机号码验证
          uni.showToast({
            icon: "none",
            title: this.$t('warn').accountEmpty
          })
          return false;
        } 
        
        if (account.trim().length === 0) { //手机号码验证
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
        
        let data = {
          mobile: account,
          type: 1,
          verify_code:verify_code,
          check_code:'login'
        }
        this.$request.post(this.$KPI.common.securityCode, data).then(res => {
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
			clearInput: function(event) { //显示清空按钮
				if (event.target.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon: function() { //清空账号
				this.user.account = '';
				this.showClearIcon = false;
			},
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			gospdpopup() {
				this.spdpopup = true;
			},
			backpdpopup() {
				this.spdpopup = false;
			},
      /*切换语言*/
			langListAn(lang,index) {			
				this.spdpopup = false;
        this.language = lang.name;
        switch (lang.value){
          case 'zh-cn':
            this.$i18n.locale = 'zh-cn';
            this.$catchs.put('lang','zh-cn');
            break;
          case 'en-us':
            this.$i18n.locale = 'en-us';
            this.$catchs.put('lang','en-us');
            break;
        }
			}
     /*切换语言*/ 
		}
	}
</script>

<style>
	@import url("login.css");
</style>
