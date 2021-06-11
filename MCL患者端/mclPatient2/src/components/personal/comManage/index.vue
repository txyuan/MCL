<template>
	<div>
		<mt-header fixed title="商家管理">
          <div slot="left">
	        <router-link to="/wx_Entrance/personal"  style="color: initial">
	          <mt-button icon="back"></mt-button>
	        </router-link>
	      </div>
       	</mt-header>
       	<div class="manage_cont">
       		<div class="manage_shop" v-if="isShow">
       			<div class="manage_inform">
	       			<img :src="businform.businessImage" />
	       			<div class="manage_name">
	       				<h3>{{businform.businessName}}</h3>
	       				<ul>
	       					<li>
	       						<span>人均消费</span>
	       						<p>¥{{businform.consumption}}</p>
	       					</li>
	       					<li class="manage_youh">
	       						<span>优惠政策</span>
	       						<p>{{businform.favouredPolicy}}</p>
	       					</li>
	       				</ul>
	       			</div>
	       		</div>
	       		<ul class="manage_list">
	       			<li>商家分类：{{businform.subjectType}}</li>
	       			<li>上午营业时间：{{businform.businessMorDate}}</li>
	       			<li>下午营业时间：{{businform.businessAfterDate}}</li>
	       			<li>商家电话：{{businform.mobilePhone}}</li>
	       			<li>商家地址：{{businform.detailedAddress}}</li>
	       			<li>商家公告：{{businform.businessNotice}}</li>
	       		</ul>
       		</div>
       		<div class="hideno" v-else>
       			<img src="https://resource.jtsc.club/sorry_img.png" />
       			<p>抱歉，您暂未上传商家信息...</p>
       		</div>
       	</div>
       	<router-link :to="`/editInform/${businstate}`" class="buttons" style="z-index: 3;">
        	<mt-button type="danger" class="add_btns" size="large">编辑商家信息</mt-button>
      	</router-link>
	</div>
</template>

<script>
	export default {
        name: "com-manage",
        data:()=>({
        	isShow:false,
        	businform:{},
        	businstate:0
        }),
        methods: {
        	//所得商品列表
			getinform() {
				let url = "UserInterface/BusinessUnion/UserBusinessDetails.ashx";
				this.$post(url).then((data) => {
					if(data.rspCode != 1) {
						return;
					}
					if(data.flag==0){
						this.isShow=false
						this.businstate=0;
					}else{
						this.isShow=true;
						this.businform=data.business;
						this.businstate=data.business.businessId;
					}
					
				})
			}
        },
        mounted(){
        	this.getinform();
        }
   	}
</script>

<style scoped>
	.manage_cont{
		padding-top: 44px;
		margin-top: 0.03rem;
	}
	.manage_shop{
		width: 94%;
		padding: 0.1rem 3%;
		background: #fff;
	}
	.manage_inform{
		overflow: hidden;
		padding-bottom: 0.22rem;
		border-bottom: 1px solid #ddd;
	}
	.manage_inform img{
		width: 1.1rem;
		height: 1.1rem;
		float: left;
		border: 1px solid #eee;
	}
	.manage_inform .manage_name{
		float: right;
		width: 60%;
	}
	.manage_name h3{
		font-size: 0.14rem;
		color: #333;
		font-weight: normal;
		padding-top: 0.1rem;
	}
	.manage_name ul{
		overflow: hidden;
		margin-top: 0.24rem;
	}
	.manage_name ul li{
		width: 50%;
		float: left;
		border-right: 1px solid #ddd;
		box-sizing: border-box;
	}
	.manage_name ul li span{
		width: 90%;
		text-align: center;
		display: block;
		color: #999999;
		font-size: 0.13rem;
	}
	.manage_name ul li p{
		color: #333;
		font-size: 0.14rem;
		margin-top: 0.04rem;
		text-align: center;
	}
	.manage_name ul li.manage_youh{
		border-right: none;
	}
	.manage_name ul li.manage_youh p{
		font-size: 0.12rem;
	}
	.manage_name ul li.manage_youh span{
		margin-right: 0.08rem;
	}
	.manage_list{
		font-size: 0.15rem;
		color: #333;
		padding-top: 0.1rem;
	}
	.manage_list li{
		margin-top: 0.02rem;
		line-height: 0.28rem;
	}
	
	.hideno img{
		width: 0.56rem;
		display: block;
		margin: 0 auto;
		margin-top: 0.5rem;
	}
	.hideno p{
		text-align: center;
		margin-top: 0.2rem;
		font-size: 0.12rem;
		color: #666;
	}
</style>