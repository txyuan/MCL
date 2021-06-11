<template>
  <div>
    <div id="class_header">
      <mt-header :title="title" fixed>
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
    </div>

    <div class="busschil" id="content">
		<img src="../../../assets/images/zhibo.png" />
		<div class="buss_ul">
			<router-link to="bindCard/0">
				<p>
					<span>如何绑定银行卡</span>
				</p>
			</router-link>
			<router-link to="bindCard/1">
				<p>
					<span>如何提现</span>
				</p>
			</router-link>
			<router-link to="bindCard/2">
				<p>
					<span>如何赚取佣金</span>
				</p>
			</router-link>
			<router-link to="bindCard/3">
				<p>
					<span>如何查看已邀请好友</span>
				</p>
			</router-link>
		</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "index",
    data:()=>({
		title:"商学院",
		
    }),
    methods:{
    	
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
  }
  .busschil{
	  img{
		  width: 100%;
		  margin-top: 0.06rem;
	  }
	  .buss_ul{
		  margin-top: 0.06rem;
		  p{
			  width: 100%;
			  height: 0.5rem;
			  background: #fff url(../../../assets/images/jiantou@2x.png) no-repeat 98% center;
			  background-size: 0.26rem;
			  border-bottom: 1px solid #eee;
			  span{
				  display: block;
				  height: 0.5rem;
				  line-height: 0.5rem;
				  margin-left: 2.5%;
				  padding-left: 0.28rem;
				  color: #333;
				  background: url(../../../assets/images/wenti@2x.png) no-repeat left center;
				  background-size: 0.18rem;
			  }
		  }
	  }
  }
	
</style>
