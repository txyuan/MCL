<template>
  <div class="symptom-root rangid">
    <div id="body_main" style="background-color: #f1f1f1; padding-bottom: 0; ">
      <mt-header fixed title="症状管理">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
	  
      <div id="page" ref="homePage" >
			<span v-for="(item, index) in ids" :key="index">
				<label @click="openModal(item)">{{item.name}}</label>
				<input v-if="item.itemindex == ''" :id="item.id" type="checkbox" :name="item.id" @click="openModal(item)" class="active">
				<input v-else :id="item.id" type="checkbox" :name="item.id" @click.prevent="openModal(item)">
			</span>
      </div>

      <div class="pageButton">
        <mt-button type="primary" class="theme-button button-radio " size="large" @click.native="save">保存</mt-button>
      </div>

      <!--<table border="" cellspacing="" cellpadding="">
        <tr class="bhistory">
                <td colspan="2">
                    <input id="cb_attribute_value_22" type="checkbox" name="cb_attribute_value_22" @click="openModal"><label for="cb_attribute_value_22">体重丢失</label>&nbsp;&nbsp;
                    <input id="cb_attribute_value_23" type="checkbox" name="cb_attribute_value_23"><label for="cb_attribute_value_23">贫血</label>&nbsp;&nbsp;
                    <input id="cb_attribute_value_24" type="checkbox" name="cb_attribute_value_24"><label for="cb_attribute_value_24">疼痛</label>&nbsp;&nbsp;
                    <input id="cb_attribute_value_25" type="checkbox" name="cb_attribute_value_25"><label for="cb_attribute_value_25">食欲下降、厌食</label>&nbsp;&nbsp;
                    <input id="cb_attribute_value_26" type="checkbox" name="cb_attribute_value_26"><label for="cb_attribute_value_26">吞咽困难</label>&nbsp;&nbsp;
                    <input id="cb_attribute_value_27" type="checkbox" name="cb_attribute_value_27"><label for="cb_attribute_value_27">消化不良</label>


            <tr class="bhistory">
                  <td colspan="2">
                      <input id="cb_attribute_value_28" type="checkbox" name="cb_attribute_value_28"><label for="cb_attribute_value_28">恶心、呕吐</label>&nbsp;&nbsp;
                      <input id="cb_attribute_value_29" type="checkbox" name="cb_attribute_value_29"><label for="cb_attribute_value_29">腹胀</label>&nbsp;&nbsp;
                      <input id="cb_attribute_value_30" type="checkbox" name="cb_attribute_value_30"><label for="cb_attribute_value_30">水肿</label>&nbsp;&nbsp;
                      <input id="cb_attribute_value_31" type="checkbox" name="cb_attribute_value_31"><label for="cb_attribute_value_31">腹泻</label>&nbsp;&nbsp;
                      <input id="cb_attribute_value_32" type="checkbox" name="cb_attribute_value_32"><label for="cb_attribute_value_32">便秘</label>&nbsp;&nbsp;
                      <input id="cb_attribute_value_33" type="checkbox" name="cb_attribute_value_33"><label for="cb_attribute_value_33">疲劳</label>&nbsp;&nbsp;
                      <input id="cb_attribute_value_34" type="checkbox" name="cb_attribute_value_34"><label for="cb_attribute_value_34">失眠</label>&nbsp;&nbsp;
                      <input id="cb_attribute_value_35" type="checkbox" name="cb_attribute_value_35"><label for="cb_attribute_value_35">白细胞减少</label>&nbsp;&nbsp;
                      <input id="cb_attribute_value_36" type="checkbox" name="cb_attribute_value_36"><label for="cb_attribute_value_36">脱发</label>



              <tr class="bhistory">
                  <td colspan="2">
                      <input id="cb_attribute_value_162" type="checkbox" name="cb_attribute_value_162"><label for="cb_attribute_value_162">口腔粘膜炎</label>&nbsp;&nbsp;
                      <input id="cb_attribute_value_163" type="checkbox" name="cb_attribute_value_163"><label for="cb_attribute_value_163">呼吸困难</label>&nbsp;&nbsp;
                      <input id="cb_attribute_value_164" type="checkbox" name="cb_attribute_value_164"><label for="cb_attribute_value_164">口干</label>&nbsp;&nbsp;
                      <input id="cb_attribute_value_37" type="checkbox" name="cb_attribute_value_37"><label for="cb_attribute_value_37">放射性肺炎</label>&nbsp;&nbsp;
                      <input id="cb_attribute_value_38" type="checkbox" name="cb_attribute_value_38"><label for="cb_attribute_value_38">骨髓抑制</label>&nbsp;&nbsp;
                      <input id="cb_attribute_value_165" type="checkbox" name="cb_attribute_value_165"><label for="cb_attribute_value_165">皮肤受损</label>


      </table>-->

      <mt-popup
        class="mint-popup-3"
        v-model="popupVisible"
        position="right"
        :modal="false"
        popup-transition="popup-fade">
        <mt-header fixed :title="titlerg">
          <div slot="left">
            <mt-button icon="back" @click.native="toggleModal('hide')"></mt-button>
          </div>
        </mt-header>
        <div class="popup_body" ref="popupBody">
          <div class="content04 abcd">
			<div class="valurang" v-if="(rgid==33)||(rgid==34)||(rgid==17)||(rgid==39)||(rgid==42)||(rgid==46)">
				<div class="q" :id="rgid"></div>
					  <div class="numrang">
						  <p>{{ttvalue}}<label style="font-size: 0.3rem;">分</label></p>
						  <span>{{rangename}}</span>
					  </div>
					  <div class="fszrg">
						  <h3>严重程度</h3>
						  <mt-range
						  v-model="ttvalue"
						  :min="0"
						  :max="10"
						  :step="1"
						  :bar-height="10"
						  @change="aa">
						</mt-range>
						<ul class="rangeNum">
							<li>0</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li>
						</ul>
					  </div>
			</div>
			<div v-else v-html="modalQustionHtml"></div>
          </div>
          <div class="d-flex zymButton">
            <!-- <div class="czButton">
              <mt-button type="primary" class="theme-button button-radio " size="large" @click.native="reset">重置
              </mt-button>
            </div> -->
            <div class="bcButton flex-grow-1">
              <mt-button type="primary" class="theme-button button-radio " size="large" @click.native="submit">确定
              </mt-button>
            </div>
          </div>
        </div>

      </mt-popup>

			
    </div>
		
		
  </div>
</template>
<script>

  function $ (el) {
    return document.querySelector(el)
  }

  export default {
    name: 'symptom',
    data: () => ({
	  ttvalue:0,
	  rangename:'',
	  titlerg:'病症管理',
	  rgid:'',
      popupVisible: false,
      itmekey: '',  //Guid
      usekey: '',
      modalQustionHtml: '',  //问题的html
      currentObj: {},  //当前点击对象
      //页面上的元素
      ids: [

        {id: 'attribute_value_01', itemindex: '32', name: '贫血'},
        {id: 'attribute_value_02', itemindex: '33', name: '疼痛'},
		{id: 'attribute_value_03', itemindex: '17', name: '吞咽困难'},
        {id: 'attribute_value_04', itemindex: '34', name: '食欲下降、厌食'},
        {id: 'attribute_value_05', itemindex: '11,12,37', name: '恶心呕吐'},
        {id: 'attribute_value_06', itemindex: '36', name: '消化不良'},
		{id: 'attribute_value_07', itemindex: '48', name: '腹泻'},
        {id: 'attribute_value_08', itemindex: '39', name: '化疗后腹胀'},
		{id: 'attribute_value_09', itemindex: '44', name: '便秘'},
		{id: 'attribute_value_10', itemindex: '46', name: '疲劳'},
		{id: 'attribute_value_11', itemindex: '18', name: '睡眠障碍(失眠)'},  //修改问题了
		{id: 'attribute_value_12', itemindex: '41', name: '白细胞减少'},
		{id: 'attribute_value_13', itemindex: '54', name: '低蛋白血症'},   //新加问题
		{id: 'attribute_value_14', itemindex: '31', name: '体重丢失'},
		{id: 'attribute_value_15', itemindex: '49', name: '放射性肺炎'},   //新加弹窗
		{id: 'attribute_value_16', itemindex: '45', name: '口腔溃疡'},
		{id: 'attribute_value_17', itemindex: '50', name: '血小板减少'},   //新加问题
		{id: 'attribute_value_18', itemindex: '52', name: '放射性肠炎'},  //47新加问题
		{id: 'attribute_value_19', itemindex: '53', name: '肺部感染'},  //新增项
        {id: 'attribute_value_20', itemindex: '40', name: '肢体肿胀'},
		{id: 'attribute_value_21', itemindex: '42', name: '脱发'},
        
        // {id: 'cb_attribute_value_38', itemindex: '43', name: '骨髓抑制'},
        // {id: 'cb_attribute_value_165', itemindex: '', name: '皮肤损伤'},   //没有这个弹窗
        // {id: 'cb_attribute_value_26', itemindex: '35', name: '吞咽困难'},
      ],

      //问题
      questionList: {
//		        "id1": { questions: "1、您从事一些费力活动有困难吗，比如提很重的购物袋或手提箱？" },
        'id2': {questions: '2、长距离行走对您来说有困难吗？'},
        'id3': {questions: '3、户外短距离行走对您来说有困难吗？'},
        'id4': {questions: '4、您白天需要呆在床上或椅子上吗？'},
//		        "id5": { questions: "5、您吃饭、穿衣、洗澡或上厕所时需要他人帮忙吗？" },

//		        "id6": { questions: "6、您在工作和日常活动中是否受到限制？" },
//		        "id7": { questions: "7、您在从事您的爱好或休闲活动时是否受到限制？" },
        'id8': {questions: '1、您需要休息吗？'},
        'id9': {questions: '2、您觉得虚弱吗？'},
        'id10': {questions: '3、您觉得累吗？'},

        'id11': {questions: '1、恶心情况'},
        'id12': {questions: '2、呕吐情况'},
        'id13': {questions: '1、您有疼痛吗？'},
        'id14': {questions: '2、疼痛影响您的日常活动吗？'},
        'id15': {questions: '15、您集中精力做事有困难吗，如读报纸或看电视？'},

        'id16': {questions: '16、您感到记忆困难吗？'},
        'id17': {questions: '1、您现在的吐咽能力严重程度'},
        'id18': {questions: '1、睡眠是否有障碍？'},
        'id19': {questions: '1、您食欲不振（没有胃口）吗？'},
        'id20': {questions: '1、您有便秘吗？'},

        'id21': {questions: '1、您有腹泻吗？'},
        'id22': {questions: '22、您觉得紧张吗？'},
        'id23': {questions: '23、您觉得忧虑吗？'},
        'id24': {questions: '24、您觉得脾气急躁吗？'},
        'id25': {questions: '25、您觉得压抑（情绪低落）吗？'},

        'id26': {questions: '26、您的身体状况或治疗影响您的家庭生活吗？'},
        'id27': {questions: '27、您的身体状况或治疗影响您的社交活动吗？'},
        'id28': {questions: '28、您的身体状况或治疗使您陷入经济困难吗？'},
        'id29': {questions: '29、您如何评价在过去一星期内您总的健康情况？', answer: '1,2,3,4,5,6,7'},
        'id30': {questions: '30、您如何评价在过去一星期内您总的生命质量？', answer: '1,2,3,4,5,6,7'},

        'id31': {questions: '1、体重情况'},
        'id32': {questions: '1、血红蛋白情况'},
        'id33': {questions: '1、您现在的疼痛严重程度'},
        'id34': {questions: '1、您现在的食欲严重程度'},
        'id35': {questions: '1、您现在的吞咽能力严重程度'},

        'id36': {questions: '1、您现在有下列哪些症状表现？'},
        'id37': {questions: '3、恶心或呕吐情况对吃饭进食的影响程度'},
        'id38': {questions: '4、恶心、呕吐次数'},
        'id39': {questions: '1、您现在的腹胀严重程度', answer1: '1'},
        'id40': {questions: '1、您现在的身体水肿严重程度，有水肿的部位在哪些？', answer1: '1'},

        'id41': {questions: '1、白细胞情况'},
        'id42': {questions: '1、您现在的落发严重程度', answer1: '1'},
        'id43': {questions: '1、骨髓抑制情况'},
        'id44': {questions: '1、您现在便秘的严重程度', answer1: '1'},
        'id45': {questions: '1、您现在口腔黏膜炎的严重程'},

        'id46': {questions: '1、您现在的疲劳程度', answer1: '1'},
        'id47': {questions: '1、您现在的口干严重程度', answer1: '1'},
        'id48': {questions: '1、您现在的腹泻严重程度', answer1: '1'},
		
		'id49': {questions: '1、放射性肺炎'},
		'id50': {questions: '1、血小板情况'},
		'id54': {questions: '1、低蛋白血症'},
		'id52': {questions: '1、放射性肠炎'},
		'id53': {questions: '1、肺部感染'},
      },
      idtime: '',
      clientHeight: ''
    }),
    methods: {
		aa(){
			if(this.rgid==33){
				if(this.ttvalue==0){
					this.rangename='无症状'
				}else if(this.ttvalue==1){
					this.rangename='非常轻微'
				}else if(this.ttvalue==2){
					this.rangename='稍微有'
				}else if(this.ttvalue==3){
					this.rangename='有点痛'
				}else if(this.ttvalue==4){
					this.rangename='中等程度'
				}else if(this.ttvalue==5){
					this.rangename='较明显不适'
				}else if(this.ttvalue==6){
					this.rangename='一般痛'
				}else if(this.ttvalue==7){
					this.rangename='比较痛'
				}else if(this.ttvalue==8){
					this.rangename='非常痛'
				}else if(this.ttvalue==9){
					this.rangename='特别痛'
				}else if(this.ttvalue==10){
					this.rangename='极痛'
				}
			}else if(this.rgid==34){
				if(this.ttvalue==0){
					this.rangename='最差'
				}else if(this.ttvalue==1){
					this.rangename='非常差'
				}else if(this.ttvalue==2){
					this.rangename='比较差'
				}else if(this.ttvalue==3){
					this.rangename='有点差'
				}else if(this.ttvalue==4){
					this.rangename='稍微差'
				}else if(this.ttvalue==5){
					this.rangename='能吃'
				}else if(this.ttvalue==6){
					this.rangename='一般好'
				}else if(this.ttvalue==7){
					this.rangename='比较好'
				}else if(this.ttvalue==8){
					this.rangename='非常好'
				}else if(this.ttvalue==9){
					this.rangename='特别好'
				}else if(this.ttvalue==10){
					this.rangename='最好'
				}
			}else if(this.rgid==17){
				if(this.ttvalue==0){
					this.rangename='完全不能进食，不适合做吞咽训练'
				}else if(this.ttvalue==1){
					this.rangename='吞咽困难或不能吞咽，不适合做吞咽训练'
				}else if(this.ttvalue==2){
					this.rangename='大量误吸，吞咽困难或不能吞咽，适合做吞咽基础训练'
				}else if(this.ttvalue==3){
					this.rangename='如做好准备可减少误吸，可进行进食训练'
				}else if(this.ttvalue==4){
					this.rangename='作为兴趣进食可以，但营养摄取仍需非口途径'
				}else if(this.ttvalue==5){
					this.rangename='仅1～2顿的营养摄取可经口'
				}else if(this.ttvalue==6){
					this.rangename='3顿的营养摄取均可经口，但需补充辅助营养'
				}else if(this.ttvalue==7){
					this.rangename='如为能吞咽的食物，3顿均可经口摄取'
				}else if(this.ttvalue==8){
					this.rangename='除少数难吞咽的食物，3顿均可经口摄取'
				}else if(this.ttvalue==9){
					this.rangename='可吞咽普通食物但需给予指导'
				}else if(this.ttvalue==10){
					this.rangename='进食，吞咽能力正常'
				}
			}else{
				if(this.ttvalue==0){
					this.rangename='无症状'
				}else if(this.ttvalue==1){
					this.rangename='非常轻微'
				}else if(this.ttvalue==2){
					this.rangename='稍微有'
				}else if(this.ttvalue==3){
					this.rangename='少量有'
				}else if(this.ttvalue==4){
					this.rangename='中等程度'
				}else if(this.ttvalue==5){
					this.rangename='较明显'
				}else if(this.ttvalue==6){
					this.rangename='一般严重'
				}else if(this.ttvalue==7){
					this.rangename='比较严重'
				}else if(this.ttvalue==8){
					this.rangename='非常严重'
				}else if(this.ttvalue==9){
					this.rangename='特别严重'
				}else if(this.ttvalue==10){
					this.rangename='极为严重'
				}
			}
			
		},
      changeFixed (clientHeight) {                        //动态修改样式
        this.$refs.homePage.style.height = clientHeight - 105 + 'px'
        this.$refs.popupBody.style.height = clientHeight - 96 + 'px'

      },
      toggleModal (type) {
        var state = (type == 'show' ? true : false)
        this.popupVisible = state
      },
      openModal (item) {
		  this.titlerg=item.name
		  this.rgid=item.itemindex
		  this.ttvalue=0
		  if((item.itemindex==33)||(item.itemindex==39)||(item.itemindex==42)||(item.itemindex==46)){
			  this.rangename='无症状'
		  }else if(item.itemindex==34){
			  this.rangename='最差'
		  }else if(item.itemindex==17){
			  this.rangename='完全不能进食，不适合做吞咽训练'
		  }
        //生成问题
        if (item.itemindex) {
          this.toggleModal('show')
          this.modalQustionHtml = ''
          this.currentObj = item  //当前点击对象
          this.renderQuestion(item)
        } else {
          var id = item.id
		  if(document.getElementById(id).parentElement.className == 'active'){
			  document.getElementById(id).checked = false
			  document.getElementById(id).parentElement.className = ''
		  }else{
			  document.getElementById(id).checked = true
			  document.getElementById(id).parentElement.className = 'active'
		  }
          
        }
      },
      //获取Guid
      getGuid () {
        let url = 'UserInterface/GenerateItmekey.ashx'
        this.$post(url).then((data) => {
          if (data.rspcode != 1) {
            return
          }
          this.usekey = JSON.parse(localStorage.userInfo).UserKey
          this.itmekey = data.itmekey
        })
      },
      //生成问题
      renderQuestion (elObj) {
        var indexList = elObj.itemindex.split(',')
        indexList.forEach((item, index) => {
          var id = item
          var q = this.questionList['id' + item]
          var qhtml = renderQ(id, q)
          var ahtml = renderA(id)
          if (q.answer) {
            ahtml = renderB(id)
          }
          if (q.answer1) {
            ahtml = renderC(id)
          }
          if (id == '31') {
            ahtml = ' <ul class="answerUl">'
            ahtml += ' <li><label >现在体重</label><input name="' + id + '_1" id="' + id + '_1" class="td_input " type="text"/><label >kg（每次测量时，穿的衣物相差不多，进食情况基本相等）</label></li>'
            ahtml += '</ul>'
          } else if (id == '32') {
            ahtml = ' <ul class="answerUl dhysUl">'
            ahtml += ' <li><label >血液检查，血常规中血红蛋白值（Ｈｂ）<input name="' + id + '" id="' + id + '_1" class="td_input" type="text"/><label >g/L</label></li></ul>'
            ahtml += ' <ul class="explainUl"><li><label >贫血分级标准为：</label></li>'
            ahtml += ' <li class="d-flex"><div><label >1.轻度贫血：</label></div><div><label >Ｈｂ男性90～120g/L，女性Ｈｂ90～110g/L；</label></div></li>'
            ahtml += ' <li class="d-flex"><div><label >2.中度贫血：</label></div><div><label >Ｈｂ60～90g/L；</label></div></li>'
            ahtml += ' <li class="d-flex"><div><label >3.重度贫血：</label></div><div><label >Ｈｂ＜60g/L。</label></div></li>'
            ahtml += '</ul>'
          } else if (id == '41') {
            ahtml = ' <ul class="answerUl dhysUl">'
            ahtml += '<li><label >血液检查，血常规中白细胞计数</label><input name="' + id + '" id="' + id + '_1" class="td_input" type="text"/><label >*10^9/L </label></li>'
            ahtml += '</ul>'
          } else if (id == '35') {
            ahtml = ' <ul class="answerUl dflexUl">'
            // ahtml += '<img id="img_' + id + '" style="width:100%;" src="http://123.57.89.89:5332/Images/figure2.png" />';
            ahtml += '<li class="d-flex"><div class="dflexLeft"><input type="radio" name="' + id + '" value="0" id="radio' + id + '0" title="完全不能进食，不适合做吞咽训练"/><label for="radio' + id + '0">0分：</label></div><div>完全不能进食，不适合做吞咽训练</div></li>'
            ahtml += '<li class="d-flex"><div class="dflexLeft"><input type="radio" name="' + id + '" value="1" id="radio' + id + '1" title="吞咽困难或不能吞咽，不适合做吞咽训练"/><label for="radio' + id + '1">1分：</label></div><div>吞咽困难或不能吞咽，不适合做吞咽训练</div></li>'
            ahtml += '<li class="d-flex"><div class="dflexLeft"><input type="radio" name="' + id + '" value="2" id="radio' + id + '2" title="大量误吸，吞咽困难或不能吞咽，适合做吞咽基础训练"/><label for="radio' + id + '2">2分：</label></div><div>大量误吸，吞咽困难或不能吞咽，适合做吞咽基础训练</div></li>'
            ahtml += '<li class="d-flex"><div class="dflexLeft"><input type="radio" name="' + id + '" value="3" id="radio' + id + '3" title="如做好准备可减少误吸，可进行进食训练"/><label for="radio' + id + '3">3分：</label></div><div>如做好准备可减少误吸，可进行进食训练</div></li>'
            ahtml += '<li class="d-flex"><div class="dflexLeft"><input type="radio" name="' + id + '" value="4" id="radio' + id + '4" title="作为兴趣进食可以，但营养摄取仍需非口途径"/><label for="radio' + id + '4">4分：</label></div><div>作为兴趣进食可以，但营养摄取仍需非口途径</div></li>'
            ahtml += '<li class="d-flex"><div class="dflexLeft"><input type="radio" name="' + id + '" value="5" id="radio' + id + '5" title="仅1～2顿的营养摄取可经口"/><label for="radio' + id + '5">5分：</label></div><div>仅1～2顿的营养摄取可经口</div></li>'
            ahtml += '<li class="d-flex"><div class="dflexLeft"><input type="radio" name="' + id + '" value="6" id="radio' + id + '6" title="3顿的营养摄取均可经口，但需补充辅助营养"/><label for="radio' + id + '6">6分：</label></div><div>3顿的营养摄取均可经口，但需补充辅助营养</div></li>'
            ahtml += '<li class="d-flex"><div class="dflexLeft"><input type="radio" name="' + id + '" value="7" id="radio' + id + '7" title="能吞咽的食物，3顿均可经口摄取"/><label for="radio' + id + '7">7分：</label></div><div>能吞咽的食物，3顿均可经口摄取</div></li>'
            ahtml += '<li class="d-flex"><div class="dflexLeft"><input type="radio" name="' + id + '" value="8" id="radio' + id + '8" title="除少数难吞咽的食物，3顿均可经口摄取"/><label for="radio' + id + '8">8分：</label></div><div>除少数难吞咽的食物，3顿均可经口摄取</div></li>'
            ahtml += '<li class="d-flex"><div class="dflexLeft"><input type="radio" name="' + id + '" value="9" id="radio' + id + '9" title="可吞咽普通食物但需给予指导"/><label for="radio' + id + '9">9分：</label></div><div>可吞咽普通食物但需给予指导</div></li>'
            ahtml += '<li class="d-flex"><div class="dflexLeft"><input type="radio" name="' + id + '" value="10" id="radio' + id + '10" title="进食，吞咽能力正常"/><label for="radio' + id + '10">10分：</label></div><div>进食，吞咽能力正常</div></li>'
            ahtml += '</ul>'
          } else if (id == '36') {
            ahtml = ' <ul class="answerUl">'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="1" id="checkbox' + id + '1"/><label for="checkbox' + id + '1">上腹痛</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="2" id="checkbox' + id + '2"/><label for="checkbox' + id + '2">上腹不适</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="3" id="checkbox' + id + '3"/><label for="checkbox' + id + '3">上腹饱胀</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="4" id="checkbox' + id + '4"/><label for="checkbox' + id + '4">烧心</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="5" id="checkbox' + id + '5"/><label for="checkbox' + id + '5">反酸</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="6" id="checkbox' + id + '6"/><label for="checkbox' + id + '6">嗳气</label></li>'
            ahtml += '<li><input type="checkbox"  style=" margin-left: 6px;" name="' + id + '" value="7" id="checkbox' + id + '7"/><label for="checkbox' + id + '7">恶心</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="8" id="checkbox' + id + '8"/><label for="checkbox' + id + '8">打嗝</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="9" id="checkbox' + id + '9"/><label for="checkbox' + id + '9">肠鸣</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="10" id="checkbox' + id + '10"/><label for="checkbox' + id + '10">排气增多</label></li>'
            ahtml += '</ul>'
          } else if (id == '43') {
            ahtml = ' <ul class="answerUl">'
            ahtml += ' <li><label >血红蛋白</label><input name="' + id + '_1" id="' + id + '_1" class="td_input" type="text"/><label >g/L，</label></li>'
            ahtml += ' <li><label >白细胞</label><input name="' + id + '_2" id="' + id + '_2" class="td_input" type="text"/><label >10^9/L，</label></li>'
            ahtml += ' <li><label >中性粒细胞</label><input name="' + id + '_3" id="' + id + '_3" class="td_input" type="text"/><label >10^9/L³，</label></li>'
            ahtml += ' <li><label >血小板</label><input name="' + id + '_4" id="' + id + '_4" class="td_input" type="text"/><label >10^9/L</label></li>'
            ahtml += '</ul>'
          } else if (id == '45') {
            ahtml = ' <ul class="answerUl">'
            ahtml += '<li><input type="radio" name="' + id + '" value="0" id="radio' + id + '0"/> <label for="radio' + id + '0">0级：无症状</label></li>'
            ahtml += '<li><input type="radio" name="' + id + '" value="1" id="radio' + id + '1"/><label for="radio' + id + '1">1级：红斑/疼痛，不影响进食）</label></li>'
            ahtml += '<li><input type="radio" name="' + id + '" value="2" id="radio' + id + '2"/><label for="radio' + id + '2">2级：溃疡/红斑，仍能进食</label></li>'
            ahtml += '<li><input type="radio" name="' + id + '" value="3" id="radio' + id + '3"/><label for="radio' + id + '3">3级：溃疡及严重红斑，不能进食</label></li>'
            ahtml += '<li><input type="radio" name="' + id + '" value="4" id="radio' + id + '4"/><label for="radio' + id + '4">4级：溃疡融合成片，有坏死，不能进食</label></li>'
            ahtml += '</ul>'
          } else if (id == '38') {
            ahtml = ' <ul class="answerUl">'
            ahtml += '<li><label >在24小时内，您共呕吐了</label><input name="' + id + '_1" id="' + id + '_1" class="td_input" type="text"/><label >次，</label></li>'
            ahtml += '<li><label >恶心了</label><input name="' + id + '_2" id="' + id + '_2" class="td_input" type="text"/><label >次。</label></li>'
            ahtml += '</ul>'
          }else if (id == '44') {
            ahtml = ' <ul class="answerUl">'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="0" id="checkbox' + id + '0"/><label for="checkbox' + id + '0">没有便秘情况</label></li>'
            ahtml += '<li><input type="radio" style=" margin-left: 6px;" name="' + id + '" value="1" id="radio' + id + '1"/><label for="radio' + id + '1">2天解便一次，伴有大便轻度干结，或每天一次伴有大便严重干结</label></li>'
            ahtml += '<li><input type="radio" style=" margin-left: 6px;" name="' + id + '" value="2" id="radio' + id + '2"/><label for="radio' + id + '2">3天解便一次，伴有大便轻度干结</label></li>'
            ahtml += '<li><input type="radio" style=" margin-left: 6px;" name="' + id + '" value="3" id="radio' + id + '3"/><label for="radio' + id + '3">2-3天解便一次，伴有大便干结</label></li>'
            ahtml += '<li><input type="radio" style=" margin-left: 6px;" name="' + id + '" value="4" id="radio' + id + '4"/><label for="radio' + id + '4">4天及以上解便一次</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="5" id="checkbox' + id + '5"/><label for="checkbox' + id + '5">伴有腹痛</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="6" id="checkbox' + id + '6"/><label for="checkbox' + id + '6">伴有腹胀</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="7" id="checkbox' + id + '7"/><label for="checkbox' + id + '7">大便软，但自感排便困难</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="8" id="checkbox' + id + '8"/><label for="checkbox' + id + '8">必须依靠开塞露等药物才能解便</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="9" id="checkbox' + id + '9"/><label for="checkbox' + id + '9">便秘时间超过半年</label></li>'
			ahtml += '</ul>'
          }else if (id == '49') {
            ahtml = ' <ul class="answerUl">'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="0" id="checkbox' + id + '0"/><label for="checkbox' + id + '0">有诊断，但较轻微无明显症状</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="1" id="checkbox' + id + '1"/><label for="checkbox' + id + '1">偶有刺激性干咳</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="2" id="checkbox' + id + '2"/><label for="checkbox' + id + '2">干咳，活动后加重（多数在放射治疗2～3个月后出现）</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="3" id="checkbox' + id + '3"/><label for="checkbox' + id + '3">干咳频繁</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="4" id="checkbox' + id + '4"/><label for="checkbox' + id + '4">伴有气喘、气急</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="5" id="checkbox' + id + '5"/><label for="checkbox' + id + '5">伴有胸痛</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="6" id="checkbox' + id + '6"/><label for="checkbox' + id + '6">伴有心悸、心慌</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="7" id="checkbox' + id + '7"/><label for="checkbox' + id + '7">伴有发热</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="8" id="checkbox' + id + '8"/><label for="checkbox' + id + '8">呼吸困难，或伴有低氧血症</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="9" id="checkbox' + id + '9"/><label for="checkbox' + id + '9">并发支气管炎</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="10" id="checkbox' + id + '10"/><label for="checkbox' + id + '10">并发肺气肿</label></li>'
			ahtml += '</ul>'
          }else if (id == '50') {
            ahtml = ' <ul class="answerUl">'
            ahtml += ' <li><label >血液检查，血常规中血小板计数</label><input name="' + id + '_1" id="' + id + '_1" class="td_input " type="text"/><label >10<sup>9</sup>/L</label></li>'
            ahtml += '</ul>'
          }else if (id == '18') {
            ahtml = ' <ul class="answerUl">'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="0" id="checkbox' + id + '0"/><label for="checkbox' + id + '0">没有</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="1" id="checkbox' + id + '1"/><label for="checkbox' + id + '1">睡眠节律紊乱</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="2" id="checkbox' + id + '2"/><label for="checkbox' + id + '2">入睡困难</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="3" id="checkbox' + id + '3"/><label for="checkbox' + id + '3">早醒</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="4" id="checkbox' + id + '4"/><label for="checkbox' + id + '4">多梦</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="5" id="checkbox' + id + '5"/><label for="checkbox' + id + '5">睡眠浅，易醒</label></li>'
            ahtml += '<li><input type="checkbox"  style=" margin-left: 6px;" name="' + id + '" value="6" id="checkbox' + id + '6"/><label for="checkbox' + id + '6">醒后不易睡着</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="7" id="checkbox' + id + '7"/><label for="checkbox' + id + '7">睡后有疲惫感</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="8" id="checkbox' + id + '8"/><label for="checkbox' + id + '8">睡眠时间小于6小时</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="9" id="checkbox' + id + '9"/><label for="checkbox' + id + '9">伴有头痛、头晕等症状</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="10" id="checkbox' + id + '10"/><label for="checkbox' + id + '10">睡眠障碍时间超过1周</label></li>'
			ahtml += '</ul>'
          }else if (id == '54') {
            ahtml = ' <ul class="answerUl">'
            ahtml += ' <li><label >血液检查，生化中血浆总蛋白</label><input name="' + id + '_1" id="' + id + '_1" class="td_input " type="text"/><label >g/L，</label><label >白蛋白</label><input name="' + id + '_2" id="' + id + '_2" class="td_input " type="text"/><label >g/L，</label><label >前白蛋白</label><input name="' + id + '_3" id="' + id + '_3" class="td_input " type="text"/><label >g/L</label></li>'
            ahtml += '</ul>'
          }else if (id == '52') {
            ahtml = ' <ul class="answerUl">'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="0" id="checkbox' + id + '0"/><label for="checkbox' + id + '0">无明显症状</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="1" id="checkbox' + id + '1"/><label for="checkbox' + id + '1">伴有恶心</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="2" id="checkbox' + id + '2"/><label for="checkbox' + id + '2">伴有呕吐</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="3" id="checkbox' + id + '3"/><label for="checkbox' + id + '3">伴有腹痛或慢性腹痛</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="4" id="checkbox' + id + '4"/><label for="checkbox' + id + '4">伴有腹泻、或大便次数增多</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="5" id="checkbox' + id + '5"/><label for="checkbox' + id + '5">伴有黏液血便</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="6" id="checkbox' + id + '6"/><label for="checkbox' + id + '6">合并贫血</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="7" id="checkbox' + id + '7"/><label for="checkbox' + id + '7">并发放射性直肠炎，或有里急后重和直肠部位疼痛</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="8" id="checkbox' + id + '8"/><label for="checkbox' + id + '8">持续时间长，放疗完成后6个月以上仍有症状，或者数十年之后才出现症状</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="9" id="checkbox' + id + '9"/><label for="checkbox' + id + '9">并发肠梗阻、或便秘或大便失禁</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="10" id="checkbox' + id + '10"/><label for="checkbox' + id + '10">肠管与腹部其他器官(包括盆腔器官)之间可形成瘘管</label></li>'
			ahtml += '</ul>'
          }else if (id == '53') {
            ahtml = ' <ul class="answerUl">'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="0" id="checkbox' + id + '0"/><label for="checkbox' + id + '0">无明显症状</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="1" id="checkbox' + id + '1"/><label for="checkbox' + id + '1">呼吸困难</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="2" id="checkbox' + id + '2"/><label for="checkbox' + id + '2">发热，持续时间长</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="3" id="checkbox' + id + '3"/><label for="checkbox' + id + '3">高热</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="4" id="checkbox' + id + '4"/><label for="checkbox' + id + '4">咳嗽</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="5" id="checkbox' + id + '5"/><label for="checkbox' + id + '5">气喘</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="6" id="checkbox' + id + '6"/><label for="checkbox' + id + '6">咳痰，量少</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="7" id="checkbox' + id + '7"/><label for="checkbox' + id + '7">咳痰，偶有量多</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="8" id="checkbox' + id + '8"/><label for="checkbox' + id + '8">咳痰，自感量多，但咳不出</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="9" id="checkbox' + id + '9"/><label for="checkbox' + id + '9">咳痰，痰液粘稠</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="10" id="checkbox' + id + '10"/><label for="checkbox' + id + '10">半年内多次肺部感染（2次以上）</label></li>'
			ahtml += '</ul>'
          }else if (id == '48') {
            ahtml = ' <ul class="answerUl">'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="0" id="checkbox' + id + '0"/><label for="checkbox' + id + '0">没有腹泻</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="1" id="checkbox' + id + '1"/><label for="checkbox' + id + '1">偶尔有1次，或每天1次</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="2" id="checkbox' + id + '2"/><label for="checkbox' + id + '2">每天腹泻3-4次</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="3" id="checkbox' + id + '3"/><label for="checkbox' + id + '3">每天腹泻4-6次</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="4" id="checkbox' + id + '4"/><label for="checkbox' + id + '4">每天腹泻大于6次</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="5" id="checkbox' + id + '5"/><label for="checkbox' + id + '5">水样腹泻</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="6" id="checkbox' + id + '6"/><label for="checkbox' + id + '6">伴有其中一种症状：食欲减退、恶心、呕吐、发热</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="7" id="checkbox' + id + '7"/><label for="checkbox' + id + '7">伴有血便</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="8" id="checkbox' + id + '8"/><label for="checkbox' + id + '8">伴有腹痛</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="9" id="checkbox' + id + '9"/><label for="checkbox' + id + '9">腹泻和便秘交替出现</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="10" id="checkbox' + id + '10"/><label for="checkbox' + id + '10">伴有体重下降</label></li>'
			ahtml += '</ul>'
          }else if (id == '40') {
            ahtml = ' <ul class="answerUl">'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="0" id="checkbox' + id + '0"/><label for="checkbox' + id + '0">无水肿</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="1" id="checkbox' + id + '1"/><label for="checkbox' + id + '1">脚踝</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="2" id="checkbox' + id + '2"/><label for="checkbox' + id + '2">小腿</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="3" id="checkbox' + id + '3"/><label for="checkbox' + id + '3">膝盖</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="4" id="checkbox' + id + '4"/><label for="checkbox' + id + '4">大腿</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="5" id="checkbox' + id + '5"/><label for="checkbox' + id + '5">臀部</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="6" id="checkbox' + id + '6"/><label for="checkbox' + id + '6">腰骶部</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="7" id="checkbox' + id + '7"/><label for="checkbox' + id + '7">双手</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="8" id="checkbox' + id + '8"/><label for="checkbox' + id + '8">手臂</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="9" id="checkbox' + id + '9"/><label for="checkbox' + id + '9">面部</label></li>'
            ahtml += '<li><input type="checkbox" style=" margin-left: 6px;" name="' + id + '" value="10" id="checkbox' + id + '10"/><label for="checkbox' + id + '10">伴有腹水</label></li>'
			ahtml += '</ul>'
          }else if (id == '11') {
            ahtml = ' <ul class="answerUl">'
            ahtml += '<li><input type="radio" name="' + id + '" value="0" id="radio' + id + '0" title="没有恶心"/><label for="radio' + id + '0">0分：没有恶心</label></li>'
            ahtml += '<li><input type="radio" name="' + id + '" value="1" id="radio' + id + '1" title="有恶心、偶尔"/><label for="radio' + id + '1">1分：有恶心、偶尔</label></li>'
            ahtml += '<li><input type="radio" name="' + id + '" value="2" id="radio' + id + '2" title="多次恶心，一天小于等于三次"/><label for="radio' + id + '2">2分：多次恶心，一天小于等于三次</label></li>'
            ahtml += '<li><input type="radio" name="' + id + '" value="3" id="radio' + id + '3" title="频繁恶心，一天大于三次或一见到食物就恶心"/><label for="radio' + id + '3">3分：频繁恶心，一天大于三次或一见到食物就恶心</label></li>'
            ahtml += '</ul>'
          }else if (id == '12') {
            ahtml = ' <ul class="answerUl">'
            ahtml += '<li><input type="radio" name="' + id + '" value="0" id="radio' + id + '0" title="没有呕吐情况"/><label for="radio' + id + '0">0分：没有呕吐情况</label></li>'
            ahtml += '<li><input type="radio" name="' + id + '" value="1" id="radio' + id + '1" title="有呕吐偶有1次"/><label for="radio' + id + '1">1分：有呕吐偶有1次</label></li>'
            ahtml += '<li><input type="radio" name="' + id + '" value="2" id="radio' + id + '2" title="有呕吐，每天一次"/><label for="radio' + id + '2">2分：有呕吐，每天一次</label></li>'
            ahtml += '<li><input type="radio" name="' + id + '" value="3" id="radio' + id + '3" title="多次呕吐，一天大于2次"/><label for="radio' + id + '3">3分：多次呕吐，一天大于2次</label></li>'
            ahtml += '<li><input type="radio" name="' + id + '" value="4" id="radio' + id + '4" title="频繁呕吐，或每次进食都出现呕吐"/><label for="radio' + id + '4">4分：频繁呕吐，或每次进食都出现呕吐</label></li>'
			ahtml += '</ul>'
          }else if (id == '37') {
            ahtml = ' <ul class="answerUl">'
            ahtml += '<li><input type="radio" name="' + id + '" value="0" id="radio' + id + '0" title="一般，影响不大"/><label for="radio' + id + '0">0分：一般，影响不大</label></li>'
            ahtml += '<li><input type="radio" name="' + id + '" value="1" id="radio' + id + '1" title="有影响，能进食软食"/><label for="radio' + id + '1">1分：有影响，能进食软食</label></li>'
            ahtml += '<li><input type="radio" name="' + id + '" value="2" id="radio' + id + '2" title="有影响，能进食流质食物"/><label for="radio' + id + '2">2分：有影响，能进食流质食物</label></li>'
            ahtml += '<li><input type="radio" name="' + id + '" value="3" id="radio' + id + '3" title="非常严重，导致进食很困难"/><label for="radio' + id + '3">3分：非常严重，导致进食很困难</label></li>'
            ahtml += '</ul>'
          }

          //问题的html字符串
          this.modalQustionHtml += (qhtml + ahtml)
		  // this.modalQustionHtml='<mt-range v-model="'+this.rangeValue+'" :min="0" :max="10" :step="1" :bar-height="10" @change="aa"></mt-range>'
          //获取答案
          let url = 'UserInterface/SelectReportCheckedItemValue.ashx'
          var data = {
            usekey: this.usekey,
            itemkey: this.itmekey,
            itemindex: id
          }
          this.$post(url, data).then((data) => {
            if (data.rspcode == '1') {
              let itemvalue = data.itemvalue
              if (id == '31' || id == '43' || id == '38'||id == '54') {
                var datalist = itemvalue.split(',')
                var num = 0
                datalist.forEach((item, index) => {
                  num = num + 1
                  var $input = document.getElementById(id + '_' + num)
                  if ($input) {
                    $input.value = item
                  }
                })
              } else if (id == '32' || id == '41'|| id == '50') {
                var $input = document.getElementById(id + '_1')
                if ($input) {
                  $input.value = itemvalue
                }
              } else if ((id == '36')||(id == '48')||(id == '18')||(id == '49')||(id == '52')||(id == '53')||(id == '40')) {
                var datalist = itemvalue.split(',')
                datalist.forEach((item, index) => {
                  var $input = document.getElementById('checkbox' + id + item)
                  if ($input) {
                    $input.checked = true
                  }
                })
              }else if(id == '44'){
				  var datalist = itemvalue.split(',')
				  datalist.forEach((item, index) => {
					if (item == 1 || item == 2 || item == 3 || item == 4) {
						var $input = document.getElementById('radio' + id + item)
						if ($input) {
						  $input.checked = true
						}
					} else {
						var $input = document.getElementById('checkbox' + id + item)
						if ($input) {
						  $input.checked = true
						}
					}
				  })
			  }else if((id==33)||(id==34)||(id==17)||(id==39)||(id==42)||(id==46)){
				  this.ttvalue=Number(itemvalue)
				  this.aa()
			  } else {
                var $input = document.getElementById('radio' + id + itemvalue)
                if ($input) {
                  $input.checked = true
                }
              }
            }
          })
        })

        //问题
        function renderQ (id, q) {
          var tr = '<div class="q" id="' + id + '"><div align="" class="auto-style3"><div class="askTitle"><strong>' + q.questions + '</strong></div></div></div>'
          return tr
        }

        //答案A
        function renderA (id) {
          var tr = ' <ul class="answerUl">'
          tr += '<li><input type="radio" name="' + id + '" value="1" id="radio' + id + '1"/> <label for="radio' + id + '1">没有（1分）</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="2" id="radio' + id + '2"/><label for="radio' + id + '2">有点（2分）</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="3" id="radio' + id + '3"/><label for="radio' + id + '3">相当（3分）</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="4" id="radio' + id + '4"/><label for="radio' + id + '4">非常（4分）</label></li>'
          tr += '</ul>'
          return tr
        }

        //答案B
        function renderB (id) {
          var tr = ' <ul class="answerUl">'
          tr += '<li><input type="radio" name="' + id + '" value="1" id="radio' + id + '1"/> <label for="radio' + id + '1">非常差（1分）</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="2" id="radio' + id + '2"/><label for="radio' + id + '2">一般差（2分）</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="3" id="radio' + id + '3"/><label for="radio' + id + '3">差（3分）</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="4" id="radio' + id + '4"/><label for="radio' + id + '4">正常（4分）</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="5" id="radio' + id + '5"/><label for="radio' + id + '5">好（5分）</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="6" id="radio' + id + '6"/><label for="radio' + id + '6">一般好（6分）</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="7" id="radio' + id + '7"/><label for="radio' + id + '7">非常好（7分）</label></li>'
          tr += '</ul>'
          return tr
        }

        //答案C
        function renderC (id) {
          var tr = ' '
          tr = ' <ul class="answerUl">'
          // tr += '<img id="img_' + id + '" style="width:100%;" src="http://123.57.89.89:5332/Images/figure2.png" />';
          tr += '<li><input type="radio" name="' + id + '" value="0" id="radio' + id + '0" title="无症状"/><label for="radio' + id + '0">0分：无症状</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="1" id="radio' + id + '1" title="非常轻微"/><label for="radio' + id + '1">1分：非常轻微</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="2" id="radio' + id + '2" title="稍微有"/><label for="radio' + id + '2">2分：稍微有</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="3" id="radio' + id + '3" title="少量有"/><label for="radio' + id + '3">3分：少量有</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="4" id="radio' + id + '4" title="中等程度"/><label for="radio' + id + '4">4分：中等程度</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="5" id="radio' + id + '5" title="较明显不适"/><label for="radio' + id + '5">5分：较明显不适</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="6" id="radio' + id + '6" title="一般严重"/><label for="radio' + id + '6">6分：一般严重</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="7" id="radio' + id + '7" title="比较严重"/><label for="radio' + id + '7">7分：比较严重</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="8" id="radio' + id + '8" title="非常严重"/><label for="radio' + id + '8">8分：非常严重</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="9" id="radio' + id + '9" title="特别严重"/><label for="radio' + id + '9">9分：特别严重</label></li>'
          tr += '<li><input type="radio" name="' + id + '" value="10" id="radio' + id + '10" title="极为严重"/><label for="radio' + id + '10">10分：极为严重</label></li>'
          tr += '</ul>'
          return tr
        }
      },

      // 重置问题
      reset () {
        var $eles = document.querySelectorAll('.popup_body [name]')
        $eles.forEach(($input) => {
          var type = $input.getAttribute('type')
          if ((type == 'radio') || (type == 'checkbox')) {
            $input.checked = false
          } else if (type == 'text') {
            $input.value = ''
          }
        })
      },

      //提交问题
      submit () {
        var $qs = document.querySelectorAll('.q')
        $qs.forEach(($q) => {
          var id = $q.getAttribute('id')
          var value
          //单选框
          document.querySelectorAll('input[name=\'' + id + '\']').forEach((input) => {
            if (input.checked) {
              value = input.value
            }
          })
		  
          if (id == '31'||id == '50') {
            value = (document.querySelector('input[name=\'' + id + '_1\']').value)
          } else if (id == '32' || id == '41') {
            value = document.querySelector('input[name=\'' + id + '\']').value
          } else if ((id == '36')||(id == '48')||(id == '44')||(id == '18')||(id == '49')||(id == '52')||(id == '53')||(id == '40')) {
            var id_array = new Array()
            document.querySelectorAll('input[name=\'' + id + '\']').forEach((input) => {
              if (input.checked) {
                id_array.push(input.value)//向数组中添加元素
              }
            })
            value = id_array.join(',')
          } else if (id == '54') {
            value = document.querySelector('input[name=\'' + id + '_1\']').value + ',' + document.querySelector('input[name=\'' + id + '_2\']').value + ',' + document.querySelector('input[name=\'' + id + '_3\']').value
          } else if (id == '43') {
            value = document.querySelector('input[name=\'' + id + '_1\']').value + ',' + document.querySelector('input[name=\'' + id + '_2\']').value + ',' + document.querySelector('input[name=\'' + id + '_3\']').value + ',' + document.querySelector('input[name=\'' + id + '_4\']').value
          } else if (id == '38') {
            value = document.querySelector('input[name=\'' + id + '_1\']').value + ',' + document.querySelector('input[name=\'' + id + '_2\']').value
          }else if((id == '33')||(id == '34')||(id == '17')||(id == '39')||(id == '42')||(id == '46')){
			  value=String(this.ttvalue)
		  }
          if (value) {
            var data = {
              usekey: this.usekey,
              itemkey: this.itmekey,
              itemindex: id,
              itemvalue: value
            }
            let url = 'UserInterface/SaveReportCheckedItems.ashx'
            this.$post(url, data).then((data) => {
              this.$Toast(data.rspdesc)
              if (data.rspcode == 1) {
                this.toggleModal('hide')
                //选中页面元素
                var id = this.currentObj.id
                document.getElementById(id).checked = true
                document.getElementById(id).parentElement.className = 'active'
              }
            })
          }
        })
      },
      //页面保存
      save () {
        let url = 'UserInterface/SaveDiseaseCondition.ashx'
        var data = {
          itmekey: this.itmekey
        }
        var $checkboxs = document.querySelectorAll('#page [type=checkbox]')
        $checkboxs.forEach(($box) => {
          var id = $box.id.replace('cb_', '')
          if ($box.checked) {
            data[id] = 1
          } else {
            data[id] = 0
          }
        })
        this.$post(url, data).then((data) => {
          this.$Toast(data.rspdesc)
          if (data.rspcode == 1) {
            this.$router.back()
          }
        })
      }
    },
    mounted: function () {
      //获取Guid
      this.getGuid()
      this.clientHeight = `${document.documentElement.clientHeight}`        //document.body.clientWidth;
      //console.log(self.clientHeight);
      window.onresize = function temp () {
        this.clientHeight = `${document.documentElement.clientHeight}`
      }

    },
    watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },
  }
</script>
<style lang="scss">
  .mint-popup-3 {
    width: 100%;
    height: 100%;
    background-color: #fff;

  }

  .popup_body {
    height: 100%;
    padding-top: 45px;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  
  .rangid{
  	.mt-range-runway{
  		border-top-color: #F4D9D2;
		border-radius: 5px;
		right: -24px;
  	}
	.mt-range-progress{
		background-color: #FD6C75;
		border-radius: 5px 0 0 5px;
	}
	.mt-range-thumb{
		width: 24px;
		height: 24px;
		border: 1px solid #E58391;
	}
	.mt-range-content{
		margin-right: 24px;
	}
  }
</style>
<style type="text/css">
  .symptom-root input[type=checkbox] {
    -webkit-appearance: checkbox;
  }

  .symptom-root input[type=radio] {
    -webkit-appearance: radio;
  }

  .symptom-root input[type=text] {
    -webkit-appearance: none;
  }

  .abcd tr:nth-child(2) {
    font-size: 0.14rem;
    color: #666;
  }

  .abcd label {
    margin-right: 0.1rem;
    margin-left: 0.1rem;
  }
  input {
    outline-color: invert;
    outline-style: none;
    outline-width: 0px;
    border: none;
    border-style: none;
    text-shadow: none;
    -webkit-appearance: none;
    -webkit-user-select: text;
    outline-color: transparent;
    box-shadow: none;
  }
  input[type=radio], input[type=checkbox] {
    cursor: pointer;
    position: relative;
    width: 18px;
    height: 18px;
    font-size: 14px;
  }

  input[type=radio]::after, input[type=checkbox]::after {
    position: absolute;
    top: 0;
    background-color: #fff;
    border: 1px solid #999;
    color: #000;
    width: 16px;
    height: 16px;
    display: inline-block;
    visibility: visible;
    padding-left: 0px;
    text-align: center;
    content: ' '
  }

  input[type=radio]:checked::after, input[type=checkbox]:checked::after {
    content: "✓";
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    width: 18px;
    height: 18px;
    border: 0;
    background-color: #0ac5ca;
  }

  input[type=radio]::after {
    border-radius: 50%
  }

  input[type=checkbox]::after {
    border-radius: 3px
  }
</style>
<style scoped lang="scss">
  #body_main {
    /*position: relative;*/
    .pageButton {
      position: absolute;
      bottom: 0;
      width: 100%;

      .theme-button {
        border-radius: 0;
        height: 50px;
        line-height: 48px;
        background-color: #0ac5ca;
      }
    }

    .mint-header {
      height: 48px;
      border-bottom: 1px solid #eee;
    }

    .popup_body {
      margin: 48px auto 48px auto;
      padding-top: 0rem;
	  margin-bottom: 0;
      background-color: #fafafa;

      .abcd {
        width: 100%;
        margin: 0 auto 0 auto;
        border-radius: 8px;

        > > > .askTitle {
          width: 100%;
          height: 46px;
          line-height: 48px;
          background-color: #0ac5ca;
          color: #fff;
          border-radius: 8px 8px 0 0;
          margin-top: 0.15rem;

          strong {
            padding-left: 0.1rem;
            font-weight: 400;
          }
        }

        > > > .answerUl {
          padding: 0.1rem 0.1rem 0.15rem 0.06rem;
          min-height: 100px;
          background-color: #fff;
          border-radius: 0 0 8px 8px;

          li {
            padding: 0.1rem 0.1rem;
            color: #484848;
            font-size: 0.145rem;
            /*border-bottom: 1px solid #e5e5e5;*/
            input[type=text] {
              border-bottom: 1px solid #999;
              border-width: 0 0 1px 0;
              display: inline-block;
              max-width: 72px;
              font-size: 0.15rem;
              color: #666666;
              text-align: center;
            }

            input[type=radio], input[type=checkbox] {
              top: 2px;
            }
          }

          li.d-flex {
            display: flex !important;

            .flex-grow-1 {
              -ms-flex-positive: 1 !important;
              flex-grow: 1 !important;
            }
          }

          li:after {
          }

          li:last-child {
            border-bottom: 0;
          }
        }

        > > > .dhysUl {
          li {
            margin-top: 0.25rem;
            font-size: 0.145rem;
          }
        }

        > > > .dflexUl {
          .dflexLeft {
            min-width: 72px;

            label {
              display: inline-block;
              margin: 0 0 0 0.1rem;
            }
          }

          li.d-flex {
            display: flex !important;

            .flex-grow-1 {
              -ms-flex-positive: 1 !important;
              flex-grow: 1 !important;
            }
          }
        }

        > > > .explainUl {
          padding: 0.1rem;

          li {
            padding: 0.02rem 0.1rem 0.02rem 0.15rem;
            font-size: 0.14rem;
            color: #777;

            label {
              min-width: 92px;
              display: inline-block;
              margin: 0;
            }
          }

          li:first-child {
            padding: 0.05rem 0.1rem 0.05rem 0.05rem;
            color: #555;
          }

          li.d-flex {
            display: flex !important;

            .flex-grow-1 {
              -ms-flex-positive: 1 !important;
              flex-grow: 1 !important;
            }
          }

        }
      }

      /* Set the display to flex */
      .d-flex {
        display: flex !important;
      }

      .flex-grow-1 {
        -ms-flex-positive: 1 !important;
        flex-grow: 1 !important;
      }

      .zymButton {
        bottom: 0px;
        position: absolute;
        width: 100%;

        .czButton {
          width: 30%;

          .theme-button {
            border-radius: 0;
            background-color: #ccc;
            height: 48px;
            line-height: 46px;
          }
        }

        .bcButton {

          .theme-button {
            border-radius: 0;
            height: 48px;
            line-height: 46px;
            background: #0ac5ca;
          }
        }
      }
    }

    #page {
      width: 94%;
      overflow: hidden;
      margin: 0 auto;
      padding: 10px 0;
      box-sizing: border-box;
      overflow-y: scroll;
      span {
        /*display: block;*/
        /*width: 50%;*/
        /*float: left;*/
        /*margin-top: 0.1rem;*/
        display: inline-block;
        padding: 0.1rem 0;
        /*border: 1px solid #ccc;*/
        margin: 0.05rem 2%;
        /*border-radius: 20px;*/
        font-size: 0.145rem;
        position: relative;
        background-color: #fff;
        width: 46%;
        /*border-left: 1px solid #0ac5ca;*/
        text-align: center;
      }

      span.active {
        color: #fff;
        background-color: #0ac5ca;

        label {
          padding-right: 0.1rem;
        }
      }

      input[type=checkbox] {
        position: absolute;
        right: 10px;
      }

      input[type=checkbox]::after {
        width: 18px;
        height: 18px;
        border: 0;
        border-radius: 0;
      }

      input[type=checkbox]:checked::after {
        content: "✓";
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        background-color: #0ac5ca;
      }
    }
  }
  
  .rangeNum{
	  width: 100%;
	  li{
		  width: 9%;
		  float: left;
		  text-align: center;
		  font-weight: 600;
		  color: #666;
	  }
  }
  .numrang{
	  height: calc( 100vh - 272px);
	  background: url(../../../assets/images/symptom-bg.jpg) no-repeat center center;
	  p{
		  color: #fff;
		  font-size: 72px;
		  text-align: center;
		  padding-top: calc( (100vh - 276px)/2 );
		  margin-top: -70px;
		  float: left;
		  width: 100%;
	  }
	  span{
		  display: block;
		  font-size: 0.17rem;
		  color: #fff;
		  text-align: center;
		  padding-top: 0.1rem;
		  clear: both;
	  }
  }
  .fszrg{
	  width: 80%;
	  padding: 0 10%;
	  background: #fff;
	  height: 176px;
	  h3{
		  font-size: 0.17rem;
		  font-weight: 500;
		  text-align: center;
		  padding-top: 30px;
		  padding-bottom: 26px;
	  }
	  ul{
		  padding-top: 12px;
	  }
  }
</style>
