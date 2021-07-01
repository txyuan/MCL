<template>
    <div class="page">
        <button @click="initDebug">打开调试</button>
        <button @click="$router.push('/')">返回首页</button>
    </div>
</template>

<script>
/*引入微信js-sdk */
import remoteJs from "@/components/common/remote-js.js"
remoteJs('https://cdn.bootcdn.net/ajax/libs/vConsole/3.8.1/vconsole.min.js');
export default {
    data() {
        return {

        }
    },
    methods:{
        initDebug(){
            new window.VConsole()
        }
    }
}
</script>
<style scoped lang='scss'>
.page{
    padding: 15px;
}
</style>