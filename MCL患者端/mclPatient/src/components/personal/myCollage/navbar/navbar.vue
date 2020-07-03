<template>
    <div>

      <!-- 导航条 -->
      <div class="navbar icon">
        <ul>
          <li  v-for="(item,index) in navList" @click="navClick(index)">
        <p :class="{active: (index == current),price: (index == 1||index == 2),up: (item.className && item.className.isUp), down: (item.className && item.className.isDown)}">{{item.name}}</p>
        </li>
        </ul>
      </div>

      <!-- 遮罩  -->
      <div id="mark" @click="hideMark" ref="mark" style="top: 87px">
        <div class="content classificationContent" @click.stop="">
          <ul class="clear">
            <searchItem class="float_left" v-for="(item,index) in navList[current].list" :class="(navList[0].selected == index) && 'active'" @clickItem="typeClick(index)" :item="item" :key="index"/>
          </ul>

          <div class="btn-group">
            <mt-button type="default" class="reset"  v-show="false">重置</mt-button>
          </div>

          <mt-button size="large" type="danger" class="buy_btn" @click="stateConfrim">确定</mt-button>
        </div>
      </div>
    </div>

</template>

<script>
    import searchItem from "@/components/common/navbarContentItem.vue";   //item
    export default {
        name: "navbar",
        props:["param"],
        data:()=>({
          navList:[
            {
              name:"拼购状态",
              selected: 0,
              list: [{categoryName:"全部",id:""},{categoryName:"进行中",id:0},{categoryName:"揭晓中",id:1},{categoryName:"已揭晓",id:2}]
            },
            {
              name:"拼购时间",
              className:{
                isUp: false,
                isDown: false,
              },
            },
            {
              name:"价格",
              list:[],
              className:{
                isUp: false,
                isDown: false,
              },}
          ],
          current: 0,
          //当前的类别列表
          typeList:{}
        }),
        methods:{
          //nav 的点击效果
          navClick($index){
            this.current = $index;
            let item = this.navList[$index];
            this.navList.forEach(function (item,index) {
              if(item.className && (index != $index)){
                item.className.isUp = false;
                item.className.isDown = false;
              }
            });

            if(($index == 1) || ($index == 2)){  //价格和拼购时间
              this.hideMark();
              this.param.PriceOrder = "";
              this.param.TimeOrder = "";
              if(!item.className.isUp){  //打开向上
                item.className.isUp = true;
                item.className.isDown = false;

                //设置接口升序的参数
                if($index == 1){
                  this.param.TimeOrder = 1;
                }
                if($index == 2){
                  this.param.PriceOrder = 1;
                }
              }else{  //关闭向上
                item.className.isUp = false;
                item.className.isDown = true;

                //设置接口降序的参数
                if($index == 1){
                  this.param.TimeOrder = 0;
                }
                if($index == 2){
                  this.param.PriceOrder = 0;
                }
              }
              //触发父组件的confirm获取数据
              this.$Indicator.loading();
              this.$emit("confirm");
              setTimeout(()=>{
                this.$Indicator.close()
              },200)
            }else{
              this.showMark();
            };

          },
          //类别的点击事件
          typeClick(index){
            this.navList[0].selected = index;
          },
          //拼购状态
          stateConfrim(){
            let {list,selected} = this.navList[0];
            this.param.State = list[selected].id;
            this.param.PriceOrder = "";
            this.param.TimeOrder = "0";
            this.$Indicator.loading();
            this.$emit("confirm");
            setTimeout(()=>{
              this.$Indicator.close()
            },200)
            this.hideMark();
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
          }
        },
        components:{
          searchItem
        }
    }
</script>
<style scoped>
  .content.classificationContent .reset{width: 100%;margin-right: 0}
</style>

