const http = require('http');
const nock = require('nock');
const request = require('request');

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.write('Hello');
    setTimeout(() => {
        res.end();
    }, 550);
});

server.listen(3000);
const requestPromise = () =>
    new Promise((resolve, reject) => {
        request({
            url: 'http://localhost:3000/',
            method: 'GET',
            timeout: 500
        }, function(err, res, body) {
            if (err) {
                resolve(err);
                return;
            }
            reject(new Error('Should not be successful'));
        });
    });

requestPromise()
    .catch(() => {
        server.close();
        console.log('Request should have failed with timeout but didn\'t');
        process.exit(1);
    })
    .then(err => {
        server.close();
        console.log('Request sent back error: ' + err);
        nock('http://localhost:3000')
            .get('/')
            .delayBody(550)
            .reply(200, 'Hello');
        return requestPromise();
    })
    .catch(() => {
        console.log('Nock should have failed with timeout but didn\'t');
        process.exit(2);
    })
    .then(err => {
        console.log('Nock sent back error: ' + err);
        process.exit(0);
    });
