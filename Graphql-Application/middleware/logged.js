import _ from 'lodash';

export const checkLogin = (request,response,next) => {

    if( request.session.isLoggedIn) {
        next();
    }
    else {
        response.status(400).send("Login Please");
    }
   
};

export const checkAdminLogin = (request,response,next) => {

    if( request.session.isLoggedIn && _.isEqual(request.session.user.role,"ADMIN")) {
        next();
    }
    else {
        response.status(400).send("Login Please");
    }
   
};