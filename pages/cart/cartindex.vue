<template>
	<view>
		<view class="spbzhenBox" v-if="shopsList.length !== 0">
			<div class="spbzhen">
				<uni-icon class="i" type="checkbox-filled" color="#aaaaaa" size="18"></uni-icon>
				<text class="text_1">{{i18n.promise}}</text>
			</div>
			<div class="spbzhen">
				<uni-icon class="i" type="checkbox-filled" color="#aaaaaa" size="18"></uni-icon>
				<text class="text_1">{{i18n.choose}}</text>
			</div>
			<div class="spbzhen">
				<uni-icon class="i" type="checkbox-filled" color="#aaaaaa" size="18"></uni-icon>
				<text class="text_1">{{i18n.aftermarket}}</text>
			</div>
		</view>
		<view  v-if="shopsList.length !== 0">
			<view class="shopTlbox">
				<view class="shopTldwei">
					<uni-icon class="i" type="location-filled" color="#888888" size="22"></uni-icon>
					<text class="text_1" v-text="address"></text>
				</view>
				<view class="shopbji" @click="setOpened">{{isOpened ? i18n.edit : i18n.finish}}</view>
			</view>
			<view class="shoplistBoxHe">
				<view v-for="(sItem,sIndex) in shopsList" :key="sIndex">
          <view class="uni-flex shopMsg">
            <image :src="sItem.logo" mode=""  style="width:80rpx;height:80rpx"></image>
            <text v-text="sItem.name"></text> 
          </view>
          <view class="shoplistBox" v-for="(gItem,gIndex) in sItem.goods" :key="gIndex">
             <view class="shopxze">
               <checkbox-group @change="selected(sIndex,gIndex)">
                 	<checkbox :checked="gItem.selected"/>
               </checkbox-group>
             </view>
             <navigator class="sholistImg" :url="'/pages/goods/goodsinfo?good_id='+gItem.goods_id">
               <image :src="gItem.picture" mode="widthFix"></image>
             </navigator>
             <view class="sholistText">
             	<view class="sholistTexttl" v-text="gItem.goods_name"></view>
             	<view class="sholistguige">
             		<text v-text="'￥'+gItem.goods_price"></text> 	
             	</view>
             	<view class="shjgshulBxo">
             		<view class="shjg" v-text="gItem.spec_name"></view>
             		<view><uni-number-box :min="1" :value="gItem.goods_num" @change="selNum($event,sIndex,gIndex)"></uni-number-box></view>
             	</view>
             </view>
          </view>
				</view>
			</view>
			<!-- 底部一 s -->
			<view class="shoppBtmBox">
				<view class="shoppxuan">
          <checkbox-group @change="allSelBtn">
            <checkbox value="true" :checked="allSel"/>{{i18n.selectAll}}
          </checkbox-group>
				</view>
        <block v-if="btmred != true">
            <view class="shoppzji">
            	<text>{{i18n.total}}：</text>
            	<text class="text_1" v-text="'￥'+sumPrice"></text>
            </view>
            <view class="shoppjsuan" @click="goDetaStatb">
            	<text>{{i18n.settlement}}</text>
            	<text class="text_1" v-show="sumNumber != 0">（{{sumNumber}}{{i18n.pieces}}）</text>
            </view>
         </block>
         <view class="btmshchBox" v-else>
           <button class="btmshch" type="primary" @click="delSelBtn">{{i18n.deleted}}</button>
         </view>
			</view>
			<!-- 底部一 e -->
		</view>
    <view class="stayBox" v-if="isEmpty">
    	<image src="/static/images/a024laner_104.png" mode="" style="width:500rpx;height:500rpx"></image>
      <view>
        <view class="stayTips">Nothing at all</view>
        <navigator class="cartBtn" url="/pages/shop/shopindex" open-type="switchTab" hover-class="none">
          {{i18n.empty}}
        </navigator>  
      </view>
    </view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
	export default {
		components: {
			uniIcon,
			uniNumberBox
		},
		data() {
			return { 
        isload:false,
        isEmpty:false,//是否为空
				isOpened:true,
				btmred:false,
        addressInfo:{},//送货地址
        shopsList:[],//购物商家列表
        sumPrice:0,//总金额
        sumNumber:0,//选择的商品数量
        allSel:false//是否全选
			}
		},
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').shopCart
      })
    },
    onReady() {
      this.fetchCarts();
    },
    computed:{
      address(){
          let {province,city,district} = this.addressInfo;
          return province+city+district;
      },
      i18n(){
        return this.$t('carindex');
      }
    },
		methods: {
      fetchCarts(){ //获取购物车列表
        this.$request.get(this.$KPI.shops.carts).then(res => {
          // console.log(res);
          this.isload = true;
          if(res.code === 200){
            if(res.data && res.data != {}){
              if(res.data.list == {} || res.data.list.length == 0){
                this.isEmpty = true;
                this.shopsList = [];
              }else{
                this.shopsList = res.data.list;
                this.sum();
              }
              if(res.data.address_info && res.data.address_info !== {}){
                 this.addressInfo = res.data.address_info;
              }
            }
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      selNum(value,pIndex,cIndex){ //修改数量
       if( this.shopsList[pIndex].goods[cIndex].goods_num == value){
         return false;
       }else{
         /*赋值新的数量*/
          this.shopsList[pIndex].goods[cIndex].goods_num = value;
         /*赋值新的数量*/
        /*获取选择商品,并封装数据通知后端*/
        let {id,selected,goods_num} = this.shopsList[pIndex].goods[cIndex];
        let data = []; 
        let sel = {id:id,
          selected:selected,
          goods_num:goods_num
        } 
        data.push(sel);
        /*获取选择商品,并封装数据通知后端*/
        this.$request.post(this.$KPI.shops.selShops,{data:data}).then(res => {
          if(res.code === 200){
            this.sum();
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
       }
      },
      selected(pIndex,cIndex) { // 选择商品   
        /*显示、取消选中*/
        this.shopsList[pIndex].goods[cIndex].selected = !this.shopsList[pIndex].goods[cIndex].selected;
        /*显示、取消选中*/
        
        /*获取选择商品,并封装数据通知后端*/
        let {id,selected,goods_num} = this.shopsList[pIndex].goods[cIndex];
        let data = []; 
        let sel = {
          id:id,
          selected:selected,
          goods_num:goods_num
        }
        data.push(sel);
        /*获取选择商品,并封装数据通知后端*/
        this.$request.post(this.$KPI.shops.selShops,{data:data}).then(res => {
          if(res.code === 200){
            this.sum();
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      allSelBtn(e){//全选 
        let data = [];
        if(e.detail.value[0]){
          for( let key in this.shopsList){
             this.shopsList[key].goods.forEach(childItem => {
          		 childItem.selected = true;
               let sel={
                 id:childItem.id,
                 selected:childItem.selected,
                 goods_num:childItem.goods_num
               }
               data.push(sel)
          	 })
          }
        }else{
          for( let key in this.shopsList){
             this.shopsList[key].goods.forEach(childItem => {
          		 childItem.selected = false;
               let sel={
                 id:childItem.id,
                 selected:childItem.selected,
                 goods_num:childItem.goods_num
               }
               data.push(sel)
          	 })
          }
        }
        this.$request.post(this.$KPI.shops.selShops,{data:data}).then(res => {
          if(res.code === 200){
            this.sum();
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      delSelBtn(){//删除选中的
        uni.showModal({
          title:this.$t('warn').tipTitle,
          content:this.$t('warn').askDelete,
          confirmText:this.$t('common').comfirm,
          cancelText:this.$t('common').cancel,
          success:(res) => {
            if(res.confirm){
              /*获取需要删除产品的id*/
                  let delId = [];
                  for( let key in this.shopsList){
                     this.shopsList[key].goods.forEach(childItem => {
                      if(childItem.selected){
                        delId.push(childItem.id);
                       }
                     })  
                  }
                /*获取需要删除产品的id*/   
               this.$request.post(this.$KPI.shops.delShops,{id:delId}).then(res => {
                if(res.code === 200){
                  uni.showToast({
                    icon:"loading",
                    title:this.$t('warn').deleteSuccess
                  })
                  this.fetchCarts();
                 }else{
                   uni.showToast({
                     icon:'none',
                     title:res.msg
                   })
                 }
              })
            }
          }
        })  
      },
      sum() {//计算总金额
        this.sumPrice = 0;	
        this.sumNumber = 0;
        /*遍历对象,计算总金额*/
        for( let key in this.shopsList){
           this.shopsList[key].goods.forEach(childItem => {
      			 if(childItem.selected){
               this.sumNumber++;
      				 this.sumPrice += childItem.goods_num*childItem.goods_price;
      			 } 
      		 })
        }
        /*遍历对象,计算总金额*/
      },
			setOpened() {
				this.isOpened = !this.isOpened;
				this.btmred = !this.btmred;
			},
			// 页面跳转
			goDetaStatb() {
        if(this.sumNumber === 0){
          uni.showToast({
            icon:"none",
            title:this.$t('warn').chooseOne
          })
        }else{
          uni.navigateTo({
          	url: '/pages/cart/confirmcart'
          })
        }
			}
		}
	}
</script>

<style>
	@import url("cartindex.css");
	.shopMsg{
    padding:0 20rpx;
    align-items:center;
  }
  .stayBox{
    padding-top:20%;
  }
  .stayTips{
    padding:30rpx 0;
    font-size:36rpx;
    font-weight:700;
  }
  .cartBtn{
    width:300rpx;
    height:80rpx;
    line-height:80rpx;
    margin:auto;
    background: burlywood;
    border-radius:40rpx;
    font-size:32rpx;
    box-shadow: 0 16rpx 6rpx indianred;
  }
</style>
