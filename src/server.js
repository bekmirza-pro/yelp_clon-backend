const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require('../src/modules/routes')
    // require('./modules/prod')(app)

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)



const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});