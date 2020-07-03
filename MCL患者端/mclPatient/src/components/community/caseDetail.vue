<template>
	<div>
		<mt-header title="指标数据" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="case_det">
			<div v-html="content"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "case-detail",
		data: () => ({
			param:{
				skey:''
			},
			content:''
		}),
		methods:{
			getInfo(){
				let url = "UserInterface/GetCommunityCaseDetail.ashx";
				this.$post(url,this.param).then((data)=>{
					if(data.rspcode != 1 ){
					  return;
					}
					this.content = data.content;
				})
			}
		},
		mounted(){
			this.param.skey = this.$route.query.id;
			this.getInfo();
		}
	}
</script>

<style scoped lang="scss">
	.case_det{
		width: 92%;
		margin: 0 auto;
		padding-top: 43px;
		margin-top: 0.1rem;
	}
</style>
