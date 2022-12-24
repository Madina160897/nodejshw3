const http = require("http");
const fs = require("fs");


function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if(req.url === "/cars"){
        if (req.method === "POST") {
            let data = "";
            req.on("data", chunk => {
                data += chunk;
    
            });
            req.on("end", () => {
                const { model } = JSON.parse(data);
                const carsArray = JSON.parse(fs.readFileSync("cars.json"));
                carsArray.push({ id: carsArray.length + 1, model });
                fs.writeFileSync("cars.json", JSON.stringify(carsArray));
                res.end(`Car added`);
            })
        }else if(req.method === "GET"){
            res.end(fs.readFileSync("cars.json"));
        }
    }
    
}
http.createServer(handler).listen(8080);