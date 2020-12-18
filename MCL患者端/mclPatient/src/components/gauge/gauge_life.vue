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
          <div class="listTitle">a.是否有食物过敏？ <input type="text" class="line-input" v-model="param.check_02"></div>
          <mt-radio :options="diettabooRadiolists.option" v-model="param.check_01"></mt-radio>
        </div>
        <div class="contData">
          <div class="listTitle">b.是否有药物过敏？  <input type="text" class="line-input" v-model="param.check_04"></div>
          <mt-radio :options="diettabooRadiolists.option" v-model="param.check_03"></mt-radio>
        </div>
      </div>
      <div class="gaugelifeList">
        <div class="title2">2、吸烟</div>
        <div class="contData">
          <div class="listTitle">a、您是否吸烟？</div>
          <mt-radio :options="diettabooRadiolists.option" v-model="param.check_05"></mt-radio>
        </div>
        <div class="contData">
          <div class="listTitle">b.在您的一生中，累积吸烟是否超过5包<em class="gayYs">（20支/包）</em>？</div>
          <mt-radio :options="diettabooRadiolists.option" v-model="param.check_06"></mt-radio>
        </div>
        <div class="contData">
          <div class="listTitle">
            c.平均每周<em class="gayYs">（7天）</em>吸烟<input type="tel" class="line-input" v-model="param.check_07">包，
            持续<input type="tel" class="line-input" v-model="param.check_08">年
          </div>
        </div>
        <div class="contData">
          <div class="listTitle">d.目前为：</div>
          <mt-radio :options="diettabooRadio.option" v-model="param.check_09"></mt-radio>
        </div>
      </div>
      <div class="gaugelifeList">
        <div class="title2">3、喝酒</div>
        <div class="contData">
          <div class="listTitle">a.您是否喝酒</div>
          <mt-radio :options="diettabooRadiolists.option" v-model="param.check_10"></mt-radio>
        </div>
        <div class="contData">
          <div class="listTitle">b.过去一年是否规律饮酒</div>
          <mt-radio :options="diettabooRadiolists.option" v-model="param.check_11"></mt-radio>
        </div>
        <div class="contData">
          <div class="listTitle">
            c.平均每周<em class="gayYs">（7天）</em>饮酒<input type="tel" class="line-input" v-model="param.check_12">次,
            <input type="tel" class="line-input" v-model="param.check_14">瓶<em class="gayYs">(两)</em>/周
          </div>
        </div>
        <div class="contData">
          <div class="listTitle">d.常饮酒为：</div>
          <mt-radio :options="diettabooRadiodd.option" v-model="param.check_13"></mt-radio>
        </div>
      </div>
      <div class="gaugelifeList">
        <div class="title2">4、喝茶</div>
        <div class="contData">
          <div class="listTitle">a.在您过去的一年中是否经常喝茶叶茶</div>
          <mt-radio :options="diettabooRadiolists.option" v-model="param.check_15"></mt-radio>
        </div>
        <div class="contData">
          <div class="listTitle">
            b.平均每周<em class="gayYs">（7天）</em>泡茶<input type="tel" class="line-input" v-model="param.check_16">次<em class="gayYs">（换一次茶叶算一次）</em>
          </div>
        </div>
        <div class="contData">
          <div class="listTitle">c.常喝茶为：</div>
          <mt-checklist :options="diettabooRadioss.option" v-model="diettabooRadioss.value"></mt-checklist>
        </div>
      </div>
      <div class="gaugelifeList">
        <div class="title2">5、饮食习惯</div>
        <div class="contData">
          <div class="listTitle">a.您的饮食习惯</div>
          <mt-checklist :options="diettabooRadiodyy.option" v-model="diettabooRadiodyy.value"></mt-checklist>
        </div>
        <div class="contData">
          <div class="listTitle">
            b.最爱吃的食物<input type="text" class="line-input" v-model="param.check_22">，按照之前能吃的最大量，
            现在能吃<input type="tel" class="line-input" v-model="param.check_23">两.
          </div>
        </div>
      </div>
      <div class="gaugelifeList">
        <div class="title2">6、饮水情况</div>
        <div class="contData">
          <div class="listTitle">
           a.您每天饮水量 <input type="tel" class="line-input" v-model="param.check_24">ml
          </div>
        </div>
      </div>
      <div class="gaugelifeList">
        <div class="title2">7、运动情况</div>
        <div class="contData">
          <div class="listTitle">a.您的运动情况</div>
          <mt-radio :options="diettabooRadioyd.option" v-model="param.check_25"></mt-radio>
          <!-- <div class="title2">长距离行走对您来说有困难吗？</div>
          <mt-radio :options="diettabooRadioy1.option" v-model="param.check_26"></mt-radio>
          <div class="title2">户外短距离行走对您来说有困难吗？</div>
          <mt-radio :options="diettabooRadioy1.option" v-model="param.check_27"></mt-radio>
          <div class="title2">您白天需要呆在床上或椅子上吗？</div>
          <mt-radio :options="diettabooRadioy1.option" v-model="param.check_28"></mt-radio> --></div>
        <div class="contData">
          <div class="listTitle">b.运动类别</div>
          <mt-radio :options="diettabooRadiolb.option" v-model="param.check_26"></mt-radio>
          <div class="listTitle"> 其他：<input type="text" class="line-input" v-model="param.check_27"></div>
        </div>
      </div>
      <div class="gaugelifeList">
        <div class="title2">8、宗教信仰</div>
        <div class="contData">
          <div class="listTitle">a.宗教信仰<input type="text" class="line-input" v-model="param.check_29"></div>
          <mt-radio :options="diettabooRadioyw.option" v-model="param.check_28"></mt-radio>
        </div>
        <div class="contData">
          <div class="listTitle">
            b.其他爱好：<input type="text" class="line-input" v-model="param.check_30">
          </div>
        </div>
      </div>
      <div class="gaugelifeList">
        <div class="title2">9、使用手机</div>
        <div class="contData">
          <div class="listTitle">a.您使用手机情况</div>
          <mt-radio :options="diettabooRadioysy.option" v-model="param.check_31"></mt-radio>
        </div>
        <div class="contData">
          <div class="listTitle">b.微信使用时间</div>
          <mt-radio :options="diettabooRadioysy.option" v-model="param.check_32"></mt-radio>
        </div>
      </div>
      <div class="gaugelifeList">
        <div class="title2">10、陪伴人员</div>
        <div class="contData">
          <div class="listTitle">a.陪伴人员<input type="text" class="line-input" v-model="param.check_34"></div>
          <mt-radio :options="diettabooRadiopb.option" v-model="param.check_33"></mt-radio>
        </div>
        <div class="contData">
          <div class="listTitle">b.陪伴时间</div>
          <mt-radio :options="diettabooRadiops.option" v-model="param.check_35"></mt-radio>
        </div>
      </div>
      <div class="gaugelifeList">
        <div class="title2">11、睡眠时间</div>
        <div class="contData">
          <mt-radio :options="diettabooRadiosmt.option" v-model="param.check_36"></mt-radio>
        </div>
      </div>
      <div class="gaugelifeList">
        <div class="title2">12、现在的身体状况或治疗是否影响您的家庭生活？</div>
        <div class="contData">
          <mt-radio :options="diettabooRadiostzk.option" v-model="param.check_37"></mt-radio>
        </div>
      </div>
      <div class="gaugelifeList">
        <div class="title2">13、现在的身体状况或治疗使您陷入经济困难吗？</div>
        <div class="contData">
          <mt-radio :options="diettabooRadiostzk.option" v-model="param.check_38"></mt-radio>
        </div>
      </div>
      <div class="gaugelifeList">
        <div class="title2">14、如何评价在过去一星期内您总的健康情况？</div>
        <div class="contData">
          <mt-radio :options="diettabooRadiorpj.option" v-model="param.check_39"></mt-radio>
        </div>
      </div>
      <div class="gaugelifeList">
        <div class="title2">15、如何评价在过去一星期内您总的生命质量？</div>
        <div class="contData">
          <mt-radio :options="diettabooRadiorpj.option" v-model="param.check_40"></mt-radio>
        </div>
      </div>
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
      diettabooRadio: {
        option: ['吸烟者', '戒烟者', '戒烟成功者', '不吸烟者'],
        value: '',
        radiolist: true
      },
      diettabooRadiodd: {
        option: ['白酒', '蒸酒', '啤酒', '米酒', '果酒'],
        value: '',
        radiolist: true
      },

      diettabooRadioyd: {
        option: ['几乎不运动', '偶尔运动', '经常运动', '每天运动'],
        value: '',
        radiolist: true
      },
      diettabooRadioy1: {
        option: ['没有（1分）', '有点（2分）', '相当（3分）', '非常（4分）'],
        value: '',
        radiolist: true
      },
      diettabooRadiolb: {
        option: ['散步', '跑步', '球类运动', '体操/舞蹈', '家务', '农活'],
        value: '',
        radiolist: true
      },
      diettabooRadioyw: {
        option: ['有', '无'],
        value: '',
        radiolist: true
      },
      diettabooRadioysy: {
        option: ['无', '小于3小时', '3~5小时', '大于5小时'],
        value: '',
        radiolist: true
      },
      diettabooRadiopb: {
        option: ['无', '配偶', '子女', '父母', '保姆', '医务人士'],
        value: '',
        radiolist: true
      },
      diettabooRadiops: {
        option: ['每天', '一周5，6次', '一周3，4次', '一周少于3次'],
        value: '',
        radiolist: true
      },
      diettabooRadiosmt: {
        option: ['小于7小时', '7-8小时', '大于8小时'],
        value: '',
        radiolist: true
      },
      diettabooRadiostzk: {
        option: ['没有（1分）', '有点（2分）', '相当（3分）', '非常（4分）'],
        value: '',
        radiolist: true
      },
      diettabooRadiorpj: {
        option: ['非常差（1分）', '一般差（2分）', '差（3分）', '正常（4分）', '好（5分）', '一般好（6分）', '非常好（7分）'],
        value: '',
        radiolist: true
      },
      diettabooRadiodyy: {
        option: [
          {label: '荤素均衡', value: '21'},
          {label: '荤食为主', value: '41'},
          {label: '嗜盐', value: '42'},
          {label: '嗜油', value: '43'},
          {label: '嗜糖', value: '44'}
        ],
        value: [],
        checklist: true
      },
      diettabooRadioss: {
        option: [
          {label: '绿茶', value: '17'},
          {label: '红茶', value: '18'},
          {label: '普洱茶', value: '19'},
          {label: '其他', value: '20'}
        ],
        value: [],
        checklist: true
      },
      param: {
        skey: '',
        check_01: '',
        check_02: '',
        check_03: '',
        check_04: '',
        check_05: '',
        check_06: '',
        check_07: '',
        check_08: '',
        check_09: '',
        check_10: '',
        check_11: '',
        check_12: '',
        check_13: '',
        check_14: '',
        check_15: '',
        check_16: '',
        check_22: '',
        check_23: '',
        check_24: '',
        check_25: '',
        check_26: '',
        check_27: '',
        check_28: '',
        check_29: '',
        check_30: '',
        check_31: '',
        check_32: '',
        check_33: '',
        check_34: '',
        check_35: '',
        check_36: '',
        check_37: '',
        check_38: '',
        check_39: '',
        check_40: ''
      }
    }),
    watch: {
      //
      'diettabooRadioss.value': {
        handler: function (list) {
          // 重置
          this.diettabooRadioss.option.forEach((item) => {
            this.param[`check_${item.value}`] = '0'
          })
          // 选中项
          list.forEach((item) => {
            this.param[`check_${item}`] = '1'
          })
        },
        deep: true
      },
      'diettabooRadiodyy.value': {
        handler: function (list) {
          // 重置
          this.diettabooRadiodyy.option.forEach((item) => {
            this.param[`check_${item.value}`] = '0'
          })
          // 选中项
          list.forEach((item) => {
            this.param[`check_${item}`] = '1'
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
