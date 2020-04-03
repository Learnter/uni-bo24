<template>
	<view class="shuruknzdBox">
		<form @submit="formSubmit">		
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.title}}：</view>
				<view class="with-fun qxloninput">
					<input type="text" v-model="leaveMessage.title" class="uni-input" :placeholder="holder.ms_title" placeholder-style="color:#A5D6FA;" />				
				</view>
			</view>
			<view class="uni-form-item uni-column qxloninputBox">
				<view class="qxloninptl">{{i18n.type}}：</view>
				<view class="qxlondizh">
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="name" style="width: 100%;">
						<view class="uni-input" style="background:none; padding: 0rpx;">{{array[index].name}}</view>
					</picker>
				</view>
			</view>
			<view class="uni-textarea unitextareaBox">
				<textarea  v-model="leaveMessage.content" :placeholder="holder.ms_content" placeholder-style="color:#A5D6FA;" />
			</view>
      
			<view class="">
				<view class="shctanzwei" v-for="(item,index) in reviewSrc" :key="index">
				  <image :src="item" mode=""></image>
				</view>
				<view class="shctanzbtn" @click="openAlbum"></view>
			</view>
			
			<view class="btn-area whlogbtnBox">
				<button formType="submit" class="whlogbtn">{{i18n.submit}}</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
			data(){
        return {
          reviewSrc:[],
        	array:[{name:'',id:''}],
        	index: 0,
          leaveMessage:{
            title:'',
            type:'',
            content:'',
            img:[]
          }
        }
      },
      computed:{
        i18n(){
          return this.$t('messageindex');
        },
        holder(){
          return this.$t('holder');
        }
      },
      onLoad() {
        uni.setNavigationBarTitle({
          title:this.$t('navText').message
        })
      },
     onReady() {
       this.fetchTypeArray();
     },
		methods: {
      fetchTypeArray(){ //获取选择类型
        this.$request.get(this.$KPI.leaveMessage.lMessageType).then(res => {
          // console.log(res.data);
          if(res.code === 200 && res.data && res.data.length !== 0){
            this.array = res.data;
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      openAlbum(){ //打开相册
        uni.chooseImage({
            count:3,
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], //从相册选择
            success: (res)=> {
              res.tempFilePaths.forEach(item => {
                this.$request.upload(this.$KPI.common.upFile,item,'thumb',{
                  'field':'thumb'
                }).then( res =>{
                  if(res.code === 200){
                     if(res.data && res.data !== {}){
                       this.reviewSrc.push(res.data.show_src);
                       this.leaveMessage.img.puhs(res.data.src);
                     }  
                   }else{
                     uni.showToast({
                       icon:"none",
                       title:res.msg
                     })
                   }
                })
              })
            }
        });
      }, 
      formSubmit(){ //提交留言
        let{title,content} = this.leaveMessage;
        if(title.trim().length === 0){
          uni.showToast({
            icon:'none',
            title:this.$t('warn').empty_ms_title
          })
          return false;
        }else if(content.trim().length === 0){
          uni.showToast({
            icon:'none',
            title:this.$t('warn').empty_ms_content
          })
           return false;
        }
        this.leaveMessage.type = this.array[this.index].id;
        this.$request.post(this.$KPI.leaveMessage.lMessageAction,this.leaveMessage).then(res => {
          if(res.code === 200){
            uni.showToast({
              icon:'loading',
              title:this.$t('warn').ms_Success
            })
            setTimeout(()=>{
              uni.navigateTo({
              	url: '/pages/message/messagelist'
              });
            },1500)
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
			// 留言类型 s
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},		
			// 留言列表
			onNavigationBarButtonTap(e) {
				uni.navigateTo({
					url: '/pages/message/messagelist'
				});
			}
		}
	}

</script>

<style>
	page {
		background: #158DFF;
	}
	.unitextareaBox {
		background: #1283F2;
		border-radius: 10rpx;
		margin: 20rpx 0rpx 40rpx 0rpx;
	}
	.unitextareaBox textarea {
		color: #D3F0F0;
		height: 250rpx;
	}
	
	.shctanzwei {
		width: 100rpx;
		height: 100rpx;
		display:inline-block;
		margin: 0rpx 15rpx 15rpx 0rpx;
	}
	.shctanzwei image {
		width: 100%;
		height: 100%;
	}
	
	.shctanzbtn {
		width: 100rpx;
		height: 100rpx;
		display:inline-block;
		background: url('~@/static/images/jiatu.png') no-repeat center;
		background-size: 100% 100%;
	}
	.whlogbtnBox{
    padding-top:20rpx;
  }
</style>
