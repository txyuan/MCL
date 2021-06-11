<template>
    <div class="padding-header padding-footer page-bg-white">
        <mt-header title="购买服务" fixed>
            <div slot="left">
                <header-back>
                    <mt-button icon="back"></mt-button>
                </header-back>
            </div>
        </mt-header>
        
        <div class="content">
            <div class="section">
                <div class="section-title"><span>服务信息</span></div>
            </div>
            <div class="list">
                <ul>
                    <li>
                        <p class="row-title">服务类型</p>
                        <p class="row-right">自测工具</p>
                    </li>
                    <li>
                        <p class="row-title">工具名称</p>
                        <p class="row-right">BMI</p>
                    </li>
                    <li>
                        <p class="row-title">服务费用</p>
                        <p class="row-right">0元/次</p>
                    </li>
                </ul>
            </div>
        </div>

        <mt-button type="primary" class="theme-button fix_bottom" size="large" @click.native="$router.push({name: 'toolHome', query: $route.query, params:{type: $route.query.type}})">支付</mt-button>
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
.section{
  padding: 0 0.15rem;
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

.content{
    padding-top: 0.2rem;
    .list{
        margin-top: -0.1rem;
    }
    li{
        display: flex;
        justify-content: space-between;
        color: #666;
        font-size: 0.14rem;
        border-bottom: 1px solid #CBCBCB;
        padding: 0.15rem;
        
    }
}
</style>