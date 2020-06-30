<template>
	<div class="padding-header" style="padding-bottom: 0.2rem;">
		<mt-header fixed title="完善资料"></mt-header>
		<div class="phys_top">
			<div class="phys_list">
				<p>
					<span class="aaccv"></span>
				</p>
				<label>基本信息</label>
			</div>
			<div class="phys_list">
				<p>
					<span class="aaccv"></span>
				</p>
				<label>个人介绍</label>
			</div>
			<div class="phys_list">
				<p>
					<span></span>
				</p>
				<label>个人照片</label>
			</div>
			<div class="phys_list">
				<p>
					<span></span>
				</p>
				<label>医生执照</label>
			</div>
		</div>
		<p class="phys_ppo"><span>*</span>请按照要求完善上传资料，否则将不能通过审核</p>
		<div class="shzyd">
			<div class="tits">个人介绍</div>
			<textarea placeholder="请输入您的个人介绍" v-model="param.contenct"></textarea>
		</div>
		<span class="btn_ok" @click="submit">下一步</span>
		
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: "realName",
		data: () => ({
			param: {
				contenct: "",
			},
		}),
		methods: {
			//提交
			submit() {
				const param = this.param;
				let { UserKey,SessionId } = this.$route.query;
				let url = `UserInterface/doctor/InsertDoctorInfo2.ashx?UserKey=${UserKey}&SessionId=${SessionId}`;
				this.$post(url, this.param).then((data) => {
					this.$Toast(data.rspdesc);
					if (data.rspcode != 1) {
						return;
					}
					this.$router.push(`/physician3?UserKey=${UserKey}&SessionId=${SessionId}`);
				})
			},
		},
		mounted() {
			
		}
	}
</script>
<style>
	/* .physc{
	  .mint-popup-bottom{
	    width: 100%;
	  }
	  .picker_bar{
	    display: flex;
	    justify-content: space-between;
	    text-align: center;
	    line-height: 40px;
	    padding: 0 20px;
	    border-bottom: solid 1px #eaeaea;
	    .confrim{
	      color: #26a2ff;
	    }
	  }
	} */
	/* .real_name_root .form{
    background: #fff;
    color: #333333;
    overflow: auto;
  }
  .real_name_root .form .tit{
    padding: 0 10px;
    line-height: 40px;
    font-size: 0.14rem;
    color: #666666;
  }
  .real_name_root .form input{
    border: none;
    color: #333333;
  } */
</style>
<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	.img_wrap {
		background: #fff;
		padding: 0 10px;
		padding-bottom: 10px;

		.tits {
			font-size: 0.15rem;
			color: #333535;
			line-height: 0.5rem;
		}

		.img {
			position: relative;
			background: #F9F9F9;
			color: $color66;
			font-size: 0.14rem;
			height: 1.90rem;
		}

		.img .defaultImg {
			height: 100%;

			img {
				width: 18%;
				margin-top: 50px;
				margin-bottom: 25px;
			}
		}

		.img input[type=file] {
			opacity: 0;
			width: 100%;
			display: block;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}

		.img .newImg {
			width: 100%;
			height: 100%;
		}

		.img .newImg:before {
			content: "";
			display: inline-block;
			width: 0px;
			height: 100%;
			vertical-align: middle;
		}

		.img .newImg img {
			max-height: 100%;
			max-width: 100%;
			display: inline-block;
			vertical-align: middle;
		}
	}

	.mint-popup-bottom {
		width: 100%;
	}

	.picker_bar {
		display: flex;
		justify-content: space-between;
		text-align: center;
		line-height: 40px;
		padding: 0 20px;
		border-bottom: solid 1px #eaeaea;

		.confrim {
			color: #26a2ff;
		}
	}

	.add_btn {
		margin-top: 0.6rem;
	}

	.link_kf {
		font-size: 0.12rem;
		color: #FF3D3D;
		line-height: 0.2rem;
		padding: 0.14rem 3%;
	}

	.form_bname {
		background: #fff;
		border-bottom: 1px solid #eee;

		span {
			font-size: 16px;
			height: 48px;
			line-height: 48px;
			padding: 0 10px;
		}

		input {
			width: 50%;
			float: right;
			text-align: right;
			height: 48px;
			font-size: 0.14rem;
			margin-right: 30px;
		}
	}

	.shzyd {
		padding: 0 10px;
		padding-bottom: 10px;
		margin-top: 0.1rem;
		background: #fff;

		.tits {
			font-size: 0.15rem;
			color: #333535;
			line-height: 0.5rem;
		}

		textarea {
			min-height: 1.1rem;
			max-height: 1.1rem;
			min-width: 94%;
			max-width: 94%;
			border: none;
			resize: none;
			padding: 0.1rem;
			background: #F9F9F9;
			font-size: 0.14rem;
			color: #666;
		}
	}

	.btn_ok {
		width: 94%;
		margin: 0 auto;
		display: block;
		height: 0.5rem;
		background: #24b7c0;
		font-size: 0.16rem;
		color: #FFFFFF;
		text-align: center;
		line-height: 0.5rem;
		border-radius: 6px;
		margin-top: 0.3rem;
	}
	
	.phys_top{
		width: 88%;
		margin: 0 auto;
		overflow: hidden;
		.phys_list{
			width: 25%;
			float: left;
			p{
				width: 100%;
				height: 0.02rem;
				background: #999;
				position: relative;
				margin-top: 0.14rem;
				span{
					width: 0.06rem;
					height: 0.06rem;
					display: block;
					background: #999;
					position: absolute;
					border-radius: 0.03rem;
					top: -0.02rem;
					left: 50%;
					margin-left: -0.03rem;
					&.aaccv{
						background: #4A8EF4;
					}
				}
			}
			label{
				display: block;
				font-size: 0.13rem;
				text-align: center;
				padding-top: 0.12rem;
			}
		}
	}
	.phys_ppo{
		font-size: 0.13rem;
		padding: 0.14rem 5% 0.02rem 5%;
		color: #666;
		span{
			color: red;
		}
	}
</style>
