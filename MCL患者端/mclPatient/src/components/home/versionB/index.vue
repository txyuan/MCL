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
		<div class="veas_ul">
			<div v-for="(item,index) in lists" :key="index" :class="[item.proDistinguish=='01'?veas_list:vea_list]" v-if="">
				<router-link :to="`/versionBdetail/${item.goodsId}`" class="img_wrap"><img :src="item.goodsImage" /></router-link>
				<h3>{{item.goodsName}}</h3>
				<p>
					<span style="font-size: 0.14rem;"><i style="font-style: normal;">会员：</i>¥{{item.price}}+{{item.BSpendingTicket}}券</span>
				</p>
				<p style="margin-top: 0.04rem;">
					<span style="font-size: 0.12rem;color: #333;"><i style="font-style: normal;">市场价：</i>¥ {{item.marketPrice}}</span>
					<router-link :to="`/versionBdetail/${item.goodsId}`" class="img_wrap"><label>立即抢购</label></router-link>
				</p>
			</div>
		</div>
		<p class="bpq">爆 / 品 / 区</p>
		<loadMore :param="param" @triggerGetList="getAdrList" ref="loadMoreE">
			<div class="veas_ul veas_ulb" slot="content">
				<div class="veas_list" v-for="(item,index) in list" :key="index">
					<router-link :to="`/versionBdetail/${item.goodsId}`" class="img_wrap"><img :src="item.goodsImage" /></router-link>
					<h3>{{item.goodsName}}</h3>
					<!-- <p>
						<span style="font-size: 0.14rem;"><i style="font-style: normal;">会员：</i>¥{{item.price}}+{{item.BSpendingTicket}}券</span>
					</p> -->
					<p style="margin-top: 0.04rem;">
						<span style="font-size: 0.12rem;color: #FF3D3D;"><i style="font-style: normal;">抢购价：</i>¥ {{item.marketPrice}}</span>
						<router-link :to="`/versionBdetail/${item.goodsId}`" class="img_wrap"><label>立即抢购</label></router-link>
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
		title:"B版",
		veas_list:'veas_list',
		vea_list:'vea_list',
		lists:[],
		param : {
		  "pagesize": 10,
		  "pagecount": 0
		},
		list:[]
    }),
    methods:{
		//商品列表
    	getAdrLists(){
    	  let url = "UserInterface/user/GetProductBList.ashx";
		  let param={
		    "pagesize": 10000,
		    "pagecount": 1
		  };
    	  this.$post(url,param).then((data)=>{
    	    if(data.rspcode != 1 ){
    	      return;
    	    }
    	    this.lists = data.goodsList;
    	  })
    	},
		//爆品区
		getAdrList(success){
		  let url = "UserInterface/user/GetExplosiveProductBList.ashx";
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
		this.getAdrLists();
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
  .veas_ul{
	  width: 100%;
	  overflow: hidden;
	  // padding: 0 2.5%;
	  .veas_list{
		  width: 47%;
		  background: #fff;
		  float: left;
		  border-radius: 8px;
		  padding-bottom: 0.12rem;
		  margin:0.06rem 0 0 2%;
		  img{
			  width: 100%;
			  height: 1.74rem;
		  }
		  h3{
			  font-weight: normal;
			  font-size: 0.15rem;
			  width: 90%;
			  margin: 0 auto;
			  height: 0.2rem;
			  margin-top: 0.06rem;
			  word-break: break-all;
			  text-overflow: ellipsis;
			  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
			  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
			  -webkit-line-clamp: 1; /** 显示的行数 **/
			  overflow: hidden;  /** 隐藏超出的内容 **/
		  }
		  p{
			  width: 90%;
			  margin: 0 auto;
			  margin-top: 0.08rem;
			  overflow: hidden;
			  span{
				  color: #FF3D3D;
				  font-size: 0.16rem;
				  line-height: 0.24rem;
			  }
			  label{
				  width: 0.78rem;
				  height: 0.24rem;
				  font-size: 0.12rem;
				  display: block;
				  background: #FF913D;
				  border-radius: 0.13rem;
				  float: right;
				  color: #fff;
				  text-align: center;
				  line-height: 0.24rem;
			  }
		  }
	  }
  }
	.vea_list{
		width: 96%;
		padding: 2% 2%;
		background: #fff;
		clear: both;
		float: left;
		margin-top: 0.06rem;
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
	.bpq{
		width: 100%;
		height: 0.48rem;
		background: url(../../../assets/images/bpq.png) no-repeat center center;
		background-size: 100%;
		color: #fff;
		text-align: center;
		line-height: 0.48rem;
		font-size: 0.18rem;
		margin-top: 0.1rem;
	}
	.veas_ulb{
		padding-bottom: 0.08rem;
		.veas_list{
			border: 1px solid #FF913D;
			box-sizing: border-box;
			overflow: hidden;
		}
	}
</style>
