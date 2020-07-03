<template>
    <div class="nav_allbb">
      <div class="nav_bb">
        <p>为您推荐</p>
      </div>
      <div class="nav_bb">
        <p>选择分类</p>
        <!--<div class="navsx">-->
          <!--<ul>-->
            <!--<li>附近</li>-->
            <!--<li>附近</li>-->
            <!--<li>附近</li>-->
            <!--<li>附近</li>-->
            <!--<li>附近</li>-->
            <!--<li>附近</li>-->
            <!--<li>附近</li>-->
          <!--</ul>-->
          <!--<ol>-->
            <!--<li>1.0km</li>-->
            <!--<li>1.0km</li>-->
            <!--<li>1.0km</li>-->
            <!--<li>1.0km</li>-->
            <!--<li>1.0km</li>-->
            <!--<li>1.0km</li>-->
            <!--<li>1.0km</li>-->
            <!--<li>1.0km</li>-->
          <!--</ol>-->
        <!--</div>-->
      </div>
      <div class="nav_bb">
        <p>选择分类</p>
      </div>
      <div class="nav_bb">
        <p>选择分类</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "navbar2"
    }
</script>

<style scoped lang="scss">
.nav_allbb{
  overflow: hidden;
  .nav_bb{
    width: 25%;
    background: #fff;
    float: left;
    height: 44px;
    p{
      text-align: center;
      line-height: 45px;
      border-bottom: 1px solid #d9d9d9;
      font-size: 0.15rem;
      color: #666;
      background: url("");
    }
    .navsx{
      width: 100%;
      left: 0;
      top:89px;
      position: fixed;
      overflow: hidden;
      ul{
        width: 40%;
        background: #fff;
        float: left;
        text-align: center;
        max-height: 2.64rem;
        overflow-y: auto;
        li{
          font-size: 0.15rem;
          color: #666;
          height: 0.44rem;
          line-height: 0.45rem;
        }
      }
      ol{
        width: 60%;
        float: left;
        text-align: center;
        background: #FAFAFA;
        max-height: 2.64rem;
        overflow-y: auto;
        li{
          font-size: 0.15rem;
          color: #666;
          height: 0.44rem;
          line-height: 0.45rem;
        }
      }
    }
  }
}
</style>
