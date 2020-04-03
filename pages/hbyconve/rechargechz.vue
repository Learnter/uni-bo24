<template>
	<view class="shuruknzdBox">
		<form @submit="formSubmit">		
			<view class="conhbytopBox">
				<view class="conhbytopCont">
					<view class="uni-flex conhbytltBox">
						<view class="conhbytlt">{{rcInfo.hby_name}}</view>
						<view class="fx1 conhbytlzx"><image src="/static/images/2019a056_15.png" mode=""></image></view>
					</view>
					<view class="conhbyshu">{{rcInfo.hby_money}}</view>
					<view class="conusdttlt">{{rcInfo.cny_money}}</view>					
				</view>
				<image src="/static/images/a024laner_68.png" mode="aspectFit" class="conhbytbg"></image>
			</view>
			<view class="sshulvBox">
				<text class="text_1">{{i18n.rate}}：</text>
				<text class="text_2">{{rcInfo.hui_per}}</text>
			</view>
			
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.rc_count}}（USDT）：</view>
				<view class="with-fun qxloninput">
					<input type="digit" v-model="rcConfig.add_num" class="uni-input" :placeholder="holder.count" placeholder-style="color:#A5D6FA;" />				
				</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.toAddress}}：</view>
				<view class="qxlondizh">{{rcInfo.usdt_ru}}</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.outAddress}}：</view>
				<view class="qxlondizh">{{rcInfo.usdt_out}}</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.tradePwd}}：</view>
				<view class="with-fun qxloninput">
					<input type="password" v-model="rcConfig.secpwd" class="uni-input" :placeholder="holder.dealPwd" placeholder-style="color:#A5D6FA;" />				
				</view>
			</view>
			<view class="">
				<!-- 图片位置 s -->
				<!-- <view class="shctanzwei">
					<image src="../../static/images/ssp_1.png" mode=""></image>
				</view> -->
				<!-- 图片位置 e -->
				
				<!-- 上传按钮 s -->
				<view class="shctanzwei" @click="openAlbum">
          <image :src="reviewSrc" mode="" v-if="reviewSrc"></image>
					<image src="/static/images/jiatu.png" mode="" v-else></image>
				</view>
				<!-- 上传按钮 s -->
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
             reviewSrc:'',
			 rcInfo:{},
			 rcConfig:{
				  add_num:'',
				  secpwd:'',
				  img:''
				}
			}
		},
		computed:{
		  i18n(){
			return this.$t('rechargechz');
		  },
		  holder(){
			return this.$t('holder');
		  }
		},
		onLoad(){
		  uni.setNavigationBarTitle({
		  	title:this.$t('navText').rc_usdt
		  }) 
		},
		onReady() {
		  this.fetchDeInfo();
		},
		methods: {		
			fetchDeInfo(){
			  this.$request.get(this.$KPI.USDT.convert,{type:3}).then(res => {
			    if(res.code === 200 && res.data !== {}){
			      this.rcInfo = res.data;
			    }
			  })
			},
      openAlbum(){ //打开相册
        uni.chooseImage({
            count:1,
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], //从相册选择
            success: (res)=> {
               this.$request.upload(this.$KPI.common.upFile,res.tempFilePaths[0],'img',{
                 'field':'img'
               }).then( res =>{
                 if(res.code === 200 && res.data && res.data !== {}){
                    this.reviewSrc = res.data.show_src;
                    this.rcConfig.img = res.data.src;
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
      formSubmit(){ //提现操作
       let {add_num,secpwd,img} = this.rcConfig;
        if(add_num.trim().length === 0){
          uni.showToast({
            icon:'none',
            title:this.$t('warn').emptyNumber
          })
          return false;
        }else if(secpwd.trim().length === 0){
          uni.showToast({
            icon:'none',
            title:this.$t('warn').dealPwdEmpty
          })
          return false;
         }
        //else if(img.trim().length === 0){
        //   uni.showToast({
        //     icon:'none',
        //     title:'请上传交易图片'
        //   })
        //   return false; 
        // }
        this.$request.post(this.$KPI.USDT.rcAction,this.rcConfig).then(res => {
          if(res.code === 200){
            uni.showToast({
              icon:'success',
              title:this.$t('warn').topUpSuccess
            });
            this.rcConfig.add_num = '';
            this.rcConfig.secpwd = '';
            this.rcConfig.img = '';
            this.reviewSrc = '';
            this.fetchDeInfo();
          }else{
            uni.showToast({
              icon:"none",
              title:res.msg
            })
          }
        })
      }	
	},
	// 转账日志
	onNavigationBarButtonTap(e) {
		uni.navigateTo({
			url: '/pages/hbyconve/rechargechzlist'
		});
	}
}
</script>

<style>
	page {
		background: #158DFF;
	}
	.conhbytopBox {
		background: #1283F2;
		border-radius: 10rpx;
		position: relative;
		overflow: hidden;
		min-height: 240rpx;
		padding: 30rpx;
	}
	.conhbytbg {
		position: absolute;
		top:25%;
		left:45%;
		z-index: 1;
		height: 250rpx !important;
	}
	.conhbytopCont {
		position: relative;
		z-index: 10;
	}
	.conhbytltBox {
		line-height: 50rpx;
	}
	.conhbytlt {
		color: #ffffff;
		font-size: 26rpx;
		line-height: 50rpx;
	}
	.conhbytlzx {
		line-height: 50rpx;
		padding-left: 10rpx;
	}
	.conhbytlzx image {
		width: 10rpx;
		height: 14rpx;
	}
	.conhbyshu {
		font-size: 55rpx;
		color: #ffffff;
	}
	.conusdttlt {
		color: #7CBCFC;
		font-size: 24rpx;
		margin-top: 10rpx;
	}
	.conusdtshu {
		color: #7CBCFC;
		font-size: 30rpx;
	}
	.sshulvBox {
		padding:10rpx 0rpx 30rpx 0rpx;
	}
	.sshulvBox .text_1 {
		color: #A5D6FA;
		font-size: 26rpx;
	}
	.sshulvBox .text_2 {
		color: #ffffff;
		font-size: 26rpx;
	}
	.shctanzwei {
		width: 100rpx;
		height: 100rpx;
		display:inline-block;
		margin: 0rpx 15rpx 15rpx 0rpx;
	}
	.shctanzwei image {
		width: 100%;
		height: 100%;
	}
	
	
</style>
