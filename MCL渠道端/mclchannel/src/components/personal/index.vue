<template>
  <div>
    <mt-header fixed title="我的"></mt-header>
    <div class="content">
      <router-link to="/personaldata" style="overflow: hidden; display: block">
        <div class="person_info">
          <img
            :src="repData.ImgUrl"
            style="width: 0.64rem; height: 0.64rem; border-radius: 0.32rem"
          />
          <div class="info">
            <p class="name">{{ repData.Nickname }}</p>
            <p class="tel">{{ repData.Account }}</p>
          </div>
          <div class="person_type">
            <span>{{ repData.userType }}</span>
            <i class="mint-cell-allow-right"></i>
          </div>
        </div>
      </router-link>

      <div class="person_menu">
        <h3>常用功能</h3>
        <div class="middle-cell">
          <router-link :to="'/personalgetproduct'">
            <div class="cell">
              <div class="row">
                <img
                  src="@/assets/images/dingda.png"
                  style="width: 0.25rem; height: 0.25rem"
                  alt=""
                />
              </div>
              <p class="row">我的订单</p>
            </div>
          </router-link>
          <!-- <router-link :to="'/myUser'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/wodeyonghu@2x.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">我的用户</p>
						</div>
					</router-link> -->
          <router-link
            :to="`/share?title=邀请好友&UserKey=${UserKey}&SessionId=${SessionId}`"
          >
            <div class="cell">
              <div class="row">
                <img
                  src="@/assets/images/yaoqm.png"
                  style="width: 0.25rem; height: 0.25rem"
                  alt=""
                />
              </div>
              <p class="row">邀请好友</p>
            </div>
          </router-link>
					<!-- 恢复时删除!!!!!!!!!!!!! -->
          <router-link :to="'/custransfer'" v-if="repData.userTypenum == '5'">
            <div class="cell">
              <div class="row">
                <img
                  src="@/assets/images/kahaoguanli@2x.png"
                  style="width: 0.25rem; height: 0.25rem"
                  alt=""
                />
              </div>
              <p class="row">客户转让</p>
            </div>
          </router-link>
          <router-link to="" style="visibility: hidden" v-else>
            <div class="cell">
              <div class="row">
                <img
                  src="@/assets/images/hezbf.png"
                  style="width: 0.25rem; height: 0.25rem"
                  alt=""
                />
              </div>
              <p class="row">默认模块</p>
            </div>
          </router-link>
          <router-link to="" style="visibility: hidden">
            <div class="cell">
              <div class="row">
                <img
                  src="@/assets/images/hezbf.png"
                  style="width: 0.25rem; height: 0.25rem"
                  alt=""
                />
              </div>
              <p class="row">默认模块</p>
            </div>
          </router-link>
					
          <!-- <router-link :to="'/personalreceivingadress'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/address.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">收货地址</p>
						</div>
					</router-link> -->
          <!-- <a href="javascript:;">

						<div class="cell">
							<div class="row">
								<img src="@/assets/images/ylyrenz.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">实名认证</p>
						</div>
					</a> -->
          <!-- @click="isrealname" -->
          <!-- </router-link> -->
        </div>

        <div class="middle-cell">
          <!-- <router-link :to="'/consultation'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/wodeyue@2x.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">我的余额</p>
						</div>
					</router-link> -->

          <!-- <router-link :to="'/bankCard'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/kahaoguanli@2x.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">卡号管理</p>
						</div>
					</router-link> -->

          <!-- <router-link :to="'/capital'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/zijinjilu@2x.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">资金记录</p>
						</div>
					</router-link> -->
          <!-- <router-link :to="'/shopcar'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/fahuoguanli@2x.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">购 &nbsp;物 &nbsp;车</p>
						</div>
					</router-link> -->

          <!-- <router-link :to="'/custransfer'" v-if="repData.userTypenum == '5'">
            <div class="cell">
              <div class="row">
                <img
                  src="@/assets/images/kahaoguanli@2x.png"
                  style="width: 0.25rem; height: 0.25rem"
                  alt=""
                />
              </div>
              <p class="row">客户转让</p>
            </div>
          </router-link>
          <router-link to="" style="visibility: hidden" v-else>
            <div class="cell">
              <div class="row">
                <img
                  src="@/assets/images/hezbf.png"
                  style="width: 0.25rem; height: 0.25rem"
                  alt=""
                />
              </div>
              <p class="row">默认模块</p>
            </div>
          </router-link> -->

          <!-- <router-link :to="'/staticMonth'" v-if="repData.userTypenum=='5'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/zijinjilu@2x.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">绩效统计</p>
						</div>
					</router-link> -->
          <router-link to="" v-if="!docType">
            <div class="cell">
              <div class="row">
                <img
                  src="@/assets/images/yuangongguanli@2x.png"
                  style="width: 0.25rem; height: 0.25rem"
                  alt=""
                />
              </div>
              <p class="row">员工管理</p>
            </div>
          </router-link>
          <router-link to="" style="visibility: hidden" v-else>
            <div class="cell">
              <div class="row">
                <img
                  src="@/assets/images/hezbf.png"
                  style="width: 0.25rem; height: 0.25rem"
                  alt=""
                />
              </div>
              <p class="row">默认模块</p>
            </div>
          </router-link>
          <router-link
            to=""
            style="visibility: hidden"
            v-if="!(repData.userTypenum == '5' || repData.userTypenum == '8')"
          >
            <div class="cell">
              <div class="row">
                <img
                  src="@/assets/images/hezbf.png"
                  style="width: 0.25rem; height: 0.25rem"
                  alt=""
                />
              </div>
              <p class="row">默认模块</p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="person_shouyi">
        <h3>资产管理</h3>
        <div class="person_yej person_zic">
          <!-- <router-link :to="'/personal_commission'">
						<div class="person_gxz person_ye">
							<img src="@/assets/images/w_gongxian_wd@2x.png" />
							<p>我的收益</p>
							<span>{{managementData.commission}}</span>
						</div>
					</router-link> -->
          <router-link to="/personal_achievement">
            <div class="person_gxz person_ye person_yj">
              <img src="@/assets/images/wodeyeji@2x.png" />
              <p>我的业绩</p>
              <span>{{ managementData.achievement }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!--<div class="linkef" v-show="ewmshow">
			<div class="linkefnr">
				<img src="https://resource.jtsc.club/bianji_car_quxiao@2x.png" class="closewm" @click="closewms" />
				<h2>
        <img src="@/assets/images/kefloho.png" />
        <label>万象商纬</label>
      </h2>
				<img src="@/assets/images/wxewm.jpg" class="imgewm" />
				<span>扫描二维码，加客服微信</span>
				<span>微信号：sg50675772</span>
				<p>电话客服：400电话开通中</p>
			</div>
		</div>-->
  </div>
</template>

<script>
export default {
  name: "personal",
  data: () => ({
    UserKey: "",
    SessionId: "",
    docType: true,
    repData: {
      ImgUrl: "", // 头像地址
      ContactName: "", // 姓名
      ContactPhone: "", // 手机号
      UserType: "", // 用户会员类型    1.图片会员   2.vip会员   3.合伙人
    },
    // 资产管理
    managementData: {
      commission: "", // 佣金
      achievement: "", // 业绩
    },
  }),
  methods: {
    // 个人信息
    information() {
      this.$Indicator.loading();
      let url = "UserInterface/GetUserShowInfo.ashx";
      this.$post(url).then((data) => {
        this.$Indicator.close();
        let model = data.data;
        if (localStorage.userInfo) {
          const userInfo = JSON.parse(localStorage.userInfo);
          model.userType = this.$root.getUserType(userInfo.userType);
          if (userInfo.userType == "5" && model.ContactPhone == "15523523851") {
            model.userType = "总渠道商";
          }
          model.userTypenum = userInfo.userType;
        }
        this.repData = model;
      });
    },
    //			//我的客服
    //			linkf() {
    //				this.ewmshow = true;
    //			},
    //			closewms() {
    //				this.ewmshow = false;
    //			},
    //			//是否实名认证
    //			isrealname() {
    //				this.$router.push('/realName');
    //				return;
    //				let url = "UserInterface/RealNameAuthenticationCheck.ashx";
    //				this.$post(url).then((data) => {
    //					if(data.rspCode == 0) {
    //						this.$Toast(data.rspDesc);
    //						return;
    //					} else if(data.rspCode == 2) {
    //						this.$Toast(data.rspDesc);
    //						this.$router.push('/realName');
    //					} else {
    //						this.$router.push('/realName');
    //					}
    //				})
    //			},
    //			//商家是否认证
    //			merchant() {
    //				let url = "UserInterface/BusinessUnion/BusinessAuthenticationCheck.ashx";
    //				let param = {
    //					flag: 1
    //				};
    //				this.$post(url, param).then((data) => {
    //					if(data.rspCode == 0) {
    //						this.$Toast(data.rspDesc);
    //						return;
    //					}
    //					if(data.checkFlag == 0) {
    //						this.$router.push('/merchantCert');
    //					} else if(data.checkFlag == 1) {
    //						this.$router.push('/merchantsubmit');
    //					} else if(data.checkFlag == 2) {
    //						this.$Toast('您已完成商家认证');
    //					}
    //				})
    //			},
    //			//商家是否认证
    //			comanage(numb) {
    //				let url = "UserInterface/BusinessUnion/BusinessAuthenticationCheck.ashx";
    //				let param = {
    //					flag: numb
    //				};
    //				this.$post(url, param).then((data) => {
    //					if(data.rspCode == 0) {
    //						this.$Toast(data.rspDesc);
    //						return;
    //					}
    //					if(data.checkFlag == 0) {
    //						this.$Toast('请先认证商家');
    //					} else if(data.checkFlag == 1) {
    //						this.$Toast('您的商家还处于审核状态，请您耐心等待');
    //					} else if(data.checkFlag == 2) {
    //						if(numb == 1) {
    //							this.$router.push('/comManage');
    //						} else {
    //							this.$Toast('请先编辑商家信息');
    //						}
    //					} else if(data.checkFlag == 3) {
    //						this.$router.push('/commodity');
    //					}
    //				})
    //			},

    // 资产管理
    getManagement() {
      let url = "UserInterface/channel/AssetManagement.ashx";
      this.$post(url).then((data) => {
        const { commission, achievement } = data;
        this.managementData = {
          commission, // 佣金
          achievement, // 业绩
        };
      });
    },
  },
  created() {
    if (localStorage.userInfo) {
      this.UserKey = JSON.parse(localStorage.userInfo).UserKey;
      this.SessionId = JSON.parse(localStorage.userInfo).SessionId;
    }
  },
  mounted() {
    this.getManagement();
    this.information();
  },
};
</script>
<style>
</style>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
//头像部分
.person_info {
  padding: 0.14rem 0.1rem;
  background: #ffffff;
  display: flex;
  position: relative;
  margin-bottom: 0.05rem;
  img {
    margin-right: 0.1rem;
  }
  .info {
    flex: 1;
    height: 64px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    & > p {
      width: 100%;
      font-size: 0.18rem;
      color: $color40;
    }
    & > p.name {
      @include ellipsis(1);
    }
  }
  .person_type {
    line-height: 64px;
    padding-right: 28px;
    color: $color40;
  }
  .person_type span {
    height: 0.28rem;
    border-radius: 0.14rem;
    line-height: 0.28rem;
    color: #fff;
    width: 0.8rem;
    display: inline-block;
    font-size: 0.13rem;
    text-align: center;
    background-image: linear-gradient(to right, #f39645, #f46f42);
  }
}

.content {
  padding-top: 43px;
  padding-bottom: 56px;
}
/*常用功能*/

.person_menu {
  background: #fff;
  padding-bottom: 0.06rem;
  h3 {
    font-size: 0.15rem;
    font-weight: normal;
    padding: 0.08rem 0 0.08rem 3%;
  }
}

//中间余额部分
.middle-cell {
  background: #fff;
  display: flex;
  justify-content: space-around;
  height: 72px;
  width: 94%;
  margin: 0 auto;
  margin-top: 0.08rem;
  .cell {
    height: 100%;
    flex: 1;
    background: #ffffff;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    font-size: 0.16rem;
    color: $color40;
    &:nth-child(2) {
      margin: 0 0.05rem;
    }
    .row {
      width: 100%;
      img {
        vertical-align: middle;
      }
      p {
        display: inline-block;
        vertical-align: middle;
      }
    }
    .row:last-child {
      margin-top: 0.08rem;
      font-size: 0.13rem;
    }
  }
}

.resetlogin {
  padding: 0 0.1rem;
  background: #ff1e41;
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 0.15rem;
  color: #fff;
  margin-top: 0.2rem;
  border-radius: 4px;
  margin-bottom: 10px;
}

#mark {
  z-index: 9999999;
  .close {
    position: absolute;
    top: 10%;
    right: 10%;
  }
  .code_wrap {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .code_inner {
    width: 80%;
    box-sizing: border-box;
    background: #fff;
    padding: 20px;
  }
}

.person_shouyi {
  background: #fff;
  width: 100%;
  margin-top: 0.06rem;
  h3 {
    font-size: 0.15rem;
    font-weight: 200;
    color: #333;
    padding: 0.08rem 0 0.08rem 3%;
  }
  .person_yej {
    overflow: hidden;
    padding-bottom: 0.1rem;
    height: 0.86rem;
    .person_ye {
      background: #ffe6e6;
      width: 44%;
      height: 100%;
      border-radius: 6px;
      margin-left: 4%;
      float: left;
      position: relative;
      img {
        width: 0.26rem;
        position: absolute;
        left: 50%;
        top: 0.1rem;
        margin-left: -0.13rem;
      }
      p {
        text-align: center;
        margin-top: 0.42rem;
        color: #333;
        color: #ff3d3d;
        font-size: 0.12rem;
      }
      span {
        display: block;
        text-align: center;
        margin-top: 0.04rem;
        color: #333;
        font-size: 0.15rem;
      }
    }
    .person_yj {
      background: #fff5e8;
      p {
        color: #ff9000;
      }
    }
  }
}

.linkef {
  width: 100%;
  height: 100vh;
  background: rgba(000, 000, 000, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  .linkefnr {
    width: 70%;
    padding: 0 6%;
    height: 4.06rem;
    background: #fff;
    position: absolute;
    left: 50%;
    margin-left: -41%;
    top: 50%;
    margin-top: -2.03rem;
    border-radius: 6px;
    .closewm {
      width: 0.2rem;
      height: 0.2rem;
      position: absolute;
      right: 3.5%;
      top: 0.1rem;
    }
    h2 {
      font-weight: normal;
      padding: 0;
      padding-top: 0.2rem;
      overflow: hidden;
      img {
        width: 0.3rem;
        height: 0.3rem;
        display: block;
        float: left;
      }
      label {
        font-size: 0.14rem;
        float: left;
        line-height: 0.3rem;
        margin-left: 0.1rem;
      }
    }
    .imgewm {
      width: 2.6rem;
      height: 2.6rem;
      display: block;
      margin: 0 auto;
    }
    span {
      font-size: 0.14rem;
      color: #666;
      display: block;
      width: 100%;
      text-align: center;
      margin-bottom: 0.03rem;
    }
    p {
      display: block;
      font-size: 0.2rem;
      color: red;
      padding: 0 3%;
      text-align: center;
      margin-top: 0.1rem;
    }
  }
}
</style>
