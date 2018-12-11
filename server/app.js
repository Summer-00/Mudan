const express=require("express");
const session = require('express-session');
const cookieParser=require('cookie-parser');
const userRouter=require('./routes/user.js');
const bodyParser=require('body-parser');
const  imgRouter=require('./routes/img.js');
const getapiRouter=require('./routes/getapi.js');
const cors=require("cors");



var app=express();

app.listen(4000);


app.use(cookieParser('sessiontest'));
app.use(session({
    secret: 'sessiontest',
    resave: true,
    saveUninitialized: true,
    cookie : {
        maxAge : 1000 * 60 * 3 // 设置 session 的有效时间，单位毫秒
    }
}));

app.use(cors({
    origin:[
                "http://localhost:63342",
                "http://127.0.0.1:8080",
                "http://127.0.0.1:5500"

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