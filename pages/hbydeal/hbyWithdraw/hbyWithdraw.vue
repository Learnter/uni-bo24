<template>
	<view class="shuruknzdBox">
		<form @submit="formSubmit" >	
      <view class="uni-form-item uni-column qxloninputBox">
      	<view class="qxloninpt withdraw">{{hbyInfo.userBlock}} HBY</view>
      	<view class="qxloninput withdraw2">≈￥{{hbyInfo.userBlockCny}}</view>
      </view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.count}}：</view>
				<view class="with-fun qxloninput">
					<input type="text" class="uni-input" v-model="reConfig.carry_add_num" :placeholder="holder.extractNum" placeholder-style="color:#C4D8D8;" />				
				</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.address}}：</view>
				<view class="with-fun qxloninput">
					<input class="uni-input" disabled="true" v-model="reConfig.address" :placeholder="holder.b_wallet_address"  placeholder-style="color:#C4D8D8;" />				
				</view>
			</view>
      <view class="uni-form-item uni-column qxloninputBox">
      	<view class="qxloninptl">{{i18n.tradePwd}}：</view>
      	<view class="with-fun qxloninput">
      		<input  class="uni-input" :password="showPassword" v-model="reConfig.secpwd" :placeholder="holder.dealPwd"  placeholder-style="color:#C4D8D8;" />
          <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
      	</view>
      </view>
      <view class="uni-form-item uni-column qxloninputBox">
      	<view class="qxloninptl">{{i18n.verify_code}}：</view>
      	<view class="with-fun qxloninput">
      		<input class="uni-input" placeholder-class="uni-ellipsis" :placeholder="holder.graphCode" placeholder-style="color:#C4D8D8;" v-model="reConfig.verify_code"/>
      		<image :src="graphImg" class="yzm" @tap="fetchGraphCode"></image>				
      	</view>
      </view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.mobile_code}}：</view>
				<view class="with-fun qxloninput">
					<input class="uni-input" v-model="reConfig.mobileCode" :placeholder="holder.securityCode" placeholder-style="color:#C4D8D8;" />
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
        showPassword:true,//显示密码
        graphImg:'', //图形验证码图片
				hbyInfo:{//hby钱包信息
          userBlock:0,
          userBlockCny:0,
          hby_address:''
        },
        reConfig:{ //提交请求参数
          carry_add_num:'',
          address:'',
          secpwd:'',
          verify_code:'',
          mobileCode:''
        },
        userAccount:'',//用户手机号或邮箱号
        timeOut:0,//短信验证码过期时间
        validDuration:false,//短信发送时间
        clearTimer:null,//定时器
			}
		},
    computed:{
      i18n(){
        return this.$t('hbyWithdraw');
      },
      holder(){
        return this.$t('holder');
      }
    },
    onLoad(){
       uni.setNavigationBarTitle({
         title:this.$t('navText').hwithdraw
       })
    },
    onReady() {
      this.fetchShowCode();
      this.fetchPersonInfo();
      this.fetchHbyInfo();
      this.fetchGraphCode();
    },
		methods: {	
      /*获取手机、邮箱验证码过期时间*/
      fetchShowCode() {
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
      /*获取手机、邮箱验证码过期时间*/
      
      /*获取个人资料*/
      fetchPersonInfo(){
        this.$request.get(this.$KPI.person.ownerInfo).then(res => {
          if(res.code === 200){
             if(res.data && Object.keys(res.data).length !== 0){
               this.userAccount = res.data.user_info.account;
             }
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      /*获取个人资料*/
      
      /*获取图形验证码*/
      fetchGraphCode(){ 
        this.$request.get(this.$KPI.common.graphCode,{type:'block_carry'}).then( res => {
           this.graphImg = res;
        })
      },
      /*获取图形验证码*/
      
      /*获取HBY钱包信息*/
      fetchHbyInfo(){
        
        uni.showLoading({
          title: this.$t('warn').load,
          mask: true
        })
        
        this.$request.get(this.$KPI.HbyDeal.withdrawInfo).then( res => {
           if(res.code === 200){
              if(res.data && Object.keys(res.data).length !== 0){
                this.hbyInfo = res.data;
                this.reConfig.address = res.data.hby_address;
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
      /*获取HBY钱包信息*/
      
      /*获取短信验证码*/
      fetchMobleCode(){
        let {verify_code} = this.reConfig;
        if(verify_code.trim().length === 0){
          uni.showToast({
            icon:'none',
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
        let data = {
          mobile:this.userAccount,
          type:1,
          verify_code:verify_code,
          check_code:'block_carry'
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
                 this.fetchShowCode();
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
            this.fetchGraphCode();
          }
        })
      },
      /*获取短信验证码*/
      
      /*获取HBY钱包信息*/
      formSubmit(){ 
        let {carry_add_num,address,secpwd,mobileCode} = this.reConfig;
         if(carry_add_num.trim().length === 0){
           uni.showToast({
             icon:'none',
             title:this.$t('warn').extractEmpty
           })
           return false;
         }else if(address.trim().length === 0){
           uni.showToast({
             icon:'none',
             title:this.$t('warn').walletAddressEmpty
           })
           return false;
         }else if(secpwd.trim().length === 0){
           uni.showToast({
             icon:'none',
             title:this.$t('warn').dealPwdEmpty
           })
           return false;
         }else if(mobileCode.trim().length === 0){
           uni.showToast({
             icon:'none',
             title:this.$t('warn').securityCodeEmpty
           })
           return false; 
         }
        this.$request.post(this.$KPI.HbyDeal.withdrawSubmit,this.reConfig).then(res => {
           if(res.code === 200){
             uni.showToast({
               icon:'loading',
               title:this.$t('warn').extractSuccess
             })
             this.validDuration = false;
             this.reConfig = {};
             this.fetchHbyInfo();
           }else{
             uni.showToast({
               icon:'none',
               title:res.msg
             })
           }
        })
      },
      changePassword: function() {
      	this.showPassword = !this.showPassword;
      },
		},
    onNavigationBarButtonTap(){
        uni.navigateTo({
        	url: '/pages/hbydeal/hbyWithdraw/hbyWithdrawLogs'
        });
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
  .withdraw{
    text-align:center;
    padding:20rpx 0;
    font-size:40rpx;
    color:#FFFFFF;
  } 
  .withdraw2{
    text-align:center;
    padding-bottom:20rpx;
    color: seashell;
  }
</style>
