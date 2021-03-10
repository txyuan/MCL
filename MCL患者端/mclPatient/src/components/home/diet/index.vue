<template>
  <div class="diet-root">
    <div id="" style="padding-top:0.93rem; background-color: #f1f1f1">
      <!-- <mt-header title="饮食" fixed>
        <div slot="left">
          <router-link to="/wx_Entrance/home" style="color: inherit;">
            <mt-button icon="back"></mt-button>
          </router-link>
        </div>
      </mt-header> -->
      <mt-header title="饮食" fixed class="borderBottom">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <!-- mt-navbar -->
      <div id="navbar" class="fix_top" style="top: 0.48rem;">
        <mt-navbar v-model="ABflag">
          <mt-tab-item v-for="(item,index) in navbarList" :key="`tab_${index}`"
                       :class="(ABflag == item.type)&&'is-selected'"
                       @click.native="toggleType(item)">
            <p>{{item.name}}</p>
          </mt-tab-item>
        </mt-navbar>
      </div>

      <!-- 内容 -->
      <div class="neirong">
        <!-- 今日饮食 -->
        <div class="yinshhi_list" :hidden="ABflag == 2">
          <!-- 今日提醒 -->
          <div class="home-cell">
            <!-- <p class="name">今日提醒</p> -->
            <ul v-for="(item,index) in todynews" :key="`tip_${index}`" class="remindList" @click="hrefgg(item)">
              <li>
                <div class="left">
                  <div class="rowTop">
                    <img src="@/assets/images/yinshi@2x.png" class="icon"/>
                    <span class="huiFont font15">{{item.takingcondition}}</span>
                  </div>
                  <div class="rowBottom font12">
                    <p class="light_gray">应完成时间：<span>{{item.completiontime}}；</span> <span class="yellow">{{item.timeouttime}}</span>
                    </p>
                  </div>
                </div>
                <div class="right yellow font14">
                  <mt-badge size="small">
                    <span>上传饮食</span>
                  </mt-badge>
                </div>
              </li>
            </ul>
          </div>

          <!-- 早餐 -->
          <!-- <div class="title">
            <div class="wrap borderBottom">
              <img src="@/assets/images/zaocan@2x.png" width="20" class="icon" />
              <span class="font16">早餐</span>
              <span class="float_right huiFont9">{{breakfasttime}}</span>
            </div>
          </div>
          <mt-cell v-for="(item,index) in todybreakfast.breakfastdatalist" :key="index">
            <img slot="icon" :src="item.breakfast_foodImg" width="46" height="46">
            <div slot="title" class="titleWrap">
              <span class="mint-cell-text">{{item.breakfast_foodName}}</span>
              <span class="mint-cell-label font12 huiFont99">{{item.breakfast_foodQuantity}}</span>
            </div>
            <div class="font14 huiFont99">
              {{item.breakfast_foodEnergy}}
            </div>
          </mt-cell>
          <div class="completeState clear">
            <div class="float_left">
              完成情况
            </div>
            <div class="float_right ">
              <mt-progress :value="todybreakfast.breakfast_completion" :bar-height="7"> </mt-progress>
              <div class="font12 huiFont99">
                推荐摄入{{todybreakfast.breakfast_recintake}}大卡，实际摄入{{todybreakfast.breakfast_actualintake}}大卡 ,完成度：<span class="red">{{todybreakfast.breakfast_completion}}%</span>
                ，{{todybreakfast.breakfast_describe}}
              </div>
            </div>
          </div> -->
          <!-- 午餐 -->
          <!-- <div class="title">
            <div class="wrap borderBottom borderTop">
              <img src="@/assets/images/wucan@2x.png" width="20" class="icon" />
              <span class="font16">午餐</span>
              <span class="float_right huiFont9">{{lunchtime}}</span>
            </div>
          </div>
          <mt-cell v-for="(item,index) in todylunch.lunchdatalist" :key="index" is-link>
            <img slot="icon" :src="item.lunch_foodImg" width="46" height="46">
            <div slot="title" class="titleWrap">
              <span class="mint-cell-text">{{item.lunch_foodName}}</span>
              <span class="mint-cell-label font12 huiFont99">{{item.lunch_foodQuantity}}</span>
            </div>
            <div class="font14 huiFont99">
              {{item.lunch_foodEnergy}}
            </div>
          </mt-cell>
          <div class="completeState clear">
            <div class="float_left">
              完成情况
            </div>
            <div class="float_right ">
              <mt-progress :value="todylunch.lunch_completion" :bar-height="7"> </mt-progress>
              <div class="font12 huiFont99">
                推荐摄入{{todylunch.lunch_recintake}}大卡，实际摄入{{todylunch.lunch_actualintake}}大卡 ,完成度：<span class="red">{{todylunch.lunch_completion}}%</span>
                ，{{todylunch.lunch_describe}}
              </div>
            </div>
          </div> -->
          <!-- 晚餐 -->
          <!-- <div class="title">
            <div class="wrap borderBottom borderTop">
              <img src="@/assets/images/wancan@2x.png" width="20" class="icon" />
              <span class="font16">晚餐</span>
              <span class="float_right huiFont9">{{dinnertime}}</span>
            </div>
          </div>
          <mt-cell v-for="(item,index) in todydinner.dinnerdatalist" :key="index" is-link>
            <img slot="icon" :src="item.dinner_foodImg" width="46" height="46">
            <div slot="title" class="titleWrap">
              <span class="mint-cell-text">{{item.dinner_foodName}}</span>
              <span class="mint-cell-label font12 huiFont99">{{item.dinner_foodQuantity}}</span>
            </div>
            <div class="font14 huiFont99">
              {{item.dinner_foodEnergy}}
            </div>
          </mt-cell>
          <div class="completeState clear">
            <div class="float_left">
              完成情况
            </div>
            <div class="float_right ">
              <mt-progress :value="todydinner.dinner_completion" :bar-height="7"> </mt-progress>
              <div class="font12 huiFont99">
                推荐摄入{{todydinner.dinner_recintake}}大卡，实际摄入{{todydinner.dinner_actualintake}}大卡 ,完成度：<span class="red">{{todydinner.dinner_completion}}%</span>
                ，{{todydinner.dinner_describe}}
              </div>
            </div>
          </div> -->
          <!--加餐-->
          <!-- <div class="title">
            <div class="wrap borderBottom borderTop">
              <img src="@/assets/images/jiacan@2x.png" width="20" class="icon" />
              <span class="font16">加餐</span>
              <span class="float_right huiFont9">{{mealadditiontime}}</span>
            </div>
          </div>
          <div class="borderBottom">
            <mt-cell v-for="(item,index) in todymealaddition.mealadditiondatalist" :key="index" is-link>
              <img slot="icon" :src="item.mealaddition_foodImg" width="46" height="46">
              <div slot="title" class="titleWrap">
                <span class="mint-cell-text">{{item.mealaddition_foodName}}</span>
                <span class="mint-cell-label font12 huiFont99">{{item.mealaddition_foodQuantity}}</span>
              </div>
              <div class="font14 huiFont99">
                {{item.mealaddition_foodEnergy}}
              </div>
            </mt-cell>
            <div class="completeState clear">
              <div class="float_left">
                完成情况
              </div>
              <div class="float_right ">
                <mt-progress :value="todymealaddition.mealaddition_completion" :bar-height="7"> </mt-progress>
                <div class="font12 huiFont99">
                  推荐摄入{{todymealaddition.mealaddition_recintake}}大卡，实际摄入{{todymealaddition.mealaddition_actualintake}}大卡 ,完成度：<span
                   class="red">{{todymealaddition.mealaddition_completion}}%</span> ，{{todymealaddition.mealaddition_describe}}
                </div>
              </div>
            </div>
          </div> -->
          <div class="page">
            <!-- 热量分析 -->
            <div class="title title_icon1">
              <span class="font16">热量分析</span>
            </div>
            <div class="panel">
              <p class="font16">三餐热量比及摄入</p>
              <p class="huiFont font12">
                <span style="margin-right: 3%;"><label style="color: #FE7A66;">↑</label>偏高</span>
                <span style="margin-right: 3%;"><label style="color: #FE7A66;">↓</label>偏低</span>
                <span><label style="color: #42B8A7;">✔</label>合适</span>
              </p>

              <div id="pie"></div>

              <table border="0" cellspacing="0" cellpadding="0" class="bgtable">
                <tr>
                  <th>名称</th>
                  <th>摄入（千卡）</th>
                  <th>推荐（千卡）</th>
                </tr>
                <tr v-for="(item,index) in dietdata" :key="`hot_${index}`">
                  <td>{{item.quantityname}}</td>
                  <td>
                    <label v-if="Number(item.quantityintake)<Number(item.quantityrecommend)"
                           style="color: #FE7A66;">↓</label>
                    <label v-else-if="Number(item.quantityintake)>Number(item.quantityrecommend)"
                           style="color: #FE7A66;">↑</label>
                    <label v-else-if="Number(item.quantityintake)==Number(item.quantityrecommend)"
                           style="color: #42B8A7;">✔</label>
                    {{item.quantityintake}}
                  </td>
                  <td>{{item.quantityrecommend}}</td>
                </tr>
                <tr class="line">
                  <td colspan="3">
                    <div class="borderBottom"></div>
                  </td>
                </tr>
                <tr style="font-weight: 600">
                  <td>总摄入</td>
                  <td>
                    <label v-if="Number(totalintake)<Number(totalrecommend)" style="color: #FE7A66;">↓</label>
                    <label v-else-if="Number(totalintake)>Number(totalrecommend)" style="color: #FE7A66;">↑</label>
                    <label v-else-if="Number(totalintake)==Number(totalrecommend)" style="color: #42B8A7;">✔</label>
                    {{totalintake}}
                  </td>
                  <td>{{totalrecommend}}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="page">
            <!-- 三大营养素分析 -->
            <div class="title title_icon2">
              <span class="font16">三大营养素分析</span>
            </div>
            <div class="panel">
              <p class="font16">摄入比及推荐</p>
              <p class="huiFont font12">
                <span style="margin-right: 3%;"><label style="color: #FE7A66;">↑</label>偏高</span>
                <span style="margin-right: 3%;"><label style="color: #FE7A66;">↓</label>偏低</span>
                <span><label style="color: #42B8A7;">✔</label>合适</span>
              </p>

              <div id="pie2"></div>

              <table border="0" cellspacing="0" cellpadding="0" class="bgtable">
                <tr>
                  <th>名称</th>
                  <th>摄入（克）</th>
                  <th>推荐（克）</th>
                </tr>

                <tr v-for="(item,index) in yingyangList" :key="`yys_${index}`">
                  <td>{{item.name}}</td>
                  <td>
                    <label v-if="Number(item.value)<Number(item.recommend)" style="color: #FE7A66;">↓</label>
                    <label v-else-if="Number(item.value)>Number(item.recommend)" style="color: #FE7A66;">↑</label>
                    <label v-else-if="Number(item.value)==Number(item.recommend)" style="color: #42B8A7;">✔</label>
                    {{item.value}}
                  </td>
                  <td>{{item.recommend}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <!-- 饮食方案 -->
        <div class="yinshhi_list" :hidden="ABflag == 1" style="padding-bottom: 0.5rem;">
          <div class="noalready" v-if="dataflag==0">
            <img src="@/assets/images/nowzzz.png"/>
            <p>请稍等，您的饮食方案正在制作中...</p>
          </div>
          <div class="already" v-else>
            <div class="solution">

              <div class="solution_bg">
<!--                <div class="pogress_btn">能量摄入</div>-->

<!--                <p>目标能量</p>-->
<!--                <p class="btys">{{parseFloat(targetenergy).toFixed(0)}}Kcal</p>-->
<!--                <p>目标摄入量是{{parseFloat(targetenergy).toFixed(0)}}Kcal，能量处于{{parseFloat(energyBalance).toFixed(0)}}Kcal</p>-->
              </div>
              <div class="solution_details">

                <div class="pog_inform">
<!--                  <h3>饮食处方说明</h3>-->
                  <p>根据饮食调查，您每日的实际摄入量是{{parseFloat(actualIntake).toFixed(0)}}Kcal，您的目标摄入量是{{parseFloat(targetenergy).toFixed(0)}}Kcal，能量处于{{parseFloat(energyBalance).toFixed(0)}}Kcal。</p>
                  <p>
                    肿瘤是一种消耗性疾病，为使体内能量储备处于稳定状态，根据您身体评估结果制定如下饮食方案。</p>
                </div>
                <div class="pogress">
                  <p>
                    目标能量 <span class="btys">{{parseFloat(targetenergy).toFixed(0)}}<em>Kcal</em></span> </p>
                </div>
                <div class="zonghe">
                  <ul>
                    <li>
<!--                      <img src="@/assets/images/danbaizhi@2x.png" alt=""/>-->
                      <p class="zonghe_mb protein_br"><span> {{parseFloat(protein).toFixed(0)}}g</span><em>{{proteinProportion}}%</em></p>
                      <p class="zonghe_bt">蛋白质</p>
                    </li>
                    <li>
<!--                      <img src="@/assets/images/zhifang@2x.png" alt=""/>-->
                      <p class="zonghe_mb fat_br"><span> {{parseFloat(fat).toFixed(0)}}g</span><em>{{fatProportion}}%</em></p>
                      <p class="zonghe_bt">脂肪</p>
                    </li>
                    <li>
<!--                      <img src="@/assets/images/tanshuihuahewu@2x.png" alt=""/>-->
                      <p class="zonghe_mb carbohydrate_br"><span> {{parseFloat(carbohydrate).toFixed(0)}}g</span><em>{{carbohydrateProportion}}%</em></p>
                      <p class="zonghe_bt">碳水化合物</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 早餐 -->
            <div class="meal_sort">
            <div class="title">
              <div class="wrap borderBottom">
                <img src="@/assets/images/zaocan@2x.png" width="20" class="icon"/>
                <span class="font15">早餐</span>
                <span class="float_right huiFont9">{{breakfast_time}}</span>
              </div>
            </div>
            <mt-cell v-for="(item,index) in breakfast" :key="`yy_${index}`" is-link
                     @click.native="getdetd(item.breakfast_foodName)">
              <img slot="icon" :src="item.breakfast_foodImg" width="46" height="46">
              <div slot="title" class="titleWrap">
                <span class="mint-cell-text">{{item.breakfast_foodName}}</span>
                <span class="mint-cell-label font12 huiFont99">建议食用量：{{item.breakfast_foodQuantity}}</span>
              </div>
              <div class="font14 huiFont99">
                {{item.breakfast_foodEnergy}}
              </div>
            </mt-cell>
            </div>
            <!-- 早餐加餐 -->
            <!-- <div class="title">
              <div class="wrap borderBottom borderTop">
                <img src="@/assets/images/jiacan@2x.png" width="20" class="icon" />
                <span class="font16">早加餐</span>
                <span class="float_right huiFont9">{{breakfastplus_time}}</span>
              </div>
            </div>
            <div>
              <mt-cell v-for="(item,index) in breakfastplusdata" :key="index" is-link>
                <img slot="icon" :src="item.breakfast_foodImg" width="46" height="46">
                <div slot="title" class="titleWrap">
                  <span class="mint-cell-text">{{item.breakfast_foodName}}</span>
                  <span class="mint-cell-label font12 huiFont99">{{item.breakfast_foodQuantity}}</span>
                </div>
                <div class="font14 huiFont99">
                  {{item.breakfast_foodEnergy}}
                </div>
              </mt-cell>
            </div> -->
            <!-- <div class="completeState clear">
              <div class="float_left">
                完成情况
              </div>
              <div class="float_right ">
                <mt-progress :value="60" :bar-height="7"> </mt-progress>
                <div class="font12 huiFont99">
                  推荐摄入330大卡，实际摄入276大卡 ,完成度：<span class="red">80%</span> ，完成情况良好
                </div>
              </div>
            </div> -->
            <!-- 午餐 -->
            <div class="meal_sort">
            <div class="title">
              <div class="wrap borderBottom borderTop">
                <img src="@/assets/images/wucan@2x.png" width="20" class="icon"/>
                <span class="font15">午餐</span>
                <span class="float_right huiFont9">{{lunch_time}}</span>
              </div>
            </div>
            <mt-cell v-for="(item,index) in lunch" :key="`wc_${index}`" is-link
                     @click.native="getdetd(item.lunch_foodName)">
              <img slot="icon" :src="item.lunch_foodImg" width="46" height="46">
              <div slot="title" class="titleWrap">
                <span class="mint-cell-text">{{item.lunch_foodName}}</span>
                <span class="mint-cell-label font12 huiFont99">建议食用量：{{item.lunch_foodQuantity}}</span>
              </div>
              <div class="font14 huiFont99">
                {{item.lunch_foodEnergy}}
              </div>
            </mt-cell>
            </div>
            <!-- 午加餐 -->
            <!-- <div class="title">
              <div class="wrap borderBottom borderTop">
                <img src="@/assets/images/jiacan@2x.png" width="20" class="icon" />
                <span class="font16">午加餐</span>
                <span class="float_right huiFont9">{{lunchplus_time}}</span>
              </div>
            </div>
            <mt-cell v-for="(item,index) in lunchplusdata" :key="index" is-link>
              <img slot="icon" :src="item.lunch_foodImg" width="46" height="46">
              <div slot="title" class="titleWrap">
                <span class="mint-cell-text">{{item.lunch_foodName}}</span>
                <span class="mint-cell-label font12 huiFont99">{{item.lunch_foodQuantity}}</span>
              </div>
              <div class="font14 huiFont99">
                {{item.lunch_foodEnergy}}
              </div>
            </mt-cell> -->
            <!-- 晚餐 -->

            <div class="meal_sort">
            <div class="title">
              <div class="wrap borderBottom borderTop">
                <img src="@/assets/images/wancan@2x.png" width="20" class="icon"/>
                <span class="font15">晚餐</span>
                <span class="float_right huiFont9">{{dinner_time}}</span>
              </div>
            </div>
            <mt-cell v-for="(item,index) in dinner" :key="`dinner_${index}`" is-link
                     @click.native="getdetd(item.dinner_foodName)">
              <img slot="icon" :src="item.dinner_foodImg" width="46" height="46">
              <div slot="title" class="titleWrap">
                <span class="mint-cell-text">{{item.dinner_foodName}}</span>
                <span class="mint-cell-label font12 huiFont99">建议食用量：{{item.dinner_foodQuantity}}</span>
              </div>
              <div class="font14 huiFont99">
                {{item.dinner_foodEnergy}}
              </div>
            </mt-cell>
            </div>
            <!--加餐-->

            <div class="meal_sort">
            <div class="title">
              <div class="wrap borderBottom borderTop">
                <img src="@/assets/images/jiacan@2x.png" width="20" class="icon"/>
                <span class="font15">加餐</span>
                <span class="float_right huiFont9">{{mealaddition_time}}</span>
              </div>
            </div>
              <mt-cell v-for="(item,index) in mealaddition" :key="`jc_${index}`" is-link
                       @click.native="getdetd(item.mealaddition_foodName)">
                <img slot="icon" :src="item.mealaddition_foodImg" width="46" height="46">
                <div slot="title" class="titleWrap">
                  <span class="mint-cell-text">{{item.mealaddition_foodName}}</span>
                  <span class="mint-cell-label font12 huiFont99">建议食用量：{{item.mealaddition_foodQuantity}}</span>
                </div>
                <div class="font14 huiFont99">
                  {{item.mealaddition_foodEnergy}}
                </div>
              </mt-cell>
            </div>
            <router-link to="/gauge_diet?resetstatus=1" class="buttons">
              <mt-button type="danger" class="add_btns" size="large">调整处方</mt-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="diet_alety" v-if="aleta">
      <div class="diet_aletw">
        <div class="diet_aleta"> 食物详情</div>
        <div class="diet_aletc">
          <p>食物名称：{{aletData.foodname}}</p>
          <p>食物重量：{{aletData.foodgram}}{{aletData.gramunit}}</p>
          <p>能量：{{aletData.foodkcal}}{{aletData.kcalunit}}</p>
          <p>蛋白质：{{aletData.protein}}</p>
          <p>脂肪：{{aletData.fat}}</p>
          <p>碳水化合物：{{aletData.carbohydrate}}</p>
          <!-- <img :src="aletData.foodimg" /> -->
        </div>
        <div class="diet_aleto" @click="ok_alert">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'diet',
    data: () => ({
      ABflag: 1,
      navbarList: [{name: '今日饮食', type: 1}, {name: '饮食处方', type: 2}],
      // 今日饮食
      todybreakfast: [],
      todylunch: [],
      todydinner: [],
      todymealaddition: [],
      breakfasttime: '', // 早餐时间
      lunchtime: '', // 午餐时间
      dinnertime: '', // 晚餐时间
      mealadditiontime: '', // 加餐时间

      // 热量分析
      dietdata: [],
      totalintake: '',
      totalrecommend: '',
      // 三大营养素分析
      yingyangList: [],
      // intakefat:'',  //摄入脂肪
      // recommendfat:'',  //推荐脂肪
      // intakecarbohydrate:'',  //摄入碳水化合物
      // recommendcarbohydrate:'',  //推荐碳水化合物
      // intakeprotein:'',  //摄入蛋白质
      // recommendprotein:'',  //推荐蛋白质
      // nutrientlist:[],  //营养摄入素分析
      // motionlist:[],  //运动分析

      // 饮食方案
      datriq: '',
      targetenergy: '', // 目标能量
      protein: '', // 蛋白质
      fat: '', // 脂肪
      carbohydrate: '', // 碳水化合物
      breakfast: [], // 早餐
      lunch: [], // 午餐
      dinner: [], // 晚餐
      breakfast: [], // 加餐
      breakfastplusdata: [], // 早餐加餐
      lunchplusdata: [], // 午餐加餐
      breakfast_time: '', // 早餐时间
      breakfastplus_time: '', // 早加餐时间
      lunch_time: '', // 午餐时间
      lunchplus_time: '', // 午加餐时间
      dinner_time: '', // 晚餐时间
      mealaddition_time: '', // 加餐时间
      mealaddition: [],
      todynews: [], // 今日提醒
      dataflag: 0,
      energyBalance: '',
      actualIntake: '',
      carbohydrateProportion: '',
      fatProportion: '',
      proteinProportion: '',
      aleta: false,
      aletData: {}
    }),
    methods: {
      getnewdate () {
        let timer = new Date()
        let years = timer.getFullYear()
        let mont = Number(timer.getMonth()) + 1
        if (mont < 10) {
          mont = '0' + mont
        }
        let days = timer.getDate()
        if (days < 10) {
          days = '0' + days
        }
        this.datriq = years + '-' + mont + '-' + days
      },
      hrefgg (item) {
        if (item.iscomp == '1') {
          this.$router.push('/uploadss?skey=' + item.skey + '&mealtype=' + item.mealname)
        } else {
          this.$router.push('/uploadPhoto?skey=' + item.skey + '&mealtype=' + item.mealname)
        }
      },
      // 今日提醒
      remindToday () {
        let url = 'UserInterface/PatientHomePageRemindToday.ashx'
        let param = {
          functiontype: 1,
          pagesize: 20,
          pagecount: 1
        }
        this.$post(url, param).then((data) => {
          if (data.rspcode != 1) {
            return
          }
          this.todynews = data.remindtoday
        })
      },
      toggleType (item) {
        this.ABflag = item.type
      },
      // 今日饮食
      todayDiet () {
        let url = 'UserInterface/SelectTodayDiet.ashx'
        this.$post(url).then((data) => {
          if (data.rspcode != 1) {
            return
          }
          this.todybreakfast = data.breakfastdata
          this.todylunch = data.lunchdata
          this.todydinner = data.dinnerdata
          this.todymealaddition = data.mealadditiondata
          if (data.breakfastdata.breakfastdatalist.lenth > 0) {
            this.breakfasttime = data.breakfastdata.breakfastdatalist[0].breakfast_time
          }
          if (data.lunchdata.lunchdatalist.lenth > 0) {
            this.lunchtime = data.lunchdata.lunchdatalist[0].lunch_time
          }
          if (data.dinnerdata.dinnerdatalist.lenth > 0) {
            this.dinnertime = data.dinnerdata.dinnerdatalist[0].dinner_time
          }
          if (data.mealadditiondata.mealadditiondatalist.lenth > 0) {
            this.mealadditiontime = data.mealadditiondata.mealadditiondatalist[0].mealaddition_time
          }
        })
      },
      // 饼图
      pie () {
        var option = {
          tooltip: {
            show: false
          },
          legend: {
            data: ['早餐', '午餐', '晚餐', '加餐'],
            right: 5,
            itemWidth: 15,
            itemHeight: 12
          },
          animation: false,
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['30%', '60%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'outside',
                textStyle: {
                  fontSize: '12'
                  //			                        color: "#FFF"
                },
                formatter: '{d}%'
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [{
              value: 0,
              name: '早餐'
            },
              {
                value: 0,
                name: '午餐'
              },
              {
                value: 0,
                name: '晚餐'
              },
              {
                value: 0,
                name: '加餐'
              }
            ]
          }],
          color: ['#7687e8', '#f1a5a5', '#f7d284', '#76c5a1']
        }

        // 获取dom容器
        var myChart = echarts.init(document.getElementById('pie'))
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
        let url = 'UserInterface/HealthCalorimetricAnalysis.ashx'
        let param = {
          datetime: this.datriq
        }
        this.$post(url, param).then((data) => {
          if (data.rspcode != 1) {
            return
          }
          this.healthystatus = data.healthystatus
          this.dietdata = data.dietdata.dietlistdata
          this.totalintake = data.dietdata.totalintake
          this.totalrecommend = data.dietdata.totalrecommend
          let dietlist = []
          for (var i = 0; i < data.dietdata.dietlistdata.length; i++) {
            let aa = {
              value: data.dietdata.dietlistdata[i].quantityintake,
              name: data.dietdata.dietlistdata[i].quantityname
            }
            dietlist.push(aa)
          }
          option.series[0].data = dietlist
          if (dietlist.length > 0) {
            myChart.setOption(option)
          }
        })
      },

      // 饼图
      pie2 () {
        var option = {
          tooltip: {
            show: false
          },
          legend: {
            data: ['脂肪', '蛋白质', '碳水'],
            right: 5,
            itemWidth: 15,
            itemHeight: 12
          },
          animation: false,
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['0%', '60%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'outside',
                textStyle: {
                  fontSize: '12'
                  //			                        color: "#FFF"
                },
                formatter: '{d}%'
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [
              {
                value: 0,
                name: '脂肪'
              },
              {
                value: 0,
                name: '蛋白质'
              },
              {
                value: 0,
                name: '碳水'
              }
            ]
          }],
          color: ['#f7d284', '#7687e8', '#f1a5a5']
        }

        // 获取dom容器
        var myChart = echarts.init(document.getElementById('pie2'))
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
        let url = 'UserInterface/HealthThreeNutrition.ashx'
        let param = {
          datetime: this.datriq
        }
        this.$post(url, param).then((data) => {
          if (data.rspcode != 1) {
            return
          }
          let list = [
            {
              value: data.intakefat, // 实际摄入量
              recommend: data.recommendfat, // 推荐摄入量
              name: '脂肪'
            },
            {
              value: data.intakecarbohydrate,
              recommend: data.recommendcarbohydrate,
              name: '碳水'
            },
            {
              value: data.intakeprotein,
              recommend: data.recommendprotein,
              name: '蛋白质'
            }
          ]
          option.series[0].data = list
          this.yingyangList = list
          myChart.setOption(option)
        })
      },
      // 饮食方案
      eachRecord () {
        let url = 'UserInterface/SelectTodayDietPlan.ashx'
        this.$post(url).then((data) => {
          if (data.rspcode != 1) {
            return
          }
          this.dataflag = data.dataflag
          this.targetenergy = data.targetenergy
          this.protein = data.protein
          this.fat = data.fat
          this.carbohydrate = data.carbohydrate
          this.breakfast = data.breakfastdata
          this.breakfastplusdata = data.breakfastplusdata
          this.lunch = data.lunchdata
          this.lunchplusdata = data.lunchplusdata
          this.dinner = data.dinnerdata
          this.actualIntake = data.actualIntake
          this.energyBalance = data.energyBalance
          this.mealaddition = data.mealadditiondata
          this.carbohydrateProportion = data.carbohydrateProportion
          this.fatProportion = data.fatProportion
          this.proteinProportion = data.proteinProportion
          if (data.breakfastdata && data.breakfastdata.length != 0) {
            this.breakfast_time = data.breakfastdata[0].breakfast_time
          }
          if (data.breakfastplusdata && data.breakfastplusdata.length != 0) {
            this.breakfastplus_time = data.breakfastplusdata[0].breakfast_time
          }
          if (data.lunchdata && data.lunchdata.length != 0) {
            this.lunch_time = data.lunchdata[0].lunch_time
          }
          if (data.lunchplusdata && data.lunchplusdata.length != 0) {
            this.lunchplus_time = data.lunchplusdata[0].lunch_time
          }
          if (data.dinnerdata && data.dinnerdata.length != 0) {
            this.dinner_time = data.dinnerdata[0].dinner_time
          }
          if (data.mealadditiondata && data.mealadditiondata.length != 0) {
            this.mealaddition_time = data.mealadditiondata[0].mealaddition_time
          }
        })
      },
      getdetd (skeys) {
        this.aleta = true
        let url = 'UserInterface/goods/FoodDataDetail.ashx'
        let param = {
          food_name: skeys
        }
        this.$post(url, param).then((data) => {
          if (data.rspcode != 1) {
            return
          }
          this.aletData = data
        })
      },
      ok_alert () {
        this.aleta = false
      }
    },
    mounted () {
      this.getnewdate()
      this.remindToday()
      this.todayDiet()
      this.eachRecord()
      this.pie()
      this.pie2()
      if (this.$route.query.ABflag == 2) {
        this.ABflag = 2
      }
    }
  }
</script>

<style scoped lang="scss">
  .mint-header {
    height: 0.48rem;
    font-size: 0.16rem;
  }

  .neirong {
    margin-top: 0.1rem;
  }

  .home-cell {
    & > .name {
      line-height: 0.44rem;
      padding: 0 0.12rem;
      background: #FFFFFF;
    }

    .more {
      float: right;
      color: #958F8F;
      font-size: 0.12rem;
    }
  }

  /*今日提醒*/
  .remindList {
    padding-left: 3%;

    & > li {
      padding: 0.13rem 0.1rem 0.13rem 0.05rem;
      background: #FFFFFF;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dashed #e5e5e5;
    }

    & > li .left {
      .rowTop .icon {
        width: 0.16rem;
        vertical-align: middle;
        /*margin-right: 5px;*/
      }
    }

    & > li .right {
      text-align: right;
      margin-top: 0.1rem;
    }

    .rowTop {
      margin-bottom: 0.05rem;
    }

    .rowTop > * {
      vertical-align: middle;
    }
  }

  .completeState {
    padding: 0.12rem;

    .float_left {
      width: 40%;
    }

    .float_right {
      width: 60%;
    }
  }

  /* 早餐列表 */
  .yinshhi_list {

    .home-cell {

      background: #FFFFFF;
    }

    .title {
      line-height: 45px;
      background: #FFFFFF;
    }

    /*.title_icon1 {*/
    /*  background: url(../../../assets/images/yinshis.png) #fafafa no-repeat 0.1rem center;*/
    /*  background-size: 0.2rem;*/
    /*}*/

    /*.title_icon2 {*/
    /*  background: url(../../../assets/images/shenghuozhuangkuang@2x.png) #fafafa no-repeat 0.1rem center;*/
    /*  background-size: 0.2rem;*/
    /*}*/

    .wrap {
      padding-left: 0.15rem;
      padding-right: 34px;
    }

    .wrap > * {
      vertical-align: middle;
    }

    /*.wrap>.icon{margin-right: 5px;}*/
  }

  .titleWrap {
    display: inline-block;
    vertical-align: middle;
  }

  .mint-cell {
    min-height: 66px;
  }

  .mt-progress {
    height: 7px;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 0.10rem;
  }

  .solution {
    /*padding: 0.13rem 0.20rem;*/
    background: #FFFFFF;
    position: relative;
    padding: 0.275rem 3% 0.185rem 3%;
    margin-bottom: 0.1rem;
   .solution_bg{

     background-color: #0AC5C9;
     background-size: auto 100%;
    color: #FFFFFF;
    font-size: 11px;
     min-height: 62%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 3%;
  }
    }

    .solution_details{
      position: relative;
      /*background: #FFFFFF;*/
      /*padding: 2%;*/
      border-radius: 0.1rem;
      .pogress {
        line-height: 18px;
        background:#FFFFFF;
        border-bottom: 1px dashed #e5e5e5;
        border-radius: 8px 8px 0 0;
        box-shadow: 0px -4px 5px rgba(0,0,0,0.1);
        p{
          font-size: 0.145rem;
          padding: 0.1rem 0.15rem;
          color: #666666;
        }
        .btys{
          font-size: 0.185rem;
          padding:0.12rem 0.05rem;
          color: #14a4a7;
          em{
            font-style: normal;
            font-size: 0.145rem;
            padding-left: 0.05rem;
            color: #666666;
          }
        }
      }
      .pog_inform {
        font-size: 0.13rem;
        color: #666;
        padding: 0.15rem 5% 0.1rem 5%;
        background-color: #FFFFFF;
        border-radius: 8px;
        margin-bottom: 0.165rem;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
        h3 {
          font-size: 0.15rem;
          color: #484848;
          text-align: center;
          font-weight: 500;
          padding-bottom: 0.05rem;
        }
        p {
          text-indent: 0.75em;
          line-height: 0.22rem;
          color: #787878;
          font-size: 0.14rem;
        }
      }


      .zonghe {
        padding: 0.05rem 3% 0.025rem 3%;
        background: #FFFFFF;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
        border-radius:0 0 8px 8px ;
        ul {
          display: flex;
          justify-content: space-between;
          text-align: center;
          padding:0.15rem 1%;

          li{
            width: 33%;
            img{
              width: 0.575rem;
              height: 0.575rem;
            }
            .zonghe_mb {
                color: #666666;
               font-size: 0.14rem;
              width: 0.5rem;
              height: 0.5rem;
              border-style: solid;
              border-width: 4px;
              border-radius: 50%;
              position: relative;
              margin: 0px auto;
              span{
                display: block;
                background-color: #FFFFFF;
                height: 0.25rem;
                line-height: 0.275rem;
                border-radius: 0.25rem 0.25rem 0 0;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0.25rem;
              }
              em{
                font-style: normal;
                padding-top: 0.25rem;
                display: inline-block;
                line-height: 0.25rem;
                color: #FFFFFF;
                font-weight: 600;
                font-size: 0.14rem;
                padding-left: 0.05rem;
              }
              }
            .protein_br{
              border-color:#f5c543 ;
              background-color:#f5c543;
            }
            .fat_br{
              border-color:#ef918f;
              background-color:#ef918f ;
            }
            .carbohydrate_br{
              border-color:#86c4fa;
              background-color: #86c4fa;
            }
            .zonghe_bt{
              color: #484848;
              font-size: 0.14rem;
              font-weight: 500;
              margin-top: 0.1rem;
            }
          }

        }
      }
  }


  .noalready {
    padding-top: 0.4rem;

    img {
      width: 1.0rem;
      margin: 0 auto;
      display: block;
    }

    p {
      text-align: center;
      color: #666;
      font-size: 0.14rem;
      padding-top: 0.2rem;
    }
  }

  .page {
    padding-top: 0;
    padding-bottom: 0.1rem;
    background: #FFFFFF;
    margin-top: 0.1rem;

    .title {
      padding-left: 0.15rem;
      line-height: 45px;

      border-bottom: 1px solid #e5e5e5;

      span {
        padding-left: 0.1rem;
        border-left: 4px solid #0AC5C9;
      }
    }
  }

  .title:before {
    content: "";
    display: inline-block;
    width: 5px;
    height: 11px;
    background: #0AC5C9;
    border-radius: 3px;
    margin-left: -5px;
    margin-right: 5px;
  }

  .title {
    /*padding-left: 5px;*/
    /*margin-top: 20px;*/
  }

  .panel {
    /*height:3.22rem;*/
    background: rgba(255, 255, 255, 1);
    /*box-shadow: 0px 2px 8px 0px rgba(55, 61, 83, 0.51);*/
    border-radius: 15px;
    padding: 0.1rem 0.15rem;
    line-height: 1.6;
  }

  .list {
    border-radius: 3px;
    overflow: hidden;
  }

  .list li {
    float: left;
    width: 20%;
    box-sizing: border-box;
    text-align: center;
    color: #FFFFFF;
    font-size: 0.18rem;
    line-height: 0.27rem;
    height: 0.27rem;
  }

  .list li.active {
    border: 0.02px solid #48546E;
    color: #48546E;
    line-height: 0.25rem;
  }

  .pane-state {
    margin-top: 0.1rem;
    color: #7786E4;
  }

  .panel-list {
    line-height: 1.5;
    border-bottom: 1px solid #EDEDF5;
    padding-bottom: 0.15rem;
    margin-bottom: 0.15rem;
  }

  .note {
    color: #CDCFDE;
    line-height: 1.5;
  }

  /*时间栏目*/
  .time-pick {
    background: #0AC5C9;
    height: 44px;
  }

  .time-inner {
    width: 200px;
    text-align: center;
    padding-top: 10px;
    margin: 0 auto;
  }

  .time-show {
    display: inline-block;
    width: 116px;
    font-size: 12px;
    line-height: 25px;
    background: #0AC5C9;
    color: #FFFFFF;
    text-align: center;
    border-radius: 5px;
    overflow: hidden;

    input {
      width: 100%;
      font-size: 12px;
      color: #fff;
      text-align: center;
    }
  }

  /*第一个进度条*/
  .huan {
    height: 150px;
    width: 150px;
    margin: 0 auto;
    position: relative;
  }

  .text-huan {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    padding-top: 75px;
  }

  /*第二个饼图*/
  #pie,
  #pie2 {
    /*width: 200px;*/
    height: 300px;
    margin: 0 auto;
  }

  .panel table.bgtable {
    width: 100%;
    font-size: 0.12rem;
    line-height: 0.25rem;
    text-align: left;
    background: #F5F6FA;
    border-radius: 6px;
    padding: 0.08rem;
    text-align: center;
  }

  .panel table.bgtable th {
    font-weight: normal;
    color: #008b8e;
    font-size: 0.135rem;
    font-weight: 500;
  }

  .panel table.bgtable .line td {
    padding: 5px 0;
  }

  .geTable {
    width: 100%;
    font-size: 0.12rem;
    line-height: 0.25rem;
    text-align: left;
    /*padding: 5px 10px;*/
  }

  .panel table.geTable th {
    font-weight: normal;
    color: #7484E4;
  }

  .geTable th,
  .geTable td {
    border-bottom: 1px solid #eee;;
  }

  .geTable tr:last-of-type td {
    border: none;
  }

  /* 菜单 */
  .menulist {
    margin-top: 0.3rem;
  }

  .menulist ul {
    display: flex;
    justify-content: space-around;
    text-align: center;
    font-size: 0.12rem;
  }

  .menulist ul img {
    width: 0.35rem;
    display: block;
  }

  .diet_alety {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9990000;
    background: rgba(000, 000, 000, 0.6);

    .diet_aletw {
      width: 78%;
      background: #fff;
      border-radius: 8px;
      position: relative;
      top: 50%;
      margin-top: -1.5rem;
      margin-left: auto;
      margin-right: auto;
      .diet_aleta{
        text-align: center;
        padding: 0.1rem 0;
        border-bottom: 1px solid #e5e5e5;
        width: 100%;
      }
      .diet_aletc {
        padding: 0.15rem 0.15rem 0.25rem 0.15rem;

        p {
          font-size: 0.145rem;
          color: #666;
          margin-top: 0.08rem;
          min-width: 48%;
          display: inline-block;
        }

        img {
          width: 100%;
          max-height: 1.0rem;
          margin-top: 0.1rem;
        }
      }

      .diet_aleto {
        height: 0.42rem;
        line-height: 0.42rem;
        font-size: 0.15rem;
        color: #FFFFFF;
        width: 100%;
        text-align: center;
        background-color: #0AC5C9;
        border-radius:0 0 8px 8px ;
      }
    }
  }

  .yinshhi_list .title:before {
    content: none;
  }

  #navbar .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 2px solid #0AC5C9;
    color: #0AC5C9;
  }

  .mint-badge.is-size-small {
    font-size: 0.125rem;
    background-color: #0AC5C9;
    padding: 0.02rem 0.1rem;
    border-radius: 0.1rem;
  }

  .huiFont {
    color: #484848;
  }

  .light_gray {

    color: #787878;
  }

  #navbar .mint-navbar {
    border-bottom: 1px solid #f1f1f1;
  }

  .remindList:last-child li {
    border-bottom: 0;
  }
  .buttons{
    height: 0.44rem;
    border: 0;
    z-index: 3;
    .add_btns{
      background-color: #0AC5C9;
      width: 100%;
      height: 0.44rem;
      line-height:0.44rem;
      border-radius: 0;
      margin: 0 auto;
    }
  }
  .meal_sort{
    margin-bottom: 0.1rem;
    .mint-cell{
      img{
        border-radius: 4px;
      }
    }
  }
</style>
<style type="text/css">
  .completeState .mt-progress-progress {
    background-color: #EC0000;
  }
</style>
