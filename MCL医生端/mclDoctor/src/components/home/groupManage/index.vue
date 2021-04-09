<template>
	<div class="">
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
			font-size: 0.15rem;
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
				font-size: 0.15rem;
				color: #333535;
				height: 0.44rem;
				line-height: 0.44rem;
        position: relative;
				img {
					height: 0.165rem;
					float: right;
					margin-right: 5%;
					margin-top: 0.13rem;
				}
			}
      li::after{
        background-color: #000;
        content: " ";
        opacity: 0.1;
        right: 0;
        bottom: 0;
        left: 0.1rem;
        height: 1px;
        position: absolute;
      }
      li:last-child::after{

        opacity: 0;
      }
    }

	}
</style>
<style>
  .mint-msgbox-btns{
    line-height: 0.42rem;
    height: 0.42rem;
  }
  .mint-msgbox-btns .mint-msgbox-cancel{
    background-color: #f5f5f5;
    color: #404040;
    font-size: 0.155rem;
  }
  .mint-msgbox-btns .mint-msgbox-confirm{
    background-color: #26a2ff;
    color: #FFFFFF;
    font-size: 0.155rem;
  }
  .mint-msgbox-input input[type=text]{
    border-width: 0 0 1px 0;
    width: 80%;
    margin: 0 auto;
    display: block;
    border-color: #999999;
    font-size: 0.155rem;
    border-radius: 0;
  }
  .mint-msgbox-message{
    font-size: 0.155rem;
    padding-top: 0.1rem;
    color: #404040;
  }
</style>
