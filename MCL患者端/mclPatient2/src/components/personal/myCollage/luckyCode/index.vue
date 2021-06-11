<template>
    <div>
      <mt-header title="幸运专项码" fixed class="borderBottom">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <div class="padding-header">
        <loadMore :param="param" @triggerGetList="loadList" ref="loadMoreE">
          <div slot="content">
            <ul>
              <li class="borderBottom clear" v-for="item in list">
                <div class="item" v-for="val in item" :class="{'themeRed': val.IsWinnerCode === '2' }">{{val.ProBuyCode}}</div>
              </li>
            </ul>
          </div>
        </loadMore>
      </div>
    </div>
</template>

<script>
    import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
    export default {
        name: "index",
        data:()=>({
            param:{
              PageSize: 60,
              PageCount: 0,
              ProPhReSkey:"",
              OrderDetailKey:""
            },
            list: []
        }),
        methods:{
          //获取列表
          loadList(success){
            let url = "/UserInterface/GetProductPhBuyCode.ashx";
            if(this.param.PageCount == 1){
              this.list = [];
            }
            this.$post(url,this.param).then((data)=>{
              if(data.rspcode != 1 ){
                return;
              }
              let modelList = this.makeList(data.subjectList);
              this.list = [...this.list,...modelList]
              setTimeout(()=>{
                //加载更多组件触发回调
                if(success){
                  success(modelList,this.list)
                }
              },500)

            })
          },
          //生成新数组
          makeList(originalArr){
            let allArr = [];
            let arr = [];
            originalArr.forEach((item,index)=>{
              if( (index%3) == 0){
                arr = []
              };
              if( ((index%3) == 2) || (originalArr.length == (index+1)) ){
                allArr.push(arr)
              };
              arr.push(item)
            })
            return allArr;
          }
        },
        mounted(){
          let {OrderDetailKey, ProPhReSkey} = this.$route.query;
          this.param.ProPhReSkey = ProPhReSkey;
          this.param.OrderDetailKey = OrderDetailKey;
        },
        components:{
          loadMore
        }
    }
</script>

<style scoped lang="scss">
  li{
       background: #ffffff;
       padding: 0.12rem 0;
       min-height: 43px;
       box-sizing: border-box;
       .item{
         float: left;
         width: 33.3333%;
         text-align: center;
       }
  }
</style>
