<template>
	<div class="padding-header person_data_root">
		<div id="class_header" class="myassets">
			<mt-header title="我的用户" fixed class="borderBottom">
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>
		</div>
		<div class="card_achieve">
			<div class="card_total">
				 我的用户总人数：
          <strong>
					{{totalcount}}
				</strong>
          <em>人</em>
			</div>
      <div class="d-flex justify-content-around card_count">
        <div class="card_cou_data"><span>{{newchannel}}</span><em>人</em><p>渠道经理</p></div>
        <div class="card_cou_data"><span>{{newdoctor}}</span><em>人</em><p>医生人数</p></div>
        <div class="card_cou_data"><span>{{newstaff}}</span><em>人</em><p>员工人数</p></div>
      </div>
			<div class="card_alist">
			 本月新增
				<span>{{newcount}}</span>
          <em>人</em>
			</div>
		</div>
		<div id="navbar" class="card_navbar">
			<mt-navbar v-model="selected">
				<mt-tab-item id="tab0" @click.native="tabClick('1')">
					<p>渠道经理</p>
				</mt-tab-item>
				<mt-tab-item id="tab1" @click.native="tabClick('2')">
					<p>医生</p>
				</mt-tab-item>
				<mt-tab-item id="tab2" @click.native="tabClick('3')">
					<p>员工</p>
				</mt-tab-item>
			</mt-navbar>
		</div>

		<div class="borderpay">
			<!-- tab-container -->
			<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
				<div slot="content">
					<div class="callddh" v-for="(item,index) in list" :key="index">
            <div class="card_cont">
              <div class="card_cont_tit">
								<!-- 显示默认图片 -->
                <div class="card_img" v-if="item.ImgUrl.indexOf('/upload') == -1">
                	<img v-if="param.type == 1" src="../../../assets/images/qdjl.png"/>
                	<img v-if="param.type == 2" src="../../../assets/images/kdy.png"/>
                	<img v-if="param.type == 3" src="../../../assets/images/yha.png"/>
                </div>
								<!-- 显示实际图片 -->
								<div class="card_img" v-else>
									<img :src="item.ImgUrl"/>
                </div>
                <div class="card_cont_txt"><span>{{item.contactname}}</span>{{item.contactphone}}</div>
              </div>
              <div class="card_cont_xq d-flex justify-content-between align-items-center">
                <div class="card_cont_xqwb flex-grow-1">
                  <p v-if="param.type == 2">病人人数：{{item.userCount}}人</p>
                  <p v-else>医生人数：{{item.userCount}}人</p>
                  <p>业绩金额：{{item.achievementMoney}}元</p>
                  <p>创建时间：{{item.create_date}}</p>
                </div>
                <div class="card_cont_btn">
                  <mt-button type="danger" size="large" @click="$router.push(`/userListDetails?sKey=${item.sKey}&type=${param.type}&contactname=${item.contactname}`)">查看详情</mt-button>
                </div>
              </div>
            </div>
					</div>
				</div>
			</loadMore>
		</div>
	</div>
</template>

<script>
import loadMore from '@/components/common/loadMore.vue' // 加载更多组件
export default {
  name: 'commission',
  data: () => ({
    isLoad: false, // 是否加载过接口
    selected: 'tab0',
    totalcount: '', // 总人数
    newchannel: '', // 渠道经理
    newdoctor: '', // 医生人数
    newstaff: '', // 员工人数
    newcount: '', // 本月新增
    list: [],
    param: {
      'pagesize': 10,
      'pagecount': 0,
      'type': 1, // 状态（1：渠道;2：医生;3：患者）
      'flag': 1, // 1：我的用户，2：员工用户）
      'staffskey': '' // 员工主键
    }
  }),
  methods: {
    // tab切换
    tabClick (val) {
      this.$Indicator.loading()
      this.param.type = val
      this.param.pagecount = 0
      this.$refs.loadMoreE.getList()
      setTimeout(() => {
        this.$Indicator.close()
      }, 200)
    },
    // 下面流水
    getList (success) {
      let url = 'UserInterface/channel/ChannelMyUserAchievementInfo.ashx'
      if (this.param.pagecount == 1) {
        this.list = []
      }
      this.$post(url, this.param).then((data) => {
        if (data.rspcode != 1) {
          return
        }
        this.isLoad = true
        let modelList = data.data
        this.list = [...this.list, ...modelList]
        this.totalcount = data.totalcount
        this.newcount = data.newcount
        this.newchannel = data.newchannel
        this.newdoctor = data.newdoctor
        this.newstaff = data.newstaff
        // 加载更多组件触发回调
        if (success) {
          success(modelList, this.list)
        }
      })
    }
  },
  beforeRouteEnter (to, form, next) {
    next((vm) => {
      // 从详情页面返回，解锁加载更多
      if (form.name === 'userListDetails') {
        vm.$refs.loadMoreE.isLock = true
      }
      // 从详情页面返回
      // if (form.name === 'userListDetails' && !vm.isLoad) {
      //   // 列表接口如果没有被加载过，需要加载接口
      //   // vm.tabClick('1')
      // } else {
      //   vm.tabClick('1')
      // }
    })
  },
  beforeRouteLeave (to, form, next) {
    // 去详情页面，关锁加载更多
    if (to.name === 'userListDetails') {
      this.$refs.loadMoreE.isLock = false
    }
    next()
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

	.card_achieve {
		overflow: hidden;
    background: url(../../../assets/images/my-user-bg.jpg) no-repeat bottom center;
    background-size: 100% 100%;
    color: #ffcece;
    .card_total{
      padding: 0.15rem 0.05rem 0.25rem 0.2rem;
      font-size: 0.16rem;
      strong{
        font-size: 0.325rem;
        font-weight: 400;
        display: inline-block;
        vertical-align: sub;
        color: #FFFFFF;
        padding-right: 0.02rem;
      }
      em{
         font-style: normal;
         font-size: 0.15rem;
        vertical-align: middle;
       }
    }
    .card_count{
      text-align: center;
      font-size: 0.145rem;
      span{
        font-size: 0.2rem;
        display: inline-block;
        padding-left: 0.05rem;
        padding-bottom: 0.075rem;
        color: #FFFFFF;
      }
      em{
        padding-left: 0.05rem;
        font-style: normal;
        font-size: 0.13rem;
        color: #ffcece;
      }
      p{
        font-size: 0.145rem;
        padding: 0;
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
    margin-top: 0.1rem;
    border-bottom: 1px solid #e5e5e5;
  }
	.shaixuan {
		height: 0.2rem;
		width: 0.2rem;
		margin-top: 0.08rem;
	}

	.callddh {
		position: relative;
		.calldh {
			position: absolute;
			height: 0.26rem;
			top: 50%;
			margin-top: -0.13rem;
			left: 48%;
		}
	}
	.callddh .content{
		display: flex;
		justify-content: space-between;
		line-height: 45px;
		background: #fff;
		padding: 0 5px;
		font-size: 14px;
		border-bottom: 1px solid #eee;
	}
  .borderpay{
    background-color: #FFFFFF;
    padding-top: 0.05rem;
    .card_cont{
      width: 88%;
      margin: 0.2rem auto;
      box-shadow: 1px 3px 6px 0px rgba(0,0,0,0.1);
      border-radius: 0.1rem;
      padding: 0.05rem 0;
      .card_cont_tit{
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        display: block;
        .card_img{
          display: inline-block;
          position: absolute;
          left:0.1rem ;
          top: 0.04rem;
          img{
            width: 0.32rem;
            height: 0.32rem;
						border-radius: 50%;
          }
        }
        .card_cont_txt{
          height: 0.4rem;
          padding-left: 0.52rem;
          line-height: 0.4rem;
          font-size: 0.16rem;
          span{
            font-size: 0.17rem;
            display: inline-block;
            padding-right: 0.1rem;
            color: #202020;
          }
        }
      }
      .card_cont_xq{
        padding: 0.1rem 0.15rem 0.1rem 0.52rem;
        .card_cont_xqwb{
          font-size: 0.145rem;
          color: #666666;
          line-height: 1.6;
        }
        .card_cont_btn{
          .mint-button{
            height: auto;
            font-size: 0.13rem;
            padding: 0.02rem 0 0.025rem 0;
            text-align: center;
            border-radius: 6px;
            width: 0.7rem;
          }
        }
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
