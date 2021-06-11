<template>
    <div>

      <div class="fix_top">
        <mt-header title="我的拼购" class="borderBottom">
          <div slot="left">
            <router-link to="/wx_Entrance/personal" style="color: initial">
              <mt-button icon="back"></mt-button>
            </router-link>
          </div>
        </mt-header>

        <navBar @confirm="triggerList" :param="param"/>

      </div>

      <loadMore :param="param" @triggerGetList="getList" ref="loadMoreE">
          <ul slot="content">
            <li is="productItem" v-for="(item,index) in list" :key="index" :item="item">
              <span class="" slot="type" :class="{'yellow': (item.state == 0),'themeRed': (item.state == 1)}">{{item.stateText}}</span>
              <span slot="dateType">拼购时间：{{item.buyTime}}</span>

              <div class="clear footer" slot="footer">
                <p class="float_left qi themeRed">第{{item.period}}期</p>

                <router-link :to="`personalluckycode?ProPhReSkey=${item.proPhReSkey}&OrderDetailKey=${item.orderDetailId}`" class="float_right">
                  <div class="code-btn text-center">查看幸运专项码</div>
                </router-link>
              </div>
            </li>
          </ul>
      </loadMore>

    </div>
</template>

<script>
    import navBar from "./navbar/navbar.vue";  //导航
    import productItem from "./productItem.vue";  //商品列表
    import loadMore from "@/components/common/loadMore.vue";  //加载更多组件

    export default {
        name: "index",
        data:()=>({
          empty: false,
          noData: false,
          loading: false,    //false  默认触发  true关闭
          isLock: true,
          param:{
            PageSize:10,
            PageCount: 0,
            State: "",  //（"",全部; 0,进行中; 1,揭晓中; 2,已揭晓）
            TimeOrder:"0",  //拼购时间 （0，降序；1，升序）
            PriceOrder:""  //价格排序（0，降序，1，升序）；
          },
          list:[]
        }),
        methods:{
          //获取列表
          getList(success){
            let url = "UserInterface/MyPinGouProductList.ashx";
            this.$post(url,this.param).then((data)=>{
              if(data.rspcode != 1 ){
                return;
              }
              let modelList = data.goodsList;
              if(this.param.PageCount == 1){
                this.list = [...modelList];
              }else{
                this.list = [...this.list,...modelList]
              }
              //加载更多组件触发回调
              if(success){
                success(modelList,this.list)
              }
            })
          },
          //触发加载更多组件getList
          triggerList(){
            this.param.PageCount = 0;
            this.$refs.loadMoreE.getList();
          }
        },
        mounted(){
          // this.getList()
        },
        components:{
          navBar,
          productItem,
          loadMore
        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .code-btn{
    padding: 0 0.15rem;
    line-height: 0.20rem;
    color: white;
    font-size: 0.12rem;
    background: $themeColor;
  }
  .footer{
    margin-top: 0.10rem;
  }
  .content{
    padding-top: 0.88rem;
    ul{
      overflow: auto
    }
  }
  .qi{
    font-size: 14px;
  }

</style>
