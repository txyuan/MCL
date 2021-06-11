<template>
    <div>
      <header class="header_search fix_top borderBottom">
        <header-back>
          <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
        </header-back>
        <input type="text" placeholder="搜索城市,请输入城市全称" class="seach_input" v-model="searchVal">
        <!--<i class="right-del" @click="delInput">搜索</i>-->
          <i class="sercher_del" @click="okInput(searchVal)">确定</i>
      </header>
      <div class="chosecity">
        <!--<p class="nowcity" @click="searcity('天津市')">当前：天津市</p>-->
        <div class="chosejing">
          <span>最近访问</span>
          <div class="chosenow">
            <label v-for="items in citylocal" @click="chosecity(items)">{{items}}</label>
          </div>
        </div>
        <div class="chosejing">
          <span>热门城市</span>
          <div class="chosenow">
            <label v-for="(item,index) in list" :key="index" @click="chosecity(item.city)">{{item.city}}</label>
          </div>
        </div>
        <div class="choseabc">
          <mt-index-list :show-indicator="false">
            <mt-index-section v-for="(item,index) in cityData" :key="index" :index="item.name">
              <div v-for="(iten,indexd) in item.cities" :key="indexd" @click="delInput(iten.name)">
                <mt-cell :title="iten.name"></mt-cell>
              </div>
            </mt-index-section>
          </mt-index-list>
        </div>
      </div>
    </div>
</template>

<script>
    import cityData from "@/assets/js/cityIndex.js";
    export default {
        name: "choi-city",
        data:()=>({
          list:[],
          searchVal:"",
          citylocal:[],
          cityData
        }),
        methods:{
          //获取热门城市列表
          showbg(){
            let url = "UserInterface/BusinessUnion/getbusinessAddressInfo.ashx";
            this.$post(url).then((data) => {
              if(data.rspcode==0){
                return;
              }
              this.list=data.data;
            })
          },
          newfw(){
            if(localStorage.citylocalr) {
              this.citylocal = JSON.parse(localStorage.citylocalr);
            }
          },
          //选择城市
          chosecity(citys){
            console.log(citys)
            this.gongg(citys)
          },
          delInput(citys){
            this.gongg(citys)
          },
          okInput(citys){
            if(citys==''){
              this.$Toast('请输入您要查看的城市全称');
              return;
            }
            this.gongg(citys)
          },
          searcity(citys){
            this.gongg(citys)
          },
          gongg(citys){
            if(localStorage.citylocalr){
              this.citylocal=JSON.parse(localStorage.citylocalr);
              for(let i=0;i<this.citylocal.length;i++){
                if(citys==this.citylocal[i]){
                  this.citylocal.splice(i,1);
                }
              }
              this.citylocal.unshift(citys);
              if(this.citylocal.length>3){
                this.citylocal.pop();
              }
              localStorage.citylocalr=JSON.stringify(this.citylocal);
            }else{
              this.citylocal.push(citys);
              localStorage.citylocalr=JSON.stringify(this.citylocal);
            }
            this.$router.push('/wx_Entrance/merchantAlliance/2');
          }
        },
        mounted(){
          this.showbg();
          this.newfw();
        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .header_search{
    padding: 0.08rem 0.1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
  }
  .seach_input{
    height: 26px;
    line-height: 26px;
    flex: 1;
    margin: 0 10px;
    border: none;
    font-family: "Helvetica Neue", "Helvetica", "STHeiTi", "sans-serif";
  }
  .right-del{
    width: 18px;
    height: 18px;
    display: inline-block;
    background: url("https://resource.jtsc.club/search_delete@2x.png") no-repeat center;
    background-size: cover;
  }
  .sercher_del{
    font-size: 0.14rem;
    font-style: normal;
    color: #333;
  }
  .chosecity{
    padding-top: 48px;
  }
  .nowcity{
    padding: 0 3%;
    background: #fff;
    height: 0.44rem;
    font-size: 0.15rem;
    color: #333;
    line-height: 0.44rem;
  }
  .chosejing{
    span{
      font-size: 0.14rem;
      color: #666;
      display: block;
      padding: 0.12rem 3% 0 3%;
    }
    .chosenow{
      overflow: hidden;
      label{
        display: block;
        float: left;
        height: 0.36rem;
        line-height: 0.37rem;
        background: #fff;
        border: 1px solid #ddd;
        text-align: center;
        font-size: 0.14rem;
        color: #666;
        width: 30%;
        margin-left: 2.5%;
        margin-top: 0.1rem;
        text-overflow: ellipsis;
        overflow:hidden;
        white-space: nowrap;
      }
    }
  }
</style>
