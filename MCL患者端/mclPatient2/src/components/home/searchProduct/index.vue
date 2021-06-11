<template>
    <div>
      <header class="header_search fix_top borderBottom">
        <header-back>
          <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
        </header-back>
        <input type="text" placeholder="请输入搜索内容" class="seach_input" v-model="searchVal">
        <!--<i class="right-del" @click="delInput">搜索</i>-->
        <router-link :to="`/searchShop?search=${this.searchVal}`">
          <i class="sercher_del">搜索</i>
        </router-link>
      </header>

      <div class="content fix_top">
          <!--<p class="tit">猜你想找</p>-->
          <!--<ul class="list clear">-->
            <!--<li class="float_left" v-for="n in 5" :key="n"><span>iPhone X</span></li>-->
          <!--</ul>-->
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data:()=>({
          searchVal:""
        }),
        beforeRouteLeave (to, from, next) {
          if(to.path == "/searchShop"){
            to.meta.keepAlive = false
          }
          next()
        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .header_search{
    padding: 0.08rem 0.1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
  }
  .seach_input{
    height: 26px;
    line-height: 26px;
    flex: 1;
    margin: 0 10px;
    border: none;
    font-family: "Helvetica Neue", "Helvetica", "STHeiTi", "sans-serif";
  }
  .right-del{
    width: 18px;
    height: 18px;
    display: inline-block;
    background: url("https://resource.jtsc.club/search_delete@2x.png") no-repeat center;
    background-size: cover;
  }

  //内容
  .content{
    top: 43px;
    bottom: 0;
    padding: 0.1rem;
    background: white;
    font-size: 0.14rem;
    .tit{
        color: $color90;
        margin-bottom: 10px;
    }
    .list li{
      background: $bgF8;
      color: $color60;
      padding: 6px 10px;
      margin-bottom: 5px;
      margin-right: 5px;
    }
  }
.sercher_del{
  font-size: 0.14rem;
  font-style: normal;
  color: #333;
}
</style>
