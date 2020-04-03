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
    <view class="recoeBox">
      <navigator v-for="(lItem,lIndex) in logsList" :key="lIndex" :url="'/pages/transferzz/transferDetails?logId='+lItem.id">
        <view class="tradparLi uni-flex">
          <view class="tradparLiimg">
            <image :src="lItem.logo" mode=""></image>
          </view>
          <view class="fx1">
            <view class="tradparLitx">{{lItem.change_msg}}</view>
            <view class="tradparLitime">{{lItem.add_time}}</view>
          </view>
          <view class="tradparshuu">{{lItem.to_money}}</view>
        </view>
      </navigator>
      <view class="stayBox" v-if="showEmpty == true">
        <image src="/static/images/by_24.png" mode="" style="width:300upx;height:200upx;"></image>
        <view>{{i18n.logEmpty}}</view>
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
        current: 0,
        activeColor: '#158DFF',
        styleType: 'text',
        logConfig: {
          type: 0,
          page: 0,
          size: 10
        },
        logsList: []
      }
    },
    computed:{
      i18n(){
        return this.$t('huobiTransferLog');
      },
      items(){
        let {all,into,out} = this.$t('huobiTransferLog');
        let list = [];
        list.push(all,out,into);
        return list;
      }
    },
    onLoad() {
      uni.setNavigationBarTitle({
          title:this.$t('navText').hz_t_record
      })
      this.fetchLogs();
    },
    onReachBottom() { //上拉加载
      this.loadMore();
    },
    onPullDownRefresh() { //下拉刷新
      this.pullRefresh();
    },
    methods: {
      fetchLogs() { //获取日志列表
        /*首次加载,清空数组,重新获取数据*/
        this.showEmpty = false;
        this.stopPull = false;
        this.logsList = [];
        this.logConfig.page = 0;
        /*首次加载,清空数组,重新获取数据*/
        
        uni.showLoading({
          title: this.$t('warn').load,
          mask: true
        })
        
        this.$request.get(this.$KPI.transfer.moneyLogs, this.logConfig).then(res => {
          if (res.code === 200 && res.data) {
            if (res.data.length === 0) {
              this.showEmpty = true;
            } else {
              this.logsList = res.data;
              this.logConfig.page++;
            }
          } else {
            uni.showToast({
              icon: "none",
              title: res.msg
            })
          }
          setTimeout(() => {
            uni.hideLoading();
          }, 500)
        })
      },
      loadMore() { //加载更多
        if (this.stopPull == true) {
          return false;
        } else {
          uni.showLoading({
            title: this.$t('warn').load,
            mask: true
          })
          this.$request.get(this.$KPI.transfer.moneyLogs, this.logConfig).then(res => {
            if (res.code === 200) {
              if (res.data && res.data.length === 0) {
                this.stopPull = true;
                setTimeout(() => {
                  uni.showToast({
                    icon: 'none',
                    title: this.$t('warn').pullEnd,
                    position: 'bottom',
                    duration: 2000
                  })
                }, 1000)
                return false;
              } else {
                this.logsList = this.logsList.concat(res.data);
                this.logConfig.page++;
              }
            } else {
              uni.showToast({
                icon: "none",
                title: res.msg
              })
            }
            setTimeout(() => {
              uni.hideLoading();
            }, 1000)
          })
        }
      },
      pullRefresh() { //下拉刷新
        /*下拉刷新,清空数组,重新获取数据*/
        this.showEmpty = false;
        this.stopPull = false;
        this.logsList = [];
        this.logConfig.page = 0;
        /*下拉刷新,清空数组,重新获取数据*/
        this.$request.get(this.$KPI.transfer.moneyLogs, this.logConfig).then(res => {
          if (res.code === 200) {
            if (res.data && res.data.length === 0) {
              this.showEmpty = true;
            } else {
              this.logsList = res.data;
              this.logConfig.page++;
            }
            setTimeout(() => {
              uni.showToast({
                icon: "none",
                title: this.$t('warn').refreshSuccess
              })
            }, 500);
          } else {
            uni.showToast({
              icon: "none",
              title: res.msg
            })
          }
          setTimeout(() => {
            uni.stopPullDownRefresh();
          }, 500)
        })
      },
      onClickItem(index, ev) { //切换导航
        if (this.current !== index) {
          this.current = index;
          switch (index) {
            case 0:
              this.logConfig.type = 0;
              break;
            case 1:
              this.logConfig.type = 1;
              break;
            case 2:
              this.logConfig.type = 2;
              break;
          }
        }
      }
    },
    watch: {
      'logConfig.type': 'fetchLogs'
    }
  }
</script>

<style>
  page {
    background: #f5f5f5;
  }

  .stayBox {
    text-align: center;
    color: #333333;
    padding-top: 50%;
  }
</style>
