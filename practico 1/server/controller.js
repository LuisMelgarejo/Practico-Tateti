const fs = require("fs")
var url = require("url");

let partidasGanadas = {
    jugadorX: 0,
    partidasJugadorX:[],
    jugadorO: 0,
    partidasJugadorO: []
};


function getPartidas(request, response){
    response.writeHead(200, {"Content-Type": "aplication/json"})
    
    response.write(JSON.stringify(partidasGanadas))
    response.end()
}

function savePartidas(request, response){
    
    //console.log(response.body);
    var obj = JSON.parse(request.body);
    //console.log(obj.partidasJugadorX);
    if(obj.jugadorX == 1)
    {
        partidasGanadas.jugadorX = partidasGanadas.jugadorX + 1;
        partidasGanadas.partidasJugadorX.push(obj.partidasJugadorX);
        console.log("El Jugador X tiene partidas ganadas : " + partidasGanadas.jugadorX)
        console.log("La linea ganadora es: " + partidasGanadas.partidasJugadorX[partidasGanadas.partidasJugadorX.length - 1])
    }
    if(obj.jugadorO == 1)
    {
        partidasGanadas.jugadorO = partidasGanadas.jugadorO + 1;
        partidasGanadas.partidasJugadorO.push(obj.partidasJugadorO);
        console.log("El Jugador O tiene partidas ganadas : " + partidasGanadas.jugadorO)
        console.log("La linea ganadora es: " + partidasGanadas.partidasJugadorO[partidasGanadas.partidasJugadorO.length - 1])
    }

    response.writeHead(200, {"Content-Type": "aplication/json"})
    
    response.write(JSON.stringify(partidasGanadas))
    response.end()
}

function homePage(request, response) {
    console.log("inicia html");
    const path = url.parse(request.url).pathname
    fs.readFile('./Views/Tateti_v1.1.html', function (err, data) {
        if (err) {
            handle404
            return;
        }

        response.writeHead(200, { "Content-Type": "text/html" })
        response.write(data)
        response.end()
    })
}

exports.homePage = homePage
exports.getPartidas = getPartidas
exports.savePartidas = savePartidas