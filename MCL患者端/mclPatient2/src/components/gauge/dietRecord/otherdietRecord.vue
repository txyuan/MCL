<template>
  <div class="uploadPhoto-root" style="background: #fafafa">
    <div id="body_main" style="padding-top: 1rem" @click="toggleMenu('hide')">
      <div class="fix_top" style="background: #fafafa">
        <!-- <mt-header title="其他菜式">
					<div slot="left">
						<header-back>
							<mt-button icon="back"></mt-button>
						</header-back>
					</div>
				</mt-header> -->
        <!-- 搜索框 -->
        <div class="search-block" @click.stop="">
          <van-icon
            class="arrow-left"
            @click="$router.back()"
            name="arrow-left"
          />
          <div class="search">
            <img
              src="@/assets/images/searchKow.png"
              alt=""
              class="icon"
              width="20"
              height="20"
            />
            <input
              type="text"
              v-model.trim="searchParam.foodname"
              placeholder="请输入食物名称"
              @input="searchDishes"
              @focus="toggleMenu('show')"
            />
          </div>
          <p @click="clilkPhoto">
            
            <img
              src="@/assets/images/dietRecord/foodphoto.png"
              alt=""
              width="25"
              height="21"
              style="margin-top:0.04rem"
            />
            <input
              class="fileInput"
              type="file"
              accept="image/*"
              ref="userImg"
              @change="takePhoto($event)"
              name="file"
            />
          </p>

          <div class="menu-list" v-show="isSearchPanel">
            <div class="close" @click="toggleMenu('hide')">X</div>
            <ul>
              <li
                v-for="(item, index) in searchList"
                :key="index"
                :class="{ active: index == searchIndex }"
                @click="menuClick(item, index)"
              >
                {{ item.foodname }}
              </li>
              <li v-show="searchList.length == 0">暂无数据</li>
            </ul>
          </div>
        </div>
        <!-- mt-navbar -->

        <div id="navbar">
          <mt-navbar>
            <mt-tab-item
              id=""
              v-for="(item, index) in tabs"
              :key="index"
              :class="param.food_type_id == item.food_type_id && 'is-selected'"
              @click.native="tab(item, index)"
            >
              <p>{{ item.food_type_name }}</p>
            </mt-tab-item>
          </mt-navbar>
        </div>
      </div>

      <!-- 其他菜式 -->
      <div class="yinshhi_list">
        <loadMore
          :param="param"
          @triggerGetList="shoplist"
          ref="loadMoreE"
          :isDefaultLoading="false"
        >
          <div class="scroll" slot="content">
            <van-cell
              v-for="(item, index) in list"
              :key="index"
              is-link
              @click.native="showModal(item)"
            >
              <img slot="icon" :src="item.foodimg" width="52" height="52" />
              <div slot="title" class="titleWrap">
                <span class="mint-cell-text">{{ item.foodname }}</span>
                <span class="mint-cell-label font12 huiFont99"
                  ><span class="colF7"
                    >{{ item.foodgram }}{{ item.gramunit }}</span
                  ><span
                    style="border-left: 1px solid #999999; margin: 0 0.05rem"
                  ></span
                  ><span style="color: #fc605b">{{ item.foodkcal }}</span>
                  <span>千卡</span></span
                >
              </div>
            </van-cell>
          </div>
        </loadMore>
      </div>
    </div>

    <!-- 遮罩层 -->
    <div
      id="mark"
      @click="hidePanel($event)"
      :style="{ display: show ? 'block' : 'none' }"
    >
      <div class="modal" :class="show && 'show'">
        <div class="info">
          <h3>{{ mealType }}</h3>
          <mt-cell class="">
            <img
              slot="icon"
              :src="currentItem.foodimg"
              width="56"
              height="56"
            />
            <div slot="title" class="titleWrap">
              <span class="mint-cell-text">{{ currentItem.foodname }}</span>
              <span class="mint-cell-label font12 huiFont99"
                ><span class="colF7"
                  >{{ currentItem.foodgram }}{{ currentItem.gramunit }}</span
                >
                <span
                  style="border-left: 1px solid #999999; margin: 0 0.05rem"
                ></span
                ><span style="color: #fc605b">{{ currentItem.foodkcal }}</span>
                <span>千卡</span>
              </span>
            </div>
          </mt-cell>
          <div class="lineMark"></div>
          <div class="showNum font13">
            <div class="left" style="color: #999999">
              <p style="line-height: 25px">
                {{ foodgram }}{{ currentItem.gramunit }}
                <span
                  style="border-left: 1px solid #999999; margin: 0 0.05rem"
                ></span>
                {{ foodkcal }}<span>千卡</span>
              </p>
              <p></p>
            </div>
            <!-- <div class=""> -->
            <!--							<p> <span class="num">&nbsp;{{showNum.join().replace(/,/g, "")}}&nbsp;</span><span style="font-size: 0.14rem;color: #666; margin-left: 0.05rem">{{currentItem.gramunit}}</span></p>-->

            <!-- <p><span class="num">{{showNum}}&nbsp;</span><span class="num_g">{{company}}</span></p>
						</div> -->
            <div
              class="right huiFont"
              style="text-align: center; color: #aaaaaa"
            >
              <p @click="weightEstimation">
                <van-icon name="question-o" /> &nbsp;重量估算
              </p>
            </div>
          </div>
        </div>
        <DLRuler
          v-if="company != '两' && show == true"
          class="ruler"
          :value="100"
          :min="0"
          :max="1000"
          :company="company"
          :onChange="changeFood"
        />
        <DLRuler1
          v-if="company == '两'"
          class="ruler"
          :value="2"
          :min="0"
          :max="50"
          :company="'两'"
          :onChange="changeFood"
        />
        <div class="dw_ys" v-show="hideWgtTwo">
          <mt-button
            type="primary"
            id="saveWeight"
            class="dw_btn active"
            size="large"
            @click.native="saveWeight"
            >克</mt-button
          >
          <mt-button
            type="primary"
            id="saveTwo"
            class="dw_btn"
            size="large"
            @click.native="saveTwo"
            >两</mt-button
          >
        </div>
        <div class="dw_ys" v-show="hideBtnml">
          <mt-button
            type="primary"
            id="saveMl"
            class="dw_btn active"
            size="large"
            >毫升</mt-button
          >
        </div>

        <!-- <ul class="keyboard">
          <li v-for="(item,index) in keyList" :style="{'border-right-width': (index%3==2 ? 0 : '2px')}" @click="keyCode(item,index)">{{item}}</li>
        </ul> -->

        <div class="btnConfirm">
          <span @click="cancel">取 消</span><span @click="confirm">确 认</span>
        </div>
      </div>
    </div>
    <!-- 重量估算picker  -->
    <mt-popup
      class="mint-popup-3"
      v-model="weightVisible"
      position="right"
      :modal="false"
      popup-transition="popup-fade"
    >
      <mt-header fixed title="重量估算">
        <div slot="left">
          <mt-button
            icon="back"
            @click.native="toggleModal('hide')"
          ></mt-button>
        </div>
      </mt-header>
      <div class="popup_body" ref="popupBody">
        <div class="wigtsin_bg">
          <img src="@/assets/images/wigtsin_1.jpg" width="100%" />
          <img src="@/assets/images/wigtsin_2.jpg" width="100%" />
          <img src="@/assets/images/wigtsin_3.jpg" width="100%" />
          <img src="@/assets/images/wigtsin_4.jpg" width="100%" />
          <img src="@/assets/images/wigtsin_5.jpg" width="100%" />
          <img src="@/assets/images/wigtsin_6.jpg" width="100%" />
          <img src="@/assets/images/wigtsin_7.jpg" width="100%" />
        </div>
      </div>
    </mt-popup>

    <!-- 购物车 -->
    <div class="foodCar">
      <img
        v-if="currentList.length == 0"
        src="@/assets/images/dietRecord/foodCar.png"
        alt=""
        @click="carList"
      />
      <img
        v-if="currentList.length > 0"
        src="@/assets/images/dietRecord/checkFood.png"
        alt=""
        @click="carList"
      />
      <p @click="carList">{{ mealTypeCar }}</p>
      <div class="foodBtn" v-if="currentList.length == 0">完成</div>
      <div class="foodBtn1" v-if="currentList.length > 0" @click="confirmCar">
        完成
      </div>
    </div>

    <!-- 购物车弹框 -->
    <van-popup
      class="carPopup"
      v-model="showCar"
      round
      position="bottom"
      :style="{ height: '50%' }"
    >
      <div class="title">
        <h3>{{ mealType }}</h3>
        <p @click="qingkList" class="qingk">
          <van-icon
            name="delete-o"
            style="vertical-align: bottom; margin-right: 0.06rem"
          /><span style="vertical-align: middle; font-size: 0.12rem">清空</span>
        </p>
      </div>
      <p class="line"></p>
      <div class="info">
        <mt-cell
          class="foodCell"
          v-for="(item, index) in currentList"
          :key="index"
        >
          <img slot="icon" :src="item.foodimg" width="56" height="56" />
          <div slot="title" class="titleWrap">
            <span class="mint-cell-text">{{ item.foodname }}</span>
            <span class="mint-cell-label font12 huiFont99"
              ><span class="colF7"
                >{{ item.foodconsumption }}{{ item.gramunit }}</span
              >
              <span
                style="border-left: 1px solid #999999; margin: 0 0.05rem"
              ></span
              ><span style="color: #fc605b">{{ item.foodkcalReslut }}</span>
              <span>千卡</span>
            </span>
          </div>
          <!-- <div slot="value"> -->
          <span @click="removeFood(index)">删除</span>
          <!-- </div> -->
        </mt-cell>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Bus from "@/assets/js/updateShopCar.js"; //bus
import DLRuler from "@/components/home/diet/ruler"; //加载更多组件
import DLRuler1 from "@/components/home/diet/ruler"; //加载更多组件
import pic from "@/assets/images/syyx.png"; //跟新购物车数量
import loadMore from "@/components/common/loadMore.vue";
import axios from "axios";
export default {
  name: "otherdietRecord",
  data: () => ({
    //tab 切换
    isactv: 0,
    selected: "tab-container1",
    tabs: [], //
    isSearchPanel: false, //显示搜索面板
    searchIndex: -1,
    searchList: [], //search的下拉框

    keyList: [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "x"],
    showNum: 100,
    show: false,
    showCar: false,
    currentItem: {}, //点击的菜对象
    currentList: [],
    hideBtnml: false,
    hideWgtTwo: true,
    company: "克",
    weightVisible: false,

    //早，中，晚，加餐的对象key
    foodKey: "",
    searchParam: {
      pagesize: 100,
      pagecount: 1,
      distinguish: "早餐",
      foodname: "",
    },
    param: {
      pagesize: 10,
      pagecount: 0,
      food_type_id: "",
    },
    list: [],
    mealType: "",
    foodgram: "100",
    foodkcal: "",
    mealTypeCar: "",
  }),
  watch: {
    company: {
      handler(nweValue, oldValue) {
        if (nweValue == "两") {
          this.showNum = 2;
          this.foodgram = "100";
        } else {
          this.showNum = 100;
          this.foodgram = "100";
        }
      },
    },
    "currentList.length": {
      handler(newValue, oldValue) {
        if (newValue > 0) {
          this.mealTypeCar = newValue + "种食物";
        } else {
          this.mealTypeCar = this.mealType;
        }
      },
      deep: true,
    },
    "$store.state.foodPhotoData.length": {
      handler(newValue, oldValue) {
        // if(newValue == 0) {
        this.currentList = this.$store.state.foodPhotoData;
        // }
      },
    },
    "$route.query": {
      handler(newValue, oldValue) {
        if (newValue.mealtype == "01") {
          if (this.currentList.length > 0) {
            this.mealTypeCar = this.currentList.length + "种食物";
          } else {
            this.mealTypeCar = "早餐";
          }
          this.mealType = "早餐";
        } else if (newValue.mealtype == "02") {
          if (this.currentList.length > 0) {
            this.mealTypeCar = this.currentList.length + "种食物";
          } else {
            this.mealTypeCar = "午餐";
          }
          this.mealType = "午餐";
        } else if (newValue.mealtype == "03") {
          if (this.currentList.length > 0) {
            this.mealTypeCar = this.currentList.length + "种食物";
          } else {
            this.mealTypeCar = "晚餐";
          }
          this.mealType = "晚餐";
        } else if (newValue.mealtype == "04") {
          if (this.currentList.length > 0) {
            this.mealTypeCar = this.currentList.length + "种食物";
          } else {
            this.mealTypeCar = "加餐";
          }
          this.mealType = "加餐";
        }
      },
    },
  },
  created() {
    
  },
  methods: {
    clilkPhoto() {
      this.$refs.userImg.click()
    },
    //上传文件
    takePhoto(e) {
      let file = e.target.files[0];
      if (e.target.files.length == 0) {
        return;
      }
      let url = URL.createObjectURL(file);
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      }; //添加请求头
      resizeImage(file)
        .then(function (result) {
          return typeof result === "string"
            ? convertToBlob(result, file.type)
            : result;
        })
        .then((blob) => {
          let params = new FormData(); //创建form对象
          params.append("uploadedFile", file); //通过append向form对象添加数据
          //注意：此处第3个参数最好传入一个带后缀名的文件名，否则很有可能被后台认为不是有效的图片文件
          params.append("uploadedFile", blob, "uploadedFile");
          axios
            .post("UserInterface/UploadFile.ashx", params, config)
            .then((response) => {
              if (response.data.rspcode != 1) {
                return;
              }

              let responseUrl = response.data.url;
              this.responseUrl = responseUrl;
              // 创建url
              var imgUrl = window.URL.createObjectURL(file);
              this.$router.push(
                `/foodPhoto?mealType=${this.$route.query.mealtype}&url=${responseUrl}`
              );
            });
        });

      /**
       * 压缩裁剪图片
       */
      function resizeImage(file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();

          reader.onload = function () {
            var img = new Image();

            img.onload = function () {
              var w = this.naturalWidth;
              var h = this.naturalHeight;
              var maxW = 500;
              var maxH = 500;

              // 如果图片尺寸小于最大限制，则不压缩直接上传
              if (w <= maxW && h <= maxH) {
                resolve(file);
                return;
              }

              var level = 0.6;
              var multiple = Math.max(w / maxW, h / maxH);
              var resizeW = w / multiple;
              var resizeH = h / multiple;

              var canvas = document.createElement("canvas");

              canvas.width = resizeW;
              canvas.height = resizeH;

              var ctx = canvas.getContext("2d");

              ctx.drawImage(img, 0, 0, resizeW, resizeH);

              var base64Img = canvas.toDataURL(file.type, level);
              var arr = base64Img.split(",");

              resolve(arr[1]);
            };

            img.src = this.result;
          };

          reader.readAsDataURL(file);
        });
      }

      /**
       * 将图片的base64字符串转换为Blob对象
       */
      function convertToBlob(base64Str, fileType) {
        var base64 = window.atob(base64Str);
        var len = base64.length;
        var buff = new ArrayBuffer(len);
        var uarr = new Uint8Array(buff);

        for (var i = 0; i < len; i++) {
          uarr[i] = base64.charCodeAt(i);
        }

        var blob = null;

        try {
          blob = new Blob([buff], { type: fileType });
        } catch (e) {
          var BlobBuilder = (window.BlobBuilder =
            window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder);

          if (e.name === "TypeError" && BlobBuilder) {
            var builder = new BlobBuilder();
            builder.append(buff);
            blob = builder.getBlob(fileType);
          }
        }

        return blob;
      }
    },
    // 清空按钮
    qingkList() {
      this.currentList = [];
      this.$store.commit("setfoodPhotoData", this.currentList);
    },
    // 删除按钮
    removeFood(index) {
      this.currentList.splice(index, 1);
      this.$store.commit("setfoodPhotoData", this.currentList);
    },
    // 购物车完成按钮
    confirmCar() {
      if (this.mealType == "早餐") {
        this.currentList = this.$store.state.foodPhotoData;
        let breakfastList = this.$store.state.breakfastList;
        this.$store.commit("setbreakfastList", [
          ...breakfastList,
          ...this.currentList,
        ]);
      } else if (this.mealType == "午餐") {
        this.currentList = this.$store.state.foodPhotoData;
        let lunchList = this.$store.state.lunchList;
        this.$store.commit("setlunchList", [...lunchList, ...this.currentList]);
      } else if (this.mealType == "晚餐") {
        this.currentList = this.$store.state.foodPhotoData;
        let dinnerList = this.$store.state.dinnerList;
        this.$store.commit("setdinnerList", [
          ...dinnerList,
          ...this.currentList,
        ]);
      } else if (this.mealType == "加餐") {
        this.currentList = this.$store.state.foodPhotoData;
        let mealAdditionList = this.$store.state.mealAdditionList;
        this.$store.commit("setmealAdditionList", [
          ...mealAdditionList,
          ...this.currentList,
        ]);
      }
      this.showCar = false;
      this.$router.back();
			this.currentList = [];
      this.$store.commit("setfoodPhotoData", []);
    },
    carList() {
      this.showCar = true;
    },
    // 搜索
    onSearch() {
      // this.shoplist()
    },
    tab(item) {
      this.$Indicator.loading();
      this.param.food_type_id = item.food_type_id;
      this.param.pagecount = 0;
      this.$refs.loadMoreE.getList(); //触发加载更多
      setTimeout(() => {
        this.$Indicator.close();
      }, 200);
    },
    // 点击遮罩层外区域关闭
    hidePanel(event) {
      let dom = document.querySelector(".modal");
      if (dom) {
        if (!dom.contains(event.target)) {
          //这句是说如果我们点击到了id为child以外的区域
          this.show = false;
        }
      }
    },
    changeFood(val) {
      this.showNum = val;
      let showNum;
      if (this.company == "两") {
        showNum = Number(this.showNum) * 50;
        this.currentItem.gramunit = "g";
      } else {
        showNum = Number(this.showNum);
      }
      this.foodgram = showNum;
      this.foodkcal = Number(
        (this.currentItem.foodkcal / this.currentItem.foodgram) * showNum
      ).toFixed(2);
    },
    //显示和隐藏键盘
    showModal(item) {
      this.currentItem = item;
      this.foodgram = "100";
      this.foodkcal = Number(item.foodkcal) * 2;
      this.show = true;
      if (this.currentItem.gramunit == "ml") {
        this.hideBtnml = true;
        this.hideWgtTwo = false;
        this.company = "ml";
      }
      if (this.currentItem.gramunit == "g") {
        this.hideBtnml = false;
        this.hideWgtTwo = true;
        this.company = "克";
        document.getElementById("saveWeight").classList.add("active");
        document.getElementById("saveTwo").classList.remove("active");
      }
    },
    // 重量估算
    weightEstimation() {
      // this.$router.push(`/weightEstimation`)
      this.toggleModal("show");
    },

    toggleModal(type) {
      var state = type == "show" ? true : false;
      this.weightVisible = state;
    },
    // 取消
    cancel() {
      this.show = false;
      this.showNum = 100;
    },
    //键盘的确定按钮
    confirm() {
      if (this.showNum == "") {
        this.$Toast("请输入菜品克数");
        return;
      }
      let showNum;
      if (this.company == "两") {
        showNum = Number(this.showNum) * 50;
        this.currentItem.gramunit = "g";
      } else {
        showNum = Number(this.showNum);
      }

      //单位克
      const { foodgram, foodkcal} = this.currentItem;
      //总千卡
      const foodkcal2 = Number((showNum / foodgram) * foodkcal).toFixed(2);
      //总克数
      this.currentItem.foodconsumption = showNum;
      //添加到bus
      this.currentItem.foodkcalReslut = foodkcal2;
      // Bus.$emit("addDishes", this.currentItem)
      this.currentList.push(JSON.parse(JSON.stringify(this.currentItem)));
      this.$store.commit("setfoodPhotoData", this.currentList);
      this.show = false;
    },

    saveWeight() {
      this.show = true;
      this.company = "克";
      document.getElementById("saveWeight").classList.add("active");
      document.getElementById("saveTwo").classList.remove("active");
      this.showNum = "";
    },
    saveTwo() {
      this.show = true;
      this.company = "两";
      document.getElementById("saveTwo").classList.add("active");
      document.getElementById("saveWeight").classList.remove("active");
      this.showNum = "";
    },
    //搜索菜单
    searchDishes() {
      const searchData = () => {
        let url = "UserInterface/FoodMenuInfo.ashx"; //搜索的列表
        this.$post(url, this.searchParam).then((data) => {
          if (data.rspcode != 1) {
            this.searchList = [];
            return;
          }
          let modelList = data.data;
          const { mealtype } = this.$route.query;
          modelList.forEach((item, index) => {
            item.mealtype = mealtype;
          });
          this.searchList = modelList;
          this.isSearchPanel = true;
        });
      };
      this.searchIndex = -1;
      setTimeout(searchData, 600);
    },
    //关闭菜单
    toggleMenu(state) {
      if (state == "show" && this.searchList.length == 0) {
        return;
      }
      this.isSearchPanel = state == "show" ? true : false;
    },
    //菜单的点击
    menuClick(item, index) {
      this.searchIndex = index;
      this.showModal(item);
    },
    //分类
    getType() {
      let url = "UserInterface/goods/FoodClassificationList.ashx";
      this.$post(url).then((data) => {
        const list = data.data;
        this.tabs = list;
        this.tab(list[0]);
      });
    },

    //菜单列表
    shoplist(success) {
      let url = "UserInterface/goods/FoodDataList.ashx"; //分类下的列表
      this.$post(url, this.param).then((data) => {
        if (data.rspcode != 1) {
          return;
        }
        let modelList = data.data;
        const { mealtype } = this.$route.query;
        modelList.forEach((item, index) => {
          item.mealtype = mealtype;
        });
        if (this.param.pagecount == 1) {
          this.list = [...modelList];
        } else {
          this.list = [...this.list, ...modelList];
        }

        //加载更多组件触发回调
        if (success) {
          success(modelList, this.list);
        }
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "dietRecord1") {
      this.currentList = []
      this.$store.commit('setfoodPhotoData',[])
    }
    next();
  },
  mounted() {
    //饮食时间
    const { mealtype } = this.$route.query;
    if (mealtype) {
      let mealtypeText = "",
        foodKey = "";
      switch (mealtype) {
        case "01":
          mealtypeText = "早餐";
          foodKey = "breakfastList";
          break;
        case "02":
          mealtypeText = "午餐";
          foodKey = "lunchList";
          break;
        case "03":
          mealtypeText = "晚餐";
          foodKey = "dinnerList";
          break;
        case "04":
          mealtypeText = "加餐";
          foodKey = "mealAdditionList";
          break;
      }
      this.foodKey = foodKey;
       this.mealTypeCar = this.mealType = mealtypeText;
    }

    //搜索条件
    //			this.searchDishes()
    //获取分类
    this.getType();
  },
  components: {
    loadMore,
    DLRuler,
    DLRuler1,
  },
};
</script>

<style scoped lang="scss">
.fileInput {
  display: none;
}
// 搜索框
.search-group {
  margin-top: 0.05rem;
  margin-left: 0.1rem;
  margin-right: 0.1rem;
  padding: 0.08rem 0.2rem;
  padding-left: 0.45rem;
  display: flex;
  align-items: center;
  // background: #f2f2f2;
  // border: 1px solid #e5e5e5;
  border-radius: 0.2rem;
  background: url(../../../assets/images/searchKow.png) no-repeat 0.2rem;
  background-size: 0.16rem;
  background-color: #f8f8f8;
  input {
    flex: 1;
    border: none;
    color: #666;
    font-size: 0.14rem;
  }
  .search {
    width: 0.2rem;
    height: 0.2rem;
    margin-left: 0.1rem;
  }
}
.menu-list {
  position: absolute;
  top: 0.6rem;
  left: 0.12rem;
  right: 0.12rem;
  margin-top: -0.12rem;
  padding: 0.03rem 0;
  border: 1px solid #f0f1f3;
  border-radius: 6px;
  background: #fff;
  max-height: 4rem;
  ul {
    max-height: 4rem;
    overflow-y: scroll;
    min-height: 0.4rem;
  }
  li {
    padding: 0.03rem 0.22rem;
  }
  li.active {
    color: #ffffff;
    background: #f78335;
  }
  .close {
    position: absolute;
    right: 0;
    padding: 0.05rem 0.1rem;
    font-size: 16px;
    color: #ec0000;
  }
}
.header_top {
  height: 0.44rem;
  p {
    width: 0.5rem;
    font-size: 0.16rem;
    line-height: 0.44rem;
    height: 0.44rem;
  }
  // height: 0.44rem;
  display: flex;
  justify-content: space-between;
  .arrow-left {
    font-size: 0.26rem;
    margin-left: 0.12rem;
    // margin-right: 0.1rem;
    width: 0.36rem;
    line-height: 0.44rem;
  }
  .right {
    flex: 1;
  }
  .van-cell {
    line-height: 0.18rem;
  }
  .van-search {
    padding: 0 0.12rem !important;
    margin-top: 0.08rem;
  }
  .van-search__action {
    color: #fff !important;
  }
}
.mint-header {
  height: 48px;
  border-bottom: 1px solid #e5e5e5;
  font-size: 0.16rem;
}
/* 早餐列表 */
.yinshhi_list {
  background: #ffffff;
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
  margin-left: 0.1rem;
}

.yinshhi_list .mint-cell {
  min-height: 66px;
}
.yinshhi_list {
  padding: 0 0.23rem;
}
.yinshhi_list .van-cell {
  align-items: center;
  height: 0.7rem;
  border-radius: 0.06rem;
  margin-bottom: 0.2rem;
  background-color: #f8f8fa;
  min-height: 66px;
}
.yinshhi_list .van-cell:nth-child(1) {
  margin-top: 0.15rem;
  background-color: #f8f8fa;
  min-height: 66px;
}
.fix_top {
  z-index: 90;
}
/* 搜索输入框 */
.search-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 10;
  background: #0ac5ca;
  padding: 0.075rem 0 0.075rem 0;
  .arrow-left {
    margin-left: 0.22rem;
    font-size: 0.2rem;
    color: #fff;
  }
  img {
    margin-right: 0.2rem;
  }
}
.search {
  flex: 1;
  background: #f0f1f3;
  border-radius: 0.6rem;
  overflow: hidden;
  padding: 0 0.1rem;
  margin: 0 0.12rem 0 0.2rem;
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
  border-bottom: 2px solid #fcc759;
  color: #333;
  font-weight: 500;
}
/* 滚动区域 */
.scroll {
  overflow: hidden;
}
span.colF7 {
  color: #999;
}
#navbar .mint-navbar p {
  line-height: 0.44rem;
  font-size: 0.16rem !important;
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
    background: rgba(0, 0, 0, 0.2);

    .close {
      position: absolute;
      right: 5px;
      top: 5px;
      color: #ffffff;
      font-size: 16px;
    }
  }
}

/* 弹出层 */
#mark {
  z-index: 9999;
}

.modal.show {
  transform: translateY(0);
  min-height: 50%;
  overflow: hidden;
}

.modal {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: transform ease 0.7s;
  transform: translateY(1000px);
  padding-bottom: 0.84rem;
  animation: window-open 0.6s 1;
  .btnConfirm {
    border: 1px solid #e8e8e8;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;

    span {
      background-color: #fff !important;
      box-sizing: border-box;
      display: inline-block;
      width: 50%;
      line-height: 0.64rem;
      color: #ffffff;
      font-size: 0.16rem;
    }
    span:nth-child(1) {
      border-right: 1px solid #e8e8e8;
      color: #000;
    }
    span:nth-child(2) {
      color: #36c2d9;
    }
  }
  @keyframes window-open {
    0% {
      bottom: -50%;
    }
    100% {
      bottom: 0;
    }
  }
  .info {
    padding: 0px 10px;
    h3 {
      text-align: center;
      font-weight: 500;
      font-size: 0.2rem;
      margin-top: 0.22rem;
      margin-bottom: 0.3rem;
    }
  }
  .lineMark {
    border-top: 1px solid #e8e8e8;
    margin-top: 0.25rem;
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
    margin: 0.26rem 4% 0 4%;
  }

  .num {
    font-size: 0.275rem;
    color: #0ac5ca;
    display: inline-block;
    min-width: 84px;
    height: 0.35rem;
    padding: 0 0.05rem;
    box-sizing: border-box;
    text-align: center;
    border-bottom: 2px solid #0ac5ca;
  }

  .num_g {
    font-size: 0.165rem;
    color: #0ac5ca;
    vertical-align: super;
  }
  .dw_ys {
    text-align: center;
    margin: 0.2rem 0 0 0;
    .dw_btn {
      margin: 0 0.2rem;
      font-size: 0.17rem;
      display: inline-block;
      width: 0.6rem;
      padding: 0 0.05rem;
      background: none;
      color: #666666;
      height: 0.28rem;
      border-radius: 0.4rem;
    }
    .active {
      background: #0ac5ca;
      color: #ffffff;
    }
    .dw_btn::after {
      background: none;
      color: #0ac5ca;
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
  line-height: 0.42rem;
  box-sizing: border-box;
  border-right: 4px solid #fff;
  border-top: 4px solid #fff;
  background-color: #fafafa;
  border-radius: 10px;
  color: #555555;
}

.keyboard li:last-child {
  color: #fafafa;
  background: url(~@/assets/images/jpsc_bg.png) no-repeat center center #fafafa;
  background-size: 0.3rem 0.25rem;
  font-size: 0.16rem;
  font-family: ui-monospace;
  line-height: 0.44rem;
}

.mint-popup-3 {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.wigtsin_bg {
  background-color: #ffffff;
}
.wigtsin_bg img {
  width: 100%;
  margin: 0;
  padding: 0;
}
.foodCar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  height: 0.6rem;
  background-color: #fff;
  z-index: 3333;
  img {
    position: absolute;
    left: 0.2rem;
    top: -0.13rem;
    width: 0.6rem;
    height: 0.6rem;
  }
  p {
    flex: 1;
    margin-left: 0.9rem;
    line-height: 0.6rem;
  }
  .foodBtn {
    width: 1.66rem;
    line-height: 0.6rem;
    text-align: center;
    color: #fff;
    background-color: #dcdcdc;
  }
  .foodBtn1 {
    width: 1.66rem;
    line-height: 0.6rem;
    text-align: center;
    color: #fff;
    background-color: #36c2d9;
  }
}
.carPopup {
  padding-bottom: 0.6rem;
  .title {
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    text-align: center;
    padding: 0.3rem 0;

    h3 {
      font-size: 0.2rem;
      font-weight: 500;
    }
    .qingk {
      position: absolute;
      top: 0.3rem;
      right: 0.2rem;
      font-size: 0.22rem;
      color: #bebebe;
    }
  }
  .line {
    border-top: 1px solid #e8e8e8;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }
  .info {
    margin-top: 0.24rem;
    padding: 0px 10px;
    h3 {
      text-align: center;
      font-weight: 500;
      font-size: 0.2rem;
      margin-top: 0.22rem;
      margin-bottom: 0.3rem;
    }
    .foodCell {
      margin-bottom: 0.2rem;
      min-height: 0.6rem;
      >>> .mint-cell-value {
        width: 0.6rem;
        height: 0.3rem;
        align-items: center;
        justify-content: center;
        border-radius: 0.15rem;
        border: 1px solid #bebebe;
        font-size: 0.12rem;
        color: #999;
        span {
          flex: 1;
          height: 0.3rem;
          text-align: center;
          line-height: 0.3rem;
        }
      }
    }
  }
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
  .mint-navbar {
    display: inline-block;
    white-space: nowrap;
  }
  .mint-navbar .mint-tab-item {
    height: 0.44rem;
    box-sizing: border-box;
    display: inline-block;
    padding: 0 15px;
    border-bottom: 2px solid #ffffff;
    color: #666666;
  }
}
// .btnConfirm{
//   text-align: center;
//   span{
//     display: block;
//     width: 100%;
//     line-height: 48px;
//     // background-color: #0ac5ca;
//     color: #FFFFFF;
//     font-size: 0.16rem;
//   }
// }
.btnClose {
  text-align: right;
  padding: 0.05rem 0 0 0;
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
    background: url(~@/assets/images/关闭@2x.png) no-repeat center center
      #ffffff;
    background-size: 0.15rem;
  }
}
#main_router img {
  border-radius: 4px;
}
/*.show .info .mint-cell-title{ text-align: center;*/
/*  .titleWrap{*/
/*    text-align: left;*/
/*  }*/
/*}*/
</style>
