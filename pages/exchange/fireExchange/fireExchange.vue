<template>
	<view class="shuruknzdBox">	
			<view class="zhanhuBox" >
				<view class="zhanhushu" v-if="exInfo.userBlock">{{exInfo.userBlock}}</view>
				<view class="zhanhuhuans" v-if="exInfo.userBlockCny">≈{{exInfo.userBlockCny}}</view>
				<view class="uni-flex">
					<view class="fx1 jiedhzBoxHe" v-for="(lItem,lIndex) in exiList" :key="lIndex">
						<view class="jiedhzBox">
							<view class="jiedhztx">{{lItem.name}}</view>
							<view class="jiedhzshu">{{lItem.money}}</view>
						</view>
					</view>
				</view>
			</view>
      <form @submit="formSubmit">	
        <view class="uni-form-item uni-column qxloninputBox">
          <view class="qxloninptl">{{i18n.vote}}</view>
          <view class="with-fun qxloninput">
            <input class="uni-input" :placeholder="i18n.voteHolder"  placeholder-style="color:#C4D8D8;"  v-model="exCommit.toNum"/>				
          </view>
        </view>
        <view class="uni-form-item uni-column qxloninputBox">
          <view class="qxloninptl">{{i18n.tradePwd}}</view>
          <view class="with-fun qxloninput">
            <input type="number" password class="uni-input" :placeholder="i18n.tradePwdHolder"  placeholder-style="color:#C4D8D8;"  v-model="exCommit.secpwd" />				
          </view>
        </view>
        <view class="uni-form-item uni-column qxloninputBox">
          <view class="qxloninptl">{{i18n.verify_code}}</view>
          <view class="with-fun qxloninput">
            <input class="uni-input" :placeholder="i18n.verifyCodeHolder"  placeholder-style="color:#C4D8D8;"  v-model="exCommit.verify_code"/>
            <image :src="graphImg"  class="yzm" @tap="fetchGraphCode"></image>
          </view>
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
		data(){
			return {
        graphImg:'',//图形验证码
				exInfo:{},//兑换信息
        exiList:[],//兑换列表
        exCommit:{ //提交参数
          toNum:'',
          secpwd:'',
          verify_code:''
        }
			}
		},
    computed:{
      i18n(){
        return this.$t('fireExchange');
      }
    },
    onLoad(){
      uni.setNavigationBarTitle({
        title:this.$t('navText').hz_ec_hby
      })
    },
    onReady(){
      this.fetchExInfo();
      this.fetchGraphCode();
    },
		methods: {	
      fetchGraphCode(){ //获取图形验证码
        this.$request.get(this.$KPI.common.graphCode,{type:'transform'}).then( res => {
           this.graphImg = res;
        })
      },
      fetchExInfo(){ //获取兑换信息
        this.$request.get(this.$KPI.exchange.exInfo).then(res => {
           if(res.code === 200 && res.data != {}){
             this.exInfo = res.data;
             if(res.data.list && res.data.list.length !== 0){
               this.exiList = res.data.list;
             }
           }
        })
      },
      formSubmit(){ //提交兑换
       this.$request.post(this.$KPI.exchange.exFireAction,this.exCommit).then( res => {
         if(res.code === 200){
           uni.showToast({
             icon:"loading",
             title:this.$t('warn').exchangeSuccess,
             success:()=>{
               this.exCommit = {};
               this.fetchExInfo();
             }
           })
         }else{
           uni.showToast({
             icon:"none",
             title:res.msg
           })
         }
        this.fetchGraphCode(); 
       })
    },	
	},
	onNavigationBarButtonTap(e) {// 转账日志
		uni.navigateTo({
			url: '/pages/exchange/fireExchange/fireExList'
		});
	}
}
</script>

<style>
	page {
		background: #158DFF;
	}
	.zhanhuBox {
		padding: 20rpx 20rpx 40rpx 20rpx;
    min-height:340rpx;
	  background: #62ADF7;
		border-radius: 6rpx;
		text-align: center;
		color: #ffffff;
	}
	.zhanhushu {
		font-size: 40rpx;
	}
	.zhanhuhuans {
		font-size: 26rpx;
		padding:10rpx 0rpx 30rpx 0rpx;
	}
	.jiedhzBoxHe {
		text-align: center;
	}
	.jiedhzBox {
		display:inline-block;
		min-width: 80%;
		background: #2993FC;
		border-radius: 6rpx;
		padding: 20rpx 10rpx;
		word-wrap: break-word;
		word-break: normal;
		word-break:break-all;
	}
	.jiedhztx {
		font-size: 24rpx;
	}
	.jiedhzshu {
		font-size: 24rpx;
	}
	
</style>

