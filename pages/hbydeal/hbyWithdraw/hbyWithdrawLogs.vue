
 <template>
 	<view class="recoeBox">
     <view class="">
       <view class="tradparLi uni-flex" v-for="(item,index) in logList" :key="index">
         <view class="tradparLiimg">  
         	<image src="/static/images/logo3.png" mode=""></image>
         </view>
       	<view class="fx1">
       		<view class="tradparLitx">{{i18n.withdrawal}}</view>
       		<view class="tradparLitime">{{item.add_time}}</view>
          <view class="tradparLitime">{{i18n.address}}：{{item.user_address}}</view>
          <view class="tradparLitime" style="color:#CD5C5C">{{i18n.status}}：{{item.status}}</view>
       	</view>
       	<view class="tradparshuuchu">{{item.add_num}}</view>
       </view>
     </view>
     <view class="stayBox" v-if="showEmpty == true">
     	<image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
     	<view>{{i18n.empty}}</view>
     </view>
 	</view>
 </template>

<script>
  export default{
    data(){
      return{
        showEmpty:false,
        stopPull:false,
        logList:[],
        logConfig:{
          page:0,
          size:10
        }
      }
    },
    computed:{
      i18n(){
        return this.$t('hwlDetails');
      }
    },
    onLoad(){
    uni.setNavigationBarTitle({
      title:this.$t('navText').hExtract
    })
    },
    onReady(){
      this.fetchLogs();
    },
    onReachBottom(){ //上拉加载
      this.loadMore();
    },
    methods:{
      fetchLogs(){
        uni.showLoading({
          title:this.$t('warn').load,
          mask:true
        })
        this.$request.get(this.$KPI.HbyDeal.withdrawlogs).then(res => {
          if(res.code === 200){
            if(res.data && Object.keys(res.data).length !== 0){
              this.logList = res.data; 
              this.logConfig.page++;
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
        if(this.stopPull == true){
          return false;
        }else{
          uni.showLoading({
            title:this.$t('warn').load,
            mask:true
          })
          this.$request.get(this.$KPI.HbyDeal.withdrawlogs,this.logConfig).then( res => {
             if(res.code === 200 && res.data){
               if(res.data.length === 0){
                   this.stopPull = true;
                   setTimeout(()=> {
                     uni.showToast({
                       icon:'none',
                      title:this.$t('warn').pullEnd,
                       position:'bottom',
                       duration:2000
                     })
                   },1000)
                   return false;
               }else{
                   this.logList =  this.logList.concat(res.data);
                   this.logConfig.page++;
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
      }
    }
  }
</script>

<style scoped>
  page,.recoeBox{
    width:100%;
    height:100%;
    box-sizing:border-box;
  	background: #f5f5f5;
  }
  .tradparLiimg{
    width:120rpx;
    height:120rpx;
  }
  .tradparshuuchu{
    color:#007AFF;
  }
  .stayBox{
    padding-top:50%;
  }
  
</style>
