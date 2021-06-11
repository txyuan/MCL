<template>
  <div class="padding-footer">
    <mt-header title="诊疗" fixed></mt-header>
    <div class="todymag">
      <div class="tody_ul">
        <div class="tody_list">
          <div class="d-flex  mag_list" @click="type_disease ? $router.push(`/wellcome_personInfo?type=look&diseasetype=${type_disease}`): ()=>{}">
            <div class="mag_icon"> <img src="@/assets/images/icons/icon-jkda.png" /></div>
            <div class="mag_text ">
              <strong>健康档案</strong>
              <span v-if="statusInfo.jkdaFlag == 0">完善健康档案</span>
              <span v-if="statusInfo.jkdaFlag == 1">查看详情</span>
              <img src="@/assets/images/icons/icon-arrow.png" alt="" class="icon">
            </div>
          </div>
        </div>
        <div class="tody_list">
          <router-link to="/gauge_PG_SGA">
            <div class="d-flex  mag_list">
              <div class="mag_icon"> 	<img src="@/assets/images/icons/icon-scpg.png" /> 	</div>
              <div class="mag_text ">
                <strong>筛查评估</strong>
                <span>评估营养状况</span>
                <img src="@/assets/images/icons/icon-arrow.png" alt="" class="icon">
              </div>
            </div>
          </router-link>
        </div>
        <div class="tody_list">
          <router-link :to="{path: messageInfo.blscFlag==0||messageInfo.IsMember==0 ? `/welcomebl` : `/physician`}">
            <div class="d-flex  mag_list">
              <div class="mag_icon"> <img src="@/assets/images/icons/icon-blsc.png" />	</div>
              <div class="mag_text ">
                <strong>病历上传</strong>
                <span>上传病历报告</span>
                <img src="@/assets/images/icons/icon-arrow.png" alt="" class="icon">
              </div>
            </div>
          </router-link>
        </div>
        <div class="tody_list">
          <router-link :to="`/gauge_life?type=${statusInfo.shfsFlag == 0 ? 'add' : 'look'}`">
            <div class="d-flex  mag_list">
              <div class="mag_icon"> <img src="@/assets/images/icons/icon-shfs.png" />	</div>
              <div class="mag_text ">
                <strong>生活方式</strong>
                <span v-if="statusInfo.shfsFlag==0">完善生活方式</span>
                <span v-if="statusInfo.shfsFlag==1">已完善</span>
                <img src="@/assets/images/icons/icon-arrow.png" alt="" class="icon">
              </div>
            </div>
          </router-link>
        </div>
        <div class="tody_list">
          <router-link :to="{path: messageInfo.zzglFlag==0||messageInfo.IsMember==0 ? `/welcomezz` : `/symptom`}">
            <div class="d-flex  mag_list">
              <div class="mag_icon"> <img src="@/assets/images/icons/icon-zzgl.png" />	</div>
              <div class="mag_text ">
                <strong>症状管理</strong>
                <span>记录并发症症状</span>
                <img src="@/assets/images/icons/icon-arrow.png" alt="" class="icon">
              </div>
            </div>
          </router-link>
        </div>

        <div class="tody_list">
          <router-link :to="{path: `/chufang`}">
            <div class="d-flex  mag_list">
              <div class="mag_icon">  <img src="@/assets/images/icons/icon-sdcf.png" /></div>
              <div class="mag_text ">
                <strong>四大处方</strong>
                <!-- <span v-if="statusInfo.tzFlag == 0">记录今日体重</span>
                <span v-if="statusInfo.tzFlag == 1">今日已完成</span> -->
                <span />
                <img src="@/assets/images/icons/icon-arrow.png" alt="" class="icon">
              </div>
            </div>
          </router-link>
        </div>

        <div class="tody_list">
          <router-link :to="{path: messageInfo.fzyyFlag==0||messageInfo.IsMember==0 ? `/welcomefzyy` : `/appointment`}">
            <div class="d-flex  mag_list">
              <div class="mag_icon">  <img src="@/assets/images/icons/icon-fzyy.png" /></div>
              <div class="mag_text ">
                <strong>复诊预约</strong>
                <!-- <span v-if="statusInfo.tzFlag == 0">记录今日体重</span>
                <span v-if="statusInfo.tzFlag == 1">今日已完成</span> -->
                <span />
                <img src="@/assets/images/icons/icon-arrow.png" alt="" class="icon">
              </div>
            </div>
          </router-link>
        </div>

        <div class="tody_list">
          <router-link :to="{path: messageInfo.yyjlFlag==0||messageInfo.IsMember==0 ? `/welcomeyy` : `/medicatRecord`}">
            <div class="d-flex  mag_list">
              <div class="mag_icon">  <img src="@/assets/images/icons/icon-yyjl.png" /></div>
              <div class="mag_text ">
                <strong>用药记录</strong>
                <!-- <span v-if="statusInfo.tzFlag == 0">记录今日体重</span>
                <span v-if="statusInfo.tzFlag == 1">今日已完成</span> -->
                <span />
                <img src="@/assets/images/icons/icon-arrow.png" alt="" class="icon">
              </div>
            </div>
          </router-link>
        </div>

        <div class="tody_list">
          <router-link :to="{path: `/weight`}">
            <div class="d-flex  mag_list">
              <div class="mag_icon">  <img src="@/assets/images/icons/icon-tzjl.png" /></div>
              <div class="mag_text ">
                <strong>体重记录</strong>
                <span v-if="statusInfo.tzFlag == 0">记录今日体重</span>
                <span v-if="statusInfo.tzFlag == 1">今日已完成</span>
                <img src="@/assets/images/icons/icon-arrow.png" alt="" class="icon">
              </div>
            </div>
          </router-link>
        </div>

        <!--
        <div class="tody_list">
          <router-link :to="{path: messageInfo.lbFlag==0||messageInfo.IsMember==0 ? `/buyfood/饮食` : `/diet`}">
            <div class="d-flex  mag_list">
              <div class="mag_icon"> <img src="@/assets/images/icons/icon-ysjl.png" />	</div>
              <div class="mag_text ">
                <strong>饮食记录</strong>
                <span v-if="statusInfo.lbFlag==0">记录今日饮食</span>
                <span v-if="statusInfo.lbFlag==1">今日已完成</span>
                <img src="@/assets/images/icons/icon-arrow.png" alt="" class="icon">
              </div>
            </div>
          </router-link>
        </div>
        <div class="tody_list">
          <router-link :to="{path: messageInfo.ydlbFlag==0||messageInfo.IsMember==0 ? `/buyfood/运动` : `/sport`}">
            <div class="d-flex  mag_list">
              <div class="mag_icon"> <img src="@/assets/images/icons/icon-ydjl.png" />	</div>
              <div class="mag_text ">
                <strong>运动记录</strong>
                <span v-if="statusInfo.ydlbFlag==0">记录今日运动</span>
                <span v-if="statusInfo.ydlbFlag==1">今日已完成</span>
                <img src="@/assets/images/icons/icon-arrow.png" alt="" class="icon">
              </div>
            </div>
          </router-link>
        </div>
        
        <div class="tody_list">
          <router-link :to="{path: messageInfo.yylbFlag==0||messageInfo.IsMember==0 ? `/buyfood/营养` : `/nutrition`}">
            <div class="d-flex  mag_list">
              <div class="mag_icon"> <img src="@/assets/images/icons/icon-yyjl.png" />	</div>
              <div class="mag_text ">
                <strong>营养记录</strong>
               <span v-if="statusInfo.yylbFlag==0">记录今日营养</span>
               <span v-if="statusInfo.yylbFlag==1">今日已完成</span>
               <img src="@/assets/images/icons/icon-arrow.png" alt="" class="icon">
              </div>
            </div>
          </router-link>
        </div> -->
        
        
        
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
      margin: 0 auto;
      overflow: hidden;
      padding: 0.15rem 0.05rem;
      .tody_list{
        float: left;
        width: 50%;
        padding: 0.08rem;
        box-sizing: border-box;
        .mag_list{
          padding-top: 0.2rem;
          padding-bottom: 0.1rem;
          height: 0.76rem;
          color: #333;
          background: #fff;
          border-radius: 0.08rem;
          box-shadow: 2px 2px 8px #dedede;
          display: flex;
          .mag_icon{
            width: 0.3rem;
            height: 0.3rem;
            margin-left: 0.15rem;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .mag_text{
            margin-left: 0.15rem;
            letter-spacing: 1px;
            strong{
              font-size: 0.165rem;
              color: #404040;
              display: block;
              font-weight: 500;
              padding-bottom: 0.02rem;
            }
            span{
              font-size: 0.13rem;
              color: #9b9b9b;
              display: inline-block;
              line-height: 1.5;
              letter-spacing: 0px;
            }
          }
          .icon{
            display: block;
            width: 0.25rem;
            height: 0.258rem;
            margin-top: 0.05rem;
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
</style>
