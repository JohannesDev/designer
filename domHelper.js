let $ = function (id) {

	'use strict';

	return document.getElementById(id);
};


let currentPanelElement = ""
let previousPanelElement = $('btn_pointer')

$('panel').addEventListener('click', (event) => {
	currentPanelElement = event.target
	
	if(event.target === $('btn_pointer')){
		canvas.selection = true;
	}
	else{
		//canvas.selection = false;
	}

	//remove and add highlight for the buttons
	previousPanelElement.classList.remove('active')
	event.target.classList.add('active')
	
    previousPanelElement = event.target
})
