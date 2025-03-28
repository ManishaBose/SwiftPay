const express = require('express');
const cors = require('cors');
const mainRouter = require("./routes/index");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter)

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})