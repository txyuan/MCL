<template>
    <div>
      <mt-header fixed title="本期参与情况">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>

      <loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-header">

        <div class="in_item" slot="content">
          <mt-cell v-for="(item,index) in list" :key="index" class="in_list" :title="item.userName" :label="item.orderTime">
            <span class="in_icon">购买<i>{{item.buyCount}}</i>份</span>
            <img slot="icon" v-lazy="item.headImageUrl" class="userImg">
          </mt-cell>
        </div>

      </loadMore>

    </div>
</template>

<script>
    import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
    export default {
        name: "index",
        data:()=>({
          param:{
            PageSize: 10,
            PageCount: 0,
            proPhKey: ""
          },
          list: [
            // {headImageUrl: require("@/assets/images/touxiang_default@2x.png"), userName: '用户名', orderTime: '2017-03-28 18:24', buyCount: '3'},
            // {headImageUrl: require("@/assets/images/touxiang_default@2x.png"), userName: '用户名', orderTime: '2017-03-28 18:24', buyCount: '3'},
            // {headImageUrl: require("@/assets/images/touxiang_default@2x.png"), userName: '用户名', orderTime: '2017-03-28 18:24', buyCount: '3'},
            // {headImageUrl: require("@/assets/images/touxiang_default@2x.png"), userName: '用户名', orderTime: '2017-03-28 18:24', buyCount: '3'},
            // {headImageUrl: require("@/assets/images/touxiang_default@2x.png"), userName: '用户名', orderTime: '2017-03-28 18:24', buyCount: '3'},
          ]
        }),
        methods:{
          getList(success){
            let url = "UserInterface/GetParticipationList.ashx";
            let proPhKey = this.$route.params.sKey;
            this.param.proPhKey = proPhKey;
            this.$post(url,this.param).then((data)=>{
              if(data.rspcode != 1 ){
                return;
              }
              let modelList = data.List;
              if(this.param.PageCount == 1){
                // this.$refs.loadMoreE.loading = false;  //打开加载更多组件
                this.list = [...modelList];
              }else{
                this.list = [...this.list,...modelList]
              }
              //加载更多组件触发回调
              if(success){
                success(modelList,this.list)
              }
            })
          }
        },
        created(){

        },
        components:{
          loadMore
        }
    }
</script>

<style scoped>
.in_item{
  border-top: 1px solid #E0E0E0;
}
  .userImg{
    border-radius: 50%;
  }
</style>
