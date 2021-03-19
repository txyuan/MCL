<template>
  <div class="padding-header">
    <mt-header title="申请售后" fixed class="borderBottom">
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div class="content">
        <div>
            <productOrderItem class="productRow"/>
            <div class="cell_group">
                <mt-cell title="退款原因" is-link>
                    <span>请选择</span>
                </mt-cell>
                <mt-cell title="退款金额" class="left">
                    <span class="yellow">¥360.00</span>
                </mt-cell>
            </div>
            <div class="note">
                不可修改，最多¥360.00，含发货邮费¥0.00
            </div>
            <div class="filed_group">
                <mt-field label="退款说明" placeholder="选填，最多200字" class="borderBottom"></mt-field>
            </div>
        </div>
    </div>
    <div class="fix_bottom">
        <mt-button type="primary" class="theme-button" size="large" @click.native="submit">提交</mt-button>
    </div>
  </div>
</template>

<script>
import productOrderItem from './productOrderItem.vue'
export default {
  props: ['itemData'],
  data: () => ({
      param: {}
  }),
  components: {
    productOrderItem
  }
};
</script>

<style lang="scss">
.cell_group{
    margin-top: 0.15rem;
    a.mint-cell{
        position: relative;
        min-height: 0.48rem;
    }
    .mint-cell-wrapper{
        font-size: 16px;
        color: #000;
        padding-left: 0.2rem;
    }
    a.mint-cell::after{
        background-color: #000;
        content: " ";
        opacity: 0.1;
        right: 0;
        bottom: 0;
        left: 0.2rem;
        position: absolute;
        height: 1px;
    }
    a.mint-cell:last-child::after{
        opacity: 0;
    }
    a.mint-cell.left .mint-cell-title{
        flex: none;
        width: 105px;
    }
}
.filed_group{
   .mint-cell-wrapper{
      padding-left: 0.2rem; 
   }
   .mint-cell-value input{
       font-size: 0.14rem;
       border: 0;
       color: #999;
   }
   .mint-cell-value input::placeholder{
       color: #999;
   }
}
.fix_bottom {
    padding: 0;
    .theme-button {
        height: 48px;
    }
}
</style>
<style scoped>
.content{
    padding-top: 0.1rem;
}
.note{
    padding-left: 0.2rem;
    line-height: 0.4rem;
    font-size: 0.12rem;
    color: #999;
}
</style>