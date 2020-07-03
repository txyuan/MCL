<template>
	<div>
		<mt-header fixed title="商品管理">
	      	<div slot="left">
		        <router-link to="/wx_Entrance/personal"  style="color: initial">
		          	<mt-button icon="back"></mt-button>
		        </router-link>
	      	</div>
	    </mt-header>
		<div class="container">
			<ul>
				<loadMore :param="param" @triggerGetList="getshop" ref="loadMoreE" class="padding-footer">
					<li class="list-item " v-for="(item,index) in list" :key="index" data-type="0" slot="content">
						<div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip(item.goodsId)">
							<img class="list-img" :src="item.goodsImg" alt="">
							<div class="com_shopname">
								<h3>{{item.goodsName}}</h3>
								<p>{{item.price}}</p>
							</div>
						</div>
						<div class="delete">
							<span @click="deleteItem(item.goodsId)" :data-index="index">编辑</span>
							<span @click="delets(item.goodsId)" :data-index="index">删除</span>
						</div>
					</li>
				</loadMore>
			</ul>
		</div>
		<router-link :to="`/addshop/0`" class="buttons" style="z-index: 3;">
        	<mt-button type="danger" class="add_btns" size="large">添加商品</mt-button>
      	</router-link>
	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
	export default {
		name: 'index',
		data:()=>({
			param:{
				businesskey:'',
				pagesize:10,
				pagecount:0
			},
			list: [],
			startX: 0,
			endX: 0,
		}),
		methods: {
			//获取商家商品
			getshop(success){
				let url = "UserInterface/BusinessUnion/UserBusinessProductInfo.ashx";
	            this.$post(url,this.param).then((data)=>{
	                if(data.rspCode != 1 ){
	                return;
	              }
	              let modelList = data.data;
	              if(this.param.pagecount == 1){
	                this.list = [...modelList];
	              }else{
	                this.list = [...this.list,...modelList]
	              }
	              //加载更多组件触发回调
	              if(success){
	                success(modelList,this.list)
	              }
	            })
			},
			//跳转
			skip(goodsId) {
//				if(this.checkSlide()) {
//					this.restSlide();
//				} else {
//					alert('You click the slide!')
//				}
				this.$router.push('/shopDetails/'+goodsId);
			},
			//滑动开始
			touchStart(e) {
				// 记录初始位置
				this.startX = e.touches[0].clientX;
			},
			//滑动结束
			touchEnd(e) {
				// 当前滑动的父级元素
				let parentElement = e.currentTarget.parentElement;
				// 记录结束位置
				this.endX = e.changedTouches[0].clientX;
				// 左滑
				if(parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
					this.restSlide();
					parentElement.dataset.type = 1;
				}
				// 右滑
				if(parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
					this.restSlide();
					parentElement.dataset.type = 0;
				}
				this.startX = 0;
				this.endX = 0;
			},
			//判断当前是否有滑块处于滑动状态
			checkSlide() {
				let listItems = document.querySelectorAll('.list-item');
				for(let i = 0; i < listItems.length; i++) {
					if(listItems[i].dataset.type == 1) {
						return true;
					}
				}
				return false;
			},
			//复位滑动状态
			restSlide() {
				let listItems = document.querySelectorAll('.list-item');
				// 复位
				for(let i = 0; i < listItems.length; i++) {
					listItems[i].dataset.type = 0;
				}
			},
			//编辑
			deleteItem(goodsId) {
				// 当前索引
//				let index = e.currentTarget.dataset.index;
				// 复位
				this.restSlide();
				this.$router.push('/addshop/'+goodsId);
			},
			//删除
			delets(goodskey){
				let url = "UserInterface/BusinessUnion/getbusinessProductDelete.ashx";
				let param={
					goodskey:goodskey
				}
	            this.$post(url,param).then((data)=>{
	            	this.$Toast(data.rspdesc)
	                if(data.rspcode != 1 ){
	                	return;
	              	}
	              	this.param.pagecount = 0;
            		this.$refs.loadMoreE.getList();
            		this.restSlide();
	            })
			}
		},
        components:{
          loadMore
        }
	}
</script>

<style scoped>
	.container{
		width: 100%;
		overflow: hidden;
		margin-top: 43px;
		padding-bottom: 0.6rem;
	}
	.page-title {
		text-align: center;
		font-size: 0.16rem;
		padding: 10px 15px;
		position: relative;
	}
	.page-title:after {
		content: " ";
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		color: #ccc;
		-webkit-transform-origin: 0 100%;
		transform-origin: 0 100%;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		z-index: 2;
	}
	
	.list-item {
		position: relative;
		height: 0.96rem;
		-webkit-transition: all 0.2s;
		transition: all 0.2s;
		margin-top: 0.03rem;
	}
	
	.list-item[data-type="0"] {
		transform: translate3d(0, 0, 0);
	}
	
	.list-item[data-type="1"] {
		transform: translate3d(-1.4rem, 0, 0);
	}
	
	.list-item:after {
		content: " ";
		position: absolute;
		left: 0.2rem;
		bottom: 0;
		right: 0;
		height: 1px;
		color: #ccc;
		-webkit-transform-origin: 0 100%;
		transform-origin: 0 100%;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		z-index: 2;
	}
	
	.list-box {
		padding: 0.1rem 3%;
		background: #fff;
		display: flex;
		align-items: center;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		justify-content: flex-end;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	
	.list-item .list-img {
		display: block;
		width: 0.76rem;
		height: 0.76rem;
	}
	.com_shopname{
		height: 0.76rem;
	  	position: relative;
	  	flex: 1;
	  	flex-direction: column;
	  	align-items: flex-start;
	  	justify-content: center;
	  	overflow: hidden;
	}
	.com_shopname h3{
		font-size: 0.15rem;
		height: 0.4rem;
		color: #333;
		font-weight: normal;
		padding-left: 0.1rem;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2; /** 显示的行数 **/
		overflow: hidden;  /** 隐藏超出的内容 **/
	}
	.com_shopname p{
		font-size: 0.18rem;
		color: #FF3D3D;
		padding-left: 0.1rem;
		margin-top: 0.1rem;
	}
	.list-item .delete {
		width: 1.4rem;
		height: 0.96rem;
		background: #ff4949;
		font-size: 0.15rem;
		color: #fff;
		text-align: center;
		line-height: 0.96rem;
		position: absolute;
		top: 0;
		right: -1.41rem;
		overflow: hidden;
	}
	.list-item .delete span{
		display: block;
		float: left;
		width: 0.7rem;
	}
	.list-item .delete span:nth-child(1){
		background: orange;
	}
</style>