<template>
  <div class="personInfo_root padding-header ">
    <mt-header title="个人信息" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    
    <div class="splitLine">
      <mt-field label="姓名" placeholder="请输入姓名" class="borderBottom required" v-model.trim="param.name"></mt-field>
      <mt-cell title="性别" is-link @click.native="sexPickerToggle('show')" class="borderBottom required">
        <span v-if="param.sex == '男'">男</span>
        <span v-if="param.sex == '女'">女</span>
      </mt-cell>
      <mt-field label="年龄" placeholder="请输入年龄" class="borderBottom required" v-model.trim="param.age"></mt-field>
      <mt-cell title="民族" is-link @click.native="nationVisible = true" class="borderBottom">
        <span>{{param.nation || '请选择民族'}}</span>
      </mt-cell>
      <mt-cell title="婚姻状态" is-link @click.native="marriageVisible = true" class="borderBottom">
        <span>{{param.marriage || '请选择婚姻状态'}}</span>
      </mt-cell>
      <mt-cell title="文化程度" is-link @click.native="cultureVisible = true" class="borderBottom">
        <span>{{param.culture || '请选择文化程度'}}</span>
      </mt-cell>
      <mt-cell title="目前居住地" is-link @click.native="placeResidenceVisible = true" class="borderBottom">
        <span>{{param.placeResidence || '请选择目前居住地'}}</span>
      </mt-cell>
    </div>
    <div class="tip">请填写患者本人信息，方便精准进行管理</div>


    <div class=""></div>
    <div class="fix_bottom">
      <mt-button type="primary" class="theme-button button-radio " size="large" @click.native="addSubmit"  v-preventReClick>保存</mt-button>
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

    <!-- 婚姻状态picker  -->
    <mt-popup v-model="nationVisible" position="bottom">
      <mt-picker :slots="nationSlot" :showToolbar="true" :visibleItemCount="3" ref="nationPicker" @change="closeTouch"  @cancel="openTouch">
        <div class="picker_bar">
          <div class="cancel" @click="nationVisible = false">取消</div>
          <div class="confrim" @click="nationConfirm">确定</div>
        </div>
      </mt-picker>
    </mt-popup>

    <!-- 婚姻状态picker  -->
    <mt-popup v-model="marriageVisible" position="bottom">
      <mt-picker :slots="marriageSlot" :showToolbar="true" :visibleItemCount="3" ref="marriagePicker" @change="closeTouch"  @cancel="openTouch">
        <div class="picker_bar">
          <div class="cancel" @click="marriageVisible = false">取消</div>
          <div class="confrim" @click="marriageConfirm">确定</div>
        </div>
      </mt-picker>
    </mt-popup>

    <!-- 文化程度picker  -->
    <mt-popup v-model="cultureVisible" position="bottom">
      <mt-picker :slots="cultureSlot" :showToolbar="true" :visibleItemCount="3" ref="culturePicker" @change="closeTouch"  @cancel="openTouch">
        <div class="picker_bar">
          <div class="cancel" @click="cultureVisible = false">取消</div>
          <div class="confrim" @click="cultureConfirm">确定</div>
        </div>
      </mt-picker>
    </mt-popup>

    <!-- 目前居住地picker  -->
    <mt-popup v-model="placeResidenceVisible" position="bottom">
      <mt-picker :slots="placeResidenceSlot" :showToolbar="true" :visibleItemCount="3" ref="placeResidencePicker" @change="closeTouch"  @cancel="openTouch">
        <div class="picker_bar">
          <div class="cancel" @click="placeResidenceVisible = false">取消</div>
          <div class="confrim" @click="placeResidenceConfirm">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
  </div>

</template>

<script>
export default {
  name: 'personInfo_root',
  data: () => ({
    param: {
      name: '', // 姓名
      sex: '男', // 性别
      age: '', // 年龄
      nation: '', // 民族
      marriage: '', // 婚姻状态
      culture: '', // 文化程度
      placeResidence: ''// 目前居住地
    },

    // 性别picker
    popupVisible: false, // 是否显示
    sexSlots: [{
      flex: 1,
      values: ['男', '女'],
      className: 'slot1',
      textAlign: 'center'
    }],

    // 民族picker
    nationVisible: false,
    nationSlot: [{
      flex: 1,
      values: ['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族', '布依族', '朝鲜族', '侗族', '瑶族', '白族', '土家族', '哈尼族', '满族', '其他民族'],
      className: 'slot1',
      textAlign: 'center'
    }],

    // 婚姻状态picker
    marriageVisible: false,
    marriageSlot: [{
      flex: 1,
      values: ['未婚', '已婚/再婚/同居', '离异', '丧偶'],
      className: 'slot1',
      textAlign: 'center'
    }],

    // 文化程度 picker
    cultureVisible: false,
    cultureSlot: [{
      flex: 1,
      values: ['未曾上学', '小学', '初中', '高中（中专）', '大学', '硕士及以上'],
      className: 'slot1',
      textAlign: 'center'
    }],

    // 目前居住地 picker
    placeResidenceVisible: false,
    placeResidenceSlot: [{
      flex: 1,
      values: ['省会级城市', '市地级市', '县城', '乡镇', '农村'],
      className: 'slot1',
      textAlign: 'center'
    }],
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

    // 婚姻状态的picker 确定事件
    nationConfirm(){
      this.openTouch()
      const {
        nationPicker
      } = this.$refs
      let value = nationPicker.getSlotValue(0)
      this.param.nation = value
      this.nationVisible = false
    },

    // 婚姻状态的picker 确定事件
    marriageConfirm(){
      this.openTouch()
      const {
        marriagePicker
      } = this.$refs
      let value = marriagePicker.getSlotValue(0)
      this.param.marriage = value
      this.marriageVisible = false
    },

    // 文化程度的picker 确定事件
    cultureConfirm(){
      this.openTouch()
      const {
        culturePicker
      } = this.$refs
      let value = culturePicker.getSlotValue(0)
      this.param.culture = value
      this.cultureVisible = false
    },

    // 目前居住地的picker 确定事件
    placeResidenceConfirm(){
      this.openTouch()
      const {
        placeResidencePicker
      } = this.$refs
      let value = placeResidencePicker.getSlotValue(0)
      this.param.placeResidence = value
      this.placeResidenceVisible = false
    },

    // 新增提交
    addSubmit () {
      const param = Object.assign({}, this.param)
      if (this.diseaseSubmit()) {
        let url = 'UserInterface/AddConditionDiseaseTumour.ashx'
        this.$post(url, param).then((data) => {
          if (data.rspcode != 1) {
            this.$Toast(data.rspdesc)
            return
          }
          this.$Toast('保存成功')
          this.$router.push(`/wx_Entrance/home`)
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
      if (param.sex == '') {
        this.$Toast('请输入性别')
        return false
      }
      if (param.age == '') {
        this.$Toast('请输入年龄')
        return false
      }
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
  },
  mounted () {
    this.openTouch()
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
    padding-top: 0.48rem;
    // padding-bottom:0.54rem;
    min-height: 100vh;
    box-sizing: border-box;
  }

  .tip {
    font-size: 0.14rem;
    line-height: 0.45rem;
    padding: 0 15px;
    // text-align: center;
    // background: #FFD3B5;
    color: red;
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
      height: 0.48rem;
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
        opacity: 0.075;
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
        height: 0.52rem;
        font-size: 0.17rem;
        letter-spacing: 2px;
        background-color: #0ac5ca;
      }
    }
  }

  .personInfo_root  input {
    text-align: right;
    border: none !important;
    color: #888;
    font-size: 16px;
  }
  /*.personInfo_root .splitLine input.mint-field-core{*/
  /*  font-size: 0.16rem!important;*/
  /*}*/
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

  .personInfo_root  .mint-cell {
    min-height: 0.48rem;
    height: 0.52rem;
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
    min-height: 0.48rem;
    height: 0.52rem;
  }
  .personInfo_root  .mint-cell-wrapper  .mint-cell-title .mint-cell-text{
   color: #404040;
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
    color: #888;
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
