let partidasGanadas = {
    jugadorX: 0,
    jugadorO: 0
};


function getPartidas(request, response){
    response.writeHead(200, {"Content-Type": "aplication/json"})
    
    response.write(JSON.stringify(partidasGanadas))
    response.end()
}

function savePartidas(request, response){
    

    var obj = JSON.parse(request.body);
    
    if(obj.jugadorX == 1)
    {
        partidasGanadas.jugadorX = partidasGanadas.jugadorX + 1;
        console.log("El Jugador X tiene partidas ganadas : " + partidasGanadas.jugadorX)
    }
    if(obj.jugadorO == 1)
    {
        partidasGanadas.jugadorO = partidasGanadas.jugadorO + 1;
        console.log("El Jugador O tiene partidas ganadas : " + partidasGanadas.jugadorO)
    }

    response.writeHead(200, {"Content-Type": "aplication/json"})
    
    response.write(JSON.stringify(partidasGanadas))
    response.end()
}

exports.getPartidas = getPartidas
exports.savePartidas = savePartidas