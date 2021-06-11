<template>
    <div class="padding-header">
      <div class="fix_top">
        <mt-header title="晒单">
          <div slot="left">
            <header-back>
              <mt-button icon="back"></mt-button>
            </header-back>
          </div>
        </mt-header>
      </div>

      <loadMore :param="param" @triggerGetList="getList" ref="loadMoreE">
        <div class="sun_main clear" slot="content">
          <div class="item" v-for="(item,index) in list" :key="index">
            <div class="sun_list">
              <img v-lazy="item.ImageUrl" @click="sunshop(item)" />
              <h3>{{item.Remark}}</h3>
              <p>奖励积分：{{item.SharePoint}}</p>
              <!-- <div class="sun_name">
                 <img :src="item.uimg" />
                 <span>{{item.unames}}</span>
                 <div @click="clickz">
                   <label v-if="item.stat==0"></label>
                   <label class="act" v-else></label>
                 </div>
               </div>-->
            </div>
          </div>
        </div>
      </loadMore>
    </div>
</template>

<script>
    import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
    // import imgs from "@/assets/images/wc@2x.png";
    export default {
        name: "index",
        data:()=>({
          imgs:'https://resource.jtsc.club/wc@2x.png',
          list:[],
          param:{
            PageSize:10,
            PageCount: 0
          }
        }),
        methods:{
          //获取列表
          getList(success){
            let url = "UserInterface/GetOrderShareList.ashx";
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
          sunshop(item){
            this.$router.push(`/sundetail?key=${item.sKey}`);
          }
        },
        activated(){
          if(this.list.length > 0){
            this.$refs.loadMoreE.loading = false;//打开分页
          }
        },
        deactivated(){
          this.$refs.loadMoreE.loading = true;//关闭分页
        },
        beforeRouteLeave (to, from, next) {
          // 导航离开该组件的对应路由时调用
          let keepAlive = (to.name == "sundetail") ? true: false;
          this.$route.meta.keepAlive = keepAlive;
          next()
        },
        components:{
          loadMore
        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .sun_main{
    margin: 0 auto;
    padding: 0 3px;
    column-gap: 0;
    counter-reset: item-counter;
    column-count: 2;
  }
  .leftList,.rightList{
    width: 50%;
    float: left;
    box-sizing: border-box;
  }
  .leftList{
    padding-right: 3px;
  }
  .rightList{
    padding-left: 3px;
  }
  .sun_main .item{
    padding: 3px;
    }
  .sun_list{
    border: 1px solid #eee;
    background: #fff;
    padding-top: 3px;
    padding-bottom: 3px;
    border-radius: 8px;
    box-sizing: border-box;
    -webkit-column-break-inside: avoid;
    overflow: hidden;
    img{
      width: 90%;
      display: block;
      margin: 0 auto;
    }
    h3{
      font-size: 0.13rem;
      font-weight: normal;
      width: 90%;
      margin: 0 auto;
      margin-top: 0.12rem;
    }
    p{
      font-size: 0.13rem;
      color: #FF1E41;
      width: 90%;
      margin: 0 auto;
      margin-top: 0.05rem;
    }
    .sun_name{
      width: 90%;
      margin: 0 auto;
      margin-top: 0.1rem;
      overflow: hidden;
      img{
        height: 0.2rem;
        width: 0.2rem;
        border-radius: 50%;
        float: left;
      }
      span{
        color: #666666;
        font-size: 0.12rem;
        display: block;
        float: left;
        line-height: 0.22rem;
        margin-left: 0.05rem;
      }
      div{
        float: right;
        width: 0.18rem;
        height: 0.18rem;
        label{
          width: 0.18rem;
          height: 0.18rem;
          background: url("https://resource.jtsc.club/zan_d@2x.png") no-repeat center center;
          background-size: 0.18rem;
          display: block;
          &.act{
            background: url("https://resource.jtsc.club/zan_d_h@2x.png") no-repeat center center;
            background-size: 0.18rem;
          }
        }
      }

    }
  }
</style>
