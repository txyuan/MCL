<template>
	<div>
		<div class="sear_head">
			<img src="@/assets/images/return.png" @click="backret" />
			<div class="sear_header">
				<input type="text" v-model="valuz" />
				<span @click="getpathz">搜索</span>
			</div>
		</div>
		<div class="seac_cont">
			<div class="home_ul">
				<div class="home_list">
					<ul>
						<li v-for="(items,i) in clists" :key="i">
							<router-link :to="'/chatCenter?skey='+items.patientskey">
								<img :src="items.imgurl" />
								<div class="home_li">
									<span>
										<i>{{items.patientname}}</i>
										<u>{{items.createdate}}</u>
									</span>
									<label>{{items.sex}} {{items.age}} {{items.diseasetype}}</label>
								</div>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	    name: "index",
	    data:()=>({
			valuz:'',
			clists:[]
		}),
		methods:{
			getpathz(){
				if(this.valuz==''){
					return;
				}
				let url = "UserInterface/doctor/PatientSearchList.ashx";
				let param={
					name:this.valuz
				};
				this.$post(url,param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.clists=data.data;
				})
			},
			backret(){
				this.$router.back();
			}
		},
		mounted(){
			
		}
	}
</script>

<style scoped lang="scss">
	.sear_head{
		width: 93%;
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		height: 0.44rem;
		overflow: hidden;
		padding: 0 5% 0 2%;
		img{
			height: 0.22rem;
			margin-top: 0.11rem;
		}
		.sear_header{
			width: 90%;
			float: right;
			height: 0.32rem;
			background: #eee;
			border-radius: 0.18rem;
			margin-top: 0.06rem;
			input{
				width: 72%;
				height: 0.32rem;
				border: none;
				padding-left: 5%;
				color: #666;
			}
			span{
				float: right;
				font-size: 0.14rem;
				line-height: 0.32rem;
				display: block;
				margin-right: 5%;
				color: #666;
				border-left: 1px solid #ddd;
				padding-left: 4%;
			}
		}
		
	}
	.seac_cont{
		padding-top: 0.5rem;
	}
	.home_ul {
		background: #fff;
		padding: 0 2%;
		.home_list {
			border-top: 1px solid #DFE6E7;
	
			&:first-child {
				border-top: none;
			}
	
			
		}
	
		ul {
			li {
				height: 0.68rem;
				border-bottom: 1px solid #DFE6E7;
	
				img {
					display: block;
					float: left;
					width: 0.54rem;
					height: 0.54rem;
					border-radius: 0.27rem;
					margin-left: 0.1rem;
					margin-top: 0.07rem;
				}
	
				.home_li {
					width: 76%;
					float: left;
					margin-left: 3%;
					margin-top: 0.07rem;
	
					span {
						width: 100%;
						display: block;
						overflow: hidden;
						padding-top: 0.04rem;
	
						i {
							float: left;
							font-style: normal;
							color: #333535;
							font-size: 0.15rem;
						}
	
						u {
							float: right;
							text-decoration: none;
							color: #7D8182;
							font-size: 0.13rem;
						}
					}
	
					label {
						display: block;
						color: #7D8182;
						font-size: 0.13rem;
						padding-top: 0.05rem;
					}
				}
				&:last-child{
					border-bottom: none;
				}
			}
		}
	}
</style>
