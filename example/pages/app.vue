<template>
	<div class="view">
		<div class="header">这是头部</div>
    	<scroll-view class="scroll-view" :topLoad="topLoadFun" :botLoad="botLoadFun">
    		<div class="item" v-for="item in list">{{item}}</div>
			<scroll-view class="children-view" :topLoad="topLoadFun" :botLoad="botLoadFun">
	    		<div class="item" v-for="item in list">{{item}}</div>
	    	</scroll-view>
    	</scroll-view>
	</div>  
</template>

<script type="text/javascript">
export default {
  	name: 'app',
	data() {
	    return {
	    	list:[]
	    };
	  },

	created(){
		var l = 0;
			this.list=[];
			for(let i=l;i<l+60;i++){
				this.list.push(i)
			}
	},

	methods:{
		topLoadFun(){
			// console.log('上拉事件')
			var l = 0;
			this.list=[];
			for(let i=l;i<l+20;i++){
				this.list.push(i)
			}
		},
		botLoadFun(){
			// console.log('下拉事件')

			var l = this.list.length;
			if(l>=100){
				return false;
			}
			for(let i=l;i<l+20;i++){
				this.list.push(i)
			}
		},
	}
}; 
</script>