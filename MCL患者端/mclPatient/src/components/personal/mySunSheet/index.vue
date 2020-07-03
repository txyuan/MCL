<template>
  <div>
    <div class="fix_top">
      <mt-header title="我的晒单" class="borderBottom">
        <div slot="left">
          <router-link to="/wx_Entrance/personal"  style="color: initial">
            <mt-button icon="back"></mt-button>
          </router-link>
        </div>
      </mt-header>

      <!-- mt-navbar -->
      <div id="navbar">
        <mt-navbar>
          <mt-tab-item  id="" v-for="item in tabs" :key="item.type" :class="(param.Status == item.type) && 'is-selected'" @click.native="tab(item.type)"><p>{{item.name}}</p></mt-tab-item>
        </mt-navbar>
      </div>
    </div>

    <div id="content" style="padding-top: 0.87rem">
      <!-- tab-container -->
      <loadMore :param="param" @triggerGetList="shoplist" ref="loadMoreE">
        <mt-tab-container slot="content">
          <mt-tab-container-item>
            <div class="shop">
              <div class="shop_list" v-for="(item,index) in list" :key="index" :item="item">
                <p>
                <span>当前状态：
                  <i class="themeRed" v-if="item.shareKey == ''">待晒单</i>
                  <i v-else>已晒单</i>
                </span>
                  <label>揭晓时间：
                    <i>{{item.endTime}}</i>
                  </label>
                </p>
                <div class="shop_shop">
                  <img :src="item.goodsImage" />
                  <div class="shop_sname">
                    <p>
                      <span>[{{item.proPhNumber}}期]</span>
                      {{item.goodsName}}
                    </p>
                    <div class="shop_grid">
                      <span>¥{{item.ProPrice}}</span>
                      <i>购买份数：×{{item.buyCount}}</i>
                      <smallButton  class="float_right" :text="item.proType | filterType"/>
                    </div>
                  </div>
                </div>
                <div class="shop_btn">
                  <span @click="goPage(item)" v-if="item.shareKey == ''">晒单</span>
                  <span @click="goPage(item)" v-else>查看</span>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </loadMore>
    </div>
  </div>
</template>

<script>
    import smallButton from "./../../common/smallButton.vue"
    import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
    export default {
        name: "index",
        data:()=>({
          selected: "tab-container1",
          tabs:[{name:"全部",type:"-1"},{name:"待晒单",type:"0"},{name:"已晒单",type:"1"}],
          param:{
            PageSize: 10,
            PageCount: 0,
            Status: "-1"
          },
          list:[],
        }),
        methods:{
          goPage(item){
            if(item.shareKey == ""){
              //晒单页面
              this.$router.push(`/evaluate?key=${item.orderDetailId}`);
            } else {
              //查看详情页面
              this.$router.push(`/sundetail?key=${item.shareKey}`);
            }
          },
          tab(val){
            this.$Indicator.loading();
            this.param.Status = val;
            this.param.PageCount = 0;
            this.$refs.loadMoreE.getList();  //触发加载更多
            setTimeout(()=>{
              this.$Indicator.close();
            },200)
          },
          //所得商品列表
          shoplist(success) {
            let url = "UserInterface/GetMyOrderShareList.ashx";
            if(this.param.PageCount == 1){
              this.list = [];
            }
            this.$post(url,this.param).then((data)=>{
              if(data.rspcode != 1 ){
                return;
              }
              let modelList = data.goodsList;
              this.list = [...this.list,...modelList]
              //加载更多组件触发回调
              if(success){
                success(modelList,this.list)
              }
            })

          }
        },
        components:{
          smallButton,
          loadMore
        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
.sun_navbar{
  width: 100%;
  overflow: hidden;
  p{
    width: 33.3333%;
    height: 0.4rem;
    font-size: 0.14rem;
    background: #fff;
    float: left;
    line-height: 0.4rem;
    text-align: center;
    span{
      height: 0.4rem;
      padding-bottom: 0.12rem;
      &.act{
        border-bottom: 1px solid #FF1E41;
        color: #FF1E41;
      }
    }
  }
}
  .shop_list{
    margin-top: 0.06rem;
    p{
      padding: 0 3%;
      height: 0.4rem;
      background: #fff;
      font-size: 0.14rem;
      line-height: 0.4rem;
      overflow: hidden;
      i{
        font-style: normal;
      }
      span{
        color: #606060;
        float: left;
      }
      label{
        color: #606060;
        float: right;
        font-size: 0.13rem;
      }
    }
    .shop_shop{
      width: 94%;
      padding: 0 3%;
      background: #fff;
      overflow: hidden;
      img{
        width: 0.76rem;
        height: 0.76rem;
        float: left;
      }
      .shop_sname{
        float: left;
        width: 75%;
        height: 0.76rem;
        margin-left: 0.06rem;
        p{
          line-height: 0.21rem;
          padding: 0;
        }
        .shop_grid{
          font-size: 0.14rem;
          margin-top: 0.08rem;
          span{
            color: #FF1E41;
          }
          i{
            font-style: normal;
            color: #606060;
            margin-left: 0.1rem;
          }
          label{
            font-size: 0.12rem;
            color: #FF1E41;
            display: block;
            width: 0.36rem;
            height: 0.18rem;
            border: 1px solid #FF1E41;
            float: right;
            border-radius: 2px;
            text-align: center;
            line-height: 0.18rem;
          }
        }
      }
    }
    .shop_btn{
      height: 0.4rem;
      background: #fff;
      span{
        width: 0.72rem;
        height: 0.24rem;
        color: #fff;
        background: #FF1E41;
        display: block;
        font-size: 0.12rem;
        text-align: center;
        line-height: 0.245rem;
        float: right;
        margin: 0.08rem 3% 0 0;
      }
    }
  }
</style>
