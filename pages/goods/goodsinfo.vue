<template>
  <view v-if="goodsInfo.shop_price">
    <swiper :indicator-dots="true" indicator-active-color="#4395FC" indicator-color="rgba(0,0,0,0.4)" :autoplay="true"
      :interval="3000" :duration="500" class="bannImg" circular="true">
      <swiper-item v-for="(gItem,gIndex) in goodsInfo.goods_img" :key="gIndex" style="width:100%;height:100%">
          <image :src="gItem" style="width:100%;height:100%"></image>
      </swiper-item>
    </swiper>
    <block>
      <view class="goshzsjg" v-if="selSpecificationsInfo.shop_price">￥{{selSpecificationsInfo.shop_price*1}}</view>
      <view class="apgprice" v-else>￥{{goodsInfo.shop_price*1}}</view>
    </block>
    <view class="apgprminc">{{goodsInfo.goods_name}}</view>
    <view class="apgpxuanzBox uni-flex" @click="chzopup = true">
      <view class="fx1">{{i18n.selected}}：
        <text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
          {{sItem.val}}
        </text>
      </view>
      <view>
        <uni-icon type="arrowdown" color="#666666" size="24"></uni-icon>
      </view>
    </view>
    <view class="uni-flex aptoreBox">
      <view class="aptoreimg">
        <image :src="storeInfo.logo" mode=""></image>
      </view>
      <view class="fx1">
        <view class="aptoredmin">{{storeInfo.name}}</view>
        <view class="aptoredsp">
          <text class="text_1">{{storeInfo.storeGoodsNum}}</text>
          <text class="text_2">{{i18n.pieces}} {{i18n.items}}</text>
        </view>
        <view class="aptorelxdh">{{i18n.tel}}：{{storeInfo.phone}}</view>
      </view>
      <navigator class="aptoredpu" :url="'/pages/merchant/mystore?store_id='+goodsInfo.store_id" hover-class="none">
        <text> {{i18n.toStore}}</text>
        <uni-icon type="arrowright" size="25px"></uni-icon>
      </navigator>
    </view>
    <view class="detaildata" v-html="contentDetail">
    </view>

    <!-- 弹窗 s -->
    <view class="goosdupBox" :class="chzopup == true ? 'goosdupBoxActive' : ''">
      <view class="goosdupContHe" :class="chzopup == true ? 'goosdupContHeActve' : ''">
        <view class="goosdupCont">
          <view class="goshzsBox uni-flex">
            <view class="goshzsimg">
              <image :src="goodsInfo.picture" mode=""></image>
            </view>
            <view class="fx1">
              <view class="goshzsjg">
                <block v-if="selSpecificationsInfo.shop_price">
                  ￥{{selSpecificationsInfo.shop_price*1}}
                </block>
                <block v-else>
                  ￥{{goodsInfo.shop_price*1}}
                </block>
              </view>
              <view>
                <block v-if="selSpecificationsInfo.stock">
                  {{i18n.inventory}}：{{selSpecificationsInfo.stock}} {{i18n.pieces}}
                </block>
                <block v-else>
                  {{i18n.inventory}}：{{goodsInfo.stock}} {{i18n.pieces}}
                </block>
              </view>
              <view class="goshzsms">
                 {{i18n.choose}}：
                <text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
                  {{sItem.val}}
                </text>
              </view>
            </view>
            <view class="goshzsgbAn" @click="chzopup = false">
              <uni-icon type="close" color="#333333" size="26"></uni-icon>
            </view>
          </view>
          <view v-for="(sfItem,sfIndex) in specificationsInfo" :key="sfIndex">
            <view class="spuspcTl">{{sfItem.title}}：</view>
            <view class="spuspcOneBox">
              <view class="spuspcOne" v-for="(childItem,childIndex) in sfItem.content" :key="childIndex" @click="gospec(childItem.id,childIndex,sfIndex)"
                :class="{spuspcOneActive:childItem.selected}">{{childItem.val}}</view>
            </view>
          </view>
          <view class="spuspcTl">{{i18n.count}}：</view>
          <view class="spuspcbanr">
            <uni-number-box :min="1" :value="cartConfig.num" @change="selNum"></uni-number-box>
          </view>
        </view>
        <view class="btn-area confirmBox">
          <view class="confirmHe">
            <button formType="submit" class="confirBtn" @click="chzopup = false">{{i18n.comfirm}}</button>
          </view>
        </view>
      </view>
    </view>
    <!-- 弹窗 e -->

    <!-- 底部 s -->
    <view class="godsbtmBox">
      <view class="uni-flex godsbtmHe">
        <view class="fx1">
          <view class="godsbtmdata">
            <image src="/static/images/jind.png"></image>
            <view class="godsbtmtx">
              <navigator :url="'/pages/merchant/mystore?store_id='+goodsInfo.store_id" hover-class="none">{{i18n.store}}</navigator>
            </view>
          </view>
        </view>
        <view class="godsbgwc" @click="addCarts">{{i18n.addCart}}</view>
        <view class="godsbtlhgm" @click="buyNow">{{i18n.buyNow}}</view>
      </view>
    </view>
    <!-- 底部 e -->
  </view>
</template>

<script>
  import uniIcon from '@/components/uni-icon/uni-icon.vue';
  import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
  export default {
    components: {
      uniIcon,
      uniNumberBox
    },
    data() {
      return {
        chzopup: false, //遮罩层
        gConfig: { //商品id
          id: ''
        },
        storeInfo: {}, //商家信息
        goodsInfo: {}, //商品信息
        specificationsInfo: [], //规格信息
        contentDetail: '', //商品详情内容
        specSelected: [], //产品规格
        selSpecificationsInfo: {}, //选中的商品信息
        cartConfig: { //添加购物车请求参数
          id: '',
          num: 1,
          goods_spec: ''
        }
      }
    },
    computed:{
      i18n(){
        return this.$t('goodsinfo');
      }
    },
    onLoad(option) {
      uni.setNavigationBarTitle({
        title:this.$t('navText').g_details
      })
      this.gConfig.id = option.good_id;
      this.cartConfig.id = option.good_id;
    },
    onReady() {
      this.fetchGoodDetail();
    },
    methods: {
      fetchSpecificationsInfo() { //根据选择的规格获取对应的商品信息
        let data = {
          goods_id: this.gConfig.id,
          spec_ids: []
        }
        this.specSelected.forEach(item => {
          data.spec_ids.push(item.id);
        })

        this.$request.post(this.$KPI.shops.specifications, data).then(res => {
          if (res.code === 200 && res.data) {
            this.selSpecificationsInfo = res.data;
          }
        })
      },
      fetchGoodDetail() { //获取商品详情信息
        uni.showLoading({
          title: this.$t('warn').load,
          mask: true
        })
        
        this.$request.get(this.$KPI.shops.goodDetail, this.gConfig).then(res => {
          if (res.code === 200 && res.data !== {}) {
            if (res.data.storeInfo) {
              this.storeInfo = res.data.storeInfo;
            }
            if (res.data.goodsInfo) {
              this.goodsInfo = res.data.goodsInfo;
              if (res.data.goodsInfo.content) {
                this.contentDetail = res.data.goodsInfo.content.replace(/\<img/gi,
                  '<img style="max-width:100%;height:auto"');
              }
            }
            if (res.data.specData) {
              this.specificationsInfo = res.data.specData;
              /* 获取产品规格的初始值*/
              res.data.specData.forEach(item => {
                item.content[0].selected = true;
                this.specSelected.push(item.content[0]);
              })
              /* 获取产品规格的初始值*/
            }
            this.fetchSpecificationsInfo();
          }
          setTimeout(()=>{
            uni.hideLoading();
          },1000)
        })
      },
      gospec(cId, cIndex, pIndex) { //选取规格

        let list = this.specificationsInfo[pIndex].content;

        list.forEach(item => { // 按钮点击切换
          item.id === cId ? this.$set(item, 'selected', true) : this.$set(item, 'selected', false);
        })

        //存储已选择
        // 每次点击按钮 先清空specSelected  再遍历child中selected为true的对象  添加到specSelected数组中
        this.specSelected = [];
        this.specificationsInfo.forEach(item => {
          item.content.forEach(childItem => {
            if (childItem.selected === true) {
              this.specSelected.push(childItem);
            }
          })
        })
        this.fetchSpecificationsInfo();
      },
      selNum(val) { //选择商品数量
        this.cartConfig.num = val;
      },
      addCarts() { //添加购物车
        /*遍历拼接选择的规格id*/
        let num = [];
        this.specSelected.forEach(item => {
          num.push(item.id);
        })
        this.cartConfig.goods_spec = num.join("_");
        /*遍历拼接选择的规格id*/

        this.$request.post(this.$KPI.shops.addCart, this.cartConfig).then(res => {
          if (res.code === 200) {
               uni.showModal({
                 title:this.$t('warn').tipTitle,
                 content:this.$t('warn').addSuccess,
                 cancelText:this.$t('warn').continued,
                 confirmText:this.$t('warn').toCart,
                 success: (res) => {
                   if (res.confirm) {
                     uni.redirectTo({
                       url: '/pages/cart/cartindex'
                     });
                   }
                   if (res.cancel) {
                     uni.navigateBack();
                   }
                 }
               })
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      buyNow() { //立即购买
        this.$request.post(this.$KPI.shops.nowBuy, this.cartConfig).then(res => {
          if (res.code === 200) {
            if (res.data && res.data !== {}) {
              uni.navigateTo({
                url: "/pages/cart/confirmcart?car_id=" + res.data.cart_id
              })
            }
          } else {
            uni.showToast({
              icon: "none",
              title: res.msg
            })
          }
        })
      }
    }
  }
</script>

<style>
  @import url("goodsinfo.css");
  .selected-text {
    margin-right: 16rpx;
  }
</style>
