<template>
    <!-- 今日饮食 -->
    <div class="yinshhi_list">
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
</template>

<script>
import echarts from 'echarts'

  export default {
    data: () => ({
      ABflag: 1,
      navbarList: [{name: '今日饮食', type: 1}, {name: '饮食处方', type: 2}],
      // 今日饮食
      // todybreakfast: [],
      // todylunch: [],
      // todydinner: [],
      // todymealaddition: [],
      // breakfasttime: '', // 早餐时间
      // lunchtime: '', // 午餐时间
      // dinnertime: '', // 晚餐时间
      // mealadditiontime: '', // 加餐时间

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
      // todayDiet () {
      //   let url = 'UserInterface/SelectTodayDiet.ashx'
      //   this.$post(url).then((data) => {
      //     if (data.rspcode != 1) {
      //       return
      //     }
      //     this.todybreakfast = data.breakfastdata
      //     this.todylunch = data.lunchdata
      //     this.todydinner = data.dinnerdata
      //     this.todymealaddition = data.mealadditiondata
      //     if (data.breakfastdata.breakfastdatalist.lenth > 0) {
      //       this.breakfasttime = data.breakfastdata.breakfastdatalist[0].breakfast_time
      //     }
      //     if (data.lunchdata.lunchdatalist.lenth > 0) {
      //       this.lunchtime = data.lunchdata.lunchdatalist[0].lunch_time
      //     }
      //     if (data.dinnerdata.dinnerdatalist.lenth > 0) {
      //       this.dinnertime = data.dinnerdata.dinnerdatalist[0].dinner_time
      //     }
      //     if (data.mealadditiondata.mealadditiondatalist.lenth > 0) {
      //       this.mealadditiontime = data.mealadditiondata.mealadditiondatalist[0].mealaddition_time
      //     }
      //   })
      // },
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
      // eachRecord () {
      //   let url = 'UserInterface/SelectTodayDietPlan.ashx'
      //   this.$post(url).then((data) => {
      //     if (data.rspcode != 1) {
      //       return
      //     }
      //     this.dataflag = data.dataflag
      //     this.targetenergy = data.targetenergy
      //     this.protein = data.protein
      //     this.fat = data.fat
      //     this.carbohydrate = data.carbohydrate
      //     this.breakfast = data.breakfastdata
      //     this.breakfastplusdata = data.breakfastplusdata
      //     this.lunch = data.lunchdata
      //     this.lunchplusdata = data.lunchplusdata
      //     this.dinner = data.dinnerdata
      //     this.actualIntake = data.actualIntake
      //     this.energyBalance = data.energyBalance
      //     this.mealaddition = data.mealadditiondata
      //     this.carbohydrateProportion = data.carbohydrateProportion
      //     this.fatProportion = data.fatProportion
      //     this.proteinProportion = data.proteinProportion
      //     if (data.breakfastdata && data.breakfastdata.length != 0) {
      //       this.breakfast_time = data.breakfastdata[0].breakfast_time
      //     }
      //     if (data.breakfastplusdata && data.breakfastplusdata.length != 0) {
      //       this.breakfastplus_time = data.breakfastplusdata[0].breakfast_time
      //     }
      //     if (data.lunchdata && data.lunchdata.length != 0) {
      //       this.lunch_time = data.lunchdata[0].lunch_time
      //     }
      //     if (data.lunchplusdata && data.lunchplusdata.length != 0) {
      //       this.lunchplus_time = data.lunchplusdata[0].lunch_time
      //     }
      //     if (data.dinnerdata && data.dinnerdata.length != 0) {
      //       this.dinner_time = data.dinnerdata[0].dinner_time
      //     }
      //     if (data.mealadditiondata && data.mealadditiondata.length != 0) {
      //       this.mealaddition_time = data.mealadditiondata[0].mealaddition_time
      //     }
      //   })
      // },
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
      // this.todayDiet()
      // this.eachRecord()
      this.pie()
      this.pie2()
      if (this.$route.query.ABflag == 2) {
        this.ABflag = 2
      }
    }
  }
</script>
<style scoped lang='scss'>
@import "./index.scss";
</style>