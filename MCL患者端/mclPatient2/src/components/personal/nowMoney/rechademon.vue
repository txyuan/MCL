<template>
	<div class="padding-header">
		<mt-header fixed title="余额充值">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="recharge_cont">
			<h2>充值金额</h2>
			<p>¥ <input type="number" v-model="moneyc"@keyup="value=value.replace(/^(0+)|[^\d]+/g,'')" /></p>
			<ul>
				<li v-for="(item,index) in items" v-on:click="addClassFun(index,item)" v-bind:class="{act: index==isActive}">
					<span>{{item.ShowContent}}</span>
				</li>
			</ul>
		</div>

		<!-- <div class="recharge_pay">
			<h3>支付方式</h3>
			<ul>
				<li v-for="(item,index) in itemsa" v-on:click="addClassFuna(index)" v-bind:class="{achose: index==isActivea}">
					<img :src="item.pic" alt="">
					<span>{{item.pay}}</span>
				</li>
			</ul>
		</div> -->

		<div class="note">
			<div class="note_tit">温馨提示</div>
			<div class="note_content">
				<!-- <p>1. 充值消费享受相应等级折扣；</p> -->
				<p>1. 充值成功后，余额可能存在延迟现象，一般1到5分钟内到账，如有问题，请咨询客服；</p>
				<!-- <p>3. 允许使用微信支付和支付宝支付进行充值，如遇到任何支付问题可以咨询客服；</p> -->
				<p>2. 充值完成后，您可以进入我的余额进行查看。</p>
			</div>
		</div>

		<mt-button type="default" class="add_btn" size="large" v-on:click="getRecharge()">确认充值</mt-button>
	</div>
</template>

<script>
export default {
  name: 'index',
  data: () => ({
    isActive: 0,
    moneyc: '',
    items: [],
    isActivea: 0
    // itemsa: [
    // 	//          { pic: require("@/assets/images/wechat_zhifu@2x.png"),pay:'微信支付',id:0},
    // 	{
    // 		pic: require("@/assets/images/zhifu_bao@2x.png"),
    // 		pay: '支付宝支付',
    // 		id: 1
    // 	}
    // ]
  }),
  methods: {
    addClassFun: function (index, item) {
      this.isActive = index
      this.moneyc = item.ValueContent
    },
    // addClassFuna: function(index) {
    // 	this.isActivea = index;
    // },
    // 充值金额列表
    getmoney () {
      let url = 'UserInterface/GetRechargeGradeList.ashx'
      this.$post(url).then((data) => {
        this.items = data.data
        this.moneyc = data.data[0].ValueContent
      })
    },
    // 余额充值
    getRecharge () {
      let url = 'UserInterface/IPayment/CZWPaymentRequest_vshop.ashx'
      let param = {
        'RechargeAmount': this.moneyc,
        'OpenID': localStorage.openId
      }
      // 最少20元
      // if(this.moneyc < 20){
      //   this.$Toast("充值余额不能少于20元")
      //   return;
      // }
      this.$Indicator.loading()
      // 微信支付
      this.$pay.wechatPayment(url, param, (data) => {
				  this.$Indicator.close()
				  this.$Toast(data.rspdesc)
				  this.$router.push('/wx_Entrance/personal')
      }, (data) => {
				  this.$Indicator.close()
				  this.$Toast(data.rspdesc)
      })

      // let UserKey = JSON.parse(localStorage.userInfo).UserKey;
      // let SessionId = JSON.parse(localStorage.userInfo).SessionId;
      // let activePay = this.itemsa[this.isActivea]; //当前的支付方式
      // if (activePay.id == 1) {
      // 	window.location.href = `ctm.html?UserKey=${UserKey}&SessionId=${SessionId}&moneynum=${this.moneyc}&type=8`;
      // } else {
      // 	if (this.moneyc > 500) {
      // 		this.$Toast('充值金额大于500，请使用支付宝支付');
      // 		return;
      // 	}
      // 	window.location.href = `ctmd.html?UserKey=${UserKey}&SessionId=${SessionId}&moneynum=${this.moneyc}&type=9`;
      // }
    }
  },
  mounted () {
    this.getmoney()
  }
}
</script>

<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	.recharge_cont {
		border-top: 1px solid #E0E0E0;
		background: #fff;
	}

	.recharge_cont h2 {
		color: #404040;
		font-size: 0.18rem;
		line-height: 0.5rem;
		width: 94%;
		margin: 0 auto;
	}

	.recharge_cont p {
		color: #2C2B29;
		font-size: 0.3rem;
		line-height: 0.5rem;
		width: 90%;
		margin: 0 auto;
	}

	.recharge_cont p input {
		width: 60%;
		height: 0.42rem;
		font-size: 0.3rem;
		border: none;
	}

	.recharge_cont ul {
		width: 94%;
		margin: 0 auto;
		border-top: 1px solid #E0E0E0;
		overflow: hidden;
		padding: 0.12rem 0 0.2rem 0;
	}

	.recharge_cont ul li {
		width: 32%;
		padding: 0.10rem 0;
		margin-left: 2%;
		margin-top: 0.08rem;
		text-align: center;
		float: left;
		background: #F8F8F8;
	}

	/*.recharge_cont ul li:before{*/
	/*content: "";*/
	/*display: inline-block;*/
	/*vertical-align: middle;*/
	/*width: 0;*/
	/*height: 100%;*/
	/*}*/
	.recharge_cont ul li:nth-child(1),
	.recharge_cont ul li:nth-child(4),.recharge_cont ul li:nth-child(7) {
		margin-left: 0;
	}

	.recharge_cont ul li span {
		display: inline-block;
		font-size: 0.18rem;
		text-align: center;
		color: #404040;
		vertical-align: middle;
	}

	.recharge_cont ul li label {
		font-size: 0.12rem;
		text-align: center;
		color: #606060;
		display: block;
		margin-top: 0.03rem;
	}

	.recharge_cont ul li.act {
		background: #FFDFC9;
	}

	.recharge_cont ul li.act span,
	.recharge_cont ul li.act label {
		color: #F78335;
	}

	.note {
		font-size: 0.14rem;
		background: #ffffff;
		margin-top: 0.05rem;
		padding: 0.15rem;
		padding-top: 0.10rem;
		color: $color66;
		line-height: 1.5;

		.note_tit {
			color: $color33;
			margin-bottom: 0.05rem;
		}
	}
</style>
