<template>
  <div class="page">
      <div class="panel">
          <mt-button type="primary" class="title button-radio" size="large">标准体重</mt-button>
          <div class="input_item">
              <div class="name">身高<span>（cm）</span></div>
              <input type="tel" placeholder="请输入您的身高">
          </div>
          <div class="input_item">
              <div class="name">体重<span>（kg）</span></div>
              <input type="tel" placeholder="请输入您的体重">
          </div>
          
          <mt-button type="primary" class="blue-button" size="large">确&nbsp;&nbsp;定</mt-button>

          <div class="note">
              您的正常体重为<span>56</span>kg
          </div>
          <div class="link">
              <a href="">立即补充营养</a>
          </div>
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