<template>
	<view class="apbindaBox">
		<view class="apbindaCont">
			<form @submit="formSubmit">
				<view class="uni-flex">
					<view class="fx1 aywdbzBox">
						<view>可用HBY</view>
						<view class="uni-flex aywdbz">
							<view class="fx1">{{dealInfo.userBlock}}</view>
							<view>HBY</view>
						</view>
					</view>
					<view class="fx1">
						<view>HBY价格</view>
						<view class="uni-flex aywdbz">
							<view class="fx1">{{dealInfo.price}}</view>
							<view>元</view>
						</view>
					</view>
				</view>
				<view class="uni-form-item uni-column bindiiutBox">
					<view>卖出数量</view>
					<view class="with-fun bindiiut">
						<input v-model="reConfig.sell_num" class="uni-input" type="number" placeholder="输入卖出数量" placeholder-style="color:#888888;" />
					</view>
				</view>
				<view class="uni-form-item uni-column bindiiutBox">
					<view>交易密码</view>
					<view class="with-fun bindiiut">
						<input v-model="reConfig.secpwd" class="uni-input" type="password" placeholder="输入交易密码" placeholder-style="color:#888888;" />
					</view>
				</view>
				<view class="uni-flex skdgdtlBox">
					<view class="skdgdtl">收款方式：</view>
					<view class="fx1">
						<radio-group name="radio-group" @change="payMethod">
						<label><radio value="zfb" checked="true"/>支付宝</label>
						<label><radio value="wx" />微信</label>
						<label><radio value="bank" />银行卡</label>
						</radio-group>
					</view>
				</view>
				
				<view class="btn-area confirBtnBox">
					<button formType="submit" class="confirBtn">提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dealInfo:{},
		    reConfig:{
		      sell_num:'',
		      secpwd:'',
		      pay_info:['zfb']
		    }
			}
		},
		onLoad(){
		  this.fetchData();
		},
		methods: {
			fetchData(){
		    this.$request.get(this.$KPI.HbyDeal.balance).then(res => {
		      if(res.code === 200){
		        if(res.data && res.data != {}){
		          this.dealInfo = res.data;
		        }
		      }else{
		        uni.showToast({
		          icon:"none",
		          title:res.msg
		        })
		      }
		    })
		  },
		  payMethod(e){ //支付方式选择
		    this.reConfig.pay_info.pop();//先移除数组中数据
		    this.reConfig.pay_info.push(e.detail.value);//再将选择的方式添加入数组
		  },
		  formSubmit(){ //提交操作
		    let {sell_num,secpwd,pay_info} = this.reConfig;
		    if(sell_num.trim().length === 0){
		      uni.showToast({
		        icon:'none',
		        title:'请输入出售数量'
		      })
		      return false;
		    }else if(secpwd.trim().length === 0){
		      uni.showToast({
		        icon:'none',
		        title:'请输入交易密码'
		      })
		      return false;
		    }else if(pay_info.length === 0){
		      uni.showToast({
		        icon:'none',
		        title:'请选择购买支付方式'
		      })
		      return false;
		    }
		    this.$request.post(this.$KPI.HbyDeal.sell,this.reConfig).then(res => {
		      if(res.code === 200){
		         uni.showToast({
		           icon:"loading",
		           title:'出售成功'
		         })
		         setTimeout(()=>{
		           uni.redirectTo({
		             url:"/pages/hbydeal/hbyselllist"
		           })
		         },1000)
		      }else{
		        uni.showToast({
		          icon:'none',
		          title:res.msg
		        })
		      }
		    })
		  }
		},
		// HBY卖出记录
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/hbydeal/hbyselllist'
			});
		}
	}
</script>

<style>
	@import url("../account/bindcss.css");
	.skdgdtlBox {
		padding: 15rpx 0rpx;
	}
	.skdgdtl {
		margin-right: 14rpx;
	}
	.aywdbzBox {
		padding-right: 20rpx;
	}
	.aywdbz {
		background: #158DFF;
		padding: 15rpx;
		border-radius: 6rpx;
		color: #ffffff;
		margin: 15rpx 0rpx;
	}
	
</style>
