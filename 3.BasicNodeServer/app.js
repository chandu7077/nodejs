import http from 'http';
import routes from './routes';

const server = http.createServer(routes.handler);
server.listen(3000);

