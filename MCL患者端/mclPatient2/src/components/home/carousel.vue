<template>
<div>
  <mt-swipe :auto="4000" style="height: 1.6rem;" class="swiper" >
    <mt-swipe-item v-for="(item,index) in list" :key="index">
      <img v-lazy="item.goodsImage" src="" alt="">
    </mt-swipe-item>
  </mt-swipe>
</div>
</template>

<script>
    export default {
        name: "carousel",
        data:()=>({
          list:[{goodsImage:"",goodsId:"",goodsName:""}]
        }),
        methods:{
          banner(){
            let url = "UserInterface/mall/getCategory.ashx";
            let paramy = {
              "areaCode": '341802'
            }
            this.$post(url,paramy).then((data)=>{
              this.list = data.banner;
            })
          }
        },
        mounted(){
            this.banner();
        }
    }
</script>

<style scoped>
  /*懒加载图片的背景*/
  img[lazy=loading],img[lazy=error] {
    background: url( "https://resource.jtsc.club/zwt_banner@2x.png") no-repeat center;
    background-size: cover;
  }
  img{
    width: 100%;
    height: 1.6rem;
  }
</style>
