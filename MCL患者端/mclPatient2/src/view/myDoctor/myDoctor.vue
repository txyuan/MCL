<template>
    <div class="padding-header padding-footer page-bg-hui">
        <mt-header title="医生详情" fixed>
            <div slot="left">
                <header-back>
                    <mt-button icon="back"></mt-button>
                </header-back>
            </div>
        </mt-header>

        <div class="content">
            <div class="card">
                <div class="info">
                    <img v-lazy="data.DoctorImg" alt="" class="doctorPic">
                    <div class="right">
                        <div class="name">{{data.DoctorName}}</div>
                        <div class="location">{{data.Position}}&nbsp;&nbsp;&nbsp;{{data.Department}}</div>
                    </div> 
                </div>
                <div class="hospital">{{data.HospitalName}} </div>
                <div class="des">
                    <p>擅长：{{data.BeGoodAt}}</p>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="title">
                <div class="title_text">专属服务对象</div>
                <div class="title_right">
                    <img src="" alt="">
                    <span>{{data.ServicePatient}}</span>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="panel">
                <div class="panel-title">服务内容</div>
                <ul>
                    <li>免费在线咨询医生</li>
                    <li>在线咨询不限次数、优先回复患者</li>
                    <li>每月2次免费预约次数</li>
                    <li>根据病情在到院挂号就诊上给予指导和帮助</li>
                </ul>
                <div class="panel-des">
                    <p>该服务，仅限专属服务对象使用</p>
                    <p>该买年卡开通费用不包含到医院挂号、就诊、严查、医药品等费用</p>
                </div>
            </div>
        </div>

        <mt-button type="primary" class="theme-button fix_bottom" size="large" @click="$root.goMessage">立即咨询</mt-button>
    </div>
</template>

<script>
import { purchaseYearCard } from "@/api/doctor.js"
export default {
    data() {
        return {
            data: {
                // string	DoctorName	医生姓名
                // string	Position	职位
                // string	DoctorImg	医生图片
                // string	Department	科室
                // string	HospitalName	医院名称
                // string	ServicePatient	专属服务对象
                // string	BeGoodAt	擅长
            }
        }
    },
    methods:{
        async getInfo(){
            const res = await purchaseYearCard()
            this.data = res
        }
    },
    created() {
        this.getInfo()
    },
    mounted() {

    }
}
</script>
<style scoped lang='scss'>
@import "./detail.scss";
.title{
    line-height: 0.50rem;
    padding: 0 0.15rem;
    display: flex;
    justify-content: space-between;
    .title_text{
        font-size: 0.18rem;
    }
    .title_right{
        font-size: 0.14rem;
        color: #666;
    }
}
</style>