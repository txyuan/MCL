<template>
	<div>
		<mt-header title="聊天设置">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<router-link to="/chatCenter" style="overflow: hidden;display: block;">
			<div class="person_info">
				<img :src="inform.img" style="width:0.5rem;height:0.5rem;border-radius: 0.25rem">
				<div class="info">
					<p class="name" style="font-size: 0.15rem;">{{inform.patientname}}</p>
					<p class="tel" style="font-size: 0.12rem;color: #7D8182;">{{inform.sex}} {{inform.age}} {{inform.diseasedondition}}</p>
				</div>
				<div class="person_type">
					<!-- <span>主任医师</span> -->
					<i class="mint-cell-allow-right"></i>
				</div>
			</div>
		</router-link>
		<div class="movegroup">
			<mt-popup v-model="popupVisible" position="right" :modal="false">
				<div name="solt">
					<mt-header title="移动分组"><mt-button slot="right" @click.native="noedel()" style="font-size: 0.14rem;">取消</mt-button></mt-header>
					<ul class="choosegroup">
						<li v-for="(item,index) in list" :key="index" @click="addClass(index,item)" :class="{actie:index==current}">{{item.groupname}}</li>
					</ul>
				</div>
			</mt-popup>
		</div>
		
		<mt-cell title="移动分组" is-link @click.native="moveggop"></mt-cell>
		<p class="empty">清空聊天记录</p>
		<span class="delfrid">删除好友</span>
	</div>
</template>

<script>
	export default {
		name: "index",
		data: () => ({
			inform:{},
			popupVisible:false,
			list: [],
			current:-1,
			hzskey:'',  //患者key
		}),
		methods: {
			// 获取患者信息
			getinform(){
				let url = "UserInterface/doctor/PatientEssentialInfo.ashx";
				let param = {
					patientskey:this.hzskey
				}
				this.$post(url, param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.inform=data;
				})
			},
			moveggop(){
				this.popupVisible=true;
			},
			noedel(){
				this.popupVisible=false;
			},
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
			addClass(index,item){
				this.current=index;
				let url = "UserInterface/doctor/PatientModificationGroup.ashx";
				let param={
					patientskey:this.hzskey,
					groupskey:item.groupskey,
					groupname:item.groupname
				};
				this.$post(url,param).then((data) => {
					this.$Toast(data.rspdesc);
					if (data.rspcode != 1) {
						return;
					}
					this.popupVisible=false;
				})
			},
		},
		mounted() {
			this.getinform();
			this.getgroup();
		},
		created() {
			this.hzskey = this.$route.query.skey;
		}
	}
</script>

<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	//头像部分
	.person_info {
		margin-top: 0.1rem;
		padding: 0.1rem 0.10rem;
		background: #ffffff;
		display: flex;
		position: relative;
		margin-bottom: 0.1rem;

		img {
			margin-right: 0.10rem;
		}

		.info {
			flex: 1;
			height: 52px;
			display: flex;
			flex-wrap: wrap;
			align-content: space-around;

			&>p {
				width: 100%;
				font-size: 0.18rem;
				color: $color40;
			}

			&>p.name {
				@include ellipsis(1);
			}
		}

		.person_type {
			line-height: 64px;
			padding-right: 28px;
			color: $color40;
		}

		.person_type span {
			height: 0.28rem;
			border-radius: 0.14rem;
			line-height: 0.28rem;
			color: #fff;
			width: 0.8rem;
			display: inline-block;
			font-size: 0.13rem;
			text-align: center;
			background-image: linear-gradient(to right, #F39645, #F46F42);
		}
	}

	.empty {
		color: #4A8EF4;
		font-size: 0.14rem;
		height: 0.45rem;
		line-height: 0.45rem;
		background: #fff;
		margin-top: 0.1rem;
		padding-left: 3%;
	}

	.delfrid {
		display: block;
		color: #FF3D3D;
		font-size: 0.14rem;
		height: 0.45rem;
		line-height: 0.45rem;
		background: #fff;
		margin-top: 0.1rem;
		text-align: center;
	}
	.choosegroup{
		padding: 0 3%;
		li{
			width: 96%;
			padding: 0 2%;
			height: 0.4rem;
			line-height: 0.4rem;
			border-bottom: 1px solid #eee;
			font-size: 0.14rem;
			&.actie{
				background: url(./../../../assets/images/duigou.png) no-repeat 96% center;
				background-size: 0.2rem;
			}
		}
	}
</style>
