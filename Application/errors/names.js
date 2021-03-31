const BaseError = require("./error");
const HttpStatusCode = require("./status");

exports.UserNotFoundException = new BaseError(
                                    "UserNotFound",
                                    "User Not Found",
                                    HttpStatusCode.BAD_REQUEST);

exports.UserAlreadyExistsException = new BaseError(
                                        "UserAlreadyExists",
                                        "User Already Exists with given details",
                                        HttpStatusCode.BAD_REQUEST);

exports.InvalidAccessTokenException = new BaseError(
                                        "InvalidAccessToken",
                                        "Token empty or not valid",
                                        HttpStatusCode.BAD_REQUEST);