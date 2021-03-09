<template>
  <div class="PG-SGA-root padding-header padding-footer">
    <mt-header title="生活状况" fixed class="borderBottom">
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div class="gaugeLife">
      <div class="gaugelifeList">
        <div class="title2">1、过敏史</div>
        <div class="contData">
          <div class="listTitle">（1）是否有食物过敏 </div>
          <mt-radio :options="diettabooRadiolists.option" v-model="param.check_01"></mt-radio>
          <div class="lh-ys" v-show="param.check_01 === '是'">
            过敏食物:<input type="text" class="line-input" v-model="param.check_02">
          </div>
        </div>
        <div class="contData">
          <div class="listTitle">（2）是否有药物过敏</div>
          <mt-radio :options="diettabooRadiolists.option" v-model="param.check_03"></mt-radio>
          <div class="lh-ys" v-show="param.check_03 === '是'">
            过敏药物:<input type="text" class="line-input" v-model="param.check_04">
          </div>
        </div>
      </div>

      <div class="gaugelifeList">
        <div class="title2">2、饮食</div>
        <div class="contData">
          <div class="listTitle">（1）饮食餐次</div>
          <mt-radio :options="diettabooRadioyscc.option" v-model="param.check_05"></mt-radio>
        </div>
        <div class="contData">
          <div class="listTitle">（2）哪餐最丰富</div>
          <mt-radio :options="diettabooRadioysff.option" v-model="param.check_06"></mt-radio>
        </div>
        <div class="contData">
          <div class="listTitle">（3）早餐<em class="gayYs">（多选）</em></div>
          <mt-checklist :options="diettabooRadiozc.option" v-model="diettabooRadiozc.value"></mt-checklist>
        </div>
        <div class="contData">
          <div class="listTitle">（4）中晚餐食物结构<em class="gayYs">（多选）</em></div>
          <mt-checklist :options="diettabooRadiozwc.option" v-model="diettabooRadiozwc.value"></mt-checklist>
        </div>
        <!-- <div class="contData">
          <div class="listTitle">（5）晚餐食物结构<em class="gayYs">（多选）</em></div>
          <mt-checklist :options="diettabooRadiowsc.option" v-model="diettabooRadiowsc.value"></mt-checklist>
        </div> -->
        <div class="contData">
          <div class="listTitle">（6）菜的烹调习惯<em class="gayYs">（多选）</em></div>
          <mt-checklist :options="diettabooRadioztxg.option" v-model="diettabooRadioztxg.value"></mt-checklist>
        </div>
        <div class="contData">
          <div class="listTitle">（7）饮食习惯<em class="gayYs">（多选）</em></div>
          <mt-checklist :options="diettabooRadioysxg.option" v-model="diettabooRadioysxg.value"></mt-checklist>
        </div>
        <div class="contData">
          <div class="listTitle">
            （8）每天饮水：<input type="tel" class="line-input" v-model="param.check_24">ml/天
          </div>
        </div>
      </div>
      <div class="gaugelifeList">
        <div class="title2">3、运动</div>
        <div class="contData">
          <div class="listTitle">（1）户外活动时间</div>
          <mt-radio :options="diettabooRadioyw.option" v-model="param.check_25"></mt-radio>
          <div class="lh-ys" v-show="param.check_25 === '有'">
            <p>大约 <input type="tel" class="line-input-x" v-model="param.check_26">小时/天,</p>
            <p>或<input type="tel" class="line-input-x" v-model="param.check_27">次/周,</p>
            <p>或<input type="tel" class="line-input-x" v-model="param.check_28">小时/周 </p></div>
        </div>
        <div class="contData">
          <div class="listTitle">（2）坚持体育锻炼</div>
          <mt-radio :options="diettabooRadioyw.option" v-model="param.check_29"></mt-radio>
          <div class="lh-ys" v-show="param.check_29 === '有'">
            <p>大约 <input type="tel" class="line-input-x" v-model="param.check_30">小时/天,</p>
            <p>或<input type="tel" class="line-input-x" v-model="param.check_31">次/周,</p>
            <p>或<input type="tel" class="line-input-x" v-model="param.check_32">小时/周 </p></div>
        </div>
        <div class="contData">
          <div class="listTitle">（3）体育锻炼类型</div>

          <div class="listTitle">a、有氧运动</div>
          <mt-radio :options="diettabooRadioyyyd.option" v-model="param.check_33"></mt-radio>
          <div class="lh-ys">
            <p>大约 <input type="tel" class="line-input-x" v-model="param.check_34">小时/天,</p>
            <p>或<input type="tel" class="line-input-x" v-model="param.check_35">次/周,</p>
            <p>或<input type="tel" class="line-input-x" v-model="param.check_36">小时/周 </p></div>

        <div class="listTitle">b、无氧运动<em class="gayYs">（指肌肉锻炼） </em></div>
        <mt-radio :options="diettabooRadioyw.option" v-model="param.check_37"></mt-radio>
        <div class="lh-ys" v-show="param.check_37 === '有'">
          <p>大约 <input type="tel" class="line-input-x" v-model="param.check_38">小时/天,</p>
          <p>或<input type="tel" class="line-input-x" v-model="param.check_39">次/周,</p>
          <p>或<input type="tel" class="line-input-x" v-model="param.check_40">小时/周 </p></div>
      </div>
        <div class="contData">
          <div class="listTitle">（4）其它运动爱好</div>
          <mt-radio :options="diettabooRadioydah.option" v-model="param.check_41"></mt-radio>
        </div>
      </div>

      <div class="gaugelifeList">
        <div class="title2">4、生活习惯</div>
        <div class="contData">
          <div class="listTitle">（1）每天使用手机</div>
          <mt-radio :options="diettabooRadiosj.option" v-model="param.check_42"></mt-radio>
        </div>
        <div class="contData">
          <div class="listTitle">（2）陪伴人员</div>
          <mt-radio :options="diettabooRadiopbry.option" v-model="param.check_43"></mt-radio>
          <div class="lh-ys" v-show="param.check_43 === '其他'">
            其他:  <input type="tel" class="line-input" v-model="param.check_44">
          </div>
        </div>
        <div class="contData">
          <div class="listTitle">（3）每天工作时间多长</div>
          <mt-radio :options="diettabooRadiogzsj.option" v-model="param.check_45"></mt-radio>
        </div>
        <div class="contData">
          <div class="listTitle">（4）经常午休</div>
          <mt-radio :options="diettabooRadiowxsj.option" v-model="param.check_46"></mt-radio>
        </div>
        <div class="contData">
          <div class="listTitle">（5）晚上入睡时间</div>
          <mt-radio :options="diettabooRadiorssj.option" v-model="param.check_47"></mt-radio>
          <div class="lh-ys">
            睡眠时间大约：<input type="tel" class="line-input" v-model="param.check_48">小时
          </div>
        </div>
        <div class="contData">
          <div class="listTitle">（6）吸烟</div>
          <mt-radio :options="diettabooRadioxy.option" v-model="param.check_48"></mt-radio>
          <div class="lh-ys" v-if="param.check_48 === '吸过已断'">
            吸过已断:<input type="tel" class="line-input" v-model="param.check_49">年
          </div>
        </div>
        <div class="contData">
          <div class="listTitle">（7）饮酒</div>
          <mt-radio :options="diettabooRadioyj.option" v-model="param.check_50"></mt-radio>
          <div class="lh-ys" v-if="param.check_50 === '红酒'">
            红酒:  <input type="tel" class="line-input" v-model="param.check_51">ml/天 </div>
          <div class="lh-ys" v-if="param.check_50 === '白酒'">
            白酒:  <input type="tel" class="line-input" v-model="param.check_52"> 两/天</div>
          <div class="lh-ys" v-if="param.check_50 === '啤酒'">
            啤酒:  <input type="tel" class="line-input" v-model="param.check_53"> 两/天</div>
        </div>
      </div>

      <!-- <div class="gaugelifeList" style="padding-bottom: 0.25rem">
        <div class="title2">5、心理</div>
        <div class="contData">
          <div class="listTitle">（1）工作压力</div>
          <mt-radio :options="diettabooRadioyw.option" v-model="param.check_61"></mt-radio>
          <div class="lh-ys">
            <mt-radio :options="diettabooRadiodx.option" v-model="param.check_62"></mt-radio>
          </div>
        </div>
        <div class="contData">
          <div class="listTitle">（2）家庭压力</div>
          <mt-radio :options="diettabooRadioyw.option" v-model="param.check_63"></mt-radio>
          <div class="lh-ys">
            <mt-radio :options="diettabooRadiodx.option" v-model="param.check_64"></mt-radio>
          </div>
        </div>
        <div class="contData">
          <div class="listTitle">（3）社交压力</div>
          <mt-radio :options="diettabooRadioyw.option" v-model="param.check_65"></mt-radio>
          <div  class="lh-ys">
            <mt-radio :options="diettabooRadiodx.option" v-model="param.check_66"></mt-radio>
          </div>
        </div>
      </div> -->
      <div class="fix_bottom">
        <mt-button type="primary" class="theme-button button-radio" size="large" @click.native="submit">保存</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gauge_life',
  data: () => ({
    diettabooRadiolists: {
      option: ['是', '否'],
      value: '',
      radiolist: true
    },
    diettabooRadioyscc: {
      option: ['一日三餐', '一日二餐', '一日一餐'],
      value: '',
      radiolist: true
    },
    diettabooRadioysff: {
      option: ['早', '中', '晚'],
      value: '',
      radiolist: true
    },
    diettabooRadioyyyd: {
      option: ['走路', '跑步', '游泳', '爬山', '其它'],
      value: '',
      radiolist: true
    },
    diettabooRadioydah: {
      option: ['经常唱歌', '经常跳舞', '经常打各种球', '其它'],
      value: '',
      radiolist: true
    },
    diettabooRadiosj: {
      option: ['无', '小于3小时', '3～5小时', '大于5小时'],
      value: '',
      radiolist: true
    },
    diettabooRadiopbry: {
      option: ['无', '配偶', '子女', '父母', '保姆', '医务护士', '其他'],
      value: '',
      radiolist: true
    },
    diettabooRadiogzsj: {
      option: ['6小时内', '6-8小时', '8-10小时', '大于10小时'],
      value: '',
      radiolist: true
    },
    diettabooRadiowxsj: {
      option: ['0.5小时', '1小时', '1.5小时', '2小时', '2小时以上', '无'],
      value: '',
      radiolist: true
    },
    diettabooRadiorssj: {
      option: ['9点前', '9-11点', '11-凌晨1点', '凌晨1点-凌晨2点', '凌晨2点以后'],
      value: '',
      radiolist: true
    },
    diettabooRadioxy: {
      option: ['从不', '吸过已断', '半包/天', '1包/天', '2包/天', '2包/天以上'],
      value: '',
      radiolist: true
    },
    diettabooRadioyj: {
      option: ['从不', '红酒', '白酒', '啤酒'],
      value: '',
      radiolist: true
    },
    diettabooRadioyw: {
      option: ['有', '无'],
      value: '',
      radiolist: true
    },
    diettabooRadiodx: {
      option: ['大', '中', '小'],
      value: '',
      radiolist: true
    },
    diettabooRadiozc: {
      option: [
        {label: '不吃', value: 'check_07'},
        // {label: '经常不吃 ', value: '50'},
        {label: '米面为主 ', value: 'check_08'},
        {label: '鸡蛋牛奶谷粉', value: 'check_09'},
        {label: '有水果疏菜', value: 'check_10'}
      ],
      value: [],
      checklist: true
    },
    diettabooRadiozwc: {
      option: [
        {label: '米面为主+素菜', value: 'check_11'},
        {label: '米面为主+荤素 ', value: 'check_12'},
        {label: '素食为主+米面', value: 'check_13'},
        {label: '荤素为主+米面', value: 'check_14'},
        {label: '米汤或汤', value: 'check_15'},
        {label: '水果', value: 'check_16'}
      ],
      value: [],
      checklist: true
    },
    // diettabooRadiowsc: {
    //   option: [
    //     {label: '米面为主+素菜', value: '53'},
    //     {label: '米面为主+荤素 ', value: '54'},
    //     {label: '素食为主+米面', value: '55'},
    //     {label: '荤素为主+米面', value: '56'},
    //     {label: '米汤', value: '57'},
    //     {label: '菜汤', value: '58'},
    //     {label: '肉汤', value: '59'},
    //     {label: '水果', value: '60'},
    //   ],
    //   value: [],
    //   checklist: true
    // },
    diettabooRadioztxg: {
      option: [
        {label: '蒸', value: 'check_17'},
        {label: '煮', value: 'check_18'},
        {label: '炒', value: 'check_19'},
        {label: '煎', value: 'check_20'},
        {label: '经常吃烧烤', value: 'check_21'}
      ],
      value: [],
      checklist: true
    },
    diettabooRadioysxg: {
      option: [
        {label: '居家饮食为主', value: 'check_22'},
        {label: '外卖及外出就餐为主 ', value: 'check_23'}
        // {label: '喜爱甜食', value: '73'},
        // {label: '喜爱碱味', value: '74'},
      ],
      value: [],
      checklist: true
    },
    param: {
      skey: ''
    }
  }),
  watch: {
    // 监听所有的多选框
    // 早餐
    'diettabooRadiozc.value': {
      handler: function (list) {
        // 重置
        this.diettabooRadiozc.option.forEach((item) => {
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
    'diettabooRadioztxg.value': {
      handler: function (list) {
        // 重置
        this.diettabooRadioztxg.option.forEach((item) => {
          this.param[item.value] = '0'
        })
        // 选中项
        list.forEach((value) => {
          this.param[value] = '1'
        })
      },
      deep: true
    },
    // 中晚餐食物结构
    'diettabooRadiozwc.value': {
      handler: function (list) {
        // 重置
        this.diettabooRadiozwc.option.forEach((item) => {
          this.param[item.value] = '0'
        })
        // 选中项
        list.forEach((value) => {
          this.param[value] = '1'
        })
      },
      deep: true
    },
    // 饮食习惯
    'diettabooRadioysxg.value': {
      handler: function (list) {
        // 重置
        this.diettabooRadioysxg.option.forEach((item) => {
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
    getSkey () {
      let url = 'UserInterface/GenerateItmekey.ashx'
      this.$post(url).then((data) => {
        if (data.rspcode != 1) {
          return
        }
        this.param.skey = data.itmekey
      })
    },
    // 提交
    submit () {
      let url = 'UserInterface/PatientLifeSurveyInsert.ashx'
      this.$post(url, this.param).then((data) => {
        if (data.rspcode != 1) {
          this.$Toast(data.rspdesc)
          return
        }
        this.$Toast('保存成功')
        // 查看报告
        // this.$router.push("/nutrition");
      })
    }
  },
  mounted () {
    this.getSkey()
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
.gaugelifeList{
  background-color: #FFFFFF;
  margin-top: 0.1rem;
  .title2 {
    font-size: 0.15rem;
    padding: 0 0.1rem;
    min-height: 0.44rem;
    line-height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .lh-ys{
    line-height: 1;
    padding: 0.075rem 0.1rem;
    width: 90%;
    margin: 0 auto;
    background: #f5f5f5;
    font-size: 0.1425rem;
    color: #787878;
    p{
      display: inline-block;
    }
  }
  .line-input-x {
    width:35px;
    border: none;
    border-bottom: 1px solid #cccccc;
    text-align: center;
  }
  .contData {
    margin-left: 0.12rem;
    border-bottom: 1px dashed #e5e5e5;
    color:#565656;
    padding: 0.1rem 0;
    font-size: 0.145rem;
    .listTitle {
      padding: 0.1rem 0.1rem;
      line-height: 1.7;
    }
    em.gayYs{
      font-style: normal;
      font-size: 0.135rem;
      color: #787878;
      padding: 0 0.02rem;
    }
  }

  .contData:last-child {
    border-bottom: 0;
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
</style>
<style lang="scss">
  .PG-SGA-root {
    .gaugeLife {
      padding-bottom: 0.1rem;
      .line-input {
       min-width:70px;
        max-width:100px;
        border: none;
        border-bottom: 1px solid #cccccc;
        text-align: center;
      }
      .lh-ys  a.mint-cell {
        background: #f5f5f5;
        display: inline-block;
        width: 32%;
        min-height: 20px;
      }
      .lh-ys  a.mint-cell .mint-cell-wrapper{
        background: #f5f5f5;
      }
      a.mint-cell .mint-cell-text {
        font-size: 14px;
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
        font-size: 14px;
        color: inherit;
        text-indent: 5px;
        border: 1px solid #EEEEEE;
      }

      .mint-cell-value select {
        border: 1px solid #EEEEEE;
        height: 33px;
      }

      .contData .mint-checkbox-core{
            border-radius: 20%;
            width: 18px;
            height: 18px;
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
      }
      .mint-radio-input:checked+.mint-radio-core, .mint-checkbox-input:checked+.mint-checkbox-core {
        background-color: #0AC5C9;
        border-color: #0AC5C9;
      }
      .mint-radiolist .mint-radiolist-title,
      .mint-checklist-title {
        margin: 0;
      }
    }
  }
</style>
