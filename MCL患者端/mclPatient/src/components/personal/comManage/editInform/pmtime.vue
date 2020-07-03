<template>
	<div>
		<mt-header fixed title="下午营业时间">
          <div slot="left">
            <header-back>
                <mt-button icon="back"></mt-button>
            </header-back>
          </div>
        </mt-header>
        <div class="trade_name">
        	<input type="text" placeholder="请输入下午营业时间" v-model="newTodoText" />
        	<p>*请输入您的下午营业时间</p>
        </div>
        <mt-button type="default" class="add_btn" size="large" @click="okbtn" style="margin-top: 0.8rem;">保存</mt-button>
	</div>
</template>

<script>
	export default {
        name: "phones",
        data:()=>({
      		newTodoText:''
        }),
        methods: {
        	okbtn(){
        		if(this.newTodoText==''){
        			this.$Toast('请填写商家名称');
        			return;
        		}
       			this.$bus.emit('add-todo','pmtime',this.newTodoText);
        		this.$router.go(-1);
        	}
        },
        mounted(){
        	let sKey = this.$route.params.sKey;
        	if(sKey=='000'){
        		this.newTodoText='';
        	}else{
        		this.newTodoText=sKey;
        	}
        }
   	}
</script>

<style scoped>
	.trade_name {
		margin-top: 47px;
	}
	.trade_name input{
		border: none;
		width: 94%;
		padding: 0 3%;
		color: #666;
		background: #fff;
		height: 0.5rem;
		font-size: 0.15rem;
	}
	.trade_name p{
		font-size: 0.14rem;
		color: #EE4242;
		margin: 0.1rem 0 0 3%;
	}
</style>