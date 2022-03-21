<template>
  <div class="home">
    <mt-header
      style="background-color: #36c2d7; color: #fff"
      :title="title"
      fixed
    >
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div class="content">
      <div class="foodPhoto">
        <img :src="imgUrl" alt="">
      </div>
      <div class="food_name">
        <h3> <span></span>食物名称</h3>
        <p>
          <!-- <input type="text" placeholder="请输入食物名称"> -->
           <van-field clearable	 v-model.trim="foodName" placeholder="请输入食物名称" />
        </p>
      </div>
    </div>
    
    <div class="bot_content">
        <div class="btn">
          <van-button
            v-if="valueAll"
            class="btn_info"
            round
            type="info"
            @click="goInfo"
            >保存</van-button
          >
          <van-button v-else class="btn_info1" round type="info"
            >保存</van-button
          >
        </div>
    </div>
   
  </div>
</template>

<script>

export default {
  name: "weightGauge1",
  data() {
    return {
      title : '', // 页面头部titlte
      valueAll  :false,
      foodName : '',
      imgUrl : '',
    }
  },
  watch: {
    'foodName' : {
      handler(newValue,oldValue) {
        if(newValue == '') {
          this.valueAll = false
        }else {
          this.valueAll = true
        }
      }
    }
  },
  created() {
    this.getPhotoData()
    
  },
  methods : {
    // 获取页面信息
    getPhotoData() {
    let time = this.timeFormat(new Date())
    this.title = time + ' ' + this.$route.query.mealType
    this.imgUrl = this.$route.query.url
    // this.formData = this.$store.state.foodPhotoData
    },
    // 保存
    goInfo() {
      let url = 'UserInterface/selfTestTool/FoodPhotographSave.ashx'
      let foodData = {
        foodName : this.foodName,
        foodImg : this.imgUrl,
        mealName : this.$route.query.mealType
      }
      let foodPhotoData = []
      let data = {
        foodconsumption : 100,
        foodkcalReslut : '277.00',
        foodname : '包子',
        foodimg : "http://adm.marryhealthscience.com/Upload/CarouselLigure/674ac5b2-84b3-428f-9fbd-af4deddc46b1.jpg"
      }
      foodPhotoData.push(data)
      // let foodList = [...foodPhotoData,data]
      this.$store.commit('setfoodPhotoData',foodPhotoData)
      this.$router.back()
      // this.$post(url,foodData).then(res => {

      //   console.log(res);
      // })
    },
     // 格式化时间
    timeFormat(time) {
      // 时间格式化 2019-09-08
      // let year = time.getFullYear();
      let month =
        time.getMonth() + 1 < 10
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1;
      let day = time.getDate();
      if (day < 10) {
        return month + "月" + "0" + day + '日';
      } else {
        return month + "月" + day + '日';
      }
    },
  },  
};
</script>

<style scoped lang="scss">
.home {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  // background-color: #fff !important;
}
.content {
  background-color: #fff;
  padding-bottom: 0.3rem;
  .foodPhoto {
    padding: 0.73rem 0.36rem 0.3rem 0.36rem;
    img {
      width: 3rem;
      height: 2rem;
      border-radius: 0.08rem;
    }
  }
  .food_name {
    padding: 0 0.32rem;
    h3 {
      font-size: 0.18rem;
      font-weight: 500;
      span {
      margin-right: 0.05rem;
			border-left: 4px solid #36C2D9;
		  border-radius: 0.04rem;
    }
    }
    p {
      height: 0.5rem;
      background-color: #F8F8FA;
      line-height: 0.46rem;
      padding-left: 0.15rem;
      >>> .van-cell {
        background-color: #F8F8FA;
        input {
        border: 0;
        font-size: 0.16rem;
      }
      .van-icon {
        font-size: 0.2rem;
      }
      }
      
    }
  }
}
.bot_content {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 1rem;
  height: 0.88rem;
  background-color: #fff;
  .btn {
    width: 100%;
    background-color: #fff;
    padding: 0.15rem 0 0 0;
    text-align: center;
    .btn_info {
      width: 80% !important;
      background: linear-gradient(to left, #38c2d7, #51e4f7);
      border: 0;
    }
    .btn_info1 {
      border: 0;
      width: 80% !important;
      background-color: #dcdcdc;
    }
  }
}
</style>