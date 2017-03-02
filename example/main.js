//引入页面文件
import App from './pages/app.vue';

//引入滚动插件并启用
import VueScroll from '../src/build.js';
var VueScroll2 = require('../dist/vue-scroll.js');
console.log(VueScroll2)
// Vue.use(VueScroll);
//Vue.use(VueScroll2);


//引入CSS
import './skin.css';


// 挂载
new Vue({
  el: '#app',
  render: app => app(App),
});