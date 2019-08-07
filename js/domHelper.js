export let $ = function (selector) {

	'use strict';

	if(selector[0]==="#"){
		let id = selector.substring(1)
		return document.getElementById(id);
	}
	else if(selector[0]==="."){
		let className = selector.substring(1)		
		return document.getElementsByClassName(className)
	
	};
	
};











