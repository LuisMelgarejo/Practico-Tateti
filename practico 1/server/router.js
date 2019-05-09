// var url = require("url");

// async function route(routes, request, response){
//     try{
//         const path = url.parse(request.url).pathname
//         const method = request.method

//         console.log(`Handling ${method} ${path}`)

//         const routeFunc = routes[path];

//         if (routeFunc
//             && routeFunc.method.toUpperCase().indexOf(method.toUpperCase()) >= 0) {
//             const promise = new Promise((resolve, reject) => {
//                 try {
//                     routeFunc.handler(request, response)
//                     resolve()
//                 } catch (error) {
//                     console.log("error 1")
//                     reject(error)
//                 }
//             });
//             await promise
//         }

//     } catch(error) {
//         console.log("error 2")

//     }

// }

//exports.route = route

var url = require("url");

// Handler error 500
function handle500(request, response, error) {
    response.writeHead(500)
    response.write(`Internal server error : ${error}`)
    response.end()
}

// Handler error 404
function handle404(request, response) {
    response.writeHead(404)
    response.write(`${url.parse(request.url).pathname} No se encuentra`)
    response.end()
}

/* Handler del router

    routes tiene la siguiente estrucutra

    {
        "/path": {
            method: "GET|POST|DELETE|PUT|HEADER|OPTIONS",
            handler: functionToRun
        },
        ...
    }

    Method es un string con todos los methods que queramos permitir
*/
async function route(routes, request, response) {
    try {
        const method = request.method
        const path = url.parse(request.url).pathname
        console.log(`Handling ${method} ${path}`)

        const routeFunc = routes[path]
        if (routeFunc
            && routeFunc.method.toUpperCase().indexOf(method.toUpperCase()) >= 0) {
            const promise = new Promise((resolve, reject) => {
                try {
                    routeFunc.handler(request, response)
                    resolve()
                } catch (error) {
                    reject(error)
                }
            });
            await promise
        } else {
            handle404(request, response)
        }
    } catch (error) {
        handle500(request, response, error)
    }
};

// Esto es un modulo, solo las cosas exportadas pueden verse desde otros archivos
exports.route = route
