const express=require('express');
const pool=require('../pool.js');
var router=express.Router();

//添加路由

//用户名密码ajax 验证
router.post('/vail',function(req,res){
    console.log(req.body);
    pool.query("select * from user where uid=?",req.body.uid,function(err,result){

         if(err) throw err;

            console.log(result);
        if(result.length==0)
        {res.send({"Fail":1})}
        else{
  pool.query("select password from user where uid=?",req.body.uid,function(err,result){
            
            

            if(err) res.send("err");

            if(result[0].password==req.body.password){
                console.log(req.body.password);
                console.log(result[0].password);
                res.send({"OK":0})
            }
            else{
                res.send({"Fail":2})
            }
        })
        }
      

    });


    
});

//ajax注册验证验证
router.post('/uid',function(req,res){
    console.log(req.body.uid);
    pool.query('select*from user  where uid=?',req.body.uid,function (err,result){
        if(err) throw  err;
    	if(result.length>0){
            res.send({"Fail":1});
          }else{
            res.send({"OK":0});
          }
    })
    


});
router.post('/username',function(req,res){
    console.log(req.body.username);
    pool.query('select*from user  where username=?',req.body.username,function (err,result){
        if(err) throw  err;
    	if(result.length>0){
            res.send({"Fail":1});
          }else{
            res.send({"OK":0});
          }
    })
    


});

//form提交 数据存入数据库
router.post('/reg',function(req,res){

    console.log(req,res);
    pool.query("insert into user set ?",req.body,function(err,result){
        if(err) throw err;
        else res.send({ok:1});



    })
});

//form提交 登陆
router.post('/login',function(req,res){
    res.user.
    res.send("登录成功！")
});

//随机获取四个 推荐内容
router.get("/recommend",function(req,res){
    pool.query("SELECT * FROM recommend ORDER BY RAND() LIMIT 4",function(err,result){
        if(err) throw err;
        else res.send(result);



    })
});
//随机获取9个 娱乐
router.get("/entertainment",function(req,res){
    pool.query("SELECT * FROM recommend ORDER BY RAND() LIMIT 9",function(err,result){
        if(err) throw err;
        else res.send(result);



    })
});
//剩下的都一样 随机获取10个
router.get("/movie",function(req,res){
    pool.query("SELECT * FROM recommend ORDER BY RAND() LIMIT 10",function(err,result){
        if(err) throw err;
        else res.send(result);



    })
});

//播放界面 信息
router.get('/player',(req,res)=> {
    var sql="SELECT * FROM player WHERE id=?";
    pool.query(sql,req.query.id,(err,result)=>{
        if(err) throw err;
        res.send(result);
        //console.log(result);
        //
        //result=JSON.stringify(result);
        //result = JSON.parse(result);
        //var times=parseInt(result[0].player_times);
        //    times++;

        //pool.query("UPDATE `player` SET `player_times` = ? WHERE `player`.`id` = ?",[times,req.query.id],(err,result)=>{
        //    if(err) throw err;
        //    console.log("ok");
        //
        //})

    });
});

//排行
router.get("/rank",function(req,res){
    pool.query("SELECT id,fabulous,imgurl,author,title  FROM player ORDER BY fabulous desc limit 10",function(err,result) {
        if (err) throw err;
        //console.log(result[0].id);

            res.send(result);
    })});

//弹幕
router.get("/get_barrage",(req,res)=>{
   var sql="SELECT * FROM barrage WHERE av=?";
    pool.query(sql,req.query.av,(err,result)=>{
        if(err) throw err;
        else res.send(result);
    })
});

//添加弹幕
router.post("/input_barrage",(req,res)=>{
    var sql="INSERT INTO barrage SET ?";
        pool.query(sql,req.body,(err,result)=>{
            if(err)throw err;
            else{
                //res.send({"OK":0});

                pool.query("SELECT COUNT(id) AS c FROM `barrage` WHERE av=?",[req.body.av],(err,result)=>{


                    if(err) throw  err;
                    else{
                        result=JSON.stringify(result);
                        result = JSON.parse(result);
                        var length=parseInt(result[0].c);

                        pool.query("UPDATE `player` SET `barrage_` = ? WHERE `player`.`id` = ?",
                                    [length,req.body.av],(err,result)=>{

                                if(err) throw  err;
                                else{
                                    res.send({"OK":0})
                                }
                            })
                    }
                })
            }
        })

});

//播放+1
router.post('/play_times',(req,res)=> {
    var sql = "SELECT * FROM player WHERE id=?";
    pool.query(sql,req.body.av, (err,result)=> {
        if (err) throw err;
        console.log(result);
        result = JSON.stringify(result);
        result = JSON.parse(result);
        var times = parseInt(result[0].player_times);
        //var times=0;
        times++;

        pool.query("UPDATE `player` SET `player_times` = ? WHERE `player`.`id` = ?", [times, req.body.av], (err, result)=> {
            if (err) throw err;
            console.log("ok");
            res.send({ok:1});

        })

    });
});


// select comment

//app.get("/getcomment",(req,res)=>{
//    //1:获取参数
//    var pno = req.query.pno;  //页码
//    var pageSize = req.query.pageSize;//页大小
//    var av = req.query.av; //av号
//    //2:设置默认值 1 7
//    if(!pno){pno = 1}
//    if(!pageSize){pageSize=10}
//    //3:创建正则表达式验证用户输入验证
//    var reg = /^[0-9]{1,3}$/;
//    //4:如果错出停止函数运行
//    if(!reg.test(pno)){
//        res.send({code:-1,msg:"页编格式不正确"});
//        return;
//    }
//    if(!reg.test(pageSize)){
//        res.send({code:-2,msg:"页大小格式不正确"});
//        return;
//    }
//
//    var progress = 0;
//    var obj = {code:1};
//    //5:创建sql1 查询总记录数   严格区分大小写
//    var sql = "SELECT count(id) AS c FROM comment WHERE av = ?";
//    av = parseInt(av);
//    pool.query(sql,[av],(err,result)=>{
//        if(err)throw err;
//        var pageCount = Math.ceil(result[0].c/pageSize);
//        progress+=50;
//        obj.pageCount = pageCount;
//        if(progress==100){
//            res.send(obj);
//        }
//    });
//    //6:创建sql2 查询当前页内容 严格区分大小写
//    var sql =" SELECT id,user_name,ctime,";
//    sql+=" content";
//    sql+=" FROM xz_comment";
//    sql+=" WHERE nid = ?";
//    sql+=" LIMIT ?,?";
//    var offset = parseInt((pno-1)*pageSize);
//    pageSize = parseInt(pageSize);
//    pool.query(sql,[nid,offset,pageSize],(err,result)=>{
//        if(err)throw err;
//        progress+=50;
//        obj.data=result;
//        if(progress==100){
//            res.send(obj);
//        }
//    })
//});

//导出路由
module.exports=router;
