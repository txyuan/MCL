<template>
    <div class="padding-header padding-footer">
      <div class="fix_top">
        <mt-header title="晒单">
          <div slot="left">
            <header-back>
              <mt-button icon="back"></mt-button>
            </header-back>
          </div>
        </mt-header>
      </div>

      <div class="sund_body">
        <div class="sund_inform">
          <img  v-lazy="userImg" />
          <div class="sund_names">
            <p style="margin-top: 0">获奖者：
              <span>{{detailInfo.Winner}}</span>
            </p>
            <p>购买份数：
              <span>{{detailInfo.BuyCount}}</span>
            </p>
            <p>揭晓时间：{{detailInfo.EndTime}}</p>
            <p style="color: #FF1E41">奖励积分：{{detailInfo.Point}}</p>
          </div>
        </div>
        <div class="sunb_cont">
          <div class="sunb_coat">
            <p>{{detailInfo.Remark}}</p>
            <img v-if="detailInfo.Image1Url != ''" v-lazy="detailInfo.Image1Url" />
            <img v-if="detailInfo.Image2Url != ''" v-lazy="detailInfo.Image2Url" />
            <img v-if="detailInfo.Image3Url != ''" v-lazy="detailInfo.Image3Url" />
          </div>
        </div>
        <div class="sunb_evl">
          <p>全部评论</p>
          <div class="sunb_plnr" v-for="(item,index) in detailInfo.commentList" :key="index">
            <img v-lazy="userImg" />
            <div class="sunb_data">
              <div class="sunb_datatop">
                <div class="sunb_topleft">
                  <h4>{{item.UserName}}</h4>
                  <label>{{item.CommentTime}}</label>
                </div>
                <!--<span></span> 赞 -->
              </div>
              <b>{{item.Comment}}</b>
              <!-- 回复 <div class="sunb_come">-->
                <!--<h3>-->
                  <!--<span>柿子k：</span>-->
                  <!--<label>嗯嗯嗯</label>-->
                <!--</h3>-->
                <!--<h3>-->
                  <!--<span>柿子k：</span>-->
                  <!--<label>嗯嗯嗯</label>-->
                <!--</h3>-->
              <!--</div>-->
            </div>
          </div>
        </div>
      </div>
      <!--<div class="sunb_bot">-->
        <!--<label>123</label>-->
        <!--<label @click="sunpl">123</label>-->
        <!--<p>去购买</p>-->
      <!--</div>-->
      <div class="onpy">
        <!--<label>123</label>-->
        <input type="text" placeholder="评论" v-model.trim="commentInfo"/>
        <span @click="comment">发送</span>
      </div>
      <router-link tag="div" to="/wx_Entrance/home" class="gobuy">
        <img src="https://resource.jtsc.club/gobuy.png" />
      </router-link>
    </div>
</template>

<script>
     // import userImg from "@/assets/images/morentouxiang.jpg";
    export default {
        name: "sundetail",
        data:()=>({
          userImg:'https://resource.jtsc.club/morentouxiang.jpg',
          inpt:false,
          ShareKey:"",
          detailInfo:{
            BuyCount: "",
            EndTime:"",
            Image1Url: "",
            Image2Url: "",
            Image3Url:"",
            Point: "0",
            Remark: "",
            Winner:"",
            commentList :[]
          },
          commentInfo:""  //评论信息
        }),
        methods:{
          sunpl(){
            this.inpt=true;
          },
          //获取详情
          getDetail(){
            let url = "UserInterface/GetOrderShareDetail.ashx";
            let { ShareKey } = this.$data;
            this.$post(url,{ShareKey}).then((data)=>{
              if(data.rspcode != 1 ){
                return;
              }
              this.detailInfo = data.data;
            })
          },
          //评论
          comment(){
            let url = "UserInterface/ShareComment.ashx";
            let param = {
              ShareKey: this.ShareKey,
              Comment: this.commentInfo
            }
            if(this.commentInfo == ""){
              this.$Toast("评价内容不能为空")
              return;
            }
            this.$Indicator.loading();
            this.$post(url,param).then((data)=>{
              this.$Indicator.close();
              if(data.rspcode != 1 ){
                return;
              }
              this.$Toast("评价成功")
              this.commentInfo = ""
              this.getDetail();
            })
          }
        },
      mounted(){
          this.ShareKey = this.$route.query.key;
          this.getDetail();
      }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
.sund_inform{
  width: 92%;
  padding: 0 4%;
  background: #fff;
  overflow: hidden;
  padding-top: 0.15rem;
  border-top: 1px solid #E0E0E0;
  padding-bottom: 0.15rem;
  img{
    width: 0.56rem;
    height: 0.56rem;
    float: left;
  }
  .sund_names{
    width: 80%;
    float: left;
    margin-left: 3%;
    font-size: 0.15rem;
    color: #606060;
    p{
      margin-top: 0.05rem;
      span{
        color: #FF1E41;
      }
    }
  }
}
  .sunb_cont{
    width: 92%;
    padding: 0 4%;
    background: #fff;
    .sunb_coat{
      width: 100%;
      border-top: 1px solid #E0E0E0;
      p{
        font-size: 0.15rem;
        color: #202020;
        padding-top: 0.15rem;
      }
      img{
        width: 100%;
        margin-top: 0.15rem;
      }
    }
  }
  .sunb_evl{
    margin-top: 0.1rem;
    background: #fff;
    width: 90%;
    padding: 0 5%;
    padding-bottom: 0.06rem;
    p{
      padding-left: 8%;
      background: url("https://resource.jtsc.club/ping_d@2x.png") no-repeat left center;
      background-size: 0.2rem;
      height: 0.42rem;
      line-height: 0.42rem;
      font-size: 0.15rem;
      border-bottom: 1px solid #E0E0E0;
    }
  }
  .sunb_plnr{
    width: 100%;
    background: #fff;
    padding-top: 0.1rem;
    overflow: hidden;
    padding-bottom: 0.14rem;
    img{
      width: 0.32rem;
      float: left;
    }
    .sunb_data{
      float: left;
      margin-left: 3%;
      width: 86%;
      .sunb_datatop{
        width: 100%;
        height: 0.34rem;
        overflow: hidden;
        .sunb_topleft{
          float: left;
          width: 80%;
          h4{
            font-weight: normal;
            font-size: 0.14rem;
            color: #333;
          }
          label{
            font-size: 0.12rem;
            color: #666;
            display: block;
          }
        }
        span{
          display: block;
          width: 0.2rem;
          height: 0.34rem;
          float: right;
          background: url("https://resource.jtsc.club/zan_d_h@2x.png") no-repeat left center;
          background-size: 0.2rem;
        }
      }
      b{
        font-weight: normal;
        font-size: 0.15rem;
        color: #333;
        margin-top: 0.1rem;
        display: block;
      }
      .sunb_come{
        background: #F8F8F8;
        padding: 0.1rem;
        margin-top: 0.08rem;
        h3{
          font-weight: normal;
          font-size: 0.15rem;
          color: #333;
          margin-top: 0.06rem;
          &:first-child{
            margin-top: 0;
          }
          span{
            color: #FF1E41;
          }
        }
      }
    }
  }
  .sunb_bot{
    position: fixed;
    bottom: 0;
    width: 92%;
    padding: 0 4%;
    height: 0.5rem;
    background: #fff;
    span{
      display: block;
      float: left;
      height: 0.5rem;
      margin-left: 3%;
      line-height: 0.5rem;
      padding-left: 0.24rem;
      background: url("https://resource.jtsc.club/zan_d_h@2x.png") no-repeat left center;
      background-size: 0.2rem;
      color: #FF1E41;
    }
    label{
      display: block;
      float: left;
      height: 0.5rem;
      margin-left: 7%;
      line-height: 0.5rem;
      background: url("https://resource.jtsc.club/ping_d@2x.png") no-repeat left center;
      background-size: 0.2rem;
      padding-left: 0.24rem;
    }
    p{
      width: 1.0rem;
      height: 0.36rem;
      background: #FF1E41;
      color: #fff;
      float: right;
      border-radius: 4px;
      font-size: 0.16rem;
      text-align: center;
      line-height: 0.36rem;
      margin-top: 0.07rem;
      margin-right: 4%;
    }
  }
  .onpy{
    width: 100%;
    height: 0.4rem;
    background: red;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    border-top: 1px solid #ddd;
    label{
      display: block;
      float: left;
      height: 0.4rem;
      margin-left: 3%;
      line-height: 0.4rem;
      padding-left: 0.24rem;
      background: url("https://resource.jtsc.club/zan_d_h@2x.png") no-repeat left center;
      background-size: 0.2rem;
      color: #FF1E41;
    }
    input{
      width: 72%;
      height: 0.26rem;
      margin-top: 0.06rem;
      margin-left: 3%;
      background: #fff;
      border-radius: 6px;
      float: left;
      padding: 0 2%;
    }
    span{
      width: 14%;
      background: #FF1E41;
      display: block;
      height: 0.3rem;
      float: left;
      color: #fff;
      font-size: 0.12rem;
      text-align: center;
      line-height: 0.3rem;
      border-radius: 8px;
      margin: 0.05rem 0 0 3%;
    }
    p{
      width: 0.55rem;
      height: 0.3rem;
      background: #FF1E41;
      color: #fff;
      float: right;
      border-radius: 4px;
      font-size: 0.12rem;
      text-align: center;
      line-height: 0.3rem;
      margin-top: 0.05rem;
      margin-right: 4%;
    }
  }
  .gobuy{
    width: 0.4rem;
    height: 0.4rem;
    background: #fff;
    position: fixed;
    bottom: 0.8rem;
    right: 3%;
    border: 1px solid #FF1E41;
    border-radius: 50%;
    img{
      width: 0.32rem;
      height: 0.32rem;
      margin: 0.04rem;
    }
  }
</style>
