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
            <img src="@/assets/images/mclGW.jpg" alt class="touxiang" />
            <p class="DName font14">MCL专家团</p>
          </div>
          <div class="item">
            <img src="@/assets/images/mclZJ.jpg" alt class="touxiang" />
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
        <p class="title">服务内容</p>
        <ul>
          <li>服务期限1年</li>
          <li>每日记录提醒：【饮食】、【体重】、【用药】、【心情】</li>
          <li>免费在线咨询</li>
          <li>病历管理<em>（防止病历丢失）</em></li>
          <li>档案留档<em>（方便院内院外医生随时查看病历报告。形成检查指标曲线图，实时了解身体情况，预防并发症）</em></li>
          <li>复诊预约管理</li>
          <li>营养风险筛查评估<em>（无限次）</em></li>
          <li>营养风险筛查报告<em>（专家解读）</em></li>
          <li>并发症预警，提供并发症解决方案</li>
          <li>制定个性化处方：【饮食处方】、【营养处方】、【运动处方】、【心理处方】</li>
          <li>专属医助对处方执行进行一对一服务<em>（实时指导、实时监督、实时纠偏）</em></li>
          <li>线上肿瘤患者康复专题课程<em>（部分免费）</em></li>
          <li>全国顶尖肿瘤专家线上科普教育<em>（每周1堂免费课程）</em></li>
          <li>享受套餐优惠价格</li>
          <li>优先参与平台活动</li>
        </ul>
      </div>

      <div class="fuwuPanel margin10 font15">
        <p class="title">温馨提示</p>
        <ul>
          <li>该服务，仅限专属服务对象使用</li>
          <li>购买年卡开通费用不包含到管理套餐、营养补充剂等费用</li>
          <li>该会员卡一经购买，概不支持退款</li>
        </ul>
      </div>
    </div>

    <div class="fix_bottom fix_bottom_area">
      <mt-button
        type="primary"
        class="theme-button button-radio"
        size="large"
        @click="pay"
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
    // okpay () {
    //   this.$MessageBox.prompt('支付密码').then(({ value, action }) => {
    //     if (value == '') {
    //       this.$Toast('请输入支付密码')
    //       return
    //     };
    //     let url = 'UserInterface/UserPassword2Check.ashx'
    //     let param = {
    //       'password2': value
    //     }
    //     this.$post(url, param).then((data) => {
    //       if (data.rspcode != 1) {
    //         this.$Toast(data.rspdesc)
    //         return
    //       }
    //       this.pay()
    //     })
    //   }, function () {})
    //   setTimeout(() => {
    //     let $text = document.querySelector('.mint-msgbox-wrapper .mint-msgbox-input .mint-msgbox-errormsg')
    //     $text.style.visibility = 'visible'
    //     $text.innerHTML = `<p style="color: #F78335; margin-top: 10px;">温馨提示：如没有支付密码，请前往<a id='twopass' style="text-decoration: underline; color: rgb(64, 116, 255);">个人中心</a>设置！</p>`
    //     document.querySelector('#twopass').onclick = () => {
    //       document.querySelector('.mint-msgbox-cancel').click()
    //       this.$router.push('/twopass')
    //     }
    //   }, 0)
    // },
    pay () {
      let url = 'UserInterface/IPayment/CZWPaymentRequest_vshop.ashx'
      let item = this.qixianL[this.qixianActive]
      let param = {
        'RechargeAmount': Number(item.Price),
        'OpenID': localStorage.openId,
        'PaymentType': 5, // 【1：营养筛查；2：管理套餐；3：商品订单；4：活动订单；5：会员年卡】
        'serviceKey': item.skey
      }
      this.$Indicator.loading()
      // 微信支付
      this.$pay.wechatPayment(url, param, (data) => {
        this.$Indicator.close()
        this.$Toast(data.rspdesc)
        let redirect = this.$route.query.redirect
        if (redirect) {
          this.$router.push(`/${redirect}`)
        } else {
          this.$router.push('/vipOrder')
        }
      }, (data) => {
        this.$Indicator.close()
        this.$Toast(data.rspdesc)
      })
    }
    // pay () {
    //   let url = 'UserInterface/IPayment/MemberPaymentRequest.ashx'
    //   let param = {
    //     serviceKey: this.skey
    //   }
    //   this.$post(url, param).then(data => {
    //     this.$Toast(data.rspdesc)
    //     if (data.rspcode != 1) {
    //       return
    //     }
    //     let redirect = this.$route.query.redirect
    //     if (redirect) {
    //       this.$router.push(`/${redirect}`)
    //     } else {
    //       this.$router.push('/vipOrder')
    //     }
    //   })
    // }
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
    border-bottom: 1px solid #dddddd;
    margin-bottom: 0.1rem;
    font-size: 0.16rem;
  }

  ul {
    /*line-height: 1.8;*/
  }

  ul li {
    position: relative;
    /*padding-left: 0.15rem;*/
    line-height: 1.5;
    padding: 0.05rem 0.1rem 0.05rem 0.15rem;
    em{
      font-style: normal;
      color: #666666;
      font-size: 0.145rem;
     };
  }

  ul li:before {
    content: "";
    display: inline-block;
    width: 0.07rem;
    height: 0.07rem;
    background: #f78335;
    border-radius: 50%;
    position: absolute;
    top: 0.1rem;
    left: 0;
  }
}
</style>
