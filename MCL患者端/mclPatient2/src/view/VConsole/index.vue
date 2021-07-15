<template>
    <div class="page">
        <button @click="$root.openMobileConsole">打开调试</button>
        <button @click="$root.closeMobileConsole">关闭调试</button>
        <button @click="$router.push('/')">返回首页</button>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    }
}
</script>
<style scoped lang='scss'>
.page{
    padding: 15px;
}
</style>