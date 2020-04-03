<template>
	<view class="shuruknzdBox">
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{moneyInfo.name}}</view>
				<view class="with-fun qxloninput">
					<input class="uni-input" v-model="moneyInfo.money" placeholder="" disabled="true" placeholder-style="color:#C4D8D8;" />
				</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.account}}</view>
				<view class="with-fun qxloninput">
					<input class="uni-input" :placeholder="i18n.accountHolder" :value="acount" disabled="true" placeholder-style="color:#C4D8D8;" />				
				</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.uId}}</view>
				<view class="with-fun qxloninput">
					<input class="uni-input" :placeholder="i18n.uIdHolder" v-model="transferObj.to_uid" disabled="true"  placeholder-style="color:#C4D8D8;" />				
				</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.transferNumber}}</view>
				<view class="with-fun qxloninput">
					<input class="uni-input" :placeholder="i18n.transferHolder" v-model="transferObj.toNum"  placeholder-style="color:#C4D8D8;" />				
				</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.tradePwd}}</view>
				<view class="with-fun qxloninput">
					<input type="password" class="uni-input" :placeholder="i18n.tradePwdHolder" v-model="transferObj.secpwd"  placeholder-style="color:#C4D8D8;" />				
				</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.verify_code}}</view>
				<view class="with-fun qxloninput">
					<input class="uni-input" :placeholder="i18n.verifyCodeHolder"  v-model="transferObj.verify_code" placeholder-style="color:#C4D8D8;" />
					<image :src="graphImg" class="yzm" @tap="fetchGraphCode"></image>
				</view>
			</view>
			<view class="btn-area whlogbtnBox">
				<button formType="submit" class="whlogbtn">{{i18n.submit}}</button>
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
				graphImg:null,
        moneyInfo:{},
        transferObj:{ //转账对象
          bid:1,
          toNum:'',
          toAccount:'',
          to_uid:'',
          secpwd:'',
          verify_code:'' 
        }
			}
		},
    computed:{
      i18n(){
        return this.$t('huobiTransfer');
      },
      /*账号局部显示*/
      acount(){
        return this.transferObj.toAccount.substr(0,3)+"*****"+this.transferObj.toAccount.substr(8);
      }
    },
    onLoad(option){
       uni.setNavigationBarTitle({
           title:this.$t('navText').hbyScanTransfer
       }) 
       if(option.payeeInfo){
         let {account,user_id,money} = JSON.parse(option.payeeInfo);
         this.transferObj.toAccount = account.toString();
         this.transferObj.to_uid = user_id.toString();
         this.transferObj.toNum = money.toString();
       }
    },
		onReady(){
      this.fetchGraphCode();
      this.fetchMoney();
    },
		methods: {		
       fetchGraphCode(){ //获取验证码
         this.$request.get(this.$KPI.common.graphCode,{type:'change_money'}).then( res => {
           this.graphImg = res;
         })
       },
       fetchMoney(){ //获取钱包信息
           uni.showLoading({
             title: this.$t('warn').load,
             mask: true
           })
          this.$request.get(this.$KPI.transfer.wallet,{type:2}).then( res => {
            if(res.code === 200 && res.data && res.data !== {}){
                this.moneyInfo = res.data;
             }
            setTimeout(()=>{
              uni.hideLoading();
            },1000) 
          })
       },
       formSubmit(){ //提交转账
         let {toNum,toAccount,to_uid,secpwd,verify_code} = this.transferObj;
         if(toAccount.trim().length === 0){
           uni.showToast({
             icon:"none",
             title:this.$t('warn').accountEmpty
           })
           return false;
         }else if(to_uid.trim().length === 0){
           uni.showToast({
             icon:"none",
              title:this.$t('warn').emptyUID
           })
           return false;
         }else if(toNum.trim().length === 0){
           uni.showToast({
             icon:"none",
             title:this.$t('warn').emptyNumber
           })
           return false;
         }else if(secpwd.trim().length === 0){
           uni.showToast({
             icon:"none",
             title:this.$t('warn').passwordEmpty
           })
           return false;
         }else if(verify_code.trim().length === 0){
           uni.showToast({
             icon:"none",
             title:this.$t('warn').graphCodeEmpty
           })
           return false;
         }
         this.transferObj.bid = 1;
         this.$request.post(this.$KPI.transfer.hbyTransfer,this.transferObj).then( res => {
           if(res.code === 200){
              uni.showToast({
                icon:'success',
                title: this.$t('warn').transfterSuccess
              });
               /*清空输入框,重新获取新数据*/
                this.transferObj = {};
                this.fetchGraphCode();
                this.fetchMoney();
              /*清空输入框,重新获取新数据*/
            }else{
              uni.showToast({
                icon:'none',
                title:res.msg
              })
            }
         })
    },	
	},
	// 转账日志
	onNavigationBarButtonTap(e) {
		uni.navigateTo({
			url: '/pages/transferzz/huobiTransfer/huobiTransferLog/huobiTransferLog'
		});
	}
}
</script>

<style>
	page {
		background: #158DFF;
	}
</style>
