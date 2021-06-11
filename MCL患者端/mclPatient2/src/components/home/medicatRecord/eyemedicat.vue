<template>
  <div>
    <mt-header title="服药调查" fixed>
      <div slot="left">
        <header-back>
          <mt-button icon="back"></mt-button>
        </header-back>
      </div>
    </mt-header>
    <div class="medicat_home">
      <div class="medicat_tab">
        <p v-for="(item,index) in list" :key="index" @click="getdefalt(item.skey,index)"
           :class="{active:index==current}">{{item.name}}</p>
      </div>
        <div class="basic_details">
        <div class="medicat_name d-flex">
          <div><label>药品名称：</label></div>
          <div class="flex-grow-1"><input type="text" v-model="reData.drug_name" readonly="readonly"/></div>
        </div>
        <div class="medicat_img">
          <img :src="reData.pic1" v-if="reData.pic1!=''"/>
          <img :src="reData.pic2" v-if="reData.pic2!=''"/>
          <img :src="reData.pic3" v-if="reData.pic3!=''"/>
        </div>
        <div class="medicat_yaol">
          <div class="medicat_yaoever">
            <span>每次用量：</span>
            <label>{{reData.consumption}}</label>
          </div>
          <div class="medicat_yaoever">
            <span>剂量：</span>
            <label>{{reData.dose}}</label>
          </div>
        </div>
      </div>
      <div class="medicat_pingl">
        <h3>用药频率</h3>
        <ul>
          <li v-show="show1">
            <span>第一次</span>
            <label>{{reData.first_time}}</label>
            <div class="medicat_eatbf">
              <p>
                <i>{{reData.first_result}}</i>
              </p>
            </div>
          </li>
          <li v-show="show2">
            <span>第二次</span>
            <label>{{reData.second_time}}</label>
            <div class="medicat_eatbf">
              <p>
                <i>{{reData.second_result}}</i>
              </p>
            </div>
          </li>
          <li v-show="show3">
            <span>第三次</span>
            <label>{{reData.third_time}}</label>
            <div class="medicat_eatbf">
              <p>
                <i>{{reData.third_result}}</i>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="medicat_details">
        <div class="medicat_styl d-flex">
          <span>服药方式：</span>
          <div class="medicat_eatbf">
            <p>
              <i>{{reData.medication_method}}</i>
            </p>
          </div>
        </div>
        <div class="medicat_styl d-flex">
          <span>是否按医嘱：</span>
          <div class="medicat_eatbf">
            <p>
              <i>{{reData.doctor_advice}}</i>
            </p>
          </div>
        </div>
        <div class="medicat_styl d-flex">
          <span>不良反应：</span>
          <div class="medicat_eatbf">
            <p style="width: 80%;">
              <i>{{reData.side_effects}}</i>
              <input v-if="reData.side_effects=='有'" type="text" v-model="reData.side_effects_result"
                     style="border-bottom: 1px solid #ddd;float: left;width: 60%;margin-left: 0.04rem;"/>
            </p>
          </div>
        </div>
        <div class="medicat_styl d-flex">
          <span>饮食注意：</span>
          <div class="aopity">{{reData.dietary_attention}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'eyemedicat',
    data: () => ({
      current: 0,
      idtime: '',
      list: [],
      reData: {},
      show1:false,
      show2:false,
      show3:false,
    }),
    methods: {
      //获取列表
      getList () {
        let url = 'UserInterface/curve/MedicationSurveySelectName.ashx'
        let param = {
          datatime: this.idtime
        }
        this.$post(url, param).then((data) => {
          if (data.rspcode != 1) {
            return
          }
          this.list = data.data
          this.getdefalt(data.data[0].skey, 0)
        })
      },
      // 获取详情
      getdefalt (skey, index) {
        this.current = index
        let url = 'UserInterface/curve/MedicationSurveyDetail.ashx'
        let param = {
          skey: skey
        }
        this.$post(url, param).then((data) => {
          if (data.rspcode != 1) {
            return
          }
          this.reData = data;
          console.log(data)
          console.log(data.third_time)
          if(data.first_time !=="0:00"){
            this.show1 = true;
          }
          if(data.second_time !=="0:00"){
            this.show2 = true;
          }
          if(data.third_time !=="0:00"){
                this.show3 = true;
              }
        })
      },
    },
    mounted () {
      let idtime = this.$route.query.idtime
      this.idtime = idtime
      this.getList()
    }
  }
</script>

<style scoped lang="scss">
  .mint-header {
    height: 48px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 0.16rem;
  }
  .medicat_home {
    padding-top: 44px;

    .basic_details {
      background-color: #FFFFFF;
      margin-top: 0.075rem;
      padding-top: 0.1rem;

      .medicat_name {
        width: 94%;
        margin: 0rem auto;
        overflow: hidden;

        label {
          font-size: 0.15rem;
          line-height: 0.32rem;
        }

        input {
          width: 96%;
          padding: 0 2%;
          height: 0.32rem;
          background: #fff;
          border-width: 0 0 1px 0;
          border-bottom: 1px solid #e5e5e5;
          color: #666666;
        }


      }
    }
  }

  .medicat_yaol {
    overflow: hidden;
    width: 94%;
    margin: 0 auto;
    padding: 0.1rem 0;

    .medicat_yaoever {
      width: 50%;
      float: left;
      overflow: hidden;
      font-size: 0.14rem;

      span {
        display: block;
        line-height: 0.3rem;
        float: left;
      }

      label {
        width: 40%;
        float: left;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        color: #666666;
      }
    }
  }

  .medicat_pingl {
  margin-top: 0.1rem;
  background-color: #FFFFFF;

  h3 {
    font-weight: normal;
    font-size: 0.15rem;
    padding: 0.1rem 3%;
    border-bottom: 1px solid #e5e5e5;
    color: #484848;
  }
    ul {
      padding-left: 4%;

      li {
        overflow: hidden;
        border-bottom: 1px solid #e5e5e5;
        text-align: center;
        line-height: 0.25rem;
        padding: 0.08rem 0;
        color: #666666;
        span {
          width: 30%;
          display: inline-block;
        }

        label {
          width: 30%;
          display: inline-block;
          color: #666666;
        }

        .medicat_eatbf {
          display: inline-block;
          font-size: 0.14rem;
          width: 30%;

          p {

            i {
              font-style: normal;
            }
          }
        }
      }
      li:last-child {
        border-bottom: 0;
      }
    }
  }

  .medicat_details {
    background-color: #FFFFFF;
    margin: 0.16rem auto;

    .medicat_styl {
      padding: 0.15rem 3%;
      border-bottom: 1px solid #e5e5e5;
      span {
        display: block;
        width: 30%;
        font-size: 0.145rem;
      }

      .medicat_eatbf {
        min-width: 60%;
        font-size: 0.14rem;
        overflow: hidden;

        p {
          width: 33.33%;
          float: left;
          overflow: hidden;

          i {
            font-style: normal;
            display: inline-block;
            color: #666666;
          }

          label {
            width: 0.14rem;
            height: 0.14rem;
            display: inline-block;
            border: 1px solid #999;
            border-radius: 50%;
            position: relative;
            margin-top: 0.02rem;
            margin-left: 0.04rem;

            u {
              width: 0.08rem;
              height: 0.08rem;
              border-radius:50%;
              position: absolute;
              top: 0.03rem;
              left: 0.03rem;
            }
          }

          &.active {
            label{
              border:1px solid #0bb8bc;
            }
            u {
              background: #0ac5ca;
            }
          }
        }
      }
    }
    .medicat_styl:last-child {
      border-bottom: 0;
    }
  }


  .aopity {
    width: 92%;
    font-size: 0.145rem;
    color: #666;
    min-height: 0.25rem;
  }

  .medicat_btn {
    width: 1.4rem;
    height: 0.32rem;
    background: #0ac5ca;
    margin: 0 auto;
    border-radius: 6px;
    color: #fff;
    text-align: center;
    line-height: 0.32rem;
    font-size: 0.14rem;
  }

  .medicat_img {
    width: 94%;
    margin: 0 auto;
    overflow: hidden;

    img {
      width: 30%;
      height: 1.1rem;
      float: left;
      margin-left: 3.33%;
      border-radius: 6px;
      margin-top: 0.2rem;
    }
  }

  .medicat_tab {
    width: 94%;
    margin: 0.1rem auto 0 auto;
    overflow: hidden;

    p {
      padding: 0.01rem 0.18rem 0.01rem 0.25rem;
      line-height: 0.3rem;
      font-size: 0.15rem;
      background: #fff;
      color: #0ac5ca;
      display: inline-block;
      border-radius: 8px;
      &.active {
        background: url(../../../assets/images/yingyang@2x.png) no-repeat left center;
        background-size: 0.175rem;
        color: #484848;
        font-size: 0.155rem;
        font-weight: 500;
      }
    }
  }
  .d-flex {
    display: flex !important;

    .flex-grow-1 {
      -ms-flex-positive: 1 !important;
      flex-grow: 1 !important;
    }
  }

  * {
    font-size: 0.145rem;
  }
</style>
