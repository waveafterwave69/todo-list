const editTitlteBtn = document.querySelector('.main-content-header-btn')
const headerTitle = document.querySelector('.content-header-title')
const addBtn = document.querySelector('.add-btn')
const taskList = document.querySelector('.content-main-column')

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
