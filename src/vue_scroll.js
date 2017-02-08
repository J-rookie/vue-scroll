// let scroll = function(el, binding, vnode,e){
// 	return new scroll.init(el, binding, vnode,e);
// }

// scroll.scroll = function(){

// 	// console.log(el)
// 	// console.log(binding)
// 	// console.log(vnode)
// 	// console.log(e)


// 	return new scroll.init(el, binding, vnode,e);
// }

// scroll.prototype.init = function(el, binding, vnode,e){
// 	console.log(el)
// 	console.log(binding)
// 	console.log(vnode)
// 	console.log(e)
// }
class scroll{

	constructor(){
		this.el = null;

		this.data = {
          vH : 0,
           H : 0,
          sH : 0,
           Y : 0,
          sY : 0,
          mY : 0,
          sT : 0,
          eT : 0,
		}

		this.translate = 'translate3d(0px, 0px, 0px)';

	}
 
	init(el, binding, vnode, oldVnode){
    this.el = el.children[0];
    this.update(el, binding, vnode, oldVnode);
    if(binding.value){
      binding.value['topLoad']?this.topLoad = binding.value['topLoad']:this.topLoad=null;
      binding.value['botLoad']?this.botLoad = binding.value['botLoad']:this.botLoad=null;
    }
		this.el.style['transform'] = this.translate;
		this.el.style['transitionDuration'] = '0ms';
		this.el.addEventListener('touchstart', this._start.bind(this), {passive:false});
		this.el.addEventListener('touchmove', this._move.bind(this), {passive:false});
		this.el.addEventListener('touchend', this._end.bind(this), {passive:false});
	}

  update(el, binding, vnode, oldVnode){
      this.data.vH =  el.offsetHeight;
      this.data.H =  el.children[0].offsetHeight,
      this.data.sH =  el.offsetHeight - el.children[0].offsetHeight;
  }

	//touchstart事件  
    _start(e) {
        try
        {

            var touch = e.touches[0] || e;
            var oDate = new Date();
            this.data.sT = oDate.getTime(); 
            //记录触点初始位置  
            this.data.sY = Number(touch.pageY);
            this.data.mY = Number(touch.pageY);
            this.el.style['transitionDuration'] = '0ms';
        } catch (e) {
            alert('touchSatrtFunc：' + e.message);
        }
        // ViewScroll._bind(document,'touchmove', ViewScroll._move);
        // ViewScroll._bind(document,'touchend', ViewScroll._end);
    }
    //touchmove事件
    _move(e) {
    	try
        {
       	 	var touch = e.touches[0] || e;
       	 	let distance = Number(touch.pageY)-this.data.mY;
       	 	this.data.mY = Number(touch.pageY);
       	 	this.data.Y += distance;
       	 	this.translate = 'translate3d(0px,'+this.data.Y+'px, 0px)';
            this.el.style['transform'] = this.translate;
            if(Math.abs(this.data.mY)<10){
            	var oDate = new Date();
            	this.data.sT = oDate.getTime();
            }

    	}catch (e){
    		alert('touchMoveFunc：' + e.message);
        }     
    }
    //touchend事件
    _end(){
    	try
        {
        	var oDate = new Date();
           	this.data.eT = oDate.getTime();
           	var duration = this.data.eT - this.data.sT;
       	 	if(duration<300){
                var momentumY = this._momentum(this.data.mY,this.data.sY,duration,this.data.sH,this.data.vH);       
                this.data.Y +=  momentumY.destination
            }
            if(this.data.Y > 0 ){
            	this.data.Y = 0;
              this.topLoad?this.topLoad():null;
            }else if(this.data.Y < this.data.sH){
            	this.data.sH >=0 ? this.data.Y = 0 : this.data.Y = this.data.sH;
              this.botLoad?this.botLoad():null;
            }
            this.translate = 'translate3d(0px,'+this.data.Y+'px, 0px)';
            this.el.style['transitionDuration'] = '300ms';
            this.el.style['transform'] = this.translate;

    	}catch (e){
    		alert('touchEndFunc：' + e.message);
        } 
    }  
     //计算运动返回值
   	_momentum(current, start, time, lowerMargin, wrapperSize) {
       var distance = current - start,
         speed = Math.abs(distance) / time,
         destination,
         duration,
         deceleration = 0.0006;
  
       destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
       if((speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1)<0){
            destination > 0 ? destination *= -1 : '';
       }
       duration = speed / deceleration;
       if (destination < lowerMargin) {
         destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;//* (speed / 8)
         distance = Math.abs(destination - current);
         duration = distance / speed;
       } else if (destination >= 0) {
         destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;//* (speed / 8)                      
         distance = Math.abs(current) + destination;
         duration = distance / speed;    
          } 
        if(wrapperSize){
            if(Math.abs(destination)>wrapperSize){
                destination = wrapperSize*(destination/Math.abs(destination))/2;
            }
        }
       return {
        destination: Math.round(destination),
         duration: duration
       };
     }
}

export default new scroll(); 