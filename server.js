const http = require('http');
const fs = require('fs');
const _ = require('lodash');


const server = http.createServer((req, res) => {
    console.log('request made')



    const num = _.random(0,20);
    console.log(num);


    res.setHeader('Content-Type','text/html');

    let path = './views/';

    switch(req.url){
        case '/':
        path += 'index.html';
        break;
        case '/about':
        path += 'about.html';
        break;
        case '/about-me':
        res.statusCode = 301;
        res.setHeader('Location','/about');
        res.end();
        break;
        default:
        path += '404.html';
        res.statusCode = 404;
        break;
    }    

    
    fs.readFile(path, (err, data) =>{
        if(err){
            console.log('Error from the server', err)
            res.end()
        }
        else 
        {
            res.write(data);
            res.end();
        }
    })




})

server.listen(3000, 'localhost', () => {
    console.log('listening to server 3000')
})