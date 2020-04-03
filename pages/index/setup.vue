<template>
	<view>
		<view class="apseuptopBox">
			<view class="apseuptopdataBox uni-flex">
				<view class="apseuptopdataimg">
					<view class="topdataimgHe">
						<image :src="userInfo.level_logo" mode="aspectFit"></image>
					</view>
				</view>
				<view class="fx1">
					<view class="topdauid">UID：{{userInfo.user_id ||""}}</view>
					<view class="topdadengj">{{userInfo.level ||""}}</view>
				</view>
			</view>
			<view class="uni-flex seuptopNavBox">
				<navigator url="../account/payinfo" class="seuptopNav" hover-class="none">
					<image src="/static/images/a024laner_26.png" mode="aspectFit"></image>
					<view class="seuptopNavtx">{{i18n.creditManagement}}</view>
				</navigator>
				<!-- <view class="seuptopNavgx"></view> -->
				<!-- <navigator url="../hbyconve/conversion" class="fx1 seuptopNav" hover-class="none">
					<image src="/static/images/a024laner_25.png" mode="aspectFit"></image>
					<view class="seuptopNavtx">{{i18n.conversion}}</view>
				</navigator> -->
				<!--<view class="seuptopNavgx"></view> -->
				<navigator url="/pages/hbydeal/hbyWithdraw/hbyWithdraw" class="seuptopNav" hover-class="none">
					<image src="/static/images/a024laner_27.png" mode="aspectFit"></image>
					<view class="seuptopNavtx">{{i18n.hExtract}}</view>
				</navigator>
        
				<!-- <navigator url="../hbyconve/deposittx" class="fx1 seuptopNav" hover-class="none">
					<image src="/static/images/a024laner_27.png" mode="aspectFit"></image>
					<view class="seuptopNavtx">{{i18n.withdraw}}</view>
				</navigator> -->
				<!-- <view class="seuptopNavgx"></view> -->
				<!-- <navigator url="../hbyconve/rechargechz" class="fx1 seuptopNav" hover-class="none">
					<image src="/static/images/a024laner_28.png" mode="aspectFit"></image>
					<view class="seuptopNavtx">{{i18n.recharge}}</view>
				</navigator> -->
			</view>
		</view>
    <view v-if="userInfo.activate && userInfo.activate !== 1">
      <view class="activationBox">
        <button type="primary" plain class="activationBtn" @tap="activationBtn">{{i18n.activate}}</button>
      </view>
    </view>
		<view class="zhbunavBox" :class="userInfo.activate === 1 ?'zhbunavBoxAct':''">
			<view class="zhbunavHe uni-flex">
				<navigator url="../user/personalinfo" class="zhbunavLink fx1" hover-class="none">
					<image src="/static/images/a024laner_23.png" mode="aspectFit"></image>
					<view class="zhbunavLinktx">{{i18n.information}}</view>
				</navigator>
				<navigator url="../agent/bdrindex" class="zhbunavLink fx1" hover-class="none">
					<image src="/static/images/a024laner_21.png" mode="aspectFit"></image>
					<view class="zhbunavLinktx">{{i18n.community}}</view>
				</navigator>
				<navigator url="../user/securityinfo" class="zhbunavLink fx1" hover-class="none">
					<image src="/static/images/a024laner_22.png" mode="aspectFit"></image>
					<view class="zhbunavLinktx">{{i18n.safetyManagement}}</view>
				</navigator>
				<navigator url="../shop/odform" class="zhbunavLink fx1" hover-class="none">
					<image src="/static/images/a024laner_75.png" mode="aspectFit"></image>
					<view class="zhbunavLinktx">{{i18n.myOrder}}</view>
				</navigator>
			</view>
		</view>
		<view class="btomnavBox">
			<navigator class="btomnav uni-flex" url="/pages/notice/noticeindex"  hover-class="none">
				<view class="btomnavimg">
					<image src="/static/images/a024laner_35.png" mode="aspectFit"></image>
				</view>
				<view class="btomnavtx fx1">{{i18n.platform}}</view>
				<view class="btomnavzxx">
					<uni-icon type="arrowright" color="#888888" size="16"></uni-icon>
				</view>
			</navigator>
      <navigator class="btomnav uni-flex" url="/pages/address/addressindex"  hover-class="none">
      	<view class="btomnavimg">
      		<image src="/static/images/a024laner_29.png" mode="aspectFit"></image>
      	</view>
      	<view class="btomnavtx fx1">{{i18n.addressAdministration}}</view>
      	<view class="btomnavzxx">
      		<uni-icon type="arrowright" color="#888888" size="16"></uni-icon>
      	</view>
      </navigator>
      <navigator class="btomnav uni-flex" v-show="!isBusiness" url="/pages/merchant/sjapplyfor"  hover-class="none">
      	<view class="btomnavimg">
      		<image src="/static/images/a024laner_33_1.png" mode="aspectFit"></image>
      	</view>
      	<view class="btomnavtx fx1">{{i18n.BusinessApplication}}</view>
      	<view class="btomnavzxx">
      		<uni-icon type="arrowright" color="#888888" size="16"></uni-icon>
      	</view>
      </navigator>
      <navigator class="btomnav uni-flex" v-show="isBusiness" url="/pages/merchant/businescenter"  hover-class="none">
      	<view class="btomnavimg">
      		<image src="/static/images/a024laner_33.png" mode="aspectFit"></image>
      	</view>
      	<view class="btomnavtx fx1">{{i18n.BusinessCenter}}</view>
      	<view class="btomnavzxx">
      		<uni-icon type="arrowright" color="#888888" size="16"></uni-icon>
      	</view>
      </navigator>
      <navigator class="btomnav uni-flex" url="/pages/message/messageindex"  hover-class="none">
      	<view class="btomnavimg">
      		<image src="/static/images/a024laner_31.png" mode="aspectFit"></image>
      	</view>
      	<view class="btomnavtx fx1">{{i18n.message}}</view>
      	<view class="btomnavzxx">
      		<uni-icon type="arrowright" color="#888888" size="16"></uni-icon>
      	</view>
      </navigator>
      <navigator class="btomnav uni-flex" url="/pages/login/cancelBind"  hover-class="none">
      	<view class="btomnavimg">
      		<image src="/static/images/a024laner_115.png" mode="aspectFit"></image>
      	</view>
      	<view class="btomnavtx fx1">{{i18n.removeBind}}</view>
      	<view class="btomnavzxx">
      		<uni-icon type="arrowright" color="#888888" size="16"></uni-icon>
      	</view>
      </navigator>
      <navigator class="btomnav uni-flex" url="/pages/user/aboutdetail"  hover-class="none">
      	<view class="btomnavimg">
      		<image src="/static/images/a024laner_30.png" mode="aspectFit"></image>
      	</view>
      	<view class="btomnavtx fx1">{{i18n.aboutUs}}</view>
      	<view class="btomnavzxx">
      		<uni-icon type="arrowright" color="#888888" size="16"></uni-icon>
      	</view>
      </navigator>
		</view>
		<view class="btomnavBox">
			<view class="btomnav uni-flex">
				<view class="btomnavimg">
					<image src="/static/images/a024laner_36.png" mode="aspectFit"></image>
				</view>
				<view class="btomnavtx">{{i18n.language}}</view>
				<picker class="fx1" @change="bindPickerChange" :value="index" :range="array" range-key="name" style="text-align: right;">
					<view class="uni-input" style="padding: 0rpx 10rpx;color: #888888;">{{array[index].name}}</view>
				</picker>
				<view class="btomnavzxx">
					<uni-icon type="arrowright" color="#888888" size="16"></uni-icon>
				</view>
			</view>
		</view>
		<view class="btomnavBox">
			<view class="btomnav uni-flex" @click="logout">
				<view class="btomnavimg">
					<image src="/static/images/a024laner_34.png" mode="aspectFit"></image>
				</view>
				<view class="btomnavtx fx1">{{i18n.esc}}</view>
				<view class="btomnavzxx">
					<uni-icon type="arrowright" color="#888888" size="16"></uni-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		components: {
			uniIcon
		},
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				// 语言选择 s
				array: [{
					name: '简体中文',
          value:'zh-cn'
				}, {
					name: 'English',
          value:'en-us'
				}, {
					name: '日本語',
          value:'JP'
				}, {
					name: '한국어',
          value:'KR'
				}],
				index: 0,
				date: currentDate,// 语言选择 e
				userInfo: {}, //用户信息
        isBusiness:false //是否商家
			}
		},
    computed:{
      i18n(){
        return this.$t('setUp');
      }
    },
		onLoad(){
      /*设置语言显示*/
      switch(this._i18n.locale){
        case 'en-us':
          this.index = 1;
          break;  
        default:
          this.index = 0;
          break;
      }
      /*设置语言显示*/
			this.fetchUserInfo();
		},
    onShow(){
      this.checkStore();
    },
		methods: {
      checkStore(){ //检测是否为商家
        this.$request.get(this.$KPI.BsnSystem.isBusiness).then(res => {
          if(res.code === 200){
            if(res.data &&  Object.keys(res.data).length !== 0){
              this.isBusiness = res.data.is_store;
            }
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
			fetchUserInfo() { //获取用户信息
				this.$request.get(this.$KPI.person.allInfo).then(res => {
					if (res.code === 200 && res.data) {
						this.userInfo = res.data;
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})
			},
			// 导航
			goDetailPage(e) {
				let path = e.url ? e.url : e;
				let url = ~path.indexOf('platform') ? path : '/pages/' + path;
				uni.navigateTo({
					url: url
				});
				return false;
			},
			logout() {
				uni.showModal({
					title: this.$t('warn').importanceTips,
					content: this.$t('warn').askExit,
          confirmText:this.$t('common').comfirm,
          cancelText:this.$t('common').cancel,
					success: (res) => {
						if (res.confirm) {
							this.$catchs.remove('app_user_info');
							uni.reLaunch({
								url: "/pages/login/login"
							});
						}
					}
				});
			},
			// 语言选择 s
			bindPickerChange: function(e) {
				this.index = e.target.value;
        let language = this.array[e.target.value];
        switch (language.value){
          case 'zh-cn':
            this.$i18n.locale = 'zh-cn';
            this.$catchs.put('lang','zh-cn');
            break;
          case 'en-us':
            this.$i18n.locale = 'en-us';
            this.$catchs.put('lang','en-us');
            break;   
        }
        uni.reLaunch({
          url:'/pages/index/setup',
          success:()=>{
            /*设置底部栏文字语言*/
             this.setBottomTabBar();
            /*设置底部栏文字语言*/
          }
        })
			},
      // 语言选择 e
      
			getDate(type) {
				const date = new Date();
			},
			
      activationBtn(){ //激活会员
        this.$request.post(this.$KPI.activate.activation).then(res => {
         if(res.code === 200){
            this.fetchUserInfo();
            // uni.showToast({
            //   icon:"loading",
            //   title:"激活成功"
            // })
          }else{
            uni.showToast({
              icon:"none",
              title:res.msg,
              position:"top"
            })
          }
        })
      }
		}
	}
</script>

<style>
	@import url("setup.css");
  .activationBox{
    margin:20rpx;
    color: #5077F8;
  }
  .activationBtn{
    border:1px solid #5077F8;
    height:80rpx;
    line-height:80rpx;
  }
  .zhbunavBoxAct{
    top:-30rpx;
  }
</style>
