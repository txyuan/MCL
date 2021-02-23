<template>
  <div>
      <mt-header title="重量估算" fixed>
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <div class="wigtsin_bg">
          <img src="../../../assets/images/wigtsin_1.jpg" width="100%"/>
          <img src="../../../assets/images/wigtsin_2.jpg" width="100%"/>
          <img src="../../../assets/images/wigtsin_3.jpg" width="100%"/>
          <img src="../../../assets/images/wigtsin_4.jpg" width="100%"/>
          <img src="../../../assets/images/wigtsin_5.jpg" width="100%"/>
          <img src="../../../assets/images/wigtsin_6.jpg" width="100%"/>
          <img src="../../../assets/images/wigtsin_7.jpg" width="100%"/>
        </div>
  </div>
</template>

<script>
  export default {
    name: 'weightEstimation'
  }
</script>

<style scoped lang="scss">
  .mint-header {
    border-bottom: 1px solid #e5e5e5;
    height: 0.44rem;
  }
  .wigtsin_bg{
    background-color: #FFFFFF;
    padding-top: 0.44rem;
  }
  .wigtsin_bg img{
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>
