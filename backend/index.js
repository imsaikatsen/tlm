const express = require("express");
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

//application routes
app.use(require('./routers/router'))

app.listen(3000, () => {
    console.log("app listening at port 3000");
});