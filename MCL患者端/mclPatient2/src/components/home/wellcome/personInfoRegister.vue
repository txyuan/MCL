<template>
  <div class="personInfo_root padding-header padding-footer">
    <mt-header title="个人信息" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <!-- <div class="tip">请保证录入信息真实有效</div>-->
    <div class="splitLine">
      <mt-field label="姓名" placeholder="请输入姓名" class="borderBottom required" v-model.trim="param.name"></mt-field>
      <mt-cell title="性别" is-link @click.native="sexPickerToggle('show')" class="borderBottom required">
        <span v-if="param.sex == '男'">男</span>
        <span v-if="param.sex == '女'">女</span>
      </mt-cell>
      <mt-cell title="出生日期" is-link @click.native="openTimePicker('param.birth')" class="borderBottom required">
        <span>{{param.birth || '请选择出生日期'}}</span>
      </mt-cell>

      <mt-cell is-link class="borderBottom sportEvaluation-wrap required" @click.native="openCityPicker">
        <div slot="title" class="titleWrap">
          <span class="mint-cell-text">您所在地区</span>
        </div>
        <div class="sportEvaluation">
          {{param.location|| '请选择您所在地区'}}
        </div>
      </mt-cell>
      <mt-field label="身高" placeholder="请输入身高" class="borderBottom required" v-model.trim="param.height"
                @change="doBMI">&nbsp;cm
      </mt-field>
      <mt-field label="体重" placeholder="请输入体重" class="borderBottom required" v-model.trim="param.weight"
                @change="doBMI">&nbsp;kg
      </mt-field>
      <mt-field label="BMI" placeholder="BMI" class="borderBottom required" :readonly="true" v-model.trim="param.bmi"></mt-field>
      <mt-cell is-link class="sportEvaluation-wrap borderBottom required" @click.native="$route.query.type === 'look' ? $Toast('不能修改管理类型') : sportPickerToggles('show')">
        <div slot="title" class="titleWrap">
          <span class="mint-cell-text">管理类型</span>
        </div>
        <div class="sportEvaluation">
          {{sportDefaultName}}
        </div>
      </mt-cell>
    </div>

    <!--  体重管理-->
    <!-- <weightTab ref="weightTab" v-show="param.diseasetype == '03'"/> -->

    <!--  健康管理-->
    <!-- <healthTab ref="healthTab" v-show="param.diseasetype == '02'"/> -->

    <!--  肿瘤管理-->
    <!-- <zlTab ref="zlTab" v-show="param.diseasetype == '01'"/> -->

    <div class=""></div>
    <div class="fix_bottom">
      <mt-button type="primary" class="theme-button button-radio " size="large" @click.native="addSubmit"  v-preventReClick>下一步
      </mt-button>
    </div>

    <!-- 性别picker  -->
    <mt-popup v-model="popupVisible" position="bottom">
      <mt-picker :slots="sexSlots" :showToolbar="true" :visibleItemCount="3" ref="sexPicker" @change="closeTouch"  @cancel="openTouch">
        <div class="picker_bar">
          <div class="cancel" @click="sexPickerToggle('hide')">取消</div>
          <div class="confrim" @click="sexConfirm">确定</div>
        </div>
      </mt-picker>
    </mt-popup>

    <!-- 疾病类型picker  -->
    <mt-popup class="sportPicker" v-model="sportVisible" position="bottom">
      <mt-picker :slots="sportSlot" :showToolbar="true" :visibleItemCount="3" valueKey="name" ref="sportPickers" @change="closeTouch"  @cancel="openTouch">
        <div class="picker_bar">
          <div class="cancel" @click="sportPickerToggles('hide')">取消</div>
          <div class="confrim" @click="sportConfirm">确定</div>
        </div>
      </mt-picker>
    </mt-popup>

    <!-- 城市picker -->
    <cityPicker @confrim="cityPickerChange" ref="cityPicker" @change="closeTouch" @cancel="openTouch"/>

    <!-- 时间picker -->
    <mt-datetime-picker ref="DatetimePicker" @change="closeTouch" type="date"
      :startDate="new Date(new Date().setFullYear(new Date().getFullYear() - 90))"
      :endDate="new Date(new Date().setFullYear(new Date().getFullYear() + 3))" :value="new Date()"
      year-format="{value} 年"
      month-format="{value} 月" date-format="{value} 日" @confirm="confirmDatetime" @cancel="openTouch">
    </mt-datetime-picker>

  </div>

</template>

<script>
import cityPicker from '@/components/common/cityPicker2.vue'

function getTime (d) {
  let year = d.getFullYear()
  let month = (d.getMonth() + 1)
  month = (month < 10 ? `0${month}` : month)
  let date = d.getDate()
  date = (date < 10 ? `0${date}` : date)
  return `${year}-${month}-${date}`
}
let vm;
export default {
  name: 'personInfo_root',
  data: () => ({
    param: {
      name: '', // 姓名
      sex: '男', // 姓名
      birth: '', // 出生日期
      height: '', // 身高
      weight: '', // 体重
      bmi: '', // BMI
      diseasetype: '01', // 管理类型（01：肿瘤，02：健康 03：体重）
      location: '' // 所在地
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
    sportDefaultName: '请选择管理类型', // 页面显示的文字
    sportVisible: false,
    sportSlot: [{
      flex: 1,
      values: [{name: '肿瘤管理', id: '01'}, {name: '健康管理', id: '02'}],
      className: 'slot1',
      textAlign: 'center'
    }]
  }),
  methods: {

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

    // 阻止页面滑动事件（打开黑色遮罩）
    handler (e) {
      e.preventDefault()
    },
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
      this.sportDefaultName = state.name
      this.param.diseasetype = state.id
      this.sportPickerToggles('hide')
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

    // 新增提交
    addSubmit () {
      const param = Object.assign({}, this.param)
      const diseasetype = this.param.diseasetype // 管理类型（01：肿瘤，02：健康 03：体重）
      if (this.diseaseSubmit()) {
        let url = ''
        if (diseasetype === '01') {
          url = 'UserInterface/AddConditionDiseaseTumour.ashx'
        } else if (diseasetype === '02') {
          url = 'UserInterface/AddConditionDiseaseDisease.ashx'
        } 
        this.$post(url, param).then((data) => {
          if (data.rspcode != 1) {
            this.$Toast(data.rspdesc)
            return
          }
          this.$Toast('保存成功')
          this.$router.push(`/message2`)
        })
      }
    },

    // 必填项验证
    diseaseSubmit () {
      let param = this.param
      if (param.name == '') {
        this.$Toast('请输入姓名')
        return false
      }
      if (param.height == '') {
        this.$Toast('请输入身高')
        return false
      }
      if (param.weight == '') {
        this.$Toast('请输入体重')
        return false
      }
     
      // if (param.location == '') {
      //   this.$Toast('请选择您所在地区')
      //   return false
      // }
      // if (param.birth == '') {
      //   this.$Toast('请选择出生日期')
      //   return false
      // }
      return true
    },
  },
  watch: {
    popupVisible: function(val){
      if(!val){
        this.openTouch()
      }
    },
    sportVisible: function(val){
      if(!val){
        this.openTouch()
      }
    },
  },
  components: {
    cityPicker
  },
  mounted () {
    vm = this
    this.openTouch()
    // 回显表单数据
    this.sportConfirm() // 设置默认的管理类型
    
    // 监听时间插件的关闭
    this.$watch('$refs.DatetimePicker.visible',function(val){
      if(!val){
        this.openTouch()
      }
    })

    // 监听省市区插件的关闭
    this.$watch('$refs.cityPicker.showPicker',function(val){
      if(!val){
        this.openTouch()
      }
    })
  }
}
</script>

<style scoped lang="scss">
  .splitLine >>> {
     .required .mint-cell-text::after{
      content: "*";
      color: red;
      margin-top: 6px;
      margin-left: 2px;
      height: 9px;
      display: inline-block;
    }
  }
  .personInfo_root{
    background-color: #f1f1f1;
    padding-top: 0.44rem;
    padding-bottom: 64px;
    min-height: 100vh;
    box-sizing: border-box;
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
    font-size: 0.16rem;
  }

  .title2 {
    margin-top: 0px;
    font-size: 0.145rem;
  }

  .manageTitle {
    height: 0.44rem;
    line-height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
    text-align: center;
    font-size: 0.160rem;
    color: #333333;

    .flex-fill {
      border-right: 1px solid #e5e5e5;
    }

    .flex-fill:last-child {
      border-right: 0;
    }

    .active {
      background-color: #0ac5ca;
      color: #FFFFFF;
    }
  }

  .d-flex {
    display: -ms-flexbox !important;
    display: flex !important;
  }

  .flex-fill {
    -ms-flex: 1 1 auto !important;
    flex: 1 1 auto !important;
  }
</style>
<style lang="scss">
  .personInfo_root .splitData {
    padding: 0 0.2rem 0.1rem 0.2rem;
    color: #666666;
    font-size: 0.14rem;

    span {
      font-size: 0.145rem;
      color: #484848;
    }
  }
  .personInfo_root  {
    .mint-header {
      height: 0.44rem;
      border-bottom: 1px solid #e5e5e5;
    }

    .splitLine {
      background: #FFFFFF;

      .borderBottom {
        border: 0;
      }
      .titleZb {
        padding: 0 25px 0 15px;
        line-height:0.46rem;
        font-size:0.16rem;
        position: relative;
        border-bottom: 1px solid #e5e5e5;
        em {
          font-style: normal;
          width: 0.04rem;
          height: 0.15rem;
          display: inline-block;
          background-color: #0ac5ca;
          margin-right: 0.05rem;
        vertical-align: text-bottom;
        }
      }
      .titlTop {
        padding: 0 25px 0 15px;
        line-height:0.46rem;
        font-size: 0.16rem;
        position: relative;

        em {
          color: #0ac5ca;
          font-style: normal;
          font-size: 0.145rem;
          padding-left: 2px;
        }

        span {
          color: #999999;
          font-size: 0.145rem;
          padding-left: 2px;
          display: inline-block;
        }
      }
      .titleBtm {
        padding: 0 25px 0 15px;
        line-height:0.46rem;
        font-size: 0.16rem;
        position: relative;

        em {
          color: #0ac5ca;
          font-style: normal;
          font-size: 0.145rem;
          padding-left: 2px;
        }

        span {
          color: #999999;
          font-size: 0.145rem;
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

      #saveHeight .borderBottom:last-child::after, #saveWeight .borderBottom:last-child::after {
        opacity: 0.1;
      }

      .zdData {
        background-color: #FFFFFF;
        padding: 0 15px;
        line-height: 48px;
        font-size: 0.16rem;

      }
    }

    .mint-popup-bottom {
      width: 100%;
      min-height: 28%;
    }

    .picker {
      .picker-toolbar {

      }
      .picker-items{
        min-height: 40%;
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
          background-color: #0ac5ca;
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

    .fix_bottom {
      padding: 0;
      z-index: 9;

      .theme-button {
        width: 100%;
        border-radius: 0;
        height: 0.44rem;
        font-size: 0.17rem;
        letter-spacing: 2px;
        background-color: #0ac5ca;
      }
    }
  }

  .personInfo_root  input {
    text-align: right;
    border: none !important;
    color: #999999;
  }
  .personInfo_root .splitLine input.mint-field-core{
    font-size: 0.16rem!important;
  }
  .personInfo_root  .page_text_left input {
    text-align: left;
  }

  .personInfo_root  .line-input {
    width: 72px;
    border: none !important;
    border-bottom: 1px solid #ddd !important;
    text-align: center;
    font-size: 0.145rem;
  }

  .personInfo_root  .mint-checklist-title,
  .personInfo_root  .mint-radiolist-title,
  .personInfo_root  .mint-cell-value.is-link {
    margin: 0;
  }

  .personInfo_root  .mint-cell-allow-right::after {
    right: 10px;
  }

  .personInfo_root  .mint-cell-wrapper {
    padding: 0 25px 0px 15px;
  }

  .personInfo_root  .checklist,
  .personInfo_root  .mint-radiolist {
    background: #FFFFFF;
    padding: 15px;
  }

  .personInfo_root  .checklist .mint-cell-wrapper {
    padding: 0;
  }

  .personInfo_root  .checklist .mint-cell {
    display: inline-block;
    padding: 0;
    border-radius: 20px;
    margin: 0 0.05rem;
    min-height: 42px;
  }

  .personInfo_root  .mint-radiolist .mint-cell {
    display: inline-block;
    padding: 0;
    border-radius: 20px;
    margin: 0 1%;
    min-width: 38%;
    min-height: 42px;
  }
  .personInfo_root  .glmb_style_a .mint-cell {
      margin: 0 1%;
      min-width: 46%;
    }
  .personInfo_root  .yyqk_style_a .mint-cell {
      margin: 0 1%;
      min-width: 33%;
      max-width: 66%;
    }
  .personInfo_root  .qkxz_style_a .mint-cell {
    margin: 0 1%;
    min-width: 48%;
  }
  .personInfo_root  .yjk_style_a .mint-cell {
    margin: 0 1%;
    min-width: 50%;
  }
  .personInfo_root  .gltz_style_a .mint-cell {
      margin: 0 1%;
      min-width: 24%;
    width: auto!important;
      max-width: 60%;
    }

  .personInfo_root  .mint-radiolist .mint-cell .mint-cell-wrapper,
  .personInfo_root  .mint-radiolist .mint-cell .mint-cell-wrapper .mint-radiolist-label {
    padding: 0;
  }

  .personInfo_root  .checklist .mint-cell.active {
    background-color: #0ac5ca;
  }

  .personInfo_root  .mint-radiolist .mint-cell::after {

  }

  .personInfo_root  .mint-checklist .mint-cell::after {
    /*content: " ";*/
    /*opacity: 0.1;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 15px;*/
    /*position: absolute;*/
    /*border-bottom: 1px dashed #000;*/
  }

  .personInfo_root  .mint-cell:last-child::after {
    /*opacity: 0;*/
  }

  .personInfo_root  .checklist .mint-checklist-label {
    padding: 0;
    position: relative;
    width: 100%;
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
  }

  .personInfo_root  .mint-checklist .mint-cell {
    width: 32%;
    margin: 0 0 0 1%;
  }

  .personInfo_root  .mint-checklist .mint-checkbox-core {
    border-radius: 5px;
    width: 18px;
    height: 18px;
  }

  .personInfo_root  .mint-checklist .mint-checkbox-label {
    margin-left: 4px;

  }

  /*.personInfo_root  .mint-radiolist .mint-radiolist-label{*/
  /*  position: relative;*/
  /*}*/
  /*.personInfo_root  .mint-radiolist .mint-radiolist-label .mint-radio-core{*/
  /*  width: 100%;*/
  /*  height: 29px;*/
  /*  border-radius: 20px;*/
  /*}*/
  /*.personInfo_root  .mint-radiolist .mint-radiolist-label .mint-radio-label {*/
  /*  vertical-align: middle;*/
  /*  margin-left: 6px;*/
  /*  position: absolute;*/
  /*  left: 33px;*/
  /*}*/
  /*.personInfo_root  .mint-radiolist  .mint-radio-input:checked+.mint-radio-label,*/
  /*.personInfo_root  .mint-radiolist .mint-checkbox-input:checked+.mint-radio-label{*/
  /*  color: #f1f1f1;*/
  /*}*/
  .personInfo_root  .mint-radiolist .mint-radiolist-label .mint-radio-label {

  }

  .personInfo_root  .picker .picker-toolbar {
    height: 45px;
    border: 0;
  margin-bottom: 0.2rem;
  }

  .personInfo_root  .picker .mint-datetime-action {
    width: 50%;
    line-height: 44px;
    font-size: inherit;
  }

  .personInfo_root  .picker .mint-datetime-cancel {
    background-color: #dddddd;
    color: #666666;
  }

  .personInfo_root  .picker .mint-datetime-confirm {
    background-color: #0ac5ca;
    color: #FFFFFF;
  }

  .personInfo_root  .mint-radiolist.dateSelection {
    padding: 0 25px 0 15px;
    color: #787878;
  }

  .personInfo_root  .mint-radiolist.dateSelection .mint-cell {
    width: 100%;
  }

  .personInfo_root  .mint-radiolist.dateSelection .mint-radio .mint-radio-core {
    border-radius: 5px;
    /*float: right;*/
  }

  .personInfo_root  .mint-radiolist.dateSelection .mint-cell-title {
    position: relative;

  }

  .personInfo_root  .mint-radiolist.dateSelection .mint-radio-label {
    margin-left: 0;
  }

  .personInfo_root  .mint-radiolist.dateSelection .mint-radio-input:checked + .mint-radio-core::after {
    color: #FFFFFF;
    top: 2px;
    left: 3px;
    content: "\2713";
    font-weight: bold;
    background-color: #0ac5ca;
  }

  .personInfo_root  .splitLine .mint-field .mint-cell-value {
    color: #999;
  }

  .personInfo_root  .mint-radiolist.dateSelection .mint-radio-input:checked + .mint-radio-core {
    /*background-color: #FFFFFF;*/
    /*border-color: #FFFFFF;*/
  }
  .personInfo_root  .city_picker_root .picker,  .personInfo_root  .city_picker_root .mint-popup {
    min-height: 40%;
  }

  .personInfo_root  .city_picker_root .picker .picker-toolbar .bar {
    padding: 0;
    background-color: #dddddd;
    color: #666666;
    text-align: center;
  }

  .personInfo_root  .city_picker_root .picker .picker-toolbar .bar span{
    width: 50%;
    display: inline-block;
    height: 44px;
    line-height: 44px;
  }

  .personInfo_root  .city_picker_root .picker .picker-toolbar .bar span.confirm{
    background-color: #0ac5ca;
    color: #FFFFFF;
  }
  @media screen and (max-width: 375px) {
    .personInfo_root  .mint-checklist .mint-cell {
      width: 48%;
      margin: 0 0 0 1%;
    }

    .personInfo_root  .mint-radiolist .mint-cell {

      margin: 0 0 0 1%;
      min-width: 48%;
    }
  }

  .mint-radio-input:checked + .mint-radio-core, .mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #0ac5ca;
    border-color: #0ac5ca;
  }

  /* 屏幕等于1440px */
  @media screen and (max-width: 375px) and (min-width: 1440px) {
    .add {
      width: 348px;
    }
  }
</style>
