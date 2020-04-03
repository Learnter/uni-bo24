<template>
	<view>
		<view class="notictitl">{{noticeDetail.title}}</view>
		<view class="noticttime">{{noticeDetail.add_time}}</view>
		<view class="noticdata" v-html="showContent">
		</view>
	</view>
</template>

<script>
  export default{
    data(){
      return{
        notice:{
          id:''
        },
        noticeDetail:{},
        showContent:''
      }
    },
    onLoad(option){
      uni.setNavigationBarTitle({
        title:this.$t('navText').noticeDetails
      })
      this.notice.id = option.parentId;
    },
    onReady(){
      this.fetchNoticeDetail();
    },
    methods:{
      fetchNoticeDetail(){
        this.$request.get(this.$KPI.notice.noticeDetail,this.notice).then(res => {
          if(res.code === 200 && res.data && res.data !== {}){
            this.noticeDetail = res.data;
            this.showContent = res.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"');
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

<style scoped>
	.notictitl {
		padding: 40rpx;
		color: #000000;
		font-size: 40rpx;
	}
	.noticttime {
		color: #999999;
		font-size: 26rpx;
		padding:0rpx 30rpx;
		text-align: right;
	}
	.noticdata {
		padding: 30rpx;
		color: #666666;
		font-size: 26rpx;
    overflow: hidden;
	}
	
	.noticdata view,
	.noticdata p,
	.noticdata div {
		color: #666666;
		font-size: 26rpx;
	}
  
  .noticdata p{
    width:100%;
    height:auto;
    overflow:hidden;
  }
	
/* 	/deep/.noticdata img{
       max-width:100% !important;
	} */
	
	.noticdata image{
      width:100% !important;
	}
</style>
