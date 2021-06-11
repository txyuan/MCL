<template>
    <div class="padding-header padding-footer page-bg-hui">
        <mt-header :title="title" fixed>
            <div slot="left">
                <header-back>
                    <mt-button icon="back"></mt-button>
                </header-back>
            </div>
        </mt-header>
        
        <div class="main">
            <!-- <mt-field type="number" label="身高：" placeholder="输入身高（cm）" v-model="height" class="form-item"></mt-field> -->
            <mt-field type="number" label="体重：" placeholder="输入体重（kg）" v-model="weight" class="form-item"></mt-field>
        </div>

        <div class="section">
            <div class="title2">请选择您目前的身体状态：</div>
            <mt-radio :options="dietarysituationRadiolist.option" v-model="dietarysituationRadiolist.value"></mt-radio>
        </div>
        <mt-button type="primary" class="theme-button fix_bottom" size="large" @click.native="save">保存</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // height: "",
            weight: "",
            // 饮食情况
            dietarysituationRadiolist: {
                option: [{label: "卧床患者", value: "20"}, {label: "每天可以在病房走动", value: "25"}, {label: "自由活动", value: "30"}],
                value: ""
            },
        }
    },
    computed:{
		title(){ return this.$route.query.SubjectName }
	},
    watch:{
        // height(value){
        //     this.$nextTick(() => {
        //         this.height = value.toString().replace(/[^\d.]/g,'')
        //     })
        // },
        weight(value){
            this.$nextTick(() => {
                this.weight = value.toString().replace(/[^\d.]/g,'')
            })
        },
    },
    methods: {
        save(){
            const {height, weight} = this
            // if(!height){
            //     this.$Toast('输入身高')
            //     return
            // }
            if(!weight){
                this.$Toast('输入体重')
                return
            }
            if(!this.dietarysituationRadiolist.value){
                this.$Toast('请选择您目前的身体状态')
                return
            }
            this.$parent.submit({value: `${weight},${this.dietarysituationRadiolist.value}`})
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