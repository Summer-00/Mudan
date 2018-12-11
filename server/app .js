const express=require("express");
const userRouter=require('./routes/user.js');
const bodyParser=require('body-parser');
const  imgRouter=require('./routes/img.js');
const getapiRouter=require('./routes/getapi.js');
const cors=require("cors");


var app=express();
app.listen(4000);

app.use(cors({
    origin:["http://127.0.0.1:8081",
                "http://localhost:8081",
                "http://localhost:4000",
                "http://localhost:63342",
                "http://localhost:5500"
    ],
                credentials:true
}));
app.use(bodyParser.urlencoded({
    extended:false //
}));

app.use(express.static('public'));//托管
app.use('/user',userRouter);//路由器挂在到/user下
app.use('/img',imgRouter);
app.use('/getapi',getapiRouter);