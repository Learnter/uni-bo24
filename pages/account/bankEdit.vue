<template>
	<view class="apbindaBox">
		<view class="apbindaCont">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.name}}</view>
					<view class="with-fun bindiiut">
						<input class="uni-input" v-model="bankInfo.bank_name" :placeholder="holder.cardName" placeholder-style="color:#888888;" focus="true"/>
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
						<input class="uni-input" v-model="bankInfo.opening_id" disabled placeholder-style="color:#888888;" />
					</view>
				</view>
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.branch}}</view>
					<view class="with-fun bindiiut">
						<input class="uni-input" v-model="bankInfo.bank_address" :placeholder="holder.branch" placeholder-style="color:#888888;" />
					</view>
				</view>
				<view class="uni-form-item">
          <view class="uni-list-cell-db">{{i18n.selected}}</view>
          <switch style="transform:scale(0.7)" :checked="bankInfo.bank_default"  @change="switchChange" />
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
          bank_address:'',//银行分支
          id:'',//银行卡id
          bank_default:'' //是否为默认银行卡
        },
        bankConfig:{
          id:'',
        }
			}
		},
    computed:{
      i18n(){
        return this.$t('bankEdit');
      },
      holder(){
        return this.$t('holder');
      }
    },
    onLoad(option){
      uni.setNavigationBarTitle({
        title:this.$t('navText').bankEdit
      })
      this.bankConfig.id = option.b_id;
      this.fetchBankArray();
    },
		methods: {
      fetchBankArray(){ //获取银行数量
        this.$request.get(this.$KPI.receipt.bankMsg,this.bankConfig).then( res => {
          // console.log(res);
          if(res.code === 200 && res.data && res.data.length !== 0){
              if(res.data.info && res.data.info !== {}){
                this.bankInfo = res.data.info;
              }
          }else{
              uni.showToast({
                icon:'none',
                title:res.msg
              })
           }
        })
      },
      switchChange(e){ //切换默认
        this.bankInfo.bank_default = e.detail.value;
      },
      formSubmit(){ //修改银行卡
        this.bankInfo.id =  this.bankConfig.id; //赋值银行卡id;
        this.$request.post(this.$KPI.receipt.editBankCard,this.bankInfo).then(res => {
          // console.log(res);
          if(res.code === 200){
            uni.showToast({
              icon:'loading',
              title:this.$t('warn').submitSuccess,
              duration:1000
            })
            setTimeout(()=>{
               uni.navigateBack();
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
