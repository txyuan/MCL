<template>
	<div class="mesage-root messp">
		<mt-header title="小美医助为您提供实时指导" fixed >
			<!-- @click.native="slide = !slide" -->
			<div slot="left">
				<mt-button icon="back" @click="$router.back()"></mt-button>
			</div>
		</mt-header>
		<div id="body_main" style="padding-bottom: 0">
			<div class="page">
				<!--卡片-->
				<div class="slide" :class="{'slideUp': slide}">
					<div class="card">
						<div class="card_top">
							<div class="item" @click="mcldoct(1)">
								<img :src="DoctorImg" alt="" class="touxiang" />
								<p class="DName font14">{{Position}}</p>
							</div>
							<div class="item" @click="mcldoct(2)">
								<img src="@/assets/images/mclGW.jpg" alt="" class="touxiang" />
								<p class="DName font14">MCL专家团</p>
							</div>
							<div class="item" @click="mcldoct(3)">
								<img src="@/assets/images/mclZJ.jpg" alt="" class="touxiang" />
								<p class="DName font14">MCL医生助理</p>
							</div>
						</div>
					</div>
				</div>

				<!-- <div class="my-cell font15 margin10 marginTop10">
					<div class="">专属服务对象</div>
					<div class="yellow">{{ServicePatient}}</div>
				</div> -->
			</div>
			<div style="position: absolute;  bottom:0; width: 100%; border: none;" :style="{top: slide ? '0.5rem' : '1.84rem'}">
				<iframe width="100%" style="height: 100%; border: none;" ref="kefuView"></iframe>
			</div>
		</div>
		<div class="mess_alet" v-if="docinf1">
			<div class="mess_aletwt">
				<img src="@/assets/images/guanbi@2x.png" @click="closess(1)" />
				<div class="mess_alcont">
					<p>{{rdata.content}}</p>
					<!-- <p v-if="rdata.Sex=='1'">性别：男</p>
					<p v-else>性别：女</p>
					<p>手机号：{{rdata.ContactPhone}}</p>
					<p>就职医院：{{rdata.Hospital}}</p>
					<p>就职科室：{{rdata.Department}}</p>
					<p>我的职称：{{rdata.Title}}</p>
					<p>个人简介：{{rdata.content}}</p> -->
				</div>
			</div>
		</div>
		<div class="mess_alet" v-if="docinf2">
			<div class="mess_aletwt">
				<img src="@/assets/images/guanbi@2x.png" @click="closess(2)" />
				<div class="mess_alcont">
					<p class="mess_alcont_title">MCL专家团</p>
					<p class="mess_alcont_content">由国内外顶尖肿瘤专家营养学专家、运动康复专家、心理医生等组成，均为从事相关领域工作均在15年以上的副教授（或副主任）以上职称。专家团队将结合患者生化指标、病史及诊疗出院报告，以及患者生活方式现状，及时提出解决方案。</p>
				</div>
			</div>
		</div>
		<div class="mess_alet" v-if="docinf3">
			<div class="mess_aletwt">
				<img src="@/assets/images/guanbi@2x.png" @click="closess(3)" />
				<div class="mess_alcont">
					<p class="mess_alcont_title">MCL专属顾问</p>
					<p class="mess_alcont_content">聘请国内5年以上临床经验，具备营养、运动康复、健康管理、心理咨询等知识、技能专业人士，通过建立有效的闭环联系机制，为患者提供并发症处理、复诊预约等生活方式医学指导！</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import doctorDefaultPic from '@/assets/images/doctorPic.png'
import { KFURL } from '@/configURL.js'
export default {
  name: 'mesage',
  data: () => ({
    KFURL,
    docinf1: false,
    docinf2: false,
    docinf3: false,
    slide: true,
    DoctorImg: '', // 医生图片
    doctorDefaultPic, // 医生默认图片
    Position: '', // 职位
    ServicePatient: '', // 专属服务对象
    repData: {},
    userkey: '',
    rdata: {}
  }),
  methods: {
    // 介绍弹出框
    mcldoct (ind) {
      if (ind == 1) {
        this.docinf1 = true
      } else if (ind == 2) {
        this.docinf2 = true
      } else if (ind == 3) {
        this.docinf3 = true
      }
    },
    closess (indx) {
      if (indx == 1) {
        this.docinf1 = false
      } else if (indx == 2) {
        this.docinf2 = false
      } else if (indx == 3) {
        this.docinf3 = false
      }
    },
    // 获取医生介绍
    getthisnf () {
      let url = 'UserInterface/GetUserShowInfo.ashx'
      this.$post(url).then((data) => {
        let model = data.data
        this.rdata = model
      })
    },
    // 个人信息
    async information () {
		let url = 'UserInterface/GetUserShowInfo.ashx'
		const data = await this.$post(url)
		let model = data.data
		if (model) {
			this.repData = model
		}
    },
    // 获取信息
    getupshop () {
      let url = 'UserInterface/PurchaseYearCard.ashx'
      this.$post(url).then((data) => {
        if (data.rspcode != 1) {
          return
        }
        this.DoctorImg = data.DoctorImg
        this.Position = data.Position
        this.ServicePatient = data.ServicePatient
      })
    },
	// close(){
	// 	const {historyLength} = this.$route.query
	// 	if( history.length > historyLength){
	// 		this.$router.go(-(history.length - historyLength))
	// 	}else{
	// 		this.$router.back()
	// 	}
	// },
	// backChange() {
    //   const that = this;
    //   alert("监听到了");
	// }
  },
  created () {
    this.userkey = JSON.parse(localStorage.getItem('userInfo')).UserKey

	// 如果支持 popstate 一般移动端都支持了
	// if (window.history && window.history.pushState) {
	// 	// 往历史记录里面添加一条新的当前页面的url
	// 	history.pushState(null, null, document.URL);
	// 	// 给 popstate 绑定一个方法 监听页面刷新
	// 	window.addEventListener('popstate', this.backChange, false);//false阻止默认事件
	// }
  },
  async mounted () {
	if(localStorage.mesnum){
		localStorage.removeItem('mesnum')
	}
	this.$Indicator.loading()
	await this.information()
	this.$refs.kefuView.onload = () => {
	  setTimeout(() => {
        this.$Indicator.close()
	  }, 1000)
    }
	
	this.$refs.kefuView.contentWindow.location.replace(`${this.KFURL}/login?username=${this.repData.ContactPhone}&userkey=${this.userkey}&logoSinge=1`)

    this.getupshop()
    this.getthisnf()
  },
  destroyed(){
	this.$Indicator.close()
	// window.removeEventListener('popstate', this.backChange, false);//false阻止默认事件
  },

}
</script>

<style scoped lang="scss">
	.mess_alet{
		width: 100%;
		height: 100vh;
		background: rgba(000,000,000,0.6);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		.mess_aletwt{
			width: 78%;
			padding: 0.2rem 4%;
			height: 3.0rem;
			background: #fff;
			position: absolute;
			left: 7%;
			top: 50%;
			margin-top: -2.0rem;
			border-radius: 8px;
			font-size: 0.14rem;
			padding-top: 0.5rem;
			p{

			}
		}
		img{
			width: 0.24rem;
			position: absolute;
			right: 4%;
			top: 0.14rem;
		}
	}
	#body_main{
		/*padding-top: 0*/
		height: 100vh;
		position: relative;
		box-sizing: border-box;
	}
	.page{
		background: #FAFAFA;
		position: fixed;
		top: 43px;
		width: 100%;
		z-index: 20;
	}
	/*卡片*/
	.card {
		background: #FFF;
		border-radius: 6px;
		margin: 0.10rem;
		margin-bottom: 0;
	}

	.card_top {
		padding: 0.20rem 0.17rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.item{
			text-align: center;
		}
		.touxiang {
			width: 0.60rem;
			height: 0.60rem;
			border-radius: 0.30rem;
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
			border: 1px solid #F78335;
			border-radius: 2px;
			color: #F78335;
			padding: 0.01rem 0.08rem;
			margin-left: 0.15rem;
		}
	}

	.card_bottom {
		background: rgba(255, 255, 255, 0.1);
		margin-top: 0.2rem;
		padding: 0.08rem 0.10rem;
		line-height: 1.5;
	}

	.my-cell {
		line-height: 0.44rem;
		padding: 0 0.15rem;
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
	}
	.mess_alcont_title{
		font-size: 0.18rem;
		text-align: center;
		margin-bottom: 0.1rem;
	}
	.mess_alcont_content{
		font-size: 0.16rem;
		text-indent: 0.2rem;
		line-height: 1.5;
	}

  .slide{
		transition: max-height 0.15s ease-out;
		overflow: hidden;
		max-height: 150px;
  }
	.slideUp{
		max-height: 0px;
		transition: max-height 0.25s ease-in;
	}

</style>
<style>
	.messp .mint-header-title{
		flex:3;
		font-size: 0.16rem;
	}
  .messp .messagebox .messagebox-content{
    background-color: #F5F5F5;
  }
  .messp  .messagebox .messagebox-content .message-group p.byself {
    background: #72ced0;
    float: right;
  }
</style>
