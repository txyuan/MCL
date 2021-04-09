<template>
	<div style="padding-bottom: 53px;">
		<div class="home_head">
			<div class="home_saerch">
				<div class="home_over">
					<img src="@/assets/images/home_logo.png" />
					<router-link to="/searchhz">
						<input type="text" placeholder="搜索患者" readonly="readonly" v-model="searchz" />
					</router-link>
				</div>
			</div>
			<div class="today_info">
				<p>
					<img :src="repData.ImgUrl" />
					<span>{{repData.Nickname}}</span>
				</p>
				<!-- <ul>
					<router-link to="/wx_Entrance/news" tag="li">
						<span>{{messageNumber}}</span>
						<label>今日消息</label>
					</router-link>
					<router-link to="/myTeam" tag="li">
						<span>{{repData.patientCount}}</span>
						<label>今日用户</label>
					</router-link>
					<router-link :to="shareLink" tag="li">
						<img src="@/assets/images/sharext.png" />
						<label>分享</label>
					</router-link>
				</ul> -->
			</div>
			<div class="home_follow">
				<p @click="myinform">
					<img src="../../assets/images/mynew.png" />
					<span>我的消息</span>
					<label></label>
					<i class="num">{{$root.keFuTotal}}</i>
				</p>
				<p>
					<router-link to="/groupManage">
						<img src="@/assets/images/fenzuguanli.png" />
						<span>分组管理</span>
						<label></label>
					</router-link>
				</p>
				<p class="poton">
					<router-link to="/appointment">
						<img src="@/assets/images/fuzhenyuyue.png" />
						<span>复诊预约</span>
						<label></label>
						<i v-if="ishsow"></i>
					</router-link>
				</p>
			</div>
		</div>
		<div class="home_ul">
			<div class="home_list" v-for="(item,index) in list" :key="index">
        <p @click="getchildg(item)" v-if="item.clists.length==0">{{item.groupname}}（<span class="nr_sm">{{item.groupcount}}</span>）</p>
        <p @click="getchildg(item)" v-else class="showIs">{{item.groupname}}（<span class="nr_sm">{{item.groupcount}}</span>）</p>
				<ul>
					<li v-for="(items,i) in item.clists" :key="i">
						<router-link :to="'/chatCenter?skey='+items.patientskey">
							<div class="home_img">
                <img :src="items.imgurl" />
              </div>
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
		<!-- <input type="file" accept="video/*" capture="camcorder" /> -->
	</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'home',
  data: () => ({
    messageNumber: '',
    searchz: '',
    list: [],
    clist: [],
    repData: {},
    ishsow: false,
    shareLink: '/'
  }),
  methods: {
    myinform () {
      this.$router.push('/wx_Entrance/news')
    },
    getgroup () {
      let url = 'UserInterface/doctor/DoctorHomePageInfo.ashx'
      this.$post(url).then((data) => {
        if (data.rspcode != 1) {
          return
        }

        for (var i = 0; i < data.data.length; i++) {
          data.data[i].clists = []
        }
        this.list = data.data
      })
    },
    getchildg (item) {
      if (item.clists.length != 0) {
        item.clists = []
        return
      }
      let url = 'UserInterface/doctor/GroupingPatientInfo.ashx'
      let param = {
        groupskey: item.groupskey
      }
      this.$post(url, param).then((data) => {
        if (data.rspcode != 1) {
          return
        }
        item.clists = data.data
      })
    },
    // 个人信息
    information () {
      let url = 'UserInterface/GetUserShowInfo.ashx'
      return this.$post(url).then((data) => {
        let model = data.data
        this.repData = model
        if (model.reviewtheTotal != '0') {
          this.ishsow = true
        } else {
          this.ishsow = false
        }
      })
    },
    // 获取客服的token
    getToken: function () {
      const {org_name, app_name, client_id, client_secret} = this.$root
      let url = `http://a1.easemob.com/${org_name}/${app_name}/token`
      let param = {
				  'grant_type': 'client_credentials',
				  client_id,
				  client_secret
      }
      const http = axios.create({
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
      })
      http.post(url, param).then(response => {
        this.$root.token = response.data.access_token
        var phone = this.repData.ContactPhone
        // 获取未读消息条数
        this.getMessage(phone)
      })
    },
    // 获取客服的未读消息数
    getMessage: function (owner_username) {
      const {org_name, app_name, token} = this.$root
      let url = `http://a1.easemob.com/${org_name}/${app_name}/users/${owner_username}/offline_msg_count`
      const http = axios.create({
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${token}`
        }
      })
      http.get(url).then(response => {
        const data = response.data.data
        var i = 0
        for (let key in data) {
          if (i == 0) {
            this.messageNumber = data[key]
          }
          i += 1
        }
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    let keepAlive = (to.name == 'classdetail')
    this.$route.meta.keepAlive = keepAlive
    next()
  },
  mounted () {
    this.information().then(() => {
      // 获取token
      this.getToken()
    })
    this.getgroup()
    if (localStorage.userInfo) {
      let UserKey = JSON.parse(localStorage.userInfo).UserKey
      let SessionId = JSON.parse(localStorage.userInfo).SessionId
      this.shareLink = `share?title=分享&UserKey=${UserKey}&SessionId=${SessionId}`
    }
  },
  components: {

  },
  created () {
    // 			if(localStorage.userInfo){
    // 				this.UserKey=JSON.parse( localStorage.userInfo).UserKey;
    // 				this.SessionId=JSON.parse( localStorage.userInfo).SessionId;
    // 			}else{
    // 				this.$router.push('/login');
    // 			}
  }
}
</script>

<style scoped lang="scss">
	.home_head {
		// background: #fff;

		.home_saerch {
			height: 0.8rem;
			padding: 0.2rem 0 0.06rem 0;
			background:#0AC5C9;
			.home_over{
				width: 94%;
				margin: 0 auto;
				overflow: hidden;
				img{
					// width: 25%;
					height: 0.30rem;
					float: left;
				}
				input {
					width: 57%;
					border: none;
					display: block;
					height: 0.30rem;
					padding: 0 0.1rem 0 0.4rem;
					background: rgba(255,255,255,0.3) url(../../assets/images/搜索--1@2x.png) no-repeat 0.1rem center;
					background-size: 0.2rem;
					border-radius: 0.19rem;
					font-size: 0.14rem;
					color: #666666;
					float: right;
				}
        input::-webkit-input-placeholder{
          color:#FFFFFF;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
          color:#FFFFFF;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
          color:#FFFFFF;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
          color:#FFFFFF;
        }
			}

		}
		.today_info{
			width: 94%;
			margin: 0 auto;
			background: #fff;
			margin-top: -0.4rem;
			box-shadow: 4px 2px 10px #ddd;
			border-radius: 8px;
			p{
				overflow: hidden;
				padding: 0.15rem 6%;
				img{
          width: 0.52rem;
          height: 0.52rem;
          border-radius: 50%;
					display: block;
					float: left;
				}
				span{
					display: block;
					font-size: 0.15rem;
					float: left;
					line-height: 0.5rem;
					margin-left: 0.14rem;
				}
			}
			ul{
				width: 90%;
				margin: 0 auto;
				padding-bottom: 0.16rem;
				overflow: hidden;
				li{
					width: 33.33%;
					float: left;
					border-right: 1px solid #ddd;
					box-sizing: border-box;
					text-align: center;
					span{
						display: block;
						text-align: center;
						line-height: 0.24rem;
						height: 0.24rem;
						font-size: 0.17rem;
					}
					img{
						height: 0.2rem;
					}
					label{
						display: block;
						text-align: center;
						font-size: 0.15rem;
						padding-top: 0.08rem;
					}
					&:last-child{
						border: none;
					}
				}
			}
		}
		.home_follow {
			width: 88%;
			margin: 0.1rem auto;
			border-radius: 8px;
			overflow: hidden;
			padding: 0.13rem 3% 0.13rem 3%;
			box-shadow: 4px 2px 10px #ddd;
			background: #fff;
			p {
				width: 33.33%;
				float: left;
				text-align: center;
				position: relative;

				img {
					width: 0.325rem;
					display: block;
					position: absolute;
					left: 50%;
					margin-left: -0.14rem;
				}

				span {
					line-height: 0.3rem;
					font-size: 0.145rem;
					color: #333535;
					display: block;
					margin-top: 0.325rem;
				}

				label {
					display: block;
					position: absolute;
					width: 100%;
					height: 0.44rem;
					top: 0.1rem;
					border-left: 1px solid #D8D8D8;
					box-sizing: border-box;
				}

				&:first-child {
					label {
						border: none;
					}
				}

				&.poton{
					position: relative;
					i{
						display: block;
						width: 0.06rem;
						height: 0.06rem;
						background: red;
						position: absolute;
						border-radius: 0.3rem;
						top: 0;
						right: 35%;
					}
				}
			}
			
			.num{
				color: #FFF;
				width: 0.15rem;
				height: 0.15rem;
				line-height: 0.15rem;
				border-radius: 50%;
				text-align: center;
				font-style: normal;
				font-size: 12px;
				display: block;
				background: red;
				position: absolute;
				right: 28%;
				top: -4px;
			}
		}
	}

	.home_ul {
		background: #fff;
		/*padding: 0 2%;*/
		margin-top: 0.1rem;
		.home_list {
			border-top: 1px solid #DFE6E7;
      .nr_sm{
        color: #4A8EF4;
      }
        &:first-child {
				border-top: none;
			}

			p {
				height: 0.5rem;
				font-size: 0.15rem;
				color: #333535;
				background: url(../../assets/images/eyenext.png) no-repeat 0.06rem center;
				background-size: 0.2rem;
				padding-left: 0.26rem;
				line-height: 0.5rem;
				&.showIs {
					background: url(../../assets/images/eyenext@2x.png) no-repeat 0.06rem center;
					background-size: 0.2rem;
				}
			}

		}

		ul {
			li {
				/*height: 0.68rem;*/
				/*border-bottom: 1px solid #DFE6E7;*/
        padding: 0.08rem 0;
        position: relative;
        >a{
          display: flex;
          align-items: center!important;
        }
        .home_img{
          width: 0.38rem;
          height: 0.38rem;
          border-radius: 50%;
          margin-left: 0.1rem;
          margin-top: 0.07rem;
          border: 1px solid #d8f3f4;
          background-color:#eeffff;
          img {
            display: block;
            width:100%;
            height: 100%;
            border-radius: 50%;
          }
        }
				.home_li {
					width: 76%;
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
      li::after{
        background-color: #000;
        content: " ";
        opacity: 0.1;
        right: 0;
        top: 0;
        left: 0.1rem;
        height: 1px;
        position: absolute;
      }
		}
	}
</style>
