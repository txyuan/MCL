<template>
  <div class="publish-root">
  	<div id="body_main" style="padding-bottom: 0;">
  		<mt-header title="运动禁忌须知" fixed>
		    <div slot="left">
	          <header-back>
	            <mt-button icon="back"></mt-button>
	          </header-back>
	        </div>
		</mt-header>
		
		<div class="content font14">
			<p class="title font16">运动禁忌症</p>
			<p class="li">1. 血红蛋白＜10. 0g/dl。</p> 
			<p class="li">2. 白细胞＜ 3000/ul。</p> 
			<p class="li">3. 中性粒细胞数量<0. 5x109/ml。</p> 
			<p class="li">4. 血小板数量＜50x109/ml。</p> 
			<p class="li">5. 发热体温〉38℃ (100， 4。F) 。</p> 
			<p class="li">6. 运动功能失调。</p> 
			<p class="li">7．恶病质或者体重的降低超过发病前的35％。</p> 
			<p class="li">8．限制性劳累佳呼吸困难。</p> 
			<p class="li">9．骨痛,骨骼扩散严重。</p> 
			<p class="li">10. 严重恶心。 </p> 
			<p class="note red">若有以上任一禁忌将不做运动建议</p>
		</div>
		
  	</div>  
  </div>
</template>

<script>
    export default {
        name: "publish",
        data:()=>({
			
		}),
        methods:{},
		mounted: function(){
			
		}
    }
</script>

<style scoped lang="scss">
	.content{
		height: calc(100vh - 44px);
		background: #FFF;
		padding: 0.2rem;
		box-sizing: border-box;
	}
	.title{
		margin-bottom: 0.15rem;
	}
	.note{
		margin-top: 0.1rem;
	}
	.li{
		margin-bottom: 0.05rem;
	}
</style>
