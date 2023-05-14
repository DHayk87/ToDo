import {customFetch} from "./xhr.js"

const form = document.forms[0]
let ul = newlist.querySelector('ul')
const str = 'img/recycle-bin.png'

customFetch('https://jsonplaceholder.typicode.com/todos?_limit=20')
    .then((response) => {
        response.forEach((elm) => {
            ul.append(drow(elm.title, elm.completed))
        })
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        const prog = document.getElementsByClassName('spiner-wraper')[0]
        prog.remove()
    })

function drow(arr, com) {
    const li = document.createElement('li')
    const img = document.createElement('img')
    const chack = document.createElement('input')
    const p = document.createElement('p')

    img.setAttribute('src', str)
    chack.setAttribute('type', 'checkbox')

    com ? li.style.textDecoration = 'line-through' : 'none'
    com ? chack.checked = true : chack.checked = false
    p.textContent = arr
    p.insertAdjacentElement('afterbegin', chack)
    li.insertAdjacentElement('afterbegin', p)
    li.insertAdjacentElement('beforeend', img)

    return li
}

ul.addEventListener('click', (e) => {
    let chackStatus = false
    if (e.target.localName == 'li') {
        e.target.firstChild.firstChild.checked = e.target.firstChild.firstChild.checked == chackStatus ? true : false
        if (e.target.firstChild.firstChild.checked) {
            e.target.style.textDecoration = 'line-through'
        } else {
            e.target.style.textDecoration = 'none'
        }
    } else if (e.target.localName == 'p') {
        e.target.firstChild.checked = e.target.firstChild.checked == chackStatus ? true : false
        if (e.target.firstChild.checked) {
            e.target.parentElement.style.textDecoration = 'line-through'
        } else {
            e.target.parentElement.style.textDecoration = 'none'
        }
    }
    if (e.target.checked) {
        e.target.parentElement.parentElement.style.textDecoration = 'line-through'
    } else {
        e.target.parentElement.parentElement.style.textDecoration = 'none'
    }

    if (e.target.localName == 'img') {
        e.target.parentElement.remove()
        return
    }

})


form.addEventListener('click', (e) => {
    e.preventDefault()

    let arr = [...ul.querySelectorAll('li')]
    .map(li => ({
        text: li.textContent,
        completed: li.childNodes[0].firstChild.checked
    }))

    if (e.target.className == 'add') {
        if (form[0].value == '') {
            alert('text greq')
        } else {
            ul.prepend(drow(form[0].value, false))
            form[0].value = ''
        }
    }else if (e.target.className == 'sort-status') {
        arr.sort((a, b) => a.completed > b.completed ? 1 : -1)
        ul.innerText = ''
        arr.forEach(elm => {
            ul.append(drow(elm.text, elm.completed))
        })
    }else if (e.target.className == 'sort-title') {
        e.preventDefault()

        arr.sort((a, b) => a.text > b.text ? 1 : -1)
        ul.innerText = ''
        arr.forEach(elm => {
            ul.append(drow(elm.text, elm.completed))
        })
    }
})