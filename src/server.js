const express = require("express");
const { host, PORT } = require("./lib/network.js");
const { authRouter } = require("./router/auth.js");
const { model } = require("./middleware/model.js");
const {authToken} = require("./middleware/authToken.js");
const app = express();
app.use(express.json())

app.use(model);
app.use(authToken);

app.use("/auth", authRouter);

app.get("/users", (req, res) => {
    const users = req.getData("users");
    res.json(users).status(200)
})

app.listen(PORT, () => {
    console.log(`Server is running ${host}`);
});