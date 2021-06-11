<template>
<div>
    <div class="yinshhi_list" style="padding-bottom: 0.5rem;">
        <div class="noalready" v-if="dataflag==0">
        <img src="@/assets/images/nowzzz.png"/>
        <p>请稍等，您的饮食方案正在制作中...</p>
        </div>
        <div class="already" v-if="dataflag==1">
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
    data: () => ({
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
      dataflag: -1,
      energyBalance: '',
      actualIntake: '',
      carbohydrateProportion: '',
      fatProportion: '',
      proteinProportion: '',
      aleta: false,
      aletData: {}
    }),
    methods: {
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
      this.eachRecord()
      
    }
  }
</script>
<style scoped lang='scss'>
@import "./index.scss";
</style>