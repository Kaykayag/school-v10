require('dotenv').config();
const port = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const students = require("./db/students");

const app = express();
app.use(cors());
app.use(express.urlencoded({'extended':false}));
app.use(express.json());


app.use("/students",students)


app.get("/",(req,res)=>{
	return res.json({'message':'hello world'});
});
const host = '127.0.0.1';
const server = app.listen(port, host, () => {
    console.log(`listening at http://localhost:${port}`);
});