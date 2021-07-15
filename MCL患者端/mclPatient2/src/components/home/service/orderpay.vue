<template>
	<div>
		<mt-header fixed title="支付订单">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="serpay">
			<div class="serpayshop">
				<img src="@/assets/images/mclogo.jpg" />
				<div class="ord_odd">
					<p>{{ordername}}</p>
					<span>￥{{orderprice}}</span>
				</div>
			</div>
			<!-- <div class="paystate">
				<span>支付方式： {{payname}}</span>
				<label>余额： ￥{{balance}}</label>
			</div> -->
			<p class="gopay" @click="pay">确认支付</p>
			<!-- <span class="goczz" @click="gochoz">去 充 值</span> -->
		</div>

	</div>
</template>

<script>
export default {
  name: 'order-pay',
  data: () => ({
    orderskey: '', // 订单主键
    ordername: '', // 订单名称
    orderprice: '', // 订单金额
    payname: '', // 支付名称
    balance: '' // 用户余额
  }),
  methods: {
    getpayinform (sKey) {
      let url = 'UserInterface/ScreeningPaymentInfo.ashx'
      let param = {
        orderskey: sKey,
        flag: (this.$route.query.flag === '1' ? 1 : 2) // 1：个人中心的营养筛查列表进来  2. 首页登录成功，进来这个页面
      }
      this.$post(url, param).then((data) => {
        if (data.rspcode != 1) {
          return
        }
        this.orderskey = data.orderskey
        this.ordername = data.ordername
        this.orderprice = data.orderprice
        this.payname = data.payname
        this.balance = data.balance
      })
    },
    // ok_pay () {
    //   this.$MessageBox.prompt('支付密码').then(({ value, action }) => {
    //     if (value == '') {
    //       this.$Toast('请输入支付密码')
    //       return
    //     };
    //     let url = 'UserInterface/UserPassword2Check.ashx'
    //     let param = {
    //       'password2': value
    //     }
    //     this.$post(url, param).then((data) => {
    //       if (data.rspcode != 1) {
    //         this.$Toast(data.rspdesc)
    //         return
    //       }
    //       this.pay()
    //     })
    //   }, function () {})
    //   setTimeout(() => {
    //     let $text = document.querySelector('.mint-msgbox-wrapper .mint-msgbox-input .mint-msgbox-errormsg')
    //     $text.style.visibility = 'visible'
    //     $text.innerHTML = `<p style="color: #F78335; margin-top: 10px;">温馨提示：如没有支付密码，请前往<a id='twopass' style="text-decoration: underline; color: rgb(64, 116, 255);">个人中心</a>设置！</p>`
    //     document.querySelector('#twopass').onclick = () => {
    //       document.querySelector('.mint-msgbox-cancel').click()
    //       this.$router.push('/twopass')
    //     }
    //   }, 0)
    // },
    pay () {
      let url = 'UserInterface/IPayment/CZWPaymentRequest_vshop.ashx'
      let param = {
        'RechargeAmount': Number(this.orderprice),
        'OpenID': localStorage.openId,
        'PaymentType': 1, // 【1：营养筛查；2：管理套餐；3：商品订单；4：活动订单；5：会员年卡】
		'orderFlag': 0,
        'orderskey': this.orderskey
      }
      this.$Indicator.loading()
      // 微信支付
      this.$pay.wechatPayment(url, param, (data) => {
        this.$Indicator.close()
        this.$Toast(data.rspdesc)
        this.$router.push('/personalnutrition')
      }, (data) => {
        this.$Indicator.close()
        this.$Toast(data.rspdesc)
      })
    },
    // pay () {
    //   let url = 'UserInterface/IPayment/ScreeningPaymentRequest.ashx'
    //   let param = {
    //     orderskey: this.orderskey
    //   }
    //   this.$post(url, param).then((data) => {
    //     this.$Toast(data.rspdesc)
    //     if (data.rspcode != 1) {
    //       return
    //     }
    //     this.$router.push('/personalnutrition')
    //   })
    // },
    gochoz () {
      this.$router.push('/rechademon')
    }
  },
  mounted () {
    let sKey = this.$route.params.skey
    this.getpayinform(sKey)
  }
}
</script>

<style scoped lang="scss">
	.serpay{
		padding-top: 44px;
		.serpayshop{
			width: 94%;
			background: #fff;
			overflow: hidden;
			padding: 0.1rem 3%;
			img{
				display: block;
				float: left;
				height: 0.7rem;
			}
			.ord_odd{
				float: left;
				font-size: 0.14rem;
				font-weight: 500;
				margin-left: 3%;
				p{
					padding-top: 0.04rem;
				}
				span{
					display: block;
					padding-top: 0.14rem;
					color: #f78335;
					font-size: 0.16rem;
				}
			}
		}
		.paystate{
			width: 94%;
			padding: 0 3%;
			margin-top: 0.1rem;
			font-size: 0.14rem;
			height: 0.4rem;
			overflow: hidden;
			line-height: 0.4rem;
			background: #fff;
			span{
				display: block;
				float: left;
			}
			label{
				display: block;
				float: right;
				color: #f78335;
				font-weight: 600;
				margin-right: 5%;
			}
		}
		.gopay{
			width: 86%;
			height: 0.4rem;
			background: #f78335;
			line-height: 0.4rem;
			text-align: center;
			color: #fff;
			border-radius: 0.2rem;
			margin: 0 auto;
			font-size: 0.15rem;
			margin-top: 0.6rem;
		}
		.goczz{
			width: 86%;
			height: 0.4rem;
			background: #fff;
			line-height: 0.4rem;
			text-align: center;
			color: #f78335;
			border-radius: 0.2rem;
			margin: 0 auto;
			font-size: 0.15rem;
			margin-top: 0.14rem;
			display: block;
			border: 1px solid #f78335;
			box-sizing: border-box;
		}
	}
</style>
