import VueView from './scroll_view.vue';
import scroll from './vue_scroll.js';

const install = function(Vue) {

  if (install.installed) return;

  //禁用系统默认
  document.addEventListener('touchmove', function(event){
	        event.preventDefault();
  }, {passive:false});
  
  Vue.directive('scroll', {
    bind:(el, binding, vnode, oldVnode)=>{
      el.scroll = new scroll();
      return el.scroll.init(el, binding, vnode, oldVnode)
    },
    inserted:(el, binding, vnode, oldVnode)=>{
      return el.scroll.update(el, binding, vnode, oldVnode)
    },
    componentUpdated:(el, binding, vnode, oldVnode)=>{
      return el.scroll.update(el, binding, vnode, oldVnode)
    }
  });

  Vue.component(VueView.name, VueView);

};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};

module.exports = {
  install,
  VueView,
};