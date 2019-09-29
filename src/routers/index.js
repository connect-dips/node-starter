const apiUrl = '/api/v1';


import Ping from './ping.router';
import User from './users.router';

const routers = (app) => {
    app.use(apiUrl + '/ping', Ping);
    app.use(apiUrl + '/users', User);
};

export default routers;
