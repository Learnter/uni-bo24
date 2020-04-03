<template>
	<view class="apbindaBox">
		<view class="apbindaCont">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.name}}</view>
					<view class="with-fun bindiiut">
						<input class="uni-input" v-model="bankInfo.bank_name" :placeholder="holder.cardName" placeholder-style="color:#888888;" />
					</view>
				</view>
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.account}}</view>
					<view class="with-fun bindiiut">
						<input class="uni-input" v-model="bankInfo.bank_account" :placeholder="holder.bankAccount" placeholder-style="color:#888888;" />
					</view>
				</view>
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.bank}}</view>
					<view class="with-fun bindiiut">
						<picker @change="bindPickerChange" :value="index" :range="bankArray" range-key="name_cn" style="width: 100%;">
							<view class="uni-input">{{bankArray[index].name_cn}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.branch}}</view>
					<view class="with-fun bindiiut">
						<input class="uni-input" v-model="bankInfo.bank_address" :placeholder="holder.branch" placeholder-style="color:#888888;" />
					</view>
				</view>
				
				<view class="btn-area confirBtnBox">
					<button formType="submit" class="confirBtn">{{i18n.submit}}</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        bankInfo:{
          bank_name:'', //户主
          bank_account:'',//银行账号
          opening_id:'',//开户银行
          bank_address:''//银行分支
        },
				bankArray:[{name_cn:'',id:''}],//银行列表
				index: 0,
			}
		},
    computed:{
      i18n(){
        return this.$t('bankadd');
      },
      holder(){
        return this.$t('holder');
      }
    },
    onLoad(){
      uni.setNavigationBarTitle({
        title:this.$t('navText').bankAdd
      })
      this.fetchBankArray();
    },
		methods: {
      fetchBankArray(){ //获取银行数量
        this.$request.get(this.$KPI.receipt.bankMsg).then( res => {
          // console.log(res);
          if(res.code === 200 && res.data && res.data.length !== 0){
            this.bankArray = res.data;
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
			// 开户银行 s
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
      formSubmit(){ //添加银行卡
        this.bankInfo.opening_id = this.bankArray[this.index].id;
        this.$request.post(this.$KPI.receipt.addBankCard,this.bankInfo).then(res => {
          if(res.code === 200){
            uni.showToast({
              icon:'loading',
              title:this.$t('warn').addSuccess
            })
            setTimeout(()=>{
               uni.navigateBack({
                 animationType:"fade-out",
                 animationDuration:800
               });
            },1500)
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        });
      }
		}
	}
</script>

<style>
	@import url("bindcss.css");
</style>
