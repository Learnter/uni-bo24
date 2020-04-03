/**
 * API接口配置文件
 */
module.exports = {
    common: {
        securityCode:'sendPhoneVerifyCode',//短信验证码
        emailCode:'sendEmailRegCode',//邮箱验证码
        graphCode:'createVerifyCode',//图形验证码
        sessionId:'getSessionId',//session接口
        Info:'config/getInfo', //配置文件
        swiper:'config/getRotaryList',//轮播图列表
        upFile:'user/uploadPictures',//上传图片
        switchLanguage:'switchLang',//切换语言
    },
    login: {
        isFirst:'user/testingIsFFirst',//首次登陆判断
        into:'user/login',//登录接口
        phoneLogin: "user/registerOrLogin", // 手机号登陆
        weChatLogin: "user/weChatRegisterOrLogin", // 微信登陆
        logout: "user/logout",// 会员退出
        bindInfo:'user/equipmentList',//获取绑定用户信息
        removeBind:'user/untyingOperation',//解除绑定
    },
    regiter:{
      reg:'user/reg',//注册接口
      retrieve:'user/forGot' //找回密码
    },
    index:{
      notice:'notice/getNoticeTitle', //公告列表 
      assets:'user/getMoneyInfo',//资产
      redPacketNum:'user/getRedEnvelopes',//红包数量
      redPacketAction:'user/redEnvelopesAdd',//领取红包
      popNotice:'user/getIndexNotice',//弹窗公告
    },
    millShop:{
      mills:'mine/getMineList',//矿机列表
      myMills:'mine/getMineUserList',//个人矿机列表
      myUserList:'mine/getMyMineUserList',//我的矿机列表
			buyMill:'mine/mineRent',//购买矿机
			workMessage:'mine/getMineWork',//运行信息
			fetchNumber:'mine/ajaxProfitIng'//挖矿数量
    },
    shops:{
      search:'Shop/getGoodsList',//搜索商品
      goods:'Shop/getGoodsList',//商品列表
      leftCategory:'Shop/getCateList',//左边分类列表
      rightGoods:'Shop/getGoodsCateList' ,//右边商品列表
      orderList:'order/getOrderList',//订单列表
      orderDetail:'order/getOrderDetail', //订单详情
      orderPay:'order/getOrderPayInfo' ,//支付详情
      payAction:'order/getOrderPay', //提交支付
      confirmDelivery:'order/confirmReceiving',//确认收货
      cancelOrder:'order/cancelOrder',//取消订单
      goodDetail:'Shop/getGoodsDetail',//商品详情
      specifications:'Shop/getSpecInfo' ,//规格信息
      addCart:'cart/addCart',//添加购物车
      carts:'cart/getCartList',//购物车列表
      selShops:'cart/selectShop',//选择商品
      delShops:'/cart/delCart',//删除商品
      confirmOrder:'cart/confirmCart',//确认订单
      commitOrder:'cart/addOrder',//提交订单
      nowBuy:'cart/addLiCart',//立即购买
    },
    transfer:{ //转账
      transferList:'change/getChangeInfo', //转账列表
      wallet:'change/getBalanceInfo',//钱包信息
      walletTransfer:'change/changeMoneyAdd',//钱包转账
      hbyTransfer:'change/changeBlockAdd',//HBY转账
      hbyLogs:'change/getChangeBlockLog',//HBY转账日志
      moneyLogs:'change/getChangeMoneyLog',//火种转账日志
      proceedsLogs:'change/getToChange',//收款转账日志
      firelogsDetail:'change/getMoneyDetail',//火种转账日志详情
      hbylogsDetail:'change/getBlockDetail',//hby转账日志详情
    },
    recharge:{ //充值
      telRecharge:'recharge/getPhoneConfig',//话费参数列表
      telRechargeAction:'recharge/phoneRecharge',//话费充值操作
      telRechargeLogs:'recharge/getPhoneRechargeLog',//话费充值日志
      oilCardRecharge:'recharge/getOilConfig',//油卡参数列表
      oilCardRechargeAction:'recharge/oilRecharge',//油卡充值操作
      oilCardRechargeLogs:'recharge/getOilRechargeLog'//油卡充值日志
    },
    exchange:{ //兑换
      exList:'transform/getTransformInfo',//兑换列表
      exInfo:'transform/getTransformAdd',//复投信息
      exAction:'transform/transformAdd', //复投操作
      exLogs:'transform/getTransformLog',//复投日志
      exlDetails:'transform/getTransformDetail',//复投日志详情
      exAssetInfo:'transform/getOneToTwoAdd',//资产回兑信息
      exAssetAction:'/transform/oneToTwoAdd',//资产回兑操作
      exAssetLogs:'transform/getTransformLog',//资产回兑日志
      exaDetails:'transform/getOneToTwoDetail',//资产日志详情
      exHbyInfo:'transform/getBlockToTwoAdd',//HBY回兑信息
      exHbyAction:'transform/blockToTwoAdd',//HBY回兑操作
      exHbyLogs:'transform/getBlockToTwoLog',//HBY回兑日志
      exhlDetails:'transform/getBlockToTwoDetail',//HBY回兑日志详情
      exFireInfo:'transform/getBlockToTwoAdd',//火种回兑信息
      exFireAction:'transform/twoToBlockAdd',//火种回兑操作
      exFireLogs:'transform/getTwoToBlockLog',//火种回兑日志
      exflDetails:'transform/getMoneyToTwoDetail'//火种回兑日志闲情
    },
    receipt:{ //收款
      methods:'receivables/getReceivables',//收款账户信息
      alipay:'receivables/binDaliPay',//提交支付宝收款信息
      wechat:'receivables/bindWeChat',//提交微信收款
      bankList:'receivables/userBankList',//获取银行卡列表
      bankMsg:'receivables/getBankInfo',//银行卡信息
      addBankCard:'receivables/addBank',//添加银行卡
      editBankCard:'receivables/editBank',//修改银行卡
      removeBankCard:'receivables/delBank'//移除银行卡
    },
    person:{ //个人
      allInfo:'user/getUserInfo',//个人全部资料
      ownerInfo:'user/getPersonalInfo',//个人资料
      editInfo:'user/editPersonalInfo'//修改个人信息
    },
    USDT:{ //USDT
      convert:'usdt/getUsDtInfo',//兑换、提现、充值 type不同
      cvAction:'usdt/usDtTransform',//兑换操作
      cvLogs:'usdt/getTransformLog',//兑换日志
      dsAction:'usdt/usDtCarry',//提现操作
      dsLogs:'usdt/getCarryLog',//提现日志
      rcAction:'usdt/usDtRecharge',//充值操作
      rcLogs:'usdt/getRechargeLog', //充值日志
      bind:'usdt/addUsDtAddress', //绑定USDT
      b_hby:'usdt/addHbyAddress' //绑定HBY
    },
    alter:{ //修改
      upLoginPwd:'user/savePassword',//修改登录密码
      upExchangePwd:'user/saveSecPwd'//修改交易密码
    },
    community:{ //社区
      cmtInfo:'agent/getAgentInfo',//社区信息
      cmtList:'agent/getAgentList'//社区列表
    },
    notice:{ //公告
      noticeList:'notice/getNoticeTitle',//公告列表
      noticeDetail:'notice/getDetail'//公告详情
    },
    leaveMessage:{ //留言
      lMessageType:'message/getMessageType',//留言类型
      lMessageAction:'message/messageAdd',//提交留言
      lMessagelList:'message/getMessageList' //留言列表
    },
    address:{ //地址
      insertAddress:'address/addAddress',//添加地址
      upAddress:'address/editAddress',//修改地址
      addressList:'address/getAddressList',//地址列表
      addressDetail:'address/getAddressInfo',//地址详情
      setDefault:'address/setDefault',//设置默认地址
      delAddress:'address/delAddress',//删除地址
      linkageAddress:'config/getApiRegion' //联动地址
    },
    aboutUs:{ //关于我们
      default:'notice/getAboutInfo'
    },
    moneyManage:{ //首页节点资产、火种资产
      moneyType:'money/getMoneyType',//钱包类型分类
      moneyLogs:'money/getMoneyLog',//钱包日志
      logsDetail:'money/getMoneyDetail' //日志详情
    },
    HbyAsset:{ //首页HBY资产
      assetType:'block/getBlockType',//类型分类
      assetLogs:'block/getBlockLog',//资产日志
      logsDetail:'block/getBlockDetail' //日志详情
    },
    fireDeal:{ //火种交易
      balance:'epMoney/getUserMoney',//获取余额
      buyList:'epMoney/getEpBuyList',//买家列表
      buyAction:'epMoney/sellToUser',//出售操作
      sellList:'epMoney/getEpSellList',//卖家列表
      sellAction:'epMoney/buyToUser',//购买操作
      publickBuy:'epMoney/buyAdd',//发布买单
      publickSell:'epMoney/sellAdd',//发布卖单
      searchBuy:'epMoney/getSeekBuy',//买单搜索
      searchSell:'epMoney/getSeekSell',//卖单搜索
      deals:'epMoney/getStayPayList',//交易列表
      details:'epMoney/getEqDetail',//交易详情
      payment:'epMoney/playEpMoney',//确认打款
      receipt:'epMoney/confirmEpMoney',//确认收款
      messages:'epMoney/getMessageList',//留言列表
      addMessage:'epMoney/messageAdd',//添加留言
      tradeList:'epMoney/getTradeList',//交易记录列表  
      revocationBuy:'epMoney/buyRevoke',//买入撤销交易
      revocationSell:'epMoney/sellRevoke',//卖出撤销交易
    },
    HbyDeal:{//HBY交易
      balance:'epBlock/getUserBlock',//获取余额价格
      buyOrders:'epBlock/getEpBuyList',//获取买入订单列表
      sellOrders:'epBlock/getEpSellList',//获取卖出订单列表
      releaseBuy:'epBlock/buyAdd',//买入发布操作
      releaseSell:'epBlock/sellAdd',//出售发布操作
      sell:'epBlock/sellToUser',//出售操作
      buy:'epBlock/buyToUser',//购买操作
      buyList:'epBlock/getBuyList',//买入列表
      sellList:'epBlock/getSellList',//卖出列表
      details:'epBlock/getEpDetail',//交易详情
      remit:'epBlock/playMoney',//汇款操作
      receipt:'epBlock/confirmEpBlock',//收款操作
      chart:'epBlock/getBlockPriceList',//折线图
      withdrawInfo:'block/getBlockInfo',//hby提现信息
      withdrawSubmit:'block/carryAdd',//hby提现操作
      withdrawlogs:'block/getBlockCarryLog',//hby提现日志
      
    },
    commercial:{ //商学院
      categofy:'news/getCategoryList',//分类
      list:'news/getList',//列表
      details:'news/detail'//详情
    },
    share:{ //分享
     message :'user/tjrCode'
    },
    BsnSystem:{ //商家系统
      isBusiness:'store/isNotStore',//是否为商家
      apply:'store/storeAdd',//申请商家
      baseMsg:'store/getStoreAdd',//商家基本信息
      Goods:'store/getStoreGoodsList',//商家商品
      storeInfo:'store/getStoreInfo',//商家中心信息
      orders:'store/getOrderList',//商家订单列表
      confirmSend:'store/confirmDeliver',//确认发货
      setUp:'store/getStoreSet',//获取商家设置信息
      commitSetUp:'store/storeSet',//提交商家设置信息
      category:'store/getCateList',//商品分类
      financeCategory:'block/getBlockType',//财务分类
      financeLogs:'block/getBlockLog',//财务日志
      release:'store/goodsAdd',//发布商品
      storeBanner:'store/getStoreBanner',//商铺轮播图
    },
    activate:{//激活会员
     activation:"user/activateUser"
    },
    games:{ //游戏
      recommend:'getGameList',//游戏列表
      luckyDraw:'turn/getTurnList',//抽奖奖品列表
      drawAction:'luckyTurnAdd',//抽奖
      drawLog:'turn/getTurnLog',//抽奖日志
    },
    lineStore:{ //线下商家
      recommend:'store/getStoreTopList',//推荐商家列表
      lists:'store/getStoreList',//获取商家列表
      details:'store/getStoreDetail',//商家详情
    }
};