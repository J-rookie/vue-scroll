import VueView from './scroll_view.vue';
import scroll from './vue_scroll.js';

const install = function(Vue) {

  if (install.installed) return;

  //禁用系统默认
  document.addEventListener('touchmove', function(event){
	        event.preventDefault();
  }, {passive:false});
  
  Vue.component(VueView.name, VueView);
  Vue.directive('scroll', {
    bind:(el, binding, vnode, oldVnode)=>{
      return scroll.init(el, binding, vnode, oldVnode)
    },
    inserted:(el, binding, vnode, oldVnode)=>{
      return scroll.update(el, binding, vnode, oldVnode)
    },
    componentUpdated:(el, binding, vnode, oldVnode)=>{
      return scroll.update(el, binding, vnode, oldVnode)
    }
  });

};


if (typeof window !== 'undefined' && window.Vue) {
  	install(window.Vue);
};

export default {
	install,
	VueView
}