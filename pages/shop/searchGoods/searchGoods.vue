<template>
	<view>
		<!-- 商品列表 s -->
		<view class="spanplibBox clearfix">
			<view class="spanplibHe"  v-for="(gItem,gIndex) in goods" :key="gIndex">
				<view class="spanplibCont" @click="goodlink(gItem)">
					<view class="spanplibimg"><image lazy-load="true" :src="gItem.picture"  mode="widthFix"></image></view>
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
    	<image src="/static/images/a024laner_105.png" mode="" style="width:500upx;height:500upx;"></image>
    	<view>{{common.unrelatedGoods}}</view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stopPull:false,//暂停上拉加载
        showEmpty:false,
        goods:[],//商品列表
        goodConfig:{
          kwd:'',
          page:0,
          size:10
        }
			}
		},
    computed:{
      common(){
        return this.$t('common');
      }
    },
    onLoad(option){
      uni.setNavigationBarTitle({
        title:this.$t('navText').searchGoods
      })
      this.goodConfig.kwd = option.kwd;
    },
    onReady() {
      this.fetchGoods();
    },
    onReachBottom() { //触底上拉刷新
     this.loadMore();
    },
		methods: {
			fetchGoods(){ //获取商品列表
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
			      if(res.code === 200){
			         if(res.data && res.data.length === 0){
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
 @import url("../shopindex.css");
 .spanplibimg image{
   width:100%;
   height:100% !important;
   border-radius:10rpx;
 }
</style>
