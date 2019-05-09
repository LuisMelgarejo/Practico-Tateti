const http = require("http")
const router = require("./router")
const controller = require("./controller")

const server = http.createServer();

server.on('request', (request, response) => {
    const routes = {
        "/":{
            method: "GET",
            handler: controller.getPartidas
        },
        "/partida":{
            method: "POST",
            handler: controller.savePartidas
        }

    } 

    let body = [];
    request.on('error', (err) => {
        console.error(err)
    }).on('data', (chunk) => {
        body.push(chunk)
    }).on('end', () => {
        body = Buffer.concat(body).toString()
        request.body = body
        router.route(routes, request, response)
    });

    //router.route(routes, request, response)
})

server.listen(1010)
console.log("Server iniciado")