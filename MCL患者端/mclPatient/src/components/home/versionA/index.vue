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

    <div class="contant" id="content">
		<loadMore :param="param" @triggerGetList="getAdrList" ref="loadMoreE">
			<div class="vea_ul" slot="content">
				<div class="vea_list" v-for="(item,index) in list" :key="index">
					<router-link :to="`/classdetail/${item.goodsId}`" class="img_wrap"><img :src="item.goodsImage" /></router-link>
					<h3>{{item.goodsName}}</h3>
					<p>
						<span>¥ {{item.price}}</span>
						<router-link :to="`/classdetail/${item.goodsId}`" class="img_wrap"><label>立即抢购</label></router-link>
					</p>
				</div>
			</div>
		</loadMore>
    </div>

  </div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
	
  export default {
    name: "versionIndex",
    data:()=>({
			title:"A版",
			param : {
				"pagesize": 10,
				"pagecount": 0
			},
			list:[]
    }),
    methods:{
    	//商品列表
    	getAdrList(success){
    	  let url = "UserInterface/user/GetProductAList.ashx";
    	  if(this.param.pagecount == 1){
    	    this.list = [];
    	  }
    	  this.$post(url,this.param).then((data)=>{
    	    if(data.rspcode != 1 ){
    	      return;
    	    }
    	    let modelList = data.goodsList;
    	    this.list = [...this.list,...modelList]
    	    //加载更多组件触发回调
    	    if(success){
    	      success(modelList,this.list)
    	    }
    	  })
    	}
    },
	mounted(){
	  
	},
	components:{
	  loadMore
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
	.vea_list{
		padding: 2% 0.1rem;
		background: #fff;
		margin-top: 0.1rem;
		img{
			width: 100%;
		}
		h3{
			width: 90%;
			margin-left: 2%;
			font-weight: 600;
			font-size: 0.16rem;
			text-overflow: ellipsis;
			overflow:hidden;
			white-space: nowrap;
			margin-top: 0.1rem;
		}
		p{
			overflow: hidden;
			margin-top: 0.14rem;
			span{
				font-size: 0.2rem;
				color: #FF3D3D;
				float: left;
				line-height: 0.28rem;
				margin-left: 2%;
			}
			label{
				width: 0.8rem;
				height: 0.28rem;
				font-size: 0.13rem;
				display: block;
				background: #FF913D;
				border-radius: 0.14rem;
				float: right;
				color: #fff;
				text-align: center;
				line-height: 0.28rem;
			}
		}
	}
</style>
