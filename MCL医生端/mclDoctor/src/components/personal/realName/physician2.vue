<template>
	<div class="padding-header" style="padding-bottom: 0.2rem;">
		<mt-header fixed title="完善资料"></mt-header>
    <div class="mains">
      <div class="phys_top d-flex justify-content-around">
        <div class="phys_list aaccv">
          <!--					<p>-->
          <!--						<span class="aaccv"></span>-->
          <!--					</p>-->
          <i class="icons icon-doctor"></i>
          <label>基本信息</label>
        </div>
        <div class="phys_list aaccv">
          <p>
            <span></span>
          </p>
          <i class="icons icon-personal"></i>
          <label>个人介绍</label>
        </div>
        <div class="phys_list">
          <p>
            <span></span>
          </p>
          <i class="icons icon-photo"></i>
          <label>个人照片</label>
        </div>
        <div class="phys_list">
          <p>
            <span></span>
          </p>
          <i class="icons icon-license"></i>
          <label>医生执照</label>
        </div>
      </div>
      <div class="shzyd">
        <div class="tits"><em></em>个人介绍</div>
        <textarea placeholder="请输入您的个人介绍" v-model="param.contenct"></textarea>
      </div>
      <p class="phys_ppo"><span>*</span>请按照要求完善上传资料，否则将不能通过审核</p>
    </div>
		<div class="btn_ok" @click="submit">下一步</div>

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
  .padding-header {
    padding-top:0.44rem;
    padding-bottom:0.44rem;
  }
  .mint-header {
    height:0.44rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .mains{
    margin-top: 0.1rem;
    margin-bottom: 0.5rem;
  }
	.img_wrap {
		background: #fff;
    padding: 0 0.125rem 0.125rem 0.125rem;
    margin-top: 0.1rem;

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
		padding: 0 0.125rem 0.125rem 0.125rem;
		margin-top: 0.1rem;
		background: #fff;

		.tits {
			font-size: 0.15rem;
			color: #333535;
			line-height: 0.5rem;
      em{
        display: inline-block;
        width: 0.035rem;
        height: 0.15rem;
        background-color: #4A8EF4;
        margin-right: 0.05rem;
        vertical-align: text-top;
      }
		}

		textarea {
			min-height: 1.1rem;
			max-height: 1.1rem;
			min-width: 94%;
			max-width: 94%;
			border: none;
			resize: none;
			padding: 0.1rem;
			background: #f1f1f1;
			font-size: 0.14rem;
			color: #666;
		}
	}

  .btn_ok {
    width: 90%;
    margin:0.5rem auto 0 auto;
    display: block;
    height: 0.44rem;
    background: #4A8EF4;
    font-size: 0.16rem;
    color: #FFFFFF;
    text-align: center;
    line-height: 0.5rem;
    border-radius: 0.2rem;
    /*position: absolute;*/
    /*bottom: 0;*/
  }
  .phys_top{
    width:100%;
    margin: 0 auto;
    overflow: hidden;
    padding: 0.2rem 0;
    background-color: #FFFFFF;
    color: #666666;
    .phys_list{
      position: relative;
      &.aaccv{
        color: #307aed;
        .icon-doctor{
          background-image: url("../../../assets/images/icon-doctor_a.png");
        }
        .icon-personal{
          background-image: url("../../../assets/images/icon-personal_a.png");
        }
        .icon-photo{
          background-image: url("../../../assets/images/icon-photo_a.png");
        }
        .icon-license{
          background-image: url("../../../assets/images/icon-license_a.png");
        }
        p{
          border-bottom: 1px dashed #307aed;
        }
      }
      .icons{
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        background-size: 100%;
        margin: 0 auto;
        background-position: center bottom;
        background-repeat: no-repeat;
      }
      .icon-doctor{
        background-image: url("../../../assets/images/icon-doctor.png");
      }
      .icon-personal{
        background-image: url("../../../assets/images/icon-personal.png");
      }
      .icon-photo{
        background-image: url("../../../assets/images/icon-photo.png");
      }
      .icon-license{
        background-image: url("../../../assets/images/icon-license.png");
      }
      p{
        width: 76%;
        height: 0.02rem;
        border-bottom: 1px dashed #bababa;
        position: absolute;
        margin-top: 0.14rem;
        top: 0;
        left: -80%;
      }
      label{
        display: block;
        font-size: 0.13rem;
        text-align: center;
        padding-top: 0.05rem;
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
  .d-flex {
    display: -ms-flexbox!important;
    display: flex!important;
  }

  .justify-content-around {
    -ms-flex-pack: distribute!important;
    justify-content: space-around!important;
  }
  .flex-grow-1 {
    -ms-flex-positive: 1!important;
    flex-grow: 1!important;
  }
  .align-items-center {
    -ms-flex-align: center!important;
    align-items: center!important;
  }
</style>
