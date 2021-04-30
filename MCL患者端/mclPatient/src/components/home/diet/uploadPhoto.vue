<template>
	<div class="uploadPhoto-root">
		<div id="body_main">
			<mt-header title="饮食" fixed>
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>

			<div class="yinshhi_list">
				<div class="title margin10 marginTop10">
					<div class="wrap">
						<span class="font16">饮食时间</span>
						<span class="float_right huiFont9 font15">{{mealtypeText}}</span>
					</div>
				</div>
			</div>

			<!-- 饮食方案 -->
			<div class="marginTop10 yinshhi_list" style="background: #fff;">
				<div class="title borderBottom">
					<div class="wrap ">
						<span class="font16">饮食方案
							<em class="add_ys" @click="goOtherDishes()"></em>
						</span>
						<span class="float_right huiFont9 font15">食用量</span>
						<!--						<img src="@/assets/images/jia_no@2x.png" alt="" class="add" width="23" @click="goOtherDishes()" />-->
					</div>
				</div>
				<!-- 默认接口返回的数据 -->
				<mt-cell v-for="(item,index) in dietPlanInfo" :key="index" @click.native="showModal(item)">
					<img slot="icon" :src="item.foodimg" width="52" height="52">
					<div slot="title" class="titleWrap">
						<span class="mint-cell-text">{{item.foodname}}</span>
						<span class="mint-cell-label font12 huiFont99">建议食用量：{{parseFloat(item.foodconsumption).toFixed(0)}}{{item.gramunit}}</span>
					</div>
					<div class="font14 huiFont99">
						<span style="margin-right: 5px;vertical-align: middle;">
							<i v-if="item.resultObj" style="font-style:normal">{{item.resultObj.foodkcal}}</i>
							<i v-else style="font-style:normal">{{item.foodkcal}}</i>
							{{item.kcalunit}}</span>
						<img src="@/assets/images/delIcon.png" alt="" width="20" style="vertical-align: middle;" @click.stop="delDietCase(index)" />
					</div>
				</mt-cell>

			</div>

			<!-- 其他菜式 -->
			<div class="marginTop10 yinshhi_list">

				<!-- 上传图片区域 -->
				<!-- <div class="propic">
					<div class="title">
						<div class="wrap">
							<span class="font16">拍照上传</span>
						</div>
					</div>
					<div class="uploadArea">
						<div class="photoList" v-for="(item,index) in photoList" v-if="item.show">
							<img :src="item.src" width="100" height="100"/>
							<div class="mask"><span class="close" @click="delPhoto(index)">X</span> </div>
						</div>
						<img src="@/assets/images/tianjia备份@2x.png" width="100" height="100" @click="addPhoto" class="add" v-show="photoAdd"/>
						<input type="file" style="display: none;" accept="image/*" @change="iosUpload($event)" ref="file"/>
					</div>
				</div> -->

			</div>

			<div class="fix_bottom">
				<mt-button type="primary" class="theme-button button-radio " size="large" @click.native="save" v-preventReClick>保存</mt-button>
			</div>
		</div>

		<!-- 用餐食间picker  -->
		<!-- <mt-popup v-model="popupVisible" position="bottom">
			<mt-picker :slots="sexSlots" :showToolbar="true" :visibleItemCount="3" ref="sexPicker">
				<div class="picker_bar">
					<div class="cancel" @click="pickerToggle('hide')">取消</div>
					<div class="confrim" @click="editUserInfo">确定</div>
				</div>
			</mt-picker>
		</mt-popup> -->

		<!-- 遮罩层 -->
		<div id="mark" :style="{display: (show?'block': 'none')}">
			<div class="modal" :class="show && 'show' ">
				<div class="info">
					<div class="btnClose">
						<span @click="hideModal"></span>
						<!-- <span>10月20日/早餐</span> -->
					</div>

					<mt-cell>
						<img slot="icon" :src="currentItem.foodimg" width="56" height="56">
						<div slot="title" class="titleWrap">
							<span class="mint-cell-text">{{currentItem.foodname}}</span>
							<span class="mint-cell-label font12 huiFont99"><span class="colF7">{{currentItem.foodkcal}}{{currentItem.kcalunit}}</span>/{{currentItem.foodgram}}{{currentItem.gramunit}}</span>
						</div>
					</mt-cell>

					<div class="showNum font13">
						<div class="left" style="color: #aaaaaa">
														<p  style="line-height: 25px">{{currentItem.foodkcal}} {{currentItem.kcalunit}}</p>
														<p>{{currentItem.foodgram}}{{currentItem.gramunit}}</p>
						</div>
						<div class="">
              <p><span class="num">&nbsp;{{showNum.join().replace(/,/g, "")}}</span><span class="num_g">{{company}}</span></p>
						</div>
            <div class="right huiFont"  style="text-align: center; color: #aaaaaa">
              <p> <img src="@/assets/images/icon-units.png" alt="" class="icon" width="22" height="22"/></p>
              <p @click="weightEstimation">重量估算</p>
						</div>
					</div>
				</div>
        <div class="dw_ys" v-show="hideWgtTwo" >
          <mt-button type="primary" id="saveWeight" class="dw_btn active" size="large" @click.native="saveWeight">克</mt-button>
          <mt-button type="primary" id="saveTwo" class="dw_btn" size="large" @click.native="saveTwo">两</mt-button>
        </div>
        <div class="dw_ys" v-show="hideBtnml" >
          <mt-button type="primary" id="saveMl" class="dw_btn active"  size="large">ml</mt-button>
        </div>
        <ul class="keyboard">
          <li v-for="(item,index) in keyList" :style="{'border-right-width': (index%3==2 ? 0 : '2px')}" @click="keyCode(item,index)">{{item}}</li>
        </ul>

        <div class="btnConfirm"><span @click="confirm">确 认</span></div>
			</div>
		</div>
    <!-- 重量估算picker  -->
    <mt-popup
    class="mint-popup-3"
    v-model="weightVisible"
    position="right"
    :modal="false"
    popup-transition="popup-fade">
    <mt-header fixed title="重量估算">
      <div slot="left">
        <mt-button icon="back" @click.native="toggleModal('hide')"></mt-button>
      </div>
    </mt-header>
      <div class="popup_body" ref="popupBody">
        <div class="wigtsin_bg">
          <img src="../../../assets/images/wigtsin_1.jpg" width="100%"/>
          <img src="../../../assets/images/wigtsin_2.jpg" width="100%"/>
          <img src="../../../assets/images/wigtsin_3.jpg" width="100%"/>
          <img src="../../../assets/images/wigtsin_4.jpg" width="100%"/>
          <img src="../../../assets/images/wigtsin_5.jpg" width="100%"/>
          <img src="../../../assets/images/wigtsin_6.jpg" width="100%"/>
          <img src="../../../assets/images/wigtsin_7.jpg" width="100%"/>
        </div>
      </div>
    </mt-popup>
	</div>
</template>

<script>
import Bus from '@/assets/js/updateShopCar.js' // bus
import pic from '@/assets/images/syyx.png' //
import loadMore from '@/components/common/loadMore.vue' // 加载更多组件
import axios from 'axios'
export default {
  name: 'uploadPhoto',
  data: () => ({
    mealtypeText: '早餐',
    // 键盘
    keyList: [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'x'],
    showNum: [],
    show: false,
    currentItem: {}, // 点击的菜对象


    hideBtnml: false,
    hideWgtTwo: true,
    company:'克',
    weightVisible: false,

    // 方案的列表
    dietPlanInfo: [],
    dishesList: [],

    // 保存的接口参数
    param: {
      seatskey: '', // 提醒key
      mealtype: '01', // 01：早餐:02：午餐:03：晚餐:04：加餐
      foodinfo: '' // 食物信息
      // img1:"",
      // img2:"",
      // img3:"",
      // img4:"",
    },

    // 图片list
    photoList: [{
      key: 'img1',
      src: '',
      show: false
    },
    {
      key: 'img2',
      src: '',
      show: false
    },
    {
      key: 'img3',
      src: '',
      show: false
    },
    {
      key: 'img4',
      src: '',
      show: false
    }
    ],
    // 图片加号
    photoAdd: true

  }),
  methods: {

    // 饮食补录-查询补录饮食方案
    todayDiet () {
      let url = 'UserInterface/DietPlanInfo.ashx'
      let param = {
        distinguish: this.param.mealtype,
        flag: 0
      }
      return this.$post(url, param).then((data) => {
        if (data.rspcode != 1) {
          return data
        }
        data.data.forEach((item) => {
          item.foodgram = item.foodconsumption
        })
        // 把页面菜单数据更新到bus对象
        Bus.$data.dishesList = data.data
        this.dietPlanInfo = Bus.$data.dishesList
        return data
      })
    },
    // 饮食方案 删除
    delDietCase (index) {
      this.dietPlanInfo.splice(index, 1)
    },

    // 重量估算
    weightEstimation() {
      // this.$router.push(`/weightEstimation`)
      this.toggleModal('show')
    },

    toggleModal (type) {
      var state = (type == 'show' ? true : false)
      this.weightVisible = state
    },
    // 显示和隐藏键盘
    showModal (item) {
      this.currentItem = item
      this.showNum = []
      this.show = true
      if( this.currentItem.gramunit=="ml"){
        this.hideBtnml=true;
        this.hideWgtTwo=false;
        this.company= "ml";
      }
      if( this.currentItem.gramunit=="g"){
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
    // 键盘的输入事件
    keyCode (item, index) {
      if (item == 'x') {
        this.showNum.pop()
      } else {
        if( this.company=="两"){
          if (this.showNum.length < 3) {
            this.showNum.push(item)
          }
        }
        else {
          if (this.showNum.length < 6) {
            this.showNum.push(item)
          }
        }
      }
    },
    // 键盘的确定按钮
    confirm () {
      if(this.showNum.length == 0){
        this.$Toast("请输入菜品克数")
        return
      }
      let showNum;
      if( this.company=="两"){
        showNum = Number(this.showNum.join().replace(/,/g, ""))*50;
        this.currentItem.gramunit="g";
      }else {
        showNum = Number(this.showNum.join().replace(/,/g, ""));
      }
      // 单位克
      const {
        foodgram,
        foodkcal
      } = this.currentItem
      // 总千卡
      const foodkcal2 = Number((showNum / foodgram) * foodkcal).toFixed(2)
      // resultObj 保存计算过的结果
      this.currentItem.resultObj = {
        foodkcal: foodkcal2
      }
      // 总克数
      this.currentItem.foodconsumption = showNum

      // 是否已经计算初始(化千卡和克)比列
      // if(!this.currentItem.isComputed){
      // 	const {foodkcal, foodconsumption} = this.currentItem;  //千卡  克
      // 	this.currentItem.ratio = (Number(foodkcal)/Number(foodconsumption));  //比率
      // 	this.currentItem.isComputed = true;
      // }
      // let allkcal = this.currentItem.ratio*showNum;   //总千卡
      // this.currentItem.foodkcal = allkcal;  //总千卡
      // this.currentItem.foodconsumption = showNum;  //总克数

      this.hideModal()
    },

    saveWeight () {
      this.show = true
      this.company= "克"
      document.getElementById('saveWeight').classList.add('active')
      document.getElementById('saveTwo').classList.remove('active')
      this.showNum.length=0
    },
    saveTwo() {
      this.show = true
      this.company= "两"
      document.getElementById('saveTwo').classList.add('active')
      document.getElementById('saveWeight').classList.remove('active')
      this.showNum.length=0
    },
    // 上传图片
    // 增加图片按钮
    addPhoto () {
      if (this.$root.isWeiXin() || /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        // 微信 和  Ios
        return this.$refs.file.click()
      } else if (/(Android)/i.test(navigator.userAgent)) {
        // Android终端
        window.back.clickOnAndroidSelectPhoto()
      }
    },
    // ios端 上传文件
    iosUpload (e) {
      let file = e.target.files[0]
      let url = URL.createObjectURL(file)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      } // 添加请求头
      let params = new FormData() // 创建form对象
      params.append('uploadedFile', file) // 通过append向form对象添加数据
      axios.post('UserInterface/UploadFile.ashx', params, config).then(response => {
        if (response.data.rspcode != 1) {
          return
        }
        let responseUrl = response.data.url

        // 设置图片地址
        for (let i = 0; i < this.photoList.length; i++) {
          const item = this.photoList[i]
          if (item.src == '') {
            item.src = responseUrl
            item.show = true
            break
          }
        }
        // 是否显示增加图片按钮
        let len = 0
        for (let i = 0; i < this.photoList.length; i++) {
          const item = this.photoList[i]
          if (item.src != '') {
            len += 1
          }
        }
        if (len == this.photoList.length) {
          this.photoAdd = false
        }
      })
    },
    // android端 上传文件（被app主动调起的回调函数）
    androidUpload (stream) {
      let url = 'UserInterface/UploadPhotos.ashx'
      this.$post(url, {
        BinaryStream: stream
      }).then((data) => {
        if (data.rspcode == 0) {
          return
        }
        let responseUrl = responseUrl

        // 设置图片地址
        for (let i = 0; i < this.photoList.length; i++) {
          const item = this.photoList[i]
          if (item.src == '') {
            item.src = responseUrl
            item.show = true
            break
          }
        }
        // 是否显示增加图片按钮
        let len = 0
        for (let i = 0; i < this.photoList.length; i++) {
          const item = this.photoList[i]
          if (item.src != '') {
            len += 1
          }
        }
        if (len == this.photoList.length) {
          this.photoAdd = false
        }
      })
    },
    // 删除图片
    delPhoto (index) {
      // 删除图片数据
      this.photoList[index].show = false
      this.photoList[index].src = ''
      // 显示图片新增按钮
      this.photoAdd = true
    },

    // 保存
    save () {
      let url = 'UserInterface/DietPlanUpdate.ashx'
      let foodinfoArr = []
      this.dietPlanInfo.forEach((item) => {
        const {
          foodname,
          foodconsumption
        } = item
        let foodkcal = item.foodkcal
        if (item.resultObj) {
          foodkcal = item.resultObj.foodkcal
        }
        foodinfoArr.push(`${foodname},${foodkcal},${foodconsumption}`)
      })

      // 设置图片地址
      // const param = this.param;
      // for(let i=0; i<this.photoList.length; i++){
      // 	const item = this.photoList[i];
      // 	param[item.key] = item.src;
      // }
      // 设置饮食方案格式
      this.param.foodinfo = foodinfoArr.join(';')
      this.$post(url, this.param).then((data) => {
        if (data.rspcode != 1) {
          return
        }
		this.$router.back()
        // this.$router.push('/diet')
      })
    },

    // 其他菜式页面
    goOtherDishes () {
      this.$router.push(`/otherDishes?mealtype=${this.param.mealtype}`)
    }
  },
  mounted () {
    // 饮食时间
    const {
      mealtype
    } = this.$route.query
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
      this.mealtypeText = mealtypeText
      this.param.mealtype = mealtype
      // 把bus对象的菜单数据更新到页面
      this.dietPlanInfo = Bus.$data.dishesList
    }
  },
  components: {
    loadMore
  },
  created () {
    this.param.mealtype = this.$route.query.mealtype
    this.param.seatskey = this.$route.query.skey
  },
  beforeRouteEnter (to, from, next) {
    // 导航进入该组件的对应路由时调用
    // 不是来自搜索菜单的页面，要调用菜单接口
    next(vm => {
      // 通过 `vm` 访问组件实例
      if (from.name != 'otherDishes') {
        // 饮食补录-查询补录饮食方案
        vm.todayDiet()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 不是去搜索菜单的页面，要置空菜单列表
    if (to.name != 'otherDishes') {
      Bus.$data.dishesList = []
    }
    next()
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

		.title {
			padding: 0.12rem 0;
			margin-left: 0.12rem;
		}

		.wrap {
			padding-right: 15px;
		}

		.wrap>* {
			vertical-align: middle;
		}

		.wrap>.icon {
			margin-right: 5px;
		}
	}

	.add_ys {
		width: 0.165rem;
		height: 0.165rem;
		display: inline-block;
		border-radius: 50%;
		/*text-align: center;*/
		/*color: #fff;*/
		/*background-color: #0AC5C9;*/
		margin-left: 0.05rem;
		/*font-weight: bolder;*/
		/*font-size: 0.165rem;*/
		font-style: normal;
    /*font-family:emoji;*/
		/*line-height: 0.165rem;*/
		box-shadow: 1px 1px 1px #ccc;
    vertical-align: text-top;
    background: url(../../../assets/images/jia_white.png) no-repeat center center #0AC5C9;
    background-size:80%;
	}

	.titleWrap {
		display: inline-block;
		vertical-align: middle;
		margin-left: 0.1rem;
	}

	.yinshhi_list .mint-cell {
		min-height: 66px;
	}

	/* 搜索输入框 */
	.search {
		background: #F0F1F3;
		border-radius: 0.15rem;
		height: 0.30rem;
		overflow: hidden;
		margin: 0.12rem;
		margin-top: 0;
		padding: 0 0.2rem;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.icon,
		input {
			vertical-align: middle;
		}

		input {
			flex: 1;
			height: 0.30rem;
			line-height: 0.30rem;
			font-size: 0.12rem;
			margin-left: 0.05rem;
		}
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
      z-index: 999;
      span {
        display: block;
        width: 100%;
        line-height: 0.44rem;
        background-color: #0AC5C9;
        color: #FFFFFF;
        font-size: 0.16rem;
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
      min-width: 84px;
      height: 0.35rem;
      padding:0 0.05rem;
      box-sizing: border-box;
      text-align: center;
      border-bottom: 2px solid #0AC5C9;
    }

    .num_g {
      font-size: 0.165rem;
      color: #0AC5C9;
      vertical-align: super;
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
    line-height: 0.42rem;
    box-sizing: border-box;
    border-right: 4px solid #fff;
    border-top: 4px solid #fff;
    background-color: #fafafa;
    border-radius: 10px;
    color: #555555;
  }

  .keyboard li:last-child{
    color: #fafafa;
    background: url(../../../assets/images/jpsc_bg.png) no-repeat center center #fafafa;
    background-size: 0.30rem 0.25rem;
    font-size: 0.16rem;
    font-family: ui-monospace;
    line-height: 0.44rem;
  }

	.propic {
		width: 100%;
		border-bottom: 1px solid #eee;
	}

	.fix_bottom {
		padding: 0;
    z-index: 99;
		.theme-button {
			background-color: #0AC5C9;
			border-radius: 0;
			line-height: 0.44rem;
			height: 0.44rem;
		}
	}
  .mint-popup-3 {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .wigtsin_bg{
    background-color: #FFFFFF;
  }
  .wigtsin_bg img{
    width: 100%;
    margin: 0;
    padding: 0;
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

	.btnConfirm {
		text-align: center;

		span {
			display: block;
			width: 100%;
			line-height: 48px;
			background-color: #0AC5C9;
			color: #FFFFFF;
			font-size: 0.16rem;
		}
	}

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
			background: url(../../../assets/images/关闭@2x.png) no-repeat center center #FFFFFF;
			background-size: 0.15rem;
		}
	}

	#main_router img {
		border-radius: 4px;
	}

	span .colF7 {
		color: #F78335;
	}
  .fix_bottom{

     z-index: 88;
  }
</style>
