<template>
	<view class="apbindaBox">
		<view class="apbindaCont">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.alipayAccount}}</view>
					<view class="with-fun bindiiut">
						<input class="uni-input" v-model="zfb_name" :placeholder="holder.alipayAccount" placeholder-style="color:#888888;" />
					</view>
				</view>
				<view class="uni-flex">
					<view class="fx1 uploadCode">
						<view style="line-height:40rpx;">{{i18n.tips}}</view>
						<view class="binshcan" @click="openAlbum">
							<image src="/static/images/jiatu.png"></image>
						</view>
					</view>
					<view class="bindrewimg">
					  <image :src="reviewSrc"></image>
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
        reviewSrc:'', //图片的地址
        zfb_name:'', //支付宝账号
        zfb_code:'' //支付宝二维码
			}
		},
    computed:{
      i18n(){
        return this.$t('bindalipay');
      },
      holder(){
        return this.$t('holder');
      }
    },
    onLoad(){
     uni.setNavigationBarTitle({
       title:this.$t('navText').b_alipay
     })
    },
    onReady() {
      this.fetchAliInfo();
    },
		methods: {
      fetchAliInfo(){ //获取支付宝数据
        this.$request.get(this.$KPI.receipt.methods,{type:'1'}).then( res => {
          if(res.code === 200 && res.data && res.data !== {}){
             if(res.data.zfb_name){
               this.zfb_name = res.data.zfb_name;
             }
             if(res.data.zfb_code){
               this.reviewSrc = res.data.zfb_code;
             }
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      openAlbum(){ //打开相册
        uni.chooseImage({
            count:1,
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], //从相册选择
            success: (res)=> {
               this.$request.upload(this.$KPI.common.upFile,res.tempFilePaths[0],'zfb_code',{
                 'field':'zfb_code'
               }).then( res =>{
                 if(res.code === 200 && res.data && res.data !== {}){
                    this.reviewSrc = res.data.show_src;
                    this.zfb_code = res.data.src;
                  }else{
                    uni.showToast({
                      icon:"none",
                      title:res.msg
                    })
                  }
               })
            }
        });
      },
      formSubmit(){ //提交收款方式
        if(this.zfb_name.trim().length === 0){
          uni.showToast({
            icon:'none',
            title:this.$t('warn').emptyAliAccount
          })
          return false;
        }else if(this.zfb_code.trim().length === 0){
          uni.showToast({
            icon:'none',
            title:this.$t('warn').emptyQr
          })
          return false;
        }
        let aliAcount = {
          zfb_name:this.zfb_name,
          zfb_code:this.zfb_code
        }
        this.$request.post(this.$KPI.receipt.alipay,aliAcount).then( res => {
           if(res.code === 200){
             uni.showToast({
               icon:'loading',
               title:this.$t('warn').submitSuccess
             })
            this.fetchAliInfo();
           }else{
             uni.showToast({
               icon:"none",
               title:res.msg
             })
           }
        })
      },
			//支付宝二维码保存指南
			onNavigationBarButtonTap(e) {
				uni.navigateTo({
					url: '/pages/account/bindalipaydata'
				});
			}
		}
	}
</script>

<style>
	@import url("bindcss.css");
  .bindrewimg {
  	width: 300rpx;
    height:300rpx;
  	position: relative;
    border-radius:10rpx;
  	overflow: hidden;
    background:url('~@/static/images/shilierweima.png') no-repeat center;
    background-size: cover;
  }
</style>
