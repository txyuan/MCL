<template>
    <div>
      <mt-header fixed title="收货地址">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>

      <loadMore :param="param" @triggerGetList="getAdrList" ref="loadMoreE" class="padding-header padding-footer">
        <div class="adress_list" slot="content">
          <div class="adress_li" v-for="(item,index) in list" :key="item.sKey">
            <p>
              <span>{{item.UserName}}</span>
              <label>{{item.UserPhone}}</label>
            </p>
            <h3>{{item.UserAddress}} {{item.UserDetailsAddress}}</h3>
            <div class="adress_chose">
              <span v-on:click="setDefaultAdr(item)" v-bind:class="{actives: item.isDefault== 1}" v-if="isForm==''">默认地址</span>
              <span v-on:click="oderAdr(item)" v-bind:class="{actives: item.isDefault== 1}" v-else>收货地址</span>
              <ul v-if="isForm == ''">
                <li @click="edit(item)">编辑</li>
                <li @click="del(item)">删除</li>
              </ul>
            </div>
          </div>
        </div>
      </loadMore>

      <router-link to="/personaladdadress/add" class="buttons">
        <mt-button type="danger" class="add_btns" size="large">添加地址</mt-button>
      </router-link>

    </div>
</template>

<script>
    /*   中奖记录的修改地址   和  我的商品的修改地址   */
    import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
    export default {
        name: "index",
        data:()=>({
          isForm: "",
          param: {
            "pagesize": 10,
            "pagecount": 0,
            "OrderBy": 0
          },
          list: []
        }),
        methods:{
          //获取列表
          getAdrList(success){
            let url = "UserInterface/GetUserAddressList.ashx";
            this.$post(url,this.param).then((data)=>{
              if(data.rspcode != 1 ){
								return;
              }
              let modelList = data.VUserAddressInfo;

              if(this.isForm == "productlist"){
                modelList.forEach((item)=>{
                  item.isDefault = "";
                })

              }

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
          //设置地址
          setAdr(item){
            if(this.isForm == "productlist"){
              this.oderAdr(item)
            }else{
              this.setDefaultAdr(item)
            }
          },
          //我的商品的修改地址
          oderAdr(item){
            //获得的商品页面
            let url = "UserInterface/order/UpdateOrderAddressInfo.ashx";
            let param = {
              OrderKey: this.$route.query.OrderKey,
              "AddressKey": item.sKey
            }

            //大转盘提取商品过来的
            if(this.$route.query.formPage){
              url = "UserInterface/UpdateAwardsOrderDetailsContact.ashx";
              param = {
                OrderDetailsKey: this.$route.query.OrderKey,
                "AddressKey": item.sKey
              }
            }
            this.$Indicator.loading();
            this.$post(url,param).then((data)=>{
              if(data.rspcode == 1){
                this.$Indicator.close();
                this.$Toast(data.rspdesc);
                if(data.rspcode == 1){
                  item.isDefault = "1";  //样式选中
                  setTimeout(()=>{
                    this.$router.back();
                  },500)
                }
              }
            })
          },
          //设置默认地址
          setDefaultAdr(item){
            let url = "UserInterface/UpdateDefaultUserAddressInfo.ashx";
            let param = {
              "sKey": item.sKey
            }
            this.$Indicator.loading();
            this.$post(url,param).then((data)=>{
              if(data.rspcode == 1){
                this.param.pagecount = 0;
                this.$refs.loadMoreE.getList();
                this.$Indicator.close();
              }
            })
          },
          edit(item){
            this.$router.push(`/personaladdadress/edit?skey=${item.sKey}`)
          },
          del(item){
            this.$Indicator.loading();
            let url = "UserInterface/DeleteUserAddressInfo.ashx";
            let param = {
              "sKey": item.sKey
            }
            this.$post(url,param).then((data)=>{
              if(data.rspcode == 1){
                this.param.pagecount = 0;
                this.$refs.loadMoreE.getList();
                this.$Indicator.close();
              }
            })
          }
        },
        mounted(){
          //从 我的商品页面 或者 中奖记录页面 过来的
          if(this.$route.query.OrderKey){
               this.isForm = "productlist";
          }
        },
        components:{
          loadMore
        }
    }


</script>

<style scoped>
.adress_li{
  width: 100%;
  background: #fff;
  margin-top: 0.06rem;
}
.adress_li p{
  width: 94%;
  margin: 0 auto;
  overflow: hidden;
  line-height: 0.45rem;
  color: #404040;
  font-size: 0.16rem;
}
.adress_li p span{
  float: left;
}
.adress_li p label{
  float: right;
  font-weight: normal;
}
.adress_li h3{
  width: 94%;
  margin: 0 auto;
  font-size: 0.14rem;
  color: #606060;
  font-weight: normal;
  padding-bottom: 0.1rem;
}
  .adress_chose{
    width: 94%;
    margin: 0 auto;
    height: 0.4rem;
    border-top: 1px dashed #E0E0E0;
  }
.adress_chose span{
  height: 0.4rem;
  line-height: 0.4rem;
  display: block;
  float: left;
  font-size: 0.16rem;
  color: #404040;
  width: 0.9rem;
  background: url("./../../../assets/images/select@2x.png") no-repeat;
  background-size: 0.2rem;
  background-position: left center;
  text-align: right;
}
.adress_chose span.actives{
  background: url("./../../../assets/images/select_click@2x.png") no-repeat;
  background-size: 0.2rem;
  background-position: left center;
}
.adress_chose ul{
  float: right;
}
.adress_chose ul li{
  width: 0.7rem;
  text-align: right;
  padding-right: 0.1rem;
  border: 1px solid #eee;
  float: left;
  height: 0.25rem;
  font-size: 0.14rem;
  line-height: 0.25rem;
  margin: 0.075rem 0 0 0.15rem;
  box-sizing: border-box;
  background: url("./../../../assets/images/bianji_add@2x.png") no-repeat;
  background-size: 0.2rem;
  background-position: 0.05rem center;
}
.adress_chose ul li:nth-child(2){
  background: url("./../../../assets/images/delete_add@2x.png") no-repeat;
  background-size: 0.2rem;
  background-position: 0.05rem center;
}
</style>
