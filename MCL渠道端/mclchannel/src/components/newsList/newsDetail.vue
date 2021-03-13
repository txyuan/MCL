<template>
	<div class="news-list padding-header">
		<mt-header fixed :title="$route.query.title">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>

    <div class="content04 abcd">
      <div class="valurang">
        <div class="val_bt">医生信息</div>
        <div class="val_xq">
        <div class="val_list d-flex">
          <div class="val_list_tit">医生名称</div>
          <div class="flex-grow-1">{{info.doctorName}}</div>
        </div>

        <div class="val_list d-flex">
          <div class="val_list_tit">手机号码</div>
          <div class="flex-grow-1">{{info.ContactPhone}}</div>
        </div>

        <div class="val_list d-flex">
          <div class="val_list_tit">性别</div>
          <div class="flex-grow-1">{{info.sex}}</div>
        </div>

        <div class="val_list d-flex">
          <div class="val_list_tit">职称</div>
          <div class="flex-grow-1"> {{info.position}}</div>
        </div>

        <div class="val_list d-flex">
          <div class="val_list_tit">医院名称</div>
          <div class="flex-grow-1">{{info.hospitalName}}</div>
        </div>

        <div class="val_list d-flex">
          <div class="val_list_tit">科室</div>
          <div class="flex-grow-1">{{info.Department}}</div>
        </div>

        <div class="val_list d-flex">
          <div class="val_list_tit">申请时间</div>
          <div class="flex-grow-1">{{info.create_time}}</div>
        </div>
        <div class="val_list d-flex">
          <div class="val_list_tit">申请状态</div>
          <div class="flex-grow-1">{{info.status}}</div>
        </div>
        </div>

        <div class="val_btm" v-if="info.status == '待审核'">
          <!-- <div class="d-flex">
            <div class="czButton">
            <mt-button type="primary" class="theme-button button-radio " size="large">取消审核
            </mt-button>
          </div> -->
          <div class="bcButton flex-grow-1">
            <mt-button type="primary" class="theme-button button-radio " size="large" @click.native="submit">通过审核
            </mt-button>
          </div></div>
        </div>
      </div>
      <!-- <div v-else>
        <div class="news_list_xq">
          <div class="xq_title">{{this.currentObj.status}}
            <p class="xq_time">
            {{this.currentObj.createtime}}
          </p>
          </div>
          <div class="xq_nr">
            {{this.currentObj.remarks}}
          </div>

        </div>
      </div> -->
    </div>

	</div>
</template>

<script>
export default {
  data: () => ({
    info: {}
  }),
  methods: {
    getInfo () {
      let url = 'UserInterface/channel/SelectDoctorInfo.ashx'
      this.$post(url, {doctorSkey: this.$route.query.userskey}).then((data) => {
        if (data.rspcode != 1) {
          this.$Toast(data.rspdesc)
          return
        }
        this.info = data.data
      })
    },
    // 通过审核
    submit () {
      let url = 'UserInterface/channel/DoctorApproval.ashx'
      this.$post(url, {doctorSkey: this.$route.query.userskey}).then((data) => {
        this.$Toast(data.rspdesc)
        if (data.rspcode == 1) {
          this.getInfo()
        }
      })
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>
<style lang="scss">

  .news-list .inform_jtds a.mint-cell{
    border-top: 1px solid #e5e5e5;
    min-height: 0.42rem;
  }
  .news-list .inform_jtds a.mint-cell .mint-cell-text{
    font-size: 0.1425rem;
    color: #787878;
  }
  .news-list .inform_jtds a.mint-cell .mint-cell-wrapper{
    padding: 0 4%;
  }
  .news-list {
    .d-flex {
      display: -ms-flexbox!important;
      display: flex!important;
    }
    .flex-grow-1 {
      -ms-flex-positive: 1!important;
      flex-grow: 1!important;
    }
    .mint-popup-3 {
    width: 100%;
    height: 100%;
    background-color: #fff;

  }

  .popup_body {
    height: 100%;
    padding-top: 0.44rem;
    box-sizing: border-box;
    overflow-y: scroll;
    background-color: #f5f5f5;
  }

  .rangid{
    .mt-range-runway{
      border-top-color: #F4D9D2;
      border-radius: 5px;
      right: -24px;
    }
    .mt-range-progress{
      background-color: #FD6C75;
      /*background-image: repeating-linear-gradient(45deg,#0AC5C9 0,#d89e2d 0.5em,#d8792d  0.5em, #d8512d  0.5em, #d8512d  0.5em);*/
      border-radius: 5px 0 0 5px;
    }
    .mt-range-thumb{
      width: 24px;
      height: 24px;
      border: 1px solid #E58391;
    }
    .mt-range-content{
      margin-right: 24px;
    }
  }
  }
</style>
<style scoped lang="scss">

  .mint-header {
    height: 0.44rem;
    border-bottom: 1px solid #eee;
  }

  .inform_cont {
		padding-bottom: 0.6rem;
		padding-top: 43px;
		.inform_list {
			padding: 0 6%;
			border-radius: 8px;
			overflow: hidden;
			margin-top: 0.2rem;
			h2 {
				background: #F1F1F1;
				overflow: hidden;
				height: 0.44rem;
				font-weight: normal;
				img {
					height: 0.22rem;
					width: 0.22rem;
					float: left;
					border-radius: 0.11rem;
					margin: 0.11rem 0 0 0.12rem;
				}
				span {
					display: block;
					float: left;
					line-height: 0.44rem;
					font-size: 0.15rem;
					color: #676767;
					margin-left: 0.1rem;
				}
				label {
					float: right;
					font-size: 0.12rem;
					color: #676767;
					margin-right: 0.12rem;
					line-height: 0.44rem;
					display: block;
				}
			}
			.inform_jtds {
				background: #fff;
				h4 {
					color: #333;
					font-size: 0.15rem;
					padding: 0.1rem 4%;
					font-weight: 600;
				}
				span,
				label {
					display: block;
					padding: 0 4%;
					color: #9197A5;
					font-size: 0.14rem;
				}
				label {
					padding: 0.08rem 4% 0.1rem 4%;
				}
				p {
					color: #9197A5;
					font-size: 0.14rem;
					padding: 0.1rem 4%;
					border-top: 1px solid #ddd;
					background: url(../../assets/images/jiantou@2x.png) no-repeat 98% center;
					background-size: 0.21rem;
				}
			}
		}
	}
  .valurang {
    width: 100%;
    margin-top: 0.1rem;
    background-color: #FFFFFF;
    padding-bottom: 0.2rem;

    .val_bt {
      padding: 0.15rem 0.15rem 0.085rem 0.15rem;
      border-bottom: 1px solid #e5e5e5;
      font-size: 0.175rem;
      line-height: 1.6;
      color: #232323;
      font-weight: 600;
    }

    .val_xq {
      padding: 0.2rem 0.15rem;

      .val_list {
        padding: 0.05rem 0;
        line-height: 1.6;
        color: #404040;

        font-size: 0.155rem;
        .val_list_tit {
          color: #666666;
          min-width: 0.84rem;;
          width: 0.84rem;
        }
      }
    }
    .val_btm{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      .czButton{
        width: 30%;
        .theme-button{
          background-color: #999999;
        }
      }
      .bcButton{
        .theme-button{
          background-color: #0AC5C9;
        }
      }
      .theme-button{
        border-radius: 0;
        width: 100%;
        height:0.46rem;
        font-size: 0.17rem;
        letter-spacing: 1px;
      }
    }
  }
  .news_list_xq{
    width: 100%;
    margin-top: 0.1rem;
    background-color: #FFFFFF;
    padding-bottom: 0.2rem;
    .xq_title{
      padding: 0.15rem 0.15rem 0.085rem 0.15rem;
      border-bottom: 1px solid #e5e5e5;
      font-size: 0.175rem;
      line-height: 1.6;
      color: #232323;
      font-weight: 600;
    }
    .xq_nr{
      padding: 0.2rem 0.15rem;
      font-size: 0.16rem;
      color: #666666;
      line-height: 1.5;
     min-height: 1.5rem;
      letter-spacing: 1px;
    }
    .xq_time{
      font-size: 0.14rem;
      color: #878787;
      line-height: 1.6;
      font-weight: 400;
    }
  }
</style>
