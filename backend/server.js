require('dotenv').config();
const http=require('http');

const app=require('./app')

port=process.env.PORT || 4000;
app.set('port',port);

const server=http.createServer(app);

server.listen(port);