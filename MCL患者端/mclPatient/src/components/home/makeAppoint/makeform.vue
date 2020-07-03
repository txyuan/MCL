<template>
	<div style="padding-bottom: 0.52rem;">
		<mt-header title="复查预约" fixed>
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="make_form">
			<!-- <mt-field style="border-bottom: 1px solid #eee;" label="姓名" placeholder="请输入姓名" v-model="param.name"></mt-field>
			<mt-field style="border-bottom: 1px solid #eee;" label="身份证号" placeholder="请输入身份证号" v-model="param.ID_number"></mt-field>
			<mt-field style="border-bottom: 1px solid #eee;" label="社保卡号" placeholder="请输入社保卡号" v-model="param.security_number"></mt-field>
			<mt-field label="预约时间" placeholder="请输入预约时间" type="date" v-model="param.CreateTime"></mt-field> -->
			<div class="title2 bg-white">下一次治疗</div>
			<mt-radio :options="diettabooRadiolists.option" v-model="param.treatment" class="borderBottom"></mt-radio>
			<!-- <mt-field label="预约时间" placeholder="请输入预约时间" type="Datetime" readonly="readonly" v-model="param.CreateTime"></mt-field> -->
			<p class="ppacc"><span>预约时间</span><label @click.active="openPicker">{{param.CreateTime}}</label></p>
			<mt-field style="border-bottom: 1px solid #eee;" label="预约医生" v-model="param.doctor"></mt-field>
			<div class="make_other">
				<p>其他</p>
				<textarea v-model="param.other"></textarea>
			</div>
		</div>
		<a @click="postmake" class="buttons">
			<mt-button type="danger" class="add_btns" size="large">预约</mt-button>
		</a>

		<mt-datetime-picker ref="picker" type="datetime" v-model="pickerValue" @confirm="handleConfirm">
		</mt-datetime-picker>
	</div>
</template>

<script>
	export default {
		name: 'makeform',
		data: () => ({
			pickerValue: '',
			//  单选框
			diettabooRadiolists: {
				option: ['手术', '放疗', '化疗', '免疫治疗', '复查', '其他'],
				value: '',
				radiolist: true
			},
			param: {
				treatment: '', // 下一次治疗
				doctor: '', // 预约医生
				CreateTime: '', // 时间
				other: '' // 其他
				// name:'',  //姓名
				// ID_number:'',  //身份证号
				// security_number:'',  //社保卡号
				// CreateTime:'',  //创建时间
			}
		}),
		methods: {
			openPicker() {
				this.$refs.picker.open();
			},
			handleConfirm() {
				let getyear = this.pickerValue.getFullYear()
				let months = this.pickerValue.getMonth() + 1
				let days = this.pickerValue.getDate()
				let hour =this.pickerValue.getHours()
				let minu =this.pickerValue.getMinutes()
				if (months < 10) {
					months = '0' + months
				}
				if (days < 10) {
					days = '0' + days
				}
				if (hour < 10) {
					hour = '0' + hour
				}
				if (minu < 10) {
					minu = '0' + minu
				}
				this.param.CreateTime = getyear + '-' + months + '-' + days+' '+hour+':'+minu
				console.log(this.param.CreateTime)
			},
			gettime() {
				let dates = new Date()
				let getyear = dates.getFullYear()
				let months = dates.getMonth() + 1
				let days = dates.getDate()
				let hour =dates.getHours()
				let minu =dates.getMinutes()
				if (months < 10) {
					months = '0' + months
				}
				if (days < 10) {
					days = '0' + days
				}
				if (hour < 10) {
					hour = '0' + hour
				}
				if (minu < 10) {
					minu = '0' + minu
				}
				this.param.CreateTime = getyear + '-' + months + '-' + days+' '+hour+':'+minu;
				this.pickerValue = getyear + '-' + months + '-' + days+' '+hour+':'+minu;
			},
			// 获取医生
			getdoctor() {
				let url = 'UserInterface/PurchaseYearCard.ashx'
				this.$post(url).then((data) => {
					if (data.rspcode == 1) {
						this.param.doctor = data.DoctorName
					}
				})
			},
			postmake() {
				let url = 'UserInterface/AddReviewthebooking.ashx'
				this.$post(url, this.param).then((data) => {
					this.$Toast(data.rspdesc)
					if (data.rspcode == 1) {
						this.$router.back()
					}
				})
				// let url="UserInterface/AddReviewthebooking.ashx";
				// this.$post(url,this.param).then((data)=>{
				// 	this.$Toast(data.rspdesc);
				// 	if(data.rspcode == 1){
				// 		this.$router.back();
				// 	}
				// })
			}
		},
		mounted() {
			this.gettime()
			this.getdoctor()
		}
	}
</script>

<style scoped lang="scss">
	.make_form {
		background: #fff;
		width: 94%;
		margin: 0 auto;
		padding: 0 3%;
		padding-top: 50px;
	}

	.make_other {
		width: 94%;
		padding: 0.1rem 3%;
		background: #fff;

		p {
			font-size: 0.16rem;
		}

		textarea {
			resize: none;
			width: 94%;
			padding: 0.06rem 3%;
			background: #fff;
			border: 1px solid #ddd;
			margin-top: 0.1rem;
			height: 0.7rem;
		}
	}

	.ppacc{
		padding: 0 10px;
		height: 0.48rem;
		line-height: 0.48rem;
		border-bottom: 1px solid #eee;
		span{
			width: 1.05rem;
			display: block;
			float: left;
		}
		label{
			float: left;
			display: block;
		}
	}
</style>
<style>
	.make_form input[type=text] {
		border: none;
	}
</style>
