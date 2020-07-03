<template>
    <div>
      <!-- 导航条 -->
      <div class="navbar icon">
        <ul>
          <li  v-for="(item,index) in navList" :key="index" @click="navClick(item,index)">
            <p :class="{active: (index == current)}">{{item.name}}</p>
          </li>
        </ul>
      </div>

      <!-- 遮罩  -->
      <div id="mark" @click="hideMark" ref="mark" style="top: 87px">
        <div class="content classificationContent" style="background: #fafafa;" @click.stop="">
          <div class="" v-if="current == 1" >
            <div class="select_wrap clear navclick">
              <ul style="width: 45%;background: #fff;" class="float_left">
                <li v-for="(items,indexs) in navList[1].list" :key="indexs" @click="leftlist(indexs,items.firstLevelId)" v-bind:class="{actives: indexs==currents}">{{items.firstLevelName}}</li>
              </ul>
              <ul style="width: 55%;" class="float_left">
                <li v-for="(itemd,indexd) in currentlist" :key="indexd" @click="addClassFun(indexd,itemd)" v-bind:class="{actives: indexd==currentd}">{{itemd.twoLevelName}}</li>
              </ul>
            </div>

          </div>
          <div v-if="current == 2">
            <div class="select_wrap clear navclick">
              <ul style="width: 45%;background: #fff;" class="float_left">
                <li v-for="(items,indexs) in cityqlist" :key="indexs" @click="leftqu(items,indexs)" v-bind:class="{actives: indexs==curtleft}">{{items.name}}</li>
              </ul>
              <ul style="width: 55%;" class="float_left">
                <li v-for="(itemd,indexd) in cityjlist" :key="indexd" @click="cityClass(indexd,itemd)" v-bind:class="{actives: indexd==curtright}">{{itemd.name}}</li>
              </ul>
            </div>
          </div>
          <div v-if="current == 3">
            <ul class="clear kacruy" >
              <li v-for="(itemd,indexd) in porder" :key="indexd" @click="addClassorder(indexd,itemd.orindex)" v-bind:class="{acry: indexd==orcurrt}">{{itemd.orname}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
    import addressjson from "@/assets/js/address3.json";
    import searchItem from "@/components/common/navbarContentItem.vue";   //item
    export default {
        name: "navbar",
        props: ['param'],
        data:()=>({
          poscity:'天津市',
          cityqlist:[],
          cityjlist:[],
          addressjson,
          currents:0,  //分类左
          currentd:-1,//分类又
          curtleft:0,  //距离左
          curtright:-1,//距离又
          currentlist:[],
          navList:[
            {
              name:"为您推荐",
              id:0
            },
            {
              name:"选择分类",
              list: [],
              current:"-1",
              id:1
            },
            {
              name:"距离",
              list: [],
              current:"-1",
              id:2
            },
            {
              name:"智能排序",
              list: [],
              current:"-1",
              id:3
            }
          ],
          current: 0,
          porder:[
            {'orname':'智能排序',orindex:0},
            {'orname':'人气值排序',orindex:1},
            {'orname':'新入驻',orindex:2},
          ],
          orcurrt:0
        }),
        methods:{
          //获取城市
          getcitys(){
            // this.cityqlist.splice(0,this.cityqlist.length);
            this.poscity = JSON.parse(localStorage.citylocalr)[0];
            for(let i in addressjson){
              if((this.poscity=='天津市')||(this.poscity=='北京市')||(this.poscity=='重庆市')||(this.poscity=='上海市')){
                if(this.poscity==addressjson[i].name){
                  this.cityqlist=addressjson[i].children[0].children;
                  // this.cityjlist=addressjson[i].children[0].children[0].children;
                }
              }else{
                for(let j in addressjson[i].children){
                  if(this.poscity==addressjson[i].children[j].name){
                    this.cityqlist=addressjson[i].children[j].children;
                    // this.cityjlist=addressjson[i].children[j].children[0].children;
                  }
                }
              }
            }
            if(this.cityqlist[0].name!='附近'){

              let afr={'name':'附近'}
              this.cityqlist.unshift(afr);
            }
            let jdx=[{'name':'1.0km'},{'name':'1.5km'},{'name':'2.0km'},{'name':'2.5km'},{'name':'3.0km'},{'name':'4.0km'},{'name':'5.0km'},{'name':'6.0km'}]
            this.cityjlist=jdx;
          },
          leftqu(coded,indexs){
            this.curtright=-1;
            this.curtleft=indexs;
            if(indexs==0){
              let jdx=[{'name':'1.0km'},{'name':'1.5km'},{'name':'2.0km'},{'name':'2.5km'},{'name':'3.0km'},{'name':'4.0km'},{'name':'5.0km'},{'name':'6.0km'}]
              this.cityjlist=jdx;
            }else{
              this.cityjlist=coded.children;
            }
          },
          //nav 的点击效果
          navClick(item,index){
            this.current = index;
            this.hideMark();
            //默认   重置筛选条件
            if(item.id == 0){
              this.resetParentParam();
              this.addClassorder(0,0);
              this.currents=0;  //分类左
              this.currentd=-1;//分类又
              this.curtleft=0;  //距离左
              this.curtright=-1;//距离又
              // this.param.secondSubjectType='';
              // this.param.distanceType='';
              //this.$emit("triggerLoad");  //触发重新加载
            }
            if(item.id == 2){
              this.getcitys();
            }
            //选择分类 || 距离 || 排序
            if((item.id == 1) || (item.id == 2) || (item.id == 3)) {
              this.showMark();
            }
          },
          //重置筛选条件
          resetParentParam(){
            this.$emit("resetParam");
          },
          //隐藏遮罩
          hideMark(){
            var $mark = this.$refs.mark;
            $mark.style.display = "none"
          },
          //显示遮罩
          showMark(){
            var $mark = this.$refs.mark;
            $mark.style.display = "block"
          },
          // 选择分类
          listitem(){
            let firstsubjecttype = (this.param.firstsubjecttype == "" ? '-1' : this.param.firstsubjecttype);
            let url = "UserInterface/BusinessUnion/getBusinessUnionCategoryList.ashx";
            let param = {
              "areaCode": '341802',
              "subjectKey": firstsubjecttype
            }
            return this.$post(url,param).then((data)=>{
              let subjectList = data.subjectList;
              this.navList[1].list = subjectList;
              this.currentlist=this.navList[1].list[0].levels;
            })
          },
          leftlist(index,utem){
            this.currentd=-1;
            this.currents=index;
            let ind=index;
            this.currentlist=this.navList[1].list[ind].levels;
            this.param.subjectType=utem;
          },
          //单选添加
          addClassFun: function(index,item) {
            this.currentd=index;
            this.navList[this.current].current = index;
            this.param.secondSubjectType=item.twoLevelId;
            this.$emit("triggerLoad");  //触发加载更多
            setTimeout(()=>{
            	this.hideMark();
            },500)
          },
          //单选添加--排序
          addClassorder: function(index,ord) {
            this.orcurrt=index;
            this.param.intelligencesort=ord;
            this.$emit("triggerLoad");  //触发加载更多
            setTimeout(()=>{
              this.hideMark();
            },500)
          },
          cityClass: function(index,ord) {
            this.curtright=index;
            if(ord.code){
              this.param.distanceType=2;
            }else{
              this.param.distanceType=1;
            }
            this.param.distance=ord.name;
            this.$emit("triggerLoad");  //触发加载更多
            setTimeout(()=>{
              this.hideMark();
            },500)
          },
        },
        mounted(){
          //选择分类
          this.listitem();
          // this.getcity();
        },
        components:{
          searchItem
        }
    }
</script>
<style scoped lang="scss">
  .content.classificationContent ul{
    margin: 0;
  }
  .navbar.icon > ul li:first-child > p{
    background: none;
  }

  .kacruy{
    li{
      height: 0.4rem;
      line-height: 0.41rem;
      font-size: 0.15rem;
      padding-left: 0.48rem;
      &.acry{
        background: url("https://resource.jtsc.club/dui@2x.png") no-repeat 0.2rem center;
        background-size: 0.16rem;
        color: #FF3D3D;
      }
    }
  }
  .content.classificationContent{
    padding: 0;
  }
  .navclick{
    overflow: hidden;
    margin: 0;
    ul{
      height: 3.2rem;
      overflow-y: auto;
      li{
        height: 0.4rem;
        line-height: 0.41rem;
        font-size: 0.14rem;
        text-align: center;
        color: #666;
        text-overflow: ellipsis;
        overflow:hidden;
        white-space: nowrap;
        &.actives{
          color: #FF3D3D;
          background: #fafafa;
        }
      }
    }

  }
</style>
