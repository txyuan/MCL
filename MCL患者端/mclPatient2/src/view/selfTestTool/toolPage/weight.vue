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
            <mt-field type="number" label="身高：" placeholder="输入身高（cm）" v-model="height" class="form-item"></mt-field>
        </div>

        <mt-button type="primary" class="theme-button fix_bottom" size="large" @click.native="save">保存</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            height: "",
        }
    },
    computed:{
		title(){ return this.$route.query.SubjectName }
	},
    watch:{
        height(value){
            this.$nextTick(() => {
                this.height = value.toString().replace(/[^\d.]/g,'')
            })
        },
    },
    methods: {
        save(){
            const {height} = this
            if(!height){
                this.$Toast('输入身高')
                return
            }
            this.$parent.submit({value: `${height}`})
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