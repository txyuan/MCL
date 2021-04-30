<template>
  <div class="page">
      <div class="panel">
          <mt-button type="primary" class="title button-radio" size="large">BMI</mt-button>
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
              重度蛋白质<i></i>能量营养不良
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
.note i{
  display: inline-block;
  width: 12px;
  height: 1px;
  margin: 0 5px;
  background: #333333;
  vertical-align: middle;
}
</style>