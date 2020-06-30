<template>
	<div>
		<mt-header :title="title">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>

		<div class="add_cont">
			<mt-field label="收货姓名" v-model="param.UserName" placeholder="请输入收货姓名"></mt-field>
			<mt-field label="手机号" type="tel" v-model="param.UserPhone" placeholder="请输入手机号"></mt-field>
			<mt-cell title="性别" value="说明文字" class="sex">
				男&nbsp <i class="check-i" @click="changeSex('1')" :class="(param.Sex == 1) && 'checked'"></i> &nbsp&nbsp 女&nbsp <i
				 class="check-i" @click="changeSex('2')" :class="(param.Sex == 2) && 'checked'"></i>
			</mt-cell>
			<mt-cell :title="param.UserAddress" is-link @click.native="openCityPicker"></mt-cell>
			<mt-field label="详细地址" type="textarea" rows="4" v-model="param.UserDetailsAddress" placeholder="请输入详细地址"></mt-field>
		</div>

		<mt-button type="default" class="add_btn" size="large" @click="saveInfo">保存</mt-button>

		<cityPicker @confrim="cityPickerChange" ref="cityPicker" />
	</div>
</template>

<script>
	export default {
		name: "index",
		data: () => ({
			title: "",
			skey: "",
			param: {
				"UserName": "",
				"UserPhone": "",
				"UserAddress": "请选择省、市、区",
				"UserDetailsAddress": "",
				"VLatitude": 0,
				"VLongitude": 0,
				"Sex": "" // 1 男 2 女
			}
		}),
		methods: {
			//citypicker的确定回调
			cityPickerChange(values) {
				let cityValue = [values[0].name, values[1].name, values[2].name].toString();
				this.param.UserAddress = cityValue;
			},
			//打开citypicker
			openCityPicker() {
				this.$refs.cityPicker.show();
			},
			changeSex(val) {
				this.param.Sex = val;
			},
			//获取编辑值
			geteditValue() {
				this.$Indicator.loading();
				let param = {
					sKey: this.skey
				};
				let url = "UserInterface/GetUserAddressInfo.ashx";
				this.$post(url, param).then((data) => {
					if (data.rspcode == 1) {
						this.param = data.VUserAddressInfo;
					}
					this.$Indicator.close();
				})
			},
			//保存
			saveInfo() {
				let $route = this.$route;
				let param = this.param;
				let url = "";
				//新增保存
				if ($route.params.isType == "add") {
					url = "UserInterface/AddUserAddressInfo.ashx";
				}
				//编辑保存
				if ($route.params.isType == "edit") {
					url = "UserInterface/UpdateUserAddressInfo.ashx";
				}

				if (param.UserName == "") {
					this.$Toast('请输入收货姓名');
					return;
				}

				let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (!myreg.test(param.UserPhone)) {
					this.$Toast('请输入格式正确手机号');
					return;
				}
				if (param.Sex == "") {
					this.$Toast('请输入性别');
					return;
				}
				if (param.UserAddress == "请选择省、市、区") {
					this.$Toast('请选择地址');
					return;
				}

				if (param.UserDetailsAddress == "") {
					this.$Toast('请输入详细地址');
					return;
				}
				// param.UserDetailsAddress=param.UserDetailsAddress.replace(/[\r\n]/g,"");
				this.$post(url, param).then((data) => {
					if (data.rspcode == 1) {
						this.$router.back()
					}
				})
			},
			//input 添加失去焦点事件
			inputInputBulr() {
				var inputDoms = document.querySelectorAll(".add_cont input,.add_cont textarea");
				inputDoms = [].slice.call(inputDoms);
				inputDoms.forEach((input) => {
					input.addEventListener("focus", this.$root.windowRecordScroll.bind(this.$root), false);
					input.addEventListener("blur", this.$root.windowScrollTop.bind(this.$root), false);
				})
			}
		},
		mounted() {
			let $route = this.$route;
			let title = "";
			if ($route.params.isType == "add") {
				title = "添加地址";

			}
			if ($route.params.isType == "edit") {
				title = "编辑地址";
				this.skey = $route.query.skey;
				this.geteditValue();
			}
			this.title = title;
			//初始化input的事件
			this.inputInputBulr();
		},
		components: {
			cityPicker: () => import( /* webpackChunkName: "cityData" */ "./../../common/cityPicker.vue")
		}
	}
</script>

<style scoped>
	.add_cont {
		margin-top: 0.05rem;
	}

	.add_cont>a {
		border-bottom: 1px solid #eee;
		box-sizing: border-box;
	}
</style>
