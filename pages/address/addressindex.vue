<template>
	<view class="">
		<view class="confimTopContHe">
			<radio-group name="radio" @change="radioChange">
				<view class="confimTopCont" v-for="(aItem,aIndex) in addressList" :key="aIndex">
					<view class="shopxze">
						   <radio :value="aItem.id+''" :checked="aItem.default"/>
					</view>
					<view class="toponameanddhBox">
						<view class="toponameanddh">
							<view class="toponame">{{aItem.username}}</view>
							<view class="topodh">{{aItem.mobile}}</view>
						</view>
						<view class="topoweizhBox">
							<!-- <text class="text_1">公司</text> -->
							<text>{{aItem.province}}{{aItem.city}}{{aItem.district}}{{aItem.address}}</text>
						</view>
					</view>
					<view class="locatiright">
						<view @click="delAddress(aItem,aIndex)"><uni-icon class="i" type="trash" color="#666666" size="20"></uni-icon></view>
						<navigator class="locationaa" :url="'/pages/address/editAddress?parentId='+aItem.id">{{i18n.edit}}</navigator>
					</view>
				</view>
			</radio-group>
      <view class="stayBox" v-if="showEmpty">
      	<image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
      	<view>{{i18n.empty}}</view>
      </view>
		</view>
		<view class="tjialocatAn" @click="tjialocatAn">{{i18n.add}}</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	export default {
		components: {
			uniIcon
		},
    data(){
      return{
        showEmpty:false,
        stopPull:false,
        addressList:[],
        reConfig:{
          page:0,
          size:10
        }
      }
    },
    computed:{
      i18n(){
        return this.$t('addressindex');
      }
    },
    onLoad(){
      uni.setNavigationBarTitle({
        title:this.$t('navText').sp_address
      })
    },
    onReady(){
      this.fetchAdrList();
    },
    onReachBottom() {
      this.loadMore();
    },
		methods: {
      fetchAdrList(){
        this.showEmpty = false;
        this.$request.get(this.$KPI.address.addressList,this.reConfig).then(res => {
          // console.log(res.data);
          if(res.code === 200 && res.data){
            if(res.data.length === 0){
              this.showEmpty = true;
            }else{
              this.addressList = res.data;
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
        if(this.stopPull){
          return false;
        }else{
          uni.showLoading({
            title:this.$t('warn').load,
            mask:true
          })
          this.$request.get(this.$KPI.address.addressList,this.reConfig).then( res => {
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
                   this.addressList =  this.addressList.concat(res.data);
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
      radioChange(e){ //更改默认地址
        this.$request.post(this.$KPI.address.setDefault,{id:e.detail.value}).then(res => {
          if(res.code === 200){
            uni.showToast({
              icon:'success',
              title:this.$t('warn').setUpSuccess,
            })
            this.reConfig.page = 0;
            this.addressList = [];
            this.fetchAdrList();
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      delAddress(obj,index){ //删除地址
        uni.showModal({
          title:this.$t('warn').tipTitle,
          content:this.$t('warn').askDelete,
          confirmText:this.$t('common').comfirm,
          cancelText:this.$t('common').cancel,
          success:(res)=>{
            if(res.confirm){
               this.$request.post(this.$KPI.address.delAddress,{id:obj.id}).then(res => {
                 if(res.code === 200){
                   uni.showToast({
                     icon:'success',
                     title:this.$t('warn').deleteSuccess
                   })
                   this.addressList.splice(index,1);
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
			tjialocatAn(){ //添加地址
				uni.navigateTo({
					url:'addaddress'
				})
			}
		}
	}
	
</script>

<style>
	@import url("addressindex.css");
</style>
