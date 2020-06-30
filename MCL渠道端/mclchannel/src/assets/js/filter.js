import Vue from 'vue'
Vue.filter('filterType', function (value) {
  // 返回处理后的值
  let text = "";
  switch (String(value)){
    case '1':
      text = '专享拼购'
      break;
    case '2':
      text = '不中全返'
      break;
    case '3':
      text = '限购专区'
      break;
  }
  return text;
})
