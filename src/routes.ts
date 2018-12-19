import runRconCommand from "./runRconCommand";

const routes = (app) => {
    app.route("/api")
    .get(async (req,res) => {
        res.send("GET request successful");
    })
    .post(async (req,res) => {
        res.send("POST request successful");
    });
    app.route("/api/:id")
    .put((req,res) => {
        res.send("PUT request successful");
    })
    .delete((req,res) => {
        res.send("DELETE request successful");
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

}

export default routes;
