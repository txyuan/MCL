<template>
	<div>
		<mt-header title="预约详情" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="revdet">
			<mt-field style="border-bottom: 1px solid #eee;" label="下一次治疗" readonly="readonly" v-model="others.treatment"></mt-field>
			<mt-field style="border-bottom: 1px solid #eee;" label="预约时间" readonly="readonly" v-model="others.CreateTime"></mt-field>
			<mt-field style="border-bottom: 1px solid #eee;" label="预约医生" readonly="readonly" v-model="others.doctor"></mt-field>
			<p>其他：{{others.other}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: "review-detail",
		data: () => ({
			skeys:'',
			others:{}
		}),
		methods:{
			getDetail(){
				let url = "UserInterface/getReviewthebookingDetail.ashx";
				let param={
					skey:this.skeys
				};
				this.$post(url, param).then((data) => {
					if (data.rspcode != 1) {
						this.$Toast(data.rspdesc)
						return;
					}
					this.others=data;
				})
			}
		},
		mounted(){
			let skeys = this.$route.query.skey;
			this.skeys=skeys;
			this.getDetail();
		}
	}
</script>

<style scoped lang="scss">
	.revdet{
		padding-top: 43px;
	}
	.revdet p{
		font-size: 0.16rem;
		color: #666;
		padding: 0.14rem 3%;
		background: #fff;
	}
</style>
<style>
	.revdet input[type=text]{
		border: none;
	}
</style>
