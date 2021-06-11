<template>
  <div style="background: #f8f8f8">
    <div id="body_main" style="padding-bottom: 0; padding-top: 1px">
      
      <!-- 搜索框 fix_top-->
      <div class="">
        <div class="search-group"  @click="$router.push({name: 'searchProduct', query:{q: ''}})">
          <input type="text" placeholder="搜索疾病，症状，商品" disabled>
        </div>
        <div class="seatch-tips">
          <div class="title">症状：</div>
          <span class="search-label"  v-for="item in bFlist" :key="item.sKey" @click="$router.push({name: 'searchProduct', query:{q: item.name}})">{{item.name}}</span>
        </div>
      </div>

      <!-- 轮播图 -->
      <carousel class="carousel"/>

      <!-- 产品分类 -->
      <div class="product_type">
        <ul>
          <li v-for="item in typeList" :key="item.sKey" @click="$router.push({name: 'productCategory', query:{firstSubjectType: item.sKey}})">
            <img :src="item.BigImageUrl" alt="">
            <p>{{item.name}}</p>
          </li>
          <li @click="$router.push({name: 'yearCard'})">
            <img src="@/assets/images/shoppingMall/vip.png" alt="">
            <p>会员卡</p>
          </li>
        </ul>
      </div>

      <!-- <div class="recommend">
        <div class="title">人气推荐</div>
        <div class="recommend_view">
          <productItem
            v-for="(item) in list"
            :key="item.goodsId"
            :item="item"
            detailPage="serviceDetail"
            class="recommend_item"
          />
        </div>
        <img src="@/assets/images/shoppingMall/huiyuan.jpg" alt="" class="huiyuan">
      </div> -->
      
      <div class="huiyuanBox">
         <img src="@/assets/images/shoppingMall/huiyuan.jpg" alt="" class="huiyuan" style="width: 100%" @click="$router.push({name: 'yearCard'})">
      </div>

      <div class="titlebt">
        <h3>精选推荐 <span class="more" @click="$router.push('/productCategory')">更多</span></h3>
      </div>
      <!-- 商品列表  -->
      <div class="shop_list" style="padding-bottom: 0.65rem">
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

    <!-- 购物车入口 -->
    <router-link tag="div" to="/shopcar">
      <img src="@/assets/images/shoppingMall/car2.png" alt="" class="buyCar" />
    </router-link>
  </div>
</template>

<script>
import productItem from "./modules/productItem.vue"; // 商品
import loadMore from "@/components/common/loadMore.vue"; // 加载更多组件
import carousel from "./modules/carousel.vue";
import { GetIndexProductList, GetProductCategoryList } from "@/api/shopCar.js"
import {getList} from "@/api/complication"
export default {
  name: "home2",
  data: () => ({
    param: {
      pagecount: 1,
      pagesize: 10,
    },
    serveList: [],
    list: [],  // 产品列表
    bFlist: [],  // 并发症
    typeList: [],  // 产品分类
  }),
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
        const data = await GetIndexProductList(this.param)
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
    // 并发症
    async getBFList(){
      const data = await getList();
      this.bFlist = data.data
    },
    // 产品分类
    async getTypeList(){
      const data = await GetProductCategoryList();
      this.typeList = data.list
    },
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
  created(){
    this.getBFList() // 并发症
    this.getTypeList() // 产品分类
  },
  components: {
    productItem,
    loadMore,
	  carousel
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";
#body_main{
  background: url("./../../../assets/images/shoppingMall/bannerBg.jpg") no-repeat left top;
  background-size: 100% auto;
}

.buyCar {
  position: fixed;
  bottom: 20%;
  right: 5%;
  width: 0.6rem;
  height: 0.6rem;
}

.titlebt {
  margin: 0 0.1rem;
  padding: 0.15rem 0.1rem;
  background: #ffffff;
  border-radius: 0.08rem;
  h3 {
    border-left: 4px solid #0ac5ca;
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
	padding: 0.15rem;
	padding-top: 0;
	font-size: 0.12rem;
  color: #fff;
  overflow-x: scroll;
	.search-label{
		padding: 0.02rem 0.1rem;
		margin: 0 0.025rem;
		// min-width: 0.6rem;
		text-align: center;
		background: #72C9C8;
		border-radius: 0.3rem;
	}
}
.carousel{
  margin: 0 0.15rem;
  border-radius: 0.08rem;
  overflow: hidden;
}
// 产品分类
.product_type{
	padding: 0;
	ul{
		overflow: hidden;
		padding: 0.1rem 0.15rem;
	}
	li{
		float: left;
		width: 25%;
		text-align: center;
		font-size: 0.14rem;
		color: #666;
		padding: 0.1rem 0;
    p{
      margin-top: 0.05rem;
      font-size: 0.13rem;
    }
	}
	img{
		display: block;
		width: 0.48rem;
		height: 0.48rem;
		margin: 0 auto;
	}
}

// 人气推荐
.recommend{
  background: #ffffff;
  padding: 0.1rem;
  padding-top: 0;
  margin: 0.1rem;
  margin-top: 0;
  border-radius: 0.1rem;
  .title{
    font-size: 0.15rem;
    font-weight: 600;
    padding: 0.15rem 0;
  }
  .huiyuan{
    width: 100%;
    border-radius: 0.06rem;
    margin-top: 0.1rem;
  }
  .recommend_view{
    white-space: nowrap;
    overflow: hidden;
    overflow-x: scroll;
    .recommend_item{
      float: none;
      width: 33.333%;
      display: inline-block;
      >>> .product_pic{
        height: auto;
        height: 1rem;
      }
      >>> .content{
        .product_name{
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          height: auto;
          font-size: 0.13rem;
        }
        .product_mpny p{
          font-size: 0.13rem;
          line-height: normal;
        }
        .buyCar{
          width: 0.15rem;
          height: 0.15rem;
        }
      }
    }
  }
}

.huiyuanBox{
  padding: 0 0.1rem;
  margin-bottom: 0.1rem;
  img{
    width: 100%;
    border-radius: 0.08rem;
  }
}

.bodycont{
	padding: 0.05rem;
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
