<template>
    <div>
        <component :is="name"></component>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'BMI',
        }
    },
    methods:{
    },
    created() {
        this.name = this.$route.params.type
    },
    mounted() {
    },
    components:{
        BMI: () => import( /* webpackChunkName: "tool_BMI" */ '@/components/home/diet/detail/modules/BMI.vue'),   // BMi
        // energy: () => import( /* webpackChunkName: "tool_energy" */ '@/view/selfTestTool/toolPage/energy.vue'),  // 每日能量
    }
}
</script>
<style scoped lang='scss'>

</style>