var _jugador0 = ""
var _jugador1 = ""
var _jugadorActual = 0
var _turno = true
var _vector = [null, null, null, null, null, null, null, null, null]
var _ganador = undefined
var _lineaGanadora = []
var _celdasGanadoras = undefined

function getPlayer(num) {
    return _jugadorActual
}


function setX(obj) {
    debugger;
    var id_actual = obj.id

    //valida que una celda no este ocupada
    if (_vector[id_actual] != null) {
        return false
    }
    //validar que no haya ganador
    if (_ganador != undefined) {
        return false;
    }

    const marcaActual = _turno ? "X" : "O"
    obj.textContent = marcaActual
    _vector[id_actual] = marcaActual


    _turno = !_turno; //cambia _turno
    document.getElementById('turnoJugador').textContent = "Turno de Jugador " + marcaActual

    if (isTateti(marcaActual)) {
        // el juego termino
        //setear que jugador gano y bloqueo que siga jugando
        _ganador = marcaActual

        document.getElementById('textoGanador').textContent = "GANADOR Jugador " + marcaActual

        // llamar a funcion POST en el server
        actualizarGanador(_ganador);

        return false;
    }


}

function isTateti(marca) {
    //tateti horizontal
    for (var i = 0; i < 9; i += 3) {
        if (_vector[i] === marca && _vector[i + 1] === marca && _vector[i + 2] === marca) {
            _lineaGanadora = [i,i+1,i+2]; 
            return true
        }
    }

    //tateti vertical
    for (var d = 0; d < 9; d++) {
        if (_vector[d] === marca && _vector[d + 3] === marca && _vector[d + 6] === marca) {
            _lineaGanadora = [d,d+3,d+6]; 
            return true
        }
    }

    //2 estáticas columnas cruzadas
    if (_vector[0] === marca && _vector[4] === marca && _vector[8] === marca) {
        _lineaGanadora = [0,4,8]; 
        return true
    }

    if (_vector[2] === marca && _vector[4] === marca && _vector[6] === marca) {
        _lineaGanadora = [2,4,6]; 
        return true
    }

    return false
}

function Reset() {
    debugger;
    _turno = true
    _vector = [null, null, null, null, null, null, null, null, null]
    _ganador = undefined
    _celdasGanadoras = undefined

    for (var i = 0; i < 9; i += 1) {
        document.getElementById(i).textContent = "";
    }
    document.getElementById("turnoJugador").textContent = "Haz click en cualquier recuadro para comenzar";
    document.getElementById('textoGanador').textContent = "";
}

function actualizarGanador(ganador){
    var obj = {
        jugadorX : 0,
        partidasJugadorX: [],
        jugadorO : 0,
        partidasJugadorY: [],
    }

    if(ganador == "X"){
        obj.jugadorX = 1;
        obj.jugadorO = 0;
        obj.partidasJugadorX = ""+ _lineaGanadora[0] + _lineaGanadora[1] + _lineaGanadora[2];
    }

    if(ganador == "O"){
        obj.jugadorX = 0;
        obj.jugadorO = 1;
        obj.partidasJugadorO = ""+ _lineaGanadora[0] + _lineaGanadora[1] + _lineaGanadora[2];

    }

    $.ajax({
        url: 'http://localhost:1010/partida',
        dataType: 'json',
        data: JSON.stringify(obj),
        contentType : "application/json",
        type : "POST",
        success: function(respuesta) {
            
            //alert(respuesta);
            console.log(respuesta);
        },
        error: function() {
            console.log("No se ha podido obtener la información");
            alert("error");
        }
    });
}
