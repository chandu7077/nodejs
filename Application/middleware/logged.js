const _ = require("lodash");

exports.checkLogin = (request,response,next) => {

    if( request.session.isLoggedIn) {
        next();
    }
    else {
        response.status(400).send("Login Please");
    }
   
}

exports.checkAdminLogin = (request,response,next) => {

    if( request.session.isLoggedIn && _.isEqual(request.session.user.role,"ADMIN")) {
        next();
    }
    else {
        response.status(400).send("Login Please");
    }
   
}