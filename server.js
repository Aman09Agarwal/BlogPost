/*  
    ****************************************************
    Only for learning, not a part of the blogpsot project
    ****************************************************
*/


const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req,res) => {
    // console.log(req.url, req.method);

    // lodash usage

    // print random no. ranging from 0 to 20
    const num = _.random(0,20);
    console.log(num);

    // execute greet function only once no matter how many times it is called
    const greet = _.once(() => {
        console.log('Hello');
    });
    greet();
    greet();

    //  set header content type
    res.setHeader('Content-Type','text/html');
    // res.write('<h1>Hi! Aman</h1>');
    // res.end();

    let path = './views/';

    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // send an html file
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            res.end(data);
        }
    });

});

server.listen(3000, 'localhost', () => {
    console.log('server listening on port 3000');
});