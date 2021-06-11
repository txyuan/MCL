<template>
  <div>
    <div id="body_main" style="padding-bottom: 0; padding-top: 1.08rem">
      <mt-header title="商城" fixed>
        <div slot="left">
            <header-back>
                <mt-button icon="back"></mt-button>
            </header-back>
        </div>
      </mt-header>

      <!-- 搜索框 -->
      <div class="fix_top" style="top: 43px;background: #f5f5f5">
        <div class="search-group">
          <input type="search" placeholder="搜索疾病，症状，商品" v-model="param.goodsName" @keyup.enter="startLoad">
        </div>
        <!-- <div class="seatch-tips">
          <div class="title">症状：</div>
          <span class="search-label" v-for="n in 10" :key="n">贫血</span>
        </div> -->
      </div>
      
      <!-- 商品列表  -->
      <div class="shop_list">
        <div class="shop_li">
          <div class="shop_go">
            <div class="shop_goce" slot="content">
              <!-- 商品列表  -->
              <loadMore :param="param" @triggerGetList="loadData" ref="loadMoreE">
                <div class="content bodycont clear" slot="content">
                  <productItem
                    v-for="(item) in list"
                    :key="item.goodsId"
                    :item="item"
                    detailPage="serviceDetail"
                  />
                </div>
              </loadMore>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productItem from "./modules/productItem.vue"; // 商品
import loadMore from "@/components/common/loadMore.vue"; // 加载更多组件
import { GetProductList } from "@/api/shopCar.js"
export default {
  name: "home2",
  data() {
    const {q, secondSymptomName = ""} = this.$route.query
    return {
      param: {
        saleorder: "", // 0，销量降序;1，销量升序
        priceOrder: "", // 0，价格降序;1，价格升序
        pagecount: 1,
        pagesize: 10,
        secondSubjectType: "", // 一级分类主键
        firstSubjectType: "", // 二级分类主键
        goodsName: q, // 疾病，症状，商品
        secondSymptomName, // 
      },
      list: [],
    }
  },
  methods: {
    //触发加载更多
    startLoad() {
        this.param.pagecount = 0;
        this.$refs.loadMoreE.getList();
    },
    //商品列表
    async loadData(success) {
        if (this.param.pagecount == 1) {
            this.list = [];
        }
        const data = await GetProductList(this.param)
        if (data.rspcode != 1) {
            return;
        }
        this.isLoad = true
        let modelList = data.goodsList;
        this.list = [...this.list, ...modelList]
        //加载更多组件触发回调
        if (success) {
            success(modelList, this.list)
        }
    },
  },
  activated(){
    const {q, secondSymptomName} = this.$route.query
    this.param.goodsName = q
    this.param.secondSymptomName = secondSymptomName
  },
  beforeRouteEnter (to, form, next) {
      next((vm) => {
          // 解锁加载更多
          vm.$refs.loadMoreE.isLock = true
          // 从详情页面返回，列表接口如果没有被加载过，需要加载接口
          // if (form.name === 'serviceDetail' && !vm.isLoad) {
          //     vm.startLoad()
          // }
          // 非详情页面进来
          if (form.name !== 'serviceDetail') {
              vm.startLoad()
          }
      })
  },
  beforeRouteLeave (to, form, next) {
      // 去详情页面，关锁加载更多
      if (to.name === 'serviceDetail') {
          this.$refs.loadMoreE.isLock = false
      }
      next()
  },
  components: {
    productItem,
    loadMore,
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";

.buyCar {
  position: fixed;
  bottom: 20%;
  right: 5%;
  width: 0.6rem;
  height: 0.6rem;
}

.titlebt {
  padding: 0.15rem 0.1rem;
  background: #ffffff;
  h3 {
    border-left: 4px solid #f78335;
    padding-left: 3%;
    font-size: 0.15rem;
    font-weight: 600;
    span {
      float: right;
      font-size: 0.14rem;
      font-weight: normal;
	  padding-right: 0.25rem;
	  background: url(../../../assets/images/jiantou@2x.png) no-repeat center right;
	  background-size: 0.25rem;
      /*line-height: 0.18rem;*/
    }
  }
}

// 搜索框
.search-group{
    margin: 0.15rem;
    padding: 0.08rem 0.2rem;
	  padding-left: 0.45rem;
    display: flex;
    align-items: center;
    // background: #f2f2f2;
	  // border: 1px solid #e5e5e5;
    border-radius: 0.2rem;
    background: url(../../../assets/images/sousuo@2x.png) no-repeat 0.15rem;
    background-size: 0.2rem;
    background-color: #ffffff;
    input{
        flex: 1;
        border: none;
        color: #666;
    }
    .search{
        width: 0.2rem;
        height: 0.2rem;
        margin-left: 0.1rem;
    }
}
.seatch-tips>*{
	display: inline-block;
}
.seatch-tips{
	white-space: nowrap;
	padding: 0.15rem 0.1rem;
	padding-top: 0;
	font-size: 0.14rem;
	.search-label{
		font-size: 0.12rem;
		color: #666;
		padding: 0.04rem 0.05rem;
		margin: 0 0.05rem;
		min-width: 0.6rem;
		text-align: center;
		background: #E4E4E4;
		border-radius: 0.3rem;
	}
}


.bodycont{
	padding: 0.05rem;
  margin-top: -0.15rem;
}
.serv_ul {
  overflow: hidden;
  padding: 0 4%;
  .serv_list {
    width: 48.5%;
    background: #fff;
    float: left;
    height: 0.58rem;
    margin-top: 0.08rem;
    overflow: hidden;
    img {
      height: 0.24rem;
      float: left;
      margin-left: 22%;
      margin-top: 0.17rem;
    }
    p {
      font-size: 0.14rem;
      float: left;
      margin-left: 18%;
      line-height: 0.58rem;
    }
    &:nth-child(even) {
      float: right;
    }
    &:nth-child(1) {
      margin-top: 0;
    }
    &:nth-child(2) {
      margin-top: 0;
    }
  }
}
.shop_list {
  .shop_li {
    .shop_go {
      .shop_goce {
        width: 100%;
        overflow: hidden;
        padding-bottom: 0.1rem;

        .shop_wrap {
          padding: 0 5px;

          .title {
            line-height: 0.43rem;
            padding: 0 0.1rem;
          }
        }

        .shop_goli {
          width: 50%;
          padding: 0 5px;
          margin-bottom: 5px;
          box-sizing: border-box;
          float: left;

          img {
            width: 100%;
            min-height: 1.72rem;
            display: block;
          }

          .bottom {
            overflow: hidden;
            background: #ffffff;
            padding: 10px;

            label {
              font-size: 12px;
              border: 1px solid #ff1e41;
              color: #ff1e41;
              border-radius: 3px;
              padding: 2px 5px;
              margin-top: 0.05rem;
              display: inline-block;
            }
          }

          h3 {
            font-weight: normal;
            font-size: 0.14rem;
            @include ellipsis(2);
            color: #333535;
          }

          p {
            font-size: 0.16rem;
            color: #f78335;
            padding-top: 0.1rem;
            margin: 0 auto;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
}
.seeMore {
  .seemore_a {
    display: block;
    width: 50%;
    margin: 0.1rem auto;
    background-color: #0ac5ca;
    color: #ffffff;
    text-decoration: none;
    border-radius: 0.2rem;
    text-align: center;
    padding: 0.065rem 0;
  }
}
</style>
