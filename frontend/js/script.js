//login elementos
const login = document.querySelector('.login')
const loginForm = login.querySelector('.login__form')
const loginInput = login.querySelector('.login__input')

//chat elements
const chat = document.querySelector('.chat')
const chatForm = chat.querySelector('.chat__form')
const chatInput = chat.querySelector('.chat__input')
const chatMessages = chat.querySelector('.chat__messages')

const colors = [
    'cadetblue',
    // 'darkgoldenrod',
    // 'cornflowerblue',
    // 'daerkkhaki',
    // 'hotpink',
    'gold'
]

const user = {id: '', name:'', color: ''}

//variavel para a conexão com o servidor, o valor dela será atualizado quando fizer o login
let websocket

//função para a nossa própria mensagem
const createMessageSelfElement = (content) => {
    const div = document.createElement('div')
    div.classList.add('message--self')
    div.innerHTML = content
    return div
}

//função de quem recebe
const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement('div')
    const span = document.createElement('span')
    span.style.color = senderColor

    div.classList.add('message--other')
    div.classList.add('message--self')
    span.classList.add('message--sender')

    div.appendChild(span)

    span.innerHTML = sender
    div.innerHTML += content 
    return div
}

//função para gerar as cores da mensagem
const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length) 
    return colors[randomIndex]
}

//Função para a tela rolar para baixo quando chegar mensagem
const scrollScreen = () =>{
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    })
}

//função para manusear mensagens recebidas do servidor
const processMessage = ({data}) => {
    const {userId, userName, userColor, content} = JSON.parse(data)

    const message = 
    userId == user.id 
    ? createMessageSelfElement(content) 
    : createMessageOtherElement(content, userName, userColor)

    chatMessages.appendChild(message)

    scrollScreen()
}


//função para o login
const handleLogin = (event) => {
    event.preventDefault() //não deixar visivel os dados ao recarregar os dados na aba de navegação
    
    //user.id = Date.now() ou
    user.id = crypto.randomUUID() //gerar id unico
    user.name = loginInput.value
    user.color = getRandomColor()

    login.style.display = "none" //ocultar o login
    chat.style.display = 'flex'

    //conexão com o servidor
    websocket = new WebSocket('ws://localhost:8080')

     //mensagem do servidor
     websocket.onmessage = processMessage
    
}

//função para enviar mensagem para o servidor
const sendMessage = (event) => {
    event.preventDefault()

    //objeto
    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value //conteudo da mensagem
    }

    //transformando o objeto em string
    websocket.send(JSON.stringify(message))

    //limpar o input depois de enviar a mensagem
    chatInput.value = ""
}

loginForm.addEventListener('submit', handleLogin)
chatForm.addEventListener('submit', sendMessage)