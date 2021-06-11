<template>
    <div class="padding-header page-bg-white">
        <mt-header title="马医生" fixed>
            <div slot="left">
                <header-back>
                    <mt-button icon="back"></mt-button>
                </header-back>
            </div>
        </mt-header>

        <div class="content">
            <div class="search-group">
                <input type="text" placeholder="请输入想要搜索的内容">
                <img src="@/assets/images/搜索@2x.png" alt="" class="search">
            </div>
            <div class="question">
                <div class="question-title">常见问题</div>
                <div class="question-item">1. 什么是MCL</div>
                <div class="question-item">2. MCl如何帮助我更快康复</div>
                <div class="question-item">3. MCl在哪里</div>
            </div>
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
.content{
    padding: 1px;
}

.search-group{
    margin: 0.15rem;
    padding: 0.1rem  0.2rem;
    display: flex;
    align-items: center;
    background: #f2f2f2;
    border-radius: 0.2rem;
    input{
        flex: 1;
        border: none;
        color: #666;
    }
    .search{
        width: 0.2rem;
        height: 0.2rem;
        margin-left: 0.1rem;
    }
}

.question{
    margin: 0.2rem;
    border-radius: 0.08rem;
    background: #FFF;
    box-shadow: 0px 2px 10px 2px #ccc;
    .question-title,.question-item{
        line-height: 0.45rem;
        padding: 0 0.15rem;
        padding-right: 0.3rem;
    }
    .question-item{
        color: #999;
        border-top: 1px solid #CBCBCB;
        background: url('../../assets/images/jiantou@2x.png') no-repeat calc(100% - 0.08rem);
        background-size: 0.25rem;
    }
}
</style>