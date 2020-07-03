<template>
	<div>
		<mt-header fixed title="商家认证">
			<div slot="left">
				<router-link to="/wx_Entrance/personal" style="color: initial">
					<mt-button icon="back"></mt-button>
				</router-link>
			</div>
		</mt-header>
		<div class="mercht_cont">
			<div class="mercht_name">
				<div class="mercht_list">
					<span>法人姓名：</span>
					<input type="text" v-model="fname" />
				</div>
				<div class="mercht_list">
					<span>法人身份证号：</span>
					<input type="text" v-model="fcard" />
				</div>
				<div class="mercht_list mercht_sele">
					<span>所在地区</span>
					<input type="text" placeholder="请选择" v-model="childWords" @click="choscty" readonly="readonly" />
				</div>
			</div>
			<div class="mercht_pic">
				<h3>1.上传法人身份证照片</h3>
				<div class="mercht_img">
					<div class="mercht_card">
						<div class="mercht_wrap">
							<input v-if="anios==1" type="file" accept="image/*" name="uploadedFile" @click="changes('A')" ref="idCardAFile" />
							<input v-else type="file" accept="image/*" name="uploadedFile" @change="change($event,'A')" ref="idCardAFile">
							<img :src="idCardA" v-if="isShowDefalutIdCardA" />
							<img :src="idcardjust" v-else />
						</div>
						<p>身份证正面</p>
					</div>
					<div class="mercht_card" style="float: right;">
						<div class="mercht_wrap">
							<input v-if="anios==1" type="file" accept="image/*" name="uploadedFile" @click="changes('B')" ref="idCardAFile" />
							<input v-else type="file" accept="image/*" name="uploadedFile" @change="change($event,'B')" ref="idCardAFile">
							<img :src="idCardB" v-if="isShowDefalutIdCardB" />
							<img :src="idcardback" v-else />
						</div>
						<p>身份证背面</p>
					</div>
				</div>
				<h4>请确保您的身份证摆放平整，信息清晰可见。</h4>
			</div>
			<div class="mercht_pic">
				<h3>2.上传营业执照照片</h3>
				<div class="mercht_imgy">
					<div class="mercht_wrap">
						<input v-if="anios==1" type="file" accept="image/*" name="uploadedFile" @click="changes('C')" ref="idCardAFile" />
						<input v-else type="file" accept="image/*" name="uploadedFile" @change="change($event,'C')" ref="idCardAFile">
						<img :src="yyzzc" v-if="yyzz" />
						<img :src="yyzzpic" v-else />
					</div>
				</div>
				<h4>请确保您的证件信息清晰可见</h4>
			</div>
		</div>
		<router-link to="" class="buttons" style="z-index: 3;">
			<mt-button type="danger" @click="submits" class="add_btns" size="large">提交</mt-button>
		</router-link>
		<choose-city v-on:child-say="listenToMyBoy" ref="child" />
	</div>
</template>

<script>
	import axios from 'axios'
	import chooseCity from "./chooseCity.vue"; //选择城市
	export default {
		name: "index",
		data: () => ({
			isShowDefalutIdCardA: true, //是否显示默认身份证正面
			isShowDefalutIdCardB: true, //是否显示默认身份证背面
			yyzz: true, //是否显示默认营业执照
			idCardA: "https://resource.jtsc.club/sfidcard.png", //默认正面
			idCardB: "https://resource.jtsc.club/sfidcard.png", //默认反面
			yyzzc:"https://resource.jtsc.club/sfidcard.png",  //默认营业执照
			pdsfz: 1, //判断身份证正反面
			anios: 1,
			fname: '', //法人姓名
			fcard: '', //法人身份证号
			childWords: '', //所在地区
			idcardjust: '', //身份证正面
			idcardback: '', //身份证背面
			yyzzpic:'',  //营业执照
			parentMsg: false
		}),
		methods: {
			downApp() {
				let ua = navigator.userAgent.toLowerCase();
				//Android终端
				let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
				//Ios终端
				let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
				if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					this.anios = 2;
					//Ios
				} else if(/(Android)/i.test(navigator.userAgent)) {
					this.anios = 1;
					//Android终端
				}
			},
			change(e, type) {
				let file = e.target.files[0];
				let url = URL.createObjectURL(file);
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}; //添加请求头
				if(type == 'A') {
					let params = new FormData(); //创建form对象
					params.append('uploadedFile', file); //通过append向form对象添加数据
					this.isShowDefalutIdCardA = false;
					this.idcardjust = url;
					axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
						if(response.data.rspcode != 1) {
							return;
						}
						this.idcardjust = response.data.url;
					})
				} else if(type == 'B') {
					let params = new FormData(); //创建form对象
					params.append('uploadedFile', file); //通过append向form对象添加数据
					this.isShowDefalutIdCardB = false;
					this.idcardback = url;
					axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
						if(response.data.rspcode != 1) {
							return;
						}
						this.idcardback = response.data.url;
					})
				}else if(type == 'C') {
					let params = new FormData(); //创建form对象
					params.append('uploadedFile', file); //通过append向form对象添加数据
					this.yyzz = false;
					this.yyzzpic = url;
					axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
						if(response.data.rspcode != 1) {
							return;
						}
						this.yyzzpic = response.data.url;
					})
				}
			},
			changes(types) {
				if(types == 'A') {
					this.pdsfz = 1;
				} else if(types == 'B') {
					this.pdsfz = 2;
				}else{
					this.pdsfz = 3;
				}
				window.back.clickOnAndroidSelectPhoto();
			},
			showbg(name) {
				let url = "UserInterface/UploadPhotos.ashx";
				this.$post(url, {
					BinaryStream: name
				}).then((data) => {
					if(data.rspcode == 0) {
						return;
					}
					if(this.pdsfz == 1) {
						this.isShowDefalutIdCardA = false;
						this.idcardjust = data.data.imgUrl;
					} else if(this.pdsfz == 2) {
						this.isShowDefalutIdCardB = false;
						this.idcardback = data.data.imgUrl;
					}else if(this.pdsfz == 3) {
						this.yyzz = false;
						this.yyzzpic = data.data.imgUrl;
					}
				})
			},
			//选择城市
			choscty() {
				this.$refs.child.shows();
			},
			listenToMyBoy(somedata) {
				this.childWords = somedata;
			},
			//所得商品列表
			submits() {
				if(this.fname == '') {
					this.$Toast('请输入法人姓名');
					return;
				}
				if(this.fcard == '') {
					this.$Toast('请输入法人身份证号');
					return;
				}
				if(this.childWords == '') {
					this.$Toast('请选择所属地区');
					return;
				}
				let url = "UserInterface/BusinessUnion/BusinessAuthenticationInfo.ashx";
				let param = {
					user_name: this.fname,
					id_card: this.fcard,
					address: this.childWords,
					idcardjust: this.idcardjust,
					idcardback: this.idcardback,
					business_license: this.yyzzpic
				};
				this.$post(url, param).then((data) => {
					if(data.rspCode != 1) {
						this.$Toast(data.rspDesc);
						return;
					}
					this.$router.push('/merchantsubmit');
				})
			},
		},
		mounted(){
			this.downApp();
          	window.showbg=this.showbg;
       	},
		components: {
			chooseCity
		}
	}
</script>

<style scoped>
	.mercht_cont {
		padding: 44px 0 0.7rem 0;
	}
	
	.mercht_name {
		width: 100%;
		background: #fff;
		margin-top: 0.05rem;
	}
	
	.mercht_name .mercht_list {
		width: 90%;
		padding: 0 5%;
		border-bottom: 1px solid #EEEEEE;
		height: 0.5rem;
		overflow: hidden;
	}
	
	.mercht_name .mercht_list span {
		width: 36%;
		display: block;
		float: left;
		font-size: 0.16rem;
		color: #333;
		line-height: 0.5rem;
	}
	
	.mercht_name .mercht_list input {
		width: 60%;
		height: 0.52rem;
		display: block;
		float: right;
		font-size: 0.14rem;
		color: #333;
		text-align: right;
		border: none;
	}
	
	.mercht_name .mercht_list.mercht_sele {
		background: url("https://resource.jtsc.club/xiayiye@2x.png") no-repeat 96% center;
		background-size: 0.08rem;
	}
	
	.mercht_name .mercht_list.mercht_sele input {
		width: 54%;
		margin-right: 6%;
	}
	
	.mercht_pic h3 {
		font-size: 0.12rem;
		color: #333;
		padding: 0.1rem 3%;
		font-weight: normal;
	}
	
	.mercht_img {
		background: #fff;
		padding: 0.18rem 5%;
		overflow: hidden;
	}
	
	.mercht_card {
		width: 47%;
		float: left;
	}
	
	.mercht_wrap {
		position: relative;
		height: 1.16rem;
	}
	
	.mercht_wrap img {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.mercht_wrap input {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		opacity: 0;
	}
	
	.mercht_card p {
		font-size: 0.14rem;
		color: #666;
		text-align: center;
		margin-top: 0.1rem;
	}
	
	.mercht_pic h4 {
		width: 91%;
		margin: 0 auto;
		padding: 0 2.5%;
		background: #FCFFDD;
		font-size: 0.13rem;
		color: #999;
		height: 0.3rem;
		line-height: 0.32rem;
		font-weight: normal;
		margin-top: 0.1rem;
	}
	
	.mercht_imgy {
		width: 90%;
		padding: 0.1rem 5%;
		background: #fff;
	}
	
	.mercht_imgy .mercht_wrap {
		height: 2.4rem;
	}
</style>