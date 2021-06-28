<template>
    <div class="padding-header page-bg-hui">
        <mt-header :title="label" fixed>
            <div slot="left">
                <header-back>
                <mt-button icon="back"></mt-button>
                </header-back>
            </div>
        </mt-header>

        <img src="@/assets/images/complication/banner4.jpg" alt="" width="100%">
        <div class="content">
            <div class="section">
                癌性疲劳是指肿瘤患者严重的、持续的疲乏感，一般没有明显的诱发因素(例如重体力活动)，一般也不能通过进食/休息/睡眠缓解,但严重影响了患者的自理能力和生活质量。研究表明约65%-100%的化疗患者、82% -96%的放疗患者、70% - 100%接受干扰素治疗的肿瘤患者会经历不同程度的癌性疲劳。
            </div>
            <div class="section">
                <div class="section-title"><span>饮食建议</span></div>
                <div class="section-result">
                    <div class="result-note">
                        癌性疲劳是指肿瘤患者严重的
                    </div>
                </div>
            </div>
        </div>

        <div class="fix_bottom">
            <mt-button type="primary" class="theme-button" size="large" @click.native="proposal">查看饮食建议</mt-button>
            <mt-button type="default" size="large" @click.native="$root.goMessage">个性化定制</mt-button>
        </div>
    </div>
</template>

<script>
import {APPID} from "@/configURL.js"
export default {
    data() {
        return {
            label: "BMI",
            data: {

            }
        }
    },
    created() {

    },
    methods: {
        proposal() {
            // const url = 'http://online.marryhealthscience.com/#/wx_Entrance/personal'
            // location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`)
        }
    },
    mounted() {
        
    }
}
</script>
<style scoped lang='scss'>
.content{
    position: absolute;
    top: 1rem;
    left: 0;
    right: 0
}

.section{
  padding: 0.15rem;
  margin: 0 0.15rem;
  margin-bottom: 0.15rem;
  background: #FFFFFF;
  border-radius: 0.08rem;
}
.section-title {
  line-height: 0.55rem;
  font-weight: bold;
}
.section-title span {
  margin-left: 0.1rem;
}
.section-title::before {
  content: "";
  width: 4px;
  height: 0.18rem;
  border-radius: 2px;
  margin-top: -1px;
  display: inline-block;
  vertical-align: middle;
  background: #0ac5ca;
}

.fix_bottom >>> {
    display: flex;
    background: #FFFFFF;
    .mint-button{
        border-radius: 0;
    }
    .mint-button--default{
      background: #FFFFFF;
    }
    .mint-button{
      height: 48px;
    }
}
</style>