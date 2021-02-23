<template>
	<div class="PG-SGA-root padding-header padding-footer">
		<mt-header title="筛查评估" fixed>
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div>
			<!--<div class="title yellow">1.疾病情况</div>
      <mt-radio :options="attribute_value_67.option" v-model="attribute_value_67.value"></mt-radio>-->
			<div class="pgContent" style="padding-bottom: 0">
				<div class="title mainTitle"><em></em>体重自测</div>
				<div class="matterDetails">
					<div class="title2 bg-white">
						1、您现在是否严重胸腹水、水肿？
					</div>
					<mt-radio :options="attribute_value_01.option" v-model="attribute_value_01.state" class="radio-nowrap"></mt-radio>
					<mt-field label="白蛋白值" placeholder="请输入白蛋白值" class="" v-model.trim="attribute_value_01.value" v-show="attribute_value_01.show">
						<span>g/L</span>
					</mt-field>
					<!-- <div class="title2 bg-white" v-show="attribute_value_01.show">
        白蛋白值 <input type="tel" class="line-input" v-model="attribute_value_01.value"> g/L
      </div> -->
					<!-- <div class="title2 bg-white" v-show="attribute_value_02.show">
        您的体重<input type="tel" class="line-input" v-model="attribute_value_02.value"> kg
      </div> -->
					<mt-field label="您的体重" placeholder="请输入体重" class="" v-model.trim="attribute_value_02.value" v-show="attribute_value_02.show">
						<span>kg</span>
					</mt-field>
				</div>
				<div class="matterDetails">
					<div class="title2 bg-white">
						2、在过去的2周，我的体重
					</div>

					<mt-radio :options="attribute_value_03.option" v-model="attribute_value_03.value" class="radio-nowrap "></mt-radio>
				</div>
				<div class="matterDetails">
					<div class="title2 bg-white">
						3、近期<em>（1-3月）</em>体重是否下降超过5%？<em> (（原体重-现体重）/原体重 *100%)</em>
					</div>
					<mt-radio :options="attribute_value_06.option" v-model="attribute_value_06.state" class="radio-nowrap"></mt-radio>
					<mt-field label="体重下降了" placeholder="请输入体重" class="" v-model.trim="attribute_value_06.value" v-show="attribute_value_06.show">
						<span>kg</span>
					</mt-field>
					<mt-radio :options="attribute_value_05.option" v-model="attribute_value_05.value" class="radio-nowrap" v-show="attribute_value_06.show"></mt-radio>
					<mt-field label="1个月前体重" placeholder="请输入体重" class="" v-model.trim="attribute_value_04.value">
						<span>kg</span>
					</mt-field>
				</div>
				<!-- <div class="title2 bg-white" >
        您是否记得2个月前的体重？
      </div>
      <mt-radio :options="attribute_value_05.option" v-model="attribute_value_05.state" class="radio-nowrap"></mt-radio>
      <mt-field label="2个月前体重" placeholder="请输入体重" class="" v-model.trim="attribute_value_05.value" v-show="attribute_value_05.show">
        <span >kg</span>
      </mt-field>
      <div></div>
      <div class="title2 bg-white" >
        您是否记得3个月前的体重？
      </div>
      <mt-radio :options="attribute_value_06.option" v-model="attribute_value_06.state" class="radio-nowrap"></mt-radio>
      <mt-field label="3个月前体重" placeholder="请输入体重" class="" v-model.trim="attribute_value_06.value" v-show="attribute_value_06.show">
        <span >kg</span>
      </mt-field>
      <div></div>
      <div class="title2 bg-white" >
        您是否记得6个月前的体重？
      </div>
      <mt-radio :options="attribute_value_07.option" v-model="attribute_value_07.state" class="radio-nowrap"></mt-radio>
      <mt-field label="6个月前体重" placeholder="请输入体重" class="" v-model.trim="attribute_value_07.value" v-show="attribute_value_07.show">
        <span >kg</span>
      </mt-field>
      <div></div> -->
			</div>
			<div class="pgContent">
				<div class="title mainTitle"><em></em>进食情况</div>

				<div class="matterDetails">
					<div class="title2 bg-white">
						1、在过去1个月里，我的进食情况与平时相比
					</div>
					<mt-radio :options="attribute_value_08.option" v-model="attribute_value_08.value"></mt-radio>
				</div>

				<div class="matterDetails">
					<div class="title2 bg-white">
						2、请评估一下，上一周您进食的情况<em>（设定之前的进食可以正常饮食，为100%）</em>
					</div>
					<mt-radio :options="attribute_value_09.option" v-model="attribute_value_09.value"></mt-radio>
				</div>

				<div class="matterDetails">
					<div class="title2 bg-white">
						3、您目前的进食情况<em class="fontCol"></em>
					</div>
					<mt-checklist :options="attribute_value_10.option" v-model="attribute_value_10.value"></mt-checklist>
				</div>
				<div class="matterDetails">
					<div class="title2 bg-white">
						4、近2周来，我有以下问题，影响我的饮食<em class="fontCol">（可多选）</em>
					</div>
					<mt-checklist :options="attribute_value_17.option" v-model="attribute_value_17.value"></mt-checklist>
					<mt-field label="疼痛" placeholder="疼痛（部位）" class="" v-model.trim="attribute_value_30.value" v-show="attribute_value_30.show"></mt-field>
					<mt-field label="其他" placeholder="(如抑郁，经济，牙齿)" class="" v-model.trim="attribute_value_32.value" v-show="attribute_value_32.show"></mt-field>
				</div>
			</div>
			<div class="pgContent">
				<div class="title mainTitle"><em></em>活动和身体功能</div>
				<div class="matterDetails">
					<div class="title2 bg-white">
						1、在过去的1个月，我的活动<em class="fontCol"></em>
					</div>
					<mt-checklist :options="attribute_value_33.option" v-model="attribute_value_33.value"></mt-checklist>
				</div>
			</div>
			<div class="pgContent">
				<div class="title mainTitle"><em></em>身体应激情况</div>
				<div class="matterDetails">
					<div class="title2 bg-white">
						2、您目前是否有发热
					</div>
					<mt-radio :options="attribute_value_38.option" v-model="attribute_value_38.value"></mt-radio>

				</div>
				<div class="matterDetails">
					<div class="title2 bg-white">
						3、若有发热，持续时间
					</div>
					<mt-radio :options="attribute_value_39.option" v-model="attribute_value_39.value"></mt-radio>
				</div>
				<div class="matterDetails">
					<div class="title2 bg-white">4、是否用激素<em>（强的松）</em>
					</div>
					<mt-radio :options="attribute_value_40.option" v-model="attribute_value_40.value"></mt-radio>
				</div>
			</div>
			<div class="pgContent">
				<div class="title mainTitle"><em></em>肌肉丢失情况</div>
				<div class="matterDetails">
					<div class="title2 bg-white hahaha">
						1、颞部<em>（颞肌）</em> ：直接观察，头转向一边
					</div>
					<div class="formImgWrap">
						<img src="../../assets/images/颞部01.png" style="width: 50%" /><img src="../../assets/images/颞部02.png" style="width: 50%" />
					</div>
					<mt-radio :options="attribute_value_41.option" v-model="attribute_value_41.value"></mt-radio>
				</div>
				<div class="matterDetails">
					<div class="title2 bg-white">
						2、锁骨部位<em>（胸部三角肌）</em> ：看锁骨是否凹陷
					</div>
					<div class="formImgWrap">
						<img class="formImg" src="../../assets/images/锁骨部位.png" />
					</div>
					<mt-radio :options="attribute_value_42.option" v-model="attribute_value_42.value"></mt-radio>
				</div>
				<div class="matterDetails">
					<div class="title2 bg-white">
						3、肩部<em>（三角肌）</em>：看肩部是否凸出，形状，手下垂
					</div>
					<div class="formImgWrap">
						<img class="formImg" src="../../assets/images/肩部（三角肌）.png" />
					</div>
					<mt-radio :options="attribute_value_43.option" v-model="attribute_value_43.value"></mt-radio>
				</div>
				<div class="matterDetails">
					<div class="title2 bg-white">
						4、骨间肌肉：观察手背，拇指和食指对捏，观察虎口处是否凹陷
					</div>
					<div class="formImgWrap">
						<img class="formImg" src="../../assets/images/骨间肌肉.png" />
					</div>
					<mt-radio :options="attribute_value_44.option" v-model="attribute_value_44.value"></mt-radio>
				</div>
				<div class="matterDetails">
					<div class="title2 bg-white">
						5、肩胛部<em>（背阔肌、斜方肌、三角肌）</em>：双手前推，看肩胛骨是否凸出
					</div>
					<div class="formImgWrap">
						<img class="formImg" src="../../assets/images/肩胛骨部.png" />
					</div>
					<mt-radio :options="attribute_value_45.option" v-model="attribute_value_45.value"></mt-radio>
				</div>
				<div class="matterDetails">
					<div class="title2 bg-white">6、大腿<em>（四头肌）</em>
					</div>
					<div class="formImgWrap">
						<img class="formImg" src="../../assets/images/大腿.png" />
					</div>
					<mt-radio :options="attribute_value_46.option" v-model="attribute_value_46.value"></mt-radio>
				</div>
				<div class="matterDetails">
					<div class="title2 bg-white">7、小腿<em>（腓肠肌）</em>
					</div>
					<div class="formImgWrap">
						<img class="formImg" src="../../assets/images/小腿.png" />
					</div>
					<mt-radio :options="attribute_value_47.option" v-model="attribute_value_47.value"></mt-radio>
				</div>
				<!--<div class="title mainTitle">7.身体水肿情况</div>
      <div class="title2 bg-white" style="margin: 0px; padding-top: 0px; padding-bottom: 0px; min-height: 48px; line-height: 48px;">踝水肿（仰卧，按压 5 s）：</div>
      <mt-radio :options="attribute_value_68.option" v-model="attribute_value_68.value"></mt-radio>
      <div class="title2 bg-white" style="margin: 0px; padding-top: 0px; padding-bottom: 0px; min-height: 48px; line-height: 48px;">骶部水肿（侧卧，按压 5 s）：</div>
      <mt-radio :options="attribute_value_69.option" v-model="attribute_value_69.value"></mt-radio>
      <div class="title2 bg-white" style="margin: 0px; padding-top: 0px; padding-bottom: 0px; min-height: 48px; line-height: 48px;">腹水（检查有无移动性浊音、振水音、腹围是否增大）：</div>
      <mt-radio :options="attribute_value_70.option" v-model="attribute_value_70.value"></mt-radio>-->
			</div>
			<div class="fix_bottom">
				<mt-button type="primary" class="theme-button button-radio" size="large" @click.native="submit">下一步</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
// 表单
const formDataObj = {
  attribute_value_01: {
    option: ['是', '否'],
    value: '',
    state: '',
    radiolist: true,
    show: false
  },
  attribute_value_02: {
    value: '',
    show: false
  },
  attribute_value_03: {
    option: ['减轻', '没变化', '增加'],
    value: '',
    radiolist: true
  },
  attribute_value_04: {
    option: ['是', '否'],
    state: '',
    value: '',
    radiolist: true
  },
  attribute_value_05: {
    option: ['3个月内体重下降', '2个月内体重下降', '1个月内体重下降'],
    state: '',
    value: '',
    radiolist: true
  },
  attribute_value_06: {
    option: ['是', '否'],
    state: '',
    value: '',
    radiolist: true
  },
  value_05_flag: {
    value: ''
  },
  // attribute_value_07: {
  //   option: ['是', '否'],
  //   state: '',
  //   value: '',
  //   radiolist: true
  // },
  attribute_value_08: {
    option: ['没变化', '比以往多', '比以往少'],
    value: '',
    radiolist: true
  },
  attribute_value_09: {
    option: ['没有变化', '减少25%-50%', '减少50%-75%', '减少75%以上'],
    value: '',
    radiolist: true
  },
  attribute_value_10: {
    option: [{
      label: '正常饮食',
      value: '正常饮食',
      id: '10'
    },
    {
      label: '正常饮食，但比正常情况少',
      value: '正常饮食，但比正常情况少',
      id: '11'
    },
    {
      label: '少量固体食物',
      value: '少量固体食物',
      id: '12'
    },
    {
      label: '只能进食流食',
      value: '只能进食流食',
      id: '13'
    },
    {
      label: '只能口服营养制剂',
      value: '只能口服营养制剂',
      id: '14'
    },
    {
      label: '几乎吃不下什么',
      value: '几乎吃不下什么',
      id: '15'
    },
    {
      label: '只能通过管饲进食或静脉营养',
      value: '只能通过管饲进食或静脉营养',
      id: '16'
    }
    ],
    value: [],
    checklist: true
  },
  attribute_value_17: {
    option: [{
      label: '吃饭没有问题',
      value: '吃饭没有问题',
      id: '17'
    },
    {
      label: '没有食欲，不想吃',
      value: '没有食欲，不想吃',
      id: '18'
    },
    {
      label: '恶心',
      value: '恶心',
      id: '19'
    },
    {
      label: '呕吐',
      value: '呕吐',
      id: '20'
    },
    {
      label: '口腔溃疡',
      value: '口腔溃疡',
      id: '21'
    },
    {
      label: '便秘',
      value: '便秘',
      id: '22'
    },
    {
      label: '腹泻',
      value: '腹泻',
      id: '23'
    },
    {
      label: '口干',
      value: '口干',
      id: '24'
    },
    {
      label: '食品没味',
      value: '食品没味',
      id: '25'
    },
    {
      label: '食品气味不好',
      value: '食品气味不好',
      id: '26'
    },
    {
      label: '吞咽困难',
      value: '吞咽困难',
      id: '27'
    },
    {
      label: '一会儿就饱了',
      value: '一会儿就饱了',
      id: '28'
    },
    {
      label: '疼痛',
      value: '疼痛',
      id: '29'
    },
    {
      label: '其他',
      value: '其他',
      id: '31'
    }
    ],
    value: [],
    checklist: true
  },
  attribute_value_30: {
    value: '',
    show: false
  },
  attribute_value_32: {
    value: '',
    show: false
  },
  attribute_value_33: {
    option: [{
      label: '正常, 无限制',
      value: '正常, 无限制',
      id: '33'
    },
    {
      label: '不像往常,但还能起床进行轻微的活动',
      value: '不像往常,但还能起床进行轻微的活动',
      id: '34'
    },
    {
      label: '多数时候不想起床活动, 但卧床或坐椅时间不超过半天',
      value: '多数时候不想起床活动, 但卧床或坐椅时间不超过半天',
      id: '35'
    },
    {
      label: '几乎干不了什么, 一天大多数时候都卧床或在椅子上',
      value: '几乎干不了什么, 一天大多数时候都卧床或在椅子上',
      id: '36'
    },
    {
      label: '几乎完全卧床，无法起床',
      value: '几乎完全卧床，无法起床',
      id: '37'
    }
    ],
    value: [],
    checklist: true
  },
  attribute_value_38: {
    option: ['无', '37.2-38.3', '38.3-38.8', '≥38.8'],
    value: '',
    radiolist: true
  },
  attribute_value_39: {
    option: ['无', '<72小时', '72小时', '＞72小时'],
    value: '',
    radiolist: true
  },
  attribute_value_40: {
    option: [{
      label: '无',
      value: '无'
    },
    {
      label: '低剂量(<10m强的松或相当剂量的其它激素/d)',
      value: '低剂量'
    },
    {
      label: '中剂量(10－30m强的松或相当剂量的其它激素/d)',
      value: '中剂量'
    },
    {
      label: '大剂量(30m强的松或相当剂量的其它激素/d)',
      value: '大剂量'
    }
    ],
    value: '',
    radiolist: true
  },
  attribute_value_41: {
    option: [{
      label: '看不到明显凹陷',
      value: '正常'
    },
    {
      label: '轻度凹陷',
      value: '轻度'
    },
    {
      label: '凹陷',
      value: '中度'
    },
    {
      label: '显著凹陷',
      value: '严重'
    }
    ],
    value: '',
    radiolist: true
  },
  attribute_value_42: {
    option: [{
      label: '男性看不到锁骨或者女性看到但不凸出',
      value: '正常'
    },
    {
      label: '部分凸出',
      value: '轻度'
    },
    {
      label: '凸出',
      value: '中度'
    },
    {
      label: '明显凸出',
      value: '严重'
    }
    ],
    value: '',
    radiolist: true
  },
  attribute_value_43: {
    option: [{
      label: '圆形',
      value: '正常'
    },
    {
      label: '肩峰轻度凸出',
      value: '轻度'
    },
    {
      label: '介于两者之间',
      value: '中度'
    },
    {
      label: '肩锁关节方形，骨骼凸出',
      value: '严重'
    }
    ],
    value: '',
    radiolist: true
  },
  attribute_value_44: {
    option: [{
      label: '肌肉凸出，女性平坦',
      value: '正常'
    },
    {
      label: '平坦',
      value: '轻度'
    },
    {
      label: '平坦和凹陷',
      value: '中度'
    },
    {
      label: '明显凹陷',
      value: '严重'
    }
    ],
    value: '',
    radiolist: true
  },
  attribute_value_45: {
    option: [{
      label: '不凸出，内侧不凹陷',
      value: '正常'
    },
    {
      label: '轻度凸出，肋，肩胛，肩，脊柱间轻度凹陷',
      value: '轻度'
    },
    {
      label: '凸出，肋，肩胛，肩，脊柱间凹陷',
      value: '中度'
    },
    {
      label: '明显凸出，肋，肩胛，肩，脊柱间明显凹陷',
      value: '严重'
    }
    ],
    value: '',
    radiolist: true
  },
  attribute_value_46: {
    option: [{
      label: '圆形，张力明显',
      value: '正常'
    },
    {
      label: '消瘦，肌力较弱',
      value: '轻度'
    },
    {
      label: '介于两者之间',
      value: '中度'
    },
    {
      label: '明显消瘦，几乎无肌张力',
      value: '严重'
    }
    ],
    value: '',
    radiolist: true
  },
  attribute_value_47: {
    option: [{
      label: '肌肉发达',
      value: '正常'
    },
    {
      label: '瘦，有肌肉轮廓',
      value: '轻度'
    },
    {
      label: '瘦，肌肉轮廓模糊',
      value: '中度'
    },
    {
      label: '瘦，无肌肉轮廓，肌肉松垮无力',
      value: '严重'
    }
    ],
    value: '',
    radiolist: true
  }
}
export default {
  name: 'friend',
  data: () => ({
    screeningskey: '', // 筛查主键
    ...formDataObj
    //			attribute_value_67: {
    //				option: ['一般恶性肿瘤', '糖尿病', '慢性疾病( 如肝硬化、COPD)', '血液恶性肿瘤', '腹部大手术', '重症监护患者( APACHE ＞ 10)'],
    //				value: "",
    //				radiolist: true
    //			},
    //			attribute_value_68: {
    //				option: ['无凹陷', '轻微凹陷', '介于两者之间', '凹陷非常明显，不能回弹'],
    //				value: "",
    //				radiolist: true
    //			},
    //			attribute_value_69: {
    //				option: ['无凹陷', '轻微凹陷', '介于两者之间', '凹陷非常明显，不能回弹'],
    //				value: "",
    //				radiolist: true
    //			},
    //			attribute_value_70: {
    //				option: ['无振水音、腹围无增大', '左右侧卧时有移动性浊音', '慢性疾病( 如肝硬化、COPD)', '平卧时有振水音', '腹胀明显，腹围增大'],
    //				value: "",
    //				radiolist: true
    //			},
  }),
  watch: {
    'attribute_value_01.state': function (val) {
      this.attribute_value_01.show = false
      this.attribute_value_02.show = false
      this.attribute_value_01.value = ''
      this.attribute_value_02.value = ''
      if (val == '是') {
        this.attribute_value_01.show = true
      } else if (val == '否') {
        this.attribute_value_02.show = true
      }
    },
    'attribute_value_04.state': function (val) {
      this.attribute_value_04.value = ''
      if (val == '是') {
        this.attribute_value_04.show = true
      } else if (val == '否') {
        this.attribute_value_04.show = false
      }
    },
    'attribute_value_05.state': function (val) {
      this.attribute_value_05.value = ''
      if (val == '是') {
        this.attribute_value_05.show = true
      } else if (val == '否') {
        this.attribute_value_05.show = false
      }
    },
    'attribute_value_06.state': function (val) {
      this.attribute_value_06.value = ''
      this.attribute_value_05.value = ''
      this.value_05_flag.value = val
      if (val == '是') {
        this.attribute_value_06.show = true
      } else if (val == '否') {
        this.attribute_value_06.show = false
      }
    },
    // 'attribute_value_07.state': function (val) {
    //   this.attribute_value_07.value = ''
    //   if (val == '是') {
    //     this.attribute_value_07.show = true
    //   } else if (val == '否') {
    //     this.attribute_value_07.show = false
    //   }
    // },
    'attribute_value_17.value': function (valList) {
      if (valList.indexOf('疼痛') != -1) {
        this.attribute_value_30.show = true
      } else {
        this.attribute_value_30.show = false
      }

      if (valList.indexOf('其他') != -1) {
        this.attribute_value_32.show = true
      } else {
        this.attribute_value_32.show = false
      }
    }
  },
  methods: {
    // 提交
    submit () {
      let param = {} // screeningskey: this.screeningskey
      // 遍历数据
      Object.keys(formDataObj).forEach((key) => {
        let rowData = formDataObj[key]

        if (rowData) {
          // 多选框 未选中0  选中1
          if (rowData.checklist) {
            rowData.option.forEach((item) => {
              let checklistVal = 0
              if (rowData.value.indexOf(item.value) != -1) {
                checklistVal = 1
              }
              param[`attribute_value_${item.id}`] = checklistVal
            })
          } else {
            param[key] = rowData.value
          }
        }
      })
      // for (let i = 1; i <= 47; i++) {
      //   let index = (i < 10 ? `0${i}` : i)
      //   let rowData = this.$data[`attribute_value_${index}`]
      //   if (rowData) {
      //     // 多选框	  未选中0  选中1
      //     if (rowData.checklist) {
      //       rowData.option.forEach((item) => {
      //         let checklistVal = 0
      //         if (rowData.value.indexOf(item.value) != -1) {
      //           checklistVal = 1
      //         }
      //         param[`attribute_value_${item.id}`] = checklistVal
      //       })
      //     } else {
      //       param[`attribute_value_${index}`] = rowData.value
      //     }
      //   }
      // }

      // 您现在是否严重胸腹水、水肿?
      if ((!formDataObj.attribute_value_01.show) && (!formDataObj.attribute_value_02.show)) {
        this.$Toast('请选择您现在是否严重胸腹水、水肿')
        return
      }
      if (formDataObj.attribute_value_01.show) {
        if (param.attribute_value_01 == '') {
          this.$Toast('请填写白蛋白值')
          return
        }
      }
      if (formDataObj.attribute_value_02.show) {
        if (param.attribute_value_02 == '') {
          this.$Toast('请填写您的体重')
          return
        }
      }
      // 在过去两周，我的体重
      if (param.attribute_value_03 == '') {
        this.$Toast('请选择在过去两周，我的体重')
        return
      }
      // 近期（1-3月）体重是否下降超过5%
      if (formDataObj.attribute_value_06.state == '') {
        this.$Toast('请选择近期（1-3月）体重是否下降超过5%')
        return
      }
      if (formDataObj.attribute_value_06.show) {
        if (param.attribute_value_06 == '') {
          this.$Toast('请填写体重下降了')
          return
        }
        if (param.attribute_value_05 == '') {
          this.$Toast('请选择几个月内体重下降')
          return
        }
      }
      if (param.attribute_value_04 == '') {
        this.$Toast('请填写1个月前体重')
        return
      }
      // 在过去1个月里，我的进食情况与平时相比
      if (param.attribute_value_08 == '') {
        this.$Toast('请选择在过去1个月里，我的进食情况与平时相比')
        return
      }
      // 请评估一下，上一周您进食的情况
      if (param.attribute_value_09 == '') {
        this.$Toast('请评估一下，上一周您进食的情况')
        return
      }
      // 您目前的进食情况
      if ((param.attribute_value_10 == 0) && (param.attribute_value_11 == 0) && (param.attribute_value_12 == 0) && (param
        .attribute_value_13 == 0) && (param.attribute_value_14 == 0) && (param.attribute_value_15 == 0) && (param.attribute_value_16 ==
						0)) {
        this.$Toast('请选择您目前的进食情况')
        return
      }
      // 近2周来，我有以下问题，影响我的饮食
      if ((param.attribute_value_17 == 0) && (param.attribute_value_18 == 0) && (param.attribute_value_19 == 0) && (param
        .attribute_value_20 == 0) && (param.attribute_value_21 == 0) && (param.attribute_value_22 == 0) && (param.attribute_value_23 ==
						0) && (param.attribute_value_24 == 0) && (param.attribute_value_25 == 0) && (param.attribute_value_26 == 0) && (
        param.attribute_value_27 == 0) && (param.attribute_value_28 == 0) && (param.attribute_value_29 == 0) && (param.attribute_value_31 ==
						0)) {
        this.$Toast('请选择近2周来，我有以下问题，影响我的饮食')
        return
      }
      // 在过去的1个月，我的活动
      if ((param.attribute_value_33 == 0) && (param.attribute_value_34 == 0) && (param.attribute_value_35 == 0) && (param
        .attribute_value_36 == 0) && (param.attribute_value_37 == 0)) {
        this.$Toast('请选择在过去的1个月，我的活动')
        return
      }
      // 您目前是否有发热
      if (param.attribute_value_38 == '') {
        this.$Toast('请选择您目前是否有发热')
        return
      }
      // 若有发热，持续时间
      if (param.attribute_value_39 == '') {
        this.$Toast('请选择若有发热，持续时间')
        return
      }
      // 是否用激素
      if (param.attribute_value_40 == '') {
        this.$Toast('请选择是否用激素')
        return
      }
      // 请选择颞部（颞肌）：直接观察，头转向一边
      if (param.attribute_value_41 == '') {
        this.$Toast('请选择颞部（颞肌）：直接观察，头转向一边')
        return
      }
      // 锁骨部位（胸部三角肌） ：看锁骨是否凹陷
      if (param.attribute_value_42 == '') {
        this.$Toast('请选择锁骨部位（胸部三角肌） ：看锁骨是否凹陷')
        return
      }
      // 肩部（三角肌）：看肩部是否凸出，形状，手下垂
      if (param.attribute_value_43 == '') {
        this.$Toast('请选择肩部（三角肌）：看肩部是否凸出，形状，手下垂')
        return
      }
      // 骨间肌肉：观察手背，拇指和食指对捏，观察虎口处是否凹陷
      if (param.attribute_value_44 == '') {
        this.$Toast('请选择骨间肌肉：观察手背，拇指和食指对捏，观察虎口处是否凹陷')
        return
      }
      // 肩胛部（背阔肌、斜方肌、三角肌）：双手前推，看肩胛骨是否凸出
      if (param.attribute_value_45 == '') {
        this.$Toast('请选择肩胛部（背阔肌、斜方肌、三角肌）：双手前推，看肩胛骨是否凸出')
        return
      }
      // 大腿（四头肌）
      if (param.attribute_value_46 == '') {
        this.$Toast('请选择大腿（四头肌）')
        return
      }
      // 小腿（腓肠肌）
      if (param.attribute_value_47 == '') {
        this.$Toast('请选择小腿（腓肠肌）')
        return
      }
      let url = 'UserInterface/PGSGASubmit.ashx'
      this.$post(url, param).then((data) => {
        if (data.rspcode != 1) {
          this.$Toast(data.rspdesc)
          return
        }
        this.$Toast('保存成功')

        // 查看报告
        // if(data.ismember=="0"){
        // 	this.$router.push(`/personalnutrition`);
        // }else{
        // 	this.$router.push(`/nuteye?id=${data.screeninginfo}`);
        // }
        let url = `/dietarySurvey?id=${data.screeninginfo}&DietarySurveySkey=${data.DietarySurveySkey}`
        this.$router.push(url)
      })
    }
  },
  mounted () {
    this.screeningskey = this.$route.query.screeningskey
  },
  components: {},
  created () {
    if (localStorage.userInfo) {

    } else {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
	.PG-SGA-root {
		background-color: #f1f1f1;
		padding-top: 48px;
		padding-bottom: 62px;

		.mint-header {
			height: 47px;
			border-bottom: 1px solid #f1f1f1;
		}

		.pgContent {
			margin-top: 0.1rem;
			background-color: #FFFFFF;
			padding-bottom: 0.1rem;

			.mainTitle {
				border-bottom: 1px solid #e1e1e1;
				padding: 0.1rem;
				font-size: 0.15rem;
				line-height: 20px;
				color: #222;

				em {
					display: inline-block;
					width: 4px;
					height: 16px;
					background-color: #0AC5C9;
					margin-right: 0.075rem;
					border-radius: 2px;
					top: 2px;
					position: relative;
				}
			}

			.matterDetails {
				margin-left: 0.125rem;
				border-bottom: 1px dashed #e1e1e1;
				padding-bottom: 0.1rem;

				.title2 {
					padding: 0.125rem 0.05rem 0.075rem 0.05rem;
					margin-top: 0px;
					font-size: 0.145rem;
					color: #565656;
					line-height: 1.5;
				}

				em {
					font-style: normal;
					color: #787878;
					font-size: 0.14rem;
				}

				em.fontCol {
					color: #0AC5C9;
				}

				.line-input {
					width: 50px;
					border: none;
					border-bottom: 1px solid #EEEEEE;
				}

				.mint-field {
					padding-bottom: 0.1rem;
				}

				a.mint-cell .mint-cell-text {
					font-size: 0.14rem;
					color: #666666;
				}

				a.mint-cell .mint-field-other span {
					font-size: 0.14rem;
					color: #666666;
				}

				.mint-field .mint-cell-title,
				.my-mint-cell .mint-cell-title {
					-webkit-box-flex: 0;
					-ms-flex: none;
					flex: none;
				}

				.my-mint-cell .mint-cell-value {
					flex: 1;
				}

				.mint-cell-value .mint-field-core,
				.mint-cell-value select {
					height: 33px;
					margin: 0px 10px;
					font-size: 14px;
					color: inherit;
					text-indent: 5px;
				}

				a.mint-cell .mint-cell-wrapper .mint-cell-value input {
					border: none;
					border-bottom: 1px solid #B7B4B4;
					padding-left: 0.1rem;
				}

				a.mint-cell .mint-cell-wrapper .mint-cell-value input::-webkit-input-placeholder {
					color: #787878;
					font-size: 0.14rem;
				}

				a.mint-field .mint-cell-wrapper {
					background-color: #f5f5f5;
				}

				.mint-field .mint-cell-title {
					width: auto;
				}

				// 多选框
				.mint-radiolist.radio-nowrap {
					background: #FFF;
					color: #666666;

					.mint-cell {
						/*display: inline-block;*/
					}

					.mint-radiolist-label {
						white-space: nowrap;
					}
				}

				.mint-checkbox-core {
					border-radius: 6px;
					width: 18px;
					height: 18px;
				}

				.mint-checkbox-core::after {
					top: 2px;
					width: 5px;
					height: 10px;
				}

				// 单选框
				.mint-radiolist-label,
				.mint-checklist-label {
					display: flex;
					align-items: flex-start;
					padding: 0.075rem 0;
				}

				.mint-radiolist .mint-radio-label,
				.mint-checkbox-label {
					font-size: 0.145rem;
					color: #565656;
				}

				.mint-radiolist .mint-radiolist-title,
				.mint-checklist-title {
					margin: 0;
				}

				.mint-radio-input:checked+.mint-radio-core,
				.mint-checkbox-input:checked+.mint-checkbox-core {
					background-color: #0AC5C9;
					border-color: #23bec8;
				}
			}
		}

		.matterDetails:last-child {
			border-bottom: 0;
		}
	}

	.formImgWrap {
		padding: 0 15px;

		img {
			width: 100%;
			margin: 0.1rem auto;
		}
	}

	.formImg {
		width: 100%;
		display: block;
	}

	.fix_bottom {
		padding: 0;

		.theme-button {
			border-radius: 0;
			height: 48px;
			background-color: #0AC5C9;
		}
	}
</style>
