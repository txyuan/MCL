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
		<p>{{message_memo}}</p>
    </div>

  </div>
</template>

<script>
  export default {
    name: "index",
    data:()=>({
		title:"公告详情",
		message_memo:""
    }),
    methods:{
    	// 公告详情
    	getMsgInfo(){
    		let url = "UserInterface/GetMessageInfo.ashx";
    		this.$post(url).then((data)=>{
    		  if(data.rspcode != 1 ){
    		    return;
    		  }
    		  this.title = data.message_name;
    		  this.message_memo = data.message_memo;
    		})
    	}
    },
	mounted(){
		this.getMsgInfo()
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
