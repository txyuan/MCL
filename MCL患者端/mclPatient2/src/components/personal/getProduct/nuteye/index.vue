<template>
	<div class="padding-footer">
		<div class="fix_top">
			<mt-header fixed title="筛查评估报告">
				<div slot="left">
					<router-link to="/wx_Entrance/personal" style="color: inherit;">
						<mt-button icon="back"></mt-button>
					</router-link>
				</div>
			</mt-header>
		</div>

		<div class="nuteye">
			<div class="headty_inform">
				<div class="headty_mead">
					<ol>
						<li>姓名：{{datasj.name}}</li>
						<li>年龄：{{datasj.age}}岁</li>
						<li>性别：{{datasj.sex}}</li>
					</ol>
					<ul>
						<li>临床诊断：{{datasj.clinical_diagnosis}}</li>
						<li>身高：{{datasj.height}}cm</li>
						<li>体重：{{datasj.weight}}kg</li>
						<li>BMI：{{datasj.bmi}}</li>
						<li>理想体重：{{datasj.ideal_weight}}kg</li>
						<li>正常范围：{{datasj.normal_range}}</li>
						<!-- <li>推荐摄入能量：{{datasj.normal_range}}</li>
						<li>实际摄入能量：{{datasj.normal_range}}</li>
						<li>能量差额：{{datasj.normal_range}}</li> -->
					</ul>
				</div>
			</div>
			<div class="nut_list">
				<div class="nut_li">
					<h2>
						<span>风险筛查（NRS-2002）</span>
					</h2>
					<p>
						<u>筛查结果：</u>
						<strong>{{responseData.nutritionriskvalue}}</strong>
					</p>
					<label>{{responseData.nutritionriskresult}}</label>
				</div>
				<i>{{responseData.nutritionremarks}}</i>
			</div>
			<div class="nut_list" v-show="responseData.pgsgaShow">
				<div class="nut_li">
					<h2>
						<span>营养评估（PG-SGA）</span>
					</h2>
					<p>
						<u>评估结果：</u>
						<strong>{{responseData.pgsgavalue}}</strong>
					</p>
					<label>{{responseData.pgsgaresult}}</label>
				</div>
				<i>{{responseData.pgsgaremarks}}</i>
			</div>
			<div class="nut_list" v-show="responseData.mnasfShow">
				<div class="nut_li">
					<h2>
						<span>营养评估</span>
					</h2>
					<p>
						<u>MNA-SF评分值：</u>
						<strong>{{responseData.mnasfvalue}}</strong>
					</p>
					<label>{{responseData.mnasfresult}}</label>
				</div>
				<i>{{responseData.mnasfremarks}}</i>
			</div>
			<!-- <div class="nut_list">
				<div class="nut_li">
					<h2>
						<span>膳食摄入评估</span>
					</h2>
					<p class="dsuv_eveall">
						<span>
							<i>总能量: {{responseData.foodEnergy}}</i>
							<i>碳水化合物:{{responseData.carbohydrate}}</i>
							<i>总脂肪:{{responseData.fat}}</i>
							<i>蛋白质:{{responseData.protein}}</i>
						</span>
					</p>
				</div>
			</div> -->
			<p class="rightdate">筛查日期：{{datasj.screening_date}}</p>
		</div>

		<div class="fix_bottom">
			<mt-button type="primary" class="theme-button" size="large" @click.native="goTool">每日实际摄入量</mt-button>
		</div>
	</div>
</template>

<script>
import {getSelfTestToolValue} from "@/api/selfTest.js"
export default {
  name: 'index',
  data: () => ({
    datasj: {},
    nutritionskey: '', // 筛查主键
    responseData: {
      nutritionriskvalue: '', // 营养风险分值
      nutritionriskresult: '', // 营养风险结果
      nutritionremarks: '', // 营养筛查备注

      pgsgavalue: '', // PG-SGA分值
      pgsgaresult: '', // PG-SGA结果
      pgsgaremarks: '', // PG-SGA备注

      mnasfvalue: '', // MNASF分值
      mnasfresult: '', // MNASF结果
      mnasfremarks: '', // MNASF备注
      mnasfShow: false,
      pgsgaShow: false,
	  testToolObj: {}
    }
  }),
  methods: {
    getInfo () {
      let url = 'UserInterface/NutritionScreeningInfo.ashx'
      let param = {
        nutritionskey: this.nutritionskey
      }
      this.$post(url, param).then((data) => {
        if (data.rspcode != 1) {
          return
        }
        this.datasj = data
        this.responseData = data
        if ((data.mnasfvalue == null) || (data.mnasfvalue == '分')) {
          this.responseData.mnasfShow = false
        } else {
          this.responseData.mnasfShow = true
        }
        if ((data.pgsgavalue == null) || (data.pgsgavalue == '分')) {
          this.responseData.pgsgaShow = false
        } else {
          this.responseData.pgsgaShow = true
        }
      })
    },
    back () {
	  // 如果从登陆或者自测过来的，返回直接到个人中心
      const fromPage = this.$route.query.from
      if ((fromPage == 'self') || (fromPage == 'login')) {
        this.$router.push('/wx_Entrance/personal')
      } else {
        this.$router.back()
      }
    },
	// 单独获取每日实际摄入量数据
	async getSelfTestToolValue(){
		const data = await getSelfTestToolValue()
		if (data.rspcode != 1) {
			return;
		}
		this.testToolObj = data
		
	},
	goTool(){
		if(JSON.stringify(this.testToolObj) == "{}"){
			return
		}
		const item = this.testToolObj
		this.$router.push({name: 'toolHome', query:{type: item.type, skey: item.skey, SubjectName: item.SubjectName}, params:{type: item.type}})
	}
  },
  mounted: function () {
    const id = this.$route.query.id
    this.nutritionskey = id
    this.getInfo()
	this.getSelfTestToolValue()
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
	.dsuv_eveall{
		overflow: hidden;
		font-size: 0.14rem;
		margin-top: 0.04rem;
		label{
			float: left;
			display: block;
			font-weight: 600;
			color: #333;
		}
		span{
			width: 75%;
			display: block;
			float: left;
			color: #666;
			i{
				font-style: normal;
				display: block;
				margin-top: 0.04rem;
				margin-left: 0.06rem;
				padding: 0 !important;
			}
		}
	}
	.headty_inform{
		width: 100%;
		p{
			width: 100%;
			height: 0.36rem;
			background: #00A2EA;
			border-radius: 6px;
			color: #fff;
			font-size: 0.15rem;
			text-align: center;
			line-height: 0.36rem;
			margin-top: 0.16rem;

		}
		.headty_mead{
			width: 94%;
			padding: 0.1rem 3%;
			margin-top: 0.1rem;
			background: #fff;
			border-radius: 8px;
			font-size: 0.14rem;
			ol{
				overflow: hidden;
				li{
					width: 50%;
					float: left;
					margin-top: 0.06rem;
				}
			}
			ul{
				li{
					margin-top: 0.06rem;
				}
			}
		}
	}
	.nuteye {
		padding: 0 3%;
		margin-top: 43px;
		padding-bottom: 0.3rem;
		.nut_list {
			padding-top: 0.1rem;

			.nut_li {
				background: #fff;
				border-radius: 6px;
				padding: 0 3%;

				h2 {
					width: 100%;
					height: 0.44rem;
					border-bottom: 1px solid #DFE6E7;
					font-weight: 500;
					font-size: 0.15rem;
					line-height: 0.44rem;
					color: #333535;

					span {
						border-left: 2px solid #F78335;
						padding-left: 0.1rem;
					}
				}

				p {
					overflow: hidden;
					padding: 0.1rem 0;
					font-size: 0.14rem;

					u {
						text-decoration: none;
						color: #636768;
						float: left;
					}

					strong {
						color: #F78335;
						float: right;
						font-weight: 400;
					}
				}

				label {
					display: block;
					text-align: right;
					color: #636768;
					font-size: 0.14rem;
					padding-bottom: 0.12rem;
				}
			}

			i {
				font-style: normal;
				font-size: 0.13rem;
				color: #636768;
				padding: 0.12rem 3% 0.04rem 3%;
				display: block;
			}
		}
	}
	.rightdate{
		text-align: right;
		font-size: 0.14rem;
		padding: 0.1rem ;
		// background: #fff;
	}
</style>
