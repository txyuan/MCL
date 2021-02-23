<template>
   <div class="tz_manage">
      <div class="splitLine" style="margin-top: 0">
        <!-- <mt-field label="目标体重 " placeholder="目标体重" class="borderBottom" v-model.trim="param.trgetweight"></mt-field> -->
        <mt-field label="腰围" placeholder="请输入腰围" class="borderBottom" v-model.trim="param.waist"></mt-field>
        <mt-field label="臀围" placeholder="请输入臀围" class="borderBottom" v-model.trim="param.hipline"></mt-field>
      </div>

      <div class="splitLine">
        <div class="title2 bg-white titleBtm">管理目标
        </div>
        <mt-radio :options="attribute_value_01.option" v-model="attribute_value_01.value" class="glmb_style_a"></mt-radio>
      </div>
      <div class="splitLine">
        <div class="title2 bg-white titleBtm">是否有基础疾病
        </div>
        <mt-radio :options="attribute_value_02.option" v-model="attribute_value_02.value" class=""></mt-radio>
        <div class="title2 bg-white titlTop">如果有，那么疾病情况<em>(可多选)</em>
        </div>
        <mt-checklist :options="attribute_value_03.option" v-model="attribute_value_03.value" class="checklist borderBottom" style="position: relative; padding-top: 0.02rem"></mt-checklist>

        <mt-cell is-link class="sportEvaluation-wrap zddataWrap " @click.native="openTimePicker('param.attribute_value_22')">
          <div slot="title" class="titleWrap">
            <span class="mint-cell-text">诊断时间</span>
          </div>
          <div class="sportEvaluation">
            {{param.attribute_value_22|| '请选择诊断日期'}}
          </div>
        </mt-cell>
        <mt-radio :options="[{label: '具体日期记不清', value: '1'}]" v-model="param.attribute_value_23"
                  class="dateSelection borderBottom" style="position: relative; padding-top: 0.02rem; padding-bottom:0.05rem;margin-bottom: 0.05rem"></mt-radio>
        <div class="title2 bg-white titlTop" style="line-height: 20px; padding: 14px 15px">肿瘤家族史
          <span>(三代直系亲属有无任何恶性肿瘤) </span>
        </div>
        <mt-radio :options="attribute_value_24.option" v-model="attribute_value_24.value" class="borderBottom" style="position: relative; padding-top: 0.02rem"></mt-radio>

      </div>
      <div class="splitLine">
        <div class="title2 bg-white titleBtm">体重增加或减少持续时间
        </div>
        <mt-field label="" placeholder="请输入持续时间（月）" class="borderBottom page_text_left"
                  v-model.trim="param.attribute_value_25"></mt-field>
      </div>
      <div class="splitLine">
        <mt-field label="体脂率" placeholder="请输入体脂率" class="borderBottom" v-model.trim="param.attribute_value_26" ></mt-field>
      </div>
      <div class="splitLine">
        <div class="title2 bg-white titleBtm">既往使用过哪些管理体重方法<em>(可多选)</em>
        </div>
        <mt-checklist :options="attribute_value_27.option" v-model="attribute_value_27.value" class="checklist gltz_style_a"></mt-checklist>
      </div>
      <div class="splitLine">
        <div class="title2 bg-white titleZb" >
          <em></em>用药情况
        </div>
        <div class="title2 bg-white titlTop">a.目前改善体重是否使用药物治疗
        </div>
        <mt-radio :options="attribute_value_36.option" v-model="attribute_value_36.value"  class="borderBottom" style="position: relative; padding-top: 0.02rem"></mt-radio>
        <div class="title2 bg-white titlTop">b.如果有慢病，是否长期服药
        </div>
        <mt-radio :options="attribute_value_37.option" v-model="attribute_value_37.value"  class="borderBottom" style="position: relative; padding-top: 0.02rem"></mt-radio>
        <div class="title2 bg-white titlTop">c.用药情况<em>(可多选)</em>
        </div>
        <mt-checklist :options="attribute_value_38.option" v-model="attribute_value_38.value" class="checklist yyqk_style_a" style="position: relative; padding-top: 0.02rem"></mt-checklist>

      </div>

      <!-- 时间picker -->
      <mt-datetime-picker ref="DatetimePicker" @change="$parent.closeTouch()" type="date"
        :startDate="new Date(new Date().setFullYear(new Date().getFullYear() - 90))"
        :endDate="new Date(new Date().setFullYear(new Date().getFullYear() + 3))" :value="new Date()"
        year-format="{value} 年"
        month-format="{value} 月" date-format="{value} 日" @confirm="confirmDatetime" @cancel="$parent.openTouch()">
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
  // 肿瘤家族史
  attribute_value_24: {
    option: ['有', '无'],
    value: '',
    radiolist: true
  },
  // 体重管理
  // 管理目标
  attribute_value_01: {
    option: ['增重', '减重', '保持/塑性', '减脂'],
    value: '',
    radiolist: true
  },
  // 是否有疾病
  attribute_value_02: {
    option: ['是', '否'],
    value: '',
    radiolist: true
  },
  // 有疾病--疾病情况是
  attribute_value_03: {
    option: [{
      label: '糖尿病',
      value: 'attribute_value_03'
    }, {
      label: '高血压',
      value: 'attribute_value_04'
    }, {
      label: '高血脂',
      value: 'attribute_value_05'
    }, {
      label: '高甘油三酯',
      value: 'attribute_value_06'
    }, {
      label: '高胆固醇',
      value: 'attribute_value_07'
    }, {
      label: '肝硬化',
      value: 'attribute_value_08'
    }, {
      label: '非酒精性脂肪肝',
      value: 'attribute_value_09'
    }, {
      label: '高尿酸',
      value: 'attribute_value_10'
    }, {
      label: '高同型半胱氨酸',
      value: 'attribute_value_11'
    }, {
      label: '慢性肝炎',
      value: 'attribute_value_12'
    }, {
      label: '中风',
      value: 'attribute_value_13'
    }, {
      label: '慢阻肺',
      value: 'attribute_value_14'
    }, {
      label: '冠心病',
      value: 'attribute_value_15'
    }, {
      label: '贫血',
      value: 'attribute_value_16'
    }, {
      label: '甲亢',
      value: 'attribute_value_17'
    }, {
      label: '甲减',
      value: 'attribute_value_18'
    }, {
      label: '其他',
      value: 'attribute_value_19'
    }, {
      label: '无',
      value: 'attribute_value_21'
    }
    ],
    value: [],
    checklist: true
  },
  // 既往使用过哪些管理体重方法
  attribute_value_27: {
    option: [{
      label: '节食',
      value: 'attribute_value_27'
    }, {
      label: '代餐（包括蛋白粉、水果等）',
      value: 'attribute_value_28'
    }, {
      label: '奶昔',
      value: 'attribute_value_29'
    }, {
      label: '运动',
      value: 'attribute_value_30'
    }, {
      label: '抽脂',
      value: 'attribute_value_31'
    }, {
      label: '瘦瘦包',
      value: 'attribute_value_32'
    }, {
      label: '低碳饮食',
      value: 'attribute_value_33'
    }, {
      label: '其他',
      value: 'attribute_value_34'
    }
    ],
    value: [],
    checklist: true
  },
  // 目前改善体重是否使用药物治疗
  attribute_value_36: {
    option: ['用药', '未用药', '不清楚'],
    value: '',
    radiolist: true
  },
  // 如果有慢病，是否长期服药
  attribute_value_37: {
    option: ['是', '否'],
    value: '',
    radiolist: true
  },
  // 用药情况
  attribute_value_38: {
    option: [{
      label: '遵从医嘱',
      value: 'attribute_value_38'
    }, {
      label: '常常忘记用药',
      value: 'attribute_value_39'
    }, {
      label: '排斥用药',
      value: 'attribute_value_40'
    }, {
      label: '自己调整药量',
      value: 'attribute_value_41'
    }, {
      label: '以上都不符合',
      value: 'attribute_value_42'
    }
    ],
    value: [],
    checklist: true
  }
}
export default {
  data () {
    return {
      param: {

      },
      ...formData
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
      this.$set(this[timeField[0]], timeField[1], getTime(new Date(value)))
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>

</style>
