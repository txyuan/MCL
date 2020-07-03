<template>
    <div>
      <div class="suc_ff">
      <mt-header title="佣金提现">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <div class="suc_img">
        <img src="https://resource.jtsc.club/select_click@2x.png">
      </div>
      <p class="suc_pp">提交成功，将在24小时内到账</p>
      <router-link to="/wx_Entrance/home">
        <mt-button type="default" class="add_btn" size="large">去首页逛逛</mt-button>
      </router-link>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
  .suc_ff{
    width: 100%;
    height: 100vh;
    background: #fff;
  }
.suc_img{
  padding-top: 0.56rem;
  background: #fff;
  position: relative;
  padding-bottom: 0.8rem;
  border-top: 1px solid #E0E0E0;
}
.suc_img img{
  position: absolute;
  left: 50%;
  width: 0.8rem;
  margin-left: -0.4rem;
}
  .suc_pp{
    width: 100%;
    background: #fff;
    text-align: center;
    color: #404040;
    padding-top: 0.2rem;
  }
</style>
