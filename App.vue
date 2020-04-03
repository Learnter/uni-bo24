<script>
	export default {
		onLaunch: function() {
			// this.$request.get(this.$KPI.common.sessionId).then( res => {
        let res =((Math.random()*1000)+""+new Date().getTime()).replace('.','');
        uni.setStorageSync('session_id',res);
      // })
      /*每次进入程序,获取设置的语言*/
      let language = this.$catchs.get('lang');
      if(language){
        this.$i18n.locale = language;
      }
      /*每次进入程序,获取设置的语言*/ 
      console.log('App launch');   
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
  /* 	
	.serbgBox{
		background:#00366A;
	} */
	.bdrdatopBox {
		background: #158DFF;
	}

	page {
		background-color: #ffffff;
		height:100%;
		line-height: 1.8;
		font-family: 'MicrosoftYaHei';
	}

	.fx1 {
		-webkit-flex: 1;
		flex: 1;
	}

	.clearfix::after {
		content: "";
		display: block;
		clear: both;
	}

	* {
		box-sizing: content-box;
		box-sizing: border-box;
	}

	.confirBtn {
		padding: 0rpx;
		margin: 0rpx;
		font-size: 30rpx;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		color: #ffffff;
		background: #158DFF;
	}


	/* 链接列表 s */
	.btomnavBox {
		padding: 0rpx 20rpx;
	}

	.btomnav {
		border-bottom: 1px solid #EFF0F2;
		padding: 25rpx 0rpx;
	}

	.btomnavimg {
		height: 50rpx;
		width: 80rpx;
		line-height: 50rpx;
	}

	.btomnavimg image {
		height: 50rpx;
		width: 50rpx;
	}

	.btomnavtx {
		color: #333333;
		font-size: 28rpx;
		height: 50rpx;
		line-height: 50rpx;
	}

	.btomnavzxx {
		line-height: 50rpx;
	}

	/* 链接列表 e */

	/* 日志记录 s */

	.topsbgydaBox {
		height: 90rpx;
		background: #ffffff;
	}

	.topsbgyCont {
		position: fixed;
		left: 0px;
		width: 100%;
		height: 90rpx;
		z-index: 100;
		background: #ffffff;
		border-bottom: 4rpx solid #f2f2f2;
	}

	.uni-padding-wrap {
		margin: 0rpx;
		height: 90rpx;
		width: 100%;
		padding: 0rpx;
		overflow: hidden;
	}

	.recoeBox {
		padding: 20rpx 20rpx 0rpx 20rpx;
	}

	.tradparLi {
		background: #ffffff;
		border-radius: 4rpx;
		margin-bottom: 20rpx;
		padding: 20rpx;
		position: relative;
	}
	.tradparztai {
		position: absolute;
		top:0rpx;
		right:0rpx;
		padding:18rpx 15rpx 5rpx 15rpx;
		z-index: 10;
		background: #ffffff;
		color: #158DFF;
		font-size: 24rpx;
	}

	.tradparLiimg {
		width: 80rpx;
		height: 80rpx;
		margin-right: 20rpx;
	}

	.tradparLiimg image {
		width: 100%;
		height: 100%;
	}

	.tradparLitx {
		font-size: 30rpx;
		line-height: 40rpx;
		word-wrap: break-word;
		word-break: normal;
		word-break: break-all;
    padding-bottom:20rpx;
	}

	.tradparLitime {
		color: #7C7C86;
		font-size: 24rpx;
		line-height: 40rpx;
		word-wrap: break-word;
		word-break: normal;
		word-break:break-all;
	}

	.tradparshuu {
		line-height: 80rpx;
		color: #158DFF;
		padding-left: 20rpx;
	}

	.tradparshuuchu {
		line-height: 80rpx;
		color: #FF0000;
		padding-left: 20rpx;
	}

	/* 日志记录 e */

	/* input 输入页 1 s */

	.shuruknzdBox {
		padding: 0rpx 30rpx;
	}

	.qxloninputBox {
		margin-bottom: 15rpx;
	}

	.qxloninputBox .qxloninput {
		background: #158DFF;
		border-bottom: 1px solid rgba(211, 240, 240, 0.1);
    align-items:center;
	}

	.qxloninput .uni-input {
		height: 80rpx;
		line-height: 80rpx;
		padding: 0rpx;
		background: #158DFF;
		color: #D3F0F0;
	}
	.qxloninput .huoqyam {
		padding: 0rpx;
		margin: 0rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 26rpx;
		background: #158DFF;
		color: #FDCC00;
	}
	.qxloninput .huoqyam::after {
		border: none;
	}

	.uni-form-item .with-fun .uni-icon {
		color: #D3F0F0;
		text-align: right;
	}

	.whlogbtnBox {
		padding: 60rpx 0rpx 20rpx 0rpx;
	}

	.whlogbtn {
		background: #62ADF7 !important;
		color: #ffffff;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		padding: 0rpx;
		border-radius: 6rpx;
	}
	.whlogbtn:after {
		border: none;
	}
	.qxloninput .yzm {
		width: 180rpx;
		height: 75rpx;
	}
	.qxloninptl {
		color: #ffffff;
	}
	.qxlondizh {
		padding: 15rpx 0rpx;
		border-bottom: 1px solid rgba(211, 240, 240, 0.1);
		color:#A5D6FA;
		word-wrap: break-word;
		word-break: normal;
		word-break:break-all;
	}

	/* input 输入页 1 e */

	/* input 弹窗 s */

	.spdpopupBox {
		position: fixed;
		left: 0px;
		top: 0px;
		right: 0px;
		bottom: 0px;
		background: rgba(0, 0, 0, 0.5);
		z-index: 10000;
		overflow: auto;
		visibility: hidden;
		opacity: 0;
		filter: alpha(opacity=0);
		transition: All 0.3s ease-in-out;
		-webkit-transition: All 0.1s ease-in-out;
		-moz-transition: All 0.1s ease-in-out;
		-o-transition: All 0.1s ease-in-out;
	}

	.spdpopupBoxActive {
		visibility: visible;
		opacity: 1;
		filter: alpha(opacity=100);
	}

	.spdpopupContBaba {
		padding: 30% 6% 0upx 6%;
	}

	.spdpopupCont {
		background: #ffffff;
		min-height: 200upx;
		border-radius: 10upx;
		overflow: hidden;
		padding: 0rpx 30rpx 60rpx 30rpx;
	}

	.spdpopuptl {
		color: #333333;
		font-size: 30upx;
		text-align: center;
		padding: 20upx;
	}

	.guanbiBox {
		width: 78upx;
		margin: 30upx auto;
		height: 78upx;
		line-height: 78upx;
		text-align: center;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 50%;
	}

	.guanbiBox .i {
		display: inline-block;
	}

	.confirinpt {
		margin-top: 50rpx;
		border: 2rpx solid #DFDFDF;
		border-radius: 6rpx;
	}
	.confirinpt .yzm {
		width: 180rpx;
		height: 60rpx;
		margin: 10rpx 10rpx 0rpx 0rpx;
	}
	.confirinpt input {
		height: 80rpx;
		line-height: 80rpx;
		padding: 0rpx 20rpx;
		font-size: 28rpx;
	}
	.confirBtnBox {
		margin-top: 50rpx;
	}
	.confirBtnBox .confirBtn {
		padding: 0rpx;
		margin: 0rpx;
		font-size: 30rpx;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		color: #ffffff;
		background: #158DFF;
	}
	.confirBtnBox .confirqux {
		padding: 0rpx;
		margin: 0rpx;
		font-size: 30rpx;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		color: #158DFF;
		background: #ffffff;
	}
	.confirBtnBox .confirqux:after {
		border: 1px solid #158DFF;
	}
	
  /* 暂无数据 */
  .stayBox {
      text-align: center;
      color:#333333;
      padding-top:20%;
    }
</style>
