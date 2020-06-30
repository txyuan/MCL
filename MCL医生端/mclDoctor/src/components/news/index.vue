<template>
<div>
<iframe :src="`${KFURL}/contact?username=${repData.ContactPhone}`" width="100%" style="height: calc(100vh - 55px);border: none;"></iframe>
<!-- <div class="mesage-root">
	<mt-header title="消息" fixed></mt-header>
	<div id="body_main">
			<div class="page">
				<div class="card">
					<div class="card_top">
						<div class="item">
							<img :src="doctorDefaultPic" alt="" class="touxiang" />
							<p class="DName font14">MCL主治医生</p>
						</div>
						<div class="item">
							<img :src="doctorDefaultPic" alt="" class="touxiang" />
							<p class="DName font14">MCL专家团</p>
						</div>
						<div class="item">
							<img :src="doctorDefaultPic" alt="" class="touxiang" />
							<p class="DName font14">MCL专属顾问</p>
						</div>
					</div>
				</div>
			</div>
			
			<div style="position: absolute; top: 1.4rem; bottom:53px; width: 100%; border: none;">
				<iframe src="/customerService.html?name=患者端&uphone=1577782789813" width="100%" style="height: 100%; border: none;"></iframe>
			</div>
			
		</div> -->
		
  	<!--<iframe src="/customerService.html?name=医生端&uphone=1577782789813" width="100%" style="height: calc(100vh - 55px);border: none;"></iframe>-->

  <!-- <h3 ref="element">消息</h3> -->
  <!-- <div class="news_cont"> -->
	  <!-- <div class="news_inform">
		  <img src="../../assets/images/211铃铛@2x.png" />
		  <div class="news_inall">
			  <h2>系统消息</h2>
			  <p>患者某某某缴费成功！</p>
		  </div>
		  <span>1</span>
	  </div>
	  <h4>MCL医师消息列表</h4>
	  <div class="news_ul">
		  <div class="news_list">
			  <img src="../../assets/images/211铃铛@2x.png" />
			  <div class="news_inall">
			    <h2><label>白容因</label><i>上午 10:33</i></h2>
			    <p>王医生，在吗？</p>
			  </div>
			  <span>1</span>
		  </div>
		  <router-link to="/chat">
		  <div class="news_list">
			  <img src="../../assets/images/211铃铛@2x.png" />
			  <div class="news_inall">
				<h2><label>白容因</label><i>上午 10:33</i></h2>
				<p>王医生，我的身体最近不太舒服，还需要怎么办呀</p>
			  </div>
			  <span>2</span>
		  </div>
		  </router-link>
		  <div class="news_list">
			  <img src="../../assets/images/211铃铛@2x.png" />
			  <div class="news_inall">
				<h2><label>白容因</label><i>上午 10:33</i></h2>
				<p>王医生，我的身体最近不太舒服，还需要怎么办呀</p>
			  </div>
		  </div>
	  </div> -->
  <!-- </div> -->
</div>
</template>

<script>
	import { KFURL } from '@/configURL.js'
	import doctorDefaultPic from "@/assets/images/doctorPic.png"
  export default {
	  	name: "index",
			data: () => ({
				KFURL,
				repData:{},
				doctorDefaultPic
			}),
			methods: {
				//个人信息
				information() {
					// this.$Indicator.loading();
					let url = "UserInterface/GetUserShowInfo.ashx";
					this.$post(url).then((data) => {
						this.$Indicator.close();
						let model = data.data;
						this.repData = model;
					})
				},
			},
			mounted(){
				this.information();
			}
  }
</script>

<style scoped lang="scss">
    h3{
  	  height: 0.44rem;
  	  font-size: 0.17rem;
  	  text-align: center;
  	  line-height: 0.44rem;
  	  font-weight: normal;
  	  letter-spacing: 0.02rem;
	  background: #fff;
	  position: fixed;
	  width: 100%;
	  top: 0;
	  left: 0;
	}
	.news_cont{
		padding: 0.44rem 0 63px 0;
		h4{
			height: 0.46rem;
			font-size: 0.14rem;
			color: #636768;
			line-height: 0.46rem;
			padding: 0 3%;
			font-weight: normal;
		}
	}
	.news_inform{
		overflow: hidden;
		margin-top: 0.1rem;
		padding: 0.14rem 0.12rem;
		background: #fff;
		position:relative;
		img{
			height: 0.44rem;
			float: left;
			display: block;
		}
		.news_inall{
			margin-left: 0.1rem;
			float: left;
			
			h2{
				font-size: 0.15rem;
				color: #333535;
				font-weight: normal;
			}
			p{
				font-size: 0.13rem;
				color: #7D8182;
				padding-top: 0.04rem;
				text-overflow: ellipsis;
				overflow:hidden;
				white-space: nowrap;
			}
		}
		span{
			display: block;
			width: 0.2rem;
			height: 0.2rem;
			background: #FF3D3D;
			text-align: center;
			line-height: 0.2rem;
			color: #fff;
			border-radius: 0.1rem;
			font-size: 0.12rem;
			position: absolute;
			right: 4%;
			bottom: 0.16rem;
		}
	}
	.news_ul{
		padding: 0 3%;
		width: 94%;
		background: #fff;
		.news_list{
			overflow: hidden;
			padding: 0.1rem 0;
			
			position:relative;
			border-bottom: 1px solid #ddd;
			
			img{
				height: 0.54rem;
				float: left;
				display: block;
			}
			.news_inall{
				width: 80%;
				margin-left: 0.1rem;
				float: left;
				h2{
					width: 100%;
					font-size: 0.16rem;
					color: #333535;
					padding-top: 0.04rem;
					font-weight: normal;
					overflow: hidden;
					label{
						display: block;
						float: left;
					}
					i{
						display: block;
						float: right;
						font-size: 0.13rem;
						color: #7D8182;
						font-style: normal;
					}
				}
				p{
					width: 90%;
					font-size: 0.12rem;
					color: #7D8182;
					padding-top: 0.08rem;
					text-overflow: ellipsis;
					overflow:hidden;
					white-space: nowrap;
				}
			}
			span{
				display: block;
				width: 0.2rem;
				height: 0.2rem;
				background: #FF3D3D;
				text-align: center;
				line-height: 0.2rem;
				color: #fff;
				border-radius: 0.1rem;
				font-size: 0.12rem;
				position: absolute;
				right: 2%;
				bottom: 0.1rem;
			}
		}
	}
	#body_main{
		/*padding-top: 0*/
		height: 100vh;
		position: relative;
		box-sizing: border-box;
	}
	.page{
		background: #FAFAFA;
		position: fixed;
		top: 43px;
		width: 100%;
		z-index: 20;
	}
	/*卡片*/
	.card {
		background: #FFF;
		border-radius: 6px;
		margin: 0.10rem;
	}

	.card_top {
		padding: 0.20rem 0.17rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.item{
			text-align: center;
		}
		.touxiang {
			width: 0.60rem;
			height: 0.60rem;
			border-radius: 0.30rem;
		}

		.content {
			flex: 1;
			padding-left: 0.11rem;
		}

		.nameInfo .msg {
			width: 0.21rem;
			height: 0.21rem;
			vertical-align: middle;
			float: right;
		}

		.nameInfo,
		.adr {
			margin-bottom: 0.07rem;
		}

		.nameInfo span {
			vertical-align: middle;
		}

		.nameInfo .label {
			border: 1px solid #F78335;
			border-radius: 2px;
			color: #F78335;
			padding: 0.01rem 0.08rem;
			margin-left: 0.15rem;
		}
	}

	.card_bottom {
		background: rgba(255, 255, 255, 0.1);
		margin-top: 0.2rem;
		padding: 0.08rem 0.10rem;
		line-height: 1.5;
	}
	
	.my-cell {
		line-height: 0.44rem;
		padding: 0 0.15rem;
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
	}
</style>
