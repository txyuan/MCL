<template>
    <div>
      <div class="myc_shop">
        <div class="myc_list">
          <p class="myc_time">
            <span>{{item.orderTime}}</span>
            <label v-if="item.state==0">
              预计收益：
              <u>¥{{item.estimatedrevenue}}</u>
              <i>待卖x{{item.buyCount}}</i>
            </label>
            <label v-else-if="item.state==1">
              预计收益：
              <u>¥{{item.estimatedrevenue}}</u>
              <i>已卖出</i>
            </label>
            <label v-else-if="item.state==2">
              <i>已退款</i>
            </label>
          </p>
          <div class="myc_img">
            <img  :src="item.goodsImage" />
            <div class="myc_dsc">
              <h3>{{item.goodsName}}</h3>
              <span>{{item.orderMSPDesc}}</span>
              <p>
                ¥{{item.proPrice}}
                <label>购买份数：×{{item.buyCount}}</label>
              </p>
            </div>
          </div>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "item",
        props:['item']
    }
</script>

<style scoped>
.myc_list{
  padding: 0 3%;
  background: #fff;
  margin-top: 0.05rem;
}
.myc_list .myc_time{
  font-size: 0.13rem;
  color: #666666;
  padding: 0.1rem 0;
  overflow: hidden;
}
.myc_list .myc_time label{
  float: right;
}
.myc_list .myc_time label i,.myc_list .myc_time label u{
  font-style: normal;
  color: #FF3D3D;
  text-decoration: none;
}
.myc_list .myc_time label i{
  margin-left: 0.1rem;
}
.myc_img{
  overflow: hidden;
}
  .myc_img img{
    height: 0.76rem;
    width: 0.76rem;
    float: left;
  }
.myc_img .myc_dsc{
  width: 75%;
  margin-left: 2%;
  float: left;
  height: 0.76rem;
  padding-bottom: 0.1rem;
}
.myc_img .myc_dsc h3{
  font-weight: normal;
  font-size: 0.14rem;
  color: #333;
  width: 100%;
  height: 0.2rem;
  overflow: hidden;
  padding-top: 0.01rem;
}
.myc_img .myc_dsc span{
  height: 0.22rem;
  padding: 0 0.1rem;
  display: inline-block;
  line-height: 0.22rem;
  font-size: 0.12rem;
  margin-top: 0.08rem;
  color: #666;
  background: #F2F2F2;
}
.myc_img .myc_dsc p{
  color: #FF3D3D;
  font-size: 0.15rem;
  margin-top: 0.06rem;
}
.myc_img .myc_dsc p label{
  float: right;
  font-size: 0.12rem;
  color: #666666;
}
  .myc_bbtn p{
    font-size: 0.13rem;
    color: #333;
    padding: 0.02rem 0 0.05rem 0;
  }
.myc_bbtn p span{
  color: #FF3D3D;
}
  .myc_bbtnan{
    overflow: hidden;
    font-size: 0.12rem;
    padding: 0.02rem 0 0.1rem 0;
  }
  .myc_bbtnan span{
    float: left;
    display: block;
    line-height: 0.34rem;
  }
.myc_bbtnan span i{
  font-style: normal;
  color: #FF3D3D;
}
.myc_bbtnan u{
  text-decoration: none;
  font-size: 0.13rem;
  color: #666;
  float: right;
  display: block;
  line-height: 0.34rem;
}
.myc_bbtnan label{
  width: 0.72rem;
  height: 0.26rem;
  color: #FF3D3D;
  display: block;
  float: right;
  border: 1px solid #FF3D3D;
  text-align: center;
  line-height: 0.27rem;
  border-radius: 0.13rem;
  margin-left: 0.12rem;
}
.myc_bbtnan label a{
  color: #FF3D3D;
}
</style>
