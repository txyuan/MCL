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
					<img src="../../assets/images/xiaoxi.png" />
					<span>我的消息</span>
					<label></label>
				</p>
				<p>
					<router-link to="/groupManage">
						<img src="@/assets/images/fenzuguanli@2x.png" />
						<span>分组管理</span>
						<label></label>
					</router-link>
				</p>
				<p>
					<img src="@/assets/images/gongju.png" />
					<span>工具箱</span>
					<label></label>
				</p>
			</div>
		</div>
		<div class="home_ul">
			<div class="home_list" v-for="(item,index) in list" :key="index">
				<p @click="getchildg(item)" v-if="item.clists.length==0">{{item.groupname}}（{{item.groupcount}}）</p>
				<p @click="getchildg(item)" v-else class="showIs">{{item.groupname}}（{{item.groupcount}}）</p>
				<ul>
					<li v-for="(items,i) in item.clists" :key="i">
						<router-link :to="'/chatCenter?skey='+items.patientskey">
							<img :src="items.imgurl" />
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
			background: rgb(36,183,192);
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
					background: #80d0f5 url(../../assets/images/sousuo@2x.png) no-repeat 0.1rem center;
					background-size: 0.2rem;
					border-radius: 0.19rem;
					font-size: 0.14rem;
					color: #666;
					float: right;
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
				padding: 0.16rem 8%;
				img{
					width: 0.4rem;
					height: 0.4rem;
					border-radius: 0.2rem;
					display: block;
					float: left;
				}
				span{
					display: block;
					font-size: 0.14rem;
					float: left;
					line-height: 0.4rem;
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
			width: 84%;
			margin: 0 auto;
			border-radius: 8px;
			overflow: hidden;
			padding: 0.12rem 5% 0.06rem 5%;
			box-shadow: 4px 2px 10px #ddd;
			margin-top: 0.1rem;
			background: #fff;
			p {
				width: 33.33%;
				float: left;
				text-align: center;
				position: relative;

				img {
					width: 0.28rem;
					display: block;
					position: absolute;
					left: 50%;
					margin-left: -0.14rem;
				}

				span {
					line-height: 0.4rem;
					font-size: 0.15rem;
					color: #333535;
					display: block;
					margin-top: 0.34rem;
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
			}
		}
	}

	.home_ul {
		background: #fff;
		padding: 0 2%;
		margin-top: 0.1rem;
		.home_list {
			border-top: 1px solid #DFE6E7;

			&:first-child {
				border-top: none;
			}

			p {
				height: 0.5rem;
				font-size: 0.15rem;
				color: #333535;
				background: url(../../assets/images/fenzu@2x.png) no-repeat 0.06rem center;
				background-size: 0.2rem;
				padding-left: 0.26rem;
				line-height: 0.5rem;
				&.showIs {
					background: url(../../assets/images/fenzuxiala@2x.png) no-repeat 0.06rem center;
					background-size: 0.2rem;
				}
			}

		}

		ul {
			li {
				height: 0.68rem;
				border-bottom: 1px solid #DFE6E7;

				img {
					display: block;
					float: left;
					width: 0.54rem;
					height: 0.54rem;
					border-radius: 0.27rem;
					margin-left: 0.1rem;
					margin-top: 0.07rem;
				}

				.home_li {
					width: 76%;
					float: left;
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
		}
	}
</style>
