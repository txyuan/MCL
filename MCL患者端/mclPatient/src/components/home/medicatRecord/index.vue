<template>
	<div class="caseUpload-root padding-header">
		<mt-header title="用药记录" fixed class="borderBottom">
			<div slot="left">
				<router-link to="/wx_Entrance/home" style="color: initial;">
					<mt-button icon="back"></mt-button>
				</router-link>
			</div>
		</mt-header>

		<div class="page_btn text-center">
			<img src="@/assets/images/病例.png" width="79" style="margin-bottom: 15px;" />
			<mt-button type="primary" class="theme-button button-radio " size="large" @click.native="$router.push(`/addmedicat`)">添加记录</mt-button>
		</div>

		<div class="rev_fuc" style="margin-top: 0.1rem;padding-bottom: 0.3rem;">
			<div>
				<h3>用药记录</h3>
				<div class="rev_list" v-for="(item,index) in list" :key="index">
					<div class="rev_lilf" style="width: 38%;overflow: hidden;">
						<p>{{item.drug_name}}</p>
					</div>
					<label>{{item.create_time}}</label>
					<router-link :to="`/eyemedicat?idtime=${item.create_time}`">
						<span class="greens">查看</span>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "appointment",
		data: () => ({
			list: [],
		}),
		methods: {
			//获取列表
			getList() {
				let url = "UserInterface/curve/MedicationSurveyList.ashx";
				this.$post(url).then((data) => {
					if(data.rspcode != 1) {
						return;
					}
					this.list = data.data;
				})
			}
		},
		mounted(){
			this.getList();
		},
		components: {
			
		}
	}
</script>

<style scoped lang="scss">
	.page_btn {
		padding: 0.25rem;
	}
	
	.rev_fuc {
		width: 100%;
		background: #fff;
		h3 {
			height: 0.5rem;
			line-height: 0.5rem;
			padding-left: 4%;
			font-size: 0.15rem;
			color: #333;
			border-bottom: 1px solid #eee;
		}
		.rev_list {
			padding: 0.13rem 3% 0.15rem 4%;
			border-bottom: 1px solid #eee;
			overflow: hidden;
			.rev_lilf {
				/*float: left;
				width: 70%;*/
				p {
					color: #333333;
					font-size: 0.14rem;
				}
				label {
					color: #666;
					display: block;
					margin-top: 0.06rem;
					font-size: 0.12rem;
				}
			}
			span {
				/*float: right;*/
				height: 0.28rem;
				padding: 0 0.14rem;
				display: block;
				background: #F78335;
				color: #fff;
				line-height: 0.28rem;
				font-size: 0.14rem;
				border-radius: 0.14rem;
				/*margin-top: 0.08rem;*/
				&.greens {
					background: #4D9C30;
				}
				&.bluue {
					background: #6358F4;
				}
			}
		}
		
		.rev_list{
			display: flex;
			justify-content: space-between;
			align-content: center;
			.rev_lilf,label{
				margin-top: 0.08rem;
			}
		}
		
	}
</style>