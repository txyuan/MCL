<template>
    <div>
      <mt-header fixed title="计算结果">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <div class="last_cont">
      <p class="last_time">截止该商品最后100条全站购买时间记录</p>
      <table class="last_table" cellpadding="0" cellspacing="0">
        <thead>
          <th>购买时间</th>
          <th>转换数据</th>
          <th>会员账号</th>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td>{{item.CreateTime}}</td>
            <td>{{item.ProBuyCode}}</td>
            <td>{{item.ContactName}}</td>
          </tr>
        </tbody>
      </table>
      <!--<div class="last_bot">-->
        <!--<p>取以上数值结果得：</p>-->
        <!--<p>1、求和：10495000220<span>(上面100条购买记录时间之和)</span></p>-->
        <!--<p>2、取余：10495000220<span>(步骤1获得的数值)</span>-->
          <!--% 4688<span>(本商品总需参与人次)</span> = 2748<span>(余数)</span></p>-->
        <!--<p>3、计算结果：2748<span>(余数)</span> + 10000001 = 10002749</p>-->
      <!--</div>-->
      </div>
    </div>
</template>

<script>
    export default {
        name: "eyelast",
        data:()=>({
          list:[]
        }),
        methods:{
          getList(){
            let ProPhReSkey = this.$route.query.ProPhReSkey;
            let url = "UserInterface/GetPurchaseRecordList.ashx";
            let param = {
              PageSize: 100,
              PageCount: 1,
              ProPhReSkey
            };
            this.$post(url,param).then((data)=>{
              if(data.rspcode == 1){
                  this.list = data.data;
              }
            })
          }
        },
        mounted(){
           this.getList()
        }
    }
</script>

<style scoped>
  .last_cont{
    padding-top: 43px;
  }
.last_time{
  background: #FF1E41;
  color: #fff;
  font-size: 0.12rem;
  padding: 0.06rem 3%;
  line-height: 0.18rem;
}
  .last_table{
    width: 100%;
    font-size: 0.12rem;
  }
.last_table th{
  font-weight: normal;
  text-align: left;
  text-indent: 1%;
  height: 0.3rem;
}
.last_table th:nth-child(2){
  color: #FF6600;
}
.last_table tr{
  height: 0.32rem;
}
.last_table td{
  text-align: center;
  border-top: 1px solid #FFB7B9;
  border-left: 1px solid #FFB7B9;
}
.last_table tr td:nth-child(1){
  border-left: none;
  color: #666;
}
.last_table tr td:nth-child(2){
  color: #FF6600;
  border-left: 1px solid #FF6600;
}
.last_table tr td:nth-child(3){
  color: #333;
  border-left: 1px solid #FF6600;
}
  .last_bot{
    background: #FF1E41;
  }
.last_bot p{
  padding: 0.08rem 3%;
  color: #fff;
  line-height: 0.2rem;
  font-size: 0.12rem;
  border-bottom: 1px solid #E31F39;
}
.last_bot p span{
  color: #FFB7B9;
}
</style>
