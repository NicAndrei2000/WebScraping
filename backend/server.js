const express=require('express');
const cors=require('cors');
const router = require('./route');

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
let port=8080;

app.use("/api",router);
app.listen(port,()=>{
    console.log("Serverul merge pe portul "+port);
})