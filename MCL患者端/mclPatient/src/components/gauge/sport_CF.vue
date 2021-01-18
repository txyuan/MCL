<template>
	<div class="PG-SGA-root padding-header padding-footer">
		<mt-header title="运动处方" fixed>
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="motionRecipel">
			<div class="title2 ">1、目前的活动状态<em class="text_bt">(必填)</em></div>
			<mt-radio :options="diettabooRadiolists.option" v-model="param.activity_state"></mt-radio>
			<div class="title2 ">2、您的日常运动<em class="text_bt">(必填)</em></div>
			<mt-radio :options="diettaboolists.option" v-model="param.daily_state"></mt-radio>
			<div class="title2 ">3、您目前身体状况<em class="text_bt">(必填)</em></div>
			<mt-radio :options="diettabooRadiolist.option" v-model="param.physical_condition"></mt-radio>
			<div class="title2 ">4、体格检查<em class="text_bt">(必填)</em></div>
			<div class="motpel bg-white" style="line-height: 1.5;">
        <div>
          <p>（1）心率：<input type="number" pattern="number" class="line-input" v-model="param.heart_rate" style="min-width: 70px"></p></div>
				<!-- 血压：<input type="number" pattern="number" class="line-input" v-model="topgy">/<input type="number" pattern="number" class="line-input" v-model="botdy"><br />
				体温：<input type="number" pattern="number" class="line-input" v-model="param.temperature"><br />
				疾病部位：<input type="text" class="line-input" v-model="param.location_disease"><br />
				定时端坐起立试验<input type="number" pattern="number" class="line-input" v-model="param.standing_time">秒<br /> -->
        <div><p>（2）疾病部位疼痛情况：</p>
          <mt-radio :options="jibingList.option" v-model="param.itemvalue" class=""></mt-radio></div>
        <div>
			<p>（3）6分钟能步行<input type="number" pattern="number" class="line-input" v-model="param.walking_distance">米,是否完成试验</p>

				<mt-radio :options="islists.option" v-model="param.experiment_off"></mt-radio></div>
			</div>

			<div class="title2 ">5、肺功能测试<em class="text_bt">(必填)</em></div>
			<mt-radio :options="diettlist.option" v-model="param.lung_test"></mt-radio><!-- mt-checklist -->
			<div class="fix_bottom">
				<mt-button type="primary" class="theme-button button-radio" size="large" @click.native="submit">保存</mt-button>
			</div>
			<div class="title2 ">6、认知障碍<em class="text_bt">(必填)</em></div>
			<mt-radio :options="obstaclelist.option" v-model="param.obstacle"></mt-radio><!-- mt-checklist -->
			<div class="fix_bottom">
				<mt-button type="primary" class="theme-button button-radio" size="large" @click.native="submit">提交申请</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'gauge_nutrition',
  data: () => ({
    topgy: '', // 高压
    botdy: '', // 低压
    // 接口参数
    param: {
      //   location_disease: '',
      obstacle: '',
      activity_state: '',
      daily_state: '',
      physical_condition: '',
      heart_rate: '',
      //   blood_pressure: '',
      //   temperature: '',
      //   standing_time: '',
      itemindex: 33,
      itemvalue: '',
      walking_distance: '',
      experiment_off: '',
      lung_test: '',
      prescription_value01: '0',
      resetstatus: '' // 重置状态 （传1就行）resetstatus
    },
    // 疾病部位疼痛情况
    jibingList: {
      option: [{
        label: '0分：无症状',
        value: '0'
      }, {
        label: '1分：非常轻微',
        value: '1'
      }, {
        label: '2分：稍微有',
        value: '2'
      },
      {
        label: '3分：有点痛',
        value: '3'
      }, {
        label: '4分：中等程度',
        value: '4'
      }, {
        label: '5分：较明显不适',
        value: '5'
      },
      {
        label: '6分：一般严重痛',
        value: '6'
      }, {
        label: '7分：比较严重痛',
        value: '7'
      }, {
        label: '8分：非常严重',
        value: '8'
      },
      {
        label: '9分：特别痛',
        value: '9'
      }, {
        label: '10分：极痛',
        value: '10'
      }
      ],
      value: '',
      radiolist: true
    },
    // 单选框
    diettabooRadiolists: {
      option: ['完全卧床', '部分受限', '自主活动', '完全日常'],
      value: '',
      radiolist: true
    },
    diettaboolists: {
      option: ['几乎不运动', '偶尔运动', '经常运动', '每天运动'],
      value: '',
      radiolist: true
    },
    islists: {
      option: ['是', '否'],
      value: '',
      radiolist: true
    },
    obstaclelist: {
      option: ['无', '学习、记忆障碍', '失语', '失认', '失用', '精神异常', '痴呆'],
      value: '',
      radiolist: true
    },
    // 饮食禁忌  多选框
    diettabooRadiolist: {
      option: [{
        label: '身体正常，无任何不适',
        value: '100'
      }, {
        label: '能进行正常活动，有轻微不适',
        value: '90'
      }, {
        label: '勉强可正常活动，有一些不适',
        value: '80'
      },
      {
        label: '生活可自理，但不能维持正常生活或工作',
        value: '70'
      }, {
        label: '有时需人扶助，多数时间可自理',
        value: '60'
      },
      {
        label: '常需人照料',
        value: '50'
      }, {
        label: '生活不能自理，需特别照顾',
        value: '40'
      }, {
        label: '生活严重不能自理',
        value: '30'
      },
      {
        label: '病重，需住院积极支持治疗',
        value: '20'
      }, {
        label: '病危，临近死亡',
        value: '10'
      }, {
        label: '死亡',
        value: '0'
      }
      ],
      value: [],
      checklist: true
    },
    diettlist: {
      option: [{
        label: '虽存在不同程度的肺气肿，但活动如常人，对日常生活无影响、无气短',
        value: '虽存在不同程度的肺气肿，但活动如常人，对日常生活无影响、无气短'
      },
      {
        label: '一般劳动时出现气短',
        value: '一般劳动时出现气短'
      },
      {
        label: '平地步行不气短，速度较快或登楼、上坡时，同行的同龄健康人不觉气短而自己已气短',
        value: '平地步行不气短，速度较快或登楼、上坡时，同行的同龄健康人不觉气短而自己已气短'
      },
      {
        label: '慢走不到百步即有气短',
        value: '慢走不到百步即有气短'
      },
      {
        label: '讲话或穿衣等轻微活动时有气短',
        value: '讲话或穿衣等轻微活动时有气短'
      },
      {
        label: '安静时出现气短，无法平卧',
        value: '安静时出现气短，无法平卧'
      }
      ],
      value: [],
      checklist: true
    }
  }),
  watch: {
    // 饮食禁忌
    'diettabooRadiolist.value': {
      handler: function (list) {
        // 重置
        this.diettabooRadiolist.option.forEach((item) => {
          this.param[`diettaboo${item.value}`] = '0'
        })
        // 选中项
        list.forEach((item) => {
          this.param[`diettaboo${item}`] = '1'
        })
      },
      deep: true
    }
  },
  methods: {
    // 提交
    submit () {
      // this.param.blood_pressure = this.topgy + '/' + this.botdy
      if (this.param.activity_state == '') {
        this.$Toast('请选择您目前的活动状态')
        return
      }
	  if (this.param.daily_state == '') {
	    this.$Toast('请选择您的日常运动')
	    return
	  }
	  if (this.param.physical_condition == '') {
	    this.$Toast('请选择您目前身体状况')
	    return
	  }
	  if (this.param.heart_rate == '') {
	    this.$Toast('请填写您的心率')
	    return
	  }
	  if (this.param.itemvalue == '') {
	    this.$Toast('请选择您疾病部位疼痛情况')
	    return
	  }
	  if (this.param.walking_distance == '') {
	    this.$Toast('请填写您6分钟能步行多远')
	    return
	  }
	  if (this.param.experiment_off == '') {
	    this.$Toast('请选择您是否完成实验')
	    return
	  }
	  if (this.param.lung_test == '') {
	    this.$Toast('请选择您肺功能测试')
	    return
	  }
	  if (this.param.obstacle == '') {
	    this.$Toast('请选择认知障碍')
	    return
	  }
      let url = 'UserInterface/ExercisePrescriptionScale.ashx'
      this.$post(url, this.param).then((data) => {
        if (data.rspcode != 1) {
          this.$Toast(data.rspdesc)
          return
        }
        this.$Toast('提交申请成功')
        // 查看报告
		this.$router.replace('/sport');
        // this.$router.push('/sport')
      })
    },
    // 疾病情况 接口
    jibingChange (value) {
      var data = {
        // usekey: this.usekey,
        // itemkey:  this.itmekey,
        itemindex: 33,
        itemvalue: value
      }
      let url = 'UserInterface/ExercisePrescriptionScale.ashx'
      return this.$post(url, data)
    }
  },
  mounted () {
    // 是否重置表单
    const resetstatus = this.$route.query.resetstatus
    if (resetstatus) {
      this.param.resetstatus = resetstatus
    }
    // this.usekey = JSON.parse(localStorage.userInfo).UserKey
    // 重置表单
    // this.diettabooRadiolist.option.forEach((item)=>{
    // 	this.param[`prescription_value${item.value}`] = "0";
    // })
  },
  components: {

  },
  created () {

  }
}
</script>

<style scoped lang="scss">
  .mint-header {
    height:0.44rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .padding-header {
    padding-top: 0.44rem;
  }
  .motionRecipel{

    .title,
    .title2 {
      margin-top: 10px;
      padding: 5px 10px;
      font-size: 0.15rem;
    }

    .title2 {
      padding: 0 0.1rem;
      min-height: 0.44rem;
      line-height: 0.44rem;
      background-color: #FFFFFF;
      border-bottom: 1px solid #e5e5e5;
      .text_bt{
        font-style: normal;
        font-size: 0.13rem;
        color: #CB0000;
        padding-left: 0.05rem;
      }
    }
    .motpel{
      padding-left: 0.2rem;
      .mint-radiolist{
        padding: 0;
      }
      &>div{
        border-bottom: 1px dashed #e5e5e5;
        padding-bottom: 0.035rem;
        p{
          height: 0.44rem;
          line-height: 0.44rem;
          font-size: 0.145rem;
          color: #666666;
        }
      }
      &>div:last-child{

        border-bottom:0;
      }
    }
  }
</style>
<style lang="scss">
	.PG-SGA-root {
    .motionRecipel{


		.line-input {
			width: 50px;
			border: none;
			border-bottom: 1px solid #e5e5e5;
		}

		a.mint-cell .mint-cell-text {
			font-size: 0.145rem;
		}

		.mint-field .mint-cell-title,
		.my-mint-cell .mint-cell-title {
			width: 105px;
			-webkit-box-flex: 0;
			-ms-flex: none;
			flex: none;
		}

		.my-mint-cell .mint-cell-value {
			flex: 1;
		}

		.mint-cell-value .mint-field-core,
		.mint-cell-value select {
			// width: 250px;
			height: 33px;
			margin-left: 10px;
			font-size: 0.145rem;
			color: inherit;
			text-indent: 5px;
			border: 1px solid #EEEEEE;
		}

		.mint-cell-value select {
			border: 1px solid #EEEEEE;
			height: 33px;
		}
      .mint-radio-input:checked+.mint-radio-core, .mint-checkbox-input:checked+.mint-checkbox-core{
        background-color: #0AC5C9;
        border-color: #0AC5C9;
      }
.mint-radiolist{
  padding: 0.1rem 0;
  background-color: #FFFFFF;
}
		// 多选框
		.mint-radiolist.radio-nowrap {
			background: #FFF;

			/*.mint-cell {*/
			/*	display: inline-block;*/
			/*}*/

			.mint-radiolist-label {
				white-space: nowrap;
			}
		}

		// 单选框
		.mint-radiolist-label,
		.mint-checklist-label {
			display: flex;
			align-items: center;
		}

		.mint-radiolist .mint-radio-label,
		.mint-checkbox-label {
			font-size: 0.145rem;
      color: #666666;
		}

		.mint-radiolist .mint-radiolist-title,
		.mint-checklist-title {
			margin: 0;
		}
    .fix_bottom {
      padding: 0;
      .theme-button{
        border-radius: 0;
        height: 48px;
        background-color:#0AC5C9;
      }
    }}
	}
</style>
