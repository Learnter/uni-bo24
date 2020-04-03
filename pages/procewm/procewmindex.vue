<template>
	<view class="procewmBox">
		<view class="procewmCont">
			<view class="procewmTl">
				<image src="/static/images/logo3.png" mode=""></image>{{i18n.title}}
			</view>
			<view class="procewminzi">
        {{i18n.payTips}}
        <view v-show="proceeds.money" style="font-size:34rpx;line-height:1.2;">￥{{proceeds.money}}</view>
      </view>
      <view class="qrimg" style="text-align:center">
          <tki-qrcode
          ref="qrcode"
          :val="val"
          :size="size"
          :background="background"
          :foreground="foreground"
          :pdground="pdground"
          :onval="onval"
          :loadMake="loadMake"
          :icon="icon"
          :iconSize="iconSize"
          :loadingText=loadingText
          @result="qrCode"
          />
      </view>
      
			<view class="procaozuoBox uni-flex">
        <view class="procaozuolt" @click="spdpopup = true"> {{i18n.setMoney}}</view>
        <view v-show="proceeds.money" class="procaozuolt" @click="emptyMoney">{{i18n.clearMoney}}</view>
				<view class="procaozuort" @click="saveImg">{{i18n.savePicture}}</view>
			</view>
			<view class="btomnav uni-flex" @click="recordan">
				<view class="btomnavimg">
					<image src="/static/images/a024laner_32.png" mode="aspectFit"></image>
				</view>
				<view class="btomnavtx fx1">{{i18n.logs}}</view>
				<view class="btomnavzxx"><uni-icon type="arrowright" color="#888888" size="20"></uni-icon></view>
			</view>
		</view>
		
		<!-- 弹窗 s -->
		<view class="spdpopupBox" :class= "spdpopup == true ? 'spdpopupBoxActive' : ''">
			<view class="spdpopupContBaba">
				<view class="spdpopupCont">
					<view class="spdpopuptl">{{i18n.dialogsTitle}}</view>
					<form @submit="formSubmit">	
						<view class="confirinpt">
							<input type="text" v-model="proceeds.money":placeholder="i18n.holder"/>
						</view>				
						<view class="btn-area confirBtnBox">
							<button formType="submit" class="confirBtn">{{i18n.submit}}</button>					
						</view>
					</form>
				</view>
				<view class="guanbiBox" @click="closeMask"><uni-icon class="i" type="closeempty" color="#ffffff" size="38"></uni-icon></view>
			</view>
		</view>
		<!-- 弹窗 e -->
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
  import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		components: {
			uniIcon,
      tkiQrcode
		},
		data() {
			return {
				spdpopup:false,
        val:'',
        size:250,
        background:'#ffffff',
        foreground:'#000000',
        pdground:'#000000',
        loadMake:true,
        icon:'/static/images/hbylogo.png',
        iconSize:30,
        onval:true,//监听val变化
        proceeds:{ //收款人信息
          account:'',
          user_id:'',
          money:'',
        },
        qrImg:'',//二维码图片
        loadingText:this.$t('common').qrText
			}
		},
    computed:{
     i18n(){
       return this.$t('gather');
     }
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').r_qr_code
      })
      this.fetchUserInfo();
    },
		methods: {
      qrCode(res){
        this.qrImg = res;
      },
      fetchUserInfo(){ //获取个人信息
        let info = this.$catchs.get("app_user_info").userInfo;
        this.proceeds.account = info.account;
        this.proceeds.user_id = info.user_id;
        this.val = JSON.stringify(this.proceeds);
      },
      formSubmit(){//设置金额
        this.spdpopup = false;
        this.val = JSON.stringify(this.proceeds);
      },
      emptyMoney(){//清除设置金额
        this.proceeds.money = '';
        this.val = JSON.stringify(this.proceeds);
      },
      saveImg(){//保存图片
        uni.saveImageToPhotosAlbum({
          filePath:this.qrImg,
          success:(res)=>{
           uni.showToast({
             icon:"success",
             title:this.i18n.saveImageSuc,
             position:"top"
           })
          }
        })
      },
      closeMask(){//关闭遮罩层
        this.spdpopup = false;
        this.proceeds.money = '';
        this.val = JSON.stringify(this.proceeds);
      },
			recordan(){
				uni.navigateTo({
					url:"recordlist"
				});
			}
		}
	}
</script>

<style>
	@import url("procewmindex.css");
</style>
