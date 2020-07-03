<template>
  <div class="yeardCard-root">
    <mt-header title="购买会员卡" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div id="body_main">
      <!--卡片-->
      <div class="card">
        <div class="card_top">
          <div class="item">
            <img :src="DoctorImg" alt class="touxiang" />
            <p class="DName font14">{{Position}}</p>
          </div>
          <div class="item">
            <img :src="doctorDefaultPic" alt class="touxiang" />
            <p class="DName font14">MCL专家团</p>
          </div>
          <div class="item">
            <img :src="doctorDefaultPic" alt class="touxiang" />
            <p class="DName font14">MCL专属顾问</p>
          </div>
        </div>
      </div>

      <div class="my-cell font15 margin10">
        <div class>专属服务对象</div>
        <div class="yellow">{{ServicePatient}}</div>
      </div>

      <div class="qixian margin10">
        <p class="title">服务期限</p>
        <ul class="content">
          <li
            v-for="(item,index) in qixianL"
            :class="{active: qixianActive == index}"
            @click="clickQx(index,item)"
          >
            <p class="yellow font15">{{item.Month}}</p>
            <p class="hui font13">{{item.Price}}</p>
            <div class="yuan"></div>
          </li>
        </ul>
      </div>

      <div class="fuwuPanel margin10 font15">
        <p class="title yellow text-center">服务内容</p>
        <ul>
          <li>免费在线咨询医生</li>
          <li>在线咨询不限次数追问、优先回复患者</li>
          <li>每月2次免费预约咨询</li>
          <li>根据病情入院挂号就诊上给予指导和帮助</li>
        </ul>
      </div>

      <div class="fuwuPanel margin10 font15">
        <p class="title yellow text-center">重要通知</p>
        <ul>
          <li>该服务，仅限专属服务对象使用</li>
          <li>购买年卡开通费用不包含到医院挂号、就诊、检查、药品等费用</li>
        </ul>
      </div>
    </div>

    <div class="fix_bottom fix_bottom_area">
      <mt-button
        type="primary"
        class="theme-button button-radio"
        size="large"
        @click="okpay"
      >确认支付 ¥{{moneys}}</mt-button>
    </div>
  </div>
</template>

<script>
import doctorDefaultPic from '@/assets/images/doctorPic.png'
export default {
  name: 'yeardCard',
  data: () => ({
    qixianActive: 0,
    DoctorImg: '', // 医生图片
    doctorDefaultPic, // 医生默认图片
    DoctorName: '', // 医生名称
    Position: '', // 职位
    Department: '', // 科室
    HospitalName: '', // 医院名称
    ServicePatient: '', // 专属服务对象
    BeGoodAt: '', // 擅长
    qixianL: [],
    skey: '', // 会员主键
    moneys: '',
    dynamicKey: ''
  }),
  methods: {
    // 服务期限的点击
    clickQx (index, items) {
      this.qixianActive = index
      this.skey = items.skey
      this.moneys = items.Price
    },
    // 其他页面进来的
    othermy () {
      for (var i = 0; i < this.qixianL.length; i++) {
        if (this.dynamicKey == this.qixianL[i].skey) {
          this.qixianActive = i
          this.moneys = this.qixianL[i].Price
        }
      }
    },
    // 获取信息
    getupshop () {
      let url = 'UserInterface/PurchaseYearCard.ashx'
      this.$post(url).then(data => {
        if (data.rspcode != 1) {
          return
        }
        this.DoctorImg = data.DoctorImg
        this.DoctorName = data.DoctorName
        this.Position = data.Position
        this.Department = data.Department
        this.HospitalName = data.HospitalName
        this.ServicePatient = data.ServicePatient
        this.BeGoodAt = data.BeGoodAt
      })
    },
    // 获取服务期限
    getmoney () {
      let url = 'UserInterface/ServiceTermInfo.ashx'
      this.$post(url).then(data => {
        if (data.rspcode != 1) {
          return
        }
        this.qixianL = data.data
        this.moneys = data.data[0].Price
        this.skey = data.data[0].skey
        this.othermy()
      })
    },
    // 确认支付
    okpay () {
      this.$MessageBox.prompt('支付密码').then(({ value, action }) => {
        if (value == '') {
          this.$Toast('请输入支付密码')
          return
        };
        let url = 'UserInterface/UserPassword2Check.ashx'
        let param = {
          'password2': value
        }
        this.$post(url, param).then((data) => {
          if (data.rspcode != 1) {
            this.$Toast(data.rspdesc)
            return
          }
          this.pay()
        })
      }, function () {})
      setTimeout(() => {
        let $text = document.querySelector('.mint-msgbox-wrapper .mint-msgbox-input .mint-msgbox-errormsg')
        $text.style.visibility = 'visible'
        $text.innerHTML = `<p style="color: #F78335; margin-top: 10px;">温馨提示：如没有支付密码，请前往<a id='twopass' style="text-decoration: underline; color: rgb(64, 116, 255);">个人中心</a>设置！</p>`
        document.querySelector('#twopass').onclick = () => {
          document.querySelector('.mint-msgbox-cancel').click()
          this.$router.push('/twopass')
        }
      }, 0)
    },
    pay () {
      let url = 'UserInterface/IPayment/MemberPaymentRequest.ashx'
      let param = {
        serviceKey: this.skey
      }
      this.$post(url, param).then(data => {
        this.$Toast(data.rspdesc)
        if (data.rspcode != 1) {
          return
        }
        let redirect = this.$route.query.redirect
        if (redirect) {
          this.$router.push(`/${redirect}`)
        } else {
          this.$router.push('/vipOrder')
        }
      })
    }
  },
  mounted () {
    this.dynamicKey = this.$route.query.skedf
    this.getupshop()
    this.getmoney()
  }
}
</script>

<style scoped lang="scss">
/*卡片*/
.card {
  background: #fff;
  border-radius: 6px;
  margin: 0.1rem;
}

.card_top {
  padding: 0.2rem 0.17rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .item {
    text-align: center;
  }
  .touxiang {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 0.3rem;
  }

  .content {
    flex: 1;
    padding-left: 0.11rem;
  }

  .nameInfo .msg {
    width: 0.21rem;
    height: 0.21rem;
    vertical-align: middle;
    float: right;
  }

  .nameInfo,
  .adr {
    margin-bottom: 0.07rem;
  }

  .nameInfo span {
    vertical-align: middle;
  }

  .nameInfo .label {
    border: 1px solid #f78335;
    border-radius: 2px;
    color: #f78335;
    padding: 0.01rem 0.08rem;
    margin-left: 0.15rem;
  }
}

.card_bottom {
  background: rgba(255, 255, 255, 0.1);
  margin-top: 0.2rem;
  padding: 0.08rem 0.1rem;
  line-height: 1.5;
}

.my-cell {
  line-height: 0.44rem;
  padding: 0 0.15rem;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
}

/*服务期限*/
.qixian {
  background: #ffffff;
  padding-bottom: 0.1rem;

  .title {
    line-height: 0.44rem;
    padding: 0 0.15rem;
  }

  .content {
    display: flex;
    justify-content: space-between;
    padding: 0 0.15rem;
    text-align: center;
  }

  li {
    width: 23.5%;
    height: 0.8rem;
    padding: 0.25rem 0;
    box-sizing: border-box;
    border-radius: 6px;
    border: 1px solid rgba(247, 131, 53, 1);
    position: relative;

    .yuan {
      width: 0.15rem;
      height: 0.15rem;
      border: 1px solid rgba(247, 131, 53, 1);
      border-radius: 50%;
      position: absolute;
      top: 5px;
      right: 5px;
    }

    &.active {
      background: linear-gradient(
        142deg,
        rgba(254, 241, 221, 1) 0%,
        rgba(254, 206, 140, 1) 100%
      );
    }

    &.active .yuan {
      background: url("../../../assets/images/click_select@2x.png");
      background-size: cover;
    }

    .hui {
      margin-top: 0.05rem;
      color: #717479;
    }
  }
}

/*服务面板*/
.fuwuPanel {
  background: #ffffff;
  padding: 0 0.15rem;
  padding-bottom: 0.1rem;

  .title {
    line-height: 0.44rem;
  }

  ul {
    line-height: 1.5;
  }

  ul li {
    position: relative;
    padding-left: 0.15rem;
  }

  ul li:before {
    content: "";
    display: inline-block;
    width: 0.07rem;
    height: 0.07rem;
    background: #f78335;
    border-radius: 50%;
    position: absolute;
    top: 0.06rem;
    left: 0;
  }
}
</style>
