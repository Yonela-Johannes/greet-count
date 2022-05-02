let username = document.querySelector('.name')
const counter = document.querySelector('.counter')
const greetMe = document.querySelector('.greet-me')
const greet = document.querySelector('.greet')
const error = document.querySelector('.error')
const selectionError = document.querySelector('.selection-error')
const nameLabel = document.querySelector('.name-label')
const languageGreetSelect = document.getElementsByClassName('language')

let users = JSON.parse(localStorage.getItem("users"))
let count = JSON.parse(localStorage.getItem('count'))
let language = JSON.parse(localStorage.getItem('language'))
let selected = false

let usernames = !users ? [] : users
counter.innerHTML = count
greet.innerHTML = 'Your name and greeting in selected language will appear here.'

greetMe.onclick = () => {
    let name = username.value
    let cleanName = name.trim()
    for (let i = 0; i < languageGreetSelect.length; i++) {
        languageGreetSelect[i].checked ? selected = true : selected
    }
    if (typeof cleanName == 'string' && cleanName !== '' && selected) {
        nameLabel.classList.remove('error-name')
        nameLabel.classList.add('correct-name')
        error.classList.add('hide')
        username.classList.remove('error-name')
        selectionError.classList.add('hide')
        username.classList.add('correct-name')
        for (let i = 0; i < languageGreetSelect.length; i++) {
            languageGreetSelect[i].checked && (language = languageGreetSelect[i].value)
        }
        usernames.includes(cleanName) ? (usernames = usernames, language, count) : (usernames = [...usernames, cleanName], count++, language)
        counter.innerHTML = count
        greet.innerHTML = `${language} ${cleanName}`
        localStorage.setItem('users', JSON.stringify(usernames))
        localStorage.setItem('count', JSON.stringify(count))
        localStorage.setItem("language", JSON.stringify(language))

    } else if (username.value == '') {
        error.innerHTML = 'please enter name!'
        nameLabel.classList.add('error-name')
        error.classList.remove('hide')
        username.classList.add('error-name')
    }
    else if (username.value.length < 4) {
        error.innerHTML = 'name must be more than 4 characters!'
        nameLabel.classList.add('error-name')
        error.classList.remove('hide')
        username.classList.add('error-name')
    }
    else if (!selected) {
        selectionError.classList.remove('hide')
    }
}
