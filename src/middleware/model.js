const path = require("path");
const fs = require("fs")
const model = (req, res, next) => {
    req.getData = function(fileName){
        let data = fs.readFileSync(path.join(process.cwd(), "database", `${fileName}.json`), "UTF-8"); 
        data = data ? JSON.parse(data) : [];
        return data
    }
    req.writeData = function(fileName, data) {
        fs.writeFileSync(path.join(process.cwd(), "database", `${fileName}.json`), JSON.stringify(data, null, 4))
        return true
    }
    return next();
}
module.exports = { model }; 