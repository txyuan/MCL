<template>
	<div>
		<mt-header title="确认订单" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>

		<div class="marginHeader">
			<div class="adr" @click="addAdr">
				<div v-if="isDefaultAdr">
					<p class="info-p">
						<span class="name">{{defaultAdr.userName}}</span>
						<span class="tel"> {{defaultAdr.userPhone}}</span>
						<smallButton text="默认" class="float_right" />
					</p>
					<p class="adr-p">{{defaultAdr.address}}</p>
				</div>
				<div v-else>
					<p class="text-center add-adr"><span>添加地址</span></p>
				</div>
				<i data-v-b32ccdb4="" class="mint-cell-allow-right"></i>
			</div>

			<div class="person">

				<productContent class="product" v-for="(item, index) in goodsList" :key="index" :item="item" :ABflag="ABflag" />

				<!-- <div class="price-area">
						<p class="clear"><span class="float_left">商品金额：</span><span class="themeRed">¥{{orderInfo.goodsAmount}}</span> </p>
					  </div>

					<div class="price-area">
					  <p class="clear zhegetm"><span class="float_left" style="font-size: 0.15rem;">快递：</span><span style="color: #999;font-size: 0.15rem;">¥{{orderInfo.goodsAmount}}</span> </p>
					</div>
				<div class="price-area">
					<p class="clear zhegebh">
						<span class="float_left">积分：</span>
						<span class="themeRed nowjif">当前积分 100，积分可抵 <i class="themeRed">￥100.00</i></span>
						<span class="xuanze">
							<i></i>
						</span>
					</p>
				</div> -->
				<div class="moneysss">
					<p>
						<span>商品金额：</span>
						<label>¥{{orderInfo.orderAmount}}</label>
					</p>
					<!-- <p>
						<span>运费：</span>
						<label class="themeRed">¥{{orderInfo.goodsAmount}}</label>
					</p> -->
				</div>
				<div class="price-area" style="margin: 0.08rem 0;">
					<p class="clear price-states"><span class="float_left">支付方式：</span><span>{{paymoney}}</span>
						<!-- @click="showsta()"-->
					</p>
				</div>
				<!-- <div class="fried_phone" style="margin-top: 0;border-top: 1px solid #eee">
					<label>支付密码：</label>
					<input type="password" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" placeholder="请输入您的支付密码"
					 v-model.trim="erjpass" />
				</div>
				<p class="tsejmm">温馨提示：为了您的账户安全，请输入支付密码，如没有支付密码，请前往<router-link to="/twopass" style="text-decoration: underline;color: rgb(64, 116, 255);">个人中心</router-link>设置！</p> -->
			</div>
		</div>

		<div class="fix_bottom" @click="pay">
			<mt-button type="danger" size="large">确认支付</mt-button>
		</div>
		<div class="pay_state" v-if="isShow">
			<div class="pay_statein">
				<img src="@/assets/images/guanbi@2x.png" class="imgh" @click="hidesta()" />
				<h3>选择支付方式</h3>
				<ul>
					<li v-for="(item,index) in payList" :key="index" @click="kouwei(index,item.names,item.ptype)" v-bind:class="{acyr:index==isShowpay}">
						<img :src="item.imgs" />
						<p>{{item.names}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import smallButton from './../common/smallButton.vue'
import productContent from './../personal/myCollage/productContent.vue'
import juanj from '@/assets/images/zsyh.png'
import w_yue from '@/assets/images/yepay.png'
export default {
  name: 'index',
  data: () => ({
    note: '',
    isShow: false, // 显示隐藏支付方式
    payList: [{
      imgs: juanj,
      names: '招商银行储蓄卡(0771)',
      ptype: 2
    },
    {
      imgs: w_yue,
      names: '积分支付',
      ptype: 1
    }
    ],
    isShowpay: 0,
    paymoney: '微信', // 支付方式
    payFlag: 1,
    ABflag: '',
    erjpass: '', // 二级密码
    isDefaultAdr: false, // 是否有默认地址
    defaultAdr: {}, // 默认地址信息
    goodsList: [], // 商品列表
    orderInfo: {} // 订单信息
  }),
  methods: {
    // 添加默认地址
    addAdr () {
      this.$router.push('/personalreceivingadress')
    },
    // 获取订单信息
    getOrderInfo () {
      this.$Indicator.loading()
      let url = 'UserInterface/cart/orderConfirmImmediately.ashx'
      let ABflag = this.$route.query.ABflag
      this.ABflag = ABflag
      let param = {
        'addressId': '',
        ABflag
      }
      this.$post(url, param).then((data) => {
        this.$Indicator.close()
        if (data.rspcode != 1) {
          // this.$router.push("/wx_Entrance/personal")
          return
        }
        let {
          addressInfo,
          goodsList,
          orderInfo
        } = data.data
        this.defaultAdr = addressInfo

        this.orderInfo = orderInfo
        goodsList.forEach((item) => {
          item.orderTypeText = '零售商品'
          item.showPrice = item.proPrice
        })
        this.goodsList = goodsList
        // 没有默认地址
        if (addressInfo.addressId) {
          this.isDefaultAdr = true
        }
      })
    },
    // 验证密码
    // saveOrder () {
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
    //       // this.saveOrders(1)
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
      if (!this.defaultAdr.addressId) {
        this.$Toast('请完善收货地址')
        return
      }
      const orderType = this.$route.query.orderType
      let url = 'UserInterface/IPayment/CZWPaymentRequest_vshop.ashx'
      let param = {
        'RechargeAmount': Number(this.orderInfo.orderAmount),
        'OpenID': localStorage.openId,
        'PaymentType': orderType, // 【1：营养筛查；2：管理套餐；3：商品订单；4：活动订单；5：会员年卡】
        'addressId': this.defaultAdr.addressId
      }
      this.$Indicator.loading()
      // 微信支付
      this.$pay.wechatPayment(url, param, (data) => {
        this.$Indicator.close()
        this.$Toast(data.rspdesc)
        // 2：管理套餐
        if (param.PaymentType == 2) {
          this.$router.push({
            path: '/managePackage'
          })
        }
        // 3：商品订单
        if (param.PaymentType == 3) {
          this.$router.push({
            path: '/personalgetproduct'
          })
        }
      }, (data) => {
        this.$Indicator.close()
        this.$Toast(data.rspdesc)
      })
    },
    // 保存订单
    // saveOrders (orderPayType) {
    //   let url = 'UserInterface/cart/orderPayImmediately.ashx'
    //   let addressId = (this.defaultAdr.addressId) ? this.defaultAdr.addressId : ''
    //   let ABflag = this.$route.query.ABflag
    //   this.$Indicator.loading()
    //   // orderFrom  0: 购物车过来的
    //   let param = {
    //     'orderFrom': this.$route.query.orderFrom,
    //     'addressId': addressId,
    //     'note': '',
    //     'cardsKey': '',
    //     'time': '2017-12-22 18:20',
    //     'orderPayType': orderPayType,
    //     ABflag,
    //     'orderType': this.$route.query.orderType
    //   }
    //   this.$post(url, param).then((data) => {
    //     this.$Indicator.close()
    //     this.$Toast(data.rspdesc)
    //     if (data.rspcode != 1) {
    //       return
    //     }
    //     // 2：管理套餐
    //     if (param.orderType == 2) {
    // 			 	this.$router.push({
    //         path: '/managePackage'
    //       })
    //     }
    //     // 3：商品订单
    //     if (param.orderType == 3) {
    // 			 	this.$router.push({
    //         path: '/personalgetproduct'
    //       })
    //     }
    //   })
    // },
    showsta () {
      this.isShow = true
    },
    hidesta () {
      this.isShow = false
    }
  },
  mounted () {
    this.getOrderInfo()
  },
  components: {
    smallButton,
    productContent
  }

}
</script>

<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	.marginHeader {
		padding-bottom: 52px;
	}

	.adr {
		position: relative;
		padding: 0.12rem 0.44rem 0.12rem 0.40rem;
		min-height: 67px;
		box-sizing: border-box;
		background: url("../../assets/images/adr.png") no-repeat 0.08rem center;
		background-size: 0.24rem;
		background-color: white;
		margin-bottom: 0.05rem;

		.info-p {
			color: $color40;
			margin-bottom: 5px;
		}

		.adr-p {
			color: $color60;
			font-size: 0.13rem;
			@include ellipsis(1);
		}

		.add-adr {
			color: $color40;

			span {
				display: inline-block;
				line-height: 40px;
				background: url("../../assets/images/jia_no@3x.png") no-repeat left;
				background-size: 30px;
				padding-left: 35px;
			}
		}
	}

	.check-i {
		display: inline-block;
		vertical-align: middle;
	}

	.price-area {
		background-color: white;
		overflow: auto;
		margin-bottom: 0.05rem;

		p {
			margin: 0.10rem 0;
			padding: 0 0.10rem;
			overflow: hidden;
			color: $color60;
		}
	}

	.product {
		padding: 0.10rem;
		background-color: white;
		margin-bottom: 0.05rem;
	}

	.allPrice {
		font-size: 0.18rem;
	}

	.tip {
		color: $color40;
	}

	.fontW {
		font-size: 0.18rem;
		font-weight: bold;
	}

	.fix_bottom {
		padding: 0.05rem;
		background-color: white;
		border-top: 1px solid $bgF8;
	}

	.fried_phone {
		background: #fff;
		padding: 0.1rem 3%;
	}

	.fried_phone label {
		font-size: 0.14rem;
	}

	//      .fried_phone input{
	//        text-align: right;
	//        float: right;
	//      }
	.tsejmm {
		padding: 0 4%;
		margin-top: 0.1rem;
		font-size: 0.12rem;
		color: #F78335;
		line-height: 0.2rem;
	}

	.price-states {
		background: url('./../../assets/images/jixu@2x.png') no-repeat 97% center;
		background-size: 0.1rem;
	}

	.pay_state {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999999;
		background: rgba(000, 000, 000, 0.6);

		.pay_statein {
			width: 100%;
			height: 2.4rem;
			background: #fff;
			position: absolute;
			bottom: 0;
			left: 0;

			.imgh {
				position: absolute;
				right: 3%;
				top: 0.12rem;
				width: 0.2rem;
			}

			h3 {
				width: 100%;
				height: 0.44rem;
				font-size: 0.15rem;
				color: #666;
				line-height: 0.44rem;
				text-align: center;
				font-weight: normal;
				border-bottom: 1px solid #EEEEEE;
			}

			ul {
				li {
					width: 100%;
					height: 0.5rem;
					overflow: hidden;
					border-bottom: 1px solid #EEEEEE;

					img {
						height: 0.24rem;
						float: left;
						margin-left: 4%;
						margin-top: 0.13rem;
					}

					p {
						height: 0.5rem;
						line-height: 0.5rem;
						margin-left: 4%;
						float: left;
					}

					&.acyr {
						background: url('./../../assets/images/dui.png') no-repeat 96% center;
						background-size: 0.22rem;
					}
				}
			}
		}
	}

	.zhegebh {
		height: 0.22rem;

		span {
			line-height: 0.22rem;
			display: block;
			float: left;
		}
	}

	.zhegetm {
		height: 0.2rem;

		span {
			line-height: 0.2rem;
		}
	}

	.nowjif {
		font-size: 0.12rem;
		color: #666;

		i {
			font-style: normal;
		}
	}

	.moneysss {
		padding: 0 3%;
		padding-bottom: 0.1rem;
		background: #fff;

		p {
			padding: 0.1rem 0 0 0;
			overflow: hidden;
			font-size: 0.15rem;

			span {
				float: left;
				color: #333;
			}

			label {
				float: right;
				font-size: 0.14rem;
			}
		}
	}

	.xuanze {
		width: 0.32rem;
		height: 0.16rem;
		border: 1px solid #F78335;
		border-radius: 0.16rem;
		float: right !important;
		position: relative;

		i {
			display: block;
			font-style: normal;
			width: 0.12rem;
			height: 0.12rem;
			background: #F78335;
			border-radius: 0.06rem;
			position: absolute;
			right: 0.04rem;
			top: 0.02rem;
		}
	}
</style>
