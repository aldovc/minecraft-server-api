import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";
const app = express();

routes(app);

const apiPort = process.env.APIPORT || 3000;

app.listen(apiPort, () => {
    console.log("Listening on port " + apiPort);
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static("public"));
