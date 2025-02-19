const editTitlteBtn = document.querySelector('.main-content-header-btn')
const headerTitle = document.querySelector('.content-header-title')
const addBtn = document.querySelector('.add-btn')
const taskList = document.querySelector('.content-main-column')
const darkThemeBtn = document.querySelector('.dark-theme-btn')
const modalWindow = document.querySelector('.modal')
const closeBtn = document.querySelector('.close-modal')
const overlay = document.querySelector('.overlay')
const modal = document.getElementById('myModal')
const span = document.getElementsByClassName('close')[0]
const okBtn = document.getElementById('okBtn')
const cancelBtn = document.getElementById('cancelBtn')
const inputText = document.getElementById('inputText')
const btnYes = document.querySelector('.btn-yes')

addBtn.onclick = function () {
    modal.style.display = 'block'
    inputText.focus()
}

span.onclick = function () {
    modal.style.display = 'none'
    document.querySelector('.input').value = ''
}

btnYes.onclick = function () {
    modal.style.display = 'none'
}

btnYes.addEventListener('click', function () {
    const listItemValue = document.querySelector('.input').value
    document.querySelector('.input').value = ''
    if (listItemValue) {
        let li = document.createElement('li')
        li.innerHTML = listItemValue
        taskList.appendChild(li)
        let img = document.createElement('img')
        img.src = './img/close.png'
        li.appendChild(img)

        saveData()
        li.setAttribute('data-aos', 'zoom-out')
    }
})

document.addEventListener('keydown', function (event) {
    if (event.key == 'Escape' && !modalWindow.classList.contains('hidden')) {
        modalWindow.classList.toggle('hidden')
        overlay.classList.toggle('hidden')
    }
})

editTitlteBtn.addEventListener('click', function () {
    let promptValue = prompt('Введите новое название.').trim()
    if (promptValue) {
        if (promptValue.length < 15) {
            headerTitle.textContent = promptValue
            saveTitle()
        } else {
            alert('Слишком много текста!')
        }
    }
})

function saveTitle() {
    localStorage.setItem('title', headerTitle.innerHTML)
}

function showTitle() {
    headerTitle.innerHTML = localStorage.getItem('title')
}

showTitle()

taskList.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked')
        saveData()
    } else if (event.target.tagName === 'IMG') {
        event.target.parentElement.remove()
        saveData()
    }
})

function saveData() {
    localStorage.setItem('data', taskList.innerHTML)
}

function showTask() {
    taskList.innerHTML = localStorage.getItem('data')
}
showTask()

darkThemeBtn.addEventListener('click', function () {
    const currentTheme = localStorage.getItem('theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
})

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.style.background = '#202020'
        document.querySelector('.dark-theme').style.background = '#2C2C2C'
        document.querySelector('.dark-theme-img').src = './img/sun.png'

        document.querySelector('.content-header').style.background = '#C62F57'
        document.querySelector('.add-btn').style.background = '#C62F57'
        document.querySelector('.content-main').style.background = '#342852'

        darkThemeBtn.classList.remove('moon')
        darkThemeBtn.classList.add('sun')
    } else {
        document.body.style.background = 'white'
        document.querySelector('.dark-theme').style.background = '#ebebeb'
        document.querySelector('.dark-theme-img').src = './img/moon.png'

        document.querySelector('.content-header').style.background = '#FF4979'
        document.querySelector('.add-btn').style.background = '#FF4979'
        document.querySelector('.content-main').style.background = '#332651'

        darkThemeBtn.classList.remove('sun')
        darkThemeBtn.classList.add('moon')
    }
}

function saveTheme() {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
        applyTheme(storedTheme)
    } else {
        applyTheme('light')
    }
}
saveTheme()
