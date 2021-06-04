/*
    CIT 281: Lab 8
    Name: Edwin Gutierrez
*/


// #1 TODO: Declare fastify object from fastify, and execute
const fastify = require('fastify') ();
// #2 TODO: Declare fetch object from node-fetch
const fetch = require ('node-fetch');

fastify.get("/photos", (request, reply) => {
    // - two .then() chain methods, return 200
    // - single .catch() chain method, return 404
    fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(json => {
            reply
                .code(200)
                .header("Content-Type", "text/json; charset=utf-8")
                .send({ error: "", statusCode: 200, photos: json })
        })
        .catch(err => {
            reply
                .code(404)
                .header("Content-Type", "text/json; charset=utf-8")
                .send({ error: err, statusCode: 404, photos: [] })
        });
  });
  
  fastify.get("/photos/:id", (request, reply) => {

    // - two .then() chain method, return 200
    // - single .catch() chain method, return 404
    const { id = "" } = request.params;  
    fetch('https://jsonplaceholder.typicode.com/photos/' + id)
        .then(response => response.json() )
        .then(json => {
            if (Object.keys(json).length === 0) {
                reply
                    .code(200)
                    .header("Content-Type", "text/json; charset=utf-8")
                    .send({ error: "Invalid ID", statusCode: 200, photo: {} });
            } else {
                reply
                    .code(200)
                    .header("Content-Type", "text/json; charset=utf-8")
                    .send({ error: "", statusCode: 200, photo: json });
            }
        })
        .catch(err => {
            console.log (err)
            reply
                .code(404)
                .header("Content-Type", "text/json; charset=utf-8")
                .send({ error: err, statusCode: 404, photo: {} });
        });
  });
  
  // Start server and listen to requests using Fastify
  const listenIP = "localhost";
  const listenPort = 8080;
  fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  });