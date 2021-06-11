<template>
    <div class="padding-header page-bg-white">
        <mt-header title="我的医生" fixed>
            <div slot="left">
                <header-back>
                    <mt-button icon="back"></mt-button>
                </header-back>
            </div>
            <div slot="right" @click="$router.push({name: 'myDoctor'})">医生</div>
        </mt-header>

        <div class="content">
            <img src="@/assets/images/buyfood.png" alt="" width="40%">
            <p class="des">您还未有绑定医生</p>
            <mt-button type="primary" class="theme-button button-radio" size="large" @click.native="$router.push({name: 'doctorList'})">立即选择医生</mt-button>
        </div>
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
/* @import url(); 引入css类 */
.content{
    width: 70%;
    margin: 0 auto;
    margin-top: 1.25rem;
    text-align: center;
    .des{
        margin: 0.3rem 0;
        font-size: 0.14rem;
    }
}
</style>