<template>
  <div style="background: #fff;height: 100vh">
    <mt-header title="晒单">
      <div slot="left">
        <router-link to="/mysunsheet" style="color: initial">
          <mt-button icon="back"></mt-button>
        </router-link>
      </div>
    </mt-header>
    <span class="sun_xian"></span>
    <div class="sun_coat">
      <img src="https://resource.jtsc.club/wc@2x.png">
      <p>晒单成功！</p>
      <router-link tag="span" style="margin-top: 0.48rem" :to="`/sundetail?key=${$route.query.key}`">查看详情</router-link>
      <router-link tag="span" to="/mysunsheet">返回</router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "sun-success"
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
    position: relative;
    top: 0.5rem;
    img{
      width: 0.8rem;
      position: absolute;
      left: 50%;
      margin-left: -0.4rem;
    }
    p{
      color: #404040;
      font-size: 0.16rem;
      text-align: center;
      padding-top: 0.95rem;
    }
    span{
      width: 88%;
      height: 0.44rem;
      color: #FFFFFF;
      display: block;
      margin: 0 auto;
      margin-top: 0.22rem;
      border-radius: 4px;
      text-align: center;
      line-height: 0.44rem;
      font-size: 0.16rem;
      background: #FF1E41;
    }
  }
</style>
