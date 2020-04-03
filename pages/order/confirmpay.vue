<template>
	<view class="confirBox">
		<view class="confirtopCt">
			<view class="nfirtopshu">￥{{orderInfo.order_amount}}</view>
			<view class="nfirtopbh">{{i18n.orderNum}}：{{orderInfo.master_order_sn}}</view>
			<view class="nfirtopsctm">{{i18n.time}}：{{orderInfo.add_time}}</view>
		</view>
		<view class="confirCont">
			<view class="confirtl">{{i18n.platform}}：</view>
			<form @submit="formSubmit">		
				<view class="section section_gap">					
					<radio-group name="radio-group" @change="selectedPay">
						<view class="uni-flex confirxuabox" v-for="(pItem,pIndex) in payAway" :key="pIndex">
							<view class="confirimg"><image :src="pItem.logo" mode="aspectFit"></image></view>
							<view class="fx1">
								<view class="zsshnbi">{{pItem.name}}</view>
								<view class="yueeeezs">
									<text class="text_1">{{i18n.balance}}：</text>
									<text class="text_2">{{pItem.money}}</text>
								</view>
							</view>
							<view class="zsshxzan"><label><radio checked="true" :value="pItem.pay_type" /></label></view>							
						</view>
						<!-- <view class="uni-flex confirxuabox">
							<view class="confirimg"><image src="../../static/images/zzz.png" mode="aspectFit"></image></view>
							<view class="fx1">
								<view class="zsshnbi">EHTC</view>
								<view class="yueeeezs">
									<text class="text_1">余额：</text>
									<text class="text_2">100.00</text>
								</view>
							</view>
							<view class="zsshxzan"><label><radio value="1" /></label></view>							
						</view>		 -->				
					</radio-group>
				</view>
				<view class="confirinpt">
					<input type="password" v-model="pwd" :placeholder="holder.dealPwd"/>
				</view>				
				<view class="btn-area confirBtnBox">
					<button formType="submit" class="confirBtn">{{common.comfirm}}</button>					
				</view>
			</form>
		</view>
	</view>
</template>
<script>
  export default{
    data(){
      return {
       parent:{
         order_id:'',
         order_sn:''
       },
       orderInfo:{}, //订单信息
       payAway:[], //支付方式
       pwd:'', //支付密码
       payType:1 //支付类型
      }
    },
    computed:{
      i18n(){
        return this.$t('confirmpay');
      },
      holder(){
       return this.$t('holder');
      },
      common(){
        return this.$t('common');
      }
    },
    onLoad(option){
      uni.setNavigationBarTitle({
        title:this.$t('navText').cf_payment
      })
      if(option.parentId){
         this.parent.order_id = option.parentId;
      }else{
         this.parent.order_sn = option.order_sn;
      }
    },
    onReady(){
      this.fetchOrderInfo();
    },
    methods:{
      fetchOrderInfo(){
        this.$request.get(this.$KPI.shops.orderPay,this.parent).then( res => {
          if(res.code === 200){
             if(res.data  &&  Object.keys(res.data).length !== 0){
                this.orderInfo = res.data.order_info
                this.payAway = res.data.pay_info;
             }      
          }else{
           uni.showToast({
             icon:'none',
             title:res.msg
           })
          }
        })
      },
      selectedPay(ev){ //选择支付方式
        this.payType = ev.detail.value;
      },
      formSubmit(){ //提交支付
        if(this.pwd.trim().length === 0){
          uni.showToast({
            icon:"none",
            title:this.$t('warn').dealPwdEmpty
          })
          return false;
        }
        let config = {
          order_id:this.parent.order_id,
          order_sn:this.parent.order_sn,
          pay_type:this.payType,
          secpwd:this.pwd
        }
        this.$request.post(this.$KPI.shops.payAction,config).then( res => {
           if(res.code === 200){
             uni.showToast({
              icon:"loading",
              title:this.$t('warn').tradeSuccess
             })
             setTimeout(function() {
               uni.redirectTo({
                 url:"/pages/shop/odform"
               });
             },1000);
           }else{
             uni.showToast({
               icon:"none",
               title:res.msg
             })
           }
        })
      }
    }
  }
</script>

<style>
	@import url("confirmpay.css");
</style>
