
let $ = function (selector) {

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




//PANEL  on click events

/*let currentPanelElement = $('#btn_pointer')
let previousPanelElement = $('#btn_pointer')

let panelItems = $('.panel__item')
for(let element of panelItems){
	element.addEventListener('click', (event) => {
		currentPanelElement = event.currentTarget
		
		if(event.currentTarget === $('#btn_pointer')){
			canvas.selection = true;
		}
		else{
			canvas.selection = false;
		}
	
		//remove and add highlight for the buttons
		previousPanelElement.classList.remove('active')
		event.currentTarget.classList.add('active')
		
		previousPanelElement = event.currentTarget
	})
}*/









