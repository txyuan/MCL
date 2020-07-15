<template>
	<div class="real_name_root padding-header">
		<mt-header title="实名认证" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="main">
			<div class="img_wrap">
				<div class="img text-center" style="margin-bottom: 10px">
					<div class="defaultImg" v-if="isShowDefalutIdCardA">
						<img :src="idCardA" alt="">
						<p>上传身份证正面照片</p>
					</div>
					<div class="newImg" v-else>
						<img :src="param.idcardjust" alt="">
					</div>
					<!-- <input v-if="anios==1" type="file" accept="image/*" name="uploadedFile" @click="changes('A')" ref="idCardAFile"> -->
					<input type="file" accept="image/*" name="uploadedFile" @change="change($event,'A')" ref="idCardAFile">
				</div>
				<div class="img text-center">
					<div class="defaultImg" v-if="isShowDefalutIdCardB">
						<img :src="idCardB" alt="" id="bb">
						<p>上传身份证背面照片</p>
					</div>
					<div class="newImg" v-else>
						<img :src="param.idcardback" alt="">
					</div>
					<!-- <input v-if="anios==1" type="file" accept="image/*" @click="changes('B')" ref="idCardBFile"> -->
					<input type="file" accept="image/*" @change="change($event,'B')" ref="idCardBFile">
				</div>
			</div>
			<div class="form" style="margin-top: 0.06rem">
				<div class="tit">确认信息</div>
				<mt-field label="真实姓名：" v-model.trim="param.user_name" type="text" class="borderBottom" placeholder="请输入真实姓名"></mt-field>
				<mt-field label="身份证号：" v-model.trim="param.id_card" type="text" class="borderBottom" placeholder="请输入身份证号"></mt-field>
				<!-- <mt-field label="支付宝帐号：" v-model.trim="param.zhifub_card" type="text" class="borderBottom" placeholder="请输入支付宝帐号"></mt-field> -->
				<mt-field label="银行卡号：" v-model.trim="param.bank_card" type="number" class="borderBottom" placeholder="请输入银行卡号"></mt-field>
				<mt-cell title="发卡银行：" is-link @click.native="pickerToggle('show')" style="border-bottom: 1px solid #eee">
					<span>{{param.bankname}}</span>
				</mt-cell>
				<!-- <p class="link_kf">客服电话：17819815879<br />温馨提示：港澳台同胞如未能成功实名认证，请及时联系客服。</p> -->
				<mt-button type="default" class="add_btn" size="large" @click="submit">确定</mt-button>

			</div>
		</div>

		<!-- 发卡银行picker  -->
		<mt-popup v-model="popupVisible" position="bottom">
			<mt-picker :slots="sexSlots" :showToolbar="true" :visibleItemCount="3" ref="sexPicker">
				<div class="picker_bar">
					<div class="cancel" @click="pickerToggle('hide')">取消</div>
					<div class="confrim" @click="editUserInfo">确定</div>
				</div>
			</mt-picker>
		</mt-popup>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: "realName",
		data: () => ({
			isShowDefalutIdCardA: true, //是否显示默认身份证正面
			isShowDefalutIdCardB: true, //是否显示默认身份证背面
			idCardA: "https://resource.jtsc.club/zhengmian@2x.png", //默认正面
			idCardB: "https://resource.jtsc.club/beimian@2x.png", //默认反面
			param: {
				Registrant: 2,
				idcardjust: "", //身份证正面
				idcardback: "", //身份证背面
				user_name: "", //真实姓名
				id_card: "", //身份证号
				bank_card: "", //银行卡号
				bankname: "", //发卡银行
				// realname:1   //判断实名认证还是银行卡，1、实名  2、银行卡
			},
			pdsfz: 1, //判断身份证正反面
			anios: 1,
			repData: {
				Sex: "", //性别
			},
			popupVisible: false, //是否显示性别picker
			sexSlots: [{
				flex: 1,
				values: ['中国工商银行', '中国农业银行', '中国银行', '中国建设银行', '交通银行', '中信银行', '中国光大银行', '华夏银行', '中国民生银行', '广发银行', '深圳发展银行',
					'招商银行', '兴业银行', '上海浦东发展银行', '恒丰银行', '浙商银行', '渤海银行', '中国邮政储蓄银行', '北京银行'
				],
				className: 'slot1',
				textAlign: 'center'
			}],
		}),
		methods: {
			downApp() {
//				let ua = navigator.userAgent.toLowerCase();
//				//Android终端
//				let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
//				//Ios终端
//				let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
//					this.anios = 2;
//					//Ios
//				} else if (/(Android)/i.test(navigator.userAgent)) {
//					this.anios = 1;
//					//Android终端
//				}
				this.anios = 2;
			},
			change(e, type) {
				let file = e.target.files[0];
				let url = URL.createObjectURL(file);
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}; //添加请求头
				if (type == 'A') {
					let params = new FormData(); //创建form对象
					params.append('uploadedFile', file); //通过append向form对象添加数据
					this.isShowDefalutIdCardA = false;
					this.param.idcardjust = url;
					axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
						if (response.data.rspcode != 1) {
							return;
						}
						this.param.idcardjust = response.data.url;
					})
				} else if (type == 'B') {
					let params = new FormData(); //创建form对象
					params.append('uploadedFile', file); //通过append向form对象添加数据
					this.isShowDefalutIdCardB = false;
					this.param.idcardback = url;
					axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
						if (response.data.rspcode != 1) {
							return;
						}
						this.param.idcardback = response.data.url;
					})
				}
			},
			changes(types) {
				if (types == 'A') {
					this.pdsfz = 1;
				} else {
					this.pdsfz = 2;
				}
				window.back.clickOnAndroidSelectPhoto();
			},
			showbg(name) {
				let url = "UserInterface/UploadPhotos.ashx";
				this.$post(url, {
					BinaryStream: name
				}).then((data) => {
					if (data.rspcode == 0) {
						return;
					}
					if (this.pdsfz == 1) {
						this.isShowDefalutIdCardA = false;
						this.param.idcardjust = data.data.imgUrl;
					} else {
						this.isShowDefalutIdCardB = false;
						this.param.idcardback = data.data.imgUrl;
					}
				})
			},
			//显示性别picker
			pickerToggle(state) {
				if (state == "show") {
					this.popupVisible = true;
				}
				if (state == "hide") {
					this.popupVisible = false;
				}
			},
			// 反显信息
//			showInform() {
//				let url = "UserInterface/RealNameAuthenticationInfo.ashx";
//				this.$post(url).then((data) => {
//					if (data.rspCode != 1) {
//						return;
//					}
//					this.isShowDefalutIdCardA = false;
//					this.isShowDefalutIdCardB = false;
//					this.param.idcardjust = data.data.idCardJust;
//					this.param.idcardback = data.data.idCardBack;
//					this.param.user_name = data.data.user_name;
//					this.param.id_card = data.data.id_card;
//					this.param.bank_card = data.data.bank_card;
//					this.param.bankname = data.data.validity_time;
//				})
//			},
			//编辑个人信息
			editUserInfo() {
				const {
					sexPicker
				} = this.$refs;
				let sex = sexPicker.getSlotValue(0);
				this.param.bankname = sex;
				this.pickerToggle('hide');
			},
			//提交
			submit() {
				const param = this.param;
				if ((param.idcardjust == "") || (param.idcardback == "")) {
					this.$Toast("请上传有效的身份证照片")
					return;
				}
				if (param.user_name == "") {
					this.$Toast("请输入有效的真实姓名")
					return;
				}
				if (param.id_card == "") {
					this.$Toast("请输入有效的身份证号")
					return;
				}
				if (param.bank_card == "") {
					this.$Toast("请输入有效的银行卡号")
					return;
				}
				
				let { UserKey,SessionId } = this.$route.query;
				let url = `UserInterface/RealNameAuthentication.ashx?UserKey=${UserKey}&SessionId=${SessionId}`;
				this.$post(url, this.param).then((data) => {
					this.$Toast(data.rspDesc);
					if (data.rspCode != 1) {
						return;
					}
					this.$router.push(`/physician?UserKey=${UserKey}&SessionId=${SessionId}`);
				})
			},
			//input 添加失去焦点事件
			inputInputBulr() {
				var inputDoms = document.querySelectorAll(".form input");
				inputDoms = [].slice.call(inputDoms);
				inputDoms.forEach((input) => {
					input.addEventListener("focus", this.$root.windowRecordScroll.bind(this.$root), false);
					input.addEventListener("blur", this.$root.windowScrollTop.bind(this.$root), false);
				})
			}
		},
		mounted() {
			// this.showInform();
			this.downApp();
			window.showbg = this.showbg;
			let that = this;
			//头像的弹窗
			this.userActions = [{
				name: '更换头像',
				method: this.openAlbum
			}]
			//初始化input的事件
			this.inputInputBulr()
		}
	}
</script>
<style>
	.real_name_root .form {
		background: #fff;
		color: #333333;
		overflow: auto;
	}

	.real_name_root .form .tit {
		padding: 0 10px;
		line-height: 40px;
		font-size: 0.14rem;
		color: #666666;
	}

	.real_name_root .form input {
		border: none;
		color: #333333;
	}
</style>
<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	.img_wrap {
		padding: 10px;

		.img {
			position: relative;
			background: #ffffff;
			color: $color66;
			font-size: 0.14rem;
			height: 1.90rem;
		}

		.img .defaultImg {
			height: 100%;

			img {
				width: 18%;
				margin-top: 50px;
				margin-bottom: 25px;
			}
		}

		.img input[type=file] {
			opacity: 0;
			width: 100%;
			display: block;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}

		.img .newImg {
			width: 100%;
			height: 100%;
		}

		.img .newImg:before {
			content: "";
			display: inline-block;
			width: 0px;
			height: 100%;
			vertical-align: middle;
		}

		.img .newImg img {
			max-height: 100%;
			max-width: 100%;
			display: inline-block;
			vertical-align: middle;
		}
	}

	.mint-popup-bottom {
		width: 100%;
	}

	.picker_bar {
		display: flex;
		justify-content: space-between;
		text-align: center;
		line-height: 40px;
		padding: 0 20px;
		border-bottom: solid 1px #eaeaea;

		.confrim {
			color: #26a2ff;
		}
	}

	.add_btn {
		margin-top: 0.6rem;
	}

	.link_kf {
		font-size: 0.12rem;
		color: #FF3D3D;
		line-height: 0.2rem;
		padding: 0.14rem 3%;
	}
</style>
