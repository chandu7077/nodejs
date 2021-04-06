import BaseError from './error.js';
import HttpStatusCode from './status.js';

export const UserNotFoundException = new BaseError(
                                    "UserNotFound",
                                    "User Not Found",
                                    HttpStatusCode.BAD_REQUEST);

export const UserAlreadyExistsException = new BaseError(
                                        "UserAlreadyExists",
                                        "User Already Exists with given details",
                                        HttpStatusCode.BAD_REQUEST);

export const InvalidAccessTokenException = new BaseError(
                                        "InvalidAccessToken",
                                        "Token empty or not valid",
                                        HttpStatusCode.BAD_REQUEST);