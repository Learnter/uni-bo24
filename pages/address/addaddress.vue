<template>
	<view>
		<view class="redacBox">
			<view class="redacTl">{{i18n.consignee}}：</view>
			<view class="redacInput"><input type="text" placeholder-class="uni-ellipsis" v-model="arsConfig.username" :placeholder="holder.consigneeName" /></view>
		</view>
		<view class="redacBox">
			<view class="redacTl">{{i18n.phoneNum}}：</view>
			<view class="redacInput"><input type="text"  placeholder-class="uni-ellipsis" v-model="arsConfig.mobile" :placeholder="holder.contact" /></view>
		</view>
		<view class="mpvue-picker redacBox">
			<view class="redacTl">{{i18n.area}}：</view>
			<view class="redacInput">
        <picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange"  @change="onConfirm" :value="multiIndex" :range="multiArray">
          <input type="text"  placeholder-class="uni-ellipsis" :value="pickerText" disabled  :placeholder="holder.area" />
        </picker>
			</view>
		</view>
		<view class="redacBox">
			<view class="redacTl">{{i18n.addressDetail}}：</view>
			<view class="redacInput"><input type="text"  placeholder-class="uni-ellipsis" v-model="arsConfig.address" :placeholder="holder.address" /></view>
		</view>
		<!-- <view class="redbianqBox">
			<view class="redacTl">地址标签</view>
			<view class="redacInput">				
				<view class="redacText" v-for="(item,index) in list" :key="index" @click="gospec(index)" :class= "spec == index ? 'redacTextActive' : ''">{{item}}</view>
			</view>
		</view> -->
		<view class="redbbutton">
			<button type="primary" class="confirBtn" @click="insertAddress">{{i18n.comfirm}}</button>
		</view>
	</view>
	
</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				// cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode:'multiLinkageSelector',
				deepLength:3,
				spec:0,
        arsConfig:{ //地址配置
          province:'', //省
          city:'', //市
          district:'', //区
          address:'', //详细地址
          mobile:'', //电话
          username:'' //收货人姓名
        },
        addressList:{},//联动地址
        multiArray: [],//联动地址列表
        multiIndex: [0, 0, 0],//显示地址
			};
		},
   computed:{
     i18n(){
       return this.$t('editAddress');
     },
     holder(){
       return this.$t('holder');
     }
   },
    onLoad() {
      uni.setNavigationBarTitle({
        title:this.$t('navText').add_sp_address
      })
    },
    onReady() {
      this.fetchLinkageAddress();
    },
		methods: {
			fetchLinkageAddress(){ //获取联动地址
        this.$request.get(this.$KPI.address.linkageAddress).then( res => {
           if(res.code === 200 && res.data && res.data !== {}){
             this.addressList = res.data;
             // console.log(this.addressList);
             this.multiArray[0] = Object.keys(res.data); //初始化省
             this.multiArray[1] = Object.keys(res.data["北京市"]); //初始化市
             this.multiArray[2] = res.data["北京市"]["市辖区"]; //初始化区、县
          }
        })
      },
      bindMultiPickerColumnChange: function(e) {
      	// console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
        // console.log(e.detail);
      	this.multiIndex[e.detail.column] = e.detail.value
      	switch (e.detail.column) {
      		case 0: //拖动第1列
            // this.multiIndex[1] = 0;
            this.multiArray[1] = Object.keys(this.addressList[this.multiArray[0][e.detail.value]]); 
            this.multiArray[2] = this.addressList[this.multiArray[0][e.detail.value]][this.multiArray[1][0]];
            this.multiIndex.splice(1, 1, 0)
            this.multiIndex.splice(2, 1, 0)
      			break
      		case 1: //拖动第2列
            this.multiArray[2] = this.addressList[this.multiArray[0][this.multiIndex[0]]][this.multiArray[1][e.detail.value]];;
            this.multiIndex.splice(2, 1, 0)
      			break
      	}
      	this.$forceUpdate()
      },
			onConfirm(e) { 
        // this.arsConfig.province = e.detail.value[0]; //省索引
        // this.arsConfig.city = e.detail.value[1]; //市索引
        // this.arsConfig.district = e.detail.value[2]; //区索引
        
        //  console.log(e.detail.value); 地址显示文字 
        if(this.multiArray[0][e.detail.value[0]] != undefined && this.multiArray[1][e.detail.value[1]] != undefined && this.multiArray[2][e.detail.value[2]] != undefined){
           this.pickerText =  this.multiArray[0][e.detail.value[0]]+"-"+this.multiArray[1][e.detail.value[1]]+"-"+this.multiArray[2][e.detail.value[2]];
           
           this.arsConfig.province = this.multiArray[0][e.detail.value[0]]; //传送后台的地址
           this.arsConfig.city = this.multiArray[1][e.detail.value[1]];
           this.arsConfig.district = this.multiArray[2][e.detail.value[2]];
        }else if(this.multiArray[0][e.detail.value[0]] != undefined && this.multiArray[1][e.detail.value[1]] != undefined && this.multiArray[2][e.detail.value[2]] == undefined){
           this.pickerText =  this.multiArray[0][e.detail.value[0]]+"-"+this.multiArray[1][e.detail.value[1]];
           
           this.arsConfig.province = this.multiArray[0][e.detail.value[0]];//传送后台的地址
           this.arsConfig.city = this.multiArray[1][e.detail.value[1]];
        }else if(this.multiArray[0][e.detail.value[0]] != undefined && this.multiArray[1][e.detail.value[1]] == undefined ){
             this.pickerText =  this.multiArray[0][e.detail.value[0]];
             
             this.arsConfig.province = this.multiArray[0][e.detail.value[0]];//传送后台的地址
        }else{
          this.pickerText = '';
        }
			},
      insertAddress(){ //增加地址
        // let {username,mobile,address} = this.arsConfig;
        // if(!username || username.trim().length == 0){
        //   uni.showToast({
        //     icon:'none',
        //     title:'请输入收货人姓名',
        //     position:'top'
        //   })
        //   return false;
        // }else if(!mobile || mobile.trim().length == 0){
        //   uni.showToast({
        //     icon:'none',
        //     title:'请输入手机号码',
        //     position:'top'
        //   })
        //   return false;
        // }else if(!/^1[3-578]\d{9}$/.test(mobile)){
        //   uni.showToast({
        //     icon:'none',
        //     title:'请输入正确的手机号码',
        //     position:'top'
        //   })
        //   return false;
        // }else if(!this.pickerText){
        //   uni.showToast({
        //     icon:'none',
        //     title:'请选择收货地址',
        //     position:'top'
        //   })
        //   return false;
        // }else if(!address || address.trim().length == 0){
        //   uni.showToast({
        //     icon:'none',
        //     title:'请输入收货详细地址',
        //     position:'top'
        //   })
        //   return false;
        // }
      this.$request.post(this.$KPI.address.insertAddress,this.arsConfig).then(res => {
         // console.log(res);
         if(res.code === 200){
            uni.showToast({
                icon:'loading',
                title:this.$('warn').addSuccess,
                position:'top'
            })
            setTimeout(()=>{
              uni.redirectTo({
                url:'/pages/address/addressindex'
              })
            },1500)
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg,
              position:'top'
            })
          }
        })  
      }
		}
	};
</script>

<style>
	@import url("addaddress.css");
</style>