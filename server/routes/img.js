/**
 * Created by web on 2018/11/12.
 */
const express=require('express');
var router=express.Router();

var fs=require('fs');
var getFiles={

    getFileList:function(path){
        var filesList=[];
        readFileList(path,filesList);
        return filesList;
    }

};
function readFileList(path,filesList){

    var files=fs.readdirSync(path);
    files.forEach(function(itm,index){
        var stat=fs.statSync(path+itm);
        if(stat.isDirectory()){
            readFileList(path+itm,filesList)
        }else{
            var obj={};
            obj.path=path;
            obj.filename=itm;
            filesList.push(obj);
        }
    })
}


//请求图片路径
router.get('/smimage', function (req,res) {

    var imgitem1=getFiles.getFileList("./public/img/180x100/");


    res.send(imgitem1);
});

router.get('/bgimage', function (req,res) {





    var imgitem2=getFiles.getFileList("./public/img/320x180/");


    res.send(imgitem2);
});

router.get('/amimage', function (req,res) {

    var imgitem3=getFiles.getFileList("./public/img/160x214/");


    res.send(imgitem3);
});




module.exports=router;




