const os = require("os");
const networkInterface = os.networkInterfaces();
let IP_ADRESS = '';
const PORT = process.env.PORT || 4000;
try{
    if(networkInterface["Беспроводная сеть 3"]){
        IP_ADRESS += networkInterface["Беспроводная сеть 3"].find(network => network.family == "IPv4").address;
    }
}catch(error){
    console.log(error)
}
module.exports = {host: `http://${IP_ADRESS || "localhost"}:${PORT}`, PORT};