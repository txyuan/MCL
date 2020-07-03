<template>
	<div>
		<div class="fix_top">
		  <mt-header title="阶段报告" class="borderBottom">
		    <div slot="left">
		      <router-link to="/wx_Entrance/personal" style="color: initial;">
		        <mt-button icon="back"></mt-button>
		      </router-link>
		    </div>
		  </mt-header>
		</div>
		<div class="tage">
			<img src="../../../assets/images/ggdetail.png" />
			<p style="margin-top: 0.14rem;">内江市MCL中心</p>
			<p>阶段评估分析报告</p>
			<span>下载</span>
		</div>
	</div>
</template>

<script>
	export default {
	    name: "index",
	    data:() => ({
	      
	    }),
	    methods: {
	      
	    },
	    components:{
	      
	    }
	}
</script>

<style scoped lang="scss">
	.tage{
		padding: 0 3%;
		margin-top: 43px;
		img{
			width: 0.9rem;
			position: relative;
			left: 50%;
			margin-left: -0.45rem;
			margin-top: 0.86rem;
		}
		p{
			font-size: 0.16rem;
			color: #333535;
			text-align: center;
			margin-top: 0.08rem;
		}
		span{
			display: block;
			width: 100%;
			text-align: center;
			height: 0.5rem;
			line-height: 0.5rem;
			background: #F78335;
			border-radius: 4px;
			color: #fff;
			margin-top: 0.4rem;
			font-size: 0.16rem;
		}
	}
</style>
