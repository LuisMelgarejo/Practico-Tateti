let partidasGanadas = {
    jugadorX: 0,
    jugadorO: 0
};

function test(request, response){
    response.writeHead(200, {"Content-Type": "aplication/json"})
    //let obj = [1,2,23,3,3,];
    response.write(JSON.stringify(partidasGanadas))
    response.end()
}

function savePartidas(request, response){
    console.log(request.body);
  
    
    response.writeHead(200, {"Content-Type": "aplication/json"})
    
    partidasGanadas.jugadorO = partidasGanadas.jugadorO + 1;
    partidasGanadas.jugadorX = partidasGanadas.jugadorX + 1;


    response.write(JSON.stringify(partidasGanadas))
    response.end()
}

exports.test = test
exports.savePartidas = savePartidas