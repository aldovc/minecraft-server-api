import { Rcon } from "rcon-client"
import * as dotenv from "dotenv";
dotenv.config();

const connectOptions = {
    host: process.env.RCONHOST,
    port: Number(process.env.RCONPORT),
    password: process.env.RCONPASSWORD
}

async function runRconCommand(command) {
    const rcon = await Rcon.connect(connectOptions);
    let commandResponse = await rcon.send(command);
    rcon.end();
    return commandResponse;
}

export default runRconCommand;