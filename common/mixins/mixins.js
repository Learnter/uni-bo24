
 const mixin = {
  methods:{
    /*动态设置底部栏文字语言*/
    setBottomTabBar(){
      let language = this.$catchs.get('lang');
      switch (language){
        case 'en-us':
          uni.setTabBarItem({index:0,text:'Home'});
          uni.setTabBarItem({index:1,text:'Mill'});
          uni.setTabBarItem({index:2,text:'Store'});
          uni.setTabBarItem({index:3,text:'C2C'});
          uni.setTabBarItem({index:4,text:'Me'});
          break;
        default:
          uni.setTabBarItem({index:0,text:'首页'});
          uni.setTabBarItem({index:1,text:'矿机'});
          uni.setTabBarItem({index:2,text:'商城'});
          uni.setTabBarItem({index:3,text:'C2C'});
          uni.setTabBarItem({index:4,text:'我的'});
          break;
      }
    },
    /*动态设置底部栏文字语言*/    
    
    /*判断语言种类*/
    whichLanguage(ZH,US){
      let lan = this.$i18n.locale;
      if(lan == 'zh-cn' || lan == 'zh'){
        this.setTabBarNav(ZH);
      }else if(lan == 'en-us'){
        this.setTabBarNav(US);
      }
    },
    /*判断语言种类*/
    
    /*动态设置导航栏文字*/
    setTabBarNav(value){
      uni.setNavigationBarTitle({
        title:value
      })
    },
    /*动态设置导航栏文字*/
    
    /*动态设置顶部导航栏右侧按钮*/
    setNavBotton(ZH,US){
       // #ifdef APP-PLUS  
          let lan = this.$i18n.locale;
          let webView = this.$mp.page.$getAppWebview();  
          if(lan == 'zh-cn' || lan == 'zh'){
             // index: 按钮索引, style {WebviewTitleNViewButtonStyles }
             webView.setTitleNViewButtonStyle(0, {
                 text:ZH
             });
          }else if(lan == 'en-us'){
             webView.setTitleNViewButtonStyle(0, {  
                 text:US
             });
          }
      //#endif
    },
    /*动态设置顶部导航栏右侧按钮*/
    
   /*动态设置顶部导航栏右侧按钮*/
   setNavRightBotton(value){
      // #ifdef APP-PLUS  
         let webView = this.$mp.page.$getAppWebview();  
            webView.setTitleNViewButtonStyle(0, {
                text:value
            });
     //#endif
   }
   /*动态设置顶部导航栏右侧按钮*/
  }
}
export default mixin;