<template>
  <div>
    <mt-header title="健康管理" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div class="todymag">
      <!--			<div class="bj_inform">-->
      <!--				<img :src="picurl" />-->
      <!--				<span>{{uname}}</span>-->
      <!--				<p @click="type_disease ? $router.push(`/wellcome_personInfo?type=look&diseasetype=${type_disease}`): ()=>{}">健康档案</p>-->
      <!--			</div>-->
      <div class="tody_ul">
        <div class="tody_list">
          <div class="d-flex align-items-center mag_list" @click="type_disease ? $router.push(`/wellcome_personInfo?type=look&diseasetype=${type_disease}`): ()=>{}">
            <div class="mag_icon"> <img src="@/assets/images/icons/icon-jkda.png" /></div>
            <div class="mag_text flex-grow-1">
              <strong>健康档案</strong>
              <!-- <span>查看、修改我的健康信息</span> -->
              <span v-if="statusInfo.jkdaFlag == 0">完善我的健康档案</span>
              <span v-if="statusInfo.jkdaFlag == 1">查看详情</span>
            </div>
          </div>
        </div>
        <div class="tody_list">
          <router-link :to="{path: `/weight`}">
            <div class="d-flex align-items-center mag_list">
              <div class="mag_icon">  <img src="@/assets/images/icons/icon-tzjl.png" /></div>
              <div class="mag_text flex-grow-1">
                <strong>体重记录</strong>
                <!-- <span>记录今日体重情况</span> -->
               <span v-if="statusInfo.tzFlag == 0">记录今日体重</span>
               <span v-if="statusInfo.tzFlag == 1">今日已完成</span>
              </div>
            </div>
          </router-link>
          <!-- <router-link to="/weight">
            <div class="eat_ka" v-show="weigt">
              <label>最新体重<i>60</i>公斤</label>
            </div>
          </router-link> -->
        </div>
        <div class="tody_list">
          <router-link :to="{path: messageInfo.lbFlag==0||messageInfo.IsMember==0 ? `/buyfood/饮食` : `/diet`}">
            <div class="d-flex align-items-center mag_list">
              <div class="mag_icon"> <img src="@/assets/images/icons/icon-ysjl.png" />	</div>
              <div class="mag_text flex-grow-1">
                <strong>饮食记录</strong>
                <!-- <span>记录今日饮食情况</span> -->
                <span v-if="statusInfo.lbFlag==0">记录今日饮食</span>
                <span v-if="statusInfo.lbFlag==1">今日已完成</span>
              </div>
            </div>
          </router-link>
          <!-- <router-link to="/diet">
            <div class="eat_ka" v-show="foods">
              <label>还可吃2000千卡</label>
            </div>
          </router-link> -->
        </div>
        <div class="tody_list">
          <router-link :to="{path: messageInfo.ydlbFlag==0||messageInfo.IsMember==0 ? `/buyfood/运动` : `/sport`}">
            <div class="d-flex align-items-center mag_list">
              <div class="mag_icon"> <img src="@/assets/images/icons/icon-ydjl.png" />	</div>
              <div class="mag_text flex-grow-1">
                <strong>运动记录</strong>
                <!-- <span>记录今日运动情况</span> -->
                <span v-if="statusInfo.ydlbFlag==0">记录今日运动</span>
                <span v-if="statusInfo.ydlbFlag==1">今日已完成</span>
              </div>
            </div>
          </router-link>
          <!-- <router-link to="/sport">
            <div class="eat_ka" v-show="sport">
              <label> </label>
            </div>
          </router-link> -->
        </div>
        <div class="tody_list">
          <router-link :to="{path: messageInfo.yylbFlag==0||messageInfo.IsMember==0 ? `/buyfood/营养` : `/nutrition`}">
            <div class="d-flex align-items-center mag_list">
              <div class="mag_icon"> <img src="@/assets/images/icons/icon-yyjl.png" />	</div>
              <div class="mag_text flex-grow-1">
                <strong>营养记录</strong>
                <!-- <span>记录今日营养服用情况</span> -->
               <span v-if="statusInfo.yylbFlag==0">记录今日营养</span>
               <span v-if="statusInfo.yylbFlag==1">今日已完成</span>
              </div>
            </div>
          </router-link>
          <!-- <router-link to="/nutrition">
            <div class="eat_ka" v-show="eatp">
              <label>最新体重<i>60</i>公斤</label>
            </div>
          </router-link> -->
        </div>
<!--        <div class="tody_list">-->
<!--          <router-link :to="{path: messageInfo.xqglFlag==0||messageInfo.IsMember==0 ? `/welcomexqgl` : `/mood`}">-->
<!--            <div class="d-flex align-items-center mag_list">-->
<!--              <div class="mag_icon"> <img src="@/assets/images/icons/icon-xqjl.png" />	</div>-->
<!--              <div class="mag_text flex-grow-1">-->
<!--                <strong>心情记录</strong>-->
<!--                <span>立即完善</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </router-link>-->
<!--          &lt;!&ndash; <router-link to="/mood">-->
<!--            <div class="eat_ka" v-show="lauthy">-->
<!--              <label> </label>-->
<!--            </div>-->
<!--          </router-link> &ndash;&gt;-->
<!--        </div>-->
        <div class="tody_list">
          <router-link :to="`/gauge_life?type=${statusInfo.shfsFlag == 0 ? 'add' : 'look'}`">
            <div class="d-flex align-items-center mag_list">
              <div class="mag_icon"> <img src="@/assets/images/icons/icon-shfs.png" />	</div>
              <div class="mag_text flex-grow-1">
                <strong>生活方式</strong>
                <!-- <span>记录我的生活方式</span> -->
                <span v-if="statusInfo.shfsFlag==0">完善我的生活方式</span>
                <span v-if="statusInfo.shfsFlag==1">已完善</span>
              </div>
            </div>
          </router-link>
          <!-- <router-link to="/gauge_life">
            <div class="eat_ka" v-show="noezk">
              <label> </label>
            </div>
          </router-link> -->
        </div>
        <div class="tody_list">
          <router-link :to="{path: messageInfo.zzglFlag==0||messageInfo.IsMember==0 ? `/welcomezz` : `/symptom`}">
            <div class="d-flex align-items-center mag_list">
              <div class="mag_icon"> <img src="@/assets/images/icons/icon-zzgl.png" />	</div>
              <div class="mag_text flex-grow-1">
                <strong>症状管理</strong>
                <span>记录我的并发症症状</span>
              </div>
            </div>
          </router-link>
          <!-- <router-link to="/symptom">
            <div class="eat_ka"  v-show="tbgt">
              <label> </label>
            </div>
          </router-link> -->
        </div>
        <div class="tody_list">
          <router-link :to="{path: messageInfo.blscFlag==0||messageInfo.IsMember==0 ? `/welcomebl` : `/physician`}">
            <div class="d-flex align-items-center mag_list">
              <div class="mag_icon"> <img src="@/assets/images/icons/icon-blsc.png" />	</div>
              <div class="mag_text flex-grow-1">
                <strong>病历上传</strong>
                <span>上传我的病历报告</span>
              </div>
            </div>
          </router-link>
          <!-- <router-link to="/physician">
            <div class="eat_ka" v-show="jianceye">
              <label> </label>
            </div>
          </router-link> -->
        </div>
        <div class="tody_list">
          <router-link to="/gauge_PG_SGA">
            <div class="d-flex align-items-center mag_list">
              <div class="mag_icon"> 	<img src="@/assets/images/icons/icon-scpg.png" /> 	</div>
              <div class="mag_text flex-grow-1">
                <strong>筛查评估</strong>
                <span>评估我的营养状况</span>
              </div>
            </div>
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
      messageInfo: {},
      statusInfo: {} // 状态信息
    }),
    methods: {
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
      },
      getStatus(){
        let url = 'UserInterface/PatientManagementTodayInfo.ashx'
        this.$post(url).then((data) => {
          if (data.rspcode != 1) {
            return
          }
          this.statusInfo = data
        })
      }
    },
    created () {
      this.getinform()
      this.getMsgInfo()
      // 获取健康管理的页面的状态
      this.getStatus()
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
    padding-top: 0.44rem;
    .tody_ul {
      width: 90%;
      margin: 0 auto;
      padding-bottom: 0.3rem;
      .tody_list{
        background: #fff;
        border-radius: 6px;
        margin-top: 0.12rem;
        box-shadow: 2px 2px 8px #dedede;
        .mag_list{
          background: url(./../../../assets/images/icons/icon-arrow.png) no-repeat 94% center;
          background-size: 0.30rem;
          color: #333;
          padding: 0.15rem 0.4rem 0.15rem 0.25rem;
          .mag_icon{
            width: 0.3rem;
            height: 0.3rem;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .mag_text{
            margin-left: 0.175rem;
            letter-spacing: 1px;
            strong{
              font-size: 0.165rem;
              color: #404040;
              display: block;
              font-weight: 500;
              padding-bottom: 0.05rem;
              padding-top: 0.025rem;
            }
            span{
              font-size: 0.135rem;
              color: #9b9b9b;
              display: inline-block;
              line-height: 1.5;
            }
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

    }
  }
  .d-flex {
    display: -ms-flexbox!important;
    display: flex!important;
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
