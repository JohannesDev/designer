let mode = 'line'
let previousButton

document.addEventListener('mousedown', function (event) {



    if (event.target.id === 'button-drawline' || event.target.parentElement.id === 'button-drawline') {
        mode = 'line'

        if (typeof previousButton !== 'undefined') previousButton.classList.remove('active')
        let currentButton = document.getElementById('button-drawline')
        currentButton.classList.add('active')
        previousButton = currentButton

    }

    else if (event.target.id === 'button-selectline' || event.target.parentElement.id === 'button-selectline') {
        mode = 'selectLine'

        if (typeof previousButton !== 'undefined') previousButton.classList.remove('active')
        let currentButton = document.getElementById('button-selectline')
        currentButton.classList.add('active')
        previousButton = currentButton
    }

    else if (event.target.id === 'button-deleteline' || event.target.parentElement.id === 'button-deleteline') {
        mode = 'removeLine'

        if (typeof previousButton !== 'undefined') previousButton.classList.remove('active')
        let currentButton = document.getElementById('button-deleteline')
        currentButton.classList.add('active')
        previousButton = currentButton
    }



});

