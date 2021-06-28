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
				{name: "进食，吞咽能力正常", value: "0"}, {name: "可吞咽普通食物但需给予指导", value: "1"}, {name: "除少数难吞咽的食物，3顿均可经口摄取", value: "2"}, {name: "如为能吞咽的食物，3顿均可经口摄取", value: "3"}, {name: "3顿的营养摄取均可经口，但需补充辅助营养", value: "4"},
				{name: "仅1～2顿的营养摄取可经口", value: "5"}, {name: "作为兴趣进食可以，但营养摄取仍需非口途径", value: "6"}, {name: "如做好准备可减少误吸，可进行进食训练", value: "7"}, {name: "大量误吸，吞咽困难或不能吞咽，适合做吞咽基础训练", value: "8"}, {name: "吞咽困难或不能吞咽，不适合做吞咽训练", value: "9"},
				{name: "完全不能进食，不适合做吞咽训练", value: "10"},
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