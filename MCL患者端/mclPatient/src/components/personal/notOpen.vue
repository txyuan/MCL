<template>
  <div style="background: #fff;height: 100vh">
    <mt-header title="联营企业">
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <span class="sun_xian"></span>
    <div class="sun_coat text-center">
      <img src="https://resource.jtsc.club/ok@2x.png" style="width: 1.0rem;height: 1.0rem;">
      <div class="des">
        <p>暂未开放</p>
        <p style="margin-top: 0.04rem;">敬请期待…</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "not-open"
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .sun_xian{
    height: 1px;
    background: #E0E0E0;
    display: block;
  }
  .sun_coat{
    padding-top: 0.75rem;
    .des{
      padding-top: 0.3rem;
    }
    p{
      color: #404040;
      font-size: 0.16rem;
      text-align: center;
      line-height: 1.5;
    }
  }
  .btns>a{
    display: inline-block;
    width: 100%;
  }
  .add_btn{
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>
