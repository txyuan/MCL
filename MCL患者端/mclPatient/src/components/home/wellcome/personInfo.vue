<template>
  <div class="personInfo_root padding-header padding-footer">
    <mt-header title="个人信息" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <!--		<div class="tip">请保证录入信息真实有效</div>-->
    <div class="splitLine">
      <mt-field label="姓名" placeholder="请输入姓名" class="borderBottom" v-model.trim="param.name"></mt-field>
      <mt-cell title="性别" is-link @click.native="sexPickerToggle('show')" class="borderBottom">
        <span v-if="param.sex == '男'">男</span>
        <span v-if="param.sex == '女'">女</span>
      </mt-cell>
      <mt-cell title="出生日期" is-link @click.native="openTimePicker('param.birth')" class="borderBottom">
        <span>{{param.birth || '请选择出生日期'}}</span>
      </mt-cell>

      <mt-cell is-link class="borderBottom sportEvaluation-wrap" @click.native="openCityPicker">
        <div slot="title" class="titleWrap">
          <span class="mint-cell-text">您所在地区</span>
        </div>
        <div class="sportEvaluation">
          {{param.location|| '请选择您所在地区'}}
        </div>
      </mt-cell>
    </div>
    <div class="splitLine">
      <mt-field label="身高" placeholder="请输入身高(cm)" class="borderBottom" v-model.trim="param.height"
                @change="doBMI"></mt-field>
      <mt-field label="体重" placeholder="请输入体重(kg)" class="borderBottom" v-model.trim="param.weight"
                @change="doBMI"></mt-field>
      <mt-field label="BMI" placeholder="BMI" class="borderBottom" :readonly="true" v-model.trim="param.bmi"></mt-field>
    </div>

    <div class="splitLine">
      <mt-cell is-link class="sportEvaluation-wrap borderBottom" @click.native="sportPickerToggles('show')">
        <div slot="title" class="titleWrap">
          <span class="mint-cell-text">疾病类型</span>
        </div>
        <div class="sportEvaluation">
          {{sportDefaultName}}
        </div>
      </mt-cell>
      <!--<mt-cell is-link class="borderBottom sportEvaluation-wrap" @click.native="zhenduanPickerToggles('show')">
        <div slot="title" class="titleWrap">
          <span class="mint-cell-text">临床诊断</span>
        </div>
        <div class="sportEvaluation">
          {{zhenduanDefaultName}}
        </div>
      </mt-cell>-->
      <mt-cell is-link class="sportEvaluation-wrap zddataWrap " @click.native="openTimePicker('param.new_value_1')">
        <div slot="title" class="titleWrap">
          <span class="mint-cell-text">首次诊断日期</span>
        </div>
        <div class="sportEvaluation">
          {{param.new_value_1|| '请选择日期'}}
        </div>
      </mt-cell>
      <mt-radio :options="[{label: '具体日期记不清', value: '1'}]" v-model="param.new_value_2"
                class="dateSelection"></mt-radio>

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
      <mt-checklist :options="new_value_23.option" v-model="new_value_23.value" class="checklist"></mt-checklist>
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
    <div class=""></div>
    <div class="fix_bottom fix_bottom_area">
      <mt-button type="primary" class="theme-button button-radio " size="large" @click.native="diseaseSubmit">下一步
      </mt-button>
    </div>

    <!-- 性别picker  -->
    <mt-popup v-model="popupVisible" position="bottom">
      <mt-picker :slots="sexSlots" :showToolbar="true" :visibleItemCount="3" ref="sexPicker" @change="visbleChange">
        <div class="picker_bar">
          <div class="cancel" @click="sexPickerToggle('hide')">取消</div>
          <div class="confrim" @click="sexConfirm">确定</div>
        </div>
      </mt-picker>
    </mt-popup>

    <!-- 疾病类型picker  -->
    <mt-popup class="sportPicker" v-model="sportVisible" position="bottom">
      <mt-picker :slots="sportSlot" :showToolbar="true" :visibleItemCount="3" ref="sportPickers" @change="visbleChange">
        <div class="picker_bar">
          <div class="cancel" @click="sportPickerToggles('hide')">取消</div>
          <div class="confrim" @click="sportConfirm">确定</div>
        </div>
      </mt-picker>
    </mt-popup>

    <!-- 疾病类型picker  -->
    <!--<mt-popup
      class="sportPicker"
      v-model="zhenduanVisible"
      position="bottom">
      <mt-picker
        :slots="zhenduanSlot"
        :showToolbar="true"
        :visibleItemCount="3"
        ref="zhenduanPickers"
      >
          <div class="picker_bar">
          <div class="cancel" @click="zhenduanPickerToggles('hide')">取消</div>
          <div class="confrim" @click="zhenduanConfirm">确定</div>
          </div>
      </mt-picker>
    </mt-popup>		-->

    <!-- 城市picker -->
    <cityPicker @confrim="cityPickerChange" ref="cityPicker" @change="visbleChange" @cancel="delqxDate"/>

    <!-- 时间picker -->
    <mt-datetime-picker ref="DatetimePicker" @change="visbleChange" type="date"
                        :startDate="new Date(new Date().setFullYear(new Date().getFullYear() - 90))"
                        :endDate="new Date(new Date().setFullYear(new Date().getFullYear() + 3))" :value="new Date()"
                        year-format="{value} 年"
                        month-format="{value} 月" date-format="{value} 日" @confirm="confirmDatetime" @cancel="delqxDate">
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

    // 个人病史
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
    name: 'personInfo_root',
    data: () => ({
      handler: function (e) {
        e.preventDefault()
      },
      param: {
        name: '', // 姓名
        sex: '男', // 姓名
        birth: '', // 出生日期
        height: '', // 身高
        weight: '', // 体重
        bmi: '', // BMI
        diseasetype: '01', // 疾病类型（01：肿瘤，02：慢病）
        location: '', // 所在地
        new_value_1: '', // 首次诊断日期
        new_value_2: '0' // 具体日期记不清
      },

      // 性别picker
      popupVisible: false, // 是否显示
      sexSlots: [{
        flex: 1,
        values: ['男', '女'],
        className: 'slot1',
        textAlign: 'center'
      }],

      // 疾病类型picker
      sportList: [{
        name: '肿瘤',
        val: 'attribute_value_03'
      }, {
        name: '慢病',
        val: 'attribute_value_04'
      }],
      sportDefaultName: '肿瘤', // 页面显示的文字
      sportVisible: false,
      sportSlot: [{
        flex: 1,
        values: ['肿瘤', '慢病'],
        className: 'slot1',
        textAlign: 'center'
      }],

      // 临床诊断picker
      // 			zhenduanList:[
      //				{name:"请选择", val:""},
      //				{name:"肺癌", val:"attribute_value_03"}, {name:"胃癌", val:"attribute_value_04"}, {name:"肝癌", val:"attribute_value_05"},
      //				{name:"乳腺癌", val:"attribute_value_06"}, {name:"食管癌", val:"attribute_value_07"}, {name:"胰腺癌", val:"attribute_value_08"},
      //				{name:"白血病", val:"attribute_value_09"}, {name:"膀胱癌", val:"attribute_value_10"}, {name:"卵巢癌", val:"attribute_value_11"},
      //				{name:"鼻咽癌", val:"attribute_value_12"}, {name:"前列腺癌", val:"attribute_value_13"}, {name:"恶性淋巴瘤", val:"attribute_value_13"},
      //				{name:"结/直肠癌", val:"attribute_value_15"}, {name:"子宫内膜癌", val:"attribute_value_16"}, {name:"子宫癌颈癌", val:"attribute_value_17"},
      //				{name:"胃间质瘤", val:"attribute_value_18"}, {name:"脑恶性肿瘤", val:"attribute_value_19"}, {name:"胆道恶性肿瘤", val:"attribute_value_20"},
      // 			],
      // 			zhenduanDefaultName:"请选择",  //页面显示的文字
      // 			zhenduanVisible: false,
      // 			zhenduanSlot:[
      //				{
      // 					flex: 1,
      // 					values: [
      //						'请选择',
      //						'肺癌', '胃癌', '肝癌',
      //						'乳腺癌', '食管癌','胰腺癌',
      //						'白血病', '膀胱癌', '卵巢癌',
      //						'鼻咽癌', '前列腺癌', '恶性淋巴瘤',
      //						'结/直肠癌', '子宫内膜癌', '子宫癌颈癌',
      //						'胃间质瘤', '脑恶性肿瘤', '胆道恶性肿瘤'
      // 					],
      // 					className: 'slot1',
      // 					textAlign: 'center'
      //				}
      //			],

      // 临床诊断
      attribute_value_03_item: {
        option: [],
        value: [],
        checklist: true
      },

      ...formData

    }),
    watch: {
      'param.diseasetype': 'diseaseType',
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
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight)
        }, 0)
      }
    },
    methods: {
      closeTouch () {
        document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {
          passive: false
        }) // 阻止默认事件
      },
      openTouch () {
        document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {
          passive: false
        }) // 打开默认事件
      },
      visbleChange (val) {
        // console.log(val)
        // if (val) {
        this.closeTouch()
        // } else {
        // 	this.openTouch()
        // }
      },
      // 性别picker
      sexPickerToggle (state) {
        if (state == 'show') {
          this.closeTouch()
          this.popupVisible = true
        }
        if (state == 'hide') {
          this.openTouch()
          this.popupVisible = false
        }
      },
      // 性别picker  确定事件
      sexConfirm () {
        this.openTouch()
        const {
          sexPicker
        } = this.$refs
        let sex = sexPicker.getSlotValue(0)
        this.param.sex = sex
        this.sexPickerToggle('hide')
      },

      // 疾病类型picker
      sportPickerToggles (state) {
        if (state == 'show') {
          this.closeTouch()
          this.sportVisible = true
        }
        if (state == 'hide') {
          this.openTouch()
          this.sportVisible = false
        }
      },
      // 疾病类型picker 确定事件
      sportConfirm () {
        this.openTouch()
        const {
          sportPickers
        } = this.$refs
        let state = sportPickers.getSlotValue(0)
        let code = ''
        if (state == '肿瘤') {
          code = '01'
        }
        if (state == '慢病') {
          code = '02'
        }
        this.sportDefaultName = state
        this.param.diseasetype = code
        this.sportPickerToggles('hide')
      },

      // 临床诊断picker
      zhenduanPickerToggles (state) {
        if (state == 'show') {
          this.zhenduanVisible = true
        }
        if (state == 'hide') {
          this.zhenduanVisible = false
        }
      },
      // 临床诊断picker 确定事件
      zhenduanConfirm () {
        // 删除以前选择的内容
        //				for(let keys in this.diseaseParam){
        //					if(this.diseaseParam[keys] == 1){
        //						delete this.diseaseParam[keys]
        //					}
        //				}

        const {
          zhenduanPickers
        } = this.$refs
        let statecode = zhenduanPickers.getSlotValue(0)
        this.zhenduanList.forEach((item, index) => {
          if (item.name == statecode) {
            const {
              val,
              name
            } = item
            this.param[`${val}`] = 1
            this.zhenduanDefaultName = name
          }
        })
        this.zhenduanPickerToggles('hide')
      },

      // 计算BMI
      doBMI () {
        let {
          height,
          weight
        } = this.param // 身高  体重
        if (height < 50) {
          this.$Toast('请输入有效的身高')
          this.param.height = ''
          return
        }
        if (height == '' || weight == '') {
          return
        }
        height = height / 100 // 单位转换  cm到m
        const BMI = weight / (height * height) // 体重/身高的平方
        this.param.bmi = BMI.toFixed(1)
      },

      // citypicker的确定回调
      cityPickerChange (values) {
        this.openTouch()
        let cityValue = [values[0].name, values[1].name].join(',')
        this.param.location = cityValue.replace(',', '')
      },
      // 打开citypicker
      openCityPicker () {
        this.closeTouch()
        this.$refs.cityPicker.show()
      },

      // 疾病类型提交
      diseaseSubmit () {
        if (this.sportDefaultName == '肿瘤') {
          this.param.diseasetype = '01'
        }
        if (this.sportDefaultName == '慢病') {
          this.param.diseasetype = '02'
        }
        let url = 'UserInterface/AddConditionDiseaseTumour.ashx'
        let param = this.param
        if (param.name == '') {
          this.$Toast('请输入姓名')
          return
        }
        if (param.height == '') {
          this.$Toast('请输入身高')
          return
        }
        if (param.weight == '') {
          this.$Toast('请输入体重')
          return
        }
        if (param.location == '') {
          this.$Toast('请选择您所在地区')
          return
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

        this.$post(url, param).then((data) => {
          if (data.rspcode != 1) {
            return
          }
          this.$Toast('保存成功')
          this.$router.push(`/message2`)
        })
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
      },

      // 打开日期插件
      openTimePicker (timeField) {
        this.closeTouch()
        this.$refs.DatetimePicker.timeField = timeField
        this.$refs.DatetimePicker.open()
      },
      confirmDatetime (value) {
        this.openTouch()
        let {
          timeField
        } = this.$refs.DatetimePicker
        timeField = timeField.split('.')
        this.$data[timeField[0]][timeField[1]] = getTime(new Date(value))
      },
      delqxDate () {
        this.openTouch()
      }
    },
    created: function () {
      this.diseaseType('01')
    },
    components: {
      cityPicker: () => import(/* webpackChunkName: "cityData2" */ './../../common/cityPicker2.vue')
    },
    mounted () {
      this.openTouch()
    }
  }
</script>

<style scoped lang="scss">
  .personInfo_root {
    background-color: #f1f1f1;
    padding-top: 46px;
    padding-bottom: 64px;

    .mint-header {
      height: 46px;
    }

    .splitLine {
      margin-top: 0.1rem;
      background: #FFFFFF;

      .borderBottom {
        border: 0;
      }

      .titleBtm {
        padding: 0 25px 0 15px;
        line-height: 48px;
        font-size: 16px;
        position: relative;

        em {
          color: #0AC5C9;
          font-style: normal;
          font-size: 14px;
          padding-left: 2px;
        }

        span {
          color: #999999;
          font-size: 14px;
          padding-left: 2px;
          display: inline-block;
        }
      }

      .borderBottom::after,
      .bdrBtm::after,
      .titleBtm::after {
        background-color: #000;
        content: " ";
        opacity: 0.1;
        right: 0;
        bottom: 0;
        left: 15px;
        position: absolute;
        height: 1px;
      }

      .borderBottom:last-child::after {
        opacity: 0;
      }

      .zdData {
        background-color: #FFFFFF;
        padding: 0 15px;
        line-height: 48px;
        font-size: 16px;

      }
    }

    .mint-popup-bottom {
      width: 100%;
    }

    .picker {
      .picker-toolbar {

      }

      .picker_bar {
        display: flex;
        justify-content: space-between;
        text-align: center;
        border-bottom: solid 1px #eaeaea;

        .cancel {
          width: 50%;
          line-height: 44px;
          background-color: #dddddd;
          color: #666666;
        }

        .confrim {
          width: 50%; 
          line-height: 44px;
          background-color: #0AC5C9;
          color: #FFFFFF;
        }
      }
    }

    /*.picker_bar {*/
    /*  display: flex;*/
    /*  justify-content: space-between;*/
    /*  text-align: center;*/
    /*  line-height: 40px;*/
    /*  padding: 0 20px;*/
    /*  border-bottom: solid 1px #eaeaea;*/

    /*  .confrim {*/
    /*    color: #26a2ff;*/
    /*  }*/
    /*}*/

    .fix_bottom_area {
      padding: 0;

      .theme-button {
        width: 100%;
        border-radius: 0;
        height: 50px;
      }
    }
  }

  .tip {
    font-size: 0.14rem;
    line-height: 0.45rem;
    text-align: center;
    background: #FFD3B5;
    color: #F78335;
  }

  .title,
  .title2 {
    margin-top: 10px;
    padding: 5px 10px;
    font-size: 16px;
  }

  .title2 {
    margin-top: 0px;
    font-size: 14px;
  }

  .splitData {
    padding: 0 0.2rem 0.1rem 0.2rem;
    color: #666666;
    font-size: 0.14rem;

    span {
      font-size: 0.145rem;
      color: #484848;
    }
  }
</style>
<style>
  .personInfo_root input {
    text-align: right;
    border: 0 !important;
    color: #999999;
  }

  .personInfo_root .line-input {
    width: 72px;
    border: none !important;
    border-bottom: 1px solid #ddd !important;
    text-align: left;
  }

  .personInfo_root .mint-checklist-title,
  .personInfo_root .mint-radiolist-title,
  .personInfo_root .mint-cell-value.is-link {
    margin: 0;
  }

  .personInfo_root .mint-cell-allow-right::after {
    right: 10px;
  }

  .personInfo_root .mint-cell-wrapper {
    padding: 0 25px 0px 15px;
  }

  .personInfo_root .checklist,
  .personInfo_root .mint-radiolist {
    background: #FFFFFF;
    padding: 15px;
  }

  .personInfo_root .checklist .mint-cell-wrapper {
    padding: 0;
  }

  .personInfo_root .checklist .mint-cell {
    display: inline-block;
    padding: 0;
    border-radius: 20px;
    margin: 0 0.05rem;
    min-height: 42px;
  }

  .personInfo_root .mint-radiolist .mint-cell {
    display: inline-block;
    padding: 0;
    border-radius: 20px;
    margin: 0 1%;
    min-width: 38%;
    min-height: 42px;
  }

  .personInfo_root .mint-radiolist .mint-cell .mint-cell-wrapper,
  .personInfo_root .mint-radiolist .mint-cell .mint-cell-wrapper .mint-radiolist-label {
    padding: 0;
  }

  .personInfo_root .checklist .mint-cell.active {
    background-color: #0AC5C9;
  }

  .personInfo_root .mint-radiolist .mint-cell::after {

  }

  .personInfo_root .mint-checklist .mint-cell::after {
    /*content: " ";*/
    /*opacity: 0.1;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 15px;*/
    /*position: absolute;*/
    /*border-bottom: 1px dashed #000;*/
  }

  .personInfo_root .mint-cell:last-child::after {
    /*opacity: 0;*/
  }

  .personInfo_root .checklist .mint-checklist-label {
    padding: 0;
    position: relative;
    width: 100%;
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
  }

  .personInfo_root .mint-checklist .mint-cell {
    width: 32%;
    margin: 0 0 0 1%;
  }

  .personInfo_root .mint-checklist .mint-checkbox-core {
    border-radius: 5px;
    width: 18px;
    height: 18px;
  }

  .personInfo_root .mint-checklist .mint-checkbox-label {
    margin-left: 4px;
  }

  /*.personInfo_root .mint-radiolist .mint-radiolist-label{*/
  /*  position: relative;*/
  /*}*/
  /*.personInfo_root .mint-radiolist .mint-radiolist-label .mint-radio-core{*/
  /*  width: 100%;*/
  /*  height: 29px;*/
  /*  border-radius: 20px;*/
  /*}*/
  /*.personInfo_root .mint-radiolist .mint-radiolist-label .mint-radio-label {*/
  /*  vertical-align: middle;*/
  /*  margin-left: 6px;*/
  /*  position: absolute;*/
  /*  left: 33px;*/
  /*}*/
  /*.personInfo_root .mint-radiolist  .mint-radio-input:checked+.mint-radio-label,*/
  /*.personInfo_root .mint-radiolist .mint-checkbox-input:checked+.mint-radio-label{*/
  /*  color: #f1f1f1;*/
  /*}*/
  .personInfo_root .mint-radiolist .mint-radiolist-label .mint-radio-label {

  }

  .personInfo_root .picker .picker-toolbar {
    height: 45px;
    border: 0;
  }

  .personInfo_root .picker .mint-datetime-action {
    width: 50%;
    line-height: 44px;
    font-size: inherit;
  }

  .personInfo_root .picker .mint-datetime-cancel {
    background-color: #dddddd;
    color: #666666;
  }

  .personInfo_root .picker .mint-datetime-confirm {
    background-color: #0AC5C9;
    color: #FFFFFF;
  }
  .personInfo_root .mint-radiolist.dateSelection {
    padding: 0 25px 0 15px;
    color: #787878;
  }
  .personInfo_root .mint-radiolist.dateSelection .mint-cell{
    width: 100%;
  }
  .personInfo_root .mint-radiolist.dateSelection .mint-radio .mint-radio-core{
    border-radius: 5px;
    /*float: right;*/
  }
  .personInfo_root .mint-radiolist.dateSelection .mint-cell-title{
    position: relative;

  }
  .personInfo_root .mint-radiolist.dateSelection .mint-radio-label{
    margin-left: 0;
  }
  .personInfo_root .mint-radiolist.dateSelection .mint-radio-input:checked + .mint-radio-core::after{
    color: #FFFFFF;
    top: 2px;
    left: 3px;
    content: "\2713";
    font-weight: bold;
    background-color:#0AC5C9;
  }
  .personInfo_root .mint-radiolist.dateSelection  .mint-radio-input:checked + .mint-radio-core{
    /*background-color: #FFFFFF;*/
    /*border-color: #FFFFFF;*/
  }
  @media screen and (max-width: 375px) {
    .personInfo_root .mint-checklist .mint-cell {
      width: 48%;
      margin: 0 0 0 1%;
    }

    .personInfo_root .mint-radiolist .mint-cell {
      margin: 0 1%;
      min-width: 43%;
    }
  }

  .mint-radio-input:checked + .mint-radio-core, .mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #0AC5C9;
    border-color: #0AC5C9;
  }

  /* 屏幕等于1440px */
  @media screen and (max-width: 375px) and (min-width: 1440px) {
    .add {
      width: 348px;
    }
  }
</style>
