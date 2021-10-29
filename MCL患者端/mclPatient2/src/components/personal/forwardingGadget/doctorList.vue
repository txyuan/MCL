<template>
	<div class="searchDoctorList-root">
		<div id="body_main" style="padding-bottom: 0;">
			<mt-header title="查找医生" fixed>
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>

			<div class="search-group">
				<input type="text" placeholder="请输入医生姓名" v-model="param.name" />
				<div class="canel font12" @click="oksearch">搜索</div>
			</div>

			<div class="doclist">
				<loadMore :param="param" @triggerGetList="shoplist" ref="loadMoreE" :isDefaultLoading="false">
					<div slot="content">
						<div v-for="(item,index) in list" :key="index" @click="checkIndex = index">
							<mt-cell class="borderBottom" :class="{'active': index == checkIndex}">
								<img slot="icon" src="@/assets/images/doctorPic.png" width="46" height="46">
								<div slot="title" class="titleWrap">
									<span class="mint-cell-text">{{item.name}}</span>
									<span class="mint-cell-label font12 huiFont99">{{item.phone}}</span>
								</div>
							</mt-cell>
						</div>
					</div>
				</loadMore>
			</div>

			<div class="fix_bottom">
        <mt-button type="primary" class="theme-button" size="large" @click.native="confirm">保存</mt-button>
      </div>
		</div>
	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	import bus from "@/utils/bus.js"
	export default {
		name: "searchDoctorList",
		data: () => ({
			param: {
				"pagesize": 10,
				"pagecount": 0,
				"name": ""
			},
			list: [],
			checkIndex: -1,
		}),
		methods: {
			oksearch(){
				this.param.pagecount = 0;
				this.$refs.loadMoreE.getList();
			},
			// 获取医生
			shoplist(success) {
				let url = "UserInterface/doctor/GetDoctorList.ashx";
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					let modelList = data.data;
					if (this.param.pagecount == 1) {
						this.list = [...modelList];
					} else {
						this.list = [...this.list, ...modelList]
					}
					//加载更多组件触发回调
					if (success) {
						success(modelList, this.list)
					}
				})
			},
			confirm(){
				if(this.checkIndex == -1){
					this.$Toast('请选择医生')
					return
				}
				bus.$emit("checkDoctor", this.list[this.checkIndex])
				this.$router.back()
			}
		},
		mounted: function(){
			this.param.pagecount = 0;
			this.$refs.loadMoreE.getList();
			
		},
		components: {
			loadMore
		}
	}
</script>

<style scoped lang="scss">
	.titleWrap {
		display: inline-block;
		line-height: 0.2rem;
		vertical-align: middle;
		margin-left: 0.05rem;
		
		span {
			line-height: 0.21rem;
		}
		>>> .mint-cell-label{
			margin-top: 3px;
		}
		label {
			display: inline-block;
			padding: 0 0.1rem;
			background: #F78335;
			font-size: 0.12rem;
			height: 0.2rem;
			line-height: 0.2rem;
			text-align: center;
			color: #fff;
			border-radius: 0.1rem;
			margin-left: 0.14rem;
		}
	}

	>>> .mint-cell{
		.mint-cell-right::before{
			content: "";
			display: inline-block;
			width: 0.26rem;
			height: 0.26rem;
			border: 1px solid #ddd;
			border-radius: 0.25rem;
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0.1rem;
			margin: auto;
		}
		&.active .mint-cell-right::before{
			content: "✓";
			color: #0ac5ca;
			text-align: center;
			line-height: 0.26rem;
			border-color: #0ac5ca;
		}
	} 

	#body_main {
		height: 100vh;
		position: relative;
		box-sizing: border-box;
	}

	.search-group {
		height: 0.4rem;
		position: absolute;
		top: 53px;
		left: 0.1rem;
		right: 0.1rem;
		margin: auto;
		background: #fff;
		border: 1px solid #DDDDDD;
		border-radius: 5px;
		padding: 0 0.08rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 0.22rem;

		input {
			flex: 1;
			border: none;
			padding: 0 0.15rem;
			line-height: 0.20rem;
			height: 0.20rem;
		}
		.canel{
			display: inline-block;
			width: 0.6rem;
			line-height: 0.3rem;
			text-align: center;
			color: #FFFFFF;
			background: #0ac5ca;
			border-radius: 0.15rem;
		}
	}

	.search-group>* {
		vertical-align: middle;
		display: inline-block;
	}

	// .adrName {
	// 	width: 0.35rem;
	// 	overflow: hidden;
	// 	white-space: nowrap;
	// 	text-overflow: ellipsis;
	// 	padding-right: 0.15rem;
	// 	// background: url("../../assets/images/shaixuan_xia@2x.png") no-repeat right center;
	// 	background-size: 0.15rem;
	// }

	.doclist {
		position: absolute;
		top: 105px;
		left: 0.12rem;
		right: 0.12rem;
		bottom: 70px;
		background: #FFFFFF;
		overflow: hidden;
		overflow-y: scroll;
		padding: 0 0.1rem;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 0.04rem;
		// box-shadow:0px 2px 4px 0px rgba(0,0,0,0.5);
	}

	.doclist a {
		padding: 10px 0;
	}

	.fix_bottom {
		background: #ffffff;
		padding: 0.075rem 0.15rem;
	}
</style>
