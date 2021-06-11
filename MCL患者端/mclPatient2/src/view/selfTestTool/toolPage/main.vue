<template>
    <div>
        <component :is="name"></component>
    </div>
</template>

<script>
import { save } from "@/api/selfTest.js"
export default {
    data() {
        return {
            name: 'BMI',
        }
    },
    methods:{
        async submit({value}){
            const query = this.$route.query
            const param = {
               skey: query.skey, 
               SubjectName: query.SubjectName,
               value
            }
            const res = await save(param)
            this.$router.push({name: 'selfTestSolution', query:{ResultSkey: res.ResultSkey, skey: query.skey, type: query.type}})
        }
    },
    created() {
        this.name = this.$route.params.type
    },
    mounted() {

    },
    components:{
        BMI: () => import( /* webpackChunkName: "tool_BMI" */ '@/view/selfTestTool/toolPage/BMI.vue'),   // BMi
        energy: () => import( /* webpackChunkName: "tool_energy" */ '@/view/selfTestTool/toolPage/energy.vue'),  // 每日能量
        protein: () => import( /* webpackChunkName: "tool_protein" */ '@/view/selfTestTool/toolPage/protein.vue'),  // 每日蛋白质
        water: () => import( /* webpackChunkName: "tool_water" */ '@/view/selfTestTool/toolPage/water.vue'),  // 每日水量
        weight: () => import( /* webpackChunkName: "tool_weight" */ '@/view/selfTestTool/toolPage/weight.vue'), // 标准体重
        actualIntake: () => import( /* webpackChunkName: "tool_actualIntake" */ '@/view/selfTestTool/toolPage/actualIntake.vue'),  // 每日实际摄入能量
    }
}
</script>
<style scoped lang='scss'>

</style>