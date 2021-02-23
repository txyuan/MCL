<template>
	<div style="padding-top: 0.44rem">
		<div class="fix_top" >
			<mt-header fixed title="筛查评估报告">
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
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
					<h3>
						<em></em>风险筛查（NRS-2002）
					</h3>
					<div class="nut_linr">
            <div class="flex-grow-1">
              <u>筛查结果：</u>
              <span>{{responseData.nutritionriskresult}}</span>
            </div>
            <div>
              <strong>{{responseData.nutritionriskvalue}}</strong></div>
					</div>
				<p>{{responseData.nutritionremarks}}</p>
      </div>
			</div>
			<div class="nut_list">
				<div class="nut_li">
					<h3>
						<em></em>营养评估（PG-SGA）
					</h3>
          <div class="nut_linr">
            <div class="flex-grow-1">
              <u>评估结果：</u>
              <span>{{responseData.pgsgaresult}}</span>
            </div>
            <div>
              <strong>{{responseData.pgsgavalue}}</strong></div>
          </div>
        <p>{{responseData.pgsgaremarks}}</p>
      </div>
			</div>
			<!-- <div class="nut_list" v-show="responseData.mnasfShow">
				<div class="nut_li">
					<h3>
						<span>营养评估</span>
					</h3>
					<p>
						<u>MNA-SF评分值：</u>
						<strong>{{responseData.mnasfvalue}}</strong>
					</p>
					<label>{{responseData.mnasfresult}}</label>
				</div>
				<i>{{responseData.mnasfremarks}}</i>
			</div> -->
			<div class="nut_list">
				<div class="nut_li">
					<h3>
						<em></em>膳食摄入评估
					</h3>
					<div class="dsuv_eveall">
						<!-- <label>能量分配：</label> -->
						<div>
							<span>总能量: {{responseData.foodEnergy}}</span>
							<span>碳水化合物:{{responseData.carbohydrate}}</span>
          </div>
            <div>
							<span>总脂肪:{{responseData.fat}}</span>
							<span>蛋白质:{{responseData.protein}}</span>
						</div>
					</div>
					<!-- <p>
						<u>评估结果：{{responseData.detectionresult}}</u>
					</p> -->
				</div>
				<!-- <i>营养建议：{{responseData.nutritionsuggestion}}</i> -->
			</div>
			<p class="rightdate">筛查日期：{{datasj.screening_date}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		data: () => ({
			datasj:{},
			nutritionskey: "", //筛查主键
			responseData: {
				nutritionriskvalue: "", //营养风险分值
				nutritionriskresult: "", //营养风险结果
				nutritionremarks: "", //营养筛查备注

				pgsgavalue: "", //PG-SGA分值
				pgsgaresult: "", //PG-SGA结果
				pgsgaremarks: "", //PG-SGA备注

				mnasfvalue: "", //MNASF分值
				mnasfresult: "", //MNASF结果
				mnasfremarks: "", //MNASF备注
				mnasfShow: false
			},
			patientskey:''
		}),
		methods: {
			getInfo() {
				let url = "UserInterface/NutritionScreeningInfo.ashx";
				let param = {
					nutritionskey: this.nutritionskey,
					patientskey:this.patientskey
				};
				this.$post(url, param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.datasj=data;
					this.responseData = data;
					if(data.mnasfvalue == "分"){
						this.responseData.mnasfShow = false
					}else{
						this.responseData.mnasfShow = true
					}
				})
			},
		},
		mounted: function() {
			const id = this.$route.query.id;
			const patientskey = this.$route.query.patientskey;
			this.nutritionskey = id;
			this.patientskey=patientskey;
			this.getInfo()
		},
		components: {

		}
	}
</script>

<style scoped lang="scss">
  .mint-header {
    height: 0.44rem;
    line-height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .fix_top{
    padding-top: 0.44rem;
  }
	.dsuv_eveall{
    display: flex;
		margin-top: 0.04rem;
    padding: 0.1rem 0;
    div{
      width: 50%;

    }
    span{
      font-style: normal;
      font-size: 0.145rem;
      display: block;
      padding:0.05rem 0.1rem;
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
			padding: 0.1rem 3% 0.2rem 3%;
			margin-top: 0.1rem;
			background: #fff;
			border-radius: 8px;
			font-size: 0.145rem;
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
		padding: 0 3% 0.3rem 3%;
		.nut_list {
			margin-top: 0.1rem;
      background: #fff;
      border-radius: 6px;
      padding: 0.1rem 0;
			.nut_li {
				padding: 0 3%;

				h3 {
					width: 100%;
					height: 0.44rem;
					border-bottom: 1px solid #DFE6E7;
					font-weight: 500;
					font-size: 0.15rem;
					line-height: 0.44rem;
					color: #333535;

					em {
            font-style: normal;
            background-color: #4A8EF4;
            display: inline-block;
            width: 0.035rem;
            height:  0.135rem;
            margin-right: 0.05rem;
            border-radius: 0.015rem;
					}
				}
        .nut_linr{
          display: flex;
          align-items: center;
          padding: 0.1rem;
          border-bottom: 1px dashed #e5e5e5;

          .flex-grow-1 {
            flex-grow: 1;
          }
          .justify-content-between {
            justify-content: space-between;
          }
          u {
            text-decoration: none;
            color: #484848;
            display: block;
            font-size: 0.145rem;
          }
          span {
            color: #484848;
            display: block;
            font-size: 0.15rem;
            padding-top: 0.1rem;
            padding-bottom: 0.05rem;
          }

          strong {
            color: #F78335;
            font-weight: 400;
            font-size: 0.25rem;
            letter-spacing: 2px;
          }
        }

        p {
          font-style: normal;
          font-size: 0.13rem;
          color: #898989;
          padding: 0.1rem 3% 0.04rem 3%;
          display: block;
        }

			}

		}
	}
	.rightdate{
		text-align: right;
		font-size: 0.145rem;
		margin-top: 0.12rem;
	}

</style>
