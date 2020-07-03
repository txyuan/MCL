<template>
    <li class="marginTop5">
        <div class="tit">
          <p><slot name="type"></slot></p>
          <p><slot name="dateType"></slot></p>
        </div>
        <productContent :item="item" />
        <slot name="footer"></slot>
    </li>
</template>

<script>
  import productContent from "./productContent.vue"
  export default {
        name: "product-item",
        props:["item"],
        components:{
          productContent
        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  li{
    padding: 10px;
    background: #ffffff;
    .tit{
      display: flex;
      justify-content: space-between;
      font-size: 0.14rem;
      padding: 0.05rem 0 0.1rem 0;
      color: $color60;
    }
  }

</style>
