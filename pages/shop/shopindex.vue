<template>
	<view>
		<view class="homeTopBaBa">
			<view class="homeTopHe">
				<view class="homeTop">
					<navigator class="homeTopLogo" url="shoplist"><image src="/static/images/scicon_1.png" mode=""></image></navigator>
					<view class="homedssplink">
						<navigator class="edssplinkzi" url="/pages/user/searchpag" hover-class="none">
							<uni-icon class="i" type="search" color="#ffffff" size="22"></uni-icon>
							<text class="text_1">{{i18n.searchhold}}</text>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		<!-- 轮播图 s -->
		<view class="shangclbbBox">
			<view class="shangclbb">
				<swiper autoplay="true" indicator-dots="true" indicator-color="#aaaaaa" indicator-active-color="#ffffff" circular="true"
				 style="height: 250upx;">
					<swiper-item v-for="(sItem,sIndex) in swipers" :key="sIndex">
						<image  :src="sItem.ad_img" style="height:250upx;width:100%;" />
					</swiper-item>
				</swiper>
			</view>
			<image src="/static/images/zzzc.png" mode="" class="zzcimg"></image>
		</view>
		<!-- 轮播图 e -->
		
		<view class="setNavCont clearfix">
			<navigator class="setNav" url="shoplist" hover-class="none">
				<image src="/static/images/scicon_2.png" mode=""></image>
				<view class="setNavtx">{{i18n.category}}</view>
			</navigator>				
			<navigator class="setNav" url="odform" hover-class="none">
				<image src="/static/images/scicon_3.png" mode=""></image>
				<view class="setNavtx">{{i18n.myOrder}}</view>
			</navigator>				
			<navigator class="setNav" url="../cart/cartindex" hover-class="none">
				<image src="/static/images/scicon_4.png" mode=""></image>
				<view class="setNavtx">{{i18n.shopCart}}</view>
			</navigator>				
			<navigator class="setNav" url="../address/addressindex" hover-class="none">
				<image src="/static/images/scicon_5.png" mode=""></image>
				<view class="setNavtx">{{i18n.shopAddress}}</view>
			</navigator>				
		</view>
		
		<!-- 商品列表 s -->
		<view class="spanplibBox clearfix">
			<view class="spanplibHe"  v-for="(gItem,gIndex) in goods" :key="gIndex">
				<view class="spanplibCont" @click="goodlink(gItem)">
					<view class="spanplibimg"><image :src="gItem.picture"  mode="widthFix"></image></view>
					<view class="spanplmdaboc">
						<view class="spanplmcc">{{gItem.goods_name}}</view>
						<view class="spanplmjg">￥{{gItem.shop_price*1}}</view>
						<!-- <view class="spanplmfk">{{gItem.sales_sum}}人已付款</view> -->
					</view>				
				</view>
			</view>
		</view>
		<!-- 商品列表 e -->
    
    <view class="stayBox" v-if="showEmpty == true">
    	<image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
    	<view>{{i18n.noGoods}}</view>
    </view>
		
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	export default {
		data() {
			return {	
        stopPull:false,//暂停上拉加载
        showEmpty:false,
				swipers:[],// 轮播图 
        goods:[],//商品列表
        goodConfig:{
          page:0,
          size:6
        }
			}
		},
		components: {
			uniIcon
		},
    computed:{
      i18n(){
        return this.$t('store');
      }
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').mall
      })
    },
    onReady(){
      this.fetchSwipers();
      this.fetchGoods();
    },
    onReachBottom() { //触底上拉刷新
     this.loadMore();
    },
		methods: {		
			 fetchSwipers(){ //获取轮播图列表
			  this.$request.get(this.$KPI.common.swiper,{type:'shop_index'}).then( res => {
			    if(res.code === 200){
            if(res.data && Object.keys(res.data).length !== 0){
              this.swipers = res.data;
            } 
			    }else{
			      uni.showToast({
              icon:'none',
              title:res.msg
            })
			    }
			  })
       },
        fetchGoods(){ //获取商品列表
          uni.showLoading({
            mask:true,
            title:this.$t('warn').load
          })
          this.$request.get(this.$KPI.shops.goods,this.goodConfig).then( res => {
            if(res.code === 200 && res.data){
               if(res.data.length === 0){
                 this.showEmpty = true;
               }else{
                 this.goods = res.data;
                 this.goodConfig.page++;
               }
            }else{
               uni.showToast({
                icon:"none",
                title:res.msg
              })
            }
            setTimeout(()=>{
               uni.hideLoading();
            },1000)
          })
        },
        loadMore(){ //加载更多
          if(this.stopPull == true){
            return false;
          }else{
            uni.showLoading({
              mask:true,
              title:this.$t('warn').load
            })
            this.$request.get(this.$KPI.shops.goods,this.goodConfig).then( res => {
              if(res.code === 200 && res.data){
                 if(res.data.length === 0){
                   this.stopPull = true;
                   setTimeout(()=> {
                      uni.showToast({
                        icon:'none',
                        title:this.$t('warn').pullEnd,
                        position:"bottom",
                        duration:2000
                      })
                   },1000)
                   return false;
                 }else{
                   this.goods = this.goods.concat(res.data);
                   this.goodConfig.page++;
                 }
              }else{
                 uni.showToast({
                  icon:"none",
                  title:res.msg
                })
              }
              setTimeout(()=>{
                 uni.hideLoading();
              },1000)
            })
          }
        },
        goodlink(obj){
          uni.navigateTo({
            url:'/pages/goods/goodsinfo?good_id='+obj.goods_id
          })
        }
	   }
	}
</script>

<style>
	@import url("shopindex.css");
  .stayBox{
    padding:10%;
  }
  .spanplibimg image{
    width:100%;
    height:100% !important;
    border-radius:10rpx;
  }
</style>
