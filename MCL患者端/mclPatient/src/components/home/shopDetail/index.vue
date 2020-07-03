<template>
  <div class="paddimg">
    <img src="https://resource.jtsc.club/fanhui_yuan@2x.png" v-on:click="back()" class="return_back" />
    <div class="detile_lunbo">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in swiperArr" :key="index"><img v-lazy="item" /></mt-swipe-item>
      </mt-swipe>
    </div>

    <div class="detile_days">距离结束：01天 10时 30分 40秒</div>
    <div class="detile_shopname">
      <p>商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</p>
      <div class="detile_money">
        <span>¥2000.00</span>
        <i>已售：800</i>
        <label style="margin-right: 0.22rem">库存：1000</label>
      </div>
    </div>

    <div class="detile_num">
      <h3>选择购买份数</h3>
      <div>
        <addSubtraction v-model="num" :item="item" @change="inputChange" class="input"/>
      </div>
    </div>

    <div class="detile_pingj" ref="comment">
      <div class="detile_pingjt">
        <h3>商品评价（1000）</h3>
        <span @click="goHomeComments">查看全部</span>
      </div>
      <div class="detile_names">
        <img src="https://resource.jtsc.club/morentouxiang.jpg" />
        <span>张三</span>
        <label>2017-03-28 18:23</label>
      </div>
      <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
      <div class="detile_pjt">
        <img src="https://resource.jtsc.club/morentouxiang.jpg" />
        <img src="https://resource.jtsc.club/morentouxiang.jpg" />
        <img src="https://resource.jtsc.club/morentouxiang.jpg" />
      </div>
    </div>
    <!--按钮-->
    <div class="detile_btn">
      <div class="btn-group">
        <p class="defult-btn">加入购物车</p>
        <p class="btn">立即购买</p>
      </div>
    </div>
    <!--   详情页   -->
    <p class="continue"  ref="detailImg"  @click="setDetailPic">继续拖动，查看商品详情</p>
    <div class="com_detail" v-html="showDetailPic" ref="detailImg"></div>

    <!--  固定头部内容  -->
    <div class="com_coment" v-show="isShowH">
      <mt-button icon="back" class="com_return" slot="left" @click="back"></mt-button>
      <mt-navbar v-model="selected">
        <mt-tab-item id="tab-container0" @click.native="goWindowTop"><p>商品</p></mt-tab-item>
        <mt-tab-item id="tab-container1" @click.native="goDetail"><p>详情</p></mt-tab-item>
        <mt-tab-item id="tab-container2"  @click.native="goComment"><p>评论</p></mt-tab-item>
      </mt-navbar>
    </div>
  </div>
</template>

<script>
  import addSubtraction from "@/components/shopCar/productItem/addSubtraction.vue";
  export default {
    name: "index",
    data:()=>({
      isload: false,
      isActive:0,
      swiperArr: [],  //轮播
      goodsInfo: {}, //商品信息
      phaseList: [],
      commentsList:[],  //评论列表
      isShowH: false,
      selected: 'tab-container0',
      isShowFoot: true,  //底部栏显示
      showDetailPic:"",
      num:1,
      item:{
        goodsNum:1
      }
    }),
    methods:{
      //加减的跟新数据
      inputChange(val,IsAddNum="",callback=()=>{},isLoad=true){
        //IsAddNum  "" : 加减 数字    "2": 全部
        if(Number(val) > Number(this.item.lessCount)){
          this.$Indicator.close();
          this.$Toast("剩余数量不足!")
          return
        }
        isLoad && this.$Indicator.loading();
        let url = "/UserInterface/cart/updateGoodsNum.ashx";
        let {goodsId, goodsSpecId, goodsPhId,proType} = this.item;
        let param = {goodsId, goodsSpecId, goodsPhId ,goodsNum:val,proType, IsAddNum };
        this.$post(url,param).then((data)=>{
          isLoad &&  this.$Indicator.close();
          callback(data)
          if(data.rspcode != 1){
            this.$Toast(data.rspdesc)
            return;
          }
          this.$emit('render',data)
        })
      },
      back: function(index) {
        this.$router.back()
      },
      //回顶部
      goWindowTop(){
        window.scrollTo(0,0)
      },
      //去详情部分
      goDetail(){
        this.setDetailPic();
        let offsetTop = this.$refs.detailImg.offsetTop - 55;
        window.scrollTo(0,offsetTop)
      },
      //去评价部分
      goComment(){
        let offsetTop = this.$refs.comment.offsetTop - 55;
        window.scrollTo(0,offsetTop)
      },
      //评价页面
      goHomeComments(){
        let sKey = this.goodsInfo.goodsId;
        this.$router.push({path:`/homeComments/${sKey}`})
      },
      //更新详情信息
      updateDetailInfo(sKey){
        this.getDetailInfo(sKey).then((data)=>{
          if(data.rspcode != 1){
            return
          }
          let model = data.goodsList[0];
          this.goodsInfo = model;
        })
      },
      //获取详情信息
      getDetailInfo(sKey){
        let url = "/UserInterface/mall/getProductDetails.ashx";
        return this.$post(url,{sKey}).then((data)=>{
          return data;
        })
      },
      //设置详情信息
      setDetailInfo(data){
        if(data.rspcode != 1){
          return
        }
        let model = data.goodsList[0];
        this.goodsInfo = model;

        //轮播
        this.swiperArr = [model.goodsImage];
        if(model.goodsTwoImage){
          this.swiperArr.push(model.goodsTwoImage)
        }
        if(model.goodsThreeImage){
          this.swiperArr.push(model.goodsThreeImage)
        }
      },
      //设置详情图片
      setDetailPic(){
        this.showDetailPic = this.goodsInfo.goodsMemo;
      },
      //滑动底部
      scrollBottom(){
        if(this.getScrollTop() > 55){
          this.isShowH = true;
        }else{
          this.isShowH = false;
        }
      },
      getScrollTop() {
        var scrollPos;
        if (window.pageYOffset) {
          scrollPos = window.pageYOffset; }
        else if (document.compatMode && document.compatMode != 'BackCompat')
        { scrollPos = document.documentElement.scrollTop; }
        else if (document.body) { scrollPos = document.body.scrollTop; }
        return scrollPos;
      }
    },
    mounted(){
      let sKey = this.$route.params.sKey;
      this.getDetailInfo(sKey).then((data)=>{
        this.setDetailInfo(data)
        // this.getComment();
        window.addEventListener("scroll",this.scrollBottom,false)
      })
    },
    destroyed(){
      window.removeEventListener("scroll",this.scrollBottom,false)
    },
    components:{
      addSubtraction
    }

  }
</script>
<style lang="scss">
  .com_detail{
    p,img {
      display: block;
      width: 100%;
    }
  }
</style>
<style scoped>
  .paddimg{
    padding-bottom: 0.8rem;
  }
  .return_back{
    position: fixed;
    left: 3%;
    top: 0.1rem;
    width: 0.3rem;
    height: 0.3rem;
    z-index: 9;
  }
  .detile_lunbo{
    height: 3.75rem
  }
  .detile_lunbo img{
    width: 100%;
  }
  .detile_days{
    width: 100%;
    height: 0.3rem;
    background: #FFDCDC;
    color: #FF3D3D;
    text-align: center;
    line-height: 0.3rem;
    font-size: 0.14rem;
  }

  .detile_nav ul{
    white-space:nowrap;
    height: 0.5rem;
    display: inline-block;
  }
  .detile_nav ul li{
    display: inline-block;
    text-align: center;
  }
  .detile_nav ul li>a{
    height: 0.5rem;
    display: inline-block;
    margin: 0 0.125rem;
    width: 0.7rem;
    color: #313131;
  }

  .detile_nav ul li a.tab0,.detile_nav ul li a.tab1{
    color: #FD9419;
  }
  .detile_nav ul li a.router-link-active{
    border-bottom: 0.02rem solid #FF1E41;
    color: #FB0033;
  }
  .detile_shopname{
    width: 94%;
    background: #fff;
    padding: 0 3%;

  }
  .detile_shopname  p{
    font-size: 0.15rem;
    color: #333;
    line-height: 0.22rem;
    padding-top: 0.1rem;
  }
  .detile_shopname  .detile_money{
    padding-top: 0.06rem;
    overflow: hidden;
    padding-bottom: 0.1rem;
  }
  .detile_shopname  .detile_money span{
    color: #FF3D3D;
    font-size: 0.2rem;
    display: block;
    float: left;
  }
  .detile_shopname  .detile_money label,.detile_shopname  .detile_money i{
    color: #999999;
    font-size: 0.14rem;
    display: block;
    float: right;
    font-style: normal;
  }
  .detile_nav ul li p{
    font-size: 0.16rem;
    text-align: center;
    margin-top: 0.03rem;
  }
  .detile_nav ul li span{
    font-size: 0.14rem;
    text-align: center;
  }

  .evaluation h3{
    font-weight: normal;
    width: 94%;
    margin: 0 auto;
    line-height: 0.45rem;
  }
  .evaluation p{
    width: 94%;
    margin: 0 auto;
    font-size: 0.14rem;
    color: #404040;
    margin-top: 0.1rem;
  }
  .evaluation ul{
    overflow: hidden;
    width: 94%;
    margin: 0 auto;
    margin-top: 0.08rem;
  }
  .evaluation ul li{
    overflow: hidden;
  }
  .evaluation ul li:first-child{
    margin-left: 0;
  }
  .evaluation ul li img{
    height: 50px;
  }
  .show_name img{
    width: 0.22rem;
    height: 0.22rem;
    float: left;
  }
  .show_name span{
    height: 0.22rem;
    display: block;
    float: left;
    font-size: 0.14rem;
    line-height: 0.22rem;
    margin-left: 0.08rem;
    color: #202020;
  }
  .show_name label{
    font-size: 0.13rem;
    color: #606060;
    display: block;
    float: right;
    line-height: 0.22rem;
  }
  .show_allpl label{
    display: block;
    width: 1rem;
    height: 0.24rem;
    border-radius: 0.12rem;
    position: absolute;
    left: 50%;
    margin-left: -0.5rem;
    top: 0.15rem;
    border: 1px solid #FF1E41;
    text-align: center;
    line-height: 0.25rem;
    font-size: 0.12rem;
    color: #FF1E41;
  }

  .continue{
    width: 100%;
    color: #606060;
    text-align: center;
    font-size: 0.14rem;
    line-height: 0.55rem;
  }
  .com_coment{
    width: 100%;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
  }
  .detile_num{
    width: 94%;
    padding: 0 3%;
    background: #fff;
    margin-top: 0.06rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .detile_num .themeRed{
    font-size: 0.14rem;
    padding-left: 10px;
  }
  .detile_num h3{
    font-weight: normal;
    font-size: 0.15rem;
    color: #333333;
    padding: 0.1rem 0;
  }
  .detile_num ul li{
    padding: 0.08rem 0;
    border-bottom: 1px solid #EEEEEE;
  }
  .detile_num ul li p{
    overflow: hidden;
  }
  .detile_num ul li p label{
    color: #333;
    font-size: 0.15rem;
    float: left;
  }
  .detile_num ul li p i{
    font-style: normal;
    color: #FF3D3D;
    font-size: 0.14rem;
    float: right;
  }
  .detile_num ul li span{
    overflow: hidden;
    margin-top: 0.06rem;
    display: block;
  }
  .detile_num ul li span label,.detile_num ul li span i{
    float: left;
    color: #999999;
    font-size: 0.14rem;
    font-style: normal;
    margin-top: 0.02rem;
    margin-right: 0.16rem;
  }
  .detile_right{
    float: right;
  }
  .detile_moneys{
    font-size: 0.15rem;
    height: 0.45rem;
    background: #fff;
    color: #333;
    line-height: 0.45rem;
    padding-left: 3%;
    margin-top: 0.05rem;
  }
  .detile_moneys span{
    color: #FF3D3D;
  }
  .detile_allmoney{
    width: 100%;
    background: #fff;
    overflow: hidden;
    padding: 0.05rem 0;
    margin-top: 0.05rem;
  }
  .detile_allmoney p{
    width: 33.333333%;
    float: left;
    border-left: 1px solid #EEEEEE;
    box-sizing: border-box;
  }
  .detile_allmoney p span,.detile_allmoney p label{
    display: block;
    text-align: center;
    font-size: 0.15rem;
    margin-top: 0.06rem;
    padding-bottom: 0.04rem;
  }
  .detile_pingj{
    width: 94%;
    padding: 0 3%;
    background: #fff;
    margin-top: 0.1rem;
  }
  .detile_pingj .detile_pingjt{
    overflow: hidden;
    height: 0.45rem;
    font-size: 0.15rem;
    line-height: 0.45rem;
  }
  .detile_pingj .detile_pingjt h3{
    font-weight: normal;
    color: #333333;
    float: left;
    font-size: 0.15rem;
  }
  .detile_pingj .detile_pingjt span{
    float: right;
    display: block;
    color: #666;
    width: 0.9rem;
    background: url("https://resource.jtsc.club/jiantou_right_h@2x.png") no-repeat right center;
    background-size: 0.3rem;
  }
  .detile_names{
    overflow: hidden;
    padding: 0.04rem 0;
  }
  .detile_names img{
    height: 0.3rem;
    float: left;
  }
  .detile_names span{
    height: 0.3rem;
    display: block;
    float: left;
    font-size: 0.15rem;
    color: #333535;
    line-height: 0.3rem;
    margin-left: 0.06rem;
  }
  .detile_names label{
    font-size: 0.12rem;
    color: #999999;
    display: block;
    float: right;
    line-height: 0.3rem;
  }
  .detile_pingj p{
    font-size: 0.15rem;
    color: #333535;
    margin-top: 0.04rem;
  }
  .detile_pingj .detile_pjt{
    overflow: hidden;
    margin-top: 0.1rem;
  }
  .detile_pingj .detile_pjt img{
    width: 32%;
    float: left;
    margin-left: 2%;
    padding-bottom: 0.1rem;
  }
  .detile_pingj .detile_pjt img:nth-child(1){
    margin-left: 0;
  }
  .detile_btn{
    width: 100%;
    height: 0.5rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .detile_btn .btn-group{
    width: 80%;
    height: 0.4rem;
    margin: 0 auto;
    margin-top: 0.05rem;
    border-radius: 0.2rem;
    overflow: hidden;
    display: flex;
    border: 1px solid #FF3D3D;
    box-sizing: border-box;
  }
  .detile_btn .btn-group>p{
    flex: 1;
    text-align: center;
    font-size: 0.16rem;
    line-height: 0.4rem;
  }
  .detile_btn .btn{
    background: #FF3D3D;
    color: #fff;
  }
  .detile_btn .defult-btn{
    color: #FF3D3D;
    box-sizing: border-box;
  }
  .myc_chose p{
    text-align: center;
    line-height: 0.45rem;
    font-size: 0.15rem;
    color: #666;
  }
  .myc_chose span{
    display: block;
    width: 0.2rem;
    height: 0.2rem;
    position: absolute;
    right: 3%;
    top: 0.12rem;
    background: url("https://resource.jtsc.club/bianji_car_quxiao@2x.png") no-repeat center center;
    background-size: 0.14rem 0.14rem;
  }
  .myc_adul{
    height: 3.4rem;
    overflow-y: auto;
  }
  .myc_adlist{
    overflow: hidden;
    height: 0.7rem;
    border-bottom: 1px solid #eee;
    background: url("https://resource.jtsc.club/jiantou_right_h@2x.png") no-repeat 97% center;
    background-size: 0.24rem 0.24rem;
  }
  .myc_adlist .myc_actv{
    width: 0.44rem;
    height: 0.7rem;
    display: block;
    float: left;
    background: url("https://resource.jtsc.club/select@2x.png") no-repeat center center;
    background-size: 0.18rem 0.18rem;
  }
  .myc_adlist .myc_actv.myc_actve{
    background: url("https://resource.jtsc.club/select_click@2x.png") no-repeat center center;
    background-size: 0.18rem 0.18rem;
  }
  .myc_acont p{
    overflow: hidden;
    font-size: 0.15rem;
    color: #333;
    margin-top: 0.13rem;
  }
  .myc_acont p i{
    font-style: normal;
    margin-left: 0.1rem;
  }
  .myc_acont p label{
    width: 0.5rem;
    height: 0.18rem;
    border: 1px solid #FF3D3D;
    font-size: 0.12rem;
    color: #FF3D3D;
    text-align: center;
    line-height: 0.19rem;
    float: right;
    display: none;
    margin-right: 0.4rem;
  }
  .myc_acont p label.mra{
    display: block;
  }
  .myc_acont u{
    text-decoration: none;
    font-size: 0.13rem;
    color: #666;
    margin-top: 0.07rem;
    display: block;
  }
  .myc_addadrs{
    font-size: 0.15rem;
    color: #FF3D3D;
    text-align: center;
    line-height: 0.36rem;
  }
  .myc_okbtn{
    width: 88%;
    background: #FF3D3D;
    height: 0.4rem;
    display: block;
    text-align: center;
    line-height: 0.4rem;
    color: #FFFFFF;
    font-size: 0.16rem;
    position: absolute;
    border-radius: 0.2rem;
    margin: 0 auto;
    left: 50%;
    margin-left: -44%;
    bottom: 0.2rem;
  }
  .myc_adliets{
    width: 94%;
    padding: 0 3%;
    height: 0.44rem;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    font-size: 0.15rem;
  }
  .myc_adliets span{
    display: block;
    width: 0.6rem;
    line-height: 0.44rem;
    float: left;
    color: #202020;
    text-align: right;
    margin-right: 5%;
  }
  .myc_adliets label{
    display: block;
    width: 60%;
    float: left;
    line-height: 0.44rem;
    color: #FF3D3D;
  }
  .myc_adliets input{
    display: block;
    width: 60%;
    float: left;
    border: none;
    height: 0.44rem;
    font-size: 0.14rem;
  }
  .myc_admarg{
    border-top: 9px solid #FAFAFA;
  }
</style>
