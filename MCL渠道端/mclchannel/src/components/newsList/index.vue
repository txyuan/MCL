<template>
	<div class="news-list">
		<mt-header fixed title="消息列表">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="inform_cont">
			<!-- <loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer"> -->
				<div slot="content">
					<div class="inform_list" v-for="(item, index) in list" :key="index">
						<h2>
							<img :src="item.imgurl" />
							<span>{{item.title}}</span>
							<label>{{item.time}}</label>
						</h2>
						<div class="inform_jtds">
							<h4>{{item.status}}</h4>
							<span>{{item.remarks}}</span>
							<label>{{item.createtime}}</label>
              <!-- 还未开发，暂时屏蔽掉 -->
							<!-- <mt-cell title="查看详情" is-link  @click.native="openModal(item)" ></mt-cell> -->
							<mt-cell title="查看详情" is-link></mt-cell>
						</div>
					</div>
				</div>
			<!-- </loadMore> -->

			<!--<div class="inform_list">
				<h2>
					<img src="../../assets/images/kdy.png" />
					<span>新订单发货提醒</span>
					<label>14:15:25</label>
				</h2>
				<div class="inform_jtds">
					<h4>新用户注册成功</h4>
					<span>新用户 何小何 扫描 员工 吴龙 二维码注册成功</span>
					<label>2019.10.07 14:15:25</label>
					<p>查看详情</p>
				</div>
			</div>-->
		</div>
    <mt-popup
      class="mint-popup-3"
      v-model="popupVisible"
      position="right"
      :modal="false"
      popup-transition="popup-fade">
      <mt-header fixed :title="titlerg">
        <div slot="left">
          <mt-button icon="back" @click.native="toggleModal('hide')"></mt-button>
        </div>
      </mt-header>
      <div class="popup_body" ref="popupBody">
        <div class="content04 abcd">
          <div class="valurang" v-if="(newlisrnr==1)">
            <div class="val_bt">医生信息</div>
            <div class="val_xq">
            <div class="val_list d-flex">
              <div class="val_list_tit">医生名称</div>
              <div class="flex-grow-1">梁明</div>
            </div>

            <div class="val_list d-flex">
              <div class="val_list_tit">手机号码</div>
              <div class="flex-grow-1">13956585236</div>
            </div>

            <div class="val_list d-flex">
              <div class="val_list_tit">性别</div>
              <div class="flex-grow-1">男</div>
            </div>

            <div class="val_list d-flex">
              <div class="val_list_tit">职称</div>
              <div class="flex-grow-1"> 副主任医生</div>
            </div>

            <div class="val_list d-flex">
              <div class="val_list_tit">医院名称</div>
              <div class="flex-grow-1">大同市肿瘤医院&北大肿瘤附属医院</div>
            </div>


            <div class="val_list d-flex">
              <div class="val_list_tit">科室</div>
              <div class="flex-grow-1">外科</div>
            </div>

            <div class="val_list d-flex">
              <div class="val_list_tit">申请时间</div>
              <div class="flex-grow-1">2021-02-12  22:02</div>
            </div>
            <div class="val_list d-flex">
              <div class="val_list_tit">申请状态</div>
              <div class="flex-grow-1">{{reviewed}}</div>
            </div>
            </div>

            <div class="val_btm" v-if="(reviewedId==0)">
              <div class="d-flex">
               <div class="czButton">
                <mt-button type="primary" class="theme-button button-radio " size="large" @click.native="reset">取消审核
                </mt-button>
              </div>
              <div class="bcButton flex-grow-1">
                <mt-button type="primary" class="theme-button button-radio " size="large" @click.native="submit">通过审核
                </mt-button>
              </div></div>
            </div>
          </div>
          <div v-else>
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
          </div>
        </div>
      </div>

    </mt-popup>
	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	export default {
		name: "newa-list",
		data: () => ({
			list: [],
      popupVisible: false,
      titlerg:'医生注册成功审核',
      newlisrnr:'',
      currentObj: {},  //当前点击对象
      reviewed:'待审核',//审核状态
      reviewedId:'0',//审核状态ID
			param: {
				"pagesize": 10,
				"pagecount": 0,
			}
		}),
		methods: {
			//获取列表
			// getList(success) {
			// 	let url = "UserInterface/channel/ChannelHomePageHeadlineList.ashx";
			// 	if(this.param.pagecount == 1) {
			// 		this.list = [];
			// 	}
			// 	this.$post(url, this.param).then((data) => {
			// 		if(data.rspcode != 1) {
			// 			return;
			// 		}
			// 		let modelList = data.data;
			// 		this.list = [...this.list, ...modelList]
			// 		//加载更多组件触发回调
			// 		if(success) {
			// 			success(modelList, this.list)
			// 		}
			// 	})
			// },
      toggleModal (type) {
        var state = (type == 'show' ? true : false)
        this.popupVisible = state
      },
      openModal (item) {
        this.titlerg=item.title
        this.currentObj=item
        this.toggleModal('show')
        if(this.titlerg=="医生成功注册"){
          this.newlisrnr='1'
        }
        else {
          this.newlisrnr='0'
        }
        // this.renderQuestion(item)
      },
      reset(){
        this.toggleModal('hide')
      },
      submit(){
        this.toggleModal('hide')
        this.reviewed='已审核'
        this.reviewedId='1'
      },
			getList() {
				let url = "UserInterface/channel/ChannelHomePageHeadlineList.ashx";
				this.$post(url).then((data) => {
					if(data.rspcode != 1) {
						return;
					}
					let modelList = data.data;
					this.list = modelList;
				})
			},
		},
		mounted(){
			this.getList();
		},
		components: {
			loadMore
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
