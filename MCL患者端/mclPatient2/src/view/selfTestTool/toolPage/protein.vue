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
            <mt-field type="number" label="体重：" placeholder="输入体重（kg）" v-model="weight" class="form-item"></mt-field>
        </div>

        <mt-button type="primary" class="theme-button fix_bottom" size="large" @click.native="save">保存</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            weight: "",
        }
    },
    computed:{
		title(){ return this.$route.query.SubjectName }
	},
    watch:{
        weight(value){
            this.$nextTick(() => {
                this.weight = value.toString().replace(/[^\d.]/g,'')
            })
        },
    },
    methods: {
        save(){
            const {weight} = this
            if(!weight){
                this.$Toast('输入体重')
                return
            }
            this.$parent.submit({value: `${weight}`})
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