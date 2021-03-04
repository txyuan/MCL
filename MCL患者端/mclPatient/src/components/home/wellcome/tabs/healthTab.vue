<template>
   <div class="jk_manage">
      <div class="splitLine" style="margin-top: 0">
        <!-- <mt-field label="目标体重 " placeholder="目标体重" class="borderBottom" v-model.trim="param.trgetweight"></mt-field> -->
        <mt-field label="腰围" placeholder="请输入腰围" class="borderBottom" v-model.trim="param.waist"></mt-field>
        <mt-field label="臀围" placeholder="请输入臀围" class="borderBottom" v-model.trim="param.hipline"></mt-field>
      </div>
      <div class="splitLine">
        <div class="title2 bg-white titleZb"><em></em>目前身体情况描述
        </div>
        <div class="title2 bg-white titleBtm">是否有亚健康情况（无临床疾病诊断）
        </div>
        <mt-radio :options="attribute_value_01.option" v-model="attribute_value_01.value"></mt-radio>

        <div class="title2 bg-white titlTop">如果有请选择情况<em>(可多选)</em>
        </div>
        <mt-checklist :options="attribute_value_02.option" v-model="attribute_value_02.value" class="checklist yjk_style_a" style="position: relative; padding-top: 0.02rem"></mt-checklist>
      </div>
      <div class="splitLine">
        <div class="title2 bg-white titleBtm">是否有基础疾病
        </div>
        <mt-radio :options="attribute_value_12.option" v-model="attribute_value_12.value"></mt-radio>

        <div class="title2 bg-white titlTop">如果有，那么疾病情况<em>(可多选)</em>
        </div>
        <mt-checklist :options="attribute_value_13.option" v-model="attribute_value_13.value" class="checklist " style="position: relative; padding-top: 0.02rem"></mt-checklist>
      </div>

      <div class="splitLine">
        <div class="title2 bg-white titleZb"> <em></em>目前的治疗情况
        </div>
        <div class="title2 bg-white titlTop">a.治疗方法
        </div>
        <mt-radio :options="attribute_value_32.option" v-model="attribute_value_32.value" class="borderBottom" style="position: relative; padding-top: 0.02rem"></mt-radio>
        <div class="title2 bg-white titlTop">b.用药情况<em>(可多选)</em>
        </div>
        <mt-checklist :options="attribute_value_33.option" v-model="attribute_value_33.value" class="checklist borderBottom" style="position: relative; padding-top: 0.02rem"></mt-checklist>

        <div class="title2 bg-white titlTop">c.是否长期用药
        </div>
        <mt-radio :options="attribute_value_38.option" v-model="attribute_value_38.value"  style="position: relative; padding-top: 0.02rem"></mt-radio>

      </div>
    </div>
</template>

<script>
const formData = {
  // 是否有亚健康情况（无临床疾病诊断）
  attribute_value_01: {
    option: ['是', '否'],
    value: '',
    radiolist: true
  },
  // 亚健康情况
  attribute_value_02: {
    option: [{
      label: '夜间血气不足，盗汗',
      value: 'attribute_value_02'
    }, {
      label: '秋季常感冒',
      value: 'attribute_value_03'
    }, {
      label: '容易疲劳，失眠',
      value: 'attribute_value_04'
    }, {
      label: '胃口差，脾虚弱',
      value: 'attribute_value_05'
    }, {
      label: '便秘',
      value: 'attribute_value_06'
    }, {
      label: '肥胖或超重',
      value: 'attribute_value_07'
    }, {
      label: '坐立不安、心烦意乱',
      value: 'attribute_value_08'
    }, {
      label: '手脚发凉',
      value: 'attribute_value_09'
    }, {
      label: '其他',
      value: 'attribute_value_10'
    }
    ],
    value: [],
    checklist: true
  },
  // 是否有疾病
  attribute_value_12: {
    option: ['是', '否'],
    value: '',
    radiolist: true
  },
  // 有疾病--疾病情况是
  attribute_value_13: {
    option: [{
      label: '糖尿病',
      value: 'attribute_value_13'
    }, {
      label: '高血压',
      value: 'attribute_value_14'
    }, {
      label: '高血脂',
      value: 'attribute_value_15'
    }, {
      label: '高甘油三酯',
      value: 'attribute_value_16'
    }, {
      label: '高胆固醇',
      value: 'attribute_value_17'
    }, {
      label: '肝硬化',
      value: 'attribute_value_18'
    }, {
      label: '非酒精性脂肪肝',
      value: 'attribute_value_19'
    }, {
      label: '高尿酸',
      value: 'attribute_value_20'
    }, {
      label: '高同型半胱氨酸',
      value: 'attribute_value_21'
    }, {
      label: '慢性肝炎',
      value: 'attribute_value_22'
    }, {
      label: '中风',
      value: 'attribute_value_23'
    }, {
      label: '慢阻肺',
      value: 'attribute_value_24'
    }, {
      label: '冠心病',
      value: 'attribute_value_25'
    }, {
      label: '贫血',
      value: 'attribute_value_26'
    }, {
      label: '甲亢',
      value: 'attribute_value_27'
    }, {
      label: '甲减',
      value: 'attribute_value_28'
    }, {
      label: '其他',
      value: 'attribute_value_29'
    }, {
      label: '无',
      value: 'attribute_value_31'
    }
    ],
    value: [],
    checklist: true
  },
  // 目前改善体重是否使用药物治疗
  attribute_value_32: {
    option: ['用药', '未用药', '不清楚'],
    value: '',
    radiolist: true
  },
  // 用药情况
  attribute_value_33: {
    option: [{
      label: '遵从医嘱',
      value: 'attribute_value_33'
    }, {
      label: '常常忘记用药',
      value: 'attribute_value_34'
    }, {
      label: '排斥用药',
      value: 'attribute_value_35'
    }, {
      label: '自己调整药量',
      value: 'attribute_value_36'
    }, {
      label: '以上都不符合',
      value: 'attribute_value_37'
    }
    ],
    value: [],
    checklist: true
  },

  // 是否长期用药
  attribute_value_38: {
    option: ['是', '否'],
    value: '',
    radiolist: true
  }

}
export default {
  data () {
    return {
      param: {
        // 所有的输入框
        waist: '', // 腰围
        hipline: '' // 臀围
      },
      ...formData
    }
  },
  methods: {
    // 设置表单内容
    setFormData (data) {
      const param = this.param
      // 输入框
      Object.keys(param).forEach((key) => {
        param[`${key}`] = data[`${key}`]
      })
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
      if (param.waist == '') {
        this.$Toast('请输入腰围')
        return false
      }
      if (param.hipline == '') {
        this.$Toast('请输入臀围')
        return false
      }
      if (this.attribute_value_01.value == '') {
        this.$Toast('请选择是否有亚健康情况')
        return false
      }
      if (this.attribute_value_12.value == '') {
        this.$Toast('请选择是否有基础疾病')
        return false
      }
      if (this.attribute_value_32.value == '' || this.attribute_value_38.value == '' || this.attribute_value_33.value.length == 0) {
        this.$Toast('请选择治疗情况')
        return false
      }
      // 遍历数据
      for (let key in formData) {
        let rowData = formData[key]
        if (rowData) {
          // 多选框 未选中0  选中1
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
      return true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
