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
                    <img src="@/assets/images/doctorPic.png" alt="" class="doctorPic">
                    <div class="right">
                        <div class="name">医生 <span>主任医师</span></div>
                        <div class="location">安阳市肿瘤医院 &nbsp;&nbsp;&nbsp;肿瘤科</div>
                    </div> 
                </div>
                <div class="des">
                    <p>擅长：肿瘤方面的科学治疗和管理，帮助患者有更好的心情，找到合适的治疗方法肿瘤方面的科学治疗和管理，帮助患者有更好的心情</p>
                </div>
                <div class="num"> <p>好评：<span>100%</span></p> <p>已咨询：<span>1042次</span></p></div>
            </div>

            <div class="panel">
                <div class="panel-title">服务内容</div>
                <ul>
                    <li>免费在线咨询医生</li>
                    <li>在线咨询不限次数、优先回复患者</li>
                    <li>每月2次免费预约次数</li>
                    <li>根据病情在到院挂号就诊上给予指导和帮助</li>
                </ul>
            </div>
        </div>
        
        <div class="panel">
            <div class="panel-title">重要通知</div>
            <ul>
                <li>该服务，仅限专属对象使用</li>
                <li>购买年卡开通费用不包含打医院挂号、就诊、检查、药品等费用</li>
            </ul>
        </div>

        <mt-button type="primary" class="theme-button fix_bottom" size="large">指定该医生</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    created() {

    },
    mounted() {

    }
}
</script>
<style scoped lang='scss'>
@import "./detail.scss";
</style>