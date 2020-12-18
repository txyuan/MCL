<template>
	<div style="padding-top: 0.44rem">
		<mt-header title="预约详情" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="revdet">
			<mt-field style="border-bottom: 1px solid #eee;" label="下一次治疗：" readonly="readonly" v-model="others.treatment"></mt-field>
			<mt-field style="border-bottom: 1px solid #eee;" label="预约时间：" readonly="readonly" v-model="others.CreateTime"></mt-field>
			<mt-field style="border-bottom: 1px solid #eee;" label="预约医生：" readonly="readonly" v-model="others.doctor"></mt-field>
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
  .mint-header {
    height: 0.44rem;
    line-height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
  }
	.revdet{
    margin-top: 0.1rem;
	}
	.revdet p{
		font-size: 0.145rem;
		padding: 0.14rem 3%;
		background: #fff;
	}
</style>
<style>
	.revdet input[type=text]{
		border: none;
	}
  .revdet a.mint-cell .mint-cell-text,  .revdet .mint-cell-value{ font-size: 0.145rem;}

</style>
