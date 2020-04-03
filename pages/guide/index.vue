<template>
    <view class="content"></view>
</template>

<script>
export default {
    onLoad() {
        this.checkGuide();
    },
    methods: {
        checkGuide() {
            // 思路： 检测是否有启动缓存，如果没有，就是第一次启动，第一次启动就去 启动介绍页面
            const launchFlag = uni.getStorageSync('launchFlag');
            
            if (launchFlag) {
                let token = this.$catchs.get("app_user_info"); //token存在直接跳转到首页
                  if(token){
                    uni.switchTab({
                        url: '/pages/index/index'
                    });
                  } else {
                    uni.redirectTo({
                        url: '/pages/login/login'
                    });
                  }
            } else {
                uni.redirectTo({
                    url: '/pages/guide/list'
                });
            }
        }
    }
};
</script>

<style></style>
