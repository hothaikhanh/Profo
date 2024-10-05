const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";

app.use(express.static("./dist"));
app.use(cors());

app.listen(PORT, HOST, () => {
    console.log(`Server Works !!! At port ${PORT}`);
});
