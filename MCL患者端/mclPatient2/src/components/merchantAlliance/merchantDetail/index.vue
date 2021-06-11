<template>
    <div>
      <img src="https://resource.jtsc.club/fanhui_yuan@2x.png" v-on:click="back()" class="return_back" />
      <img :src="listy.businessImage" class="det_img" />
      <div class="det_name">
        <h3>{{listy.businessName}}</h3>
        <p>
          <!--<span v-for="(itemd,indexd) in listy.subjectLists" :key="indexd">{{itemd.subjectName}}</span>-->
          <span>{{listy.subjectName}}</span>
        </p>
        <div class="det_phone">
          <div class="det_money">
            <label>营业时间：{{listy.businessDate}}</label>
            <label>人均消费：{{listy.consumption}}</label>
            <label>优惠政策：{{listy.favouredPolicy}}</label>
          </div>
          <!--<a :href="'tel:'+listy.mobilePhone" @click="telp"></a>-->
          <a href="javascript:;" @click="telp"></a>
        </div>
      </div>
      <router-link :to="`/mapadress/${lnglat}`">
        <div class="det_adress">
          <img src="https://resource.jtsc.club/dingwei@2x.png" />
          <div class="det_lang">
            <h3>{{listy.businessAddress}}</h3>
            <p>{{listy.distance}}</p>
          </div>
        </div>
      </router-link>
      <div class="det_shopfw">
        <h3>商家服务</h3>
        <div class="det_list" v-for="(item,index) in list" :key="index">
          <router-link :to="`/${detailPage}/${skeyd}/${item.goodsId}`">
            <img :src="item.goodsImage" />
            <div class="det_shopname">
              <h2>{{item.goodsName}}</h2>
              <p>
                <span>{{item.content}}</span>
                <label>¥{{item.marketPrice}}</label>
              </p>
              <i>{{item.opularityValue}}</i>
            </div>
          </router-link>
        </div>
      </div>
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
      </mt-actionsheet>
    </div>
</template>

<script>
    export default {
        name: "index",
        data:()=>({
          detailPage:'mershopdetail',
          skeyd:'',
          listy:[],  //上面信息
          list:[],  //商家列表
          actions:[
            {
              name: '高德地图导航',
              method: ""
            }
          ],
          nowlng:'117.246391',
          nowlat:'39.070202',
          lnglat:'',
          sheetVisible: false,  //是否显示
        }),
        methods:{
          back: function(index) {
            this.$router.back()
          },
          //显示地图
          actionsheetToggle(state){
            this.$router.push('/mapadress');
            // if(state == "show"){
            //   this.sheetVisible = true;
            // }
            // if(state == "hide"){
            //   this.sheetVisible = false;
            // }
          },
          //获取商品信息
          showbg(sKey){
            this.skeyd=sKey;
            let url = "UserInterface/BusinessUnion/getbusinessProductInfo.ashx";
            let param={
              businesskey:sKey,
              lng:this.nowlng,
              lat:this.nowlat
            };
            this.$post(url,param).then((data) => {
              if(data.rspcode==0){
                return;
              }
              this.listy=data.business;
              this.list=data.data;
              this.lnglat=data.business.lng+","+data.business.lat;
            })
          },
          //打电话
          telp(){
            this.$MessageBox.alert('商家手机号：'+this.listy.mobilePhone);
          },
          //点击进详情
          comedetl(){
            this.$router.push('/mershopdetail');
          },
          baidu(){

          },
          gaode(){
            // let UserKey=JSON.parse(localStorage.userInfo).UserKey;
            // let SessionId=JSON.parse(localStorage.userInfo).SessionId;
            // window.location.href=`ctmda.html?UserKey=${UserKey}&SessionId=${SessionId}&shopname=${this.listy.businessName}&shopadress=${this.listy.businessAddress}&positlng=117.246391&positlat=39.070202&type=10`;
            window.location.href='https://uri.amap.com/marker?position=117.2466000000,39.0707000000&name=香年广场';
          }
        },
      mounted(){
        let sKey = this.$route.params.key;
        this.showbg(sKey);
        let ayr=this.$root.longLat.split(',');
        this.nowlng=ayr[0];
        this.nowlat=ayr[1];
        this.actions = [{
          name: '百度地图导航',
          method: this.baidu
          },
          {
            name: '高德地图导航',
            method: this.gaode
          }
        ]
      }
    }
</script>

<style scoped lang="scss">
.return_back{
  position: fixed;
  left: 3%;
  top: 0.1rem;
  width: 0.3rem;
  height: 0.3rem;
  z-index: 9;
}
  .det_img{
    width: 100%;
  }
  .det_name{
    background: #fff;
    padding: 0.06rem 3%;
    h3{
      font-size: 0.16rem;
      color: #333333;
      font-weight: normal;
    }
    p{
      overflow: hidden;
      margin-top: 0.08rem;
      span{
        display: block;
        float: left;
        padding: 0 0.08rem;
        height: 0.20rem;
        line-height: 0.21rem;
        border-radius: 4px;
        margin-right: 2%;
        color: #FF3D3D;
        border: 1px solid #FF3D3D;
        font-size: 0.12rem;
        &.yellows{
          border-color: #FF9F00;
          color: #FF9F00;
        }
        &.blues{
          border-color: #27BF7D;
          color: #27BF7D;
        }
      }
    }
  }
  .det_phone{
    overflow: hidden;
    margin-top: 0.045rem;
    .det_money{
      float: left;
      label{
        display: block;
        color: #666666;
        font-size: 0.13rem;
        margin-top: 0.035rem;
      }
    }
    a{
      display: block;
      width: 0.26rem;
      height: 0.26rem;
      background: url("https://resource.jtsc.club/phone@2x.png") no-repeat;
      background-size: 0.26rem;
      float: right;
      margin-top: 0.16rem;
    }
  }
  .det_adress{
    padding: 0.08rem 3%;
    margin-top: 0.06rem;
    overflow: hidden;
    background: #fff url("https://resource.jtsc.club/jiantou_right_h@2x.png") no-repeat 98% center;
    background-size: 0.24rem;
    img{
      width: 0.18rem;
      height: 0.2rem;
      float: left;
      margin-top: 0.1rem;
    }
    .det_lang{
      float: left;
      margin-left: 0.1rem;
      h3{
        font-size: 0.15rem;
        color: #333333;
        font-weight: 200;
      }
      p{
        font-size: 0.13rem;
        color: #666;
        margin-top: 0.06rem;
      }
    }
  }
  .det_shopfw{
    width: 94%;
    padding: 0 3%;
    background: #fff;
    margin-top: 0.06rem;
    h3{
      font-size: 0.15rem;
      color: #282828;
      font-weight: 200;
      padding: 0.08rem 0;
    }
    .det_list{
      border-bottom: 1px solid #EEEEEE;
      overflow: hidden;
      padding: 0.08rem 0;
      img{
        width: 0.74rem;
        height: 0.74rem;
        float: left;
      }
      .det_shopname{
        float: left;
        margin-left: 2%;
        width: 75%;
        h2{
          color: #484848;
          font-size: 0.16rem;
          font-weight: 200;
        }
        p{
          font-size: 0.14rem;
          color: #666;
          overflow: hidden;
          margin-top: 0.06rem;
          span{
            float: left;
            display: block;
          }
          label{
            color: #FF7B00;
            float: right;
            display: block;
          }
        }
        i{
          font-style: normal;
          color: #666;
          font-size: 0.14rem;
          margin-top: 0.06rem;
          display: block;
        }
      }
    }
  }
</style>
