<template>
  <div>
    <mt-header title="服药调查" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div class="medicat_home">
      <div class="basic_details">
        <div class="medicat_name d-flex">
          <div><label>药品名称：</label></div>
          <div class="flex-grow-1"><input type="text" v-model="param.drug_name" placeholder="请输入药品名称"/></div>
        </div>
        <div style="margin-top: 0.14rem;">
          <div class="uploadArea">
            <div class="photoList" v-for="(item,index) in photoList" v-if="item.show">
              <img :src="item.src" width="100" height="100"/>
              <div class="mask"><span class="close" @click="delPhoto(index)"> </span></div>
            </div>
            <div class="photo_add" @click="addPhoto" v-show="photoAdd">
              <img src="@/assets/images/拍照@2x.png" class="add"/>
              <span>药品图片添加<em>（可添加三张）</em></span>
            </div>
            <!--            <img src="@/assets/images/tianjia备份@2x.png" width="100" height="100" @click="addPhoto" class="add"-->
            <!--                 v-show="photoAdd"/>-->
            <input type="file" style="display: none;" accept="image/*" @change="iosUpload($event)" ref="file"/>
          </div>
        </div>
        <div class="medicat_yaol">
          <div class="medicat_yaoever">
            <!-- <span>每次用量：</span> -->
            <mt-cell title="每次用量：" is-link @click.native="pickerToggle('show')">
              <span>{{param.consumption}}</span>
            </mt-cell>
            <!-- <select v-model="param.consumption" @change="getCouponSelected">
              <option v-for="(item,index) in stateList1" :value="item.value" :key="index">{{item.numbb}}</option>
            </select> -->
          </div>
          <div class="medicat_yaoever">
            <!-- <span>剂量：</span> -->
            <!-- <select v-model="param.dose">
              <option v-for="(item,index) in stateList2" :value="item.value" :key="index" name="dose">{{item.value}}</option>
            </select> -->
            <mt-cell title="剂量：" is-link @click.native="pickerToggles('show')">
              <span>{{param.dose}}</span>
            </mt-cell>
          </div>
        </div>
      </div>
      <div class="medicat_pingl">
        <h3>用药频率</h3>
        <ul>
          <li>
            <span>第一次</span>
            <mt-cell title="" is-link @click.native="pickerToggles1('show')"
                     style="width: 30%;float: left;">
              <span>{{param.first_time}}</span>
            </mt-cell>
            <!-- <select v-model="param.first_time">
              <option v-for="(item,index) in stateList3" :value="item.value" :key="index" name="consumption">{{item.value}}</option>
            </select> -->
            <div class="medicat_eatbf">
              <p v-for="(item,index) in list1" :key="index" :class="{active:index==current1}"
                 @click="getdefalt1(index)">
                <label>
                  <u></u>
                </label>
                <i>{{item.names}}</i>
              </p>
            </div>
          </li>
          <li>
            <span>第二次</span>
            <!-- <select v-model="param.second_time">
              <option v-for="(item,index) in stateList3" :value="item.value" :key="index" name="consumption">{{item.value}}</option>
            </select> -->
            <mt-cell title="" is-link @click.native="pickerToggles2('show')"
                     style="width: 30%;float: left;">
              <span>{{param.second_time}}</span>
            </mt-cell>
            <div class="medicat_eatbf">
              <p v-for="(item,index) in list1" :key="index" :class="{active:index==current2}"
                 @click="getdefalt2(index)">
                <label>
                  <u></u>
                </label>
                <i>{{item.names}}</i>
              </p>
            </div>
          </li>
          <li>
            <span>第三次</span>
            <!-- <select v-model="param.third_time">
              <option v-for="(item,index) in stateList3" :value="item.value" :key="index" name="consumption">{{item.value}}</option>
            </select> -->
            <mt-cell title="" is-link @click.native="pickerToggles3('show')"
                     style="width: 30%;float: left;">
              <span>{{param.third_time}}</span>
            </mt-cell>
            <div class="medicat_eatbf">
              <p v-for="(item,index) in list1" :key="index" :class="{active:index==current3}"
                 @click="getdefalt3(index)">
                <label>
                  <u></u>
                </label>
                <i>{{item.names}}</i>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="medicat_details">
        <div class="medicat_styl d-flex">
          <span>服药方式： </span>
          <div class="medicat_eatbf">
            <p v-for="(item,index) in lista" :key="index" :class="{active:index==current4}" @click="getdefalt4(index)">
              <label>
                <u></u>
              </label>
              <i>{{item.names}}</i>
            </p>
          </div>
        </div>
        <div class="medicat_styl d-flex">
          <span>是否按医嘱： </span>
          <div class="medicat_eatbf">
            <p v-for="(item,index) in listb" :key="index" :class="{active:index==current5}" @click="getdefalt5(index)">
              <label>
                <u></u>
              </label>
              <i>{{item.names}}</i>
            </p>
          </div>
        </div>
        <div class="medicat_styl d-flex medicat_blfy">
          <span>不良反应：</span>
          <div class="medicat_eatbf">
            <p v-for="(item,index) in listc" :key="index" :class="{active:index==current6}"
               @click="getdefalt6(index)">
              <label>
                <u></u>
              </label>
              <i>{{item.names}}</i>
              <span v-show="showInput" class="show_input">
              <input type="text" v-if="item.names=='有'" v-model="param.side_effects_result" placeholder="请输入有何不良反应"/>
          </span>
            </p>
          </div>
        </div>
      <div class="medicat_styl d-flex">
        <span>饮食注意：</span>
        <textarea class="medicat_text" v-model="param.dietary_attention"></textarea>
      </div>

      </div>
      <div class="footer_btn">
        <mt-button type="primary" class="theme-button" size="large" @click.native="setpost" v-preventReClick>确定并增加</mt-button>
      </div>
    </div>
    <!-- 每日用药picker  -->
    <mt-popup v-model="popupVisible" position="bottom">
      <mt-picker :slots="sexSlots" :showToolbar="true" :visibleItemCount="3" ref="sexPicker" @change="visbleChange">
        <div class="picker_bar">
          <div class="cancel" @click="pickerToggle('hide')">取消</div>
          <div class="confrim" @click="editUserInfo">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
    <!-- 剂量picker  -->
    <mt-popup v-model="popupVisibles" position="bottom">
      <mt-picker :slots="sexSlotses" :showToolbar="true" :visibleItemCount="3" ref="sexPickers" @change="visbleChange">
        <div class="picker_bar">
          <div class="cancel" @click="pickerToggles('hide')">取消</div>
          <div class="confrim" @click="editUserInfos">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
    <!-- 第一次picker  -->
    <mt-popup v-model="popupVisibles1" position="bottom">
      <mt-picker :slots="sexSlotses1" :showToolbar="true" :visibleItemCount="3" ref="sexPickers1"
                 @change="visbleChange">
        <div class="picker_bar">
          <div class="cancel" @click="pickerToggles1('hide')">取消</div>
          <div class="confrim" @click="editUserInfos1">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
    <!-- 第二次picker  -->
    <mt-popup v-model="popupVisibles2" position="bottom">
      <mt-picker :slots="sexSlotses2" :showToolbar="true" :visibleItemCount="3" ref="sexPickers2"
                 @change="visbleChange">
        <div class="picker_bar">
          <div class="cancel" @click="pickerToggles2('hide')">取消</div>
          <div class="confrim" @click="editUserInfos2">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
    <!-- 第三次picker  -->
    <mt-popup v-model="popupVisibles3" position="bottom">
      <mt-picker :slots="sexSlotses3" :showToolbar="true" :visibleItemCount="3" ref="sexPickers3"
                 @change="visbleChange">
        <div class="picker_bar">
          <div class="cancel" @click="pickerToggles3('hide')">取消</div>
          <div class="confrim" @click="editUserInfos3">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
    <div class="yyjl_alert" v-if="aletShow">
      <div class="yyjl_acont">
        <p>上传成功，是否继续添加用药记录?</p>
        <div class="yyjl_abtn">
          <span @click="noalal">确定</span>
          <span @click="alalet" style="color: #F78335;border-left: 1px solid #ddd;">添加</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'addmedicat',
    data: () => ({
      handler: function (e) {
        e.preventDefault()
      },
      // 图片加号
      photoAdd: true,
      consumption: '',
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
        }
      ],
      current1: -1,
      current2: -1,
      current3: -1,
      current4: -1,
      current5: -1,
      current6: -1,
      list1: [{
        names: '饭前'
      },
        {
          names: '饭后'
        }
      ],
      lista: [{
        names: '口服'
      },
        {
          names: '吸入'
        },
        {
          names: '注射'
        }
      ],
      listb: [{
        names: '是'
      },
        {
          names: '否'
        }
      ],
      listc: [{
        names: '有'
      },
        {
          names: '无'
        }
      ],
      popupVisible: false, // 是否显示药量
      sexSlots: [{
        flex: 1,
        values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '11', '12', '13', '14', '15', '16', '17', '18'
        ],
        className: 'slot1',
        textAlign: 'center'
      }],
      popupVisibles: false, // 是否显示剂量
      sexSlotses: [{
        flex: 1,
        values: ['粒', '颗', '片', '支'],
        className: 'slot1',
        textAlign: 'center'
      }],
      popupVisibles1: false, // 第一次
      popupVisibles2: false, // 第2次
      popupVisibles3: false, // 第3次
      sexSlotses1: [{
        flex: 1,
        values: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
          '12:00',
          '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
        ],
        className: 'slot1',
        textAlign: 'center'
      }],
      sexSlotses2: [{
        flex: 1,
        values: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
          '12:00',
          '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
        ],
        className: 'slot1',
        textAlign: 'center'
      }],
      sexSlotses3: [{
        flex: 1,
        values: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
          '12:00',
          '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
        ],
        className: 'slot1',
        textAlign: 'center'
      }],
      param: {
        drug_name: '',
        pic1: '',
        pic2: '',
        pic3: '',
        consumption: '0',
        dose: '粒',
        first_time: '0:00',
        first_result: '饭前',
        second_time: '0:00',
        second_result: '饭前',
        third_time: '0:00',
        third_result: '饭前',
        medication_method: '口服',
        doctor_advice: '是',
        side_effects: '有',
        side_effects_result: '',
        dietary_attention: ''
      },
      aletShow: false,
      showInput: false,
    }),
    methods: {
      closeTouch () {
        document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {
          passive: false
        }) // 阻止默认事件
      },
      openTouch () {
        document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {
          passive: false
        }) // 打开默认事件
      },
      visbleChange (val) {
        // console.log(val)
        // if (val) {
        this.closeTouch()
        // } else {
        // 	this.openTouch()
        // }
      },
      // 显示每日药量picker
      pickerToggle (state) {
        if (state == 'show') {
          this.closeTouch()
          this.popupVisible = true
        }
        if (state == 'hide') {
          this.openTouch()
          this.popupVisible = false
        }
      },
      editUserInfo () {
        this.openTouch()
        const {
          sexPicker
        } = this.$refs
        let sex = sexPicker.getSlotValue(0)
        this.param.consumption = sex
        this.pickerToggle('hide')
      },
      // 显示剂量picker
      pickerToggles (state) {
        if (state == 'show') {
          this.closeTouch()
          this.popupVisibles = true
        }
        if (state == 'hide') {
          this.openTouch()
          this.popupVisibles = false
        }
      },
      editUserInfos () {
        this.openTouch()
        const {
          sexPickers
        } = this.$refs
        let sex = sexPickers.getSlotValue(0)
        this.param.dose = sex
        this.pickerToggles('hide')
      },
      // 第一次picker
      pickerToggles1 (state) {
        if (state == 'show') {
          this.closeTouch()
          this.popupVisibles1 = true
        }
        if (state == 'hide') {
          this.openTouch()
          this.popupVisibles1 = false
        }
      },
      editUserInfos1 () {
        this.openTouch()
        const {
          sexPickers1
        } = this.$refs
        let sex = sexPickers1.getSlotValue(0)
        this.param.first_time = sex
        this.pickerToggles1('hide')
      },
      // 第二次picker
      pickerToggles2 (state) {
        if (state == 'show') {
          this.closeTouch()
          this.popupVisibles2 = true
        }
        if (state == 'hide') {
          this.openTouch()
          this.popupVisibles2 = false
        }
      },
      editUserInfos2 () {
        this.openTouch()
        const {
          sexPickers2
        } = this.$refs
        let sex = sexPickers2.getSlotValue(0)
        this.param.second_time = sex
        this.pickerToggles2('hide')
      },
      // 第三次picker
      pickerToggles3 (state) {
        if (state == 'show') {
          this.closeTouch()
          this.popupVisibles3 = true
        }
        if (state == 'hide') {
          this.openTouch()
          this.popupVisibles3 = false
        }
      },
      editUserInfos3 () {
        this.openTouch()
        const {
          sexPickers3
        } = this.$refs
        let sex = sexPickers3.getSlotValue(0)
        this.param.third_time = sex
        this.pickerToggles3('hide')
      },
      change ($event) {
        var $file = $event.target
        var file = $file.files[0] // 获取File对象
        var URL = window.URL || window.webkitURL
        var imageURL = URL.createObjectURL(file)
        this.photoList.push({
          file: JSON.parse(JSON.stringify(file)),
          src: imageURL
        })
        $file.value = ''
      },
      // addPhoto() {
      // 	return this.$refs.file.click()
      // },
      // delPhoto(index) {
      // 	this.photoList.splice(index, 1)
      // },
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
      // 增加接口
      setpost () {
        if (this.param.drug_name == '') {
          this.$Toast('请输入药品名称')
          return
        }
        this.param.pic1 = this.photoList[0].src
        this.param.pic2 = this.photoList[1].src
        this.param.pic3 = this.photoList[2].src
        let url = 'UserInterface/curve/MedicationSurvey.ashx'
        this.$post(url, this.param).then((data) => {
          if (data.rspcode != 1) {
            return
          }
          this.aletShow = true
          // this.$MessageBox.defaults = { ok: "添加", cancel: "确定" };
          // this.$MessageBox.confirm('上传成功，是否继续添加用药记录').then(action => {
          // 	this.param.drug_name = "";
          // 	this.param.pic1 = "";
          // 	this.param.pic2 = "";
          // 	this.param.pic3 = "";
          // 	this.param.consumption = "0";
          // 	this.param.dose = "粒";
          // 	this.param.first_time = "0:00";
          // 	this.param.first_result = "饭前";
          // 	this.param.second_time = "0:00";
          // 	this.param.second_result = "饭前";
          // 	this.param.third_time = "0:00";
          // 	this.param.third_result = "饭前";
          // 	this.param.medication_method = "口服";
          // 	this.param.doctor_advice = "是";
          // 	this.param.side_effects = "有";
          // 	this.param.side_effects_result = "";
          // 	this.param.dietary_attention = "";
          // 	this.photoList[0].src='';
          // 	this.photoList[1].src='';
          // 	this.photoList[2].src='';
          // 	this.delPhoto(0);
          // 	this.delPhoto(1);
          // 	this.delPhoto(2);
          // 	this.current1=0;
          // 	this.current2=0;
          // 	this.current3=0;
          // 	this.current4=0;
          // 	this.current5=0;
          // 	this.current6=0;
          // }).catch(err => {
          // 	this.$router.back();
          // });
        })
      },
      alalet () {
        this.param.drug_name = ''
        this.param.pic1 = ''
        this.param.pic2 = ''
        this.param.pic3 = ''
        this.param.consumption = '0'
        this.param.dose = '粒'
        this.param.first_time = '0:00'
        this.param.first_result = '饭前'
        this.param.second_time = '0:00'
        this.param.second_result = '饭前'
        this.param.third_time = '0:00'
        this.param.third_result = '饭前'
        this.param.medication_method = '口服'
        this.param.doctor_advice = '是'
        this.param.side_effects = '有'
        this.param.side_effects_result = ''
        this.param.dietary_attention = ''
        this.photoList[0].src = ''
        this.photoList[1].src = ''
        this.photoList[2].src = ''
        this.delPhoto(0)
        this.delPhoto(1)
        this.delPhoto(2)
        this.current1 = -1
        this.current2 = -1
        this.current3 = -1
        this.current4 = -1
        this.current5 = -1
        this.current6 = -1
        this.aletShow = false
      },
      noalal () {
        this.aletShow = false
        this.$router.back()
      },
      getdefalt1 (index) {
        this.current1 = index
        if (index == 0) {
          this.param.first_result = '饭前'
        } else {
          this.param.first_result = '饭后'
        }
      },
      getdefalt2 (index) {
        this.current2 = index
        if (index == 0) {
          this.param.second_result = '饭前'
        } else {
          this.param.second_result = '饭后'
        }
      },
      getdefalt3 (index) {
        this.current3 = index
        if (index == 0) {
          this.param.third_result = '饭前'
        } else {
          this.param.third_result = '饭后'
        }
      },
      getdefalt4 (index) {
        this.current4 = index
        if (index == 0) {
          this.param.medication_method = '口服'
        } else if (index == 1) {
          this.param.medication_method = '吸入'
        } else {
          this.param.medication_method = '注射'
        }
      },
      getdefalt5 (index) {
        this.current5 = index
        if (index == 0) {
          this.param.doctor_advice = '是'
        } else {
          this.param.doctor_advice = '否'
        }
      },
      getdefalt6 (index) {
        this.current6 = index
        if (index == 0) {
          this.param.side_effects = '有';
          this.showInput = true;
        } else {
          this.param.side_effects = '无';
          this.showInput = false;
        }
      }
    },
    mounted () {
      this.openTouch()
    }
  }
</script>

<style scoped lang="scss">
  .mint-header {
    height: 48px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 0.16rem;
  }

  .yyjl_alert {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99999;
    background: rgba(000, 000, 000, 0.6);

    .yyjl_acont {
      width: 88%;
      height: 1.0rem;
      background: #fff;
      border-radius: 6px;
      position: relative;
      left: 6%;
      top: 50%;
      margin-top: -0.5rem;

      p {
        height: 0.6rem;
        font-size: 0.16rem;
        color: #666;
        text-align: center;
        line-height: 0.6rem;
      }

      .yyjl_abtn {
        overflow: hidden;
        position: absolute;
        bottom: 0;
        width: 100%;
        font-size: 0.13rem;
        left: 0;

        span {
          width: 50%;
          float: left;
          display: block;
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          border-top: 1px solid #ddd;
          box-sizing: border-box;
        }
      }
    }
  }

  .medicat_home {
    padding-top: 48px;
    padding-bottom: 55px;

    .basic_details {
      background-color: #FFFFFF;
      margin-top: 0.1rem;
      padding-top: 0.1rem;

      .medicat_name {
        margin-left: 3%;
        padding: 0.05rem 0;

        label {
          font-size: 0.15rem;
          line-height: 0.32rem;
        }

        input {
          width: 96%;
          padding: 0 2%;
          height: 0.32rem;
          background: #fff;
          border-width: 0 0 1px 0;
          border-bottom: 1px solid #e5e5e5;
        }


      }

      .medicat_yaol {
        overflow: hidden;
        margin-left: 3%;
        padding: 0.05rem 0;

        .medicat_yaoever {
          width: 50%;
          float: left;
          overflow: hidden;
          font-size: 0.14rem;

          span {
            display: block;
            line-height: 0.3rem;
            float: left;
          }

          select {
            width: 40%;
            float: left;
            height: 0.3rem;
            text-align: center;
            border: 1px solid #eee;
          }
        }
      }

    }
    .medicat_pingl {
      margin-top: 0.1rem;
      background-color: #FFFFFF;

      h3 {
        font-weight: normal;
        font-size: 0.15rem;
        padding: 0.1rem 3%;
        border-bottom: 1px solid #e5e5e5;
        color: #484848;
      }

      ul {
        padding-left: 3%;

        li {
          overflow: hidden;
          border-bottom: 1px solid #e5e5e5;

          span {
            width: 20%;
            display: block;
            float: left;
            line-height: 48px;
            text-align: center;
          }

          select {
            width: 20%;
            display: block;
            float: left;
            height: 0.2rem;
            text-align: center;
            margin-right: 8%;
            border: 1px solid #ddd;
            color: #F08619;
          }

          .medicat_eatbf {
            width: 45%;
            float: right;
            font-size: 0.14rem;
            margin-top: 14px;

            p {
              width: 50%;
              float: left;
              overflow: hidden;

              i {
                font-style: normal;
                display: inline-block;
                font-size: 0.145rem;
              }

              label {
                width: 0.14rem;
                height: 0.14rem;
                display: inline-block;
                border: 1px solid #999;
                border-radius: 50%;
                position: relative;
                margin-right: 0.05rem;
                top: 2px;

                u {
                  width: 0.08rem;
                  height: 0.08rem;
                  border-radius: 50%;
                  position: absolute;
                  top: 0.03rem;
                  left: 0.03rem;
                }
              }

              &.active {
                label {

                  border: 1px solid #0bb8bc;
                }

                u {
                  background: #0AC5C9;
                }
              }
            }
          }
        }

        /*li::after {*/
        /*  content: " ";*/
        /*  opacity: 0.1;*/
        /*  right: 0;*/
        /*  bottom: 0;*/
        /*  left: 15px;*/
        /*  position: absolute;*/
        /*  height: 1px;*/
        /*  border-color: rgba(0,0,0,0.1);*/
        /*}*/

        li:last-child {
          border-bottom: 0;
        }
      }
    }

    .medicat_details {
      background-color: #FFFFFF;
      margin-top: 0.16rem;
      .medicat_styl {
        padding: 0.15rem 3%;
        border-bottom: 1px solid #e5e5e5;
        span {
          display: block;
          width: 28%;
          font-size: 0.145rem;
        }

        .medicat_eatbf {
          width: 70%;
          font-size: 0.14rem;
          overflow: hidden;

          p {
            width: 33.33%;
            float: left;
            overflow: hidden;

            i {
              font-style: normal;
              display: inline-block;
            }
            span.show_input{
              input{
                border-bottom: 1px solid #ddd;border-width:0 0 1px 0;margin-left: 0.04rem; margin-bottom: 0.1rem; padding-left: 0.05rem; padding-bottom: 0.02rem
              }
            }
            label {
              width: 0.14rem;
              height: 0.14rem;
              display: inline-block;
              border: 1px solid #999;
              border-radius: 50%;
              position: relative;
              margin-top: 0.02rem;
              margin-left: 0.04rem;

              u {
                width: 0.08rem;
                height: 0.08rem;
                border-radius:50%;
                position: absolute;
                top: 0.03rem;
                left: 0.03rem;
              }
            }

            &.active {
              label{
                border:1px solid #0bb8bc;
              }
              u {
                background: #0AC5C9;
              }
            }
          }
        }
      }
    }

    .medicat_text {
      width: 70%;
      padding: 0.1rem 4%;
      background: #fff;
      font-size: 0.14rem;
      color: #666;
      height: 0.5rem;
      resize: none;
      border: none;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .footer_btn {

      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #fff;
      color: #FFFFFF;

      .theme-button {
        width: 100%;
        height: 48px;
        line-height: 48px;
        display: block;
        background: #0AC5C9;
        margin: 0;
        text-align: center;
        font-size: 0.16rem;
      }
    }

  }

  /*上传图片区域*/
  .uploadArea {
    padding: 0 0.12rem;

    .photo_add {
      width: 98%;
      margin: 0px auto;
      border: 2px dashed #dddddd;
      border-radius: 0.065rem;
      text-align: center;
      padding: 0.2rem 0 0.15rem 0;

      img.add {
        display: block;
        margin: 0px auto;
        width: 30px;
        height: 22px;
      }

      span {
        display: inline-block;
        font-size: 0.145rem;
        margin-top: 0.1rem;
        line-height: 1.5;
        color: #787878;

        em {
          font-style: normal;
          font-size: 0.1275rem;
          color: #aaaaaa;
          display: block;
        }
      }
    }

    .photoList {
      width: 100px;
      height: 100px;
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 10px;
      vertical-align: top;
      position: relative;

      img {

        border-radius: 8px;
      }
    }

    .mask {
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .2);

      .close {
        position: absolute;
        display: inline-block;
        right: -5px;
        top: -5px;
        color: #FFFFFF;
        font-size: 16px;
        background: url(../../../assets/images/delIcon.png) #FFFFFF no-repeat left center;
        background-size: 100%;
        width: 0.18rem;
        height: 0.18rem;
        border-radius: 50%;
      }
    }
  }

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
  .medicat_blfy{
    .medicat_eatbf{
      position: relative;
      p{
        width: auto!important;
        .show_input{
          input{
            margin: 0.1rem auto 0 auto!important;
            color: #666666!important;
          }
        }
      }
    p:last-child{
      position: absolute;
      left: 33%;
    }
  }

  }
  .d-flex {
    display: flex !important;

    .flex-grow-1 {
      -ms-flex-positive: 1 !important;
      flex-grow: 1 !important;
    }
  }

  input::-webkit-input-placeholder {
    color: #999999;
    font-size: 0.145rem;
  }
  * {
    font-size: 0.145rem;
  }

</style>
