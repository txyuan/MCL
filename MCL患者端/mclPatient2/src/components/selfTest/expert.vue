<template>
  <div class="selfTestRoot">
    <mt-header title="MCL专家栏" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div id="body_main">
      <ul class="selfTest">
        <li v-for="(item,index) in expertColumn" :key="index">
          <router-link :to="`/expertDetail/`+item.sKey">
            <div class="selfNr">
              <div class="coverWrap">
                <!--                <img :src="item.ColumnImg" alt="" class="cover"/>-->
                <div class="cover" :style="{background: `url(${item.ColumnImg})10% 10% / cover no-repeat`}">
                  <div class="video"></div>
                </div>
              </div>
              <div class="tit">
                <!-- <img src="@/assets/images/jinxingzhong@2x.png" class="icon" width="15"/> -->
                <div class="mclWzBt">{{item.ColumnName}}</div>
                <span class="personNum">{{item.PlaybackVolume}}人浏览过</span>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'selfTest',
    data: () => ({
      expertColumn: []
    }),
    methods: {
      expert () {
        let url = 'UserInterface/PatientHomePageExpert.ashx'
        this.$post(url).then((data) => {
          if (data.rspcode != 1) {
            return
          }
          this.expertColumn = data.data
        })
      },
    },
    mounted () {
      this.expert()
    }
  }
</script>

<style scoped lang="scss">
  #body_main {
    padding-bottom: 0.1rem;
  }

  .mint-header {
    height: 0.44rem;
    line-height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
  }

  .padding-header {
    padding-top: 0.44rem;
  }

  .selfTest {
    padding: 0 3%;

    li {
      margin-top: 0.1rem;
      border-radius: 6px;
      background: #FFFFFF;
      overflow: hidden;
      box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
      .selfNr {
        padding: 0.12rem 0.1rem;
        display: flex;
        justify-content: space-between;
        .coverWrap {
          overflow: hidden;
          min-width: 1.25rem;
          .cover {
            display: block;
            height: 1rem;
            width: 1.25rem;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            border-radius: 5px;
            position: relative;
          }
          .video{
            position: absolute;
            top: 0;
            left: 0;
            right: 0.05rem;
            bottom: 0.05rem;
            background: url(./../../assets/images/play.png) no-repeat bottom right;
            background-size: 0.2rem;
            opacity: 0.9;
          }
        }
      }
      .tit {
        flex-grow: 1;
        margin-left: 4%;
        position: relative;
        padding-bottom: 0.2rem;
        .mclWzBt{
          font-size: 0.15rem;
          font-weight: 500;
          color: #484848;
          line-height: 1.6;
          letter-spacing:0.012rem;
        }
        .personNum {
          color: #787878;
          display: block;
          font-size: 0.135rem;
          position: absolute;
          bottom: 0px;
          left: 0px;
          padding-right: 0.05rem;
          font-weight: 500;
          line-height: 1.6;
        }

        .icon {
          vertical-align: middle;
        }
      }
    }
  }
</style>
