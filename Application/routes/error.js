const express = require("express");
const router = express.Router();

const handle_404 = (request,response,next) => {
    response.status(404).send("<h3>Page Not Found (404 Error)</h3>");
}

router.use(handle_404);

module.exports = router;