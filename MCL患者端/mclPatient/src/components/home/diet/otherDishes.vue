<template>
  <div class="uploadPhoto-root" style="background: #fafafa;">
    <div id="body_main" style="padding-top: 1.41rem;" @click="toggleMenu('hide')">
      <div class="fix_top">
        <mt-header title="其他菜式">
          <div slot="left">
            <header-back>
              <mt-button icon="back"></mt-button>
            </header-back>
          </div>
        </mt-header>
        <!-- 搜索框 -->
        <div class="search-block" @click.stop="">
          <div class="search">
            <img src="@/assets/images/sousuowenti@2x.png" alt="" class="icon" width="20" height="20"/>
            <input type="text" v-model.trim="searchParam.foodname" placeholder="请输入食物名称" @input="searchDishes"
                   @focus="toggleMenu('show')"/>
          </div>
          <div class="menu-list" v-show="isSearchPanel">
            <div class="close" @click="toggleMenu('hide')">X</div>
            <ul>
              <li v-for="(item,index) in searchList" :key="index" :class="{'active': (index==searchIndex)}"
                  @click="menuClick(item,index)">{{item.foodname}}
              </li>
              <li v-show="searchList.length == 0">暂无数据</li>
            </ul>
          </div>
        </div>
        <!-- mt-navbar -->
        <div id="navbar">
          <mt-navbar>
            <mt-tab-item id="" v-for="(item,index) in tabs" :key="index"
                         :class="(param.food_type_id == item.food_type_id) && 'is-selected'"
                         @click.native="tab(item,index)">
              <p>{{item.food_type_name}}</p>
            </mt-tab-item>
          </mt-navbar>
        </div>
      </div>

      <!-- 其他菜式 -->
      <div class="marginTop10 yinshhi_list">
        <loadMore :param="param" @triggerGetList="shoplist" ref="loadMoreE" :isDefaultLoading="false">
          <div class="scroll" slot="content">
            <mt-cell v-for="(item,index) in list" :key="index" is-link @click.native="showModal(item)">
              <img slot="icon" :src="item.foodimg" width="52" height="52">
              <div slot="title" class="titleWrap">
                <span class="mint-cell-text">{{item.foodname}}</span>
                <span class="mint-cell-label font12 huiFont99"><span
                  class="colF7">{{item.foodkcal}} {{item.kcalunit}}</span> /{{item.foodgram}}{{item.gramunit}}</span>
              </div>
            </mt-cell>
          </div>
        </loadMore>
      </div>
    </div>

    <!-- 遮罩层 -->
    <div id="mark" :style="{display: (show?'block': 'none')}">
      <div class="modal" :class="show && 'show' ">
        <div class="info">
          <div class="btnClose">
            <span @click="hideModal"></span>
            <!-- <span>10月20日/早餐</span> -->
            <!--						<span class="yellow" @click="confirm">确认</span>-->
          </div>

          <mt-cell>
            <img slot="icon" :src="currentItem.foodimg" width="56" height="56">
            <div slot="title" class="titleWrap">
              <span class="mint-cell-text">{{currentItem.foodname}}</span>
              <span class="mint-cell-label font12 huiFont99"><span class="colF7">{{currentItem.foodkcal}} {{currentItem.kcalunit}}</span>/{{currentItem.foodgram}}{{currentItem.gramunit}}</span>
            </div>
          </mt-cell>

          <div class="showNum font13">
            <div class="left huiFont">
              <p style="line-height: 25px">{{currentItem.foodkcal}} {{currentItem.kcalunit}}</p>
              <p>{{currentItem.foodgram}}{{currentItem.gramunit}}</p>
            </div>
            <div>
              <p><span class="num">&nbsp;{{wegvale}}&nbsp;</span><span class="num_g">{{company}}</span></p>
            </div>
            <div class="right huiFont"  style="text-align: center; color: #898989">
              <p> <img src="@/assets/images/icon-units.png" alt="" class="icon" width="22" height="22"/></p>
              <p>重量估算</p>
            </div>
          </div>
        </div>
        <div v-show="hideWeight">
        <DLRuler :value="50.0" :min="0" :max="500" :onChange="changeWeight"></DLRuler>
        </div>
        <div v-show="hideTwo">
          <DLRuler :value="0" :min="0" :max="20" :onChange="changeTwo"></DLRuler>
        </div>
        <div v-show="hideMl">
          <DLRuler :value="100.0" :min="0" :max="800" :onChange="changeMl"></DLRuler>
        </div>
        <!--<p class="yellow text-center">克</p>-->

        <!--				<ul class="keyboard">-->
        <!--					<li v-for="(item,index) in keyList" :style="{'border-right-width': (index%3==2 ? 0 : '2px')}" @click="keyCode(item,index)">{{item}}</li>-->
        <!--				</ul>-->
        <div class="dw_ys" v-show="hideWgtTwo" >
            <mt-button type="primary" id="saveWeight" class="dw_btn active" size="large" @click.native="saveWeight">克</mt-button>
          <mt-button type="primary" id="saveTwo" class="dw_btn" size="large" @click.native="saveTwo">两</mt-button>
        </div>
        <div class="dw_ys" v-show="hideBtnml" >
          <mt-button type="primary" id="saveMl" class="dw_btn active"  size="large">ml</mt-button>
        </div>
        <div class="btnConfirm"><span @click="confirm">确  认</span></div>
      </div>
    </div>

  </div>
</template>

<script>
  import DLRuler from './ruler.vue'//标尺
  import Bus from '@/assets/js/updateShopCar.js' //bus
  import pic from '@/assets/images/syyx.png' //跟新购物车数量
  import loadMore from '@/components/common/loadMore.vue' //加载更多组件
  export default {
    name: 'uploadPhoto',
    data: () => ({
      //tab 切换
      isactv: 0,
      selected: 'tab-container1',
      tabs: [], //
      isSearchPanel: false,  //显示搜索面板
      searchIndex: -1,
      searchList: [],  //search的下拉框

      keyList: [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'x'],
      showNum: [],
      show: false,
      currentItem: {},   //点击的菜对象

      wegvale:50,
      hideTwo: false,
      hideMl: false,
      hideBtnml: false,
      hideWgtTwo: true,
      hideWeight: true,
      company:'克',
      searchParam: {
        pagesize: 100,
        pagecount: 1,
        distinguish: '早餐',
        foodname: '',
      },
      param: {
        pagesize: 10,
        pagecount: 0,
        food_type_id: ''
      },
      list: []
    }),
    methods: {
      tab (item) {
        this.$Indicator.loading()
        this.param.food_type_id = item.food_type_id
        this.param.pagecount = 0
        this.$refs.loadMoreE.getList() //触发加载更多
        setTimeout(() => {
          this.$Indicator.close()
        }, 200)
      },

      //显示和隐藏键盘
      showModal (item) {
        this.currentItem = item
        this.showNum = []
        this.show = true
        this.hideTwo=false
        if( this.currentItem.gramunit=="ml"){
          this.hideMl=true;
          this.hideBtnml=true;
          this.hideWgtTwo=false;
          this.hideWeight=false;
          this.wegvale = 100
          this.company= "ml"
        }
        if( this.currentItem.gramunit=="g"){
          this.hideWeight=true;
          this.hideTwo=false;
          this.hideMl=false;
          this.hideBtnml=false;
          this.hideWgtTwo=true;
          this.company= "克";
          document.getElementById('saveWeight').classList.add('active')
          document.getElementById('saveTwo').classList.remove('active')
        }
      },
      hideModal () {
        this.show = false
      },
      //键盘的输入事件
      keyCode (item, index) {
        if (item == 'x') {
          this.showNum.pop()
        } else {
          if (this.showNum.length < 6) {
            this.showNum.push(item)
          }
        }
      },
      //键盘的确定按钮
      confirm () {
        // if(this.showNum.length == 0){
        //   this.$Toast("请输入菜品克数")
        //   return
        // }
        if (this.wegvale == '0') {
          this.$Toast('请输入菜品克数')
          return
        }
        let param = {
          Weight: this.wegvale,
        }

        // const weight = document.getElementById('saveWeight').className
        // const two = document.getElementById('saveTwo').className

        if (  this.company=="克") {
          const showNum = param.Weight
          this.currentItem.foodconsumption = showNum
        }
        if( this.company=="两"){
          const showNum = param.Weight*50;
          this.currentItem.gramunit="g";
          this.currentItem.foodconsumption = showNum
        }
        if ( this.company=="ml") {
          const showNum = param.Weight
          this.currentItem.foodconsumption = showNum
        }
        const showNum =  this.currentItem.foodconsumption
        // const showNum = Number(this.showNum.join().replace(/,/g, ""));


        //单位克
        const {foodgram, foodkcal, protein, fat, carbohydrate} = this.currentItem
        //总千卡
        const foodkcal2 = Number((showNum / foodgram) * foodkcal).toFixed(2)
        //总蛋白质
        const protein2 = Number((showNum / foodgram) * protein).toFixed(2)
        //脂肪
        const fat2 = Number((showNum / foodgram) * fat).toFixed(2)
        //碳水化合物
        const carbohydrate2 = Number((showNum / foodgram) * carbohydrate).toFixed(2)
        //resultObj 保存计算过的结果
        this.currentItem.resultObj = {foodkcal: foodkcal2, protein: protein2, fat: fat2, carbohydrate: carbohydrate2}
        //总克数
        // this.currentItem.foodconsumption = showNum
        //添加到bus
        Bus.$emit('addDishes', this.currentItem)
        this.$router.back()
      },

      saveWeight () {
        this.show = true
        this.hideWeight = true
        this.hideTwo = false
        this.wegvale = 50
        this.company= "克"
        // this.currentItem.gramunit="g"
        // this.currentItem.foodgram="100"
        document.getElementById('saveWeight').classList.add('active')
        document.getElementById('saveTwo').classList.remove('active')
      },
      saveTwo() {
        this.show = true
        this.hideTwo = true
        this.hideWeight = false
        this.wegvale = 0
        this.company= "两"
        // this.currentItem.gramunit="两"
        // this.currentItem.foodgram="2"
        document.getElementById('saveTwo').classList.add('active')
        document.getElementById('saveWeight').classList.remove('active')
      },

      // saveMl() {
      //   this.show = true
      //   this.hideMl = true
      //   this.wegvale = 100
      //   this.company= "ml"
      //   // this.currentItem.gramunit="两"
      //   // this.currentItem.foodgram="2"
      //   document.getElementById('saveTwo').classList.add('active')
      //   document.getElementById('saveWeight').classList.remove('active')
      // },

      changeWeight (val) {
        this.wegvale = val
      },
      changeTwo (val) {
        this.wegvale = val
      },
      changeMl (val) {
        this.wegvale = val
      },
      //搜索菜单
      searchDishes () {
        const searchData = () => {
          let url = 'UserInterface/FoodMenuInfo.ashx'  //搜索的列表
          this.$post(url, this.searchParam).then((data) => {
            if (data.rspcode != 1) {
              this.searchList = []
              return
            }
            let modelList = data.data
            const {mealtype} = this.$route.query
            modelList.forEach((item, index) => {
              item.mealtype = mealtype
            })
            this.searchList = modelList
            this.isSearchPanel = true
          })
        }
        this.searchIndex = -1
        setTimeout(searchData, 600)
      },
      //关闭菜单
      toggleMenu (state) {
        if ((state == 'show') && (this.searchList.length == 0)) {
          return
        }
        this.isSearchPanel = (state == 'show' ? true : false)
      },
      //菜单的点击
      menuClick (item, index) {
        this.searchIndex = index
        this.showModal(item)
      },

      //分类
      getType () {
        let url = 'UserInterface/goods/FoodClassificationList.ashx'
        this.$post(url).then((data) => {
          const list = data.data
          this.tabs = list
          this.tab(list[0])
        })
      },

      //菜单列表
      shoplist (success) {
        let url = 'UserInterface/goods/FoodDataList.ashx'
        this.$post(url, this.param).then((data) => {
          if (data.rspcode != 1) {
            return
          }
          let modelList = data.data
          if (this.param.pagecount == 1) {
            this.list = [...modelList]
          } else {
            this.list = [...this.list, ...modelList]
          }
          //加载更多组件触发回调
          if (success) {
            success(modelList, this.list)
          }
        })
      },
    },
    mounted () {
      //添加菜单
      if (!Bus.$data.dishesList) {
        Bus.$data.dishesList = []
      }
      Bus.$on('addDishes', (item) => {
        Bus.$data.dishesList.push(item)
      })

      //饮食时间
      const {mealtype} = this.$route.query
      if (mealtype) {
        let mealtypeText = ''
        switch (mealtype) {
          case '01':
            mealtypeText = '早餐'
            break
          case '02':
            mealtypeText = '午餐'
            break
          case '03':
            mealtypeText = '晚餐'
            break
          case '04':
            mealtypeText = '加餐'
            break
        }
        this.searchParam.distinguish = mealtypeText
      }

      //搜索条件
//			this.searchDishes()
      //获取分类
      this.getType()
    },
    destroyed () {
      //移除addDishes事件避免多次注册事件
      Bus.$off('addDishes')
    },
    components: {
      loadMore,
      DLRuler
    }
  }
</script>

<style scoped lang="scss">
  .mint-header {
    height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
    font-size: 0.16rem;
  }

  /* 早餐列表 */
  .yinshhi_list {
    background: #FFFFFF;
    padding-top: 0.1rem;

    .title {
      padding-left: 0.12rem;
      line-height: 45px;
    }

    .wrap {
      padding-right: 15px;
    }

    .wrap > * {
      vertical-align: middle;
    }

    .wrap > .icon {
      margin-right: 5px;
    }
  }

  .titleWrap {
    display: inline-block;
    vertical-align: middle;
    margin-left: 0.05rem;
    line-height: 1.25;
    font-family: "Microsoft YaHei";
  }

  .yinshhi_list .mint-cell {
    min-height: 68px;
  }

  .fix_top {
    z-index: 90;
  }

  /* 搜索输入框 */
  .search-block {
    position: relative;
    z-index: 10;
    background: #0AC5C9;
    padding: 0.075rem 0.2rem 0.075rem 0.2rem;

    .menu-list {
      position: absolute;
      left: 0.12rem;
      right: 0.12rem;
      margin-top: -0.12rem;
      padding: 0.03rem 0;
      border: 1px solid #F0F1F3;
      border-radius: 6px;
      background: #FFF;
      max-height: 4rem;

      ul {
        max-height: 4rem;
        overflow-y: scroll;
      }

      li {
        padding: 0.03rem 0.22rem;
      }

      li.active {
        color: #FFFFFF;
        background: #F78335;
      }

      .close {
        position: absolute;
        right: 0;
        padding: 0.1rem;
        font-size: 16px;
        color: #EC0000;
      }
    }
  }

  .search {
    background: #F0F1F3;
    border-radius: 0.1rem;
    overflow: hidden;
    padding: 0 0.1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .icon,
    input {
      vertical-align: middle;
    }

    input {
      flex: 1;
      font-size: 0.145rem;
      line-height: 2;
      margin-left: 0.05rem;
    }

    input::-webkit-input-placeholder {
      color: #999999;
    }
  }

  #navbar .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 2px solid #0AC5C9;
    color: #0bb8bc;
    font-weight: 500;
  }

  /* 滚动区域 */
  .scroll {
    overflow: hidden;
  }

  /*上传图片区域*/
  .uploadArea {
    padding: 0.12rem;
    padding-top: 0;

    .photoList,
    .add {
      width: 100px;
      height: 100px;
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 10px;
      vertical-align: top;
      position: relative;
    }

    .mask {
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .2);

      .close {
        position: absolute;
        right: 5px;
        top: 5px;
        color: #FFFFFF;
        font-size: 16px;
      }
    }
  }

  /* 弹出层 */
  #mark {
    z-index: 99;
  }

  .modal.show {
    transform: translateY(0);
    min-height: 50%;
  }

  .modal {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: #FFFFFF;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: transform ease 0.6s;
    transform: translateY(1000px);
    padding-bottom: 0.44rem;


    .btnConfirm {
      text-align: center;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;

      span {
        display: block;
        width: 100%;
        line-height: 0.44rem;
        background-color: #0AC5C9;
        color: #FFFFFF;
        font-size: 0.16rem;
      }
    }

    .btnClose {
      text-align: right;
      padding: 0.1rem 0 0 0;

      span {
        display: inline-block;
        /*line-height: 0.22rem;*/
        /*color: #666666;*/
        /*  font-weight: bolder;*/
        /*font-size: 0.16rem;*/
        width: 0.22rem;
        height: 0.22rem;
        /*border: 1px solid #999999;*/
        /*border-radius: 50%;*/
        text-align: center;
        background: url(../../../assets/images/关闭@2x.png) no-repeat center center #FFFFFF;
        background-size: 0.15rem;
      }
    }
    .info {
      padding: 0px 10px;
    }

    .bar {
      padding: 7px 10px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .showNum {
      display: flex;
      justify-content: space-between;
      margin: 0.35rem 4% 0.2rem 4%;
    }

    .num {
      font-size: 0.275rem;
      color: #0AC5C9;
      display: inline-block;
      /*min-width: 72px;*/
      height: 0.35rem;
      padding-left: 0.1rem;
      box-sizing: border-box;
      text-align: right;
      /*border-bottom: 2px solid #999999;*/
    }

    .num_g {
      font-size: 0.165rem;
      color: #0AC5C9;
      /*margin-left: 0.05rem*/
    }
    .dw_ys{
      text-align: center;
      margin: 0.15rem 0;
    .dw_btn{
      display: inline-block;
      width: 0.5rem;
      padding: 0 0.05rem;
      background: none;
      color: #666666;
      height: 0.28rem;
      border-radius: 0.4rem;
    }
    .active{
      background: #0AC5C9;
      color: #FFFFFF;

    }
    .dw_btn::after{
      background: none;
      color: #0AC5C9;
    }

    }
  }

  .keyboard {
    font-size: 0;
  }

  .keyboard li {
    width: 33.333%;
    display: inline-block;
    font-size: 0.18rem;
    font-weight: bold;
    text-align: center;
    line-height: 0.40rem;
    box-sizing: border-box;
    border-right: 4px solid #fff;
    border-top: 4px solid #fff;
    background-color: #fafafa;
    border-radius: 10px;
    color: #555555;
  }

</style>
<style lang="scss">
  .uploadPhoto-root {
    .mint-popup-bottom {
      width: 100%;
    }

    .picker_bar {
      display: flex;
      justify-content: space-between;
      text-align: center;
      line-height: 40px;
      padding: 0 20px;
      border-bottom: solid 1px #eaeaea;

      .confrim {
        color: #26a2ff;
      }
    }
  }

  .uploadPhoto-root #navbar {
    overflow-x: scroll;
    margin: 0 auto 0.1rem auto;
    border-bottom: 1px solid #e5e5e5;
    background-color: #fff;
    padding: 0px 10px;
    color: #484848;

    .mint-navbar {
      display: inline-block;
      white-space: nowrap;
    }

    .mint-navbar .mint-tab-item {
      height: 0.44rem;
      box-sizing: border-box;
      display: inline-block;
      padding: 0 15px;
      border-bottom: 2px solid #FFFFFF;
    }
  }


  #main_router img {
    border-radius: 4px;
  }

  span .colF7 {
    color: #F78335;
  }
</style>
