<template>
    <div>
        <mt-header title="四大处方" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div class="todymag">
      <div class="tody_ul">
        
        <div class="tody_list">
          <router-link :to="`/diet`">
            <div class="d-flex  mag_list">
              <div class="mag_icon"> <img src="@/assets/images/icons/icon-ysjl.png" />	</div>
              <div class="mag_text ">
                <strong>饮食记录</strong>
                <span v-if="statusInfo.lbFlag==0">记录今日饮食</span>
                <span v-if="statusInfo.lbFlag==1">今日已完成</span>
              </div>
              <img src="@/assets/images/icons/icon-arrow.png" alt="" class="icon">
            </div>
          </router-link>
        </div>

        <div class="tody_list">
          <router-link :to="`/sport`">
            <div class="d-flex  mag_list">
              <div class="mag_icon"> <img src="@/assets/images/icons/icon-ydjl.png" />	</div>
              <div class="mag_text ">
                <strong>运动记录</strong>
                <span v-if="statusInfo.ydlbFlag==0">记录今日运动</span>
                <span v-if="statusInfo.ydlbFlag==1">今日已完成</span>
              </div>
              <img src="@/assets/images/icons/icon-arrow.png" alt="" class="icon">
            </div>
          </router-link>
        </div>
        
        <div class="tody_list">
          <router-link :to="`/nutrition`">
            <div class="d-flex  mag_list">
              <div class="mag_icon"> <img src="@/assets/images/icons/icon-yyjl.png" />	</div>
              <div class="mag_text ">
                <strong>营养记录</strong>
                <span v-if="statusInfo.yylbFlag==0">记录今日营养</span>
                <span v-if="statusInfo.yylbFlag==1">今日已完成</span>
              </div>
              <img src="@/assets/images/icons/icon-arrow.png" alt="" class="icon">
            </div>
          </router-link>
        </div>
        
        <div class="tody_list">
          <router-link :to="`/mood`">
            <div class="d-flex  mag_list">
              <div class="mag_icon"> <img src="@/assets/images/icons/icon-yyjl.png" />	</div>
              <div class="mag_text ">
                <strong>心情记录</strong>
                <span v-if="statusInfo.yylbFlag==0">记录今日心情</span>
                <span v-if="statusInfo.yylbFlag==1">今日已完成</span>
              </div>
              <img src="@/assets/images/icons/icon-arrow.png" alt="" class="icon">
            </div>
          </router-link>
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
<style scoped lang='scss'>
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
      padding: 0.1rem 0.05rem;
      .tody_list{
        padding: 0.07rem 0.1rem;
        box-sizing: border-box;
        .mag_list{
          padding: 0.05rem 0.30rem;
          height: 0.76rem;
          color: #333;
          background: #fff;
          border-radius: 0.10rem;
          box-shadow: 2px 2px 8px #dedede;
          display: flex;
          align-items: center;
          .mag_icon{
            width: 0.3rem;
            height: 0.3rem;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .mag_text{
            margin-left: 0.15rem;
            letter-spacing: 1px;
            flex: 1;
            strong{
              font-size: 0.165rem;
              color: #404040;
              display: block;
              font-weight: 500;
              padding-bottom: 0.05rem;
            }
            span{
              font-size: 0.135rem;
              color: #9b9b9b;
              display: inline-block;
              line-height: 1.5;
            }
          }
          .icon{
            display: block;
            width: 0.3rem;
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