<template>
	<view class="shuruknzdBox">
		<form @submit="formSubmit">		
			<view class="uni-textarea unitextareaBox">
				<textarea v-model="reQuest.content" placeholder="请输入留言内容" placeholder-style="color:#A5D6FA;" />
			</view>
			<view class="">	
				<!-- 上传按钮 s -->
				<view class="shctanzwei" @click="upFile">
					<image src="/static/images/jiatu.png" mode=""></image>
				</view>
        <view class="shctanzwei" v-for="(rItem,rIndex) in reviewSrc" :key="rIndex">
        	<image :src="rItem" mode=""></image>
        </view>
				<!-- 上传按钮 s -->
			</view>
			<view class="btn-area whlogbtnBox">
				<button formType="submit" class="whlogbtn">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        reviewSrc:[],
				reQuest:{
          id:'',
          content:'',
          img:[]
        }
			}
		},
    onLoad(option){
      this.reQuest.id = option.parent_id;
    },
		methods: {
			formSubmit(){
        let {content} = this.reQuest;
        if(content.trim().length === 0){
          uni.showToast({
            icon:'none',
            title:'请输入留言信息'
          })
          return false;
        }
        this.$request.post(this.$KPI.fireDeal.addMessage,this.reQuest).then(res => {
          if(res.code === 200){
             uni.showToast({
               icon:'success',
               title:'留言成功'
             })
             setTimeout(()=>{
               uni.redirectTo({
                 url:"/pages/flametrad/mymesgelist?parent_id="+this.reQuest.id
               })
             },1000)
          }else{
            uni.showToast({
              icon:"none",
              title:res.msg
            })
          }
        })
      },
      upFile(){ //上传文件
        uni.chooseImage({
          count:3,
          success: (res) => {
           res.tempFilePaths.forEach(item => { //多图上传
              this.$request.upload(this.$KPI.common.upFile,item,'pay_img',{
                'field':'pay_img'
              }).then( res =>{
                if(res.code === 200){
                  if(res.data && res.data !== {}){
                    this.reviewSrc.push(res.data.show_src);
                    this.reQuest.img.push(res.data.src);
                  } 
                 }else{
                   uni.showToast({
                     icon:"none",
                     title:res.msg
                   })
                   return false;
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
	
	
	
</style>
