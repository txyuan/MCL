<template>
    <div>
      <!-- 导航条 -->
      <div class="navbar icon">
        <ul>
          <li  v-for="(item,index) in navList" :key="index" @click="navClick(item,index)">
            <p :class="{active: (index == current),price: ((index == 2)||(index == 3)),down: ((index == 2)||(index == 3)) && item.className.isDown}">{{item.name}}</p>
          </li>
        </ul>
      </div>

      <!-- 遮罩  -->
      <div id="mark" @click="hideMark" ref="mark" style="top: 87px">
        <div class="content classificationContent" @click.stop="">
          <ul class="clear" v-if="current == 1" >
            <li is="searchItem" class="float_left" v-for="(item,index) in navList[1].list" :key="index" @clickItem="addClassFun(index,item)" v-bind:class="{active: index==navList[1].current}" :item="item"></li>
          </ul>
        </div>
      </div>
    </div>

</template>

<script>
    import Bus from "@/assets/js/updateShopCar.js";  //跟新购物车数量
    import searchItem from "@/components/common/navbarContentItem.vue";   //item
    export default {
        name: "navbar",
        props: ['param'],
        data:()=>({
          navList:[
            {
              name:"默认",
              id:0
            },
            {
              name:"选择分类",
              list: [],
              current:"-1",
              id:1
            },
            {
              name:"价格",
              id:2,
              className:{
                isDown: true
              }
            },
            {
              name:"销量",
              id:3,
              className:{
                isDown: true
              }
            }
          ],
          current: 0
        }),
        methods:{
          //nav 的点击效果
          navClick(item,index){
            this.current = index;
            this.hideMark();
            //默认   重置筛选条件
            if(item.id == 0){
              this.resetParentParam();
            }
            //选择分类
            if(item.id == 1){
              this.showMark();
            }

            //价格
            if(item.id == 2){
              item.className.isDown = !item.className.isDown;
              if(item.className.isDown){  //打开向下
                this.param.priceorder = 0;
              }else{  //打开向上
                this.param.priceorder = 1;
              }
              //销量置空
              this.param.saleorder = "";
            }else{
              this.navList[2].className.isDown = true
            }
            //销量
            if(item.id == 3){
              item.className.isDown = !item.className.isDown;
              if(item.className.isDown){  //打开向下
                this.param.saleorder = 0;
              }else{  //打开向上
                this.param.saleorder = 1;
              }
              //价格置空
              this.param.priceorder = "";
            }else{
              this.navList[3].className.isDown = true
            }

            //默认，价格，销量需要触发重新加载
            if(item.id != 1){
              this.$emit("triggerLoad");  //触发重新加载
            }
          },
          //重置筛选条件
          resetParentParam(){
            this.$emit("resetParam");
            this.navList[1].current = "-1";
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
            let url = "UserInterface/mall/getCategoryList.ashx";
            let param = {
              "areaCode": '341802',
              "subjectKey": firstsubjecttype
            }
            return this.$post(url,param).then((data)=>{
              let subjectList = data.subjectList;
              this.navList[1].list = subjectList;
            })
          },
          //单选添加
          addClassFun: function(index,item) {
            this.navList[this.current].current = index;
            this.param.secondsubjecttype=item.categoryId;
            this.$emit("triggerLoad");  //触发加载更多
            setTimeout(()=>{
            	this.hideMark();
            },500)
          },
        },
        mounted(){
          //选择分类
          this.listitem();
        },
        components:{
          searchItem
        }
    }
</script>
<style scoped lang="scss">
  .navbar.icon > ul li:first-child > p{
    background: none;
  }
</style>
