<template>
	<view>
		<view class="bdrdatopBox">
      <view class="uni-flex">
        <view class="bdrdatopCont">
        	<view class="bdrdatoptx">{{i18n.available}} HBY</view>
        	<view class="bdrdatoptxshu">{{dealInfo.userBlock+'HBY'}}</view>
        </view>
        <view class="bdrdatopCont">
        	<view class="bdrdatoptx">HBY {{i18n.price}}</view>
        	<view class="bdrdatoptxshu">{{dealInfo.price+(i18n.rmb)}}</view>
        </view>
      </view>
      
			<view class="paybinavBox">
				<view class="paynavtopBox">
					<view class="paynavtop">
            <mrhardSwitch bgColorActive="#3B9DFC" bgColorDefault="#3B9DFC" textColor="#bfffc2" :textFalse="i18n.sale" :textTrue="i18n.pay" width="260rpx" height="70rpx" buttonHeight='70rpx' buttonWidth='130rpx' textSize="30rpx" buttonColor="#CBA508"  @change="changeSwitch"></mrhardSwitch>
					</view>
				</view>

				<view class="uni-flex bllnavlinkBox">
					<view class="bllnavlink" @click="publup = true">{{i18n.rlOder}}<image src="/static/images/a024laner_83.png" mode="widthFix"
						 class="zxia"></image>
					</view>
				 	<navigator url="/pages/hbydeal/hbyWithdraw/hbyWithdraw" class="bllnavlink"  hover-class="none">{{i18n.withdrawal}}</navigator>
				<!--<navigator url="/pages/flametrad/tradrecord" class="fx1 bllnavlink"  hover-class="none">交易记录</navigator>
					<navigator url="/pages/flametrad/ordersearbuy" class="fx1 bllnavlink"  hover-class="none">搜索<image src="/static/images/a024laner_82.png" mode="widthFix"
						 class="zyou"></image>
					</navigator> -->
				</view>
			</view>
			<!-- <view class="bdrdatopzw"></view> -->
		</view>
		<!-- 列表 s -->
		<scroll-view class="billistlbBox" scroll-y  @scrolltolower="loadMore">
			<view class="billistlbHe uni-flex" v-for="(item,index) in orderLists" :key="index">
				<view class="fx1">
					<view class="uni-flex">
						<view class="billismcc">{{item.uid}}</view>
						<view class="fx1 billishk" v-if="item.pay_info">
							<image src="/static/images/2019_a006_41.png" v-show="item.pay_info.zfb" mode=""></image>
							<image src="/static/images/2019_a006_38.png" v-show="item.pay_info.wx" mode=""></image>
							<image src="/static/images/2019_a006_40.png" v-show="item.pay_info.bank" mode=""></image>
						</view>
					</view>
					<view class="billisjine">
						<text class="text_1">{{i18n.count}}：{{item.stay_num}}</text>
						<text class="text_2">{{i18n.amount}}：{{item.price}}</text>
					</view>
					<view class="billisjine">
						<text class="text_1">{{i18n.recent}}：{{item.lately}}</text>
						<text class="text_2">{{i18n.dealNum}}：{{item.deal_num}}</text>
					</view>
				</view>
        <block>
          <view class="chshanczan" v-if="isSell" @click="sellcsanup(item)">{{i18n.buy}}<image src="/static/images/a024laner_83.png" mode="widthFix"
          	 class="zxia"></image>
          </view>
          <view class="chshanczan" v-else @click="sellcsanup(item)">{{i18n.sell}}<image src="/static/images/a024laner_83.png" mode="widthFix"
          	 class="zxia"></image>
          </view>
        </block>
				
			</view>
			<view class="emptyBox" v-if="showEmpty">
				<image src="/static/images/a024laner_105.png" style="width:100%;height:100%;"></image>
			</view>
		</scroll-view>
		<!-- 列表 e -->
    
    <!-- 购买弹窗 s -->
    <view class="chzopupBox" :class="buyup == true ? 'chzopupBoxActive' : ''">
    	<view class="sellpopupupcontBox">
    		<view class="sellpopupupcont">
    			<form>
    				<view class="sellpoptlmc">{{i18n.buy}}HBY</view>
    				<view class="uni-flex sellpopshe">
    					<view class="fx1">
    						<view class="sellpoptshu">{{buyInfo.price}}</view>
    						<view class="sellpopttx">{{i18n.price}}</view>
    					</view>
    					<view class="fx1">
    						<view class="sellpoptshu">{{buyInfo.stay_num}}</view>
    						<view class="sellpopttx">{{i18n.count}}</view>
    					</view>
    				</view>
    				<view class="seltishiBox uni-flex">
    					<image src="/static/images/2019a056_105.png" mode="widthFix"></image>
    					<view class="seltishi fx1">{{i18n.checkInfo}}</view>
    				</view>
    				<!-- <view class="uni-flex seltitledah">
    					<view class="seltitle">支付方式：</view>
    					<view class="fx1">
    						<radio-group name="radio-group" @change="payMethod">
    						<label><radio value="zfb" checked="true" />支付宝</label>
    						<label><radio value="wx" />微信</label>
    						<label><radio value="bank" />银行卡</label>
    						</radio-group>
    					</view>
    				</view> -->
    				<view class="uni-flex paczinputBox">
    					<view class="paczinptl">{{i18n.count}}</view>
    					<view class="fx1 paczinput">
    						<input type="text" v-model="buyConfig.num" :placeholder="holder.count" />
    					</view>
    				</view>
    				<view class="uni-flex paczinputBox">
    					<view class="paczinptl">{{i18n.tradePwd}}</view>
    					<view class="fx1 paczinput">
    						<input type="password" placeholder-class="uni-ellipsis" v-model="buyConfig.secpwd" :placeholder="holder.dealPwd" />
    					</view>
    				</view>
    				<view class="uni-flex confirBtnBox">
    					<button class="fx1 confirqux" type="primary" @click="sellcancel">{{common.cancel}}</button>
    					<view class="paczgxx"></view>
    					<button class="fx1 confirBtn" type="primary" @click="buySubmit">{{common.comfirm}}</button>
    				</view>
    			</form>
    		</view>
    	</view>
    </view>
    <!-- 购买弹窗 e -->

		<!-- 出售弹窗 s -->
		<view class="chzopupBox" :class="sellup == true ? 'chzopupBoxActive' : ''">
			<view class="sellpopupupcontBox">
				<view class="sellpopupupcont">
					<form>
						<view class="sellpoptlmc">{{i18n.sell}} HBY</view>
						<view class="uni-flex sellpopshe">
							<view class="fx1">
								<view class="sellpoptshu">{{sellInfo.price}}</view>
								<view class="sellpopttx">{{i18n.price}}</view>
							</view>
							<view class="fx1">
								<view class="sellpoptshu">{{sellInfo.stay_num}}</view>
								<view class="sellpopttx">{{i18n.count}}</view>
							</view>
						</view>
						<view class="seltishiBox uni-flex">
							<image src="/static/images/2019a056_105.png" mode="widthFix"></image>
							<view class="seltishi fx1">{{i18n.checkInfo}}</view>
						</view>
						<view class="uni-flex seltitledah">
							<view class="seltitle">{{i18n.payWay}}：</view>
							<view class="fx1">
                <checkbox-group @change="selReceiptMethods">
                	<label>
                		<checkbox value="zfb" />{{i18n.alipay}}
                	</label>
                	<label>
                		<checkbox value="wx" />{{i18n.weChat}}
                	</label>
                	<label>
                		<checkbox value="bank" />{{i18n.bank}}
                	</label>
                </checkbox-group>
							</view>
						</view>
						<view class="uni-flex paczinputBox">
							<view class="paczinptl">{{i18n.count}}</view>
							<view class="fx1 paczinput">
								<input type="text" v-model="sellConfig.num" :placeholder="holder.count" />
							</view>
						</view>
						<view class="uni-flex paczinputBox">
							<view class="paczinptl">{{i18n.tradePwd}}</view>
							<view class="fx1 paczinput">
								<input type="password" placeholder-class="uni-ellipsis" v-model="sellConfig.secpwd" :placeholder="holder.dealPwd" />
							</view>
						</view>
						<view class="uni-flex confirBtnBox">
							<button class="fx1 confirqux" type="primary" @click="sellcancel">{{common.cancel}}</button>
							<view class="paczgxx"></view>
							<button class="fx1 confirBtn" type="primary" @click="sellSubmit">{{common.comfirm}}</button>
						</view>
					</form>
				</view>
			</view>
		</view>
		<!-- 出售弹窗 e -->

		<!-- 发布订单 s -->
		<view class="qxbzxzBox" :class="publup == true ? 'qxbzxzBoxActive' : ''">
			<view class="qxpopupupcontBox">
				<view class="qxasbiltle">{{i18n.rlOder}}</view>
				<view class="uni-flex">
					<view class="fx1 fxzhian">
						<view class="mahmabuy" @click="fabubuyup">{{i18n.pay}}</view>
						<view class="mahmatx">{{i18n.rlCheck}}</view>
					</view>
					<!-- <view class="fx1 fxzhian">
						<view class="mahmasell" @click="fabusellup">卖</view>
						<view class="mahmatx">发布卖单</view>
					</view> -->
				</view>
				<view class="qxasbilqux" @click="publup = false">{{common.cancel}}</view>
			</view>
		</view>
		<!-- 发布订单 e -->

		<!-- 发布买单 s -->
		<view class="fabubuydan" :class="fabubuyzt == true ? 'fabubuydanActive' : ''">
			<view class="sellpopupupcontBox">
				<view class="sellpopupupcont">
					<form>
						<view class="sellpoptlmc">{{i18n.rlCheck}}</view>
						<view class="seltitztdj">{{i18n.price}}：{{dealInfo.price}}</view>
						<view class="uni-flex paczinputBox">
							<view class="paczinptl">{{i18n.count}}</view>
							<view class="fx1 paczinput">
								<input type="text" v-model="rbuyConfig.num" :placeholder="holder.count" />
							</view>
						</view>
						<view class="uni-flex paczinputBox">
							<view class="paczinptl">{{i18n.tradePwd}}</view>
							<view class="fx1 paczinput">
								<input type="password" placeholder-class="uni-ellipsis"  v-model="rbuyConfig.secpwd" :placeholder="holder.dealPwd" />
							</view>
						</view>
						<view class="uni-flex seltitledah">
							<view class="seltitle">{{i18n.payWay}}：</view>
							<view class="fx1">
								<checkbox-group @change="buyPayMethod">
									<label>
										<checkbox value="zfb" />{{i18n.alipay}}
									</label>
									<label>
										<checkbox value="wx" />{{i18n.weChat}}
									</label>
									<label>
										<checkbox value="bank" />{{i18n.bank}}
									</label>
								</checkbox-group>
							</view>
						</view>
						<view class="uni-flex confirBtnBox">
							<button class="fx1 confirqux" type="primary" @click="fabubuyqx">{{common.cancel}}</button>
							<view class="paczgxx"></view>
							<button class="fx1 confirBtn" type="primary" @click="publickBuy">{{common.comfirm}}</button>
						</view>
					</form>
				</view>
			</view>
		</view>
		<!-- 发布买单 e -->

		<!-- 发布卖单 s -->
		<!-- <view class="faselldan" :class="fabusellzt == true ? 'faselldanActive' : ''">
			<view class="sellpopupupcontBox">
				<view class="sellpopupupcont">
					<form>
						<view class="sellpoptlmc">发布卖单</view>
						<view class="seltitztdj">当前价格：{{dealInfo.price}}</view>
						<view class="uni-flex paczinputBox">
							<view class="paczinptl">卖出数量</view>
							<view class="fx1 paczinput">
								<input type="text" v-model="rSellConfig.num" placeholder="请输入需要卖出的数量" />
							</view>
						</view>
						<view class="uni-flex paczinputBox">
							<view class="paczinptl">交易密码</view>
							<view class="fx1 paczinput">
								<input type="password" v-model="rSellConfig.secpwd" placeholder="请输入交易密码" />
							</view>
						</view>
						<view class="uni-flex seltitledah">
							<view class="seltitle">收款方式：</view>
							<view class="fx1">
								<checkbox-group @change="sellPayMethod">
									<label>
										<checkbox value="zfb" />支付宝
									</label>
									<label>
										<checkbox value="wx" />微信
									</label>
									<label>
										<checkbox value="bank" />银行卡
									</label>
								</checkbox-group>
							</view>
						</view>
						<view class="uni-flex confirBtnBox">
							<button class="fx1 confirqux" type="primary" @click="fabusellqx">取消</button>
							<view class="paczgxx"></view>
							<button class="fx1 confirBtn" type="primary" @click="publickSell">确认</button>
						</view>
					</form>
				</view>
			</view>
		</view> -->
		<!-- 发布卖单 e -->


	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
  import mrhardSwitch from "@/components/mrhard-switch/mrhard-switch.vue";
	export default {
		components: {
			uniIcon,
      mrhardSwitch
		},
		data() {
			return {
				showEmpty: false, //显示空数据
				stopPull: false, //暂停上拉加载
        buyup:false,//购买弹窗
				sellup: false, //出售弹窗
				publup: false, //发布弹窗
				fabubuyzt: false,
				fabusellzt: false,
        isSell:false,//是否为出售
        orderLists:[] ,//订单列表
        reConfig:{//请求列表配置
          page:0,
          size:10
        },
				dealInfo: { //HBY可用数据、价格信息
					userBlock: 0,
					price: 0
				},
				buyList: [], //买家列表
        buyInfo:{},//购买的HBY信息
        buyConfig: { //购买HBY请求配置
        	id: '',
        	num: '',
        	secpwd: ''
        },
				sellInfo: {}, //出售的HBY信息
				sellConfig: { //出售HBY请求配置
					id: '',
					num: '',
					secpwd: '',
					pay_info:[]
				},
				rbuyConfig: { //发布买单配置
					num: '',
					secpwd: '',
					price: '',
					pay_info: []
				},
       
        // rSellConfig: { //发布卖单配置
        // 	num: '',
        // 	secpwd: '',
        // 	price: '',
        // 	pay_info: []
        // },
			}
		},
    computed:{
      i18n(){
        return this.$t('hbydeal');
      },
      common(){
        return this.$t('common');
      },
      holder(){
        return this.$t('holder');
      }
    },
    onLoad(){
      uni.setNavigationBarTitle({
        title:this.$t('navText').hbyBuy
      })
    },
		onReady() {
      this.fetchData();
      this.fetchOrders();
		},
		methods: {
      /*获取HBY信息*/
      fetchData(){
        this.$request.get(this.$KPI.HbyDeal.balance).then(res => {
          if(res.code === 200){
            if(res.data && Object.keys(res.data).length !== 0){
              this.dealInfo = res.data;
            }
          }else{
            uni.showToast({
              icon:"none",
              title:res.msg
            })
          }
        })
      },
      /*获取HBY信息*/
      
      /* 获取购买或出售订单*/
      fetchOrders(){
        
        /*每次请求初始化配置,清空列表数据*/
        this.showEmpty = false;
        this.stopPull = false;
        this.reConfig.page = 0;
        this.orderLists = [];
        /*每次请求初始化配置,清空列表数据*/
        
        let url;
        if(this.isSell){
          url = this.$KPI.HbyDeal.sellOrders;
        }else{
          url = this.$KPI.HbyDeal.buyOrders;
        }
        /*显示加载框*/
        uni.showLoading({
        	title: this.$t('warn').load,
        	mask: true
        })
        /*显示加载框*/
        this.$request.get(url,this.reConfig).then(res => {
          // console.log(res);
          if(res.code === 200 && res.data){
             if(Object.keys(res.data).length === 0){
               this.showEmpty = true;
             }else{
               this.orderLists = res.data;
               this.reConfig.page++;
             }
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          } 
          setTimeout(() => {
          	uni.hideLoading();
          }, 1000)
        })
      },
      /* 获取购买或出售订单*/
      
			loadMore() { //加载更多
				if (this.stopPull == true) {
					return false;
				}else{
					uni.showLoading({
						title: this.$t('warn').load,
						mask: true
					})
          
         let url;
         if(this.isSell){
           url = this.$KPI.HbyDeal.sellOrders;
         }else{
           url = this.$KPI.HbyDeal.buyOrders;
         }

         this.$request.get(url,this.reConfig).then(res => {
           
           if(res.code === 200 && res.data){
              if(Object.keys(res.data).length === 0){
                this.stopPull = true;
                uni.showToast({
                	icon: 'none',
                	title: this.$t('warn').pullEnd,
                	position: "bottom"
                })
              }else{
                this.orderLists = this.orderLists.concat(res.data);;
                this.reConfig.page++;
              }
           }else{
             uni.showToast({
               icon:'none',
               title:res.msg
             })
           }
         })
					setTimeout(() => {
						uni.hideLoading();
					}, 1000)
				}
			},
      
      /*显示购买或出售弹窗*/
			sellcsanup(obj) { 
        if(this.isSell){
          this.buyup = true;
          this.buyInfo = obj;
          this.buyConfig.id = obj.id;
        }else{
          this.sellup = true;
          this.sellInfo = obj;
          this.sellConfig.id = obj.id;
        }
			},
      /*显示购买或出售弹窗*/
      
      /*关闭购买或出售弹窗 */
			sellcancel() { 
        if(this.isSell){
          this.buyup = false;
          this.buyConfig.num = '';
          this.buyConfig.secpwd = '';
        }else{
          this.sellup = false;
          this.sellConfig.num = '';
          this.sellConfig.secpwd = '';
        }
			},
      /*关闭购买或出售弹窗 */    
      
      /*发布买单弹窗*/
			fabubuyup() {
				this.fabubuyzt = true;
				this.publup = false;
			},
       /*发布买单弹窗*/
       
      /*关闭发布买单弹窗*/
			fabubuyqx() { 
				this.fabubuyzt = false;
				this.rbuyConfig.num = '', //清除配置信息
				this.rbuyConfig.secpwd = '';
			},
      /*关闭发布买单弹窗*/
      
      /*发布买单的支付方式*/
			buyPayMethod(e) { 
				this.rbuyConfig.pay_info = e.detail.value;
			},
      /*发布买单的支付方式*/
       
      /*发布买单操作*/
			publickBuy() { 
				let {num,secpwd,pay_info} = this.rbuyConfig;
				if (num.trim().length === 0) {
					uni.showToast({
						icon: 'none',
						title: this.$t('warn').emptyNumber
					})
					return false;
				} else if (secpwd.trim().length === 0) {
					uni.showToast({
						icon: 'none',
						title: this.$t('warn').dealPwdEmpty
					})
					return false;
				} else if (pay_info.length === 0) {
					uni.showToast({
						icon: 'none',
						title: this.$t('warn').payWay
					})
					return false;
				}
				this.rbuyConfig.price = this.dealInfo.price;
        
       let url;
       if(this.isSell){
         url = this.$KPI.HbyDeal.releaseSell;
       }else{
         url = this.$KPI.HbyDeal.releaseBuy;
       }
        
				this.$request.post(url, this.rbuyConfig).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: this.$t('warn').releaseSuccess
						})
            /*关闭发布弹窗*/
						 this.fabubuyzt = false; 
            /*关闭发布弹窗*/
             
            /*清空输入框信息*/ 
						this.rbuyConfig.num = '', 
						this.rbuyConfig.secpwd = '';
            /*清空输入框信息*/ 
            
            /*重新获取新订单列表*/
						this.fetchOrders();
            /*重新获取新订单列表*/ 
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})
			},
       /*发布买单操作*/
      
      /*switch开关切换*/
      changeSwitch(e){
        this.isSell = e;
        if(e){
          uni.setNavigationBarTitle({
            title:this.$t('navText').hbySell
          })
        }else{
          uni.setNavigationBarTitle({
            title:this.$t('navText').hbyBuy
          })
        }
        this.fetchOrders();
      },
      /*switch开关切换*/

      
      /*选择出售的收款方式*/
      selReceiptMethods(e) { 
        this.sellConfig.pay_info = e.detail.value;
      },
      /*选择出售的收款方式*/
      
      /*出售HBY操作*/
      sellSubmit(){ //提交操作
        let {num,secpwd,pay_info} = this.sellConfig;
        if(num.trim().length === 0){
          uni.showToast({
            icon:'none',
            title: this.$t('warn').emptyNumber
          })
          return false;
        }else if(secpwd.trim().length === 0){
          uni.showToast({
            icon:'none',
            title: this.$t('warn').dealPwdEmpty
          })
          return false;
        }else if(pay_info.length === 0){
          uni.showToast({
            icon:'none',
            title: this.$t('warn').payWay
          })
          return false;
        }
        this.$request.post(this.$KPI.HbyDeal.sell,this.sellConfig).then(res => {
          if(res.code === 200){
             uni.showToast({
               icon:"loading",
               title: this.$t('warn').sellSuccess
             })
            /*关闭出售弹窗*/
            this.sellup = false;
            /*关闭出售弹窗*/
            
            /*清空输入框数据*/
            this.sellConfig.num = '';
            this.sellConfig.secpwd = '';
            /*清空输入框数据*/
            
            /*重新获取新列表数据*/
            this.fetchOrders();
            this.fetchData();
            /*重新获取新列表数据*/
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      /*出售HBY操作*/

      /*购买HBY操作*/
      buySubmit(){ 
        let {num,secpwd} = this.buyConfig;
        if(num.trim().length === 0){
          uni.showToast({
            icon:'none',
            title: this.$t('warn').emptyNumber
          })
          return false;
        }else if(secpwd.trim().length === 0){
          uni.showToast({
            icon:'none',
            title: this.$t('warn').dealPwdEmpty
          })
          return false;
        }
        this.$request.post(this.$KPI.HbyDeal.buy,this.buyConfig).then(res => {
          if(res.code === 200){
             uni.showToast({
               icon:"loading",
               title:this.$t('warn').buySuccess
             })
            /*关闭出售弹窗*/
            this.buyup = false;
            /*关闭出售弹窗*/
            
            /*清空输入框数据*/
            this.buyConfig.num = '';
            this.buyConfig.secpwd = '';
            /*清空输入框数据*/
            
            /*重新获取新列表数据*/
            this.fetchOrders();
            this.fetchData();
            /*重新获取新列表数据*/
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      }
     /*购买HBY操作*/ 
     
     // // 发布卖单 s
     // fabusellup() { //显示卖单弹窗
     // 	this.fabusellzt = true;
     // 	this.publup = false;
     // },
     // fabusellqx() { //关闭卖单弹窗
     // 	this.fabusellzt = false;
     // 	this.rSellConfig.num = ''; //清除配置信息
     // 	this.rSellConfig.secpwd = '';
     // },
     // sellPayMethod(e) { //卖单支付方式
     // 	this.rSellConfig.pay_info = e.detail.value;
     // },
     // publickSell() { //发布卖单提交
     // 	let {
     // 		num,
     // 		secpwd,
     // 		pay_info
     // 	} = this.rSellConfig;
     // 	if (num.trim().length === 0) {
     // 		uni.showToast({
     // 			icon: 'none',
     // 			title: this.$t('warn').emptyNumber
     // 		})
     // 		return false;
     // 	} else if (secpwd.trim().length === 0) {
     // 		uni.showToast({
     // 			icon: 'none',
     // 			title: this.$t('warn').dealPwdEmpty
     // 		})
     // 		return false;
     // 	} else if (pay_info.length === 0) {
     // 		uni.showToast({
     // 			icon: 'none',
     // 			title: this.$t('warn').payWay
     // 		})
     // 		return false;
     // 	}
     // 	this.rSellConfig.price = this.kindInfo.price;
     // 	this.$request.post(this.$KPI.fireDeal.publickSell, this.rSellConfig).then(res => {
     // 		if (res.code === 200) {
     // 			uni.showToast({
     // 				icon: 'none',
     // 				title: this.$t('warn').releaseSuccess
     // 			})
     // 			this.fabusellzt = false; //关闭发布弹窗
     // 			this.rSellConfig.num = '', //清除配置信息
     // 				this.rSellConfig.secpwd = '';
     // 			this.buyConfig.page = 0; //重新获取新数据
     // 			this.fetchPayList();
     // 		} else {
     // 			uni.showToast({
     // 				icon: 'none',
     // 				title: res.msg
     // 			})
     // 		}
     // 	})
     // },
		},
    onNavigationBarButtonTap(){
      if(this.isSell){
        uni.navigateTo({
        	url: '/pages/hbydeal/hbybuylist'
        });
      }else{
         uni.navigateTo({
          url: '/pages/hbydeal/hbyselllist'
         });
      }
    }
	}
</script>

<style>
	@import url("../flametrad/billcss.css");
	page {
		background: #1283F2;
    position: relative;
	}
  .emptyBox{
    width:400rpx;
    height:500rpx;
    margin:0 auto;
  }
  .bllnavlinkBox{
    padding:0;
  }
  .bdrdatopCont{
    width:50%;
    text-align:center;
  }
  .bdrdatoptx{
    font-size:32rpx;
  }
  .bdrdatoptxshu{
    font-size:40rpx;
  }
  .bllnavlink{
    text-align:center;
    width:25%;
  }
  .billistlbBox{
    position:absolute;
    box-sizing:border-box;
    width:100%;
    height: calc(100% - 428rpx);
    background:#158DFF;
    border-radius: 20rpx 20rpx 0 0;
  }
  .billistlbHe{
    margin-top: 30rpx;
    background: #1283F2;
  }
</style>

