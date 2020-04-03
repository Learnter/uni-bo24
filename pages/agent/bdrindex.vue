<template>
	<view class="content">
		<view class="bdrdatopBox">
			<view class="uni-flex bdrdatopCont">
				<view class="fx1">
					<view class="bdrdatoptx">{{i18n.pushTotal}}</view>
					<view class="bdrdatoptx">{{teamInfo.tjr_num}}</view>
				</view>
				<view class="fx1">
					<view class="bdrdatoptx">{{i18n.teamTotal}}</view>
					<view class="bdrdatoptx">{{teamInfo.team_num}}</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="bdrdanrbox" @scrolltolower="loadMore">
			<view class="bdrlist" v-for="(tItem,tIndex) in teamList" :key="tIndex" >
				<view class="uni-flex">
					<view class="bdrlistimg">
						<image :src="tItem.level_logo" mode=""></image>
					</view>
					<view class="bdrlistmc fx1">{{i18n.name}}：{{tItem.username}}</view>
					<view class="bdrlistjib">
						<text class="col_1">{{tItem.level}}</text>						
					</view>
				</view>
				<view class="bdrlistxx">{{i18n.account}}：{{tItem.account}}</view>
				<view class="uni-flex">
					<view class="fx1 bdrlistid">ID：{{tItem.user_id}}</view>
					<view class="bdrlistid">{{i18n.teamNum}}：{{tItem.team_num}}</view>
				</view>
			</view>
      <view class="stayBox" v-if="showEmpty">
      	<image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
      	<view style="color:#FFFFFF">{{i18n.emptyTeam}}</view>
      </view>
		</scroll-view>
	</view>
</template>

<script>
  export default{
    data(){
      return{
        showEmpty:false,
        stopPull:false,
        teamInfo:{},
        teamList:[],
        teamConfig:{
          page:0,
          size:10
        }
      }
    },     
    computed:{
      i18n(){
        return this.$t('bdrindex');
      }
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').community
      })
    },
    onReady() {
      this.fetchTeamInfo();
      this.fetchTeamList();
    },
    methods:{
      fetchTeamInfo(){ //获取团队信息
        this.$request.get(this.$KPI.community.cmtInfo).then(res => {
          if(res.code === 200 && res.data && res.data !== {}){
            this.teamInfo = res.data;
          }
        });
      },
      fetchTeamList(){ //获取团队列表
        uni.showLoading({
          title:this.$t('warn').load,
          mask:true
        })
        this.$request.get(this.$KPI.community.cmtList,this.teamConfig).then(res => {
          if(res.code === 200){
             if(res.data && res.data.length === 0){
               this.showEmpty = true;
             }else{
               this.teamList = res.data;
               this.teamConfig.page++;
             }
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
          setTimeout(() =>{
            uni.hideLoading();
          },1000)
        });
      },
      // listenBottom(e){ //监听是否滚动到底
      //   /*元素滚动距离*/
      //   let scrollTop = e.target.scrollTop;
      //   /*元素可视高度*/
      //   let clientHeight = e.target.clientHeight;
      //   /*元素总高度*/
      //   let scrollHeight = e.target.scrollHeight;
      //   uni.showModal({
      //     content:scrollTop
      //   })
      //   if(scrollTop + clientHeight >= scrollHeight){
      //     this.loadMore();
      //   }
      // },
      loadMore(){ //加载更多
        if(this.stopPull){
          return false;
        }else{
          uni.showLoading({
            title:this.$t('warn').load,
            mask:true
          })
          this.$request.get(this.$KPI.community.cmtList,this.teamConfig).then(res => {
            if(res.code === 200){
              if(res.data && res.data.length === 0){
                this.stopPull = true;
                uni.showToast({
                  icon:'none',
                  title:this.$t('warn').pullEnd,
                  position:'bottom'
                })
              }else{
                this.teamList = this.teamList.concat(res.data);
                this.teamConfig.page++;
              }
            }else{
              uni.showToast({
                icon:'none',
                title:res.msg
              })
            }
            setTimeout(() =>{
              uni.hideLoading();
            },1000)
          });
        }
      }
    }
  }
</script>

<style>
	@import url("bdrindex.css");
  .content{
    width:100%;
    height:100%;
    background: #158DFF;
  }
  .bdrdanrbox{
    border-radius: 40rpx 40rpx 0 0;
    height:calc(100% - 152rpx);
    background:#1283F2;
    padding-top: 0;
  }
  .bdrlist{
    margin-top:30rpx;
  }
  .stayBox {
  		text-align: center;
  		color:#333333;
  		padding-top:50%;
  	}
</style>
