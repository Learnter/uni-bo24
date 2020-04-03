<template>
	<view>
        <uni-nav-bar color="#333333" :fixed="false">
        	<view class="input-view">
				<view class="ewerqweico">
					<uni-icon type="search" size="22" color="#666666"  class="i"></uni-icon>
				</view>
				<view class="fx1">
					<input confirm-type="search"  @confirm="confirm" class="input" type="text" v-model="kwd" :placeholder="holder.searchKeyword"/>
				</view>
        	</view>
        	<block slot="right" @click="back">
        		<text style="font-size:26upx;color: #ffffff;">{{common.cancel}}</text>
        	</block>
        </uni-nav-bar>
		<view class="history-box">
			<view>
				<view class="history-title">
					<text>{{common.searchHistory}}</text>
					<text class="uni-icon uni-icon-trash" @click="delSearchLog"></text>
				</view>
				<view v-if="kwdCache.length > 0">
					<view class="history-content">
						<view class="history-item" v-for="(item,index) in kwdCache" :key="index">
							<view @click="clickSearch(item)">{{item}}</view>
						</view>
					</view>
				</view>
				<view v-else>
					<view class="uni-loadmore">{{common.emptyHistory}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon
		},
		data() {
			return {
				kwd: '',
				kwdCache: []
			}
		},
    computed:{
      holder(){
        return this.$t('holder');
      },
      common(){
        return this.$t('common');
      }
    },
    onReady(){
     let caches  = this.$catchs.get('search_kwd');
      if(caches){
        this.kwdCache = caches;
      }
    },
		methods:{
      /*确认搜索*/
			confirm(e) {
        if(e.target.value.trim().length == 0){
          return false;
        }
				this.getTransferShopInfo();
			},
      /*确认搜索*/
      
      /*存储搜索关键字,跳转店铺列表*/
			getTransferShopInfo() {
        for(var i in this.kwdCache) {
          if(this.kwdCache[i] == this.kwd) {
            this.kwdCache.splice(i, 1);
          }
        }  
        this.kwdCache.unshift(this.kwd);
         
        this.$catchs.put('search_kwd', this.kwdCache);
        
        setTimeout(()=>{
          uni.navigateTo({
            url:"/pages/shop/searchGoods/searchGoods?kwd="+this.kwd
          })
        },500)
			},
      /*存储搜索关键字,跳转店铺列表*/
      
      /*点击历史记录按钮*/
			clickSearch(obj){
				this.kwd = this.searchValue = obj;
				this.getTransferShopInfo();
			},
      /*点击历史记录按钮*/
      
      /*清空搜索历史记录*/
      delSearchLog(id){
      	uni.showModal({
      		title: this.$t('warn').tipTitle,
      		content: this.$t('warn').askDelete,
      		success: (res) => {
      			if (res.confirm) {
      				this.$catchs.remove('search_kwd');
      				this.kwdCache = [];
      			}
      		}
      	})
      },
     /*清空搜索历史记录*/
     
     //取消搜索
     back() {
     	uni.navigateBack({
     		delta: 1
     	})
     }
    //取消搜索 
		}
	}
	
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
	}
	view {
		font-size: 28upx;
		line-height: inherit
	}
	.example {
		padding: 0 30upx 30upx
	}
	
	.example-title {
		font-size: 32upx;
		line-height: 32upx;
		color: #777;
		margin: 40upx 25upx;
		position: relative
	}
	
	.example .example-title {
		margin: 40upx 0
	}
	
	.example-body {
		padding: 0 40upx
	}
	
	.uni-common-mt {
		color: #7a7e83;
		font-size: 28upx;
		padding: 30upx;
	}
	
	.title {
		font-size: 15px;
		line-height: 20px;
		color: #333333;
		padding: 15px;
	}
	
	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-left: 8px;
		white-space: nowrap;
	}
	
	.input-view {
		width: 92%;
		display: flex;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 4%;
		flex-wrap: nowrap;
		margin: 7px 0;
	}
	
	.input-view .uni-icon {
		line-height: 30px !important;
	}
	.ewerqweico {
		line-height: 60rpx;
		position: relative;
		top:-10rpx;
	}
	.ewerqweico .i {
		
	}
	
	.input-view .input {
		height: 30px;
		line-height: 30px;
		width: 94%;
		padding: 0 3%;
	}
	.uninavbaheaderleft {
		width:0px !important;
	}
	.history-title {
		display: flex;
		justify-content: space-between;
		padding: 20upx 30upx;
		padding-bottom: 0;
		font-size: 34upx;
		color: #333;
	}
	.history-title .uni-icon {
		font-size: 40upx;
	}
	.history-content {
		display: flex;
		flex-wrap: wrap;
		padding: 15upx;
	}
	.history-item {
		padding: 4upx 35upx;
		border: 1px #f1f1f1 solid;
		background: #fff;
		border-radius: 50upx;
		margin: 12upx 10upx;
		color: #999;
	}
	.history-list-box {
		/* margin: 10upx 0; */
	}
	.history-list-item {
		padding: 30upx 0;
		margin-left: 30upx;
		border-bottom: 1px #EEEEEE solid;
		font-size: 28upx;
	}
	
	.no-data {
		text-align: center;
		color: #999;
		margin: 100upx;
	}
	
	.findcontBox {
		padding:10upx 20upx 10upx 20upx;
	}
	.findconnerBox {
		padding:10upx 0upx;
	}
	.findconnerhz {
		display: flex;
		padding:10upx;
		box-shadow: 0upx 0upx 20upx #dddddd;
	}
	.findcerhzimgrm {
		width:220upx;
		height:150upx;
		overflow: hidden;
		border:1px solid #eeeeee;
		position: relative;
	}
	.findcerhzimgrm image {
		width:100%;
		height:100%;
	}
	.firmtisib {
		position: absolute;
		top:0upx;
		left:0upx;
		background:#639FF7;
		padding: 0upx 6upx;
		font-size:26upx;
		color:#ffffff;
		height:40upx;
		line-height: 40upx;
	}
	.findconnerhztx {
		padding:0upx 0upx 0upx 20upx;
		flex: 1;
	}
	
	.dconnerhztxtl {
		color:#666666;
		font-size: 30upx;
	}
	.dconnerhztxtlrm {
		color:#333333;
		font-size: 30upx;
	}
	.dconnerhztxzjinrm {
		color:#F00000;
		font-size: 30upx;
		display: inline-block;
		margin-left:10upx;
		line-height:46upx;
	}
	.dconnerhcazuo {
		display: flex;
	}
	.nerhcazuolyan {
		flex: 1;
	}
	.nerhcazuolyantx {
		color:#999999;
		font-size:24upx;
		line-height:46upx;
		width:280upx;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
	}
	.dconnerhyouhdf {
		display: flex;
	}	
	.dconnerhyouh {
		flex: 1;
	}
	.dconnerhyouh .text_1{
		flex: 1;
		color:#4C4C4C;
		background:#DADADA;
		font-size:24upx;
		display: inline-block;
		margin:10upx 10upx 0upx 0upx;
		padding:0upx 12upx;
		border-radius: 4upx;
	}
	.dconnerquxao {
		color:#FBA81F;
		white-space: nowrap;
	}
</style>
