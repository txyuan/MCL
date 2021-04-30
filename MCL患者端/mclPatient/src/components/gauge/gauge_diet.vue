<template>
  <div class="PG-SGA-root padding-header padding-footer" style="background-color: #f1f1f1">
    <mt-header title="饮食处方" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div style="margin-bottom: 0.2rem">
      <div class="section">
        <div class="title2">1、您的饮食状况：<em class="text_bt">(必填)</em></div>
        <mt-radio :options="dietarysituationRadiolist.option" v-model="param.dietarysituation"></mt-radio>
      </div>
      <div class="section">
        <div class="title2">2、饮食餐次<em class="text_bt">(必填)</em></div>
        <mt-radio :options="mealTimesList.option" v-model="param.mealTimes"></mt-radio>
      </div>
      <div class="section">
        <div class="title2">3、哪餐最丰富</div>
        <mt-radio :options="richList.option" v-model="param.rich"></mt-radio>
      </div>
      <div class="section">
        <div class="title2">4、早餐（多选）</div>
        <mt-checklist :options="breakfastRadiolist.option" v-model="breakfastRadiolist.value"></mt-checklist>
      </div>
      <div class="section">
        <div class="title2">5、中晚餐食物结构（多选）<em class="text_bt">(必填)</em></div>
        <mt-checklist :options="chineseDinnerlist.option" v-model="chineseDinnerlist.value"></mt-checklist>
      </div>
      <div class="section">
        <div class="title2">6、菜的烹调习惯（多选）<em class="text_bt">(必填)</em></div>
        <mt-checklist :options="cookingHabits.option" v-model="cookingHabits.value"></mt-checklist>
      </div>
      <div class="section">
        <div class="title2">7、饮食习惯</div>
        <mt-radio :options="dietHabits.option" v-model="param.eatinghabits"></mt-radio>
      </div>
      <div class="section">
        <div class="title2">8、每天饮水</div>
        <div class="ym_text">
          <p> 每天饮水：<input type="text" class="line-input" v-model="param.water">ml/天</p>
        </div>
      </div>
      <div class="section">
        <div class="title2">9、否有其他营养来源<em class="text_bt">(必填)</em></div>
        <mt-radio :options="nutrientsourcesRadiolist.option" v-model="nutrientsourcesRadiolist.value"></mt-radio>
        <div class="lh-ys" v-show="nutrientsourcesRadiolist.value === '口服营养制剂'">
            剂量:<input type="text" class="line-input" v-model="param.nutrientsources03"> Kcal
        </div>
        <div class="lh-ys" v-show="nutrientsourcesRadiolist.value === '静脉营养'">
            剂量:<input type="text" class="line-input" v-model="param.nutrientsources05"> Kcal
        </div>
      </div>
      <div class="section">
        <div class="title2">10、目前的活动状态是<em class="text_bt">(必填)</em></div>
        <mt-radio :options="activeRadiolist.option" v-model="param.coefficienttype"></mt-radio>
      </div>
      <div class="fix_bottom">
        <mt-button type="primary" class="theme-button button-radio" size="large" @click.native="submit" v-preventReClick>提交申请</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'friend',
  data: () => ({
    // 接口参数
    param: {
      // coefficienttype: '', // 目前活动状态
      // dietarysituation: '', // 饮食情况
      // nutrientsources01: '0', // 营养来源（选择为1，没选择为0）
      // nutrientsources02: '0', // 营养来源（选择为1，没选择为0）
      // nutrientsources03: '', // 营养来源
      // nutrientsources04: '0', // 营养来源（选择为1，没选择为0）
      // nutrientsources05: '', // 营养来源
      resetstatus: '' // 重置状态 （传1就行）
    },

    // 饮食情况
    dietarysituationRadiolist: {
      option: ['正常饮食', '正常饮食，但比正常情况少', '少量固体食物', '只能进食流食', '只能口服营养制剂', '几乎吃不下什么', '只能通过管饲进食或静脉营养']
    },
    // 饮食餐次
    mealTimesList: {
      option: ['一日三餐', '一日二餐', '一日一餐']
    },
    // 哪餐最丰富
    richList: {
      option: ['早', '中', '晚']
    },
    // 早餐
    breakfastRadiolist: {
      option: [{label: '不吃', value: 'breakfast01'}, {label: '米面为主', value: 'breakfast02'}, {label: '鸡蛋牛奶谷粉', value: 'breakfast03'}, {label: '有水果疏菜', value: 'breakfast04'}],
      value: []
    },
    // 中晚餐食物结构
    chineseDinnerlist: {
      option: [{label: '米面为主+素食', value: 'foodStructure01'}, {label: '米面为主+浑素', value: 'foodStructure02'}, {label: '素食为主+米面', value: 'foodStructure03'}, {label: '浑素为主+米面', value: 'foodStructure04'}, {label: '米汤或汤', value: 'foodStructure05'}, {label: '水果', value: 'foodStructure06'}],
      value: []
    },
    // 菜的烹调习惯
    cookingHabits: {
      option: [{label: '蒸', value: 'cookingHabits01'}, {label: '煮', value: 'cookingHabits02'}, {label: '炒', value: 'cookingHabits03'}, {label: '煎', value: 'cookingHabits04'}, {label: '经常吃烧烤', value: 'cookingHabits05'}],
      value: []
    },
    // 饮食习惯
    dietHabits: {
      option: ['居家饮食为主', '外卖及外出就餐为主'],
      value: []
    },
    // 否有其他营养来源
    nutrientsourcesRadiolist: {
      option: ['无', '口服营养制剂', '静脉营养'],
      value: '',
      radiolist: true
    },
    // 目前的活动状态是
    activeRadiolist: {
      option: ['完全卧床', '部分受限', '自主活动', '完全日常']
    }
  }),
  watch: {
    // 营养来源
    'nutrientsourcesRadiolist.value': function (val) {
      this.param.nutrientsources03 = ''
      this.param.nutrientsources05 = ''
      // 选择为1，没选择为0
      this.param.nutrientsources01 = '0'
      this.param.nutrientsources02 = '0'
      this.param.nutrientsources04 = '0'
      if (val == '无') {
        this.param.nutrientsources01 = '1'
      } else if (val == '口服营养制剂') {
        this.param.nutrientsources02 = '1'
      } else if (val == '静脉营养') {
        this.param.nutrientsources04 = '1'
      }
    },
    // 早餐
    'breakfastRadiolist.value': {
      handler: function (list) {
        // 重置
        this.breakfastRadiolist.option.forEach((item) => {
          this.param[item.value] = '0'
          item.disabled = false
        })
        // 如果选择“不吃”，重置其他选项的值，并且禁用其他选项
        // console.log(list)
        // if (list.indexOf('breakfast01') !== -1 && list.length > 1) { // && list.length > 1
        //   this.param['breakfast01'] = '1'
        //   setTimeout(() => {
        //     list.splice(1, list.length - 1)
        //   }, 1000)
        //   this.breakfastRadiolist.value = ['breakfast01']
        //   this.breakfastRadiolist.option[1].disabled = true
        //   this.breakfastRadiolist.option[2].disabled = true
        //   this.breakfastRadiolist.option[3].disabled = true
        // } else {
        //   // 选中项
        //   list.forEach((value) => {
        //     this.param[value] = '1'
        //   })
        // }
        // 选中项
        list.forEach((value) => {
          this.param[value] = '1'
        })
      },
      deep: true
    },
    // 中晚餐食物结构
    'chineseDinnerlist.value': {
      handler: function (list) {
        // 重置
        this.chineseDinnerlist.option.forEach((item) => {
          this.param[item.value] = '0'
        })
        // 选中项
        list.forEach((value) => {
          this.param[value] = '1'
        })
      },
      deep: true
    },
    // 菜的烹调习惯
    'cookingHabits.value': {
      handler: function (list) {
        // 重置
        this.cookingHabits.option.forEach((item) => {
          this.param[item.value] = '0'
        })
        // 选中项
        list.forEach((value) => {
          this.param[value] = '1'
        })
      },
      deep: true
    }
  },
  methods: {
    // 提交
    submit () {
      let param = this.param
      if (!param.dietarysituation) {
        this.$Toast('请选择您的饮食状况')
        return false
      }
      if (!param.mealTimes) {
        this.$Toast('请选择饮食餐次')
        return false
      }
      if (!param.foodStructure01) {
        this.$Toast('请选择中晚餐食物结构')
        return false
      }
      if (!param.cookingHabits01) {
        this.$Toast('请选择菜的烹调习惯')
        return false
      }
      if (!param.nutrientsources01) {
        this.$Toast('请选择您是否有其他营养来源')
        return false
      }
      if (!param.coefficienttype) {
        this.$Toast('请选择目前的活动状态')
        return false
      }
      let url = 'UserInterface/DietGaugeInsert.ashx'
      this.$post(url, this.param).then((data) => {
        if (data.rspcode != 1) {
          this.$Toast(data.rspdesc)
          return
        }
        this.$Toast('提交申请成功')
        // 查看报告
        this.$router.replace('/diet')
      })
    }
  },
  mounted () {
    // 是否重置表单
    const resetstatus = this.$route.query.resetstatus
    if (resetstatus) {
      this.param.resetstatus = resetstatus
    }
  },
  components: {},
  created () {

  }
}
</script>

<style scoped lang="scss">
  .mint-header {
    height: 0.44rem;
    line-height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
  }

  .padding-footer {
    padding-top: 0.44rem;
  }

  .title,
  .title2 {
    margin-top: 0.1rem;
    padding: 5px 10px;
    font-size: 0.145rem;
  }

  .title2 {
    margin-top: 0px;
    font-size: 0.15rem;
    padding: 0 0.1rem;
    min-height: 0.44rem;
    line-height:  0.44rem;
    border-bottom: 1px solid #e5e5e5;
  }

  .section {
    margin-top: 0.1rem;
    background: #FFF;
    font-size: 0.145rem;
    overflow: hidden;
    .ym_text{
      padding:0.1rem 0.1rem 0.1rem 0.2rem;
      min-height: 48px;
      p{
        line-height: 0.44rem;
        color: #666666;
      }
    }
    .text_bt{
      font-style: normal;
      font-size: 0.13rem;
      color: #CB0000;
      padding-left: 0.05rem;
    }
  }

  .fix_bottom {
    padding: 0;

    .theme-button {
      background-color: #0AC5C9;
      border-radius: 0;
      width: 100%;
      line-height: 0.44rem;
      height: 0.44rem;
    }
  }
  .mint-checklist{

    padding: 0.1rem 0;
  }
</style>
<style lang="scss">
  .PG-SGA-root {

    .section{
    .line-input {
      min-width: 72px;
      border: none;
      border-bottom: 1px solid #e5e5e5;
      margin: 0 0.05rem;
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
    .mint-radio-input:checked+.mint-radio-core, .mint-checkbox-input:checked+.mint-checkbox-core {
      background-color: #0AC5C9;
      border-color: #0AC5C9;
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

    .mint-radiolist {

      padding: 0.1rem 0;
    }
    // 多选框
    .mint-radiolist.radio-nowrap {
      .mint-cell {
        /*display: inline-block;*/
      }

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
}
  }
  .lh-ys{
    line-height: 1;
    padding: 0.075rem 0.1rem;
    width: 90%;
    margin: 0 auto;
    background: #f5f5f5;
    font-size: 0.1425rem;
    color: #787878;
    margin-bottom: 10px;
    p{
      display: inline-block;
    }
  }
</style>
