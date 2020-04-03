<template>
	<view class="notlistBox">
		<view class="notlist" v-for="(nItem,nIndex) in noticeList" :key="nIndex" @click="notdataan(nItem)">
			<view class="uni-flex">
				<view class="fx1">{{nItem.title}}</view>
				<view class="notctime">{{nItem.add_time}}</view>
			</view>
			<view class="notccont">{{nItem.describe_msg}}</view>
		</view>
    <view class="stayBox" v-if="showEmpty">
    	<image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
    	<view>{{common.logEmpty}}</view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        showEmpty:false,
        stopPull:false,
				noticeList:[],
        noticeConfig:{
          type:2,
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
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').platformNotice
      })
    },
		onReady() {
		  this.fetchNoticeList();
		},
    onReachBottom(){
      this.loadMore();
    },
		methods: {
      fetchNoticeList(){ //获取公告列表
        this.showEmpty = false;
        this.$request.get(this.$KPI.notice.noticeList,this.noticeConfig).then(res => {
          // console.log(res);
          if(res.code === 200){
            if(res.data && res.data.length === 0){
              this.showEmpty = true;
            }else{
              this.noticeList = res.data;
              this.noticeConfig.page++;
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
        if(this.stopPull){
          return false;
        }else{
          uni.showLoading({
            title:this.$t('warn').load,
            mask:true
          })
          this.$request.get(this.$KPI.notice.noticeList,this.noticeConfig).then(res => {
            if(res.code === 200 && res.data ){
              if(res.data.length === 0){
                this.stopPull = true;
                uni.showToast({
                  icon:'none',
                  title:this.$t('warn').pullEnd,
                  position:'bottom'
                })
              }else{
                this.noticeList = this.noticeList.concat(res.data);
                this.noticeConfig.page++;
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
      },
			notdataan(obj){
				uni.navigateTo({
					url: 'noticedata?parentId='+obj.id
				});
			}
		}
	}
</script>

<style>
	@import url("noticeindex.css");
  .stayBox {
  		text-align: center;
  		color:#333333;
  		padding-top:50%;
  	}
</style>
