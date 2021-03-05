<template>
<div>
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive" />
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive" />

  <div id="tabbar">
    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item v-for="(item,index) in tabList" :key="index" :id="item.path">
        <!--<img slot="icon" :src="item.icon">-->
        <router-link :to="'/wx_Entrance/'+item.path" tag="div" class="tab-bar-link">
          <i class="mint-tab-item-icon" :class="item.pathy">icon</i>
          <p>{{item.name}}</p>
          <!--<span class="badge" v-if="item.name=='购物车'">{{proCount}}</span>-->
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</div>
</template>

<script>
  import Bus from "@/assets/js/updateShopCar.js";  //跟新购物车数量
  export default {
    name:"wx_Entrance",
    data:()=>({
      proCount: "0",  //商品数量
      selected: "",
      tabList:[
        {name:"首页",path:"home",pathy:"home"},
			  {name:"自测",path:"selfTest",pathy:"mesage"},
				{name:"社区",path:"community",pathy:"community"},
				{name:"商城",path:"service",pathy:"service"},
//      {name:"消息",path:"mesage",pathy:"mesage"},
        {name:"我的",path:"personal",pathy:"personal"}
      ]
    }),
    methods:{
      //获取商品数量
      getShopChatQuantity(){
        let url = "/UserInterface/GetShopChatQuantity.ashx";
        // this.$post(url).then((data)=>{
        //   this.setShopChatQuantity(data.proCount)
        // })
      },
      setShopChatQuantity(val){
        this.proCount = val;
      }
    },
    created(){
      Bus.$on("updateShop",()=>{
      	//有登录信息才能获取购物车数量，主要针对通过分享进来的（未登录）用户，防止系统异地登录，跳转登录页
      	if(localStorage.userInfo){
      	    this.getShopChatQuantity();
      	}
      })
      if(localStorage.userInfo){
    	  Bus.$emit("updateShop")
      }
    },
    activated(){
      if(localStorage.userInfo){
    	  Bus.$emit("updateShop")
      }
    },
    destroyed(){
      //移除updateShop事件避免多次注册事件
      Bus.$off("updateShop")
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/common.scss";
  .tab-bar-link.router-link-active{
      color: #F78335;
  }
  .tab-bar-link{
      position: relative;
      color: #636768;
     .mint-tab-item-icon{
			 width: 22px;
			 height: 22px;
       display: inline-block;
       background: url("./../../assets/images/homedl.png") no-repeat center;
       background-size: cover;
       line-height: 999;
       overflow: hidden;
       margin-bottom: 4px;
       &.home{background-image: url("./../../assets/images/homedl.png")}
       &.service{background-image: url("./../../assets/images/shangc.png")}
       &.community{background-image: url("./../../assets/images/shequ@2x.png")}
       &.mesage{background-image: url("./../../assets/images/xiaoxi@2x.png")}
       &.personal{background-image: url("./../../assets/images/wode@2x.png")}

    }
    &.router-link-active .mint-tab-item-icon{
      &.home{background-image: url("./../../assets/images/homedla.png")}
      &.service{background-image: url("./../../assets/images/shangca.png")}
      &.community{background-image: url("./../../assets/images/shequ@2xa.png")}
      &.mesage{background-image: url("./../../assets/images/xiaoxi@2xa.png")}
      &.personal{background-image: url("./../../assets/images/wode@2xa.png")}
    }
    .badge{
      display: inline-block;
      min-width: 18px;
      height: 18px;
      line-height: 18px;
      font-size: 10px;
      @include radio(10px);
      overflow: hidden;
      color: white;
      text-align: center;
      background-color: $themeColor;
      position: absolute;
      top: -2px;
      right: 13%;
    }
  }
</style>
