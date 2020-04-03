<template>
	<view>
		<view class="topsbgydaBox">
			<view class="topsbgyCont">
				<view class="uni-padding-wrap uni-common-mt">
					<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
					 :activeColor="activeColor"></uni-segmented-control>
				</view>
			</view>
		</view>
		<view class="recoeBox" ref="recoeBox">
				<view class="tradparLi uni-flex" v-for="(lItem,lIndex) in listArray" :key="lIndex">
					<view class="tradparLiimg">
						<image src="/static/images/logo3.png" mode=""></image>
					</view>
					<view class="fx1">
						<view class="tradparLitx">{{i18n.count}}&nbsp;{{lItem.num}}&nbsp;&nbsp;&nbsp;{{i18n.surplus}}：{{lItem.stay_num}}</view>
						<view class="tradparLitime">{{lItem.add_time}}</view>
					</view>
					<view class="tradparshuuchu">${{lItem.money}}</view>
          <block v-if="lItem.status === 1 || lItem.status === 2">
            <view class="revocation" @click="revocation(lItem,lIndex)">{{i18n.revocation}}</view>
          </block>
          <view class="status">{{lItem.status_msg}}</view>
				</view>
				<view class="stayBox" v-if="showEmpty">
					<image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
					<view style="color:#FFFFFF">{{i18n.emptyRecord}}</view>
				</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				showEmpty: false,
				stopPull: false,
				items: [this.$t('tradrecord').buy,this.$t('tradrecord').sell],
				current: 0,
				activeColor: '#158DFF',
				styleType: 'text',
				listArray: [], //买入/卖出记录  
				dealConfig: { //记录请求配置
					type:0,
					page: 0,
					size: 10
				}
			}
		},
    computed:{
      i18n(){
        return this.$t('tradrecord');
      }
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').ts_record
      })
    },
		onReady() {
			this.fetchlist();
		},
		onReachBottom() {
			this.loadMore();
		},
		methods: {
			fetchlist() { //获取列表
      /*首次加载,清空数组,重新获取数据*/
        this.stopPull = false;
        this.showEmpty = false;
        this.listArray = [];
        this.dealConfig.page = 0;
      /*首次加载,清空数组,重新获取数据*/
      
      uni.showLoading({
        title:this.$t('warn').load,
        mask: true
      })
      
				this.$request.get(this.$KPI.fireDeal.tradeList,this.dealConfig).then(res => {
					if (res.code === 200) {
						if (res.data && res.data.length === 0) {
							this.showEmpty = true;
						} else {
							this.listArray = res.data;
							this.dealConfig.page++;
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
            setTimeout(() => {
              uni.hideLoading();
            },500)  
				})
			},
			loadMore() { //加载更多
				if (this.stopPull == true) {
					return false;
				} else {
					uni.showLoading({
						title:this.$t('warn').load,
						mask: true
					})
					this.$request.get(this.$KPI.fireDeal.tradeList,this.dealConfig).then(res => {
						if (res.code === 200 ) {
							if (res.data && res.data.length === 0) {
								this.stopPull = true;
                setTimeout(()=>{
                  uni.showToast({
                  	icon:'none',
                  	title:this.$t('warn').pullEnd,
                  	position:"bottom"
                  })
                },800)	
							} else {
								this.listArray = this.listArray.concat(res.data);
								this.dealConfig.page++;
							}
						} else {
							uni.showToast({
								icon: "none",
								title: res.msg
							})
						}
					})
					setTimeout(() => {
						uni.hideLoading();
					},500)
				}
			},
			onClickItem(index) {
				if(this.current !== index) {
            this.current = index;
            this.dealConfig.type = index;
            this.fetchlist();
				}
			},
      revocation(obj,index){ //撤销交易
        let reUrl = '';
        if(this.current === 0){ //买入撤销交易
          reUrl = this.$KPI.fireDeal.revocationBuy;
        }else{  //卖出撤销交易
          reUrl = this.$KPI.fireDeal.revocationSell;
        }
        uni.showModal({
          title:this.$t('warn').tipTitle,
          content:this.$t('warn').askRevocation,
          success:(res) => {
            if (res.confirm) {
              this.$request.post(reUrl,{id:obj.id}).then(res => {
                if(res.code === 200){
                  uni.showToast({
                    icon:'none',
                    title:this.$t('warn').revocationSuccess
                  })
                  this.listArray.splice(index,1);
                }else{
                  uni.showToast({
                    icon:'none',
                    title:res.msg
                  })
                }
              })
            }
          }
        });
      }
		}
	}
</script>

<style scoped>
	page {
		background: #f5f5f5;
	}
  .tradparshuuchu{
    line-height:1.2;
  }
  .tradparLi{
    height:160rpx;
  }
  .revocation{
    position: absolute;
    right:20rpx;
    top:60rpx;
    color:#5077F8;
  } 
  .status{
    position: absolute;
    right:20rpx;
    bottom:0rpx;
    color:#DC4D4D;
  }
</style>
