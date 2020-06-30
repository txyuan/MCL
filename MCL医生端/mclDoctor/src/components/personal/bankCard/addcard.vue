<template>
	<div>
		<div id="class_header" class="myassets">
			<mt-header fixed title="添加银行卡">
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>
		</div>
		<div class="addc_cont">
			<div class="addc_list">
				<label>持卡人</label>
				<input type="text" v-model="informs.ContactName" readonly="readonly" />
			</div>
			<div class="addc_list">
				<label>持卡人</label>
				<input type="text" v-model="informs.id_card" readonly="readonly" />
			</div>
			<div class="addc_list">
				<label>卡&nbsp;&nbsp;&nbsp;号</label>
				<input type="text" v-model="inputValue" @click="abab" />
				<img src="../../../assets/images/paizhao@2x(1).png" />
			</div>
			<div class="addc_list">
				<label>手机号</label>
				<input type="text" v-model="informs.ContactPhone" readonly="readonly" />
			</div>
			<div class="addc_list">
				<label>验证码</label>
				<input type="tel" v-model.trim="code" @click="abc" @focus="$root.windowRecordScroll" @blur="$root.windowScrollTop" />
				<span v-on:click="phonet()">
					<i v-if="isDown"> {{time}}</i>
					<i v-else>{{getCode}}</i>
				</span>
			</div>
		</div>
		<mt-button type="default" class="add_btn" size="large" @click="addbankcard">下一步</mt-button>
		<div class="addcd_sz" v-if="kahao">
			<p v-for="(item,index) in list" :key="index" @click="onkey(item)"><img v-if="item=='x'" src="@/assets/images/guanbi@2x.png" /><span
				 v-if="item!='x'">{{item}}</span></p>
		</div>
		<div class="addcd_sz" v-if="codes">
			<p v-for="(item,index) in list" :key="index" @click="onkeys(item)"><img v-if="item=='x'" src="@/assets/images/guanbi@2x.png" /><span
				 v-if="item!='x'">{{item}}</span></p>
		</div>
	</div>
</template>

<script>
	export default {
		name: "addcard",
		data: () => ({
			inputValue: '',
			rphone: '',
			phone: '',
			code: '',
			getCode: "获取验证码",
			VerificationCode: 60,
			isDown: false,
			list: [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'x'],
			passlist: [],
			passlists: [],
			kahao: true,
			codes: false,
			informs:{}
		}),
		computed: {
			time: function() {
				setTimeout(() => {
					if (this.VerificationCode <= 0) {
						this.isDown = false;
						this.VerificationCode = 60;
						return
					}
					this.VerificationCode--
				}, 1000)
				return `${this.VerificationCode}s后发送`
			}
		},
		methods: {
			// 获取信息
			getinform(){
				let url = "UserInterface/GetUserShowInfo.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.informs=data.data;
				})
			},
			onkey(item) {
				if (item != 'x') {
					if (this.passlist.length <= 18) {
						this.passlist.push(item);
					}
				} else {
					this.passlist.pop();
				}
				this.inputValue = this.passlist.join("");

			},
			abab() {
				this.codes = false;
				this.kahao = true;
			},
			abc() {
				this.kahao = false;
				this.codes = true;
			},
			onkeys(item) {
				if (item != 'x') {
					if (this.passlists.length <= 3) {
						this.passlists.push(item);
					}
				} else {
					this.passlists.pop();
				}
				this.code = this.passlists.join("");

			},
			//验证码
			phonet() {
				let url = "UserInterface/UserRegeditCode.ashx";
				let userphone = this.informs.ContactPhone;
				let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.informs.ContactPhone)) {
					this.$Toast('请输入格式正确的手机号');
					return;
				}
				let jmnum = this.$root.getjmw(this.informs.ContactPhone);
				let datass = this.$root.$getCode(jmnum);
				if (this.isDown) {
					return;
				}
				this.isDown = true;
				let param = {
					"userphone": this.informs.ContactPhone,
					"ucode": encodeURI(datass)
				};
				this.$post(url, param).then((data) => {
					this.$Toast(data.rspdesc);
					if (data.rspcode != 1) {
						return;
					}
				})
			},
			// 添加银行卡
			addbankcard(){
				let url = "UserInterface/AddBankCard.ashx";
				let param = {
					"bankcard": this.inputValue,
					"userphone": this.informs.ContactPhone,
					"vercode":this.code
				};
				this.$post(url, param).then((data) => {
					this.$Toast(data.rspdesc);
					if (data.rspcode != 1) {
						return;
					}
					this.$router.push('/bankCard');
				})
			}
		},
		mounted: function() {
			this.getinform();
			let rphone = this.$route.query.rphone;
			this.rphone = rphone
		}
	}
</script>

<style lang="scss" scoped>
	.addc_cont {
		margin-top: 0.1rem;
		padding-top: 43px;

		.addc_list {
			height: 0.45rem;
			padding: 0 5%;
			background: #fff;
			border-bottom: 1px solid #EEEEEE;
			overflow: hidden;

			label {
				width: 0.5rem;
				display: block;
				float: left;
				line-height: 0.45rem;
				font-size: 0.15rem;
				color: #333;
			}

			input {
				width: 50%;
				height: 0.45rem;
				border: none;
				margin-left: 2%;
				color: #999;
				font-size: 0.15rem;
			}

			img {
				height: 0.23rem;
				float: right;
				margin-top: 0.11rem;
			}

			span {
				width: 1.0rem;
				height: 0.45rem;
				box-sizing: border-box;
				display: block;
				float: right;
				line-height: 0.45rem;
				color: #4A8EF4;
				text-align: right;
				font-size: 0.14rem;

				i {
					font-style: normal;
				}
			}
		}
	}

	.addcd_sz {
		background: #fff;
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		overflow: hidden;

		p {
			width: 33.333%;
			float: left;
			font-size: 0.2rem;
			color: #666;
			height: 0.56rem;
			text-align: center;
			line-height: 0.56rem;
			box-sizing: border-box;
			border: 1px solid #eee;

			img {
				width: 0.2rem;
				height: 0.2rem;
			}
		}
	}
</style>
