import * as express from "express";
import * as dotenv from "dotenv";
import { Rcon } from "rcon-client"
let app = express();

dotenv.config();
console.log("Starting App");

const apiPort = process.env.APIPORT || 3000;
app.listen(apiPort, () => {
    console.log("Listening on port " + apiPort);
});


const connectOptions = {
  host: process.env.RCONHOST, port: Number(process.env.RCONPORT), password: process.env.RCONPASSWORD
}

async function runRconCommand(command) {
    const rcon = await Rcon.connect(connectOptions);
    let commandResponse = await rcon.send(command);
    rcon.end();
    return commandResponse;
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/api/mc/cmd", async (req, res) => {
    let command = req.query.command;
    let result = await runRconCommand(command);
    res.send(result);
});

app.get("/api/mc/manage/announce", async (req, res) => {
    let message = "Message from serverlords: " + req.query.message;
    let result = await runRconCommand(`say ${message}`);
    res.send(result);
});

app.get("/api/mc/status", async (req, res) => {
    let serverStatus = "unavailable";
    let listCmd = await runRconCommand("list");
    let onlinePlayers = Number(listCmd.split(" ")[2]);
    let playersArray = listCmd.split(" ").splice(9).join(" ").split(", ")
    let retJson = {
        serverStatus: serverStatus,
        onlinePlayers: onlinePlayers,
        players: playersArray
    };
    res.send(retJson);
});

app.get("/api/mc/listPlayers", (req, res) => {
    runRconCommand("list").then((result) => {
    }).catch(res.send);
});

app.use(express.static("public"));
