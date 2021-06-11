<template>
    <div>
      <div class="fix_top">
        <mt-header title="我的寄卖" class="borderBottom">
          <div slot="left">
            <router-link to="/wx_Entrance/personal" style="color: initial;">
              <mt-button icon="back"></mt-button>
            </router-link>
          </div>
        </mt-header>
        <div class="myc_nav" id="navbar">
          <!--<ul>-->
            <!--<li v-for="item in navlist" @click="addClass(item.type)" :key="item.type" :class="(param.Status == item.type) && 'act'">-->
              <!--<span>{{item.name}}</span>-->
            <!--</li>-->
            <mt-navbar>
              <mt-tab-item  id="" v-for="item in navlist" :key="item.type" :class="(param.status == item.type) && 'is-selected'" @click.native="tab(item.type)"><p>{{item.name}}</p></mt-tab-item>
            </mt-navbar>
          <!--</ul>-->
        </div>
      </div>
      <!--商品-->
      <div style="padding-top: 0.87rem">
        <loadMore :param="param" @triggerGetList="jmlist" ref="loadMoreE">
          <div slot="content">
            <items v-for="(item,index) in list" :key="index" :item="item">
              <div slot="footer">
                <div class="myc_bbtn" v-if="item.state==0">
                  <p>结束时间：<span>{{item.distanceends}}</span></p>
                  <div class="myc_bbtnan" v-if="item.flag==1">  <!-- 1抢购结束   2抢购中  -->
                    <span>合计：<i>¥{{item.orderMoney}}</i></span>
                    <label @click="refunds(item.orderId)">退款</label>
                    <label @click="fatherMethod(item.orderId)">提货</label>
                    <label @click="gopifa(item)" v-if="item.AdvanceDateflag == 1">转入下一期</label> 
                  </div>
                </div>
                <div class="myc_bbtn" v-else-if="item.state==1">
                  <div class="myc_bbtnan">
                    <span>合计：<i>¥{{item.orderMoney}}</i></span>
                    <label><router-link to="personal_contribution_value">查看收益</router-link></label>
                    <u>收益已到账，请注意查收</u>
                  </div>
                </div>
                <div class="myc_bbtn" v-else-if="item.state==2">
                  <div class="myc_bbtnan">
                    <span>合计：<i>¥{{item.orderMoney}}</i></span>
                    <label><router-link to="personalcommission/balance">查看余额</router-link></label>
                    <u>已退款</u>
                  </div>
                </div>
              </div>
            </items>
          </div>
        </loadMore>
      </div>
      <div class="myc_adress" v-show="hideadress">
        <div class="myc_cadress">
          <div class="myc_chose">
            <p>选择收货地址</p>
            <span @click="hideadrs"></span>
          </div>
          <div class="myc_adul">
            <div class="myc_adlist" v-for="(item,index) in listadres" :key="index">
              <span @click="setDefaultAdr(index,item.sKey)" class="myc_actv" :class="{myc_actve: index == isactv}"></span>
              <div class="myc_acont" @click="edit(item)">
                <p>
                  <span>{{item.UserName}}</span>
                  <i>{{item.UserPhone}}</i>
                  <label class="mra" v-if="item.isDefault==1">默认</label>
                </p>
                <u>{{item.UserAddress}} {{item.UserDetailsAddress}}</u>
              </div>
            </div>

            <p class="myc_addadrs">
              <router-link to="/personaladdadress/add">
                +添加地址
              </router-link>
            </p>
          </div>
          <span class="myc_okbtn" @click="okupshop">确定</span>
        </div>
      </div>
    </div>
</template>

<script>
    import items from "./item.vue";
    import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
    export default {
        name: "index",
        data:()=>({
          hideadress:false,
          adreskey:'',
          isactv:0,
          param : {
            status: -1,
            pagesize: 10,
            pagecount: 0
          },
          navlist:[{name:"全部",type:"-1"},{name:"待卖",type:"0"},{name:"已卖",type:"1"},{name:"退款",type:"2"}],
          list:[],
          listadres:[],
          goodsId:'',  //商品id
          orderkey:'',  //提货使用到的商品key
          vall:-1
        }),
        methods:{
          tab(val){
            this.vall=val;
            this.$Indicator.loading();
            this.param.status = val;
            this.param.pagecount = 0;
            this.$refs.loadMoreE.getList();  //触发加载更多
            setTimeout(()=>{
              this.$Indicator.close();
            },200)
          },
          //隐藏地址
          hideadrs(){
            this.hideadress=false;
          },
          //跳到优先批发列表页面
          gopifa(item){
          	//配额OrderPeiEr   金额orderMoney   份数buyCount
          	const {orderId,OrderPeiEr,orderMoney,buyCount} = item;
          	this.$router.push(`/wholesaleAreaFirst?orderId=${orderId}&OrderPeiEr=${OrderPeiEr}&orderMoney=${orderMoney}&buyCount=${buyCount}`);
          },
          //提货
          fatherMethod(orderId) {
            this.$MessageBox.confirm('提货后该订单将取消寄卖，您确定进行提货吗?').then(action => {
              // this.okupshops();
              let url = "UserInterface/order/DeliveryGoodsCheck.ashx";
              let param= {
                "orderkey": orderId
              };
              this.$post(url, param).then((data) => {
                if (data.rspcode != 1) {
                  this.$Toast(data.rspdesc);
                  return;
                }
                this.getAdrList();
                this.hideadress=true;
                this.orderkey=orderId
              })
            });
          },
          //退款
          refunds(goodsId){
            let url = "UserInterface/order/UpdateOrderRefundInfo.ashx";
            let param= {
              "orderkey": goodsId
            };
            this.$post(url, param).then((data) => {
              this.$Toast(data.rspdesc);
              if (data.rspcode != 1) {
                return;
              }
              this.param.status = this.vall;
              this.param.pagecount = 0;
              this.$refs.loadMoreE.getList();  //触发加载更多
              setTimeout(()=>{
                this.$Indicator.close();
              },200)
            })
          },
          //选择地址
          setDefaultAdr(index,skey){
            this.isactv=index;
            this.adreskey=skey;
          },
          //选择
          addClass:function(index){
            this.param.Status=index;
            this.$Indicator.loading();
            this.param.pagecount = 0;
            this.$refs.loadMoreE.getList();  //触发加载更多
            setTimeout(()=>{
              this.$Indicator.close();
            },200)
          },
          //获取商品
          jmlist(success){
            let url = "UserInterface/MyObtainedConsignment.ashx";
            this.$post(url,this.param).then((data)=>{
              if(data.rspcode != 1 ){
                return;
              }
              let modelList = data.goodsList;
              if(this.param.pagecount == 1){
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
          //获取地址列表
          getAdrList() {
            let url = "UserInterface/GetUserAddressList.ashx";
            let param= {
               "pagesize": 100,
               "pagecount": 1,
               "OrderBy": 0
            };
            this.$post(url, param).then((data) => {
              if (data.rspcode != 1) {
                return;
              }
              let modelList = data.VUserAddressInfo;
              this.listadres = [...modelList];
              for(var i in modelList){
                if(modelList[i].isDefault==1){
                  this.isactv=i;
                  this.adreskey=modelList[i].sKey;
                }
              }
            })
          },
          edit(item){
            this.$router.push(`/personaladdadress/edit?skey=${item.sKey}`)
          },
          //确定提货
          okupshop(){
            this.okupshops();
          },
          okupshops(){
            let url = "UserInterface/order/UpdateOrderAddressInfo.ashx";
            let param= {
              "orderkey": this.orderkey,
              "addresskey": this.adreskey,
              "isConsign":1
            };
            this.$post(url, param).then((data) => {
              if (data.rspcode != 1) {
                this.$Toast("提货失败！");
                return;
              }
              this.$Toast("提货成功！");
              this.hideadress = false;
              this.$Indicator.loading();
              this.param.pagecount = 0;
              this.$refs.loadMoreE.getList();  //触发加载更多
              setTimeout(()=>{
                this.$Indicator.close();
              },200)
            })
          }
        },
        beforeRouteLeave (to, from, next) {
          //不能返回支付成功页面
	      if(to.name == "wholesaleAreaPaySuccess"){
	      	next("/wx_Entrance/personal")
	      	return;
	      }
      	  next()
        },
        mounted(){

        },
        components:{
          items,
          loadMore
        }
    }
</script>

<style scoped>
  .myc_nav ul{
    overflow: hidden;
    background: #fff;
  }
.myc_nav ul li{
  width: 25%;
  float: left;
  text-align: center;
  font-size: 0.15rem;
  color: #666666;
  padding: 0.12rem 0;
}
  .myc_nav ul li span{
    padding-bottom: 0.1rem;
  }
  .myc_nav ul li.act span{
    color: #FF3D3D;
    border-bottom: 2px solid #FF3D3D;
    box-sizing: border-box;
  }
  .myc_adress{
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    background: rgba(000,000,000,0.5);
  }
  .myc_cadress{
    width: 100%;
    height: 65%;
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .myc_chose{
    width: 100%;
    height: 0.44rem;
    border-bottom: 1px solid #EEEEEE;
    position: relative;
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
    height: 3.0rem;
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
    background: url("./../../../assets/images/select@2x.png") no-repeat center center;
    background-size: 0.18rem 0.18rem;
  }
  .myc_adlist .myc_actv.myc_actve{
    background: url("./../../../assets/images/select_click@2x.png") no-repeat center center;
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
    text-align: center;
    line-height: 0.36rem;
  }
  .myc_addadrs a{
    color: #FF3D3D;
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
</style>
