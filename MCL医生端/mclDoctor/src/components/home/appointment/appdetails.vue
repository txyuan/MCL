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
			<mt-field style="border-bottom: 1px solid #eee;" label="患者姓名" readonly v-model="param.ContactName"></mt-field>
			<mt-field style="border-bottom: 1px solid #eee;" label="下一次治疗" readonly v-model="param.treatment"></mt-field>
			<p class="ppacc"><span>预约时间</span><label @click.active="openPicker">{{param.createTime}}</label></p>
			<div class="make_other">
				<p>其他</p>
				<textarea v-model="param.other"></textarea>
			</div>
		</div>
		<!-- <a @click="postmake" class="buttons">
			<mt-button type="danger" class="add_btns" size="large">预约</mt-button>
		</a> -->
		<div class="detile_btn" v-if="status=='0'">
			<div class="btn-group">
				<p class="defult-btn" @click="apiot(2)">不通过</p>
				<p class="btn" @click="apiot(1)">通过</p>
			</div>
		</div>
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
    status: '',
    param: {
	  skey: '',
      treatment: '', // 下一次治疗
      ContactName: '', //
      createTime: '', // 时间
      other: '' // 其他
    }
  }),
  methods: {
    openPicker () {
      this.$refs.picker.open()
    },
    handleConfirm () {
      let getyear = this.pickerValue.getFullYear()
      let months = this.pickerValue.getMonth() + 1
      let days = this.pickerValue.getDate()
      let hour = this.pickerValue.getHours()
      let minu = this.pickerValue.getMinutes()
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
      this.param.createTime = getyear + '-' + months + '-' + days + ' ' + hour + ':' + minu
    },
    gettime () {
      let dates = new Date()
      let getyear = dates.getFullYear()
      let months = dates.getMonth() + 1
      let days = dates.getDate()
      let hour = dates.getHours()
      let minu = dates.getMinutes()
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
      this.param.createTime = getyear + '-' + months + '-' + days + ' ' + hour + ':' + minu
      this.pickerValue = getyear + '-' + months + '-' + days + ' ' + hour + ':' + minu
    },
    // 获取
    getdoctor () {
      let url = 'UserInterface/doctor/ReviewthebookingSelect.ashx'
	  let param = {
		  skey: this.param.skey
	  }
      this.$post(url, param).then((data) => {
        if (data.rspCode == 1) {
          this.status = data.status
          this.param.treatment = data.treatment
		  this.param.ContactName = data.ContactName
		  this.param.createTime = data.create_date
		  this.param.other = data.other
        }
      })
    },
    apiot (a) {
      let url = 'UserInterface/doctor/ReviewthebookingSave.ashx'
	  this.param.direction = a
      this.$post(url, this.param).then((data) => {
        this.$Toast(data.rspdesc)
        if (data.rspcode == 1) {
          this.$router.back()
        }
      })
    }
  },
  mounted () {
    this.gettime()
    this.getdoctor()
  },
  created () {
  	this.param.skey = this.$route.query.skey
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

	.detile_btn {
		width: 100%;
		height: 0.5rem;
		background: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 1px solid #eee;
	}

	.detile_btn .btn-group {
		width: 80%;
		height: 0.4rem;
		margin: 0 auto;
		margin-top: 0.05rem;
		border-radius: 0.2rem;
		overflow: hidden;
		display: flex;
		border: 1px solid #FF3D3D;
		box-sizing: border-box;
	}

	.detile_btn .btn-group>p {
		flex: 1;
		text-align: center;
		font-size: 0.16rem;
		line-height: 0.4rem;
	}

	.detile_btn .btn {
		background: #FF3D3D;
		color: #fff;
	}

	.detile_btn .defult-btn {
		color: #FF3D3D;
		box-sizing: border-box;
	}
</style>
<style>
	.make_form input[type=text] {
		border: none;
	}
</style>
