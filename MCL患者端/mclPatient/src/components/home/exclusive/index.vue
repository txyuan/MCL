<template>
    <div>
      <mt-header fixed title="积分专享">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <div class="exc_list marginHeader">
        <div class="exc_item" v-for="(item,index) in items">
          <img :src="item.pic" />
          <p>{{item.names}}</p>
          <label>{{item.jif}}</label>
          <span>立即兑换</span>
        </div>
      </div>
      <img src="https://resource.jtsc.club/gotop@2x.png" class="exc_top" />
    </div>
</template>

<script>
    export default {
        name: "index",
        data:()=>({
          items: [
            // { pic: require("@/assets/images/zwt_zhong@2x.png"),names:'商品名称商品名称商品名称商品名称',jif:'1238743积分' },
          ]
        })
    }
</script>

<style scoped>
  .exc_top{
    width: 0.44rem;
    position: fixed;
    right: 4%;
    bottom: 14%;
  }
  .exc_list{
    overflow: hidden;
  }
.exc_item{
  width: 48%;
  float: left;
  background: #fff;
  border: 1px solid #eee;
  padding-bottom: 0.1rem;
  box-sizing: border-box;
  margin: 0.06rem 0 0 1.3333333%;
}
  .exc_item img{
    width: 100%;
    height: 1.78rem;
  }
  .exc_item p{
    width: 92%;
    margin: 0 auto;
    font-size: 0.15rem;
    color: #202020;
    padding-top: 0.05rem;
  }
  .exc_item label{
    width: 92%;
    margin: 0 auto;
    color: #FF1E41;
    margin-top: 0.08rem;
    display: block;
  }
  .exc_item span{
    display: block;
    width: 92%;
    margin: 0 auto;
    background: #FF1E41;
    color: #fff;
    font-size: 0.15rem;
    text-align: center;
    line-height: 0.32rem;
    height: 0.3rem;
    border-radius: 4px;
    margin-top: 0.08rem;
  }
</style>
