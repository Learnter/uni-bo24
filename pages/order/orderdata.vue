<template>
	<view>
		<view class="orddaTop">{{orderDetail.status}}</view>
		<view class="dandcanBox">
			<view class="dandcanTl">
				<image :src="orderDetail.store_logo" mode=""></image>
				<view class="dandcanTltx">{{orderDetail.store_id}}</view>
			</view>
			<view class="dandcaList" v-for="(gItem,gIndex) in orderDetail.goods" :key="gIndex">
				<view class="dandcaLiimg"><image :src="gItem.picture" mode=""></image></view>
				<view class="dandcaLiCont">
					<view class="dandcaLitl">{{gItem.goods_name}}</view>
					<view class="shuljge">
						<view class="danshu">X{{gItem.goods_num}}</view>
						<view class="danjie">￥{{gItem.shop_price}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="huodongBox">
			<view class="huodongTl">{{i18n.info}}</view>	
			<view class="bazfpsfBox">
				<view class="bazfpsfitl">{{i18n.orderNum}}</view>
				<view class="bazfpsfths">{{orderDetail.order_sn}}</view>		
			</view>	
			<view class="bazfpsfBox">
				<view class="bazfpsfitl">{{i18n.time}}</view>
				<view class="bazfpsfths">{{orderDetail.add_time}}</view>			
			</view>			
			<view class="bazfpsfBox">
				<view class="bazfpsfitl">{{i18n.consignee}}</view>
				<view class="bazfpsfths">{{orderDetail.uid}}</view>			
			</view>	
			<view class="bazfpsfBox">
				<view class="bazfpsfitl">{{i18n.tell}}</view>
				<view class="bazfpsfths">{{orderDetail.mobile}}</view>			
			</view>	
      <view class="bazfpsfBox">
      	<view class="bazfpsfitl">{{i18n.address}}</view>
      	<view class="bazfpsfths">{{orderDetail.address}}</view>		
      </view>		      
			<view class="bazfpsfBox">
				<view class="bazfpsfitl">{{i18n.sum}}</view>
				<!-- <view class="bazfpsfths">已优惠￥8.00</view> -->
				<view class="xiajit_1">{{i18n.subtotal}}</view>
				<view class="xiajit_2">￥{{orderDetail.order_amount}}</view>
			</view>										
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	export default {
		data() {
			return {
				parent:{
          order_id:null
        },
        orderDetail:{}
			}
		},
    computed:{
      i18n(){
        return this.$t('orderdata');
      }
    },
		components: {
			uniIcon
		},
    onLoad(option){ //父订单的id
      this.whichLanguage('订单详情','ORDER DETAILS');
      this.parent.order_id = option.parentId;
    },
    onReady(){
     this.fetchDetail();
    },
    methods:{
      fetchDetail(){
        this.$request.get(this.$KPI.shops.orderDetail,this.parent).then( res => {
           // console.log(res);
           if(res.code === 200 ){
             if(res.data &&  Object.keys(res.data).length !== 0){
               this.orderDetail = res.data;
             } 
           }else{
             uni.showToast({
               icon:'none',
               title:'res.msg'
             })
           }
        })
      }
    }
	}
	
</script>

<style>
	@import url("orderdata.css");
	
</style>
