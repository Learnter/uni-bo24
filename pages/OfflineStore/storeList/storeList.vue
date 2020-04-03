<template>
	<view>
		<!--商家推荐-->
		<view class="">
		  <navigator :url="'/pages/OfflineStore/storeDetail/storeDetail?store_id='+item.store_id" hover-class="none" class="recommendList uni-flex" v-for="(item,index) in lists" :key="index">
		    <view class="rlImg" >
		      <image :src="item.logo" style="width:100%;height:100%;"></image>
		    </view>
		    <view class="uni-flex-item rlRight">
		       <view class="rlrow rlrow_1">{{item.name}}</view>
           <view class="">
             <view class="rlbottom">{{i18n.province}}：{{item.address_large.split('-')[0]}}</view>
             <view class="rlbottom">{{i18n.city}}：{{item.address_large.split('-')[1]}}</view>
             <view class="rlbottom">{{i18n.district}}：{{item.address_large.split('-')[2]}}</view>
             <view class="rlbottom uni-ellipsis">{{i18n.address}}：{{item.address_large.split('-')[3]}}</view>         
           </view>
		    </view>
		  </navigator>
		</view>
		<!--商家推荐-->
    
    <!--无相关店铺-->
    <view class="stayBox" v-if="showEmpty == true">
      <image src="/static/images/a024laner_116.png"></image>
      <view class="cartBtn uni-ellipsis">{{i18n.empty_store}}</view>
    </view>
     <!--无相关店铺-->
	</view>
</template>

<script>
  import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		data() {
			return {
        showEmpty:false,
        stopPull:false,
				lists:[],
        reConfig:{
          page:0,
          size:10,
          kwd:''
        }
			}
		},
    computed:{
      i18n(){
        return this.$t('OfflineStore');
      }
    },
    onLoad(option){
      uni.setNavigationBarTitle({
        title:this.$t('navText').ol_store
      })
      if(option.kwd){
        this.reConfig.kwd = option.kwd;
      }
    },
    onReady(){
      this.fetchLists();
    },
    onReachBottom(){
      this.loadMore();
    },
		methods: {
			fetchLists(){
        uni.showLoading({
          mask:true,
          title:this.$t('warn').load
        })
			 this.$request.get(this.$KPI.lineStore.lists,this.reConfig).then(res => {
			   if(res.code === 200){
			     if(res.data && Object.keys(res.data).length !== 0){
			       this.lists = res.data;
             this.reConfig.page++;
			     }else{
             this.showEmpty = true;
           }
			   }else{
			     uni.showToast({
			       icon:'none',
			       title:res.msg
			     })
			   }
         setTimeout(()=>{
            uni.hideLoading();
         },1000)
			 })
			},
      loadMore(){ //加载更多
        if(this.stopPull){
          return false;
        }else{
          uni.showLoading({
            mask:true,
            title:this.$t('warn').load
          })
          this.$request.get(this.$KPI.lineStore.lists,this.reConfig).then(res => {
            if(res.code === 200){
              if( res.data && Object.keys(res.data).length=== 0){
                this.stopPull = true;
                uni.showToast({
                  icon:'none',
                  title:this.$t('warn').pullEnd,
                  position:'bottom'
                })
              }else{
                this.lists = this.lists.concat(res.data);
                this.reConfig.page++;
              }
            }else{
              uni.showToast({
                icon:'none',
                title:res.msg
              })
            }
            setTimeout(()=>{
               uni.hideLoading();
            },1000)
          })
        }
      }
		},
    components:{
      uniRate
    }
	}
</script>

<style>
  /*商家推荐*/
  .recommendHead{
    padding:20rpx;
    justify-content:space-between;
    align-items:center;
    position:relative;
  }
 
  .rheadText{
    border-left: 6rpx solid cadetblue;
    padding-left: 10rpx;
    font-size: 30rpx;
    font-weight: 700;
  }
  
  .rheadMore{
    color:#C0C0C0;
  }
  
  .recommendList{
    padding:16rpx 20rpx;
    border-top:1rpx solid #EFF0F2;
  }
  .rlImg{
    width:200rpx;
    height:200rpx;
    padding:10rpx;
    flex-shrink:0;
  }
  
  .rlRight{
    overflow: hidden;
    margin-left:10rpx;
  }
  
  .rlrow{
    line-height:1.5;
  }
  
  .rlrow_1{
    font-weight:600;
    font-size:36rpx;
  }
  
  .rlbottom{
    line-height:40rpx;
  }
  
  .rlbottom text{
    padding:0 10rpx;
    border-right:4rpx solid #C2C2C2;
  }
  
  .rlbottom text:last-child{
    padding:0 10rpx;
    border-right:none;
  }
  /*商家推荐*/
  .cartBtn{
    width:350rpx;
    height:70rpx;
    line-height:70rpx;
    margin:auto;
    background: burlywood;
    border-radius:40rpx;
    font-size:32rpx;
    box-shadow: 0 16rpx 6rpx indianred;
  }
</style>
