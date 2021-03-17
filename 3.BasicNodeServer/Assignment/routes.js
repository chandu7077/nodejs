const fs = require("fs");

const requestHandler = (request,response) => {
    response.setHeader("Content-Type","text/html");
    if(request.url === "/") {
        response.write(
            `<html>
              <body>
              <h1>WELCOME TO HOME PAGE</h1>
              <form method="POST" action="/create-user">
              <label for="username">Username</label><br><br>
              <input name="username"><br><br>
              <button type="submit">Create User</button><br><br>
              <a href="/users">Show Users</a>
              </form>
              </body>
            </html>
            `
        )
        
        return response.end();
    }

    else if(request.url === "/create-user" && request.method == "POST") {
        let data=[];
        request.on("data", (chunk)=> {
            data.push(chunk);
        })

        return request.on("end", ()=>{
            const userBuffer = Buffer.concat(data).toString();
            const username = userBuffer.split("=")[1];
            fs.appendFile("users.txt", "\n"+username, err => {
                response.setHeader("Location","/");
                response.statusCode = 302;
                return response.end();
            })
        })
    }

    else if(request.url === "/users") {
        
        let list = "";
        
        let data = fs.readFileSync("users.txt", 'utf8');
        const dummies = data.split("\n");
        dummies.map(dummy => {
            list = list + "<li>"+dummy+"</li>";
        })

        response.write(
            `<html>
              <body>
              <h1>Users:</h1>
              <ul>${list}</ul>
              </body>
            </html>
            `
        )
        return response.end();
    }
};

module.exports = {
    handler:requestHandler
}