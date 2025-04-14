const express = require("express");
const app = express();
const PORT = 3000;

const {handleProcess} = require('./receipts/process');
const {handlePoints} = require("./receipts/points");

app.use(express.json());
app.post("/receipts/process", handleProcess);
app.get(`/receipts/:id/points`, handlePoints);


app.listen(PORT, () => {console.log(`Connected to Port: ${PORT}`)});

