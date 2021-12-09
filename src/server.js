const connect = require("./config/db");

const app = require(".");

app.listen(2500, async() => {
    console.log("listening port 2500");
    await connect();
});