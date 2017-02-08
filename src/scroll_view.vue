<template>
    <div class="vue-scroll-view" v-scroll="{'topLoad':topLoad,'botLoad':botLoad}" >
    	<div class="vue-scroll-main">
    		<slot></slot>
    	</div>
    </div>
</template>

<style type="text/css">
.vue-scroll-view{ 
	position: relative !important;
	overflow: hidden;
}
.vue-scroll-main{
	width: 100%;
	position: absolute !important;
	left:0 !important;
	top:0 !important;
}
</style>

<script type="text/javascript">
	export default {
		name:'scroll-view',
		props:{
			topLoad:{
		        type:Function,
		      },
		    botLoad:{
		        type:Function,
		      },
		}
	}
</script>