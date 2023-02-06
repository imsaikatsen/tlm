const express = require("express");

const app = express();
app.use(express.json());

//application routes
app.use(require('./routers/router'))

app.listen(3000, () => {
    console.log("app listening at port 3000");
});