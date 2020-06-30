<template>
	<div>
		<mt-header title="就诊详情" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="medical">
			<div class="medical_date">
				<span v-for="(item,index) in datlist" :key="index" @click="actclick(index,item)" :class="{act:index==current}">2019.09.16</span>
			</div>
			<div class="medical_sjqk">
				<mt-cell title="就诊人" :value="inform.patientname" style="border-bottom: 1px solid #eee;"></mt-cell>
				<mt-cell title="就诊时间" :value="inform.create_time" style="border-bottom: 1px solid #eee;"></mt-cell>
				<mt-cell title="就诊医生" :value="inform.doctorname" style="border-bottom: 1px solid #eee;"></mt-cell>
				<mt-cell title="医生备注"></mt-cell>
				<div class="medical_hh">
					<p>{{inform.remarks}}</p>
				</div>
			</div>
			<div class="medical_bg">
				<h2>检查报告</h2>
				<p>
					<img :src="inform.inspectionreport" />
					<!-- <img src="../../../assets/images/lpoerm.png" /> -->
				</p>
			</div>
			<div class="medical_bg">
				<h2>影像资料</h2>
				<p>
					<img :src="inform.impactdata" />
					<!-- <img src="../../../assets/images/lpoerm.png" /> -->
				</p>
			</div>
			<div class="medical_bg">
				<h2>出院报告</h2>
				<p>
					<img :src="inform.dischargereport" />
					<!-- <img src="../../../assets/images/lpoerm.png" /> -->
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "medical",
		data: () => ({
			current:0,
			datlist:[],
			hzskey:'',  //患者key
			inform:{}
		}),
		methods: {
			actclick(index,item){
				this.current=index;
				this.getinform(item.skey);
			},
			getimdate(){
				let url = "UserInterface/channel/PatientReviewRecordDateList.ashx";
				let param = {
					patientskey:this.hzskey
				};
				this.$post(url, param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.datlist=data.data;
					this.getinform(data.data[0].skey);
				})
			},
			getinform(skey){
				let url = "UserInterface/channel/PatientReviewRecordInfoList.ashx";
				let param = {
					skey:skey
				};
				this.$post(url, param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.inform=data;
				})
			},
		},
		mounted(){
			this.getimdate();
		},
		created() {
			this.hzskey = this.$route.query.skey;
		}
	}
</script>

<style scoped lang="scss">
	.medical {
		padding-top: 43px;

		.medical_date {
			overflow-x: auto;
			height: 0.44rem;
			display: flex;
			background: #fff;

			span {
				display: inline-block;
				height: 0.44rem;
				font-size: 0.14rem;
				color: #666666;
				margin: 0 0.14rem;
				box-sizing: border-box;
				line-height: 0.44rem;
				float: left;
				flex-shrink: 0;

				&:last-child {
					padding-right: 0.14rem;
				}

				&.act {
					color: #4A8EF4;
					border-bottom: 2px solid #4A8EF4;
				}
			}
		}
	}

	.medical_sjqk {
		margin-top: 0.08rem;
	}

	.medical_hh {
		padding-bottom: 0.14rem;
		background: #fff;

		p {
			width: 90%;
			margin: 0 auto;
			min-height: 0.3rem;
			max-height: 1.1rem;
			padding: 0.12rem;
			overflow-y: auto;
			color: #666666;
			font-size: 0.14rem;
			line-height: 0.22rem;
			background: #F9F9F9;
			border-radius: 5px;
		}
	}

	.medical_bg {
		background: #fff;
		margin-top: 0.08rem;
		padding: 0.12rem 3%;

		h2 {
			font-size: 0.16rem;
			color: #333;
			padding: 0 3%;
			font-weight: 400;
			border-left: 4px solid #4A8EF4;
		}

		p {
			padding-top: 0.14rem;

			img {
				width: 34%;
				margin-left: 4%;
			}
		}
	}
</style>
