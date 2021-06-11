<template>
    <div>
      <div class="zl_ff">
      <mt-header title="证联支付">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <mt-field label="银行卡号：" class="zl_card" placeholder="请输入银行卡号" v-model="idcard"></mt-field>
      <router-link to="/personalreceivingadress">
        <mt-button type="default" class="add_btn" size="large">确认支付</mt-button>
      </router-link>
    </div>
    </div>
</template>

<script>
    export default {
        name: "index",
      data:()=>({
        'idcard':''
      })
    }
</script>

<style scoped>
.zl_ff{
  width: 100%;
  height: 100vh;
  background: #fff;
}
.zl_card{
  border-top: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
}
  .add_btn{
    margin-top: 1.6rem;
  }
</style>
