const editTitlteBtn = document.querySelector('.main-content-header-btn')
const headerTitle = document.querySelector('.content-header-title')
const addBtn = document.querySelector('.add-btn')
const taskList = document.querySelector('.content-main-column')
const darkThemeBtn = document.querySelector('.dark-theme-btn')

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

function addTask() {
    const listItemValue = prompt('Введите дело').trim()
    if (listItemValue) {
        let li = document.createElement('li')
        li.innerHTML = listItemValue
        taskList.appendChild(li)
        let img = document.createElement('img')
        img.src = './img/close.png'
        li.appendChild(img)
        saveData()
    }
}

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

// darkThemeBtn.addEventListener('click', function () {
//     if (darkThemeBtn.classList.contains('moon')) {
//         document.body.style.background = '#202020'
//         document.querySelector('.dark-theme').style.background = '#2C2C2C'
//         document.querySelector('.dark-theme-img').src = './img/sun.png'

//         document.querySelector('.content-header').style.background = '#C62F57'
//         document.querySelector('.add-btn').style.background = '#C62F57'
//         document.querySelector('.content-main').style.background = '#19122B'

//         darkThemeBtn.classList.remove('moon')
//         darkThemeBtn.classList.add('sun')
//     } else {
//         document.body.style.background = 'white'
//         document.querySelector('.dark-theme').style.background = '#DADADA'
//         document.querySelector('.dark-theme-img').src = './img/moon.png'

//         document.querySelector('.content-header').style.background = '#FF4979'
//         document.querySelector('.add-btn').style.background = '#FF4979'
//         document.querySelector('.content-main').style.background = '#332651'

//         darkThemeBtn.classList.remove('sun')
//         darkThemeBtn.classList.add('moon')
//     }
// })

// function saveTheme() {
//     localStorage.setItem('theme', taskList.innerHTML)
// }

// function toggleTheme() {
//     const currentTheme = localStorage.getItem('theme')
//     const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
//     localStorage.setItem('theme', newTheme)
//     applyTheme(newTheme)
// }

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
        document.querySelector('.content-main').style.background = '#19122B'

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
