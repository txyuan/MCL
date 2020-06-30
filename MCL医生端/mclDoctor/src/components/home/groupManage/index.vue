<template>
	<div class="person_data_root">
		<mt-header title="分组管理">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="group">
			<p @click="addgroup">新建分组</p>
			<ul>
				<li v-for="(item,index) in list" :key="index">
					{{item.groupname}}
					<img src="@/assets/images/groupdel.png" @click="delgroup(item.groupskey)" style="margin-right: 2%;" v-if="item.groupname !== '未设置分组'"/>
					<img src="@/assets/images/groupedit.png" @click="editgroup(item.groupskey)" v-if="item.groupname !== '未设置分组'"/>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		data: () => ({
			list: [],
			aa:'111'
		}),
		methods: {
			// 获取分组
			getgroup() {
				let url = "UserInterface/doctor/GroupingManageInfo.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.list = data.data;
				})
			},
			addgroup() {
				this.$MessageBox.prompt('请输入分组名称').then(({
					value,
					action
				}) => {
					let url = "UserInterface/doctor/InsertGroupingManage.ashx";
					let param = {
						groupname: value
					};
					this.$post(url, param).then((data) => {
						this.$Toast(data.rspdesc);
						if (data.rspcode != 1) {
							return;
						}
						this.getgroup();
					})
				});
			},
			// 删除分组
			delgroup(groupskey) {
				this.$MessageBox.confirm('确定删除此分组么?').then(action => {
					let url = "UserInterface/doctor/DeleteGrouping.ashx";
					let param={
						groupskey:groupskey
					};
					this.$post(url,param).then((data) => {
						this.$Toast(data.rspdesc);
						if (data.rspcode != 1) {
							return;
						}
						this.getgroup();
					})
				})
				
			},
			// 修改分组
			editgroup(groupskey) {
				// this.$MessageBox({
				// 	title: '提示',
				// 	message: '确定执行此操作?',
				// 	showCancelButton: true,
				// 	showInput:true,
				// 	inputValue:'1111'
				// }).then((l) => {
				// 	console.log(l)
				// });
				this.$MessageBox.prompt('修改分组名称').then(({
					value,
					action
				}) => {
					let url = "UserInterface/doctor/ModifyGrouping.ashx";
					let param = {
						groupskey:groupskey,
						groupname: value
					};
					this.$post(url, param).then((data) => {
						this.$Toast(data.rspdesc);
						if (data.rspcode != 1) {
							return;
						}
						this.getgroup();
					})
				});
			},
		},
		mounted() {
			this.getgroup();
		}
	}
</script>

<style scoped lang="scss">
	.group {
		p {
			margin-top: 0.1rem;
			width: 92%;
			padding: 0 4%;
			font-size: 0.14rem;
			color: #333535;
			height: 0.44rem;
			line-height: 0.44rem;
			background: #fff url(../../../assets/images/next.png) no-repeat 97% center;
			background-size: 0.24rem;
		}

		ul {
			margin-top: 0.1rem;

			li {
				width: 92%;
				padding: 0 4%;
				background: #fff;
				font-size: 0.14rem;
				color: #333535;
				height: 0.44rem;
				line-height: 0.44rem;
				border-bottom: 1px solid #DFE6E7;

				img {
					height: 0.18rem;
					float: right;
					margin-right: 5%;
					margin-top: 0.13rem;
				}
			}
		}
	}
</style>
