'use strict';
 
const http = require('https');
const url = require('url');
const express=require('express');
var router=express.Router();
 
var biliUrl = `https://bangumi.bilibili.com/web_api/timeline_global`;

var biliCnUrl='https://bangumi.bilibili.com/api/timeline_v2_cn';
var biliTime="";
 
;
var api="111";

router.get("/bilibiliapi",function(req,result){
http.get(biliCnUrl,(res) => {
    var data = '';  //接口数据
 
    res.on('data', (chunk) => {
        data += chunk;    //拼接数据块
    });
    res.on('end', function() {

        let json = JSON.parse(data); //解析json
        api=json;
        result.send(api);
        //console.log(json.result);  //打印json
    })
}).on('error', () => 
    console.log('获取数据出错!')
);


});
module.exports=router;