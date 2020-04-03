<template>
	<view class="apbindaBox">
		<view class="apbindaCont">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.weChatAccount}}</view>
					<view class="with-fun bindiiut">
						<input class="uni-input" v-model="wx_name" :placeholder="holder.weChatAccount" placeholder-style="color:#888888;" />
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
          reviewSrc:'',
          wx_code:'',
          wx_name:''
			}
		},
    computed:{
      i18n(){
        return this.$t('bindwechat');
      },
      holder(){
        return this.$t('holder');
      }
    },
    onLoad(){
      uni.setNavigationBarTitle({
        title:this.$t('navText').b_weChat
      })
      this.fetchAliInfo();
    },
		methods: {
    fetchAliInfo(){ //获取微信数据
      this.$request.get(this.$KPI.receipt.methods,{type:'2'}).then( res => {
        if(res.code === 200 && res.data && res.data !== {}){
           // console.log(res);
           if(res.data.wx_name){
             this.wx_name = res.data.wx_name;
           }
           if(res.data.wx_code){
             this.reviewSrc = res.data.wx_code;
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
             this.$request.upload(this.$KPI.common.upFile,res.tempFilePaths[0],'wx_code',{
               'field':'wx_code'
             }).then( res =>{
               if(res.code === 200 && res.data && res.data !== {}){
                  this.reviewSrc = res.data.show_src;
                  this.wx_code = res.data.src;
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
      if(this.wx_name.trim().length === 0){
        uni.showToast({
          icon:'none',
          title:this.$t('warn').emptyWeAccount
        })
        return false;
      }else if(this.wx_code.trim().length === 0){
        uni.showToast({
          icon:'none',
          title:this.$t('warn').emptyQr
        })
        return false;
      }
      let wxAcount = {
        wx_name:this.wx_name,
        wx_code:this.wx_code
      }
      this.$request.post(this.$KPI.receipt.wechat,wxAcount).then( res => {
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
			//微信二维码保存指南
			onNavigationBarButtonTap(e) {
				uni.navigateTo({
					url: '/pages/account/bindwechatdata'
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
