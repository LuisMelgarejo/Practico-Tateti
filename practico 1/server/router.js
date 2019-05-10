const mime = require('mime-types')
const fs = require("fs")
var url = require("url");
const path = require('path')


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

function cargarArchivosEstaticos(request, response) {
    console.log("luis");
    var path = url.parse(request.url).pathname
    path = "./Views"+path;
	console.log(path)
    
    fs.readFile(path, function (err, data) {
        if (err) {
            handle404(request, response)
            return;
        }

        response.writeHead(200, { "Content-Type": "text/html" })
        response.write(data)
        response.end()
    })
    
}

async function route(routes, request, response) {
    try {
        const method = request.method
        const path = url.parse(request.url).pathname
        console.log(`Handling ${method} ${path}`)

        const routeFunc = routes[path]
        //console.log(routeFunc)
        if(!routeFunc)
        {
            cargarArchivosEstaticos(request, response)
            //console.log("static")
            return
        }

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


exports.route = route
