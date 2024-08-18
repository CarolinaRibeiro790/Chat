//login elementos
const login = document.querySelector('.login')
const loginForm = document.querySelector('.login__form')
const loginInput = document.querySelector('.login__input')

const user = {id: '', name:'', color: ''}

//função para logar
const handleSubmit = (event) => {
    event.preventDefault() //não recarregar os dados na aba de navegação
}


loginForm.addEventListener('submit',handleSubmit)