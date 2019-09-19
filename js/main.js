;(function () {

	'use strict'

	let plateNumber = 1 //  текущая карточка
 	let progressBar =  0 + '%'
	let progressNumber = 0
	let progressBarElem = document.querySelectorAll('.progress__line-bar')
	let progressElem = document.querySelectorAll('.progressNumber')
	const answers = [null, null, null, null] // массив ответов
	//Инициализация стартовой карточки
	switchPlate (plateNumber)

	// подписались на события всех кнопок
	const aButtonElements = document.querySelectorAll('a.button')
	for (const aButtonElement of aButtonElements){
		aButtonElement.addEventListener ('click',aButtonElementClickHandler)
	}

	// Обработка радио-кнопок 2-ой карточки
	const labelElements_2 = document.querySelectorAll('#plate2 label')
	for (const labelElement of labelElements_2) {
		labelElement.addEventListener('click', labelElementClickEventHandler_2)
		labelElement.classList.remove('radio-block--active')
	}

	function labelElementClickEventHandler_2 (event){
		event.stopPropagation()
		for (const labelElement of labelElements_2){
			labelElement.classList.remove('radio-block--active')	
		}
		this.classList.add('radio-block--active')
		answers[0] = this.querySelector('.radio-block__text').textContent
		const buttonNext = document.querySelectorAll('.button--next')	
		buttonNext[0].style.backgroundColor ='#09ac0c'	
		progressNumber = 25		
		progressBarElem[0].style.width = progressNumber + '%'
		progressElem[0].textContent = progressNumber + '%'
	}

	// Обработка чек-боксов 3-ой карточки
	const labelElements_3 = document.querySelectorAll('#plate3 label')
	for (const labelElement of labelElements_3) {
		labelElement.addEventListener('click', labelElementClickEventHandler_3)
		labelElement.classList.remove('checkbox-block--active')
	}
	let flag = false
	function labelElementClickEventHandler_3 (event){
		flag = !flag
		if (flag) {return}
		this.classList.toggle('checkbox-block--active')

		const checked = []
		const elements = this.parentElement.querySelectorAll('.checkbox-block--active')

		for ( const element of elements ) {
			checked.push(element.querySelector('.checkbox-block__text').textContent)
		}

		answers[1] = checked.length === 0 ? null : checked
		const buttonNext = document.querySelectorAll('.button--next')
		buttonNext[1].style.backgroundColor ='#09ac0c'
		progressNumber = 50
		progressBarElem[1].style.width = progressNumber + '%'
		progressElem[1].textContent = progressNumber + '%'
	}

	// Обработка радио-кнопок 4-ой карточки
	const labelElements_4 = document.querySelectorAll('#plate4 label')
		for (const labelElement of labelElements_4) {
		labelElement.addEventListener('click', labelElementClickEventHandler_4)
	}

	function labelElementClickEventHandler_4 (event){
		event.stopPropagation()

		for (const labelElement of labelElements_4){
		}

		this.classList.add('card-block--active')
		answers[2] = this.querySelector('.card-block__text').textContent
		const buttonNext = document.querySelectorAll('.button--next')
		buttonNext[2].style.backgroundColor ='#09ac0c'
		progressNumber = 75		
		progressBarElem[2].style.width = progressNumber + '%'
		progressElem[2].textContent = progressNumber + '%'	
	}

	// Обработка 5-ой карточки
	const inputEmail = document.querySelector('#email')
	const resultElement = document.querySelector('#result')
	const checkRules  = document.querySelector('#checkRules')
	checkRules.addEventListener('click', function(event){
		if (inputEmail.value !== ''){
			resultElement.style.backgroundColor = '#09ac0c'
			}
	})

	inputEmail.addEventListener('change', function(event){
		if (checkRules.checked){
				resultElement.style.backgroundColor = '#09ac0c'
		}
	})

	resultElement.onclick = function quizResult(event){
		event.preventDefault()
		event.stopPropagation()
		if ( inputEmail.value !== '' && checkRules.checked){
			switchPlate(6)	
		}
	}

	function aButtonElementClickHandler (event){
		event.preventDefault()
		if (this.textContent === 'Пройти тест') {
			plateNumber ++	
		}
		if (this.textContent === 'Далее' && answers[plateNumber - 2] !== null) {
			plateNumber ++	
		}

		if (this.textContent === 'Назад') {
			plateNumber --
		}
		 switchPlate(plateNumber)
	}

	function switchPlate (number) {
		hiddenAllPlates ()
		showPlate (number)
	}

	function hiddenAllPlates (){

		const plateElements = document.querySelectorAll('.plate')
		for (let i = 0; i < plateElements.length; i++){
			const plateElement = plateElements[i]
			plateElement.style.display = 'none'
		}
	}

	function showPlate (number) {
		const plateElement = document.querySelector('#plate' + number)
		plateElement.style.display = ''
	}

}) ();