<template>
    <div>
        <component :is="name"></component>
    </div>
</template>

<script>
import {save} from "@/api/complication.js"
export default {
    data() {
        const name = this.$route.params.type
        return {
            name
        }
    },
    methods:{
        async submit({value}){
            const query = this.$route.query
            const param = {
               skey: query.skey, 
               SubjectName: query.title,
               value
            }
            const res = await save(param)
            this.$router.push({name: 'complicationResult', query:{ResultSkey: res.ResultSkey, ...query}})
        }
    },
    components:{
        pinXue: () => import( /* webpackChunkName: "gauge_pnXue" */ '@/view/complication/gauge/pinXue.vue'), // 贫血
        tengTong: () => import( /* webpackChunkName: "gauge_tengTong" */ '@/view/complication/gauge/tengTong2.vue'), //疼痛
        piLao: () => import( /* webpackChunkName: "gauge_piLao" */ '@/view/complication/gauge/piLao.vue'), //疲劳
        tunYanKunNan: () => import( /* webpackChunkName: "gauge_tunYanKunNan" */ '@/view/complication/gauge/tunYanKunNan.vue'), //吞咽困难
        shiMian: () => import( /* webpackChunkName: "gauge_shiMian" */ '@/view/complication/gauge/shiMian.vue'), //失眠
        fuXie: () => import( /* webpackChunkName: "gauge_fuXie" */ '@/view/complication/gauge/fuXie.vue'), //腹泻
        bianMi: () => import( /* webpackChunkName: "gauge_bianMi" */ '@/view/complication/gauge/bianMi.vue'), //便秘
        eXinOuTu: () => import( /* webpackChunkName: "gauge_eXinOuTu" */ '@/view/complication/gauge/eXinOuTu.vue'), //恶心呕吐
        xiaoHuaBuLiang: () => import( /* webpackChunkName: "gauge_xiaoHuaBuLiang" */ '@/view/complication/gauge/xiaoHuaBuLiang.vue'), //消化不良
        tiZhongDiuShi: () => import( /* webpackChunkName: "gauge_tiZhongDiuShi" */ '@/view/complication/gauge/tiZhongDiuShi.vue'), //体重丢失
        diDanBai: () => import( /* webpackChunkName: "gauge_diDanBai" */ '@/view/complication/gauge/diDanBai.vue'), //低蛋白症
        baiXiBao: () => import( /* webpackChunkName: "gauge_baiXiBao" */ '@/view/complication/gauge/baiXiBao.vue'), //白细胞减少
        kouQiang: () => import( /* webpackChunkName: "gauge_kouQiang" */ '@/view/complication/gauge/kouQiang.vue'), //口腔黏膜受损
        xueXiaoBan: () => import( /* webpackChunkName: "gauge_xueXiaoBan" */ '@/view/complication/gauge/xueXiaoBan.vue'), //血小板计数降低
        feiYan: () => import( /* webpackChunkName: "gauge_feiYan" */ '@/view/complication/gauge/feiYan.vue'), //放射性肺炎
        feiBu: () => import( /* webpackChunkName: "gauge_feiBu" */ '@/view/complication/gauge/feiBu.vue'), //肺部感染
    }
}
</script>
<style scoped lang='scss'>

</style>