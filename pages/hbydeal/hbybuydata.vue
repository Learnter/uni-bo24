<template>
	<view>
		<view class="hbdataBox">
			<view class="uni-flex">
				<view class="fx1 hbdatttitile">{{detailInfo.trade_msg}}</view>
				<view class="hbdattime">{{detailInfo.add_time}}</view>
			</view>
			<view class="hbdatxx">{{i18n.orderNum}}：{{detailInfo.order_sn}}</view>
			<view class="hbdatxx">{{i18n.payee}}：{{detailInfo.sell_uid}}</view>
			<view class="hbdatxx">{{i18n.price}}：{{detailInfo.actual_price}}</view>
			<view class="hbdatxx">{{i18n.count}}：{{detailInfo.num}}</view>
			<view class="hbdatxx">{{i18n.total}}：{{detailInfo.money}}</view>
		</view>
		
		<view class="hbdaliuchBox">
			<!-- 流程 s -->
			<view>
				<view class="uni-timeline-item uni-timeline-first-item">
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content">
						<view class="ztai_1">{{i18n.tips1}}</view>
						<view class="ztaitx">{{i18n.payer}}：{{detailInfo.buy_account}}</view>
            <!-- 银行卡收款-->
            <block v-if="detailInfo.bank_info">
              <view class="ztaitx">{{i18n.bank}}：{{detailInfo.bank_info.opening_id}}</view>
              <view class="uni-flex shkzhBox">
              	<view class="ztaitx fx1">{{i18n.account}}：{{detailInfo.bank_info.bank_account}}</view>
              	<view class="shkzhfzbtn" @click="copyBtn(detailInfo.bank_info.bank_account)">{{i18n.copy}}</view>
              </view>
            </block>
            <!-- 银行卡收款-->
            <!-- 微信收款 -->
            <block v-if="detailInfo.wx_info">
              <view class="ztaitx">{{i18n.way}}：{{i18n.weChat}}</view>
              <view class="uni-flex shkzhBox">
              	<view class="ztaitx fx1">{{i18n.account}}：{{detailInfo.wx_info.wx_name}}</view>
              </view>
            </block>
            <!--微信收款 -->
            <!-- 支付宝收款 -->
            <block v-if="detailInfo.zfb_info">
              <view class="ztaitx">{{i18n.way}}：{{i18n.alipay}}</view>
              <view class="uni-flex shkzhBox">
              	<view class="ztaitx fx1">{{i18n.account}}：{{detailInfo.zfb_info.zfb_name}}</view>
              </view>
            </block>
            <!--支付宝收款 -->
					</view>
				</view>
				<view class="uni-timeline-item">
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content">
						<view class="ztai_1">{{i18n.tips2}}</view>					
					</view>
				</view>
				<view class="uni-timeline-item">
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content">
						<view :class="detailInfo.is_type == 2 || detailInfo.is_type == 6 || detailInfo.is_type == 9 ?'ztai_1':'ztai_2'">{{i18n.tips3}}</view>					
					</view>
				</view>
				<view class="uni-timeline-item uni-timeline-last-item">
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content">
						<view  :class="detailInfo.is_type == 6 || detailInfo.is_type == 9 ?'ztai_1':'ztai_3'">{{i18n.tips4}}</view>					
					</view>
				</view>
			</view>
			<!-- 流程 s -->
        <block v-if="detailInfo.is_type !== 1">
           <view class="">
             <view class="pbbttlie">
               <text class="text_1">
                 {{i18n.credentials}}
               </text>
             </view>
             <!-- 图片位置 s -->
             <view class="shctanzwei" v-for="(pItem,pIndex) in detailInfo.pay_img" :key="pIndex">
               <image :src="pItem" mode=""></image>
             </view>
             <!-- 图片位置 e -->
           </view>
        </block>
        
			  <!-- 等待付款-->
        <block v-if="detailInfo.d_true">
          <!-- 上传付款图片 s -->
          <view class="shctanzwei" v-for="(rItem,rIndex) in reviewSrc" :key="rIndex">
            <image :src="rItem" mode=""></image>
          </view>
          <!-- 上传付款图片s -->
          <view class="whlogbtnBox">
            <button type="primary" class="whlogbtn" @click="upFile">{{i18n.upload}}</button>
          </view>
          <view class="confirBtnBox">
            <button type="primary" class="confirBtn" @click="comfirmRemit">{{i18n.remit}}</button>
          </view>
      </block>
      <!-- 等待付款-->
      
      <!-- 等待对方收款-->
      <block v-if="!detailInfo.d_true && (detailInfo.is_type == 1 || detailInfo.is_type == 2)">
         <view class="whlogbtnBox">
           <button type="primary" class="whlogbtn">{{i18n.gather}}</button>
         </view>
      </block>
      <!-- 等待对方收款-->
      
      <!-- 对方已收款-->
      <block v-if="detailInfo.is_type == 6 || detailInfo.is_type == 9">
         <view class="whlogbtnBox">
           <button type="primary" class="whlogbtn">{{i18n.finish}}</button>
         </view>
      </block>
      <!--对方已收款-->
		</view>	
	</view>
</template>
<script>
  export default {
  	data() {
  		return {
        reviewSrc:[],//显示打款的图片
        reQuest:{ //详情请求配置
          id:''
        },
        detailInfo:{},//详情信息
        remitConfig:{ //打款请求配置
          id:'',
          img:[]
        }
  		}
  	},
    computed:{
      i18n(){
        return this.$t('hbybuydata');
      }
    },
    onLoad(option){
      uni.setNavigationBarTitle({
        title:this.$t('navText').hBuyDetails
      })
      this.reQuest.id = option.parent_id; 
      this.remitConfig.id = option.parent_id;
      this.fetchDetails();
    },
  	methods: {
      fetchDetails(){ //获取详情信息
        this.$request.get(this.$KPI.HbyDeal.details,this.reQuest).then(res => {
          if(res.code === 200){
            // console.log(res);
            if(res.data && res.data != {}){
              this.detailInfo = res.data;
            }
          }else{
            uni.showToast({
              icon:"none",
              title:res.msg
            })
          }
        })
      },
      upFile(){ //上传打款图片
        uni.chooseImage({
          count:3,
          success: (res) => {
           res.tempFilePaths.forEach(item => { //多图上传
              this.$request.upload(this.$KPI.common.upFile,item,'pay_img',{
                'field':'pay_img'
              }).then( res =>{
                if(res.code === 200){
                  if(res.data && res.data !== {}){
                    this.reviewSrc.push(res.data.show_src);
                    this.remitConfig.img.push(res.data.src);
                  } 
                 }else{
                   uni.showToast({
                     icon:"none",
                     title:res.msg
                   })
                   return false;
                 }
               })
            })
          } 
        })
      },
      comfirmRemit(){ //确认汇款
        uni.showModal({
          title:this.$t('warn').tipTitle,
          content:this.$t('warn').askRemit,
          success: (res) => {
            if(res.confirm){
              this.$request.post(this.$KPI.HbyDeal.remit,this.remitConfig).then(res => {
                if(res.code === 200){
                   uni.showToast({
                     icon:"loading",
                     title:this.$t('warn').remitSuccess
                   })
                   this.fetchDetails();
                }else{
                  uni.showToast({
                    icon:"none",
                    title:res.msg
                  })
                }
              })
            }
          }
        })
      },
      copyBtn(msg){ //复制信息
        uni.setClipboardData({
          data:msg,
          success: (res) => {
            uni.showToast({
              icon:"success",
              title:this.$t('warn').copySuccess 
            })
          }
        })
      }
  	}
  }
</script>

<style>
	.hbdataBox {
		padding:0rpx 30rpx 20rpx 30rpx;
		background: #158DFF;
	}
	.hbdatttitile {
		color: #ffffff;
	}
	.hbdattime {
	    color: #7CBCFC;
	    font-size: 24rpx;
	}
	.hbdatxx {
		color: #A5D6FA;
		font-size: 24rpx;
		margin-top: 10rpx;
	}
	
	.hbdaliuchBox {
		padding: 30rpx 20rpx;
	}
	.ztaitx {
		color: #158DFF;
		margin-top: 10rpx;
		font-size: 24rpx;
	}
	.ztai_1 {
		color: #158DFF;
	}
	.ztai_2 {
		color: #888888;
	}
	.ztai_3 {
		color: #b4bccc;
	}
	
	.shctanzwei {
		width: 150rpx;
		height: 150rpx;
		display:inline-block;
		margin: 0rpx 15rpx 15rpx 0rpx;
	}
	.shctanzwei image {
		width: 100%;
		height: 100%;
	}
	.shkzhfzbtn {
		border-radius: 6rpx;
		border:1px solid #158DFF;
		color: #158DFF;
		margin-left: 40rpx;
		padding: 0rpx 20rpx;
	}
  
  .pbbttlie {
    background: #c2c2c2;
    padding: 10rpx;
    border-radius: 6rpx;
    margin: 20rpx 0rpx;
    color: #ffffff;
  }
  
  .pbbttlie .text_1 {
  /*font-size: 24rpx;*/
    color: #ffffff;
    border-left: 4rpx solid #FFCD42;
    padding-left: 15rpx;
  }
</style>
