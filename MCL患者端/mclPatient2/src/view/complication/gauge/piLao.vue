<template>
    <div class="padding-header page-bg-white">
        <mt-header :title="title" fixed>
            <div slot="left">
                <header-back>
                <mt-button icon="back"></mt-button>
                </header-back>
            </div>
        </mt-header>

        <div class="form-panel">
			<div >
				<div id="45" class="q">
					<div align="" class="auto-style3">
						<div class="askTitle"><strong>1、您现在{{title}}的严重程度</strong></div>
					</div>
				</div>
				<ul class="answerUl">
					<li v-for="(item, index) in list" :key="index"><input type="radio" name="radio" :value="item.value" :id="`radio${index}`"> <label :for="`radio${index}`">{{item.name}}</label></li>
				</ul>
			</div>
		</div>

        <mt-button
            type="primary"
            class="theme-button fix_bottom"
            size="large"
            @click.native="save"
        >保存</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        const { type } = this.$route.params
        return {
            type, 
            rangeValue: 0,
            list: [
				{name: "无症状", value: "0"}, {name: "非常轻微", value: "1"}, {name: "稍微有", value: "2"}, {name: "少量有", value: "3"}, {name: "中等程度", value: "4"},
				{name: "较明显", value: "5"}, {name: "一般严重", value: "6"}, {name: "比较严重", value: "7"}, {name: "非常严重", value: "8"}, {name: "特别严重", value: "9"},
				{name: "极为严重", value: "10"},
			]
        }
    },
	computed:{
		title(){ return this.$route.query.title }
	},
    methods:{
		save(){
			const radio = document.querySelectorAll(".form-panel input[type=radio]:checked")
			if((radio.length == 0)){
				this.$Toast('请选择严重程度')
				return
			}
			let value = 0;
			radio.forEach(item => value += Number(item.value));
			this.$parent.submit({value: `${value}`})
		}
    },
    created() {
        
    },
    mounted() {
    }
}
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>