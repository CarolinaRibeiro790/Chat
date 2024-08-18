//1 servidor para vários clientes - 1 cliente manda mensagem para o servidor e o servidor manda para todos os clientes conectados
// servidor: WebSockerServer

//importando as bibliotecas
const { WebSocketServer } = require("ws")
const dotenv = require("dotenv")

dotenv.config()

const wss = new WebSocketServer({port: process.env.PORT || 8080})

//envento de conexão, ws cliente que está conectando no servidor
wss.on("connection", (ws) =>{
    ws.on('error', console.error(err))


    //dispara sempre que alguém mandou uma mensagem para o servidor
    ws.on('message', (data)=> {
        //todos os clientes
        wss.clients.forEach(client => { client.send(data.toString())});

        //retornar a mensagem apenas para o cliente que enviou a mensagem
        //wss.clients.forEach(client => { ws.send(data)});
    })

    console.log('client connected')
})

