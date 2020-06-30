<template>
    <div class="content"
         v-infinite-scroll="getList"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">

      <!--  列表元素位置  -->
      <slot name="content"></slot>
      <!--  列表元素位置  -->

      <empty-data v-show="empty"/>
      <div v-show="!empty">
        <div class="nodata page-infinite-loading" v-show="loading">
          <div class="nodata text-center" v-show="noData">亲，已经到底了</div>
          <div class="" v-show="!noData"><mt-spinner :type="3" color="#FF1E41"></mt-spinner>  &nbsp;&nbsp;&nbsp; 加载中...</div>
        </div>
      </div>

    </div>
</template>

<script>
    /*
      ajax的data参数 obj
      param:{
            pagesize:10,
            pagecount: 0
      }
      isDefaultLoading  默认是否加载
      @triggerGetList 触发事件
      包裹loadMore组件的元素不能设置marginHeader
    */
    export default {
        name: "loadMore",
        props:["param","isDefaultLoading"],
        data:()=>({
          empty: false,
          noData: false,
          loading: false,    //false  默认触发  true关闭
          isLock: true,
        }),
        methods:{
          getList(){
            if(!this.isLock){
              return;
            };
            this.isLock = false;
            this.loading = true;  //关闭无限滚动
            this.empty = false;
            this.noData = false;
            this.param.pagecount = this.param.pagecount + 1;
            this.$emit("triggerGetList",(modelList,allList)=>{
              //打开无限滚动
              if(modelList.length != 0){
                this.loading = false;
              }
              //显示没有更多数据
              if((this.param.pagecount >= 2) && (modelList.length == 0)){
                this.noData = true;
              }

              if(allList.length == 0){
                this.empty = true
              }
              this.isLock = true;
            })

          }
        },
        created(){
          if(this.$props.isDefaultLoading == false){
            this.loading = true
          }
        }
    }
</script>

<style scoped>

</style>
