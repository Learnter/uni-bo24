<template>
  <view class="page-body">
    <scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
      <view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" :class="index==categoryActive?'active':''"
        v-for="(item,index) in categoryList">
        {{item.name}}
      </view>
    </scroll-view>
    <scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" @scrolltolower="lowerScroll"
      :style="'height:'+height+'px'" scroll-with-animation>
      <navigator :id="index===0?'first':''" class="selllistBox" :url="'/pages/goods/goodsinfo?good_id='+item.goods_id"
        v-for="(item,index) in subCategoryList" :key="index" hover-class="none">
        <view class="selllistimg" v-if="item">
          <image lazy-load="true" :src="item.picture"></image>
        </view>
        <view class="selllistwz" v-if="item">
          <view class="spanplmcc">{{item.goods_name}}</view>
          <!-- <view class="spanplmfk">{{item.sales_sum}}人已付款</view> -->
          <view class="selllistjg">￥{{item.shop_price*1}}</view>
        </view>
      </navigator>
      <view class="stayBox" v-if="showEmpty == true">
        <image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
        <view>{{i18n.noGoods}}</view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        showEmpty: false,
        stopPull: false,
        categoryList: [],
        subCategoryList: [],
        height: 0,
        categoryActive: 0,
        scrollTop: 0,
        scrollHeight: 0,
        cateConfig: {
          cat_id: '',
          page: 0,
          size: 10
        }
      }
    },
    computed:{
      i18n(){
        return this.$t('store');
      }
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').g_category
      })
      this.height = uni.getSystemInfoSync().windowHeight;
    },
    onReady() {
      this.fetchLeftList();
      this.fetchCategory();
    },
    methods: {
      fetchLeftList() { //获取左边分类列表
        this.$request.get(this.$KPI.shops.leftCategory).then(res => {
          if (res.code === 200 && res.data && res.data != []) {
            this.categoryList = res.data;
          }
        })
      },
      fetchCategory() { //获取右边商品列表
        this.showEmpty = false;
        this.stopPull = false;
        this.$request.get(this.$KPI.shops.rightGoods, this.cateConfig).then(res => {
          if (res.code === 200) {
            if (res.data && res.data.length !== 0) {
              this.subCategoryList = res.data;
              this.cateConfig.page++;
            } else {
              this.showEmpty = true;
              this.subCategoryList = [];
            }
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      scroll(e) {
        this.scrollHeight = e.detail.scrollHeight;
      },
      categoryClickMain(categroy, index) { //切换左边导航栏
        this.categoryActive = index;
        this.cateConfig.page = 0; //获取初始化的10条数据
        this.cateConfig.cat_id = categroy.cat_id; //获取导航栏id
        this.scrollTop = -this.scrollHeight * index;
      },
      lowerScroll() { //触发scrollView底部刷新
        if (this.stopPull == true) {
          return false;
        } else {
          this.$request.get(this.$KPI.shops.rightGoods, this.cateConfig).then(res => {
            if (res.code === 200 && res.data) {
              if (res.data.length === 0) {
                this.stopPull = true;
              } else {
                this.subCategoryList = this.subCategoryList.concat(res.data);
                this.cateConfig.page++;
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
    },
    watch: {
      'cateConfig.cat_id': 'fetchCategory'
    }
  }
</script>

<style>
  @import url("shoplist.css");
  .stayBox{
    padding-top:50%;
  }
</style>
