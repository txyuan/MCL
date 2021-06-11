<template>
  <div class="selectRegister-root padding-header">
    <mt-header fixed title="注册">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
    <img src="@/assets/images/selectRegisterBg.jpg" alt="" class="bg" width="100%">
    <div class="panel">
      <div class="panel_title">请选择您的身份注册</div>
      <div class="btns">
        <div class="btn-item" :class="{'active': isActive == 1}" @click="toggleClass(1)">
          <img src="@/assets/images/huanzhe.png" alt="" class="icon">
          <img src="@/assets/images/huanzhe@2x.png" alt="" class="icon icon-active">
          <span>我是用户</span>
        </div>
        <div class="btn-item" :class="{'active': isActive == 2}" @click="toggleClass(2)">
          <img src="@/assets/images/yisheng@2x.png" alt="" class="icon">
          <img src="@/assets/images/yisheng.png" alt="" class="icon icon-active">
          <span>我是医生</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: ()=> ({
    isActive: -1,
  }),
  methods: {
    toggleClass(num){
      this.isActive = num
    }
  }
}
</script>

<style lang="scss" scoped>
.selectRegister-root{
  min-height: 100vh;
  background: #F5F5F5;
}
.panel{
  position: relative;
  background: #fff;
  margin: -1.2rem 0.25rem 0 0.25rem;
  padding-top: 0.1rem;
  padding-bottom: 0.5rem;
  border-radius: 0.12rem;
  box-shadow: 0px 0px 10px 0px #E7E7E7;
}
.panel_title{
  padding: 0.3rem 0 0.4rem;
  text-align: center;
  font-size: 0.18rem;
}
.btns .btn-item{
  text-align: center;
  padding: 0.2rem 0;
  background: #F1F1F1;
  margin: 0rem 0.4rem 0.3rem;
  border-radius: 0.1rem;
  .icon{
    width: 0.3rem;
    vertical-align: middle;
    margin-right: 0.15rem;
  }
  .icon-active{
    display: none;
  }
  span{
    vertical-align: middle;
    display: inline-block;
  }
}
.btns .btn-item.active{
  background: #39D1D7;
  color: #fff;
  .icon{display: none;}
  .icon-active{display: inline-block;}
}
</style>