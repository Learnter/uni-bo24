<template>
  <view class="content">
    <view class="noticeDetaBox">
      <view class="noticeDetaTitle" v-text="details.title"></view>
      <!-- <view class="noticeDetaTime" v-text="details.add_time"></view> -->
      <view class="noticeDetaCont" v-html="showContent"></view>
    </view>
  </view>
</template>
<script>
  export default {

  	data() {
  		return { 
         detailConfig:{//详情请求配置
           id:''
         },
         details:{},//详情信息
         showContent:'',//详情内容
  		}
  	},
    onLoad(option) {
      uni.setNavigationBarTitle({
        title:this.$t('navText').cm_cl_details
      })
      this.detailConfig.id = option.parent_id; 
    },
    onReady() {
      this.fetchDetail();
    },
  	methods: {
      fetchDetail(){ //获取详情信息
        this.$request.get(this.$KPI.commercial.details,this.detailConfig).then(res => {
          if(res.code === 200){
            if(res.data && Object.keys(res.data).length !== 0){
              this.details = res.data;
              if(res.data.content){
                 this.showContent = res.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"');
              }
            }
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      }
  	}
  }
</script>
<style>
  .noticeDetaBox{
    padding: 20px;
    word-break: break-all;
    color: #111111;
    background: #ffffff;
  }
  .noticeDetaTitle{
    text-align: center;
    font-size: 0.9em;
    color: #111111;
    padding-bottom: 16rpx;
    border-bottom: 1rpx solid #EDEDED;
  }
  .noticeDetaCont{
    font-size: 0.8em;
    line-height: 50rpx;
    overflow: hidden;
    width: 100%;
  }
  .noticeDetaTime{
    text-align: center;
    font-size: 0.8em;
    color: #333333;
    padding: 16rpx 4rpx;
    border-bottom: 1rpx solid #EDEDED;
    margin-bottom: 20rpx;
  }
</style>
