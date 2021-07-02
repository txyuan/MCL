<template>
  <div class="padding-header padding-footer page">
    <mt-header :title="label" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>

    <img v-if="pageUrl == 'BMI'" src="@/assets/images/diet/_0017_BMI.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'energy'" src="@/assets/images/diet/_0016_能量.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'protein'" src="@/assets/images/diet/_0015_蛋白质.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'pinXue'" src="@/assets/images/diet/_0014_贫血.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'tengTong'" src="@/assets/images/diet/_0013_疼痛.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'shiMian'" src="@/assets/images/diet/_0012_失眠.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'fuXie'" src="@/assets/images/diet/_0011_腹泻.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'bianMi'" src="@/assets/images/diet/_0010_便秘.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'piLao'" src="@/assets/images/diet/_0009_疲劳.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'tunYanKunNan'" src="@/assets/images/diet/_0008_吞咽困难.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'eXinOuTu'" src="@/assets/images/diet/_0007_恶心呕吐.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'xiaoHuaBuLiang'" src="@/assets/images/diet/_0006_消化不良.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'tiZhongDiuShi'" src="@/assets/images/diet/_0005_体重丢失.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'diDanBai'" src="@/assets/images/diet/_0004_低蛋白血症.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'baiXiBao'" src="@/assets/images/diet/_0003_白细胞减少.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'kouQiang'" src="@/assets/images/diet/_0002_口腔黏膜炎.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'xueXiaoBan'" src="@/assets/images/diet/_0001_血小板计数降低.jpg" alt="" width="100%">
    <img v-if="pageUrl == 'feiYan'" src="@/assets/images/diet/_0000_放射性肺炎.jpg" alt="" width="100%">

    <div class="content">
        <div class="section" style="padding: 0.2rem">
          <div class="title">{{title}}</div>
          <div v-html="content"></div>
        </div>
        <div v-if="pageUrl == 'energy'" class="section">
            <div class="section-title"><span>饮食建议</span></div>
            <div class="section-result">
                <div v-for="(item, index) in list" :key="'d'+index" v-html="item.memo" class="note-text"></div>
                <div class="result-note" v-for="(item, index) in eneryList" :key="index">
                  <div v-if="item.diet.length > 0">
                    <div class="note-title"><img src="@/assets/images/diet/icon.png" alt="" width="25">{{item.value}}</div>
                    <div class="note-content">
                      <table class="diet-header" >
                        <tr>
                          <th width="40">餐次</th>
                          <th width="58">食物名称</th>
                          <th width="40">重量</th>
                          <th width="60">能量(cal)</th>
                          <th width="45">总能量</th>
                        </tr>
                      </table>
                      <div>
                        <!-- 早、午餐、晚餐、加餐 -->
                        <table class="diet-list" v-for="(dItem, i) in item.diet" :key="'table'+i">
                          <tr v-for="(tr, trIndex) in dItem" :key="tr.skey">
                            <td v-if="trIndex == 0" :rowspan="dItem.length" width="40">{{tr.name}}</td>
                            <td width="58">{{tr.foodName}}</td>
                            <td width="40">{{tr.foodQuantity}}</td>
                            <td width="60">{{tr.foodEnergy}}</td>
                            <td v-if="trIndex == 0" :rowspan="dItem.length" width="45" v-html="tr.foodEnergySum"></td>
                          </tr>
                        </table>
                        <!-- 汇总能量数据 -->
                        <table class="diet-list">
                          <tr>
                            <td width="40">膳食</td>
                            <td width="58">碳水</td>
                            <td width="40">蛋白质</td>
                            <td width="60">脂肪</td>
                            <td width="45" :rowspan="2" v-html="item.foodEnergy.replace('Kcal', '<br /> Kcal')"></td>
                          </tr>
                          <tr>
                            <td width="40">分析</td>
                            <td width="58">{{item.Carbohydrate}}</td>
                            <td width="40">{{item.Protein}}</td>
                            <td width="60">{{item.Fat}}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    {{item.value}}
                  </div>
                </div>
                <p class="note">如想获取精细化的定制方案，请点击“个性化定制”联系专属健康顾问。</p>
            </div>
        </div>
        <div v-else-if="pageUrl == 'protein'" class="section">
            <div class="section-title"><span>饮食建议</span></div>
            <div class="section-result">
                <div v-for="(item, index) in list" :key="'e'+index" class="result-note" >
                  <div class="note-title"><img src="@/assets/images/diet/icon.png" alt="" width="25">{{item.LableSecondName}}</div>
                  <div class="note-content">
                    <div class="note-text" v-html="item.memo"></div>
                    <table class="diet-list">
                      <tr>
                        <th>食物名称</th>
                        <th>蛋白质</th>
                        <th>食物名称</th>
                        <th>蛋白质</th>
                      </tr>
                      <tr v-for="(item, index) in proteinList" :key="'row'+index">
                        <td>{{item[0].foodName}}</td>
                        <td>{{item[0].Protein}}</td>
                        <td>{{item[1].foodName}}</td>
                        <td>{{item[1].Protein}}</td>
                      </tr>
                    </table>
                  </div>
                  <p v-if="index == (list.length - 1)" class="note">如想获取精细化的定制方案，请点击“个性化定制”联系专属健康顾问。</p>
                </div>
            </div>
        </div>
        <div v-else class="section">
            <div class="section-title"><span>饮食建议</span></div>
            <div class="section-result">
                <div class="result-note" v-for="(item, index) in list" :key="index">
                  <div class="note-title"><img src="@/assets/images/diet/icon.png" alt="" width="25">{{item.LableSecondName}}</div>
                  <div class="note-content" v-html="item.memo"></div>
                  <!-- <div   class="note-text"></div> -->
                  <p v-if="index == (list.length - 1)" class="note">如想获取精细化的定制方案，请点击“个性化定制”联系专属健康顾问。</p>
                </div>
            </div>
        </div>
    </div>

    <div class="fix_bottom">
        <mt-button type="primary" class="theme-button button-radio" :class="'btn_'+pageUrl" size="large" @click.native="$root.goMessage">个性化定制</mt-button>
    </div>

  </div>
</template>

<script>
import {getDietAdviceList, getSelfTestToolDietList, getSelfTestToolDietProteinList} from "@/api/complication"
export default {
    data: function() {
        const {label, labelSecond, pageUrl="BMI"} = this.$route.query
        return {
            label,
            labelSecond,
            pageUrl,
            title: "",
            content: "",
            list: [],
            eneryList: [], // 每日所需能量
            proteinList: [], // 每日所需蛋白量
        }
    },
    methods:{
      // 每个页面都显示的文本
      async getList(){
        const data = await getDietAdviceList({label: this.label, labelSecond: this.labelSecond});
        this.list = data.data
        this.content = data.data.length > 0 ? data.data[0].LableMemo : '';
        this.title = data.data.length > 0 ? data.data[0].LableName : '';
      },
      // 每日所需能量
      async getSelfTestToolDietList(){
        const data = await getSelfTestToolDietList({SubjectName: this.label, value: this.labelSecond});
        // 生成早午晚加餐的数据
        data.data.forEach(item => {
          item.diet = this.transformData(item.diet)
        });
        this.eneryList = data.data
      },
      // 生成早午晚加餐的数据
      transformData(arr){
        let temp = [], all = [];
        let flag = ""
        arr.forEach((item, index) => {
          item.foodEnergySum = item.foodEnergySum.replace("Kcal", "<br /> Kcal")
          if(flag == ""){
            flag = item.mealType
          }
          if(flag == item.mealType){
            temp.push(item)
          } else {
            all.push(temp)
            temp = [item]
          }
          flag = item.mealType
        })
        if(temp.length > 0){
          all.push(temp)
        }
        return all
      },
      // 每日所需能量
      async getSelfTestToolDietProteinList(){
        const data = await getSelfTestToolDietProteinList({SubjectName: this.label, value: this.labelSecond});
        const list = []
        data.data.forEach((item, index) =>{
          if(index % 2 == 1){
            list.push([data.data[index-1], data.data[index]])
          }else if(index == (data.data.length - 1)){
            list.push([data.data[index], {}])
          }
        })
        this.proteinList = list
      },
    },
    async created(){
      await this.getList()
      if(this.pageUrl == 'energy'){
        await this.getSelfTestToolDietList()
      }else if(this.pageUrl == 'protein'){
        await this.getSelfTestToolDietProteinList()
      }
    }
}
</script>

<style scoped lang="scss">
@import "./detail.scss";
</style>
