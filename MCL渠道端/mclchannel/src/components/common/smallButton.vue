<template>
    <div class="smallbtnWrap">
      <span class="smallbtn">{{text}}</span>
    </div>
</template>

<script>
    export default {
        name: "small-button",
        props:["text"],
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .smallbtnWrap{
    border: 1px solid $themeColor;
    color: $themeColor !important;
    display: inline-block;
    padding: 0.02rem 0.08rem !important;
    font-size: 0.10rem !important;
    line-height: 1;
  }
</style>
