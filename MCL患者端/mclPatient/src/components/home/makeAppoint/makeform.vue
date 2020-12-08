<template>
	<div style="padding-bottom: 0.52rem;">
		<mt-header title="复查预约" fixed>
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
    <div class="body_main">
		<div class="make_form">
			<!-- <mt-field style="border-bottom: 1px solid #eee;" label="姓名" placeholder="请输入姓名" v-model="param.name"></mt-field>
			<mt-field style="border-bottom: 1px solid #eee;" label="身份证号" placeholder="请输入身份证号" v-model="param.ID_number"></mt-field>
			<mt-field style="border-bottom: 1px solid #eee;" label="社保卡号" placeholder="请输入社保卡号" v-model="param.security_number"></mt-field>
			<mt-field label="预约时间" placeholder="请输入预约时间" type="date" v-model="param.CreateTime"></mt-field> -->
			<div class="title2 bg-white">下一次治疗</div>
			<mt-radio :options="diettabooRadiolists.option" v-model="param.treatment"></mt-radio>

    </div>

      <div class="make_form">
			<!-- <mt-field label="预约时间" placeholder="请输入预约时间" type="Datetime" readonly="readonly" v-model="param.CreateTime"></mt-field> -->
			<div class="ppacc"><span>预约时间：</span><p @click.active="openPicker">{{param.CreateTime}}</p></div>
			<mt-field style="border-bottom: 1px solid #eee;" label="预约医生：" v-model="param.doctor"></mt-field>
			<div class="make_other">
				<p>其他：</p>
				<textarea v-model="param.other"></textarea>
			</div>
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
  .mint-header{
    height: 0.44rem;
    border-bottom: 1px solid #f1f1f1;
    font-size: 0.16rem;
  }
  .mint-radiolist .mint-cell{
    width: 30%;
  }
  .body_main{
    padding-top:  0.44rem;
    font-size: 0.145rem;
  }
	.make_form {
		width: 100%;
		margin: 0.1rem auto;
    background-color: #FFFFFF;
    padding-bottom: 0.1rem;

	}
.title2{
  padding: 0 10px;
  line-height: 0.48rem;
  border-bottom: 1px solid #e5e5e5;
  font-size: 0.15rem;
}
	.make_other {
		width: 94%;
		padding: 0.1rem 3%;
		background: #fff;

		p {
      font-size: 0.15rem;
		}

		textarea {
			resize: none;
			width: 100%;
			padding: 0.1rem 0;
			background: #fff;
			border: 1px solid #e5e5e5;
			height: 0.7rem;
      border-radius: 4px;
      margin-left: 0.2rem;
		}
	}

	.ppacc{
		padding: 0 10px;
		height: 0.48rem;
		line-height: 0.48rem;
		border-bottom: 1px solid #eee;
    margin-top: 0.1rem;
    display: flex !important;
		span{width: 105px;
      display: block;
      line-height: 0.48rem;
      font-size: 0.15rem;
    }
		p{
      flex-grow: 1!important;
      background: url(../../../assets/images/jiantou@2x.png) no-repeat right center;
      background-size: 0.2rem;
      color: #666666;
		}
	}
  .buttons{
    height: auto;
    border: 0;
    .add_btns{
      margin: 0;
      width: 100%;
      background-color: #0AC5C9;
      border-radius: 0;
      line-height: 0.44rem;
      padding: 0;
      height: 0.44rem;
    }
  }
  .make_other{

    display: flex !important;
    p{width: 105px;

    }
  }
</style>
<style>
	.make_form input[type=text] {
		border: none;
    color: #666666;
	}
  #main_router a.mint-cell .mint-cell-text{
    font-size: 0.15rem;
  }
  #main_router a.mint-cell .mint-radio-label{
    color: #666666;
  }
  .mint-radio-input:checked+.mint-radio-core, .mint-checkbox-input:checked+.mint-checkbox-core {
    background-color: #0AC5C9;
    border-color: #0AC5C9;
  }
</style>
