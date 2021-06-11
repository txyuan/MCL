<template>
    <div class="record_root padding-header">
      <mt-header fixed title="我的记录">
        <div slot="left">
            <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
        <div slot="right">
          <router-link to="/extractProduct" class="header-right">提取商品</router-link>
        </div>
      </mt-header>

      <loadMore :param="param" @triggerGetList="loadList" ref="loadMoreE">
        <div class="main" slot="content">
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <p class="time">{{item.AwardsTime}}</p>
              <p class="content">
                运气简直爆棚啦！恭喜您！抽中了{{item.AwardsName}}奖品，快去看看吧！
              </p>
            </li>
          </ul>
        </div>
      </loadMore>

    </div>
</template>

<script>
    import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
    export default {
        name: "record",
        data: () => ({
          param:{
            "PageSize": 10,
            "PageCount": 0,
          },
          list:[]  //{AwardsName:"10积分",AwardsTime:"2018-12-06 11:05:25"}
        }),
        methods:{
          loadList(success){
            let url = "UserInterface/GetUserAwardsList.ashx";
            this.$post(url,this.param).then((data)=>{
              if(data.rspcode != 1 ){
                return;
              }
              let modelList = data.list;
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
        },
        components:{
          loadMore
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/css/base.scss";
  .main{
    li{
      margin: 10px;
      padding: 10px;
      background: #ffffff;
      .time{
        color: $color60;
        margin-bottom: 8px;
        font-size: 0.14rem;
      }
    }
    .f-btn{
      background: #FF1E41;
      font-size: 12px;
      margin-left: 5px;
      padding: 2px 4px;
      color: #ffffff;
      display: inline-block;
    }
  }
  .header-right {
    font-size: 0.14rem;
    color: inherit;
  }
</style>
