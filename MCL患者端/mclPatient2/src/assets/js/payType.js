import {
  post,
  get
} from './request.js' // ajax 请求

const pay = {
  // 获取url参数
  getUrlParam (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg) // 匹配目标参数
    if (r != null) return decodeURI(r[2])
    return null // 返回参数值
  },
  // 获取openid
  getOpendId () {
    let code = this.getUrlParam('code')
    console.log(code);
    if (code == null) {
      return
    }
    code = code.split('/')[0]
    let url = '/UserInterface/GetUserOpenId.ashx?code=' + code
    return get(url).then((data) => {
      if (data.openid == null) { // code值不能重复使用。用户刷新页面openis会为空
        return
      }
      localStorage.openId = data.openid
    })
  },
  // 余额支付
  balancePayment (data, success, error) {
    let url = 'UserInterface/IPayment/BalancePaymentRequest.ashx'
    let param = {
      'OrderKey': data.OrderKey,
      'OrderMemo': '',
      'OrderRunType': '0'
    }
    return post(url, param).then((data) => {
      if (data.rspcode == 0) {
        error(data)
        return
      }
      success(data)
    })
  },
  // 佣金支付
  commissionPayment (data, success, error) {
    let url = 'UserInterface/IPayment/CommissionPaymentRequest.ashx'
    let param = {
      'OrderKey': data.OrderKey,
      'OrderMemo': '',
      'OrderRunType': '0'
    }
    return post(url, param).then((data) => {
      if (data.rspcode == 0) {
        error(data)
        return
      }
      success(data)
    })
  },
  // 微信订单支付方法
  wechatPayment (url, param, success, error) {
    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', () => this.onBridgeReady(url, param, success, error), false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', () => this.onBridgeReady(url, param, success, error))
        document.attachEvent('onWeixinJSBridgeReady', () => this.onBridgeReady(url, param, success, error))
      }
    } else {
      this.onBridgeReady(url, param, success, error)
    }
  },
  // 微信
  onBridgeReady (url, param, success, error) {
    post(url, param).then((data) => {
      if (data.rspcode != 1) {
        error(data)
        return
      }

      var Payment = data.Payment
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          'appId': Payment.appId, // 公众号名称，由商户传入
          'timeStamp': Payment.timeStamp, // 时间戳，自1970年以来的秒数
          'nonceStr': Payment.nonceStr, // 随机串
          'package': Payment.package,
          'signType': 'MD5', // 微信签名方式：
          'paySign': Payment.paySign // 微信签名
        },
        function (res) {
          if (res.err_msg == 'get_brand_wcpay_request:ok') { // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            success(data)
          } else {
            error(data)
          }
        })
    })
  },
  integralPay (data, success, error) {
    // 积分支付
    let url = 'UserInterface/IPayment/IntegralPaymentRequest.ashx'
    let param = {
      'OrderKey': data.OrderKey,
      'OrderMemo': '',
      'OrderRunType': '0'
    }
    post(url, param).then((data) => {
      if (data.rspcode == 0) {
        error(data)
        return
      }
      success(data)
    })
  }
}
export default pay
