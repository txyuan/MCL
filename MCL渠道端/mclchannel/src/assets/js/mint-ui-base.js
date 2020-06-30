import Vue from 'vue'
import {Swipe, SwipeItem,Tabbar, MessageBox ,TabItem, Button, IndexList, IndexSection, Navbar, TabContainer, TabContainerItem, Header, Cell, CellSwipe, Field, Picker, Popup, Progress, Lazyload, InfiniteScroll, Spinner, Toast, Indicator, DatetimePicker, Actionsheet } from 'mint-ui';

import '@/assets/css/my-mint-ui.scss'
import headerBack from "@/components/common/header-back.vue"

Vue.component(headerBack.name, headerBack)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Button.name, Button)
Vue.component(Navbar.name, Navbar)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Header.name, Header)
Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
Vue.component(Progress.name, Progress)
Vue.component(CellSwipe.name, CellSwipe)
Vue.component(Spinner.name, Spinner);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Actionsheet.name, Actionsheet);
Vue.use(Lazyload)
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.use(InfiniteScroll)
Vue.prototype.$Toast = Toast
Vue.prototype.$MessageBox = MessageBox

Vue.prototype.$Indicator = Indicator;
Vue.prototype.$Indicator.loading = function () {
  this.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  })
}


