<template>
	<view class="apbindaBox">
		<view class="apbindaCont">
			<form @submit="formSubmit">
				<view class="clearfix">
					<!-- 商品位置 s -->
					<view class="shctanzwei" v-for="(item,index) in swipers" :key="index">
						<image :src="item" mode=""></image>
					</view>
					<!-- 商品位置 s -->
					<!-- 上传按钮 s -->
					<view class="shctanzbtn" @click="openAlbum"></view>
					<!-- 上传按钮 e -->
				</view>

				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.title}}：</view>
					<view class="with-fun bindiiut">
						<input type="text" class="uni-input" v-model="reConfig.goods_name" :placeholder="holder.cm_title" placeholder-style="color:#888888;" />
					</view>
				</view>
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.price}}：</view>
					<view class="with-fun bindiiut">
						<input type="number" class="uni-input" v-model="reConfig.shop_price" :placeholder="holder.cm_price" placeholder-style="color:#888888;" />
					</view>
				</view>
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.inventory}}：</view>
					<view class="with-fun bindiiut">
						<input type="number" class="uni-input" v-model="reConfig.stock" :placeholder="holder.cm_inventory" placeholder-style="color:#888888;" />
					</view>
				</view>
				<!-- <view class="uni-form-item uni-column bindiiutBox">
          <view>商家电话</view>
          <view class="with-fun bindiiut">
            <input type="number" class="uni-input" v-model="reConfig.phone" placeholder="请输入商家电话" placeholder-style="color:#888888;" />
          </view>
        </view> -->
				<view>
					<view class="spuspfltl">{{i18n.category}}：</view>
					<view class="spuspcOneBox">
						<view class="spuspcOne" v-for="(item,index) in list" :key="index" @click="gospec(item,index)" :class="spec == index ? 'spuspcOneActive' : ''">{{item.name}}</view>
					</view>
				</view>
				<view class="releshmshu">
					<view>{{i18n.description}}：</view>
					<view class="uni-textarea unitextareaBox">
						<textarea :placeholder="holder.cm_description"" v-model="reConfig.content" placeholder-style="color:#999999;" maxlength="-1" />
						</view>
				</view>
				<view class="btn-area confirBtnBox">
					<button formType="submit" class="confirBtn">{{i18n.submit}}</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				store_id:'',//商家id
				swipers:['/static/images/ssp_3.png'],//商品图片
						spec:0,
						list:[],//分类列表
				reConfig:{
				  goods_img:[],//商品图片
				  goods_name:'',//商品标题
				  shop_price:'',//商品单价
				  stock:'', //库存
				  cat_id:'', //商家分类id
				  content:'' //商品描述
				}
			}
		},
		computed:{
		   i18n(){
			  return this.$t('releasecomm');
		   },
		   holder(){
			  return this.$t('holder');
		   }
		},
    onLoad(option) {
	  uni.setNavigationBarTitle({
			title:this.$t('navText').rl_goods
	  })
      if(option.store_id){
        this.store_id = option.store_id;
      }
    },
    onReady() {
      this.fetchCategory();
    },
	methods: {
      fetchCategory(){ //获取商品分类
        this.$request.get(this.$KPI.BsnSystem.category).then(res => {
          if(res.code === 200){
            if(res.data && res.data.length !== 0){
              this.list = res.data;
              this.reConfig.cat_id = res.data[0].cat_id;
            }
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
	  gospec(obj,index) {
				this.spec = index;
        this.reConfig.cat_id = obj.cat_id;
			},
      formSubmit(){ //发布商品
        let {goods_name,shop_price,stock,content} = this.reConfig;
        if(goods_name.trim().length === 0){
          uni.showToast({
            icon:'none',
            title:'请输入商品标题'
          })
          return false;
        }else if(shop_price.trim().length === 0){
          uni.showToast({
            icon:'none',
            title:'请输入商品售价'
          })
           return false;
        }else if(stock.trim().length === 0){
          uni.showToast({
            icon:'none',
            title:'请输入库存数量'
          })
           return false;
        }else if(content.trim().length === 0){
          uni.showToast({
            icon:'none',
            title:'请输入商品描述'
          })
          return false;
        }
        this.$request.post(this.$KPI.BsnSystem.release,this.reConfig).then(res => {
          if(res.code === 200){
            uni.showToast({
              icon:'loading',
              title:'发布成功'
            })
            setTimeout(()=>{
              uni.showModal({
                title:"温馨提示",
                content:"是否继续发布商品",
                cancelText:"继续发布",
                confirmText:"我的店铺",
                success:(res) => {
                  if(res.confirm){
                    uni.redirectTo({
                       url:'/pages/merchant/mystore?store_id='+this.store_id
                    })
                  }
                }
              })
            },2000)
            
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
    openAlbum(){ //上传LOGO
      uni.chooseImage({
        count:4,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
            /*上传前,清空数组*/
            this.swipers = [];
            this.reConfig.goods_img = []
            /*上传前,清空数组*/
            res.tempFilePaths.forEach(item => {
              this.$request.upload(this.$KPI.common.upFile,item, 'logo', {
                'field': 'logo'
              }).then(res => {
                if (res.code === 200 && res.data && res.data !== {}) {
                 this.swipers.push(res.data.show_src);
                 this.reConfig.goods_img.push(res.data.src);
                } else {
                  uni.showToast({
                    icon: "none",
                    title: res.msg
                  })
                }
              })
            })
          }
        })
      }
		}
	}
</script>

<style>
	@import url("../account/bindcss.css");
	.shctanzwei {
		width: 100rpx;
		height: 100rpx;
		display:inline-block;
		margin: 0rpx 15rpx 15rpx 0rpx;
		float: left;
		position: relative;
	}
	.shctanzwei image {
		width: 100%;
		height: 100%;
	}
	
	.shctanzbtn {
		width: 100rpx;
		height: 100rpx;
		display:inline-block;
		margin: 0rpx 15rpx 15rpx 0rpx;
		background: url('~@/static/images/jiatu.png') no-repeat center;
		background-size: 100% 100%;
		float:left;
	}
	.spuspcOne {
		border:2upx solid #eeeeee;
		color:#333333;
		display: inline-block;
		min-width:90upx;
		padding:0upx 20upx;
		text-align: center;
		height:50upx;
		line-height: 50upx;
		margin:10upx 10rpx 0rpx 0rpx;
		font-size:24upx;
		border-radius: 4rpx;
	}
	.spuspcOneActive {
		border:2upx solid #158DFF;
		color:#158DFF;
	}
	.spuspfltl {
		padding: 5rpx 0rpx 20rpx 0rpx;
	}
	.releshmshu {
		margin-top: 30rpx;
	}
	.unitextareaBox {
		background: #ffffff;
		border:2rpx solid #eeeeee;
		border-radius: 10rpx;
		margin: 20rpx 0rpx 40rpx 0rpx;
	}
	.unitextareaBox textarea {
		color: #000000;
		height: 200rpx;
		width: 100%;
	}
	
</style>
