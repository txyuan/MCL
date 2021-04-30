<template>
  <div class="page home">
      <!-- <div class="panel">

      </div> -->
      <div class="btn-panal">
          <mt-button type="primary" class="button-radio" size="large" @click="$router.push({name: 'singlePage_height'})">标准体重</mt-button>
          <mt-button type="primary" class="button-radio" size="large" @click="$router.push({name: 'singlePage_BMI'})">BMI</mt-button>
          <mt-button type="primary" class="button-radio" size="large" @click="$router.push({name: 'singlePage_protein'})">能量和蛋白质计算</mt-button>
          <mt-button type="primary" class="button-radio" size="large" @click="$router.push({name: 'singlePage_intakeNenrgy'})">每日实际摄入能量</mt-button>
          <mt-button type="primary" class="button-radio" size="large" @click="$router.push({name: 'singlePage_protein'})">每日所需要蛋白质</mt-button>
          <mt-button type="primary" class="button-radio" size="large" @click="$router.push({name: 'singlePage_water'})">每日所需最低饮水量</mt-button>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "./index.scss";

</style>