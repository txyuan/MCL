<template>
  <div class="s-canvas" ref="codeElement">
    {{text}}
  </div>
</template>

<script>
    export default {
        name: "identify",
        data: ()=>({
          code: "",
          text: ""
        }),
        methods: {
          init(){
              const _that = this;
              const codeElement = this.$refs.codeElement;
              function codes(){
                var _code_color1 = ['#adb1aa', '#7ed9f4', '#b0ecb0', '#fff0f0'];
                var _code_color2 = ['#FF0033', '#006699', '#993366', '#FF9900', '#66CC66', '#FF33CC'];

                var color1Num = Math.floor(Math.random() * 3);
                var color2Num = Math.floor(Math.random() * 5);

                var ranColor =  _code_color1[color1Num];
                var ranColor2 =  _code_color2[color2Num];

                var num1 = 0;
                var num2 = 0;
                function renderMath() {
                   num1 = Math.floor(Math.random() * 100);
                   num2 = Math.floor(Math.random() * 100);
                }
                renderMath();

                var flags = ["+","-","×"];
                var active = Math.round(Math.random() * 2);
                var codeNum = "";
                var codeText = "";

                if(active == 0){
                  codeNum = num1 + num2;
                  codeText = num1 + "+" + num2 + "=?";
                }else if(active == 1){
                  function fn() {
                    if(num1 < num2){
                      renderMath();
                      fn()
                    }
                  }
                  fn()

                  codeNum = num1 - num2;
                  codeText = num1 + "-" + num2 + "=?";
                }else if(active == 2){
                  codeNum = num1 * num2;
                  codeText = num1 + "×" + num2 + "=?";
                }
                _that.code = codeNum;
                _that.text = codeText;
                if (hasClass(codeElement,"nocode")) {
                  removeClass(codeElement,"nocode")
                  addClass(codeElement,"code");
                }
                codeElement.style.background = ranColor;
                codeElement.style.color = ranColor2;
              }

              codeElement.onclick = codes;
              codeElement.onclick()

              function hasClass(elem, cls) {
                cls = cls || '';
                if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
                return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
              }

              function addClass(ele, cls) {
                if (!hasClass(elem, cls)) {
                  ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
                }
              }

              function removeClass(ele, cls) {
                if (hasClass(elem, cls)) {
                  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
                  while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                    newClass = newClass.replace(' ' + cls + ' ', ' ');
                  }
                  elem.className = newClass.replace(/^\s+|\s+$/g, '');
                }
              }

          }
        },
        mounted () {
          this.init()
        }
    }
</script>

<style scoped>

</style>
