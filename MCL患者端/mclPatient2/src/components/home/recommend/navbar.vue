<template>
<div class="navbar">
  <ul>
    <li v-for="(item,index) in lists" :key="index" :class="(index == current) && 'active' " @click="setClass(index,item)">{{item.categoryName}}</li>
  </ul>
</div>
</template>

<script>
    export default {
        name: "navbar",
        data:()=>({
          current: 0
        }),
        props:['lists'],
        methods:{
          setClass(index,item){
            this.current = index;
            this.$emit("toggleTab",item);
          }
        }
    }
</script>

<style scoped lang="scss">
   @import "@/assets/css/base.scss";
  .navbar{
    overflow: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    height: 0.44rem;
    margin-bottom: 0.075rem;
    background: #ffffff;
  }
  .navbar ul{
    padding: 0 0.10rem;
    white-space: nowrap;
    display: inline-block;
  }
  .navbar ul li{
    line-height: 0.44rem;
    height: 0.44rem;
    color: $color40;
    margin: 0 0.15rem;
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    &:first-child{
      margin-left: 0;
    }
    &:last-child{
      margin-right: 0;
    }
    &:after{
      content: "";
      width: 28px;
      height: 2px;
      background: #ffffff;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    &.active{
      color: $themeColor;
    }
    &.active:after{
      background: $themeColor;
    }
  }

</style>
