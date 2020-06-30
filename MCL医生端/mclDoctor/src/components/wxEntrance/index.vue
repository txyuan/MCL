<template>
<div>
  <router-view />

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
        {name:"患者",path:"home",pathy:"home"},
				{name:"分享",path:"share",pathy:"share"},
        {name:"动态",path:"dynamic",pathy:"dynamic"},
				{name:"消息",path:"news",pathy:"news"},
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
    mounted: function(){
    	if (localStorage.userInfo) {
				let UserKey = JSON.parse(localStorage.userInfo).UserKey;
				let SessionId = JSON.parse(localStorage.userInfo).SessionId;
				this.tabList[1].path = `share?title=分享&UserKey=${UserKey}&SessionId=${SessionId}`
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
      color: #4A8EF4;
  }
  .tab-bar-link{
      position: relative;
      color: #636768;
     .mint-tab-item-icon{
			 width: 22px;
			 height: 22px;
      display: inline-block;
      background: url("./../../assets/images/shouye@2x.png") no-repeat center;
      background-size: cover;
      line-height: 999;
      overflow: hidden;
      margin-bottom: 4px;
      &.home{background-image: url("./../../assets/images/shouye@2x.png")}
      &.share{background-image: url("./../../assets/images/fenxiang@2x.png")}
      &.dynamic{background-image: url("./../../assets/images/dongtai@2x.png")}
      &.news{background-image: url("./../../assets/images/xiaoxi@2x.png")}
			&.personal{background-image: url("./../../assets/images/wode@2x.png")}
    }
    &.router-link-active .mint-tab-item-icon{
      &.home{background-image: url("./../../assets/images/shouye_ok@2x.png")}
      &.share{background-image: url("./../../assets/images/fenxiang_ok@2x.png")}
      &.dynamic{background-image: url("./../../assets/images/dongtai_ok@2x.png")}
      &.news{background-image: url("./../../assets/images/xiaoxi_ok@2x.png")}
			&.personal{background-image: url("./../../assets/images/wode_ok@2x.png")}
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
