<template>
	<div>
		<mt-header title="今日管理" fixed>
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="todymag">
			<div class="bj_inform">
				<img :src="picurl" />
				<span>{{uname}}</span>
				<p @click="type_disease ? $router.push(`/wellcome_personInfo?type=look&diseasetype=${type_disease}`): ()=>{}">完善资料</p>
			</div>
			<div class="tody_ul">
				<div class="tody_list">
					<router-link :to="{path: messageInfo.lbFlag==0||messageInfo.IsMember==0 ? `/buyfood/饮食` : `/diet`}">
						<p @click="ishow(1)">
							<img src="@/assets/images/yinshis.png" />
							<span>饮食</span>
						</p>
					</router-link>
					<!-- <router-link to="/diet">
						<div class="eat_ka" v-show="foods">
							<label>还可吃2000千卡</label>
						</div>
					</router-link> -->
				</div>
				<div class="tody_list">
					<router-link :to="{path: `/weight`}">
						<p @click="ishow(2)">
							<img src="@/assets/images/tizhong@2x.png" />
							<span>体重</span>
						</p>
					</router-link>
					<!-- <router-link to="/weight">
						<div class="eat_ka" v-show="weigt">
							<label>最新体重<i>60</i>公斤</label>
						</div>
					</router-link> -->
				</div>
				<div class="tody_list">
					<router-link :to="{path: messageInfo.ydlbFlag==0||messageInfo.IsMember==0 ? `/buyfood/运动` : `/sport`}">
						<p @click="ishow(3)">
							<img src="@/assets/images/yundong@2x.png" />
							<span>运动</span>
						</p>
					</router-link>
					<!-- <router-link to="/sport">
						<div class="eat_ka" v-show="sport">
							<label> </label>
						</div>
					</router-link> -->
				</div>
				<div class="tody_list">
					<router-link :to="{path: messageInfo.yylbFlag==0||messageInfo.IsMember==0 ? `/buyfood/营养` : `/nutrition`}">
						<p @click="ishow(4)">
							<img src="@/assets/images/yingyang@2x.png" />
							<span>营养</span>
						</p>
					</router-link>
					<!-- <router-link to="/nutrition">
						<div class="eat_ka" v-show="eatp">
							<label>最新体重<i>60</i>公斤</label>
						</div>
					</router-link> -->
				</div>
				<div class="tody_list">
					<router-link :to="{path: messageInfo.xqglFlag==0||messageInfo.IsMember==0 ? `/welcomexqgl` : `/mood`}">
						<p @click="ishow(5)">
							<img src="@/assets/images/xinqing@2x.png" />
							<span>心情</span>
						</p>
					</router-link>
					<!-- <router-link to="/mood">
						<div class="eat_ka" v-show="lauthy">
							<label> </label>
						</div>
					</router-link> -->
				</div>
				<div class="tody_list">
					<router-link :to="{path: messageInfo.zzglFlag==0||messageInfo.IsMember==0 ? `/welcomezz` : `/symptom`}">
						<p @click="ishow(6)">
							<img src="@/assets/images/zhengzhuang@2x.png" />
							<span>症状</span>
						</p>
					</router-link>
					<!-- <router-link to="/symptom">
						<div class="eat_ka"  v-show="tbgt">
							<label> </label>
						</div>
					</router-link> -->
				</div>
				<div class="tody_list">
					<router-link to="/gauge_life">
						<p @click="ishow(7)">
							<img src="@/assets/images/shenghuozhuangkuang@2x.png" />
							<span>生活状况</span>
						</p>
					</router-link>
					<!-- <router-link to="/gauge_life">
						<div class="eat_ka" v-show="noezk">
							<label> </label>
						</div>
					</router-link> -->
				</div>
				<div class="tody_list">
					<router-link :to="{path: messageInfo.blscFlag==0||messageInfo.IsMember==0 ? `/welcomebl` : `/physician`}">
						<p @click="ishow(8)">
							<img src="@/assets/images/jianchabaogao@2x.png" />
							<span>检查报告</span>
						</p>
					</router-link>
					<!-- <router-link to="/physician">
						<div class="eat_ka" v-show="jianceye">
							<label> </label>
						</div>
					</router-link> -->
				</div>
				<div class="tody_list">
					<router-link to="/gauge_PG_SGA">
						<p @click="ishow(9)">
							<img src="@/assets/images/shaichabaogao@2x.png" />
							<span>筛查评估</span>
						</p>
					</router-link>
					<!-- <div class="eat_ka" v-show="scbgd">
						<label> </label>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'index',
  data: () => ({
    picurl: '',
    uname: '',
    type_disease: '', // 完善资料的类型
    isLoad: false,
    messageInfo: {}
    // foods: false,
    // weigt: false,
    // sport: false,
    // eatp: false,
    // lauthy: false,
    // tbgt: false,
    // noezk: false,
    // jianceye: false,
    // scbgd: false
  }),
  methods: {
    ishow (nums) {
      // if(nums==1){
      // 	this.foods=!this.foods;
      // }
      // if(nums==2){
      // 	this.weigt=!this.weigt;
      // }
      // if(nums==3){
      // 	this.sport=!this.sport;
      // }
      // if(nums==4){
      // 	this.eatp=!this.eatp;
      // }
      // if(nums==5){
      // 	this.lauthy=!this.lauthy;
      // }
      // if(nums==6){
      // 	this.tbgt=!this.tbgt;
      // }
      // if(nums==7){
      // 	this.noezk=!this.noezk;
      // }
      // if(nums==8){
      // 	this.jianceye=!this.jianceye;
      // }
      // if(nums==9){
      // 	this.scbgd=!this.scbgd;
      // }
    },
    getinform () {
      let url = 'UserInterface/GetUserShowInfo.ashx'
      this.$post(url).then((data) => {
        if (data.rspcode == 1) {
          this.picurl = data.data.ImgUrl
          this.uname = data.data.Nickname
          this.type_disease = data.data.type_disease
        }
      })
    },
    getMsgInfo () {
      let url = 'UserInterface/PatientHomePageEssentialInfo.ashx'
      this.$post(url).then((data) => {
        if (data.rspcode != 1) {
          return
        }
        this.messageInfo = data
        this.isLoad = true
      })
    }
  },
  created () {
    this.getinform()
    this.getMsgInfo()
  }
}
</script>

<style scoped lang="scss">
  .mint-header {
  height: 0.44rem;
  line-height: 0.44rem;
  border-bottom: 1px solid #e5e5e5;
}
	.todymag{
		padding: 0.44rem 3% 0 3%;
		.bj_inform{
			padding: 0.16rem 3% 0.06rem 3%;
			overflow: hidden;
			img{
				width: 0.4rem;
				height: 0.4rem;
				border-radius: 0.2rem;
				display: block;
				float: left;
			}
			span{
				display: block;
				float: left;
				font-size: 0.145rem;
				line-height: 0.4rem;
				margin-left: 2%;
			}
			p{
				float: right;
				background: #F78335;
				font-size: 0.12rem;
				color: #fff;
				padding: 0 3%;
				height: 0.22rem;
				line-height: 0.23rem;
				border-radius: 0.11rem;
				margin-top: 0.09rem;
			}
		}
	}
	.tody_list{
		background: #fff;
		border-radius: 6px;
		margin-top: 0.1rem;
		box-shadow: 4px 2px 10px #ddd;
		p{
			height: 0.52rem;
			overflow: hidden;
			padding: 0 3%;
			background: url(./../../../assets/images/jixu@2x.png) no-repeat 96% center;
			background-size: 0.08rem;
			color: #333;
			img{
				height: 0.2rem;
				float: left;
				display: block;
				margin-top: 0.15rem;
			}
			span{
				display: block;
				float: left;
        font-size: 0.145rem;
        line-height: 0.52rem;
        margin-left: 0.1rem;
			}
		}
		.eat_ka{
			height: 0.5rem;
			label{
				display: block;
				line-height: 0.5rem;
				font-size: 0.12rem;
				padding: 0 8%;
				color: #999;
				i{
					font-style: normal;
					color: #333;
					font-size: 0.14rem;
				}
			}
		}
	}
</style>
