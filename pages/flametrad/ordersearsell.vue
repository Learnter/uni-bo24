<template>
  <view>
    <view class="bdrdatopBox">
      <view class="ssordsetlBox">
        <view class="uni-flex">
          <view class="fx1 ssordsetl" @click="mobilebtn">{{i18n.tel}}<image src="/static/images/a024laner_83.png" mode="widthFix"
              class="zxia"></image>
          </view>
          <view class="fx1 ssordsetl" @click="pricebtn">{{i18n.p_range}}<image src="/static/images/a024laner_83.png" mode="widthFix"
              class="zxia"></image>
          </view>
          <view class="fx1 ssordsetl" @click="amountbtn">{{i18n.a_range}}<image src="/static/images/a024laner_83.png" mode="widthFix"
              class="zxia"></image>
          </view>
        </view>
        <!-- 手机搜索弹窗 s -->
        <view class="ssordupBox" :class="mobileup == true ? 'ssordupBoxActive' : ''">
          <view class="aiysbBox">
            <form>
              <view class="uni-flex">
                <view class="fx1 aiysbinput">
                  <input type="number" maxlength="11" v-model="sellConfig.account" :placeholder="holder.tel"
                    placeholder-style="color:#C4D8D8;" placeholder-class="uni-ellipsis"/>
                </view>
                <button type="primary" class="aiysbtn" @click="searchPhone">
                  <image src="/static/images/a024laner_81.png" mode="widthFix"></image>
                </button>
              </view>
            </form>
          </view>
        </view>
        <!-- 手机搜索弹窗 e -->
        <!-- 价格区间弹窗 s -->
        <view class="ssordupBox" :class="priceup == true ? 'ssordupBoxActive' : ''">
          <view class="aiysbBox">
            <form>
              <view class="uni-flex">
                <view class="fx1 aiysbinput">
                  <input type="number" v-model="sellConfig.low" :placeholder="holder.fl_price" placeholder-style="color:#C4D8D8;" />
                </view>
                <view class="zhizhi">{{common.to}}</view>
                <view class="fx1 aiysbinput">
                  <input type="number" v-model="sellConfig.hight" :placeholder="holder.pk_price"  placeholder-style="color:#C4D8D8;" />
                </view>
                <button type="primary" class="aiysbtn" @click="priceSearch">
                  <image src="/static/images/a024laner_81.png" mode="widthFix"></image>
                </button>
              </view>
            </form>
          </view>
        </view>
        <!-- 价格区间弹窗 e -->
        <!-- 数量范围弹窗 s -->
        <view class="ssordupBox" :class="amountup == true ? 'ssordupBoxActive' : ''">
          <view class="aiysbBox">
            <form>
              <view class="uni-flex">
                <view class="amounthe fx1" v-for="(lItem,lIndex) in list" :key="lIndex" @click="goslfw(lItem,lIndex)"
                  :class="slfw == lIndex ? 'amountheActive' : ''">{{lItem}}</view>
                <button type="primary" class="aiysbtn" @click="numSearch">
                  <image src="/static/images/a024laner_81.png" mode="widthFix"></image>
                </button>
              </view>
            </form>
          </view>
        </view>
        <!-- 数量范围弹窗 e -->
      </view>
      <view class="bdrdatopzw"></view>
    </view>

    <!-- 列表 s -->
    <view class="billistlbBox">
      <view class="billistlbHe uni-flex" v-for="(item,index) in sellList" :key="index">
        <view class="fx1">
          <view class="uni-flex">
            <view class="billismcc">{{item.uid}}</view>
            <view class="fx1 billishk" v-if="item.pay_info">
              <image src="/static/images/2019_a006_41.png" v-show="item.pay_info.zfb" mode=""></image>
              <image src="/static/images/2019_a006_38.png" v-show="item.pay_info.wx" mode=""></image>
              <image src="/static/images/2019_a006_40.png" v-show="item.pay_info.bank" mode=""></image>
            </view>
          </view>
          <view class="billisjine">
            <text class="text_1">{{i18n.count}}：{{item.stay_num}}</text>
            <text class="text_2">{{i18n.amount}}：{{item.price}}</text>
          </view>
          <view class="billisjine">
            <text class="text_1">{{i18n.recent}}：{{item.lately}}</text>
            <text class="text_2">{{i18n.dealNum}}：{{item.deal_num}}</text>
          </view>
        </view>
        <view class="chshanczan" @click="sellcsanup(item)">{{i18n.buy}}<image src="/static/images/a024laner_83.png" mode="widthFix"
            class="zxia"></image>
        </view>
      </view>
      <view class="stayBox" v-if="showEmpty">
        <image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
        <view style="color:#FFFFFF">{{i18n.emptyOrder}}</view>
      </view>
    </view>
    <!-- 列表 e -->


    <!-- 购买弹窗 s -->
    <view class="chzopupBox" :class="sellup == true ? 'chzopupBoxActive' : ''">
      <view class="sellpopupupcontBox">
        <view class="sellpopupupcont">
          <form>
            <view class="sellpoptlmc">{{i18n.buyFire}}</view>
            <view class="uni-flex sellpopshe">
              <view class="fx1">
                <view class="sellpoptshu">{{buyInfo.price}}</view>
                <view class="sellpopttx">{{i18n.price}}</view>
              </view>
              <view class="fx1">
                <view class="sellpoptshu">{{buyInfo.stay_num}}</view>
                <view class="sellpopttx">{{i18n.count}}</view>
              </view>
            </view>
            <view class="seltishiBox uni-flex">
              <image src="/static/images/2019a056_105.png" mode="widthFix"></image>
              <view class="seltishi fx1">{{i18n.checkInfo}}</view>
            </view>
            <view class="uni-flex paczinputBox">
              <view class="paczinptl">{{i18n.count}}</view>
              <view class="fx1 paczinput">
                <input type="number" v-model="buyConfig.num" :placeholder="holder.count" />
              </view>
            </view>
            <view class="uni-flex paczinputBox">
              <view class="paczinptl">{{i18n.tradePwd}}</view>
              <view class="fx1 paczinput">
                <input type="password" v-model="buyConfig.secpwd" placeholder-class="uni-ellipsis" :placeholder="holder.dealPwd" />
              </view>
            </view>
            <view class="uni-flex confirBtnBox">
              <button class="fx1 confirqux" type="primary" @click="sellcancel">{{common.cancel}}</button>
              <view class="paczgxx"></view>
              <button class="fx1 confirBtn" type="primary" @click="buySubmit">{{common.comfirm}}</button>
            </view>
          </form>
        </view>
      </view>
    </view>
    <!-- 购买弹窗 e -->
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
        showEmpty: false,
        stopPull: false,
        sellup: false,
        mobileup: false,
        priceup: false,
        amountup: false,
        slfw: 0,
        list: ['1-50', '51-100', '101-以上'],
        sellConfig: { //卖家列表搜索配置
          page: 0,
          size: 10,
          account: '', //手机号
          low: '', //最低价格
          hight: '', //最高价格
          num: '' //数量
        },
        sellList: [],
        buyInfo: {}, //购买火种信息
        buyConfig: { //购买请求配置
          id: '',
          num: '',
          secpwd: ''
        },
      }
    },
    computed:{
      i18n(){
        return this.$t('ordersearsell');
      },
      common(){
        return this.$t('common');
      },
      holder(){
        return this.$t('holder');
      }
    },
    onLoad() {
       uni.setNavigationBarTitle({
          title:this.$t('navText').saleSearch
        })
    },
    onReady() {
      this.fetchPayList();
    },
    onReachBottom() {
      this.loadMore();
    },
    methods: {
      fetchPayList() { //获取卖家列表
        this.showEmpty = false;
        this.stopPull = false;
        
        uni.showLoading({
          title: this.$t('warn').load,
          mask: true
        })
        
        this.$request.get(this.$KPI.fireDeal.sellList, this.sellConfig).then(res => {
          if (res.code === 200 && res.data) {
            if (res.data.length === 0) {
              this.sellList = [];
              this.showEmpty = true;
            } else {
              this.sellList = res.data;
              this.sellConfig.page++;
            }
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          } 
          setTimeout(() => {
            uni.hideLoading();
          }, 500)
        })
      },
      loadMore() { //加载更多
        if (this.stopPull == true) {
          return false;
        } else {
          uni.showLoading({
            title: this.$t('warn').load,
            mask: true
          })
          this.$request.get(this.$KPI.fireDeal.sellList, this.sellConfig).then(res => {
            if (res.code === 200 && res.data) {
              if (res.data.length === 0) {
                this.stopPull = true;
                uni.showToast({
                  icon: 'none',
                  title: this.$t('warn').pullEnd,
                  position: "bottom"
                })
              } else {
                this.sellList = this.sellList.concat(res.data);
                this.sellConfig.page++;
              }
            } else {
              uni.showToast({
                icon: "none",
                title: res.msg
              })
            }
          })
          setTimeout(() => {
            uni.hideLoading();
          }, 500)
        }
      },
      // 手机搜索 s
      mobilebtn() {
        this.priceup = false;
        this.amountup = false;
        if (this.mobileup == false) {
          this.mobileup = true;
        } else {
          this.mobileup = false;
        }
      },
      searchPhone() { //手机号搜索
        this.sellConfig.page = 0; //重新获取数据
        this.sellConfig.low = ''; //清除其他搜索条件
        this.sellConfig.hight = '';
        this.sellConfig.num = '';
        this.slfw = 0;
        this.fetchPayList();
        this.mobilebtn();
      },
      // 手机搜索 e

      // 价格区间 s
      pricebtn() {
        this.mobileup = false;
        this.amountup = false;
        if (this.priceup == false) {
          this.priceup = true;
        } else {
          this.priceup = false;
        }
      },
      priceSearch() { //价格区间搜索
        this.sellConfig.page = 0; //重新获取数据
        this.sellConfig.account = '' //清除其他搜索条件
        this.sellConfig.num = '';
        this.slfw = 0;
        this.fetchPayList();
        this.pricebtn();
      },
      // 价格区间 e
      // 数量范围 s
      goslfw(num, index) { //选择范围
        this.slfw = index;
        this.sellConfig.num = num;
      },
      amountbtn() {
        this.priceup = false;
        this.mobileup = false;
        if (this.amountup == false) {
          this.amountup = true;
        } else {
          this.amountup = false;
        }
      },
      numSearch() { //数量搜索
        if (!this.sellConfig.num) { //初始化赋值num
          this.sellConfig.num = this.list[0];
        }
        this.sellConfig.account = '' //清除其他搜索条件
        this.sellConfig.low = '';
        this.sellConfig.hight = '';
        this.sellConfig.page = 0; //重新获取数据
        this.fetchPayList();
        this.amountbtn();
      },
      // 数量范围 e

      // 购买弹窗 s
      sellcsanup(obj) { // 显示购买弹窗
        this.sellup = true;
        this.buyInfo = obj;
        this.buyConfig.id = obj.id;
      },
      sellcancel() { //关闭购买弹窗
        this.sellup = false;
        this.buyConfig.num = ''; //清除配置信息
        this.buyConfig.secpwd = '';
      },
      buySubmit() { //提交购买
        let {id,num,secpwd} = this.buyConfig;
        if (num.trim().length === 0) {
          uni.showToast({
            icon: 'none',
            title: this.$t('warn').emptyNumber
          })
          return false;
        } else if (secpwd.trim().length === 0) {
          uni.showToast({
            icon: 'none',
            title: this.$t('warn').dealPwdEmpty
          })
          return false;
        }
        this.$request.post(this.$KPI.fireDeal.sellAction, this.buyConfig).then(res => {
          // console.log(res);
          if (res.code === 200) {
            uni.showToast({
              icon: 'success',
              title: this.$t('warn').buySuccess
            })
            this.sellup = false; //关闭弹窗
            this.buyConfig.num = ''; //清除配置信息
            this.buyConfig.secpwd = '';
            this.sellConfig.page = 0; //重新获取新数据
            this.fetchPayList();
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        });
      }
      // 购买弹窗 e
    }
  }
</script>

<style>
  @import url("billcss.css");

  .ssordsetlBox {
    text-align: center;
    background: #1283F2;
    padding: 20rpx 0rpx;
    margin-bottom: 50rpx;
    position: relative;
    border-bottom: 1px solid rgba(211, 240, 240, 0.1);
  }

  .ssordsetl {
    color: #ffffff;
    height: 50rpx;
    line-height: 50rpx;
  }

  .ssordsetl .zxia {
    width: 14rpx;
    height: 9rpx;
    position: relative;
    top: -10rpx;
    left: 10rpx;
  }

  .ssordupBox {
    position: fixed;
    left: 0px;
    top: 90rpx;
    right: 0px;
    bottom: 0px;
    width: 100%;
    min-height: 200rpx;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    overflow: auto;
    visibility: hidden;
    opacity: 0;
    filter: alpha(opacity=0);
    transition: All 0.15s ease-in-out;
    -webkit-transition: All 0.1s ease-in-out;
    -moz-transition: All 0.1s ease-in-out;
    -o-transition: All 0.1s ease-in-out;
  }

  /* #ifdef H5 */
  .ssordupBox {
    position: fixed;
    left: 0px;
    top: 180rpx;
    right: 0px;
    bottom: 0px;
    width: 100%;
    min-height: 200rpx;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    overflow: auto;
    visibility: hidden;
    opacity: 0;
    filter: alpha(opacity=0);
    transition: All 0.15s ease-in-out;
    -webkit-transition: All 0.1s ease-in-out;
    -moz-transition: All 0.1s ease-in-out;
    -o-transition: All 0.1s ease-in-out;
  }

  /* #endif */

  .ssordupBoxActive {
    visibility: visible;
    opacity: 1;
    filter: alpha(opacity=100);
  }

  .aiysbBox {
    background: #1283F2;
    padding: 30rpx;
  }

  .aiysbinput input {
    border: 1px solid rgba(211, 240, 240, 0.1);
    color: #D3F0F0;
    font-size: 28rpx;
    height: 80rpx;
    line-height: 80rpx;
    padding: 0rpx 20rpx;
    border-radius: 6rpx;
    text-align: left;
  }

  .aiysbtn {
    border: none;
    padding: 0rpx 20rpx;
    margin: 0rpx 0rpx 0rpx 30rpx;
    line-height: 80rpx;
  }

  .aiysbtn:after {
    border: none;
  }

  .aiysbtn image {
    width: 40rpx;
    height: 40rpx;
  }

  .zhizhi {
    color: #D3F0F0;
    line-height: 80rpx;
    padding: 0rpx 15rpx;
  }

  .amounthe {
    border: 1px solid rgba(211, 240, 240, 0.1);
    color: #A5D6FA;
    font-size: 28rpx;
    height: 80rpx;
    line-height: 80rpx;
    padding: 0rpx 20rpx;
    border-radius: 6rpx;
    margin-right: 30rpx;
  }

  .amountheActive {
    color: #ffffff;
    border: 1px solid #D3F0F0;
  }
</style>
