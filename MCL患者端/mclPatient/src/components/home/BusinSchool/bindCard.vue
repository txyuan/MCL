<template>
  <div style="background: #fff;height: 100vh;">
    <div id="class_header">
      <mt-header :title="title" fixed>
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
    </div>

    <div class="contant" id="content">
		<!-- <h2>放假通知</h2> -->
		<p></p>
    </div>

  </div>
</template>

<script>
  export default {
    name: "bind-card",
    data:()=>({
		title:"如何绑定银行卡"
    }),
    methods:{
		
    },
	mounted(){
		let edition = this.$route.params.order;
		if(edition=='0'){
			this.title='如何绑定银行卡';
		}else if(edition=='1'){
			this.title='如何提现';
		}else if(edition=='2'){
			this.title='如何赚取佣金';
		}else if(edition=='3'){
			this.title='如何查看已邀请好友';
		}else if(edition=='4'){
			this.title='详细说明';
		}
	}
  }
</script>

<style scoped lang="scss">
  #class_header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }
  #content{
    padding-top: 46px;
	p{
		font-size: 0.14rem;
		color: #333;
		width: 94%;
		margin: 0 auto;
		text-indent: 2em;
		border-top: 1px solid #eee;
		padding-top: 0.14rem;
		line-height: 0.22rem;
	}
  }
</style>
