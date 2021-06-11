<template>
	<div style="background: #fff;height: 100vh;">
		<mt-header fixed title="商家认证" style="border-bottom: 5px solid #FAFAFA;">
          <div slot="left">
            <header-back>
                <mt-button icon="back"></mt-button>
            </header-back>
          </div>
        </mt-header>
        <div class="mersub">
        	<img src="https://resource.jtsc.club/shenqingwancheng@2x.png" />
        	<h3>您的申请已提交！</h3>
        	<p>工作人员将于3个工作日内与您取得联系</p>
        	<p>请保持电话畅通</p>
        </div>
        <mt-button type="default" class="add_btn" size="large" @click="returnb">返回</mt-button>
	</div>
</template>

<script>
	export default {
        name: "submit",
        data:()=>({
        	
        }),
        methods: {
        	returnb(){
        		this.$router.push('/wx_Entrance/personal');
        	}
        }
   	}
</script>

<style scoped>
	.mersub{
		padding-top: 44px;
	}
	.mersub img{
		position: relative;
		left: 50%;
		width: 0.88rem;
		margin-left: -0.44rem;
		margin-top: 1.0rem;
	}
	.mersub h3{
		font-size: 0.16rem;
		font-weight: normal;
		text-align: center;
		margin: 0.14rem 0 0.1rem 0;
	}
	.mersub p{
		font-size: 0.13rem;
		color: #4D4C4C;
		text-align: center;
		margin-top: 0.08rem;
	}
</style>