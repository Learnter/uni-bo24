<template>
	<view class="apbindaBox">
		<view class="apbindaCont">
			<form @submit="formSubmit" >
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.id}}：</view>
					<view class="with-fun bindiiut">
						<input class="uni-input" disabled v-model="ownerInfo.account" :placeholder="holder.account" placeholder-style="color:#888888;" />
					</view>
				</view>
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.name}}：</view>
					<view class="with-fun bindiiut">
						<input class="uni-input" v-model="ownerInfo.username" :placeholder="holder.name" placeholder-style="color:#888888;" />
					</view>
				</view>
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.sex}}：</view>
					<view class="with-fun bindiiut" v-if="sexArray.length !== 0">
						<picker @change="bindPickerChange" :value="currentIndex" :range="sexArray" range-key="name" style="width: 100%;">
							<view class="uni-input">{{sexArray[currentIndex].name}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.email}}：</view>
					<view class="with-fun bindiiut">
						<input class="uni-input" v-model="ownerInfo.email" :placeholder="holder.email"  placeholder-style="color:#888888;" />
					</view>
				</view>
				<view class="uni-form-item uni-column bindiiutBox">
					<view>{{i18n.tel}}：</view>
					<view class="with-fun bindiiut">
						<input class="uni-input" v-model="ownerInfo.mobile" :placeholder="holder.tel"  placeholder-style="color:#888888;" />
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
				sexArray:[],
				currentIndex: 0,
        ownerInfo:{
          account:'',
          username:'',
          email:'',
          mobile:'',
          sex:''
        }
			}
		},
    computed:{
      i18n(){
        return this.$t('personalinfo');
      },
      holder(){
        return this.$t('holder');
      }  
    },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').personalinfo
      })
    },
    onReady(){
      this.fetchOwnerInfo();
    },
		methods: {
      fetchOwnerInfo(){ //获取个人信息
        this.$request.get(this.$KPI.person.ownerInfo).then( res => {
          if(res.code === 200 && res.data && res.data.length !== 0){
              this.ownerInfo = res.data.user_info;
              if(res.data.sex_info && res.data.sex_info.length !== 0){
                 this.sexArray = res.data.sex_info;
                 res.data.sex_info.filter((item,index)=>{ //获取当前性别的索引
                     if(item.id == res.data.user_info.sex){
                        this.currentIndex = index;
                     }
                  })
               }
            }
        })
      },
			// 性别 s
			bindPickerChange: function(e) {
				this.currentIndex = e.target.value;
        this.ownerInfo.sex = this.sexArray[e.target.value].id; //获取选择性别的id
			},
      formSubmit(){ //提交资料
        this.$request.post(this.$KPI.person.editInfo,this.ownerInfo).then(res => {
            if(res.code === 200 ){
              uni.showToast({
                icon:"loading",
                title:this.$t('warn').submitSuccess
              })
            }else{
              uni.showToast({
                icon:'none',
                title:res.msg
              })
            }
         })
      }
		}
	}
</script>

<style>
	@import url("../account/bindcss.css");
</style>
