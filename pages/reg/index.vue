<template>
	<view>
		<form @submit="formSubmit">
			<view class="whlonBox">
				<view class="whlontitle">{{i18n.title}}</view>
				<view class="qxlontitlems">{{i18n.titleDetail}}</view>			
				<view class="uni-form-item uni-column qxloninputBox">
					<view class="with-fun qxloninput">
						<input class="uni-input" :placeholder="i18n.referral" placeholder-style="color:#C4D8D8;"  v-model="regConfig.reg_code"/>						
					</view>
				</view>	
				<view class="uni-form-item uni-column qxloninputBox">
					<view class="with-fun qxloninput">
						<input class="uni-input" placeholder-class="uni-ellipsis" :placeholder="i18n.account" placeholder-style="color:#C4D8D8;" v-model="regConfig.account" @input="clearInput"  @blur="phoneOrEmail"/>
						<view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
					</view>
				</view>
        <block v-if="!isEmail">
          <view class="uni-form-item uni-column qxloninputBox" >
          	<view class="with-fun qxloninput">
          		<input class="uni-input" placeholder-class="uni-ellipsis"  :placeholder="i18n.name" placeholder-style="color:#C4D8D8;" v-model="regConfig.username" />		
          	</view>
          </view>
          <view class="uni-form-item uni-column qxloninputBox">
          	<view class="with-fun qxloninput">
          		<input class="uni-input" type="idcard"  :placeholder="i18n.ID"  placeholder-style="color:#C4D8D8;" v-model="regConfig.card_number" />
          	</view>
          </view>
        </block>
				
				<view class="uni-form-item uni-column qxloninputBox">				
					<view class="with-fun qxloninput">
						<input class="uni-input" :password="showPassword" :placeholder="i18n.loginPwd" placeholder-style="color:#C4D8D8;"  v-model="regConfig.password"/>
						<view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
					</view>
				</view>
				<view class="uni-form-item uni-column qxloninputBox">				
					<view class="with-fun qxloninput">
            <input class="uni-input" :password="showSecpwd" :placeholder="i18n.transactionPwd" placeholder-style="color:#C4D8D8;"  v-model="regConfig.secpwd"/>
            <view class="uni-icon uni-icon-eye" :class="[!showSecpwd ? 'uni-active' : '']" @click="changeSecpwd"></view>
					</view>
				</view>		
        <view class="uni-form-item uni-column qxloninputBox" v-show="isShowVerifyCode || isShowMobileCode">
        	<view class="with-fun qxloninput">
        		<input class="uni-input" placeholder-class="uni-ellipsis"  :placeholder="i18n.verify_code" placeholder-style="color:#C4D8D8;" v-model="regConfig.verify_code"/>
        		<image :src="graphImg" class="yzm" @tap="fetchGraphCode"></image>
        	</view>
        </view>
        <view class="uni-form-item uni-column qxloninputBox" v-show="isShowMobileCode" >
        	<view class="with-fun qxloninput">
        		<input class="uni-input" placeholder-class="uni-ellipsis" :placeholder="i18n.mobile_code" placeholder-style="color:#C4D8D8;"  v-model="regConfig.mobileCode"/>
            <button type="primary" class="textyzm" @click="fetchMobleCode" v-if="validDuration">{{i18n.timeOut+'('+timeOut+')s'}}</button>
            <button type="primary" class="textyzm" @click="fetchMobleCode" v-else>{{i18n.testGetCode}}</button>
        	</view> 
        </view>
				<view class="uni-flex zaucexyi">
					<view>
            <checkbox-group>
               <label><checkbox value="cb" checked/>{{i18n.read}}</label>
             </checkbox-group>   
          </view>
					<navigator url="agreement" class="fx1 zaucexlink">【{{i18n.protocol}}】</navigator>
				</view>
				<view class="btn-area whlogbtnBox">
					<button formType="submit" class="whlogbtn">{{i18n.register}}</button>
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
        isEmail:false,//邮箱注册
        regConfig:{ //注册
          reg_code:'',//推荐码
          account:'',//账号
          username:'',//真实姓名
          card_number:'',//身份证
          password:'',//登录密码
          secpwd:'',//交易密码
          verify_code:'',//图形验证码
          mobileCode:'' //短信验证码
        },
        timeOut:0,//短信验证码过期时间
        validDuration:false,//短信发送时间
        clearTimer:null,//定时器
        isShowVerifyCode:false, //是否显示图形验证码框
        isShowMobileCode:false, //是否显示短信验证码框
        graphImg:'',//验证码图片
				showClearIcon: false, //清空图标
        showPassword: true,//密码是否明文
        showSecpwd:true //交易密码是否明文
			}
		},
    computed:{
     i18n(){
       return this.$t('reg');
     }
    },
		onLoad(option) {
      if(window.location){ //获取注册邀请码
       if(window.location.href.split("=")[1]){
         this.regConfig.reg_code = window.location.href.split("=")[1] ;
        } 
      }
		},
    onReady(){
      this.fetchShowCode();
      this.fetchGraphCode();
    },
		methods: {
       fetchShowCode(){ //获取图形、短信验证码开关
         this.$request.get(this.$KPI.common.Info).then( res => {
             // console.log(res);
           if(res.code === 200){
              if(res.data && Object.keys(res.data).length !== 0){
                 this.isShowVerifyCode = res.data.verif_code;
                 this.isShowMobileCode = res.data.register_sms_switch;
                 this.timeOut = res.data.send_sms_time_out;
              }
           }else{
               uni.showToast({
               icon:"none",
               title:res.msg
             })
           }
         })
       },
       authentication(){ //注册验证
       
          let {reg_code,account,username,card_number,password,secpwd,verify_code,mobileCode} = this.regConfig; 
            
//            推荐码验证*/ 
//            if(reg_code.trim().length > 0){ //推荐码验证
//               if(!(/^[0-9A-Za-z]{6,}$/.test(reg_code))){
//                 uni.showToast({
//                   icon:"none",
//                   title:"推荐码长度最少为6位"
//                 })
//                 return false;
//               }
//            }else{
//               uni.showToast({
//                icon:"none",
//                title:this.$t('warn').referralCodeEmpty
//              })
//              return false;
//            }
//           /*推荐码验证*/  
//            
//           /*注册账号验证*/ 
//           if(account.trim().length > 0){ //手机号码、邮箱账号验证
//              if(!(/^1[3456789]\d{9}$/.test(account)) && !(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(account))){
//                uni.showToast({
//                  icon:"none",
//                  title:"请输入正确的手机或邮箱账号"
//                })
//                return false;
//              }
//           }else{
//              uni.showToast({
//               icon:"none",
//               title:this.$t('warn').accountEmpty
//             })
//             return false;
//           }
//          /*注册账号验证*/  
//         
//          /*用户名非空验证*/
//          if(username.trim().length === 0){ //用户名非空验证
//             uni.showToast({
//               icon:"none",
//               title:this.$t('warn').nameEmpty
//             })
//             return false;
//          }
//         /*用户名非空验证*/ 
//          
//          /*身份证号码验证,邮箱注册不需要验证身份证信息*/
//          if(!this.isEmail){
//            if(card_number.trim().length > 0){  //身份证号码验证
//              var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
//              if(!regIdCard.test(card_number)){
//                 uni.showToast({
//                  icon:"none",
//                  title:"请输入有效的身份证号码!"
//                })
//                return false;
//              }
//              
//            }else{
//               uni.showToast({
//                icon:"none",
//                title:this.$t('warn').idCard
//              })
//              return false;
//            }
//           }
//         /*身份证号码验证,邮箱注册不需要验证身份证信息*/  
// 
//         /*登录验证码判断*/
//          if(password.trim().length > 0){
//             if(!(/^[0-9A-Za-z]{6,}$/.test(password))){
//               uni.showToast({
//                 icon:"none",
//                 title:"密码长度最少6位!"
//               })
//               return false;
//             }
//          }else{
//             uni.showToast({
//              icon:"none",
//              title:this.$t('warn').passwordEmpty
//            })
//            return false;
//          }
//         /*登录验证码判断*/ 
//          
//         /*二级密码验证 */ 
//           if(secpwd.trim().length > 0){  
//             if(!(/^[0-9A-Za-z]{6,}$/.test(secpwd))){
//               uni.showToast({
//                 icon:"none",
//                 title:"二级密码长度最少6位!"
//               })
//               return false;
//             }
//          }else{
//             uni.showToast({
//              icon:"none",
//              title:this.$t('warn').secondPwdEmpty
//            })
//            return false;
//          }
//          /*二级密码验证 */ 
//          
//          /*图形验证码验证*/
//          if(this.isShowVerifyCode || this.isShowMobileCode){
//             if(verify_code.trim().length > 0){  //验证图形码
//                if(!(/^[0-9A-Za-z]{4}$/.test(verify_code))){
//                  uni.showToast({
//                    icon:"none",
//                    title:"验证码为4位数字、字母!"
//                  })
//                  return false;
//                }
//             }else{
//                uni.showToast({
//                 icon:"none",
//                 title:this.$t('warn').graphCodeEmpty
//               })
//               return false;
//             }
//          }
//         /*图形验证码验证*/
//          
//         /*短信验证码验证*/ 
//          if(this.isShowMobileCode){
//             if(mobileCode.trim().length > 0){  //验证短信码
//                if(!(/^[0-9A-Za-z]{4,}$/.test(mobileCode))){
//                  uni.showToast({
//                    icon:"none",
//                    title:"短信验证码为4-6位数字、字母!"
//                  })
//                  return false;
//                }
//             }else{
//                uni.showToast({
//                 icon:"none",
//                 title:this.$t('warn').securityCodeEmpty
//               })
//               return false;
//             }
//          }
//          /*短信验证码验证*/
         
        this.$request.post(this.$KPI.regiter.reg,this.regConfig).then( res => {
          if(res.code === 200){
             uni.showToast({
              icon:"none",
              title:this.$t('warn').register
            })
            setTimeout(()=>{
              uni.redirectTo({
                url:'/pages/login/login'
              });
            },1000)
          }else{
            uni.showToast({
              icon:"none",
              title:res.msg
            })
          }
        })    
      },
      fetchGraphCode(){ //获取图形验证码 
       this.$request.get(this.$KPI.common.graphCode,{type:'reg'}).then( res => {
          this.graphImg = res;
       })
     },
     fetchMobleCode(){ //获取短信或邮箱验证码
         
         let {account,verify_code} = this.regConfig;
         
         if(account.trim().length === 0){
             uni.showToast({
               icon:"none",
               title:this.$t('warn').accountEmpty
             })
            return false;
          }
          
          if(verify_code.trim().length === 0){
              uni.showToast({
                icon:"none",
                title:this.$t('warn').graphCodeEmpty
              })
             return false;
           }
           
           
          if(this.validDuration){ //短信发送期间防止重复获取
            uni.showToast({
              icon:"none",
              title:this.$t('warn').loopTip
            })
            return false;
          }
         
         /*手机号或邮箱注册*/
         let data = {};
         let reUrl = '';
         if(this.isEmail){
           reUrl = this.$KPI.common.emailCode;
           data = {email:account,verify_code:verify_code,check_code:'reg'};
         }else{
           reUrl = this.$KPI.common.securityCode;
           data = {mobile:account,type:1,verify_code:verify_code,check_code:'reg'};
         } 
        /*手机号或邮箱注册*/
      
       this.$request.post(reUrl,data).then( res => {
         if(res.code === 200){
           this.validDuration = true; 
           uni.showToast({
             icon:"none",
             title:this.$t('warn').sendTip
           })
           this.clearTimer = setInterval(()=>{
             if(this.timeOut === 0){
                this.validDuration = false;
                this.timeOut = 60;
                clearInterval(this.clearTimer);
             }else{
                this.timeOut--;
             }
           },1000);
         }else{
           uni.showToast({
             icon:"none",
             title:res.msg
           })
         }
       })
     },
     
     /*提交注册*/
     formSubmit(){
       this.authentication();
     },
    /*提交注册*/
    
     /*判断手机号注册还是邮箱注册*/
     phoneOrEmail(){
        let {account} = this.regConfig;
        
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
    /*判断手机号注册还是邮箱注册*/ 
			clearInput: function(event) {
				if (event.target.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon: function() {
				this.regConfig.account = '';
				this.showClearIcon = false;
			},
      changePassword: function() {
      	this.showPassword = !this.showPassword;
      },
      changeSecpwd: function() {
      	this.showSecpwd = !this.showSecpwd;
      },
		},
    destroyed(){
      clearInterval(this.clearTimer);
    }
	}
</script>

<style>
	@import url("index.css");
</style>
