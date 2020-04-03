<template>
	<view class="shuruknzdBox">
		<form @submit="formSubmit">		
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.tradePwd}}：</view>
				<view class="with-fun qxloninput">
					<input type="password" v-model="upData.secpwd" class="uni-input" :placeholder="holder.set_t_pwd" placeholder-style="color:#C4D8D8;" />				
				</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.comfirmPwd}}：</view>
				<view class="with-fun qxloninput">
					<input :password="showPassword" v-model="upData.resecpwd" class="uni-input" :placeholder="holder.confirmPwd" placeholder-style="color:#C4D8D8;" />		
          <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
				</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.v_code}}：</view>
				<view class="with-fun qxloninput">
					<input class="uni-input" v-model="upData.mobileCode" :placeholder="holder.securityCode" placeholder-style="color:#C4D8D8;" />
					<!-- <button class="huoqyam">获取验证码</button> -->
          <button type="primary" class="huoqyam" @click="fetchMobleCode" v-if="validDuration">{{i18n.timeOut+'('+timeOut+')s'}}</button>
          <button type="primary" class="huoqyam" @click="fetchMobleCode" v-else>{{i18n.testGetCode}}</button>
				</view>
			</view>
			<view class="btn-area whlogbtnBox">
				<button formType="submit" class="whlogbtn">{{i18n.submit}}</button>
			</view>
		</form>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
        showPassword: true,
				userPhone:'',
	      upData:{
	        secpwd:'',
	        resecpwd:'',
	        mobileCode:''
	      },
	      timeOut:60,//短信验证码过期时间
	      validDuration:false,//短信发送时间
	      clearTimer:null,//定时器
			}
		},
    computed:{
      i18n(){
        return this.$t('savesecpwd');
      },
      holder(){
        return this.$t('holder');
      }
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').s_tradePwd
      })
    },
		onReady() {
		 this.fetchPhoneNum();
		},
		methods: {		
			fetchPhoneNum(){ //获取手机号
	      this.$request.get(this.$KPI.person.allInfo).then(res => {
	       if(res.code === 200 && res.data){
	          if(res.data.account){
	            this.userPhone = res.data.account;
	          }
	        }else{
	          uni.showToast({
	            icon:'none',
	            title:res.msg
	          })
	        }
	      })
	    },
	    formSubmit(){ //修改密码
	      // let {secpwd,resecpwd,mobileCode} = this.upData;
	      //  if(secpwd.trim().length === 0){
	      //    uni.showToast({
	      //      icon:'none',
	      //      title:'请输入交易密码'
	      //    })
	      //    return false;
	      //  }else if(resecpwd.trim().length === 0){
	      //    uni.showToast({
	      //      icon:'none',
	      //      title:'请确认交易密码'
	      //    })
	      //    return false;
	      //  }else if(secpwd !== resecpwd){
	      //      uni.showToast({
	      //        icon:'none',
	      //        title:'两次密码输入不一致'
	      //      })
	      //      return false;
	      //  }else if(mobileCode.trim().length === 0){
	      //    uni.showToast({
	      //      icon:'none',
	      //      title:'请输入手机验证码'
	      //    })
	      //    return false; 
	      //  }
	    this.$request.post(this.$KPI.alter.upExchangePwd,this.upData).then( res => {
	        if(res.code === 200){
	          uni.showToast({
	            icon:'loading',
	            title:this.$t('warn').submitSuccess
	          })
	          setTimeout(()=>{
	            uni.switchTab({
	              url:"/pages/index/setup"
	            })
	          },1500)
	        }else{
	          uni.showToast({
	            icon:'none',
	            title:res.msg
	          })
	        }
	     })   
	    },
	    fetchMobleCode(){ //获取短信验证码
	        let phone = this.userPhone;
	      //   if(phone.trim().length > 0){ //手机号码验证
	      //    if(!(/^1[3456789]\d{9}$/.test(phone))){
	      //      uni.showToast({
	      //        icon:"none",
	      //        title:"手机号码无效,请联系管理员!"
	      //      })
	      //      return false;
	      //    }
	      // }else{
	      //    uni.showToast({
	      //     icon:"none",
	      //     title:"获取不到手机号,请联系管理员!"
	      //   })
	      //   return false;
	      // }
	      if(this.validDuration){ //短信发送期间防止重复获取
	        uni.showToast({
	          icon:"none",
	          title:this.$t('warn').loopTip
	        })
	        return false;
	      }
	      let data = {
	        mobile:phone,
	        type:4
	      }
	      this.$request.post(this.$KPI.common.securityCode,data).then( res => {
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
      changePassword: function() {
      	this.showPassword = !this.showPassword;
      },
		},
	  destroyed(){ //清除定时器
	    clearInterval(this.clearTimer);
	  }
	}
</script>

<style>
	page {
		background: #158DFF;
	}
</style>
