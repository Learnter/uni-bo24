<template>
  <view class="conbox">
    <view class="container">
      <!-- 背景 -->
      <image src="/static/img/bg.png" class="cont" mode=""></image>
      <image src="/static/img/caidai.png" class="caidai" mode=""></image>
      <view class="header">
        <view class="header-title">
          <view class="left">
            <!-- 次数： <text style="color: #E4431A;">{{chishu}}</text> -->
          </view>
          <view class="right" @click="getmyPrize">
            {{i18n.prize}} >
          </view>
        </view>
      </view>
      <view class="main">
        <view class="canvas-container">

          <view :animation="animationData" class="canvas-content" id="zhuanpano" :style="initial">
            <view class="canvas-line">
              <view class="canvas-litem" v-for="(item,index1) in awardsList" :key="index1" :style="[{transform:'rotate('+item.lineTurn+')'}]"></view>
            </view>

            <view class="canvas-list">
              <view class="canvas-item" :style="[{zIndex:index2}]" v-for="(iteml,index2) in awardsList" :key="index2">
                <view class="canvas-item-text" :style="[{transform:'rotate('+iteml.turn+')'}]">
                  <text>{{iteml.award}}</text>
                  <image class="canvas-item-text-img" :src="iteml.image"></image>
                </view>
              </view>
            </view>
          </view>

          <view @tap="playReward" class="canvas-btn" v-bind:class="btnDisabled">{{i18n.start}}</view>
        </view>
      </view>
      <!-- 现金抽奖 -->
      <view class="typecheckbox">
        <view :class="mold==1?'left active':'left'" @click="choosetype(1)">
          {{i18n.draw}}
        </view>
        <!-- 	<view :class="mold==2?'left active':'left' " @click="choosetype(2)">
					现金抽奖
				</view> -->
      </view>
      <!-- 规则 -->
      <view class="guize">
        <view class="title">
          {{i18n.ruleIntro}}
        </view>
        <view v-html="notice">
        </view>
      </view>
      <!-- 我的奖品 -->
      <view class="shadowbox" v-if="r_flg" @click="closeshadow">
        <view class="myrewards" @click.stop="openshadow">
          <view class="title">
            {{i18n.prize}}
          </view>
          <view class="itembox">
            <view class="item" v-for="(items,i) in myPrizelist" :key="i">
              <text class="left">{{items.name}}</text>
              <text class="right">{{items.add_time}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        initial:'',
        awardsConfig: {
          chance: true, //是否有抽奖机会
          lists: [], //奖品列表 
        },
        awardsList: {},
        animationData: {},
        btnDisabled: '',
        thanksarr: [], //存储谢谢参与的索引
        chishu: 10,
        mold: 1,
        r_flg: 0,
        myPrizelist: [],
        notice:'' //玩法提示信息
      }
    },
    computed: {
      i18n() {
        return this.$t('dial');
      }
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').luckGuy
      })
    },
    onReady() {
      // 获取奖品列表
      this.initdata();
    },
    methods: {
      // 查看奖品
      getmyPrize() {
        // 				var that = this
        // 				that.requestFun('/api/Turntable/myPrize', {
        // 					page: 1,
        // 					num:1000
        // 				}, 1).then(function(data) {
        // 					data.lists.forEach(function(element,index){
        // 						element.createtime=that.dateformat(element.createtime)
        // 					})
        // 					that.myPrizelist = data.lists
        // 
        // 					that.r_flg=1
        // 				})
        this.$request.get(this.$KPI.games.drawLog).then(res => {
          if (res.code === 200) {
            // console.log(res);
            if (res.data && Object.keys(res.data).length !== 0) {
              this.myPrizelist = res.data;
              this.r_flg = 1;
            }
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      openshadow() {
        this.r_flg = 1
      },
      closeshadow() {
        this.r_flg = 0
      },
      // 选择抽奖方式
      choosetype(val) {
        this.mold = val
        this.initdata(this)
      },
      // 初始化抽奖数据
      async initdata(that) {
        await this.$request.get(this.$KPI.games.luckyDraw).then(res => {
          // console.log(res);
          if (res.code === 200) {
            if (res.data && Object.keys(res.data).length) {
              this.awardsConfig.lists = res.data.list;
              this.notice = res.data.message;
            }
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
        // 画转盘
        await this.drawAwardRoundel();
        // })
      },
      //画抽奖圆盘  
      drawAwardRoundel() {
        // 拿到奖品列表
        var awards = this.awardsConfig.lists;
        var awardsList = [];
        // 每份奖品所占角度
        var turnNum = 1 / awards.length * 360; // 文字旋转 turn 值  
        // 奖项列表  
        for (var i = 0; i < awards.length; i++) {
          awardsList.push({
            turn: i * turnNum + 'deg', //每个奖品块旋转的角度
            lineTurn: i * turnNum + turnNum / 2 + 'deg', //奖品分割线的旋转角度
            award: awards[i].name, //奖品的名字,
            image: awards[i].image,
            id: awards[i].id,
          });
        }
        this.awardsList = awardsList;
      },
      //发起抽奖  
      playReward() {
        var that = this;
        // 获取奖品
        this.$request.post(this.$KPI.games.drawAction).then(res => {
          if (res.code === 200) {
            if (res.data && Object.keys(res.data).length) {

              var data = res.data;

              var awardIndex = 0
              that.awardsList.forEach(function(element, index) {
                if (element.award == data.name) {
                  awardIndex = index
                }
              })
              //中奖index  
              var awardsNum = that.awardsConfig.lists;
              // var awardIndex = 1 || Math.round(Math.random() * (awardsNum.length - 1)); //随机数  
              var runNum = 4; //旋转8周  
              var duration = 4000; //时长  

              // 旋转角度  
              that.runDeg = that.runDeg || 0;
              // console.log(that.runDeg);
              let preDeg = that.runDeg
              that.runDeg = that.runDeg + (360 - that.runDeg % 360) + (360 * runNum - awardIndex * (360 / awardsNum
                  .length)) +1;
              //创建动画  
              if (process.env.VUE_APP_PLATFORM == 'h5') {
                // document.styleSheets[0]
                document.getElementById('zhuanpano').style = 'animation:rotate_before 4s 0ms ease forwards;'
                if (document.styleSheets[0].cssRules.length > 0) {
                  Array.from(document.styleSheets[0].cssRules).forEach(function(element, index) {
                    if (element.name == 'rotate_before') {
                      // 删除上次插入的动画
                      document.styleSheets[0].deleteRule(index)
                    }
                  })
                }
                // console.log(document.styleSheets[0].cssRules)
                // console.log("@keyframes rotate_before{from{ transform: rotate("+preDeg+"deg); }to{ transform: rotate("+that.runDeg+"deg);}}")
                // 插入定义的动画
                document.styleSheets[0].insertRule("@keyframes rotate_before{from{ transform: rotate(" + preDeg +
                  "deg); }to{ transform: rotate(" + that.runDeg + "deg);}}", 8);

              } else {
                var animationRun = uni.createAnimation({
                  duration: duration,
                  timingFunction: 'ease'
                })
                animationRun.rotate(that.runDeg).step();
                that.animationData = animationRun.export();
              }
              // 					// #ifndef H5
              // 					console.log(document.styleSheets)
              // 					document.getElementById('zhuanpano')
              // 					// #endif
              that.btnDisabled = 'disabled';

              // 中奖提示  
              setTimeout(function() {
                uni.showModal({
                  title: this.$t('warn').prize,
                  content: data.message,
                  confirmText: this.$t('common').comfirm,
                  showCancel: false,
                  success: function() {
                    // 置空style  否则动画不生效
                    setTimeout(function() {
                      
                       // #ifdef H5
                        document.getElementById('zhuanpano').style = ''
                       // #endif
                       
                       // #ifdef APP-PLUS
                         that.initial = '';
                       // #endif
                    }, 800)
                  
                  }
                });
                that.btnDisabled = '';
              }.bind(that), duration);
            }
            //   var awardsConfig = that.awardsConfig;
            //   var awardType = awardsConfig.lists[awardIndex].type;
            //   that.chishu = that.chishu - 1;
            //   if (awardType != 0) {
            //     setTimeout(function() {
            //       uni.showModal({
            //         title: '恭喜',
            //         content: '获得' + (awardsConfig.lists[awardIndex].name),
            //         showCancel: false,
            //         success: function() {
            //           // 置空style  否则动画不生效
            //           setTimeout(function() {
            //             document.getElementById('zhuanpano').style = ''
            //           }, 800)
            //         }
            //       });
            //       that.btnDisabled = '';
            //     }.bind(that), duration);
            //   } else {
            //     setTimeout(function() {
            //       uni.showModal({
            //         title: '很遗憾',
            //         content: '没中奖 ' + (awardsConfig.lists[awardIndex].name),
            //         showCancel: false,
            //         success: function() {
            //           // 置空style  否则动画不生效
            //           setTimeout(function() {
            //             document.getElementById('zhuanpano').style = ''
            //           }, 800)
            //         }
            //       });
            //       that.btnDisabled = '';
            //     }.bind(that), duration);
            //   }
            // }
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
        // })
      },
    }
  }
</script>
<style scoped>
  page,
  .conbox {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  .container,
  image.cont {
    width: 100%;
    min-height: 100vh;
    height: auto;
    position: relative;
    box-sizing: border-box;
  }

  image.cont {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    box-sizing: border-box;
    overflow: hidden;
  }

  image.caidai {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1024rpx;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* height: 246rpx; */
    padding: 20px 0 10px 0;
    box-sizing: border-box;
    position: relative;
    z-index: 3;
  }

  .header-title {
    width: 100%;
    height: 60rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 48rpx;
    justify-content: space-between;
  }

  .header-title>view.right {
    padding: 8rpx 16rpx;
    border: 1px solid #d89720;
    color: #d89720;
    font-size: 28rpx;
    border-radius: 26rpx;
    box-sizing: border-box;
  }

  /* 转盘 */
  .canvas-container {
    margin: 0 auto;
    position: relative;
    width: 500rpx;
    height: 500rpx;
    background: url(~@/static/img/circle.png) no-repeat;
    background-size: cover;
    border-radius: 50%;
    box-sizing: border-box;
  }

  .canvas {
    width: 100%;
    height: 100%;
    display: block !important;
    border-radius: 50%;
  }

  .canvas-content {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    display: block;
    width: 500rpx;
    height: 500rpx;
    border-radius: inherit;
    /* background-clip: padding-box; */
    /* background-color: #ffcb3f; */
  }

  .canvas-element {
    position: relative;
    z-index: 1;
    width: inherit;
    height: inherit;
    border-radius: 50%;
  }

  .canvas-list {
    position: absolute;
    left: 0;
    top: 0;
    width: inherit;
    height: inherit;
    z-index: 9999;
  }

  .canvas-item {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: #e4370e;
    /* text-shadow: 0 1rpx 1rpx rgba(255, 255, 255, 0.6); */
  }

  .canvas-item-text {
    position: relative;
    display: block;
    padding-top: 40rpx;
    margin: 0 auto;
    text-align: center;
    -webkit-transform-origin: 50% 250rpx;
    transform-origin: 50% 250rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #FB778B;
  }

  .canvas-item-text text {
    font-size: 28rpx;
    box-sizing: border-box;
  }

  .canvas-item-text-img {
    width: 60rpx;
    height: 50rpx;
    padding-top: 10rpx;
    box-sizing: border-box;
  }

  /* 分隔线 */
  .canvas-line {
    position: absolute;
    left: 0;
    top: 0;
    width: inherit;
    height: inherit;
    z-index: 99;
  }

  .canvas-litem {
    position: absolute;
    left: 250rpx;
    top: 0;
    width: 3rpx;
    height: 250rpx;
    background-color: rgba(228, 55, 14, 0.4);
    overflow: hidden;
    -webkit-transform-origin: 50% 125rpx;
    transform-origin: 50% 250rpx;
  }

  /**  
* 抽奖按钮  
*/
  .canvas-btn {
    position: absolute;
    left: 210rpx;
    top: 210rpx;
    z-index: 400;
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    color: #f4e9cc;
    background-color: #e44025;
    line-height: 80rpx;
    text-align: center;
    font-size: 26rpx;
    text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.6);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }

  .canvas-btn::after {
    position: absolute;
    display: block;
    content: ' ';
    left: 12rpx;
    top: -44rpx;
    width: 0;
    height: 0;
    overflow: hidden;
    border-width: 30rpx;
    border-style: solid;
    border-color: transparent;
    border-bottom-color: #e44025;
  }

  .canvas-btn.disabled {
    pointer-events: none;
    background: #b07a7b;
    color: #ccc;
  }

  .canvas-btn.disabled::after {
    border-bottom-color: #b07a7b;
  }

  .canvas-btn-table {
    color: #A83FDB;
    width: 120rpx;
    text-align: center;
    position: absolute;
    left: 240rpx;
    top: 360rpx;
    font-size: 26rpx;
    background-color: #FFFFFF;
    opacity: 0.9;
  }

  .typecheckbox {
    width: 100%;
    box-sizing: border-box;
    position: relative;
    z-index: 3;
    display: flex;
    padding: 20rpx;
    box-sizing: border-box;
    color: #fff;
    font-size: 28rpx;
    top: -50rpx;
    flex-direction: column;
    height: 180rpx;
    align-items: center;
    justify-content: flex-end;
  }

  .typecheckbox view {
    border: 1px solid #FF3637;
    background: transparent;
    color: #FF3637;
    display: flex;
    border-radius: 50rpx;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-left: 20rpx;
    padding: 6rpx 20rpx;
  }

  .typecheckbox view.active {
    background: #FF3637;
    color: #fff;
  }

  .guize {
    width: 502rpx;
    min-height: 300rpx;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 3;
    background-image: linear-gradient(-180deg, #F48549 0%, #F2642E 100%);
    border: 18rpx solid #E4431A;
    border-radius: 16px;
    margin: 0 auto;
    margin-top: -35rpx;
    padding: 20rpx;
    /* box-sizing: border-box; */
    color: #fff;
  }

  .guize .title {
    text-align: center;
    margin-bottom: 20rpx;
  }

  .guize .g_item {
    font-family: PingFang-SC-Medium;
    font-size: 24rpx;
    color: #FFFFFF;
    letter-spacing: 0.5px;
    text-align: justify;
    line-height: 40rpx;
  }

  .shadowbox {
    width: 750rpx;
    box-sizing: border-box;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0, 0, 0, .6);
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .myrewards {
    width: 600rpx;
    min-height: 80rpx;
    background: #FFEEDF;
    border: 10rpx solid #F2692F;
    color: #333;
    font-size: 24rpx;
    font-family: PingFang-SC-Medium;
    border-radius: 40rpx;
    padding-bottom: 20rpx;
  }

  .myrewards .title {
    font-family: PingFang-SC-Bold;
    font-size: 16px;
    color: #E4431A;
    letter-spacing: 0.57px;
    display: flex;
    padding-top: 36rpx;
    justify-content: center;
  }

  .myrewards .itembox {
    max-height: 320rpx;
    overflow-y: auto;
  }

  .myrewards .item {
    width: 100%;
    height: 66rpx;
    padding: 0 32rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
