<template>
    <div>
      <img src="https://resource.jtsc.club/fanhui_yuan@2x.png" v-on:click="back()" class="return_back" />
      <img :src="listy.goodsImage" class="shopname" />
      <div class="mershopdetail">
        <h2>{{listy.goodsName}}</h2>
        <p>{{listy.content}}</p>
        <span>￥{{listy.marketPrice}}</span>
      </div>
      <div class="shopdpic">
      	<img :src="listy.goodsMemo" />
      </div>
    </div>
</template>

<script>
    export default {
        name: "shopdetail",
        data:()=>({
          listy:[]
        }),
        methods:{
          //返回上一页
          back: function(index) {
            this.$router.back()
          },
          //获取商品信息
          showbg(key,sKey){
            let url = "UserInterface/BusinessUnion/getbusinessProductDetails.ashx";
            let param={
              goodskey:sKey,
              businesskey:key
            };
            this.$post(url,param).then((data) => {
              if(data.rspcode==0){
                return;
              }
              this.listy=data.data;
            })
          }
        },
        mounted(){
          let key = this.$route.params.key;
          let sKey = this.$route.params.skey;
          this.showbg(key,sKey);
        }
    }
</script>

<style scoped lang="scss">
  .return_back{
    position: fixed;
    left: 3%;
    top: 0.1rem;
    width: 0.3rem;
    height: 0.3rem;
    z-index: 9;
  }
  img.shopname,.shopdpic img{
    width: 100%;
  }
  .shopdpic{
      width: 100%;
  }
.mershopdetail{
  background: #fff;
  padding: 0.1rem 3%;
  h2{
    font-size: 0.16rem;
    font-weight: 300;
    color: #333;
  }
  p{
    font-size: 0.14rem;
    color: #666;
    margin-top: 0.06rem;
  }
  span{
    color: #FF7B00;
    font-size: 0.16rem;
    margin-top: 0.1rem;
    display: block;
  }
}
</style>
