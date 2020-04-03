<template>
	<view>
		<view class="teambanfh" @click="teamBack"><uni-icon type="arrowleft" color="#C2C2C1" size="24"></uni-icon></view>
		<view class="teamlogo">
			<image :src="share.logo" mode="aspectFit"></image>
		</view>
		<view class="teamtiafu"><image src="/static/images/a024laner_52.png" mode="aspectFit"></image></view>
		<view class="teamtiams">{{i18n.title}}</view>
		<div class="teamewmimg">
      <tki-qrcode 
      ref="qrcode"
      :val="qrCode"
      :size="size"
      :background="background"
      :foreground="foreground"
      :pdground="pdground"
      :onval="onval"
      :loadMake="loadMake"
      :icon="icon"
      :iconSize="iconSize"
      :loadingText=loadingText
      @result="qrCodeBack"
      />
    </div>
		<view class="teamewczan" @longpress="copyShare">{{i18n.longCopy}}</view>
		<view class="teamewlink" v-if="share.reg_code">{{i18n.Invite}}&nbsp;{{share.reg_code}}</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		components: {
			uniIcon,
      tkiQrcode
		},
		data() {
			return {
				size:280,
        background:'#ffffff',
        foreground:'#000000',
        pdground:'#000000',
        loadMake:true,
        icon:'/static/images/hbylogo.png',
        iconSize:30,
        loadingText:this.$t('common').qrText,
        onval:true,//监听val变化
        share:{}
			}
		},
    computed:{
      qrCode(){ //二维码生成信息
        if(this.share.src){
          let url = this.share.src+'?reg='+this.share.reg_code;
          return url;
        }else{
          return '';
        }
      },
      shareAdress(){ //分享地址
        let {share,Invite,downAddress} = this.$t('teamindex');
        if(this.share.src){
          let address = share + Invite + this.share.reg_code +"  "+ downAddress + this.share.src;
          return address;
        }else{
          return '';
        }
      },
      i18n(){
        return this.$t('teamindex');
      }
    },
    onLoad(){
      this.fetchDetails();
    },
		methods: {
      qrCodeBack(res){ //生成二维码的回调函数
        this.qrImg = res;
      },
      fetchDetails(){ //获取推广信息
        this.$request.get(this.$KPI.share.message).then(res => {
          if(res.code === 200){
             if(res.data && Object.keys(res.data).length !== 0){
               this.share = res.data;
             }
          }else{
            uni.showToast({
              icon:"none",
              title:res.msg
            })
          }
        })
      },
      copyShare(){ //复制分享链接
        uni.setClipboardData({
          data:this.shareAdress,
          success: (res) => {
            uni.showToast({
              icon:"none",
              title:this.$t('warn').copySuccess,
			        position:'bottom'
            })
          }
        })
      },
			teamBack(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style>
	@import url("teamindex.css");
</style>
