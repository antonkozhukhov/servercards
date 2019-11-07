const http = require('http');

// передадим обработчик
const server = http.createServer(() => {
    console.log('Пришёл запрос!');
});

server.listen(3000);