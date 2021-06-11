<template>
	<div class="wellcome_root">
		<img src="@/assets/images/wellcome_bg.png" alt="" style="width: 100%;"/>
		<mt-button type="default" class="theme-button button-radio lalala" size="large" @click.native="go">下一步</mt-button>
		<!--<div class="wellcome_panel">
			<div class="title">
				<img src="@/assets/images/wellcome_btn.png" width="100%" alt="">
			</div>
			<div class="content">
				<p class="content_tit">尊敬的先生/女士：</p>
				<p class="content_tit">您好！</p>
				<p class="row">欢迎您加入加拿大生活方式医学管理中心大家庭！这是一项来自加拿大的专业肿瘤治疗性生活方式医学改变及疾病症状管理项目（简称MCL生活方式管理），不同于普通的医疗项目。我们能更加清晰地找到机体发病原因并帮助您战胜疾病，并通过结合饮食计划、锻炼、营养补充剂和压力等多方面管理，以滋养、平衡和重塑机体活力的方式全面提高身体功能，以达到缓解或逆转疾病。我们已成功帮助了成千上万的肿瘤（慢病）患者，我们期待能够用个性化的生活方式医学改变项目——（MCL项目）来帮助您，MCL项目有力、有效，能助您提高身体素质和机体功能，让您或您的亲人活得更好，活更得久，花费更少。</p>
				<mt-button type="primary" class="theme-button button-radio " size="large" @click.native="$router.push(`/wellcome_personInfo`)">下一步</mt-button>
			</div>
		</div>-->
	</div>
</template>

<script>
export default {
  name: 'wellcome_root',
  data: () => ({

  }),
  methods: {
    go () {
      const redirect = this.$route.query.redirect
      if (redirect) {
        this.$router.push(redirect)
      } else {
        this.$router.push('/wellcome_personInfoRegister')
      }
    }
  }
}
</script>

<style scoped lang="scss">
	.wellcome_root{
		min-height: 100vh;
		background: url("../../../assets/images/wellcome_bg.png") no-repeat top center;
		background-size: 100% auto;
		background-color: #61AAB1;
		// padding-bottom: 0.21rem;
		overflow: hidden;
		.wellcome_panel{
			padding: 0.24rem;
			margin-top: 2.2rem;
		}
		.content_tit{
			font-weight: bold;
			color: #666666;
			font-size: 0.16rem;
			padding-bottom: 0.05rem;
		}
		.content{
			margin: 0 0.2rem;
			margin-top: -0.2rem;
			padding: 0.10rem;
			padding-top: 0.22rem;
			border-radius: 10px;
			background: #FFF;
			line-height: 1.5;
			font-size: 0.14rem;
			color: #333535;
		}
		.row{
			text-indent: 0.15rem;
		}
		.theme-button{
			width: 90%;
			margin: 0 auto;
			margin-top: -35px;
			border: 1px solid #24B7C0;
    		color: #24B7C0;
		}
		.lalala{
			position: fixed;
			bottom: 0.1rem;
			left: 5%;
		}
	}

</style>
