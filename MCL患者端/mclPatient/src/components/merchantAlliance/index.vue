<template>
    <div>
      <div id="class_header" class="shopny fix_top">
        <mt-header title="商家联盟">
          <router-link to="/ChoiCity" slot="left">
            <mt-button style="font-size: 0.14rem" v-if="$route.params.cont == 1">{{cityName}}</mt-button>
            <mt-button style="font-size: 0.14rem" v-if="$route.params.cont == 2">{{param.city}} <i v-show="false">{{cityName}}</i></mt-button>
          </router-link>
        </mt-header>
        <div class="head_nav">
          <nav-bar :param="param" @triggerLoad="startLoad" @resetParam="resetParam" ref="navBar"/>
        </div>
      </div>

      <!--<div class="noDataImg" style="padding-top: 0.4rem">
        <img src="https://resource.jtsc.club/sorry_img.png" class="noData">
        <p>抱歉，暂未开放…</p>
      </div>-->
      <div style="padding-top: 88px;">
        <loadMore :param="param" @triggerGetList="loadData" ref="loadMoreE" :isDefaultLoading="false" style="padding-bottom: 55px;">
          <div  slot="content" >
            <merchitem  v-for="(item,index) in list" :key="index" :item="item" detailPage="merchantDetail" />
          </div>
        </loadMore>
      </div>
    </div>
</template>

<script>
    import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
       import navBar from "./navbar/navbar.vue";  //导航
    import merchitem from "@/components/merchantAlliance/item.vue";   //列表
    export default {
        name: "index",
           data:()=>({
             // poscity:'天津市',
             citycs:'',
             isDefaultLoading: false, //默认不加载列表
             param : {
               pagesize:10,
               pagecount: 0,
               city: '',
               secondSubjectType:'',
               distance:'',
               subjectType:'',
               intelligencesort:0,
               lng:'',
               lat:'',
               distanceType:''
             },
             citylocal:[],
             paramString:"",    //param 默认的筛选条件字符串
             list:[]
           }),
           computed:{
             cityName: {
               get: function () {
                 if(this.$root.longLat != ""){
                   let ayr = this.$root.longLat.split(',');
                   this.param.lng = ayr[0];
                   this.param.lat = ayr[1];
                 }
                 if((this.$route.params.cont == 1)&&(this.$root.longLat != "") ){
                   let ayr = this.$root.longLat.split(',');
                   let city = ayr[2];
                   this.param.city = city;
                   //触发加载
                   if(this.isDefaultLoading == false){
                     setTimeout(()=>{
                       this.gongg(city);  //加载距离列表
                       this.startLoad();
                       this.isDefaultLoading = true;
                     },0)
          
                   }
                   return city;
                 }
                 }
             }
           },
           methods:{
             getcity(cont){
               if(cont==2){
                 let cityName = JSON.parse(localStorage.citylocalr)[0];
                 this.param.city = cityName;
                 this.gongg(cityName);  //加载距离列表
                 this.startLoad();
               }else{
                 //this.poscity=this.citycs;
                 this.param.city = this.cityName;
               }
             },
             //触发加载更多
             startLoad(){
               this.param.pagecount = 0;
               this.$refs.loadMoreE.getList();
             },
             //商品列表
             loadData(success){
               let url = "UserInterface/BusinessUnion/GetBusinessUnionList.ashx";
               if(this.param.pagecount == 1){
                 this.list.splice(0,this.list.length);
               }
               this.$post(url,this.param).then((data)=>{
                 // if(data.rspcode != 1 ){
                 //   return;
                 // }
                 let modelList = data.businessList;
                 this.list = [...this.list,...modelList]
                 //加载更多组件触发回调
                 if(success){
                   success(modelList,this.list)
                 }
               })
             },
             //重置筛选条件
             resetParam(){
               const {secondSubjectType,distance,intelligencesort,distanceType} = JSON.parse(this.paramString)
               this.param.secondSubjectType = secondSubjectType;
               this.param.distance = distance;
               this.param.intelligencesort = intelligencesort;
               this.param.distanceType=distanceType;
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
               //加载子组件的距离
               // const navBar = this.$refs;
               // console.log(navBar)
               // navBar.getcitys();
             }
           },
           mounted(){
             let cont = this.$route.params.cont;
             this.paramString = JSON.stringify(this.param);
             // let ayr=this.$root.longLat.split(',');
             // if(cont==1){
             //   this.citycs=ayr[2];
             // }
             this.getcity(cont);
           },
           components:{
               merchitem,
               navBar: () => import(/* webpackChunkName: "navbar" */"./navbar/navbar.vue"),
               loadMore
           }
    }
</script>

<style scoped lang="scss">
  .noDataImg {
    margin-top: 50px;
    font-size: 13px;
    img {
      width: 50px;
      margin: 0 auto;
      margin-bottom: 12px;
      display: block;
    }
    p{
      text-align: center;
    }
  }
  .content.classificationContent ul{
    margin: 0;
  }
</style>
