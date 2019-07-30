let $ = function (selector) {

	'use strict';

	if(selector[0]==="#"){
		let id = selector.substring(1)
		return document.getElementById(id);
	}
	else if(selector[0]==="."){
		let className = selector.substring(1)
		return document.getElementsByClassName("panel__item")
	
	};
	
};




//PANEL  on click events

let currentPanelElement = ""
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
}



$('#window').addEventListener('mousedown', (event) => { 
    //mouseX = event.pageX - $('#window').offsetLeft
    //mouseY = event.pageY - $('#window').offsetTop
    //down = true;
});

$('#drawing').addEventListener('mousemove', () => {
    //mouseX = event.pageX - $('#window').offsetLeft
    //mouseY = event.pageY - $('#window').offsetTop
});

$('#drawing').addEventListener('mouseup', () => {
    //mouseX = event.pageX - $('#window').offsetLeft
    //mouseY = event.pageY - $('#window').offsetTop
    //down = false;
});



const UI = {
	button_pointer: $('#btn_pointer'),
	button_rect: $('#btn_rect'),
	button_circle: $('#btn_circle'),

	color_turquoise: $('#turquoise'),
	color_tangopink: $('#tangopink'),
	color_ube: $('#ube'),
	color_liberty: $('#liberty'),
	color_gargoyleglass: $('#gargoyleglass')
}




