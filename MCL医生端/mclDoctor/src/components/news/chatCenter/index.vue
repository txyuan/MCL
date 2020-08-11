<template>
	<div>
		<mt-header fixed :title="inform.doctorname">
			<router-link to="/" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
			<mt-button icon="more" slot="right" @click.native="noedel()"></mt-button>
		</mt-header>
		<div class="content">

			<router-link to="" style="overflow: hidden;display: block;">
				<div class="person_info">
					<img :src="inform.img" style="width:0.52rem;height:0.52rem;border-radius: 0.32rem">
					<div class="info">
						<p class="name" style="font-size: 0.15rem;">{{inform.patientname}}</p>
						<p class="tel" style="font-size: 0.12rem;color: #7D8182;">{{inform.sex}} {{inform.age}} {{inform.diseasedondition}}</p>
					</div>
					<div class="person_type">
						<!-- <i class="mint-cell-allow-right"></i> -->
						<!-- <router-link to="/chat">
							<div class="person_givein">
								<span>发消息</span>
								<p>
									<label>
										<img src="../../../assets/images/xialj.png" />
									</label>
								</p>
							</div>
						</router-link> -->
					</div>
				</div>
			</router-link>

			<div class="person_menu">
				<div class="middle-cell">

					<router-link :to="'/records?skey='+hzskey">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/dangan.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">健康档案</p>
						</div>
					</router-link>

					<router-link :to="'/indexData?skey='+hzskey">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/zhibiaosj.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">报告查询</p>
						</div>
					</router-link>
					<router-link :to="'/presentat?skey='+hzskey">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/zonghbg.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">复查管理</p>
						</div>
					</router-link>
					<router-link :to="'/presentation?skey='+hzskey">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/jiedbg.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">效果评价</p>
						</div>
					</router-link>
				</div>
				<div class="middle-cell">
					<div>
						<div class="cell" @click="doLink(messageInfo.lbFlag == 0 ? `/diet` : `/diet?skey=${hzskey}`)">
							<div class="row">
								<img src="@/assets/images/yinscf.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">饮食处方</p>
						</div>
					</div>
					<div>
						<div class="cell" @click="doLink(messageInfo.yylbFlag == 0 ? `/nutrition` : `/nutrition?skey=${hzskey}`)">
							<div class="row">
								<img src="@/assets/images/yingycf.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">营养处方</p>
						</div>
					</div>
					<div>
						<div class="cell" @click="doLink(messageInfo.ydlbFlag == 0 ? `/sport` : `/sport?skey=${hzskey}`)">
							<div class="row">
								<img src="@/assets/images/yundcf.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">运动处方</p>
						</div>
					</div>
					<router-link :to="'/prescript?skey='+hzskey">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/xinlcf.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">心理处方</p>
						</div>
					</router-link>
				</div>
				<div class="middle-cell">
					<router-link :to="'/caseUpload?skey='+hzskey">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/bllsc.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">病例档案</p>
						</div>
					</router-link>
					<router-link :to="'/nutrition?skey='+hzskey" style="visibility: hidden;">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/yingycf.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">营养处方</p>
						</div>
					</router-link>
					<router-link :to="'/sport?skey='+hzskey" style="visibility: hidden;">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/yundcf.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">运动处方</p>
						</div>
					</router-link>
					<router-link :to="'/prescript?skey='+hzskey" style="visibility: hidden;">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/xinlcf.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">心理处方</p>
						</div>
					</router-link>
				</div>
			</div>
			<div class="chat_ddt">
				<div class="chat_top">
					<img src="@/assets/images/newdt.png" />
					<!-- <span>复查成功</span>
					<label>今天11:25</label> -->
				</div>
				<p class="chat_prev">近期就诊记录</p>
				<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" style="padding: 0;">
					<div slot="content">
						<div class="chat_list" v-for="(item,index) in list" :key="index">
							<h4>{{item.create_time}}</h4>
							<div class="chat_li">
								<div class="chat_ppo">
									<h5>
										<span>[复查]</span>
										<router-link :to="'/medical?skey='+hzskey">
											<label>详情</label>
										</router-link>
									</h5>
									<p>复查医生：{{item.doctorname}}</p>
									<p>复查内容：{{item.content}}</p>
									<p>医生备注：{{item.remarks}}</p>
								</div>
							</div>
						</div>
					</div>
				</loadMore>
				<!-- <div class="chat_list">
					<h4>2017.6.12 14:56</h4>
					<div class="chat_li">
						<div class="chat_ppo">
							<h5>
								<span>[复查]</span>
								<router-link to="/medical">
									<label>详情</label>
								</router-link>
							</h5>
							<p>复查医生：王小二</p>
							<p>复查内容：相关内容内容内容混分巨兽的恢复数据库</p>
							<p>医生备注：备注患者就诊意向、消费水平等</p>
						</div>
					</div>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
import loadMore from '@/components/common/loadMore.vue' // 加载更多组件
export default {
  name: 'index',
  data: () => ({
    inform: {},
    hzskey: '', // 患者key
    list: [],
    param: {
      patientskey: '',
      pagecount: 0,
      pagesize: 10
    },
    isLoad: false,
    messageInfo: { }
  }),
  methods: {
    noedel () {
      this.$router.push('/chatSet?skey=' + this.hzskey)
    },
    // 获取患者信息
    getinform () {
      let url = 'UserInterface/doctor/PatientEssentialInfo.ashx'
      let param = {
        patientskey: this.hzskey
      }
      this.$post(url, param).then((data) => {
        if (data.rspcode != 1) {
          return
        }
        this.inform = data
      })
    },
    getList (success) {
      let url = 'UserInterface/channel/PatientReviewRecordInfo.ashx'
      if (this.param.pagecount == 1) {
        this.list = []
      }
      this.$post(url, this.param).then((data) => {
        if (data.rspcode != 1) {
          return
        }
        this.allmoney = data.totalservicecharge
        let modelList = data.data
        this.list = [...this.list, ...modelList]
        // 加载更多组件触发回调
        if (success) {
          success(modelList, this.list)
        }
      })
    },
    // 判断饮食处方，营养处方，运动处方
    getMsgInfo () {
      let url = 'UserInterface/doctor/buttonValueFlag.ashx'
      let param = {
        ParentsKey: this.hzskey
      }
      this.$post(url, param).then((data) => {
        if (data.rspcode != 1) {
          return
        }
        this.messageInfo = data
        this.isLoad = true
      })
    },
    doLink (url) {
      if (this.isLoad) {
        this.$router.push(url)
      }
    }
  },
  mounted () {
    this.getinform()
    this.getMsgInfo()
  },
  created () {
    this.hzskey = this.$route.query.skey
    this.param.patientskey = this.$route.query.skey
  },
  components: {
    loadMore
  }
}
</script>
<style>

</style>
<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	//头像部分
	.person_info {
		padding: 0.14rem 0.10rem;
		background: #ffffff;
		display: flex;
		position: relative;

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
			padding-right: 8px;
			color: $color40;
		}

		.person_type span {
			padding: 6px 0;
			padding-left: 28px;
			font-size: 0.14rem;
			background: url("https://resource.jtsc.club/putong@2x.png") no-repeat 2px center;
			background-size: 22px;
		}

		.person_type span.vip {
			background-image: url("https://resource.jtsc.club/vip@2x.png");
		}

		.person_type span.hehuoren {
			background-image: url("https://resource.jtsc.club/hehuo@2x.png");
		}
	}

	.content {
		padding-top: 43px;
		padding-bottom: 56px;
	}

	/*常用功能*/
	.person_menu {
		background: #fff;
		padding-bottom: 0.06rem;
		border-top: 1px solid #eee;

		h3 {
			font-size: 0.15rem;
			background: #F9D6D6;
			font-weight: normal;
			padding: 0.08rem 0 0.08rem 3%;
		}
	}

	//中间余额部分
	.middle-cell {
		background: #fff;
		display: flex;
		justify-content: space-around;
		height: 72px;
		width: 94%;
		margin: 0 auto;
		padding-top: 0.08rem;

		.cell {
			height: 100%;
			flex: 1;
			background: #ffffff;
			text-align: center;
			display: flex;
			flex-wrap: wrap;
			align-content: center;
			justify-content: center;
			font-size: 0.16rem;
			color: $color40;

			&:nth-child(2) {
				margin: 0 0.05rem;
			}

			.row {
				width: 100%;

				img {
					vertical-align: middle;
				}

				p {
					display: inline-block;
					vertical-align: middle;
				}
			}

			.row:last-child {
				margin-top: 0.08rem;
				font-size: 0.13rem;
			}
		}
	}

	.chat_ddt {
		margin-top: 0.1rem;

		.chat_top {
			height: 0.58rem;
			background: #fff;
			overflow: hidden;

			img {
				height: 0.24rem;
				display: block;
				float: left;
				margin: 0.17rem 5%;
			}

			span {
				float: left;
				margin-left: 0.04rem;
				font-size: 0.15rem;
				color: #333535;
				line-height: 0.58rem;
			}

			label {
				float: right;
				margin-left: 0.04rem;
				font-size: 0.14rem;
				color: #636768;
				line-height: 0.58rem;
				margin-right: 5%;
			}
		}

		.chat_prev {
			padding: 0.12rem 5%;
			font-size: 0.14rem;
			color: #636768;
		}

	}

	.chat_list {
		width: 90%;
		padding-left: 10%;

		h4 {
			height: 0.3rem;
			font-weight: normal;
			font-size: 0.13rem;
			color: #636768;
			background: url(../../../assets/images/borradio.png) no-repeat left center;
			background-size: 0.16rem;
			padding-left: 0.32rem;
			line-height: 0.3rem;
		}

		.chat_li {
			border-left: 1px solid #C9CED5;
			padding: 0.06rem 0.1rem;
			margin-left: 0.07rem;

			.chat_ppo {
				width: 87%;
				background: #fff;
				margin-left: 4%;
				padding: 0.1rem;

				h5 {
					font-size: 0.14rem;
					overflow: hidden;
					font-weight: 500;
					padding-bottom: 0.04rem;
					color: #333;

					span {
						float: left;
					}

					label {
						float: right;
						font-size: 0.12rem;
						color: #636768;
					}
				}

				p {
					font-size: 0.13rem;
					color: #636768;
					padding-top: 0.02rem;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}
		}
	}

	.person_givein {
		overflow: hidden;
		height: 0.2rem;
		padding: 0.08rem 0;
		border-radius: 4px;
		margin-top: 0.08rem;
		background: #4A8EF4;

		span {
			width: 0.56rem;
			display: block;
			float: left;
			text-align: center;
			line-height: 0.2rem;
			color: #fff;
			font-size: 0.13rem;
			padding: 0 !important;
			border-right: 1px solid #fff;
		}

		p {
			width: 0.36rem;
			float: left;
			position: relative;

			img {
				position: absolute;
				width: 0.2rem;
				left: 50%;
				margin-left: -0.1rem;
				top: 0.01rem;
			}
		}
	}
</style>
