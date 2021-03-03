<template>
	<div class="padding-header person_data_root">
		<div id="class_header" class="myassets">
			<mt-header title="渠道经理—王一涵" fixed class="borderBottom">
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>
		</div>
		<div class="card_achieve_det">
			<div class="card_total">
        业绩累计收入
        <strong>
          5000.00
          <em>元</em>
				</strong>
			</div>
      <div class="d-flex card_count">
        <div class="card_cou_data"><p>筛查评估：<strong>100.30</strong><em>元</em></p></div>
        <div class="card_cou_data"><p>会员管理：<strong>1021.60</strong><em>元</em></p></div>
      </div>
      <div class="d-flex card_count">
        <div class="card_cou_data"><p>零售产品：<strong>2100.30</strong><em>元</em></p></div>
        <div class="card_cou_data"><p>套餐管理：<strong>1776.80</strong><em>元</em></p></div>
      </div>
		</div>
		<div class="borderpay">
      <div class="card_navbar">
      <strong>医生列表</strong></div>
			<!-- tab-container -->
			<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
				<div slot="content">
					<div class="card_cont">
            <div class="card_cont_list">
              <div class="card_img">
                <img src="../../../assets/images/kdy.png"/>
              </div>
              <div class="card_cont_txt"><span>王一涵</span>18523051325
                <p>创建时间：2020-12-11 14:47</p></div>
            </div>
            <div class="card_cont_list">
              <div class="card_img">
                <img src="../../../assets/images/kdy.png"/>
              </div>
              <div class="card_cont_txt"><span>王一涵</span>18523051325
                <p>创建时间：2020-12-11 14:47</p></div>
            </div>
            <div class="card_cont_list">
              <div class="card_img">
                <img src="../../../assets/images/kdy.png"/>
              </div>
              <div class="card_cont_txt"><span>王一涵</span>18523051325
                <p>创建时间：2020-12-11 14:47</p></div>
            </div>
            <div class="card_cont_list">
              <div class="card_img">
                <img src="../../../assets/images/kdy.png"/>
              </div>
              <div class="card_cont_txt"><span>王一涵</span>18523051325
                <p>创建时间：2020-12-11 14:47</p></div>
            </div>
            <div class="card_cont_list">
              <div class="card_img">
                <img src="../../../assets/images/kdy.png"/>
              </div>
              <div class="card_cont_txt"><span>王一涵</span>18523051325
                <p>创建时间：2020-12-11 14:47</p></div>
            </div>
            <div class="card_cont_list">
              <div class="card_img">
                <img src="../../../assets/images/kdy.png"/>
              </div>
              <div class="card_cont_txt"><span>王一涵</span>18523051325
                <p>创建时间：2020-12-11 14:47</p></div>
            </div>
            <div class="card_cont_list">
              <div class="card_img">
                <img src="../../../assets/images/kdy.png"/>
              </div>
              <div class="card_cont_txt"><span>王一涵</span>18523051325
                <p>创建时间：2020-12-11 14:47</p></div>
            </div>
            <div class="card_cont_list">
              <div class="card_img">
                <img src="../../../assets/images/kdy.png"/>
              </div>
              <div class="card_cont_txt"><span>王一涵</span>18523051325
                <p>创建时间：2020-12-11 14:47</p></div>
            </div>
            <div class="card_cont_list">
              <div class="card_img">
                <img src="../../../assets/images/kdy.png"/>
              </div>
              <div class="card_cont_txt"><span>王一涵</span>18523051325
                <p>创建时间：2020-12-11 14:47</p></div>
            </div>
					</div>
				</div>
			</loadMore>
		</div>
	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
	export default {
		name: "commission",
		data: () => ({
			selected: "tab0",
			totalcount: "", //总人数
			newcount: "", // 本月新增
			list: [],
			param: {
				"pagesize": 10,
				"pagecount": 0,
				"type": 1, //状态（1：渠道;2：医生;3：患者）
				"flag": 1, //1：我的用户，2：员工用户）
				"staffskey": "", //员工主键
			},
		}),
		methods: {
			//tab切换
			tabClick(val) {
				this.$Indicator.loading();
				this.param.type = val;
				this.param.pagecount = 0;
				this.$refs.loadMoreE.getList();
				setTimeout(() => {
					this.$Indicator.close()
				}, 200)
			},
			// 下面流水
			getList(success) {
				let url = "UserInterface/channel/StaffPromotionList.ashx";
				if(this.param.pagecount == 1) {
					this.list = [];
				}
				this.$post(url, this.param).then((data) => {
					if(data.rspcode != 1) {
						return;
					}
					let modelList = data.data;
					console.log(modelList)
					this.list = [...this.list, ...modelList]
					this.totalcount = data.totalcount
					this.newcount = data.newcount
					//加载更多组件触发回调
					if(success) {
						success(modelList, this.list)
					}
				})
			}
		},
		mounted() {

		},
		components: {
			loadMore
		}
	}
</script>
<style scoped lang="scss">
	@import "@/assets/css/base.scss";
	.mint-cell.borderBottom {
		padding: 0.06rem 0;
		align-items: center;
		align-content: center;
	}

	.right.text-right {
		color: $color60;
		font-size: 0.15rem;
		&>span:nth-child(2) {
			margin-top: 5px;
		}
	}

	.buttons {
		overflow: hidden;
		label {
			width: 88%;
			float: left;
			height: 0.4rem;
			display: block;
			font-size: 0.15rem;
			color: #fff;
			text-align: center;
			line-height: 0.4rem;
			border-radius: 0.2rem;
			background: #4A8EF4;
			margin-top: 0.05rem;
			margin-left: 6%;
		}
	}

	.card_achieve_det {
		overflow: hidden;
    background: url(../../../assets/images/my-user-bg.jpg) no-repeat bottom center;
    background-size: 100% 100%;
    color: #ffcece;
    .card_total{
      text-align: center;
      padding: 0.3rem 0.05rem 0.25rem 0.2rem;
      font-size: 0.16rem;
      strong{
        font-size: 0.325rem;
        font-weight: 400;
        vertical-align: sub;
        color: #FFFFFF;
        padding:0.15rem 0.02rem;
        display: block;
        em{
          font-style: normal;
          font-size: 0.15rem;
          vertical-align: middle;
          font-weight: 400;
          color: #ffcece;
        }
      }
    }
    .card_count{
      font-size: 0.14rem;
      .card_cou_data{
        width: 50%;
        background-color: rgba(0,0,0,0.05);
        border-top: 1px solid #d66c6c;
        padding: 0.075rem 0;
        color: #ffcece;
        p{
          padding: 0 0 0 0.15rem;
        }
        strong{
          font-size: 0.175rem;
          display: inline-block;
          font-weight: 400;
        }
        em{
          padding-left: 0.05rem;
          font-style: normal;
          font-size: 0.12rem;
        }
      }
      .card_cou_data:last-child{
        border-left: 1px solid #d66c6c;
      }
    }
		.card_alist {
      padding-left: 0.2rem;
      margin-top: 0.25rem;
      font-size: 0.155rem;
      border-top: 1px solid #e57676;
      color: #ffcece;
      line-height: 0.4rem;
      letter-spacing: 1px;
      span{
        font-size: 0.2rem;
        display: inline-block;
        padding:0 0.015rem;
        color: #FFFFFF;
        vertical-align: middle;
      }
      em{
        font-style: normal;
        font-size: 0.13rem;
        color: #ffcece;
      }
		}
	}
  .card_navbar{
    padding: 0 0.15rem;
    height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
    line-height: 0.44rem;
    strong{
      font-weight: 400;
      display: inline-block;
      border-left: 4px solid #ff3d3d;
      line-height: 1;
      font-size: 0.16rem;
      padding-left: 0.1rem;
    }
  }
	.shaixuan {
		height: 0.2rem;
		width: 0.2rem;
		margin-top: 0.08rem;
	}

  .borderpay{
    background-color: #FFFFFF;
    margin: 0.1rem auto;
    .card_cont{
      width: 100%;
      margin: 0 auto;
      .card_cont_list{
        position: relative;
        display: block;
        padding: 0.125rem 0 0.125rem 0.1rem;
        .card_img{
          display: inline-block;
          position: absolute;
          left:0.25rem ;
          top: 0.15rem;
          img{
            width: 0.38rem;
            height: 0.38rem;
          }
        }
        .card_cont_txt{
          padding-left: 0.62rem;
          font-size: 0.16rem;
          color: #666666;
          span{
            font-size: 0.16rem;
            display: inline-block;
            padding-right: 0.1rem;
            color: #202020;
          }
          p{
            font-size: 0.135rem;
            color: #787878;
            padding-top: 0.025rem;
          }
        }
      }
      .card_cont_list::after{
        background-color: #000;
        content: " ";
        opacity: 0.1;
        right: 0;
        bottom: 0;
        left: 0.25rem;
        position: absolute;
        height: 1px;
      }
    }
  }
  #navbar .mint-navbar .mint-tab-item{
    padding: 0 0.05rem;
  }
    #navbar .mint-navbar p{
    font-size: 0.16rem!important;
  }
</style>
<style lang="scss">
	.person_data_root {
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
		.picker-item {
			text-align: center;
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
  .justify-content-between {
    -ms-flex-pack: justify!important;
    justify-content: space-between!important;
  }
  .align-items-center {
    -ms-flex-align: center!important;
    align-items: center!important;
  }
  .flex-grow-1 {
    -ms-flex-positive: 1!important;
    flex-grow: 1!important;
  }
</style>
