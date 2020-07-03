<template>
	<div>
		<mt-header fixed title="商家公告">
          <div slot="left">
            <header-back>
                <mt-button icon="back"></mt-button>
            </header-back>
          </div>
        </mt-header>
        <div class="trade_name">
        	<div class="trade_text">
        		<textarea placeholder="商家公告" v-model="names"></textarea>
        	</div>
        	<p>*请输入您的商家公告</p>
        </div>
        <mt-button type="default" class="add_btn" size="large" @click="okbtn" style="margin-top: 0.8rem;">保存</mt-button>
	</div>
</template>

<script>
	export default {
        name: "busineshow",
        data:()=>({
        	names:''
        }),
        methods: {
        	okbtn(){
        		if(this.names==''){
        			this.$Toast('请填写商家公告');
        			return;
        		}
        		this.$bus.emit('add-todo','businessNotice',this.names);
        		this.$router.go(-1);
        	}
        },
        mounted(){
        	let sKey = this.$route.params.sKey;
        	if(sKey=='000'){
        		this.names='';
        	}else{
        		this.names=sKey;
        	}
        }
   	}
</script>

<style scoped>
	.trade_name {
		margin-top: 47px;
	}
	.trade_text{
		width: 94%;
		height: 0.7rem;
		padding: 0 3%;
		background: #fff;
	}
	.trade_name textarea{
		border: none;
		min-width: 100%;
		max-width: 100%;
		resize: none;
		color: #666;
		margin-top: 0.1rem;
		min-height: 0.5rem;
		max-height: 0.5rem;
		line-height: 0.22rem;
		font-size: 0.15rem;
	}
	.trade_name p{
		font-size: 0.14rem;
		color: #EE4242;
		margin: 0.1rem 0 0 3%;
	}
</style>