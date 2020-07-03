<template>
    <li class="" @click="click()">
      <div class="item active"><div><p>{{item.categoryName}}</p><span> {{item.goodscount}}</span></div></div>
    </li>
</template>

<script>
    export default {
        name: "navbarItem",
        props:["item"],
        methods:{
          click(){
            if(this.$listeners.clickItem) {
              this.$emit('clickItem');
            }
          }
        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  li{
    width: 25%;
    padding: 0.05rem 0.05rem 0;
    color: $color60;
    box-sizing: border-box;
    font-size: 0.14rem;
    white-space: nowrap;
    .item{
      background: $bgF8;
      text-align: center;
      padding: 0.05rem 0;
      height: 0.37rem;
      display: flex;
      align-items: center;
      justify-content: center;
      p{margin-bottom: 0.02rem}
    }
    &.active{
      color: $themeColor;
    }
    &.active .item{
      background: $themeColor2;
    }
  }
</style>
