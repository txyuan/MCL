<template>
	<div>
		<mt-header title="服药调查" fixed>
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="medicat_home" style="padding-bottom: 0.2rem;">
			<div class="medicat_tab">
				<p v-for="(item,index) in list" :key="index" @click="getdefalt(item.skey,index)" :class="{active:index==current}">{{item.name}}</p>
			</div>
			<div class="medicat_name">
				<p>药品名称: </p>
				<input type="text" v-model="reData.drug_name" readonly="readonly" />
			</div>
			<div class="medicat_img">
				<img :src="reData.pic1" v-if="reData.pic1!=''" />
				<img :src="reData.pic2" v-if="reData.pic2!=''" />
				<img :src="reData.pic3" v-if="reData.pic3!=''" />
			</div>
			<div class="medicat_yaol">
				<div class="medicat_yaoever">
					<span>每次用量：</span>
					<label>{{reData.consumption}}</label>
				</div>
				<div class="medicat_yaoever">
					<span>剂量：</span>
					<label>{{reData.dose}}</label>
				</div>
			</div>
			<div class="medicat_pingl">
				<h3>频率：</h3>
				<ul>
					<li>
						<span>第一次</span>
						<label>{{reData.first_time}}</label>
						<div class="medicat_eatbf">
							<p>
								<i>{{reData.first_result}}</i>
							</p>
						</div>
					</li>
					<li>
						<span>第二次</span>
						<label>{{reData.second_time}}</label>
						<div class="medicat_eatbf">
							<p>
								<i>{{reData.second_result}}</i>
							</p>
						</div>
					</li>
					<li>
						<span>第三次</span>
						<label>{{reData.third_time}}</label>
						<div class="medicat_eatbf">
							<p>
								<i>{{reData.third_result}}</i>
							</p>
						</div>
					</li>
				</ul>
			</div>
			<div class="medicat_styl">
				<span>服药方式 : </span>
				<div class="medicat_eatbf">
					<p>
						<i>{{reData.medication_method}}</i>
					</p>
				</div>
			</div>
			<div class="medicat_styl">
				<span>是否按医嘱 : </span>
				<div class="medicat_eatbf">
					<p>
						<i>{{reData.doctor_advice}}</i>
					</p>
				</div>
			</div>
			<div class="medicat_styl">
				<span>不良反应 : </span>
				<div class="medicat_eatbf">
					<p style="width: 80%;">
						<i>{{reData.side_effects}}</i>
						<input v-if="reData.side_effects=='有'" type="text" v-model="reData.side_effects_result" style="border-bottom: 1px solid #ddd;float: left;width: 60%;margin-left: 0.04rem;" />
					</p>
				</div>
			</div>
			<div class="medicat_styl">
				<span>饮食注意 : </span>
				<div class="aopity">{{reData.dietary_attention}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "eyemedicat",
		data: () => ({
			current:0,
			idtime:'',
			list:[],
			reData:{}
		}),
		methods: {
			//获取列表
			getList() {
				let url = "UserInterface/curve/MedicationSurveySelectName.ashx";
				let param={
					datatime:this.idtime
				};
				this.$post(url,param).then((data) => {
					if(data.rspcode != 1) {
						return;
					}
					this.list = data.data;
					this.getdefalt(data.data[0].skey,0);
				})
			},
			// 获取详情
			getdefalt(skey,index){
				this.current=index;
				let url = "UserInterface/curve/MedicationSurveyDetail.ashx";
				let param={
					skey:skey
				};
				this.$post(url,param).then((data) => {
					if(data.rspcode != 1) {
						return;
					}
					this.reData=data;
				})
			}
		},
		mounted(){
			let idtime = this.$route.query.idtime;
			this.idtime=idtime;
			this.getList();
		}
	}
</script>

<style scoped lang="scss">
	.medicat_home{
		padding-top: 44px;
		.medicat_name{
			width: 94%;
			margin: 0 auto;
			margin-top: 0.16rem;
			overflow: hidden;
			p{
				font-size: 0.14rem;
				float: left;
				line-height: 0.32rem;
			}
			input{
				float: left;
				width: 76%;
				padding: 0 2%;
				height: 0.32rem;
				background: #fff;
				border: 1px solid #eee;
			}
		}
	}
	.medicat_yaol{
		overflow: hidden;
		width: 94%;
		margin: 0 auto;
		margin-top: 0.16rem;
		padding-top: 0.1rem;
		border-top: 1px solid #ddd;
		.medicat_yaoever{
			width: 50%;
			float: left;
			overflow: hidden;
			font-size: 0.14rem;
			span{
				display: block;
				line-height: 0.3rem;
				float: left;
			}
			label{
				width: 40%;
				float: left;
				height: 0.3rem;
				line-height: 0.3rem;
				text-align: center;
			}
		}
	}
	.medicat_pingl h3{
		font-weight: normal;
		font-size: 0.14rem;
		width: 94%;
		padding: 0.1rem 3%;
	}
	.medicat_pingl{
		ul{
			width: 94%;
			background: #fff;
			padding: 0.1rem 3%;
			li{
				padding: 0.1rem;
				overflow: hidden;
				span{
					width: 30%;
					display: block;
					float: left;
				}
				label{
					width: 20%;
					display: block;
					float: left;
					height: 0.2rem;
					text-align: center;
					margin-right: 8%;
					color: #F08619;
				}
				.medicat_eatbf{
					width: 40%;
					float: left;
					font-size: 0.14rem;
					p{
						width: 50%;
						float: left;
						overflow: hidden;
						i{
							font-style: normal;
							display: block;
							float: left;
						}
					}
				}
			}
		}
	}
	.medicat_styl{
		overflow: hidden;
		width: 94%;
		margin-top: 0.16rem;
		padding: 0.1rem 3%;
		span{
			display: block;
			float: left;
			width: 30%;
			font-size: 0.14rem;
		}
		.medicat_eatbf{
			width: 60%;
			float: left;
			font-size: 0.14rem;
			overflow: hidden;
			p{
				width: 33.33%;
				float: left;
				overflow: hidden;
				i{
					font-style: normal;
					display: block;
					float: left;
					margin-left: 0.04rem;
				}
				label{
					width: 0.14rem;
					height: 0.14rem;
					display: block;
					float: left;
					border: 1px solid #999;
					border-radius: 0.07rem;
					position: relative;
					margin-top: 0.02rem;
					u{
						width: 0.08rem;
						height: 0.08rem;
						border-radius: 0.04rem;
						position: absolute;
						top: 0.03rem;
						left: 0.03rem;
						background: #999;
					}
				}
			}
		}
	}
	.medicat_text{
		width: 92%;
		padding: 0.1rem 4%;
		background: #fff;
		font-size: 0.14rem;
		color: #666;
		height: 0.5rem;
		resize: none;
		border: none;
		margin-top: 0.1rem;
		border: 1px solid #ddd;
	}
	.aopity{
		width: 92%;
		padding: 0.1rem 4%;
		background: #fff;
		font-size: 0.14rem;
		color: #666;
		height: 0.5rem;
		resize: none;
		border: none;
		margin-top: 0.3rem;
		border: 1px solid #ddd;
	}
	.medicat_btn{
		width: 1.4rem;
		height: 0.32rem;
		background: #F08619;
		margin: 0 auto;
		border-radius: 6px;
		color: #fff;
		text-align: center;
		line-height: 0.32rem;
		font-size: 0.14rem;
		margin-top: 0.2rem;
	}
	.medicat_img{
		width: 94%;
		margin: 0 auto;
		margin-top: 0.2rem;
		overflow: hidden;
		img{
			width: 30%;
			height: 1.1rem;
			float: left;
			margin-left: 3.33%;
		}
	}
	.medicat_tab{
		width: 94%;
		margin: 0 auto;
		margin-top: 0.16rem;
		overflow: hidden;
		p{
			padding: 0 0.18rem;
			height: 0.3rem;
			line-height: 0.3rem;
			font-size: 0.14rem;
			background: #fff;
			border: 1px solid #ddd;
			float: left;
			width: auto;
			box-sizing: border-box;
			color: #F08619;
			&.active{
				background: #F08619;
				color: #fff;
				border: none;
			}
		}
	}
</style>
