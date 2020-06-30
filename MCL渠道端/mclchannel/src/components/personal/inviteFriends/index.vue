<template>
	<div style="background: #fff;">
		<div id="class_header" class="myassets">
			<mt-header title="邀请好友" fixed class="borderBottom">
				<div slot="left">
					<router-link to="/wx_Entrance/personal" style="color: initial">
						<mt-button icon="back"></mt-button>
					</router-link>
				</div>
			</mt-header>
		</div>
		<div :style="{height:heigt+'px'}" class="share">
			<div class="share_cont">
				<div class="share_top">
					<h4>王小二</h4>
					<span>主任医师 &nbsp;&nbsp;|&nbsp;&nbsp; 肿瘤科</span>
					<span>天津</span>
					<p>
						<label>邀请码</label>
						<i>19018750922</i>
					</p>
				</div>
				<div class="share_cmd">
					<img src="../../../assets/images/wxewm.jpg" />
					<p>扫码进入我的团队</p>
				</div>
				<div class="share_bot">
					<span>分享</span>
					<label>保存到相册</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		data: () => ({
			heigt: ''
		}),
		methods: {

		},
		mounted() {
			let heg = window.innerHeight
			let height = heg - 43;
			this.heigt = height;
		}
	}
</script>

<style scoped lang="scss">
	h3 {
		height: 0.44rem;
		font-size: 0.17rem;
		text-align: center;
		line-height: 0.44rem;
		font-weight: normal;
		letter-spacing: 0.02rem;
	}
	
	.share {
		padding-top: 43px;
		// background-image: linear-gradient(#e66465, #9198e5);
		background: url(../../../assets/images/sharebg.png) no-repeat center center;
		background-size: cover;
		.share_cont {
			position: relative;
			width: 93%;
			margin: 0 auto;
			height: 95%;
			top: 2.5%;
			background: #fff;
			border-radius: 6px;
		}
	}
	
	.share_top {
		padding-bottom: 0.22rem;
		border-bottom: 1px dashed #CDC9C9;
		h4 {
			font-size: 0.2rem;
			color: #333;
			padding: 0.24rem 0 0 4%;
		}
		span {
			font-size: 0.15rem;
			color: #333;
			display: block;
			padding: 0.14rem 0 0 4%;
		}
		p {
			overflow: hidden;
			padding-top: 0.20rem;
			label {
				width: 0.7rem;
				height: 0.3rem;
				background: #4A8EF4;
				border-radius: 4px;
				color: #fff;
				font-size: 0.15rem;
				display: block;
				text-align: center;
				line-height: 0.3rem;
				float: left;
				margin-left: 4%;
			}
			i {
				font-size: 0.15rem;
				color: #333333;
				float: left;
				margin-left: 0.14rem;
				line-height: 0.3rem;
				font-style: normal;
			}
		}
	}
	
	.share_cmd {
		padding-top: 0.36rem;
		img {
			width: 1.66rem;
			display: block;
			margin: 0 auto;
		}
		p {
			font-size: 0.16rem;
			color: #333;
			padding-top: 0.3rem;
			text-align: center;
		}
	}
	
	.share_bot {
		width: 100%;
		font-size: 0.16rem;
		color: #FF3D3D;
		line-height: 0.40rem;
		bottom: 90px;
		left: 0;
		position: fixed;
		span {
			display: block;
			width: 28%;
			padding-left: 8%;
			border: 1px solid #FF3D3D;
			height: 0.40rem;
			float: left;
			background: url(../../../assets/images/fenxiang@2x.png) no-repeat 32% center;
			background-size: 0.2rem;
			text-align: center;
			border-radius: 0.21rem;
			margin-left: 9.3%;
		}
		label {
			display: block;
			width: 30%;
			margin-left: 9.3%;
			float: left;
			padding-left: 6%;
			border: 1px solid #FF3D3D;
			height: 0.40rem;
			background: url(../../../assets/images/xiazai@2x.png) no-repeat 12% center;
			background-size: 0.2rem;
			text-align: center;
			border-radius: 0.21rem;
		}
	}
</style>