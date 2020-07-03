<template>
  <div class="use_guide-root padding-header">
  	  <mt-header title="使用指南" fixed>
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>
			
			<div class="content">
				<p class="content_tit">尊敬的先生/女士：</p>
				<p class="content_tit">您好！</p>
				<p class="row">欢迎您加入加拿大生活方式医学管理中心大家庭！这是一项来自加拿大的专业肿瘤治疗性生活方式医学改变及疾病症状管理项目（简称MCL生活方式管理），不同于普通的医疗项目。我们能更加清晰地找到机体发病原因并帮助您战胜疾病，并通过结合饮食计划、锻炼、营养补充剂和压力等多方面管理，以滋养、平衡和重塑机体活力的方式全面提高身体功能，以达到缓解或逆转疾病。我们已成功帮助了成千上万的肿瘤（慢病）患者，我们期待能够用个性化的生活方式医学改变项目——（MCL项目）来帮助您，MCL项目有力、有效，能助您提高身体素质和机体功能，让您或您的亲人活得更好，活更得久，花费更少。</p>
			</div>
  </div>
</template>

<script>
    export default {
        name: "use_guide",
        data:()=>({

        }),
        methods:{
        	
        },
    }
</script>

<style scoped lang="scss">
  .use_guide-root{
	 min-height: 100vh;
	 background: #FFFFFF;	
	}
  .content_tit{
		font-weight: bold;
		color: #666666;
		font-size: 0.16rem;
		padding-bottom: 0.05rem;
	}
	.content{
		margin: 0 0.2rem;
		margin-top: 0.2rem;
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
</style>
