<template>
    <div class="padding-header padding-footer page-bg-hui">
        <mt-header :title="title" fixed>
            <div slot="left">
                <header-back>
                    <mt-button icon="back"></mt-button>
                </header-back>
            </div>
        </mt-header>
        
        <div class="section">
            <p class="title2">请选择您每天饮食情况</p>
            <div class="radio—item" v-for="item in list" :key="item.id" @click="currentItem = item">
                <span class="radio" :class="{'checked': item.id == currentItem.id}"></span>
                <div class="content">
                    <div class="label">{{item.label}}</div>
                    <div class="des" v-for="(p, i) in item.des" :key="i">{{p}}</div>
                </div>
            </div>
        </div>
        <mt-button type="primary" class="theme-button fix_bottom" size="large" @click.native="save">保存</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentItem: {},
            list: [
                {id: "0", label: "三餐清流食，无肉、缺油；", des: ["早餐（豆浆200ml）+加餐果汁200ml", '午餐(排骨汤200ml）+加餐牛奶200ml', "晚餐（米汤200ml）"], value: "1"},
                {id: "1", label: "三餐半流食，无肉、缺油：", des: ["早餐（米粥2两、小菜1两）+加餐牛奶200ml", "午餐（面条2两、肉菜汤2两）", "晚餐（米粥2两+小菜1两）"], value: "2"},
                {id: "2", label: "一餐正常普食，两餐半流食，基本无油，少油：", des: ["早餐（米粥2两+鸡蛋1个+小菜1两+牛奶200ml）+加餐果汁200ml", "午餐（米饭2两+汤2两+肉炒菜3两）", "晚餐（米粥2两+小菜1两)"], value: "3"},
                {id: "3", label: "两餐正常普食，一餐半流食，少肉，少油：", des: ["早餐（米粥2两+花卷1两+鸡蛋1个+小菜1两+牛奶100ml）", "午餐（米饭2两+汤2两+肉1两+菜3两）+加餐桔子2两", "晚餐（米粥2两+小菜1两+牛奶100ml）"], value: "4"},
                {id: "4", label: "三餐正常普食，主食，肉，蛋，奶，菜，油脂充足：", des: ["早餐（米粥2两+花卷1两+鸡蛋1个+小菜1两+牛奶100ml）+加餐苹果2两", "早餐（米粥2两+花卷1两+鸡蛋1个+小菜1两+牛奶100ml）+加餐苹果2两"], value: "5"},
            ]
        }
    },
    computed:{
		title(){ return this.$route.query.SubjectName }
	},
    methods: {
        save(){
            const {currentItem} = this
            if(JSON.stringify(currentItem) == "{}"){
                this.$Toast('请选择您每天饮食情况')
                return
            }
            this.$parent.submit({value: `${currentItem.value}`})
        }
    },
    created() {

    },
    mounted() {

    }
}
</script>
<style scoped lang='scss'>
@import "./form.scss";
</style>