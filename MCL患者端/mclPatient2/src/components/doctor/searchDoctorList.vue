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
				<div class="adrName font12" @click="city">杭州</div>
				<input type="text" placeholder="搜索附近医生" v-model="param.DoctorName" />
				<div class="canel font12" @click="oksearch">确认</div>
			</div>

			<div class="doclist">
				<loadMore :param="param" @triggerGetList="shoplist" ref="loadMoreE" :isDefaultLoading="false">
					<div slot="content">
						<router-link tag="div" v-for="(item,index) in list" :to="`/doctorInfo/`+item.DoctorsKey" :key="index">
							<mt-cell class="borderBottom" is-link>
								<img slot="icon" :src="item.DoctorImg" width="46" height="46">
								<div slot="title" class="titleWrap">
									<span class="mint-cell-text">{{item.DoctorName}}<label v-if="item.Recommend!=''">{{item.Recommend}}</label></span>
									<span class="mint-cell-label font12 huiFont99">{{item.Abbreviation}}</span>
								</div>
							</mt-cell>
						</router-link>
					</div>
				</loadMore>
			</div>

		</div>
	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	export default {
		name: "searchDoctorList",
		data: () => ({
			param: {
				City: '内江市',
				DoctorName: '',
				"pagesize": 10,
				"pagecount": 0,
			},
			list: []
		}),
		methods: {
			city() {
				//this.$router.push("/cityList")
				
			},
			oksearch(){
				this.param.pagecount = 0;
				this.$refs.loadMoreE.getList();
			},
			// 获取医生
			shoplist(success) {
				let url = "UserInterface/GetDoctorInfoList.ashx";
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

		span {
			line-height: 0.21rem;
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

	#body_main {
		height: 100vh;
		position: relative;
		box-sizing: border-box;
	}

	.search-group {
		height: 0.44rem;
		position: absolute;
		top: 43px;
		left: 0;
		right: 0;
		margin: auto;
		background: #FFFFFF;
		border-radius: 5px;
		padding: 0 0.15rem;
		display: flex;
		justify-content: space-between;
		align-items: center;

		input {
			flex: 1;
			margin-right: 10px;
			margin-left: 10px;
			border: none;
			border-left: 1px solid #DDDDDD;
			border-right: 1px solid #DDDDDD;
			padding: 0 0.1rem;
			line-height: 0.20rem;
			height: 0.20rem;
		}
	}

	.search-group>* {
		vertical-align: middle;
		display: inline-block;
	}

	.adrName {
		width: 0.35rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding-right: 0.15rem;
		background: url("../../assets/images/shaixuan_xia@2x.png") no-repeat right center;
		background-size: 0.15rem;
	}

	.doclist {
		position: absolute;
		top: 105px;
		left: 15px;
		right: 15px;
		bottom: 15px;
		background: #FFFFFF;
		overflow: hidden;
		overflow-y: scroll;
		box-shadow:0px 2px 4px 0px rgba(0,0,0,0.5);
	}

	.doclist a {
		padding: 10px 0;
	}
</style>
