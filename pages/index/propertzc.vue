<template>
  <view>
    <view class="propertopBox">
      <view class="propertpCont">
        <view class="propzsshu">{{millInfo.userBlock*1 || 0}}{{millInfo.userBlockName}}</view>
        <view class="propzsshums">≈￥{{millInfo.userBlockCny || 0}}</view>
        <view class="propzsshucdh">（1HBY = {{millInfo.blockNowPrice || 0}}￥）</view>
      </view>
      <view class="uni-flex proptopLinkBox">
        <!-- <navigator url="/pages/hbydeal/hbydeal" class="proptopLink fx1" hover-class="none">{{millInfo.userBlockName}}</navigator> -->
        <view class="proptopLink fx1" @tap="temporaryOpen">{{millInfo.userBlockName}}</view>
        <view class="proptopLgx"></view>
         <view class="proptopLink fx1" @tap="temporaryOpen">{{millInfo.userMoneyName}}</view>
        <!-- <navigator url="/pages/flametrad/paybill" class="proptopLink fx1" hover-class="none">{{millInfo.userMoneyName}}</navigator> -->
      </view>
      <image src="/pages/static/images/zzzc.png" mode="" class="zzcimg"></image>
    </view>
    <view class="proplibBoxHe">

      <view class="qiun-columns">
        <view class="qiun-charts">
          <view class="qiun-charts">
            <canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchend="touchEndLineA"></canvas>
          </view>
        </view>
      </view>

      <view class="proplibBox" v-if="millChild.length !== 0">
        <view class="proplibtl uni-flex">
          <view class="proplibtlwz fx1">{{i18n.serial}}</view>
          <view class="proplibtlwz fx1">{{i18n.dayYield}}</view>
          <view class="proplibtlwz fx1">{{i18n.sumYield}}</view>
          <view class="proplibtlwz fx1">{{i18n.status}}</view>
        </view>
        <view class="proplibCont uni-flex" v-for="(cItem,cIndex) in millChild" :key="cIndex">
          <view class="fx1 proplibContzi">{{cItem.number}}</view>
          <view class="fx1 proplibContzi">{{cItem.last_dividend_num}}</view>
          <view class="fx1 proplibContzi">{{cItem.dividend_num}}</view>
          <view class="fx1 proplibContzi">{{cItem.status}}</view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import uCharts from '@/components/u-charts/u-charts.js';
  var _self;
  var canvaLineA = null;

  export default {
    data() {
      return {
        cWidth: '',
        cHeight: '',
        pixelRatio: 1,
        millInfo: {
          userBlock: '',
          userBlockCny: '',
          blockNowPrice: '',
          userBlockName: '',
          userMoneyName: ''
        },
        millChild: [],
        chartList: [], //折线图数据
        min_price: '', //y轴最大价格
        max_price: '', //y轴最小价格
        columns: 0, //x轴显示的列数
      }
    },
    computed:{
      i18n(){
        return this.$t('C2C');
      }
    },
    onLoad() {
      _self = this;
      this.cWidth = uni.upx2px(750);
      this.cHeight = uni.upx2px(450);
      this.fetchChart();
      this.fetchMills();
    },
    onPullDownRefresh() { //下拉刷新
      this.fetchMills();
      this.fetchChart();
    },
    methods: {
      showLineA(canvasId, chartData) {
        canvaLineA = new uCharts({
          $this: _self,
          canvasId: canvasId,
          type: 'line',
          fontSize: 11,
          legend: { //隐藏x轴下的分组
            show: false
          },
          dataLabel: true,
          dataPointShape: true,
          background: '#ffffff',
          pixelRatio: _self.pixelRatio,
          categories: chartData.categories,
          series: chartData.series,
          animation: true,
          xAxis: {
            disableGrid: false,
            type: 'grid',
            gridType: 'dash',
            itemCount: this.columns,
            scrollShow: true,
            scrollAlign: 'left',
            scrollBackgroundColor: '#F7F7FF',
            scrollColor: '#DEE7F7',
          },
          yAxis: {
            //disabled:true
            gridType: 'dash',
            splitNumber: 5,
            min: this.min_price,
            max: this.max_price,
            format: (val) => {
              return val * 1
            }
          },
          width: _self.cWidth * _self.pixelRatio,
          height: _self.cHeight * _self.pixelRatio,
          extra: {
            lineStyle: 'straight'
          },
        });
      },
      touchEndLineA(e) {
        canvaLineA.scrollEnd(e);
        //下面是toolTip事件，如果滚动后不需要显示，可不填写
        canvaLineA.showToolTip(e, {
          format: function(item, category) {
            return category + ' ' + item.name + ':' + item.data
          }
        });
      },
      fetchMills() {
        this.$request.get(this.$KPI.millShop.myMills).then(res => {
          if (res.code === 200 && res.data && res.data !== {}) {
            this.millInfo = res.data;
            if (res.data.list && res.data.list !== []) {
              this.millChild = res.data.list;
            }
          } else {
            uni.showToast({
              icon: "none",
              title: res.msg
            });
          }
          setTimeout(() => {
            uni.stopPullDownRefresh();
          }, 1000)
        })
      },
      fetchChart() { //获取折线图数据
        this.$request.get(this.$KPI.HbyDeal.chart).then(res => {
          if (res.code === 200) {
            if (res.data && Object.keys(res.data).length !== 0) {
              this.min_price = res.data.price.min;
              this.max_price = res.data.price.max;
              this.columns = res.data.limit;
              let LineA = {
                categories: [],
                series: []
              };
              let obj = {
                name: '价格',
                data: [],
                color: ''
              };
              res.data.list.forEach(item => {
                LineA.categories.push(item.edit_time);
                obj.data.push(item.new_price);
              })
              LineA.series.push(obj);
              _self.showLineA("canvasLineA", LineA);
            }
          } else {
            uni.showToast({
              icon: 'none',
              msg: res.msg
            })
          }
        })
      },
      temporaryOpen(){ //功能开发中
        uni.showToast({
          icon:'none',
          title:this.$t('warn').develop
        })
      }
    }
  }
</script>

<style>
  @import url("propertzc.css");

  /*.proplibBoxHe{
    width:100%;
    height:calc(100% - 540rpx);
    padding:20rpx;
    overflow-y:scroll;
    box-sizing:border-box;
  }
 */

  .proplibBoxHe {
    padding: 20rpx;
  }

  /*样式的width和height一定要与定义的cWidth和cHeight相对应*/
  .qiun-columns {
    margin-bottom: 20rpx;
  }

  /*  .qiun-charts {
      width: 750upx;
      height: 450upx;
    } */
  .charts {
    width: 710upx;
    height: 450upx;
    background-color: #FFFFFF;
    margin: 0 auto;
    border-radius: 10rpx;
    box-shadow: 0 0 10px #2F8FF1;
  }
</style>
