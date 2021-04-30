<template>
  <div class="page">
      <div class="panel">
          <mt-button type="primary" class="title button-radio" size="large">每日实际摄入能量</mt-button>
          <p class="radio-title">请选择您每天饮食情况</p>
          <div class="radio—item" v-for="item in list" :key="item.id" @click="currentId = item.id">
              <span class="radio" :class="{'checked': item.id == currentId}"></span>
              <div class="content">
                  <div class="label">{{item.label}}</div>
                  <div class="des">{{item.des}}</div>
              </div>
          </div>
          
          <mt-button type="primary" class="blue-button" size="large">确&nbsp;&nbsp;定</mt-button>

          <div class="note">
              能量<span>560</span>kcal，蛋白质<span>18</span>g
          </div>
          <div class="link">
              <a href="">立即补充营养</a>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data: () => ({
        currentId: "-1",
        list: [
            {id: "0", label: "一天只能喝点纯流食1000ml", des: "如喝清鸡汤（750ml）+ 果汁（250ml）等"},
            {id: "1", label: "一天三餐半流食", des: "如粥3碗+蔬菜2两+1个鸡蛋（50g）"},
            {id: "2", label: "一天三餐半流食+250ml", des: "如粥3碗+蔬菜2两+1个鸡蛋（50g）+喝250ml奶"},
            {id: "3", label: "一天二餐半流食", des: "如粥2碗+一餐正餐，吃1两肉、半斤蔬菜、1个鸡蛋（50g），喝250ml奶"},
            {id: "4", label: "一天一餐半流食", des: "如粥+二餐正餐，吃1两肉少油脂、半斤蔬菜、1碗浓鸡汤（250g）"},
            {id: "5", label: "一天三餐普食", des: "如6两主食+3两肉及相应的油脂25g，1斤蔬菜、1个鸡蛋（50g），250ml奶、1碗浓鸡汤（250g）、及加餐水果"},
        ]
    })
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
.panel .blue-button{
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
}
.panel .note{
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
}
</style>