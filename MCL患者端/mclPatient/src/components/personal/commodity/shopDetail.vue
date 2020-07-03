<template>
	<div>
		<mt-header fixed title="商品详情">
          <div slot="left">
            <header-back>
                <mt-button icon="back"></mt-button>
            </header-back>
          </div>
        </mt-header>
        <div class="shop_detail">
        	<img :src="goodsImg" />
        	<div class="shop_inform">
        		<h3>{{goodsName}}</h3>
        		<p>{{goodsContent}}</p>
        		<span>¥{{price}}</span>
        	</div>
        	<div class="shop_dd">
        		<img :src="goodsMemo" />
        	</div>
        </div>
	</div>
</template>

<script>
	export default {
        name: "shop-detail",
        data:()=>({
        	goodsName:"",  //商品名称
        	goodsContent:"",  //商品描述
        	price:"",  //价格
        	goodsImg:"",  //商品图片
        	goodsMemo:"",  //商品详情图
        	keys:''
        }),
        methods: {
        	//查询信息
        	eyeinform(){
        		let url="UserInterface/BusinessUnion/UserBusinessProductSelect.ashx";
        		let param={
        			goodskey:this.keys
        		};
        		this.$post(url,param).then((data)=>{
	              if(data.rspCode != 1){
	                return;
	              }
	              this.goodsName=data.data.goodsName;
	              this.goodsContent=data.data.goodsContent;
	              this.price=data.data.price;
	              this.goodsImg=data.data.goodsImg;
	              this.goodsMemo=data.data.goodsMemo;
	            })
        	},
        },
        mounted(){
        	let sKey = this.$route.params.sKey;
        	this.keys=sKey;
        	this.eyeinform();
        }
   	}
</script>

<style scoped>
	.shop_detail{
		padding-top: 43px;
	}
	.shop_detail img{
		width: 100%;
	}
	.shop_inform{
		padding: 0.08rem 3% 0.14rem 3%;
		background: #fff;
	}
	.shop_inform h3{
		font-size: 0.16rem;
		color: #333;
		font-weight: normal;
	}
	.shop_inform p{
		font-size: 0.14rem;
		color: #666;
		margin-top: 0.06rem;
	}
	.shop_inform span{
		display: block;
		font-size: 0.16rem;
		color: #FF7B00;
		margin-top: 0.14rem;
	}
	.shop_dd img{
		width: 100%;
	}
</style>