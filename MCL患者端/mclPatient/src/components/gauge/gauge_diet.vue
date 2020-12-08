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
        <div class="title2">1、您目前是否可以进食？</div>
        <mt-radio :options="eatingflagRadiolist.option" v-model="param.eatingflag" class="radio-nowrap"></mt-radio>
      </div>
      <div class="section">
        <div class="title2">2、您的饮食状况：</div>
        <mt-radio :options="dietarysituationRadiolist.option" v-model="param.dietarysituation"></mt-radio>
      </div>
      <div class="section">
        <div class="title2">3、您是否有其他营养来源？</div>
        <mt-radio :options="nutrientsourcesRadiolist.option" v-model="nutrientsourcesRadiolist.value"
                  class=""></mt-radio>
        <div class="title2" style="line-height: 48px;padding-left: 20px;" v-show="this.nutrientsourcesRadiolist.show1">
          口服营养制剂 <input type="text" class="line-input" placeholder="" v-model="param.nutrientsources03"> Kcal
        </div>
        <div class="title2" style="line-height: 48px;padding-left: 20px;" v-show="this.nutrientsourcesRadiolist.show2">
          静脉营养 <input type="text" class="line-input" placeholder="" v-model="param.nutrientsources05">
        </div>
      </div>
      <!-- <mt-field label="口服营养制剂" placeholder="剂量" class="" v-model="param.nutrientsources03" ></mt-field>
      <mt-field label="静脉营养" placeholder="剂量" class="" v-model="param.nutrientsources05" v-show="this.nutrientsourcesRadiolist.show2"></mt-field> -->

      <div class="section">
        <div class="title2">4、目前的活动状态</div>
        <mt-radio :options="coefficienttypeRadioList.option" v-model="param.coefficienttype"
                  class="radio-nowrap"></mt-radio>
      </div>
      <div class="section">
        <div class="title2">5、饮食习惯</div>
        <mt-checklist :options="eatinghabitsRadiolist.option" v-model="eatinghabitsRadiolist.value"></mt-checklist>
      </div>
      <!-- <div class="title2">6.食物喜好</div>
      <div class="title2" style="line-height: 1.5;">
        最爱吃的食物 <input type="tel" class="line-input" v-model="param.foodpre01">, 按照之前能吃的最大量，现在能吃<input type="tel" class="line-input" v-model="param.foodpre02">两。
      </div>
      <div class="title2 margin10" style="line-height: 1.5;">
        最近最爱吃的食物 <input type="tel" class="line-input" v-model="param.foodpre03">, 按照最近能吃的最大量，现在能吃<input type="tel" class="line-input" v-model="param.foodpre04">两。
      </div> -->
      <div class="section">
        <div class="title2">6、食物喜好</div>
        <div class="ym_text">
          <p> 最爱吃的食物 <input type="text" class="line-input" v-model="param.foodpre01">,</p>
          <p>现在能吃<input type="tel" class="line-input" v-model="param.foodpre02">两。</p>
        </div>
      </div>
      <!--<div class="title2">5.体格检查</div>
      <mt-field label="身高" placeholder="请输入身高" type="tel" v-model="param.height">
        <span style="margin-left: 5px;">cm</span>
      </mt-field>
      <mt-field label="目前体重" placeholder="请输入体重" type="tel" v-model="param.weight">
        <span style="margin-left: 5px;">kg</span>
      </mt-field>
      <mt-field label="理想体重" placeholder="理想体重" :value="idealweight" :disabled="true">
        <span style="margin-left: 5px;">kg</span>
      </mt-field>
      <div class="title2">6.摄入量</div>
      <mt-field label="实际摄入量" placeholder="请输入摄入量" type="tel"  v-model="param.actualintake">
        <span style="margin-left: 5px;">kcal</span>
      </mt-field>
      <mt-field label="推荐摄入量" placeholder="推荐摄入量" type="tel"  :value="recommendedintake" :disabled="true">
        <span style="margin-left: 5px;">kcal</span>
      </mt-field>
      <mt-field label="能量差额" placeholder="能量差额" :value="energybalance" :disabled="true">
        <span style="margin-left: 5px;">kcal</span>
      </mt-field>
      <div class="title2">7.能量分配</div>
      <mt-radio :options="energyallocationRadiolist.option" v-model="param.energyallocation"></mt-radio>
      <div class="title2">8.饮食能量占比</div>
      <mt-radio :options="energyratioRadiolist.option" v-model="param.energyratio" class="radio-nowrap"></mt-radio>
      <div class="title2">9.营养实际量</div>
      <mt-field label="蛋白质" placeholder="蛋白质" :value="protein" :disabled="true">
        <span style="margin-left: 5px;">g</span>
      </mt-field>
      <mt-field label="脂肪" placeholder="脂肪" :value="fat" :disabled="true">
        <span style="margin-left: 5px;">g</span>
      </mt-field>
      <mt-field label="碳水化合物" placeholder="碳水化合物" :value="carbohydrate" :disabled="true">
        <span style="margin-left: 5px;">g</span>
      </mt-field>

      <div class="title2">12.饮食禁忌</div>
      <mt-checklist :options="diettabooRadiolist.option" v-model="diettabooRadiolist.value"></mt-checklist>
      <div class="title2">13.饮食形式</div>
      <mt-radio :options="dietformRadiolist.option" v-model="param.dietform"></mt-radio>-->
      <div class="fix_bottom fix_bottom_area">
        <mt-button type="primary" class="theme-button button-radio" size="large" @click.native="submit">保存</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'friend',
    data: () => ({
      //接口参数
      param: {
        coefficienttype: '',  //目前活动状态
        eatingflag: '',  //进食情况（1：是，2：否）
        dietarysituation: '',  //饮食情况
        nutrientsources01: '0',  // 营养来源（选择为1，没选择为0）
        nutrientsources02: '0',  // 营养来源（选择为1，没选择为0）
        nutrientsources03: '',  // 营养来源
        nutrientsources04: '0',  // 营养来源（选择为1，没选择为0）
        nutrientsources05: '',  // 营养来源

//				height: "",  // 身高
//				weight: "",  // 体重
//				idealweight: "",  // 理想体重
//				actualintake: "",  // 实际摄入量
//				recommendedintake: "",  // 推荐摄入量
//				energybalance: "",  // 能量差额
//				energyallocation: "",  // 能量分配（传比例：2:4:4）
//				energyratio: "",  // 能量占比
//				protein: "",  // 蛋白质
//				fat: "",  // 脂肪
//				carbohydrate: "",  // 碳水

        // eatinghabits: "",  // 饮食习惯

        foodpre01: '',  // 饮食喜好
        foodpre02: '',  // 饮食喜好
        // foodpre03: "",  // 饮食喜好
        // foodpre04: "",  // 饮食喜好

//				diettaboo01: "0", //饮食禁忌（选择为1，没选择为0）
//				diettaboo02: "0", //饮食禁忌（选择为1，没选择为0）
//				diettaboo03: "0", //饮食禁忌（选择为1，没选择为0）
//				diettaboo04: "0", //饮食禁忌（选择为1，没选择为0）
//				diettaboo05: "0", //饮食禁忌（选择为1，没选择为0）
//				diettaboo06: "0", //饮食禁忌（选择为1，没选择为0）
//				diettaboo07: "0", //饮食禁忌（选择为1，没选择为0）
//				diettaboo08: "0", //饮食禁忌（选择为1，没选择为0）
//
//				dietform: "", //饮食形式
        resetstatus: '', //重置状态 （传1就行）

      },

      //目前活动状态
      coefficienttypeRadioList: {
        option: ['完全卧床', '部分受限', '自主活动', '完全日常'],
//				value: "",
        radiolist: true
      },
      //进食情况
      eatingflagRadiolist: {
        option: [{label: '是', value: '1'}, {label: '否', value: '2'}],
//				value: "",
        radiolist: true
      },
      //饮食情况
      dietarysituationRadiolist: {
        option: ['正常饮食', '正常饮食，但比正常情况少', '少量固体食物', '只能进食流食', '只能口服营养制剂', '几乎吃不下什么', '只能通过管饲进食或静脉营养'],
//				value: "",
        radiolist: true
      },
      //营养来源
      nutrientsourcesRadiolist: {
        option: ['无', '口服营养制剂', '静脉营养'],
        value: '',
        radiolist: true,
        show1: false,
        show2: false,
      },

      //能量分配
//			energyallocationRadiolist: {
//				option: [{label: '蛋白质：脂肪：碳水化合物=2:4:4', value: "2:4:4"}, {label: '蛋白质：脂肪：碳水化合物=2:3:5', value: "2:3:5"}, {label: '蛋白质：脂肪：碳水化合物=2:2:6', value: "2:2:6"}],
////				value: "",
//				radiolist: true
//			},
//			//饮食能量占比
//			energyratioRadiolist: {
//				option: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
////				value: "",
//				radiolist: true
//			},
//			//饮食禁忌  多选框
//			diettabooRadiolist: {
//				option: [{label: '完全性肠梗阻', value: "01"}, {label: '严重消化道麻痹', value: "02"}, {label: '高流量小肠瘘', value: "03"}, {label: '休克', value: "04"}, {label: '可能增加机会性感染', value: "05"}, {label: '严重呕吐或者腹泻', value: "06"}, {label: '临终患者', value: "07"}, {label: '无', value: "08"}],
//				value: [],
//				checklist: true
//			},
//			//饮食形式
//			dietformRadiolist: {
//				option: [{label: '普食', value: "01"}, {label: '软食', value: "02"},{label: '半流食', value: "03"},{label: '流食', value: "04"},{label: '禁食', value: "05"}],
////				value: "",
//				radiolist: true
//			},

      //饮食习惯
      eatinghabitsRadiolist: {
        // option: ['荤素均衡', '荤食为主', '素食为主', '嗜盐', '嗜油', '嗜糖'],
        option: [{label: '荤素均衡', value: '01'}, {label: '荤食为主', value: '02'}, {label: '素食为主', value: '03'}, {
          label: '嗜盐',
          value: '04'
        }, {label: '嗜油', value: '05'}, {label: '嗜糖', value: '06'}],
        value: [],
        checklist: true
      },
    }),
    watch: {
      //营养来源
      'nutrientsourcesRadiolist.value': function (val) {
        this.nutrientsourcesRadiolist.show1 = false
        this.param.nutrientsources03 = ''
        this.nutrientsourcesRadiolist.show2 = false
        this.param.nutrientsources05 = ''
        //选择为1，没选择为0
        this.param.nutrientsources01 = '0'
        this.param.nutrientsources02 = '0'
        this.param.nutrientsources04 = '0'
        if (val == '无') {
          this.param.nutrientsources01 = '1'
        } else if (val == '口服营养制剂') {
          this.nutrientsourcesRadiolist.show1 = true
          this.param.nutrientsources02 = '1'
        } else if (val == '静脉营养') {
          this.nutrientsourcesRadiolist.show2 = true
          this.param.nutrientsources04 = '1'
        }
      },
      //饮食禁忌
//			'diettabooRadiolist.value': {
//				handler: function(list) {
//					//重置
//					this.diettabooRadiolist.option.forEach((item)=>{
//						this.param[`diettaboo${item.value}`] = "0";
//					})
//					//选中项
//					list.forEach((item)=>{
//						this.param[`diettaboo${item}`] = "1";
//					})
//				},
//				deep: true
//			},
      //饮食习惯
      'eatinghabitsRadiolist.value': {
        handler: function (list) {
          //重置
          this.eatinghabitsRadiolist.option.forEach((item) => {
            this.param[`eatinghabits${item.value}`] = '0'
          })
          //选中项
          list.forEach((item) => {
            this.param[`eatinghabits${item}`] = '1'
          })
        },
        deep: true
      },
    },
    computed: {
      //理想体重
//			idealweight(){
//				const {height}  = this.param;  //体重
//				if(height < 105){
//					return
//				}
//				const idealweight = height-105;  //身高（CM）-105
//				this.param.idealweight = idealweight
//				return idealweight;
//			},
//			//推荐摄入量
//			recommendedintake(){
//				const {coefficienttype, idealweight}  = this.param;  //目前的活动状态, 理想体重
//				let value = "";
//				if(coefficienttype == "" || idealweight == ""){
//					return
//				}
//				if(coefficienttype == "完全卧床"){
//					value = 20;
//				}else if(coefficienttype == "部分受限"){
//					value = 25;
//				}else if(coefficienttype == "自主活动"){
//					value = 30;
//				}else if(coefficienttype == "完全日常"){
//					value = 30;
//				}
//				const recommendedintake = idealweight*value;  //理想体重*目前的活动状态
//				this.param.recommendedintake = recommendedintake;
//				return recommendedintake;
//			},
//			//能量差额
//			energybalance(){
//				const {actualintake, recommendedintake}  = this.param;  //实际摄入量 , 推荐摄入量
//				if(actualintake == "" || recommendedintake == ""){
//					return
//				}
//				const energybalance = actualintake - recommendedintake;  //实际摄入量 - 推荐摄入量
//				this.param.energybalance = energybalance;
//				return energybalance;
//			},
//			//蛋白质
//			protein(){
//				const {recommendedintake, energyallocation}  = this.param;  //推荐摄入量 , 饮食能量占比
//				if(recommendedintake == "" || energyallocation == ""){
//					return
//				}
//				const energyallocationCale = energyallocation.split(":")[0]*0.1; //饮食能量占比比例
//				const protein = (recommendedintake * energyallocationCale / 4).toFixed(1);  //（推荐摄入量*（比例*0.1））/4【保留小数点一位】
//				this.param.protein = protein;
//				return protein;
//			},
//			//脂肪
//			fat(){
//				const {recommendedintake, energyallocation}  = this.param;  //推荐摄入量 , 饮食能量占比
//				if(recommendedintake == "" || energyallocation == ""){
//					return
//				}
//				const energyallocationCale = energyallocation.split(":")[1]*0.1; //饮食能量占比比例
//				const fat = (recommendedintake * energyallocationCale / 9).toFixed(1);  //（推荐摄入量*（比例*0.1））/9【保留小数点一位】
//				this.param.fat = fat;
//				return fat;
//			},
//			//碳水
//			carbohydrate(){
//				const {recommendedintake, energyallocation}  = this.param;  //推荐摄入量 , 饮食能量占比
//				if(recommendedintake == "" || energyallocation == ""){
//					return
//				}
//				const energyallocationCale = energyallocation.split(":")[2]*0.1; //饮食能量占比比例
//				const carbohydrate = (recommendedintake * energyallocationCale / 4).toFixed(1);  //（推荐摄入量*（比例*0.1））/4【保留小数点一位】
//				this.param.carbohydrate = carbohydrate;
//				return carbohydrate;
//			},
    },
    methods: {
      //提交
      submit () {
        let url = 'UserInterface/DietGaugeInsert.ashx'
        this.$post(url, this.param).then((data) => {
          if (data.rspcode != 1) {
            this.$Toast(data.rspdesc)
            return
          }
          this.$Toast('保存成功')
          //查看报告
          this.$router.push('/diet')
        })
      },
    },
    mounted () {
      //是否重置表单
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
    margin-top: 10px;
    padding: 5px 10px;
    font-size: 0.145rem;
  }

  .title2 {
    margin-top: 0px;
    font-size: 0.15rem;
    padding: 0 10px;
    min-height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #e5e5e5;
  }

  .section {
    margin-top: 0.1rem;
    background: #FFF;
    font-size: 0.145rem;
    .ym_text{
      padding:0.1rem 0.1rem 0.1rem 0.2rem;
      min-height: 48px;
      p{
        line-height: 0.44rem;
        color: #666666;
      }
    }
  }

  .fix_bottom_area {
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
    .line-input {
      min-width: 72px;
      border: none;
      border-bottom: 1px solid #e5e5e5;
      margin: 0 0.05rem;
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
    .mint-radio-input:checked+.mint-radio-core, .mint-checkbox-input:checked+.mint-checkbox-core {
      background-color: #0AC5C9;
      border-color: #0AC5C9;
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
</style>
