<template>
	<view class="shuruknzdBox">
		<form @submit="formSubmit" >		
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.usdt_address}}：</view>
				<view class="with-fun qxloninput">
					<input type="text" class="uni-input" v-model="usdtInfo.usdt_address" :placeholder="holder.usdt_address" placeholder-style="color:#C4D8D8;" />				
				</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.tradePwd}}：</view>
				<view class="with-fun qxloninput">
					<input :password="showPassword" class="uni-input" v-model="usdtInfo.secpwd" :placeholder="holder.dealPwd" placeholder-style="color:#C4D8D8;" />				
          <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
				</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.v_code}}：</view>
				<view class="with-fun qxloninput">
					<input class="uni-input" v-model="usdtInfo.mobileCode" :placeholder="holder.securityCode" placeholder-style="color:#C4D8D8;" />
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
        showPassword:true,
				usdtInfo:{
          usdt_address:'',
          secpwd:'',
          mobileCode:''
        },
        userPhone:'',//用户手机号
        timeOut:60,//短信验证码过期时间
        validDuration:false,//短信发送时间
        clearTimer:null,//定时器
			}
		},
    computed:{
      i18n(){
        return this.$t('address');
      },
      holder(){
        return this.$t('holder');
      }
    },
    onLoad(){
      uni.setNavigationBarTitle({
        title:this.$t('navText').a_manage_usdt
      })
    },
    onReady() {
      this.fetchUsdtInfo();
    },
		methods: {		
			fetchUsdtInfo(){
        this.$request.get(this.$KPI.USDT.convert,{type:4}).then(res => {
          if(res.code === 200 && res.data && res.data !== {}){
            // console.log(res.data);
            this.usdtInfo.usdt_address = res.data.usdt_address;
            this.userPhone = res.data.mobile;
          }
        })
      },
			formSubmit(){ //绑定提交
        // let {usdt_address,secpwd,mobileCode} = this.usdtInfo;
        //  if(usdt_address.trim().length === 0){
        //    uni.showToast({
        //      icon:'none',
        //      title:'请输入USDT地址'
        //    })
        //    return false;
        //  }else if(secpwd.trim().length === 0){
        //    uni.showToast({
        //      icon:'none',
        //      title:'请输入交易密码'
        //    })
        //    return false;
        //  }else if(mobileCode.trim().length === 0){
        //    uni.showToast({
        //      icon:'none',
        //      title:'请输入手机验证码'
        //    })
        //    return false; 
        //  }
        this.$request.post(this.$KPI.USDT.bind,this.usdtInfo).then(res => {
           if(res.code === 200){
             uni.showToast({
               icon:'loading',
               title:this.$t('warn').submitSuccess,
             })
             this.usdtInfo = {};
             this.validDuration = false;
             this.timeOut = 60;
             clearInterval(this.clearTimer);
             this.fetchUsdtInfo();
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
      changePassword() {
      	this.showPassword = !this.showPassword;
      }
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
