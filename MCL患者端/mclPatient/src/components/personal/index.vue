<template>
	<div>
		<mt-header fixed title="我的"></mt-header>
		<div class="content">
      <div class="person_top">
        <div class="d-flex flex-row-reverse">
<!--          <router-link :to="'/wx_Entrance/mesage'">-->
<!--            <div class="per_tp_icon">-->
<!--              <em></em>-->
<!--              <img src="@/assets/images/icons/icon-news.png"  alt="">-->
<!--            </div>-->
<!--          </router-link>-->
          <router-link :to="'/personaldata'">
            <div class="per_tp_icon">
              <img src="@/assets/images/icons/icon-set.png"  alt="">
            </div>
          </router-link>
        </div>
			<router-link to="/personaldata" style="overflow: hidden;display: block;">
				<div class="person_info">
          <div class="per_pho">
            <img v-lazy="repData.ImgUrl">
          </div>
					<div class="info">
						<p class="name">
              <span>{{repData.Nickname}}</span>
              <em v-if="repData.IsMember==1" class="info_member"></em>
              <em v-else class="info_member info_member_no"></em>  </p>
						<p class="tel">{{repData.Account}}</p>
					</div>
				</div>
			</router-link>
        <div class="per_member d-flex align-items-center justify-content-around">
            <div class="per_mbr_img"><img src="@/assets/images/personal/per-member@3x.png"  alt=""></div>
            <div class="per_mbr_txt"><span>每天1元钱，专家陪伴您全年！</span></div>
            <div class="per_mbr_lik">	<router-link to="/vipOrder">查看详情</router-link></div>
          </div>
    </div>
      <div class="person_box"></div>
			<div class="person_menu">
				<h3>我的订单</h3>
				<div class="middle-cell">

					<router-link :to="'/personalnutrition'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/icons/icon-scpg.png"  alt="">
							</div>
							<p class="row">筛查评估</p>
						</div>
					</router-link>

					<router-link :to="'/managePackage'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/icons/icon-gltc.png"  alt="">
							</div>
							<p class="row">管理套餐</p>
						</div>
					</router-link>

					<router-link :to="'/personalgetproduct'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/icons/icon-spdd.png"  alt="">
							</div>
							<p class="row">商品订单</p>
						</div>
					</router-link>

					<router-link :to="'/activityOrder'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/icons/icon-hddd.png"  alt="">
							</div>
							<p class="row">活动订单</p>
						</div>
					</router-link>

<!--					<router-link to="/vipOrder">-->
<!--						<div class="cell">-->
<!--							<div class="row">-->
<!--								<img src="@/assets/images/niankadingdan.png"  alt="">-->
<!--							</div>-->
<!--							<p class="row">会员年卡</p>-->
<!--						</div>-->
<!--					</router-link>-->
				</div>
			</div>

			<div class="person_menu">
				<h3>健康服务</h3>
				<div class="middle-cell">

					<router-link :to="'/healthydan'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/icons/icon-jkdd.png"  alt="">
							</div>
							<p class="row">健康档案</p>
						</div>
					</router-link>
					<router-link to="/eyeconme">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/icons/icon-pgbg.png"  alt="">
							</div>
							<p class="row">评估报告</p>
						</div>
					</router-link>
					<router-link :to="'/impactAsses'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/icons/icon-xgpj.png"  alt="">
							</div>
							<p class="row">效果评价</p>
						</div>
					</router-link>

					<router-link :to="'/review'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/icons/icon-fzyy.png"  alt="">
							</div>
							<p class="row">复诊预约</p>
						</div>
					</router-link>
				</div>

				<!-- <div class="middle-cell">
					<router-link to="/nowmoney">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/yueb.png"  alt="">
							</div>
							<p class="row">我的余额</p>
						</div>
					</router-link>
				</div> -->
			</div>

      <div class="person_menu">
        <h3>常用工具</h3>
        <div class="middle-cell">
          <router-link :to="'/account'">
            <div class="cell">
              <div class="row">
                <img src="@/assets/images/icons/icon-qszh.png" alt="">
              </div>
              <p class="row">亲属账号</p>
            </div>
          </router-link>
          <router-link :to="`/inviteFriends?UserKey=${UserKey}&SessionId=${SessionId}`">
            <div class="cell">
              <div class="row">
                <img src="@/assets/images/icons/icon-yqhy.png"  alt="">
              </div>
              <p class="row">邀请好友</p>
            </div>
          </router-link>
          <router-link to="/goodFriend">
            <div class="cell">
              <div class="row">
                <img src="@/assets/images/icons/icon-wdhy.png"  alt="">
              </div>
              <p class="row">我的好友</p>
            </div>
          </router-link>
          <router-link :to="'/points'">
            <div class="cell">
              <div class="row">
                <img src="@/assets/images/icons/icon-wdfl.png"  alt="">
              </div>
              <p class="row">我的福利</p>
            </div>
          </router-link>
        </div>
          <div class="middle-cell">
          <router-link :to="'/homeSignin'">
            <div class="cell">
              <div class="row">
                <img src="@/assets/images/icons/icon-mrqd.png"  alt="">
              </div>
              <p class="row">每日签到</p>
            </div>
          </router-link>
          <!-- <router-link :to="'/personalreceivingadress'">
            <div class="cell">
              <div class="row">
                <img src="@/assets/images/wodedizhi.png"  alt="">
              </div>
              <p class="row">我的地址</p>
            </div>
          </router-link> -->
            <router-link :to="'/shopcar'">
              <div class="cell">
                <div class="row">
                  <img src="@/assets/images/icons/icon-gwc.png"  alt="">
                </div>
                <p class="row">购 物 车</p>
              </div>
            </router-link>
            <router-link :to="'/wx_Entrance/mesage'">
              <div class="cell">
                <div class="row">
                  <img src="@/assets/images/icons/icon-lxwm.png"  alt="">
                </div>
                <p class="row">联系我们</p>
              </div>
            </router-link>

<!--            <router-link :to="'/searchIllness'">-->
<!--              <div class="cell">-->
<!--                <div class="row">-->
<!--                  <img src="@/assets/images/icons/icon-bzzx.png"  alt="">-->
<!--                </div>-->
<!--                <p class="row">帮助中心</p>-->
<!--              </div>-->
<!--            </router-link>-->

        </div>
      </div>
		</div>
		<div class="linkef" v-show="ewmshow">
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
				<!-- <p style="margin-top: 0.02rem;">客服热线2：18218494793</p> -->
			</div>
		</div>
	</div>
</template>

<script>
	// import shopMallCode from "@/assets/images/kefu.jpg";  //商城二维码的图片
	// import closeImg from "@/assets/images/closeIcon.png";  //商城二维码的关闭按钮图片
	// import userImg from "@/assets/images/morentouxiang.jpg";  //用户头像
	export default {
		name: "personal",
		data: () => ({
			shopMallCode: "https://resource.jtsc.club/kefu.jpg",
			closeImg: "https://resource.jtsc.club/closeIcon.png",
			UserKey: '',
			SessionId: '',
			isShow: false,
			repData: {
				ImgUrl: "", //头像地址
				ContactName: "", //姓名
				ContactPhone: "", //手机号
				UserType: "", //用户会员类型    1.图片会员   2.vip会员   3.合伙人
				UserTypeShow: "", //用户会员类型
				Commission: "", //贡献值
				Achievement: "", //业绩
				Balance: "", //余额
				Quota: "", //配额
				TotalPayVGScore: "", //金豆
				VGScore: "", //积分
				TeamNumber: "" //团队人数
			},
			ewmshow: false
		}),
		methods: {
			// 是否显示事业版
			showsy() {
				if (this.isShow) {
					this.isShow = false;
				} else {
					this.isShow = true;
				}
			},
			//个人信息
			information() {
				this.$Indicator.loading();
				let url = "UserInterface/GetUserShowInfo.ashx";
				this.$post(url).then((data) => {
					this.$Indicator.close();
					let model = data.data;
					if (model) {
						this.repData = model;
					}
				})
			},
			//我的客服
			linkf() {
				this.ewmshow = true;
			},
			closewms() {
				this.ewmshow = false;
			},
			//是否实名认证
			isrealname() {
				let url = "UserInterface/RealNameAuthenticationCheck.ashx";
				this.$post(url).then((data) => {
					if (data.rspCode == 0) {
						this.$Toast(data.rspDesc);
						return;
					} else if (data.rspCode == 2) {
						this.$Toast(data.rspDesc);
						this.$router.push('/realName');
					} else {
						this.$router.push('/realName');
					}
				})
			},
			//商家是否认证
			merchant() {
				let url = "UserInterface/BusinessUnion/BusinessAuthenticationCheck.ashx";
				let param = {
					flag: 1
				};
				this.$post(url, param).then((data) => {
					if (data.rspCode == 0) {
						this.$Toast(data.rspDesc);
						return;
					}
					if (data.checkFlag == 0) {
						this.$router.push('/merchantCert');
					} else if (data.checkFlag == 1) {
						this.$router.push('/merchantsubmit');
					} else if (data.checkFlag == 2) {
						this.$Toast('您已完成商家认证');
					}
				})
			},
			//商家是否认证
			comanage(numb) {
				let url = "UserInterface/BusinessUnion/BusinessAuthenticationCheck.ashx";
				let param = {
					flag: numb
				};
				this.$post(url, param).then((data) => {
					if (data.rspCode == 0) {
						this.$Toast(data.rspDesc);
						return;
					}
					if (data.checkFlag == 0) {
						this.$Toast('请先认证商家');
					} else if (data.checkFlag == 1) {
						this.$Toast('您的商家还处于审核状态，请您耐心等待');
					} else if (data.checkFlag == 2) {
						if (numb == 1) {
							this.$router.push('/comManage');
						} else {
							this.$Toast('请先编辑商家信息');
						}
					} else if (data.checkFlag == 3) {
						this.$router.push('/commodity');
					}
				})
			}
		},
		created() {
			if (localStorage.userInfo) {
				this.UserKey = JSON.parse(localStorage.userInfo).UserKey;
				this.SessionId = JSON.parse(localStorage.userInfo).SessionId;
			}
			this.information();
		}
	}
</script>
<style>
  body {
    background-color: #f1f1f1;
    font-size: 0.16rem;
  }
</style>
<style scoped lang="scss">
	@import "@/assets/css/base.scss";
  .mint-header {
    height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
  }

  .content {
    padding-top: 0.44rem;
    padding-bottom: 56px;
  }
  /*页面头部*/
  .person_top{
    background: url(./../../assets/images/personal/per-bg.jpg) no-repeat top center;
    background-size:100% 100%;
    padding: 0.175rem 0.10rem 0 0.10rem;
    .per_tp_icon{
      width: 0.225rem;
      height: 0.225rem;
      margin-right: 0.1rem;
      position: relative;
      em{
        display: inline-block;
        width: 0.06rem;
        height: 0.06rem;
        border-radius:50% ;
        background-color: #ff3d3d;
        position: absolute;
        right: 0.01rem;
        top: 0.01rem;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    //头像部分
    .person_info {
      /*background: linear-gradient(106deg, rgba(237, 165, 93, 1) 0%, rgba(255, 198, 144, 1) 100%);*/

      display: flex;
      position: relative;
      width: 90%;
      margin: 0.025rem auto 0.3rem auto;

     .per_pho {
        margin-right: 0.10rem;
        width: 0.52rem;
       height: 0.52rem;
       border-radius: 50%;
       background-color: #a4dce1;
       border: 2px solid #c1eaeb;
       img{
         width:100%;
         height: 100%;
         border-radius: 50%;
         display: inline-block;
       }
      }

      .info {
        flex: 1;
        height: 0.6rem;
        display: flex;
        flex-wrap: wrap;
        align-content: space-around;
        padding-left: 0.05rem;
        &>p {
          width: 100%;
          font-size: 0.18rem;
          color: #404040;
        }

        &>p.name {
          @include ellipsis(1);
          font-size: 0.185rem;
          letter-spacing: 1px;
          span{
            display: inline-block;
          }
          .info_member{
            height: 0.15rem;
            background: url(./../../assets/images/personal/per-member.png) no-repeat left center;
            background-size:auto 100%;
            min-width:0.75rem;
           display: inline-block;
          }
          .info_member_no{
            background: url(./../../assets/images/personal/per-member@2x.png) no-repeat left center;
            background-size:auto 100%;
          }
        }
        &>p.tel {
          font-size: 0.17rem;
        }
      }

      .person_type {
        line-height: 0.64rem;
        padding-right: 28px;
        color: #FFFFFF;
      }

      .mint-cell-allow-right::after {
        border: solid 2px #ffffff;
        border-bottom-width: 0;
        border-left-width: 0;
      }

      .person_type span {
        padding: 6px 0;
        padding-left: 28px;
        font-size: 0.14rem;
        background: url("https://resource.jtsc.club/putong@2x.png") no-repeat 2px center;
        background-size: 22px;
      }

      .person_type span.vip {
        background-image: url("https://resource.jtsc.club/vip@2x.png");
      }

      .person_type span.hehuoren {
        background-image: url("https://resource.jtsc.club/hehuo@2x.png");
      }
    }

    /*会员*/
    .per_member{
      width: 98%;
      margin: 0 auto;
      background-color: #413b37;
      border-radius: 0.125rem 0.125rem 0 0;
      height: 0.48rem;
      padding: 0 1%;
      .per_mbr_img{
        height: 0.15rem;
        img{
          height: 100%;
          width: auto;
        }
      }
      .per_mbr_txt{
        border-left: 1px solid #5f5b58;
        color: #f8dab9;
        font-size: 0.13rem;
        span{
          padding-left: 0.05rem;
        }
      }
      .per_mbr_lik{
        a{
          font-size: 0.13rem;
          background-color: #f8dab9;
          border-radius: 0.1rem;
          display: inline-block;
          padding: 0.035rem 0.075rem;
          color: #413b37;
        }
      }
    }
    }

  /*会员框背景*/
  .person_box{
    height: 0.05rem;
    background: url(./../../assets/images/personal/per-box-bg.png) no-repeat top center;
    background-size:100% 100%;
    margin: 0 0.1rem 0.125rem 0.1rem;
  }
	/*常用功能*/
	.person_menu {
		background: #fff;
    margin: 0 0.1rem 0.1rem 0.1rem;
    padding-bottom:0.1rem;
    border-radius: 0.125rem;
		h3 {
			font-size: 0.155rem;
      border-bottom: 1px solid #e5e5e5;
			font-weight: normal;
			padding:0.1rem 0.15rem;
		}
	}

	//中间余额部分
	.middle-cell {
		background: #fff;
		display: flex;
		/*justify-content: space-between;*/
		height: 72px;
		width: 94%;
		margin: 0 auto;
		margin-top: 0.08rem;
    a{
      display: block;
      width: 25%;
      color: $color40;
      text-align: center;
    }
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
      width: 0.285rem;
      height: 0.285rem;
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
background: #FF1E41;
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
  background: #FFF;
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
  background: #E2F2FA;
  color: #333;
  padding: 0.08rem 0 0.08rem 3%;
}

.person_yej {
  overflow: hidden;
  padding-bottom: 0.1rem;
  height: 1.0rem;

  .person_ye {
    width: 33.33%;
    float: left;
    position: relative;

    img {
      width: 0.56rem;
      position: absolute;
      left: 50%;
      top: 0.14rem;
      margin-left: -0.27rem;
    }

    span {
      display: block;
      text-align: center;
      margin-top: 0.78rem;
      color: #333;
      font-size: 0.15rem;
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

.person_xiaozi {
h4 {
  height: 0.44rem;
  padding: 0 3%;
  width: 94%;
  font-size: 0.15rem;
  font-weight: normal;
  line-height: 0.45rem;
  position: relative;
  border-bottom: 1px solid #DFE6E7;

  .xialjt {
    display: block;
    position: absolute;
    right: 2%;
    top: 0.11rem;
    height: 0.22rem;
    width: 0.3rem;
    background: url('./../../assets/images/jiantou@2x.png') no-repeat center center;
    background-size: 0.22rem;
  }

  .xialj {
    display: block;
    position: absolute;
    right: 2%;
    top: 0.11rem;
    height: 0.22rem;
    width: 0.3rem;
    background: url('./../../assets/images/Shape@2x.png') no-repeat center center;
    background-size: 0.2rem;
  }
}

.person_xlist {
  overflow: hidden;
  width: 100%;
  height: 0.5rem;
  background: url('./../../assets/images/jiantou@2x.png') no-repeat 98% center;
  background-size: 0.24rem;
  border-bottom: 1px solid #DFE6E7;

  img {
    height: 0.24rem;
    float: left;
    display: block;
    margin: 0.13rem 0 0 3%;
  }

  span {
    display: block;
    float: left;
    margin-left: 2%;
    line-height: 0.5rem;
    color: #333535;
    font-size: 0.15rem;
  }
}
}
.flex-row-reverse {
-ms-flex-direction: row-reverse!important;
flex-direction: row-reverse!important;
}
.d-flex {
display: -ms-flexbox!important;
display: flex!important;
}
.align-items-center {
-ms-flex-align: center!important;
align-items: center!important;
}
.justify-content-around {
-ms-flex-pack: distribute!important;
justify-content: space-around!important;
}
.mrg_btn{
margin-bottom: 0.1rem;
}
</style>
