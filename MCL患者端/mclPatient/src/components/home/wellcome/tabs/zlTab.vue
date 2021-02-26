<template>
   <div class="zl_manage">
      <div class="splitLine" style="margin-top: 0;">
        <mt-cell is-link class="sportEvaluation-wrap zddataWrap " @click.native="openTimePicker('param.new_value_1')">
          <div slot="title" class="titleWrap">
            <span class="mint-cell-text">首次诊断日期</span>
          </div>
          <div class="sportEvaluation">
            {{param.new_value_1|| '请选择日期'}}
          </div>
        </mt-cell>
        <mt-radio :options="[{label: '具体日期记不清', value: '1'}]" v-model="param.new_value_2" class="dateSelection"></mt-radio>
      </div>
      <div class="splitLine">
        <div class="title2 bg-white titleBtm">临床诊断<em>(可多选)</em>
        </div>
        <mt-checklist :options="attribute_value_03_item.option" v-model="attribute_value_03_item.value"
                      class="checklist "></mt-checklist>
      </div>
      <div class="splitLine">
        <div class="title2 bg-white titleBtm">婚姻状态
        </div>
        <mt-radio :options="new_value_3.option" v-model="new_value_3.value"></mt-radio>
      </div>
      <div class="splitLine">
        <div class="title2 bg-white titleBtm">个人病史<em>(可多选)</em>
        </div>
        <mt-checklist :options="new_value_4.option" v-model="new_value_4.value"
                      class="checklist "></mt-checklist>
      </div>
      <div class="splitLine">
        <div class="title2 bg-white titleBtm" style="line-height: 20px; padding: 14px 15px">肿瘤家族史
          <span>(三代直系亲属有无任何恶性肿瘤) </span>
        </div>
        <mt-radio :options="new_value_22.option" v-model="new_value_22.value"
                  style="padding-top: 8px;padding-bottom: 10px"></mt-radio>

      </div>
      <div class="splitLine" style="padding-bottom: 0.2rem">
        <div class="title2 bg-white titleBtm">目前的治疗状态<em>(可多选)</em>
        </div>
        <mt-checklist :options="new_value_23.option" v-model="new_value_23.value" class="checklist" @click.native="new_value_23_click = true"></mt-checklist>
        <div class="title2 bg-white splitData" v-show="new_value_24.show" @click="openTimePicker('new_value_24.value')">
          <span>准备手术时间：</span> <input type="text" class="line-input" readonly v-model="new_value_24.value"
                                      style="width: 100px">
        </div>
        <div class="title2 bg-white splitData" v-show="new_value_30.show">
          <span>化疗：</span> 第 <input type="tel" class="line-input" v-model="new_value_30.value"> 疗程
        </div>
        <div class="title2 bg-white splitData" v-show="new_value_32.show">
          <span>放疗：</span> 第 <input type="tel" class="line-input" v-model="new_value_32.value"> 疗程
        </div>
        <div class="title2 bg-white splitData" v-show="new_value_33.show">
          <span>靶向治疗：</span> 第 <input type="tel" class="line-input" v-model="new_value_33.value"> 疗程
        </div>
        <div class="title2 bg-white splitData" v-show="new_value_36.show">
          <span>免疫治疗：</span> 第 <input type="tel" class="line-input" v-model="new_value_36.value"> 疗程
        </div>
      </div>
      <!-- 时间picker -->
      <mt-datetime-picker ref="DatetimePicker" @change="$parent.closeTouch" type="date"
        :startDate="new Date(new Date().setFullYear(new Date().getFullYear() - 90))"
        :endDate="new Date(new Date().setFullYear(new Date().getFullYear() + 3))" :value="new Date()"
        year-format="{value} 年"
        month-format="{value} 月" date-format="{value} 日" @confirm="confirmDatetime" @cancel="$parent.openTouch">
      </mt-datetime-picker>
    </div>
</template>

<script>
function getTime (d) {
  let year = d.getFullYear()
  let month = (d.getMonth() + 1)
  month = (month < 10 ? `0${month}` : month)
  let date = d.getDate()
  date = (date < 10 ? `0${date}` : date)
  return `${year}-${month}-${date}`
}

const formData = {

  // 婚姻状态
  new_value_3: {
    option: ['未婚', '已婚/再婚/同居', '分居', '丧偶'],
    value: '',
    radiolist: true
  },

  // 个人病史
  new_value_4: {
    option: [{
      label: '糖尿病',
      value: 'new_value_4'
    }, {
      label: '高血压',
      value: 'new_value_5'
    }, {
      label: '冠心病',
      value: 'new_value_6'
    }, {
      label: '贫血',
      value: 'new_value_7'
    },
    {
      label: '甲亢',
      value: 'new_value_8'
    }, {
      label: '甲低',
      value: 'new_value_9'
    }, {
      label: '慢性胰腺炎',
      value: 'new_value_10'
    }, {
      label: '肝硬化',
      value: 'new_value_11'
    },
    {
      label: '慢性肝炎',
      value: 'new_value_12'
    }, {
      label: '中风',
      value: 'new_value_13'
    }, {
      label: 'COPD',
      value: 'new_value_14'
    }, {
      label: '心肌梗塞',
      value: 'new_value_15'
    },
    {
      label: '接受透析治疗',
      value: 'new_value_16'
    }, {
      label: '骨质疏松',
      value: 'new_value_17'
    }, {
      label: '溃疡性结肠炎',
      value: 'new_value_18'
    }, {
      label: '慢性肾病',
      value: 'new_value_19'
    },
    {
      label: '结核',
      value: 'new_value_20'
    }, {
      label: '无',
      value: 'new_value_21'
    } //, {label:'其他', value:"new_value_21"}
    ],
    value: [],
    checklist: true
  },

  // 肿瘤家族史
  new_value_22: {
    option: ['有', '无'],
    value: '',
    radiolist: true
  },

  // 目前的治疗状态
  new_value_23: {
    option: [{
      label: '准备手术',
      value: 'new_value_23'
    }, {
      label: '手术后',
      value: 'new_value_25'
    }, {
      label: '肿瘤转移',
      value: 'new_value_26'
    }, {
      label: '肿瘤复发',
      value: 'new_value_27'
    },
    {
      label: '终末期',
      value: 'new_value_28'
    }, {
      label: '化疗',
      value: 'new_value_29'
    }, {
      label: '放疗',
      value: 'new_value_31'
    }, {
      label: '靶向治疗',
      value: 'new_value_34'
    },
    {
      label: '免疫治疗',
      value: 'new_value_35'
    }, {
      label: '观察随访中',
      value: 'new_value_37'
    }, {
      label: '其它',
      value: 'new_value_38'
    }
    ],
    value: [],
    checklist: true
  },
  // 准备手术时间
  new_value_24: {
    value: '',
    show: false
  },
  // 化疗次数
  new_value_30: {
    value: '',
    show: false
  },
  // 放疗次数
  new_value_32: {
    value: '',
    show: false
  },
  // 靶向治疗次数
  new_value_33: {
    value: '',
    show: false
  },
  // 免疫治疗次数
  new_value_36: {
    value: '',
    show: false
  }
}

export default {
  data () {
    return {
      param: {
        // 所有的输入框
        new_value_1: '', // 首次诊断日期
        new_value_2: '0' // 具体日期记不清
      },
      // 临床诊断
      attribute_value_03_item: {
        option: [],
        value: [],
        checklist: true
      },
      new_value_23_click: false,
      ...formData
    }
  },
  watch: {
    'new_value_23.value': function (valList) {
      // 准备手术
      if (valList.indexOf('new_value_23') != -1) {
        this.new_value_24.show = true
      } else {
        this.new_value_24.show = false
      }
      // 化疗
      if (valList.indexOf('new_value_29') != -1) {
        this.new_value_30.show = true
      } else {
        this.new_value_30.show = false
      }
      // 放疗
      if (valList.indexOf('new_value_31') != -1) {
        this.new_value_32.show = true
      } else {
        this.new_value_32.show = false
      }
      // 靶向治疗
      if (valList.indexOf('new_value_34') != -1) {
        this.new_value_33.show = true
      } else {
        this.new_value_33.show = false
      }
      // 免疫治疗
      if (valList.indexOf('new_value_35') != -1) {
        this.new_value_36.show = true
      } else {
        this.new_value_36.show = false
      }
      // 判断是否由点击事件引起的
      if (this.new_value_23_click === true) {
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight)
        }, 0)
      }
    }
  },
  methods: {
    // 打开日期插件
    openTimePicker (timeField) {
      this.$parent.closeTouch()
      this.$refs.DatetimePicker.timeField = timeField
      this.$refs.DatetimePicker.open()
    },
    confirmDatetime (value) {
      this.$parent.openTouch()
      let {
        timeField
      } = this.$refs.DatetimePicker
      timeField = timeField.split('.')
      this.$data[timeField[0]][timeField[1]] = getTime(new Date(value))
    },

    // 设置表单内容
    setFormData (data) {
      const param = this.param
      // 输入框
      Object.keys(param).forEach((key) => {
        param[`${key}`] = data[`${key}`]
      })
      // 遍历数据
      let rowData = this.$data[`attribute_value_03_item`]
      if (rowData) {
        // 多选框 未选中0  选中1
        if (rowData.checklist) {
          rowData.option.forEach((item) => {
            if (data[`attribute_value_${item.id}`] == '1') {
              rowData.value.push(item.value)
            }
          })
        }
      }
      // 遍历数据 单选框和多选框
      for (let key in formData) {
        let rowData = formData[key]
        if (rowData) {
          // 多选框未选中0  选中1
          if (rowData.checklist) {
            rowData.value = []
            rowData.option.forEach((item) => {
              if (data[item.value] == '1') {
                rowData.value.push(item.value)
              }
            })
          } else {
            rowData.value = data[key]
          }
        }
      }
    },

    // 必填项验证
    verification () {
      let param = this.param
      if ((param.new_value_1 == '') && (param.new_value_2 == '0')) {
        this.$Toast('请选择首次诊断日期')
        return false
      }
      // 遍历数据
      let rowData = this.$data[`attribute_value_03_item`]
      if (rowData) {
        // 多选框	  未选中0  选中1
        if (rowData.checklist) {
          rowData.option.forEach((item) => {
            let checklistVal = 0
            if (rowData.value.indexOf(item.value) != -1) {
              checklistVal = 1
            }
            param[`attribute_value_${item.id}`] = checklistVal
          })
        }
      }

      // 遍历数据
      for (let key in formData) {
        let rowData = formData[key]
        if (rowData) {
          // 多选框	  未选中0  选中1
          if (rowData.checklist) {
            rowData.option.forEach((item) => {
              let checklistVal = 0
              if (rowData.value.indexOf(item.value) != -1) {
                checklistVal = 1
              }
              param[item.value] = checklistVal
            })
          } else {
            param[key] = rowData.value
          }
        }
      }

      if (this.attribute_value_03_item.value.length == 0) {
        this.$Toast('请选择临床诊断')
        return false
      }
      if (this.new_value_3.value.length == 0) {
        this.$Toast('请选择婚姻状态')
        return false
      }
      if (this.new_value_4.value.length == 0) {
        this.$Toast('请选择个人病史')
        return false
      }
      if (this.new_value_22.value.length == 0) {
        this.$Toast('请选择肿瘤家族史')
        return false
      }
      if (this.new_value_23.value.length == 0) {
        this.$Toast('请选择目前的治疗状态')
        return false
      }
      for (var i = 0; i < this.new_value_23.value.length; i++) {
        if (this.new_value_23.value[i] == 'new_value_23') {
          if (this.new_value_24.value == '') {
            this.$Toast('请填写准备手术时间')
            return
          }
        }
        if (this.new_value_23.value[i] == 'new_value_29') {
          if (this.new_value_30.value == '') {
            this.$Toast('请填写化疗第几疗程')
            return
          }
        }
        if (this.new_value_23.value[i] == 'new_value_31') {
          if (this.new_value_32.value == '') {
            this.$Toast('请填写放疗第几疗程')
            return
          }
        }
        if (this.new_value_23.value[i] == 'new_value_34') {
          if (this.new_value_33.value == '') {
            this.$Toast('请填写靶向治疗第几疗程')
            return
          }
        }
        if (this.new_value_23.value[i] == 'new_value_35') {
          if (this.new_value_36.value == '') {
            this.$Toast('请填写免疫治疗第几疗程')
            return
          }
        }
      }
      return true
    },

    // 临床诊断
    diseaseType (type) {
      let zhengzhuangList = []
      // 肿瘤
      if (type == '01') {
        zhengzhuangList = [
          '肺癌_03', '胃癌_04', '肝癌_05', '乳腺癌_06', '食管癌_07', '子宫癌颈癌_08',
          '白血病_09', '膀胱癌_10', '胰腺癌_11', '前列腺癌_12', '卵巢癌_13', '鼻咽癌_14',
          '结/直肠癌_15', '子宫内膜癌_16', '恶性淋巴瘤_17', '脑恶性肿瘤_18', '胃间质瘤_19', '胆道恶性肿瘤_20', '其他_21'
        ]
      }
      // 慢病
      if (type == '02') {
        zhengzhuangList = [
          '贫血_03', '疼痛_04', '脱发_05', '食欲下降_06', '吞吐困难_07', '消化不良_08',
          '恶心、呕吐_09', '腹胀_10', '水肿_11', '腹泻_12', '便秘_13', '疲劳_14',
          '失眠_15', '白细胞减少_16'
        ]
      }
      this.attribute_value_03_item.option = []
      zhengzhuangList.forEach((item) => {
        const value = item.split('_')
        let obj = {
          label: value[0],
          value: value[0],
          id: value[1]
        }
        this.attribute_value_03_item.option.push(obj)
      })
    }
  },
  created () {
    this.diseaseType('01')
  }
}
</script>

<style lang="scss" scoped>

</style>
