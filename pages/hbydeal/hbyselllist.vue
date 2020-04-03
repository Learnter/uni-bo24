<template>
	<view>
		<view class="recoeBox">
			<view class="bvbnbnvBox" v-for="(lItem,lIndex) in logsList" :key="lIndex">
				<view class="uni-flex">
					<view class="tradparLiimg">
						<image src="/static/images/logo3.png" mode=""></image>
					</view>
					<view class="fx1">
						<view class="tradpazta">{{lItem.status}}</view>
						<view class="tradparLitime">{{lItem.add_time}}</view>
					</view>
					<view class="tradparshuu">{{lItem.num}}</view>
				</view>
        <block v-for="(tItem,tIndex) in lItem.trade_list" :key="tIndex">
           <navigator :url="'/pages/hbydeal/hbyselldata?parent_id='+tItem.id" class="bvbnbnvzi">
           	<view class="uni-flex gbxqlinkBox">
           		<view class="fx1 gbxqlink">{{i18n.match}}HBY：{{tItem.num}}<image src="/static/images/zy.png" mode="" class="zyou"></image>
           		</view>
              <view class="dakdajs">{{i18n.countdown}}：
                <block v-if="tItem.days!=0&&tItem.hours!=0&&tItem.minutes!=0&&tItem.seconds!=0">
                  <uni-countdown :day="tItem.days" :hour="tItem.hours" :minute="tItem.minutes" :second="tItem.seconds" border-color="#ffffff"/>
                </block>
                <text v-else>{{i18n.stop}}</text>
              </view>
           	</view>
           	<view class="uni-flex">
           		<view class="fx1 tradparLitime">{{i18n.status}}：{{tItem.is_type_msg}}</view>
           		<view class="tradparLitime">{{i18n.amount}}：¥ {{tItem.money}}</view>
           	</view>
           </navigator>
        </block>
			</view>
		</view>
    <view class="stayBox" v-if="showEmpty == true">
    	<image src="/static/images/by_24.png" style="width:300upx;height:200upx;"></image>
    	<view>{{i18n.logEmpty}}</view>
    </view>
	</view>
</template>
<script>
 export default {   
  data(){
	return {
	  showEmpty:false,
	  stopPull:false,
	  logsList:[],//日志列表
	  reConfig:{ //请求配置
		page:0,
		size:10
	  }
	}
  },
  computed:{
    i18n(){
      return this.$t('hbyselllist');
    }
  },
  onLoad(){
    uni.setNavigationBarTitle({
      title:this.$t('navText').hSellRecord
    })
	  this.fetchLogs();
  },
  onReachBottom(){ //上拉加载
	  this.loadMore();
  },
  onPullDownRefresh() { //下拉刷新
    this.pullRefresh();
  },
  methods:{
    fetchLogs(){
      this.showEmpty = false;
      this.$request.get(this.$KPI.HbyDeal.sellList, this.reConfig).then(res => {
      // console.log(res);
       if(res.code === 200 && res.data){
         if(res.data.length === 0){
        this.showEmpty = true;
         }else{
         this.logsList = res.data;
         this.reConfig.page++;
         }
       }else{
         uni.showToast({
         icon:'none',
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
        title: this.$t('warn').load,
        mask:true
        })
        this.$request.get(this.$KPI.HbyDeal.sellList, this.reConfig).then( res => {
         if(res.code === 200 && res.data){
           if(res.data.length === 0){
             this.stopPull = true;
             setTimeout(()=> {
             uni.showToast({
               icon:'none',
               title: this.$t('warn').pullEnd,
               position:'bottom'
             })
             },1000)
             return false;
           }else{
             this.logsList =  this.logsList.concat(res.data);
             this.reConfig.page++;
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
    pullRefresh(){ //下拉刷新
       this.reConfig.page = 0;
       this.showEmpty = false;
       this.stopPull = false;
       this.$request.get(this.$KPI.HbyDeal.sellList,this.reConfig).then( res => {
         if(res.code === 200 && res.data ){
              if( res.data.length > 0){
                this.logsList = res.data;
                this.reConfig.page++;
              }else{
                this.logsList = [];
                this.showEmpty = true;
              }   
              setTimeout(()=>{
                 uni.showToast({
                  icon:"success",
                  title:this.$t('warn').refreshSuccess
                 })
              },800)  
         }else{
           uni.showToast({
             icon:"none",
             title:res.msg
           })
         }
         setTimeout(()=>{
           uni.stopPullDownRefresh();
         },500)
      })
    }
  } 
}
</script>

<style>
	page {
		background: #f5f5f5;
	}

	.tradpazta {
		color: #FF0000;
	}

	.bvbnbnvBox {
		background: #ffffff;
		border-radius: 4rpx;
		margin-bottom: 20rpx;
		padding: 20rpx;
	}

	.bvbnbnvzi {
		border: 1px solid #eeeeee;
		margin-top: 20rpx;
		padding: 15rpx;
		border-radius: 4rpx;
	}

	.gbxqlink .zyou {
		width: 10rpx;
		height: 14rpx;
		position: relative;
		top: -2px;
		left: 4px;
	}

	.dakdajs {
		color: #CBA508;
		font-size: 24rpx;
	}

	.gbxqlinkBox {
		padding-bottom: 10rpx;
	}
</style>
