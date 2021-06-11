<template>
	<div style="position: relative;">
		<!-- 导航条 -->
		<div class="navbar icon" :class="{'noFixed': !isFixed}">
			<ul>
				<li v-for="(item,index) in navList" :key="index" @click="navClick(item,index)">
					<p :class="{active: (index == current),price: ((index == 2)||(index == 3)),down: ((index == 2)||(index == 3)) && item.className.isDown}">{{item.name}}</p>
				</li>
			</ul>
		</div>

		<!-- 遮罩  -->
		<div id="mark" :class="{'noFixed': !isFixed}" @click="hideMark" ref="mark" style="top: 87px">
			<div class="content classificationContent ulol" @click.stop="">
				<ul ref="element">
					<li v-for="(item,index) in listlarge" :key="index" @click="navLeft(item,index)" :class="{ actv: item.sKey == param.firstSubjectType }">{{item.name}}</li>
				</ul>
				<ol ref="elemento">
					<li v-for="(item,index) in listsmall" :key="index" @click="navRigt(item,index)" :class="{ actve: item.sKey == param.secondSubjectType}">{{item.name}}</li>
				</ol>
			</div>
		</div>
	</div>

</template>

<script>
	import { GetProductCategoryList } from "@/api/shopCar.js"
	import searchItem from "@/components/common/navbarContentItem.vue"; //item
	export default {
		name: "navbar",
		props: ['param','isFixed'],
		data: () => ({
			navList: [{
					name: "为您推荐",
					id: 0
				},
				{
					name: "选择分类",
					list: [],
					current: "-1",
					id: 1
				},
				{
					name: "价格",
					id: 2,
					className: {
						isDown: true
					}
				},
				{
					name: "销量",
					id: 3,
					className: {
						isDown: true
					}
				}
			],
			current: 0,
			listlarge:[
				// {id:1,cnamel:'分类一'},
				// {id:2,cnamel:'分类二'},
				// {id:1,cnamel:'分类一'},
				// {id:2,cnamel:'分类二'},
			],
			listsmall:[
				// {id:1,cnamel:'子类一'},
				// {id:2,cnamel:'子类二'},
				// {id:2,cnamel:'子类三'},
			],
			height:'',
			heighto:''
		}),
		methods: {
			//nav 的点击效果
			navClick(item, index) {
				this.current = index;
				this.hideMark();
				//默认   重置筛选条件
				if (item.id == 0) {
					this.resetParentParam();
				}
				//选择分类
				if (item.id == 1) {
					this.showMark();
				}

				//价格
				if (item.id == 2) {
					item.className.isDown = !item.className.isDown;
					if (item.className.isDown) { //打开向下
						this.param.priceOrder = 0;
					} else { //打开向上
						this.param.priceOrder = 1;
					}
					//销量置空
					this.param.saleorder = "";
				} else {
					this.navList[2].className.isDown = true
				}

				//销量
				if (item.id == 3) {
					item.className.isDown = !item.className.isDown;
					if (item.className.isDown) { //打开向下
						this.param.saleorder = 0;
					} else { //打开向上
						this.param.saleorder = 1;
					}
					//价格置空
					this.param.priceOrder = "";
				} else {
					this.navList[3].className.isDown = true
				}

				//默认，价格，销量需要触发重新加载
				if (item.id != 1) {
					this.$emit("triggerLoad"); //触发重新加载
				}
			},
			//重置筛选条件
			resetParentParam() {
				this.$emit("resetParam");
				this.navList[1].current = "-1";
			},
			//隐藏遮罩
			hideMark() {
				var $mark = this.$refs.mark;
				$mark.style.display = "none"
			},
			//显示遮罩
			showMark() {
				var $mark = this.$refs.mark;
				$mark.style.display = "block"
			},
			// 选择分类一级
			async listitem(){
				const data = await GetProductCategoryList();
				this.listlarge = data.list;
				return data
			},
			// 选择分类二级
			async listitemt(sKey) {
				let param = {
					firstCategorysKey: sKey,
					pagesize: 99999999,
					pagecount: 1
				}
				const data = await GetProductCategoryList(param);
				this.listsmall = data.list;
			},
			navLeft(item){
				this.param.firstSubjectType = item.sKey
				this.listitemt(item.sKey);
			},
			navRigt(item){
				this.param.secondSubjectType = item.sKey;
				this.$emit("triggerLoad"); //触发重新加载
				this.hideMark();
			},
		},
		created() {
			const {firstSubjectType} = this.param
			this.listitem().then(() => {
				if(firstSubjectType){
					this.listitemt(firstSubjectType)
				}
			})
		},
		components: {
			searchItem
		}
	}
</script>
<style scoped lang="scss">
	
	.navbar.icon>ul li:first-child>p {
		background: none;
	}
	.navbar.icon{
		// border-bottom: 1px solid #eee;
		box-sizing: border-box;
		position: fixed;
		width: 100%;
		left: 0;
		top: 42px;
		z-index: 99;
	}
	.navbar.icon.noFixed{
		position: initial;
	}
	#mark.noFixed{
		top: initial !important;
		bottom: initial !important;
		position: absolute;
		height: 2000px;
	}
	.ulol{
		width: 100%;
		padding: 0;
		overflow: hidden;
	}
	.ulol ul{
		width: 50%;
		margin: 0;
		height: 3.0rem;
		overflow-y: auto;
		background: #fff;
		float: left;
		li{
			height: 0.4rem;
			text-align: center;
			font-size: 0.14rem;
			line-height: 0.4rem;
			&.actv{
				background: #FAFAFA;
				color: #0ac5ca;
			}
		}
	}
	.ulol ol{
		background: #FAFAFA;
		width: 50%;
		height: 3.0rem;
		overflow-y: auto;
		float: right;
		li{
			height: 0.4rem;
			text-align: center;
			font-size: 0.14rem;
			line-height: 0.4rem;
			list-style: none;
			&.actve{
				color: #0ac5ca;
			}
		}
	}
</style>
