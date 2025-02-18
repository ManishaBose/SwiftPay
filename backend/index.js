const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Hello World!"
    })
})

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})