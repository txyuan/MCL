<template>
    <div>
      <mt-header fixed title="评论">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>

      <div class="com_textcont">
        <loadMore :param="param" @triggerGetList="getComment" ref="loadMoreE" class="padding-header">
          <div class="com_cont" slot="content" style="margin-bottom: 0">
            <div class="com_list" v-for="(item,index) in list">
              <div class="com_name">
                <img v-lazy="item.HeadImage" />
                <span>{{item.NickName}}</span>
              </div>
              <p class="com_text">{{item.EvaluateContent}}</p>
              <ul class="com_product"  v-if="item.Picture != ''">
                <li><img  v-lazy="item.Picture"/></li>
              </ul>
              <p class="com_type">
                <span>{{item.type}}</span>
                <label>{{item.EvaluateTime}}</label>
              </p>
            </div>
          </div>
        </loadMore>
      </div>
      <!--<div class="detail_btn">-->
        <!--<span @click="addgwc">加入购物车</span>-->
        <!--<label @click="addgwc">立即拼购</label>-->
      <!--</div>-->
    </div>
</template>

<script>
    import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
    export default {
        name: "index",
        data:()=>({
          selected: 'tab-container1',
          isActive: 0,
          // items: [
          //   { NickName: '昵称昵称',EvaluateContent:'内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容读卡机打开',HeadImage:require("@/assets/images/touxiang_default@2x.png"),EvaluateContent:"",type:'黑色；XL',EvaluateTime:'2017-03-28 18:23' },
          //   { NickName: '昵称昵称',EvaluateContent:'内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',HeadImage:require("@/assets/images/touxiang_default@2x.png"),EvaluateContent:"",type:'黑色；XL',EvaluateTime:'2017-03-28 18:23' }
          // ],
          goodsInfo:{},
          param:{
            PageSize: 10,
            PageCount: 0,
            ProKey: ""
          },
          list:[]
        }),
        methods:{
          back(){
            this.$router.back()
          },
          //获取评论
          getComment(success){
            let url = "/UserInterface/GetProductEvaluateList.ashx";
            let ProKey = this.$route.params.sKey;
            this.param.ProKey = ProKey;
            console.log(  )
            this.$post(url,this.param).then((data)=>{
              this.$Indicator.close()
              if(data.rspCode != 1 ){
                return;
              }
              let modelList = data.data;
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
        components:{
          loadMore
        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .com_coment{
       width: 100%;
       background: #fff;
       position: fixed;
       top: 0;
       left: 0;
       z-index: 9;
   }
  .com_cont,.com_detail{
    margin-top: 1px;
    margin-bottom: 0.5rem;

  }
  .com_list{
    width: 94%;
    margin: 0 auto;
    border-bottom: 1px solid #eee;
  }
  .com_cont{
    background: #fff;
  }
  .com_name{
    width: 98%;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 0.07rem;
  }
.com_name img{
  height: 0.22rem;
  margin-right: 0.08rem;
  float: left;
}
.com_name span{
  display: block;
  float: left;
  color: #202020;
  line-height: 0.22rem;
  font-size: 0.14rem;
}
  .com_text{
    @include ellipsis(2);
    width: 98%;
    margin: 0 auto;
    font-size: 0.14rem;
    color: #202020;
    padding-top: 0.1rem;
  }
  .com_product{
    overflow: hidden;
    width: 98%;
    margin: 0 auto;
    margin-top: 0.08rem;
  }
  .com_product li{
    overflow: hidden;
  }
  .com_product li:first-child{
    margin-left: 0;
  }
  .com_product li img{
    height: 50px;
  }
  .com_type{
    width: 98%;
    margin: 0 auto;
    height: 0.34rem;
  }
  .com_type span,.com_type label{
    display: block;
    color: #909090;
    line-height: 0.34rem;
    font-size: 0.13rem;
    float: left;
  }
  .com_type label{
    float: right;
  }
  .detail_btn{
    width: 100%;
    height: 0.5rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    border-top: 1px solid #E0E0E0;
  }
  .detail_btn span{
    width: 33%;
    background: #FFA51E;
  }
  .detail_btn label{
    width: 58%;
    background: #FF1E41;
  }
  .detail_btn span,.detail_btn label{
    height: 0.4rem;
    display: block;
    float: left;
    margin-left: 3%;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    line-height: 0.4rem;
    margin-top: 0.05rem;
    font-size: 0.18rem;
  }
  .com_bot{
    font-size: 0.14rem;
    color: #999;
    width: 100%;
    text-align: center;
    padding-top: 0.12rem;
    background: #F8F8F8;
  }
</style>
