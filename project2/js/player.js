$(function () {
    var id=location.search.slice(4);
    var video=$(".video-player video");
    //console.log(id);
   $.ajax({
       url:"http://47.99.68.83:3000/user/player",
       type:"get",
       data:"id="+id,
       dataType:"json",
       success(res){
           console.log(res);

           //$(".video-header .text-info ").html(res[0].title);
          var header=$(".video-header");
           var html=`<div class="video-header">
           <h4 class="text-info">${res[0].title}</h4>
           <div class="row">
           <div class="col-md-10">
           <div class="mt-2"><span class="text-info">投稿时间：</span><time class="small text-lowercase">${res[0].des_c}</time>
            <a class="btn btn-sm btn-danger  p-1 small text-light" href="javascript:;">稿件投诉</a></div>
            <div class="mt-2 mb-2">
            <b style="color:#00AEEF">播放量:${res[0].player_times}</b> <b class="ml-2" style="color:#6610f2">弹幕数量:${res[0].barrage_}</b> <a  class=" ml-2 text-muted" href="">点赞${res[0].fabulous}</a> <a class="text-muted ml-2" href="">收藏</a>
            </div>

           </div>
           <div class="col-md-2">
           <div><a class="text-muted" href="">up主：${res[0].author}</a></div>
           <div>视频信息</div>
           </div>
           </div>
           </div>`;
           header.html(html);
           var video=$(".video-player video");
                video.attr("src",res[0].video_url);
       }


   });

    //加载弹幕
    //function load_barrage(){

        $.ajax({
            url:"http://47.99.68.83:3000/user/get_barrage",
            type:"get",
            data:"av="+id,
            dataType:"json",
            success(res){
                console.log(res);

                //for(var i=0;i<length.res;i++){
                //
                //
                //}
                //var i=0;
                for(let j=0;j<res.length;j++){
                    $("<p></p>").appendTo($(".barrage")).html(res[j].barrage);
                }

                //监听播放,打印弹幕
                var cav=$(".video-player canvas").get(0);//jq对象转换为js对象
                   var ctx=cav.getContext('2d');
                //方法1逐条加载
                    //console.log(cav.style.width);
                //画笔
                //    var line=0;
                //    video.get(0).addEventListener("timeupdate",function(){
                //    //console.log("当前播放时间："+video.get(0).currentTime);
                //

                //
                //
                //    for(let i =0;i<res.length;i++){
                //
                //        if(video_time>res[i].v_time){
                //
                //            res[i].v_time=2000000000000000;
                //            ctx.font="23px sans-serif";
                //            ctx.textBaseline="top";
                //
                //            let j=0;
                //            function barrage_load (h){
                //
                //                var timmer=setInterval(function(){
                //
                //                    ctx.fillStyle =res[i].text_color;
                //                    ctx.shadowOffsetX = 3; // 阴影Y轴偏移
                //                    ctx.shadowOffsetY = 3; // 阴影X轴偏移
                //                    ctx.shadowBlur = 3; // 模糊尺寸
                //                    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // 颜色
                //                    ctx.clearRect(920-j+3,30+45*h,ctx.measureText(res[i].barrage).width+5,42);
                //                    ctx.fillText(res[i].barrage,920-j,35+45*h);
                //                    j++;
                //                    if (j==920+ctx.measureText(res[i].barrage).width){
                //                        clearInterval(timmer);
                //                        //j="";
                //                    }
                //                    //console.log(1);
                //
                //                },10);
                //                video.get(0).addEventListener('pause',function(){
                //                    clearInterval(timmer);
                //
                //                });
                //                video.get(0).addEventListener('play',function(){
                //                barrage_load (h);
                //                });
                //
                //
                //            }
                //            barrage_load (line);
                //            console.log(line);
                //            line+=1;
                //
                //            if(line==8)line=1;
                //
                //        }
                //    }
                //
                //
                //
                //
                //
                //})
                //var video_time="";

                //方法2 一起加载
                var arr = new Array(res.length);
                var arr2=new Array(res.length)
                for(var a = 0; a<res.length; a++){
                    arr[a] = 0;
                    arr2[a]=0;
                }
                var barrage_h=1;
                //console.log("setarr");
                        var timer="";

                function barrage_load(){


                    timer=setInterval(function(){
                        ctx.clearRect(0,0,920,517);


                        for(let i =0;i<res.length;i++){

                            if(video.get(0).currentTime>res[i].v_time)
                            {
                                if(arr[i]==0){

                                    arr2[i]=barrage_h;
                                    barrage_h++;
                                    if(barrage_h==8){barrage_h=1}
                                }
                                //res[i].v_time=2000000000000000;

                                ctx.font="23px sans-serif";
                                ctx.textBaseline="top";
                                ctx.fillStyle =res[i].text_color;
                                ctx.shadowOffsetX = 3; // 阴影Y轴偏移
                                ctx.shadowOffsetY = 3; // 阴影X轴偏移
                                ctx.shadowBlur = 3; // 模糊尺寸
                                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // 颜色
                                ctx.fillText(res[i].barrage,920-arr[i],35*arr2[i]);
                                if(barrage_h==10){
                                    barrage_h=0
                            }

                                arr[i]++;
                                if(arr[i]>920+ctx.measureText(res[i].barrage).width)
                                {res[i].v_time=2000000000000000}
                                console.log(arr,arr2);
                            }
                        }



                    },10);
                }




                video.get(0).addEventListener('pause',function(){
                                      clearInterval(timer);

                                   });
                video.get(0).addEventListener('play',function(){
                                  barrage_load ();
                                   });

            }});



    //弹幕颜色

    var barrage_color="rgb(255, 255, 255)";

    $(".barrage-input>a").eq(0).click(function(e){
        e.preventDefault();
        console.log(1);
        $(".barrage-input>div").show()
    });

    $(".barrage-input>div>div").on("click",function(){
        $(".barrage-input>div").hide();
        barrage_color=$(this).css('background-color');
        $(".barrage-input>a").eq(0).css("background-color",barrage_color);

        console.log(barrage_color)

    });



    //发射弹幕,存入数据库
    $(".barrage-input").on("click","button", function (e) {

        var inp=$(".barrage-input input");
        var Reg=/^(?!(\s+$))/;
        if (!Reg.test(inp.val())||inp.val()==""){
            return
        }
        var day=new Date();
        var v_time=$(".video-player video").get(0).currentTime;
        console.log(v_time);




        $.ajax({
            url:"http://47.99.68.83:3000/user/input_barrage",
            type:"post",
            data:{"av":id,
                "barrage":inp.val(),
                "c_time":day.toLocaleString('chinese', { hour12: false }),
                "user_name":"Tourist",
                v_time:v_time,
                text_color:barrage_color
            },
            success(res){
                console.log(res)
            }
        });



        //添加弹幕及弹幕移动
        $("<span></span>").appendTo($(".barrage_body>div").eq(0))
            .html(inp.val()).addClass("barrage-start").css("color",barrage_color);
        setTimeout(function () {
            var span=$(".barrage_body>div>span");
            span.addClass("barrage-move");
            setTimeout(function () {
                span.remove();
            },10000)

        },500);
        $("<p></p>").appendTo($(".barrage")).html(inp.val());
        inp.val("");

    });

    //监听回车

    $(document).keyup(function(event){
        if(event.keyCode ==13){
            $(".barrage-input button").click();
        }
    });

    //播放控件

    var player=$(".video-player .player-button");

    $(".video-player").mouseenter(function () {
        player.show(500)
    }).mouseleave(function () {
        player.hide(500)
    });
    var pt=0;
    player.click(function () {

        if(video.get(0).paused){
            video.get(0).play();
            player.hide(500).html("Stop");
            pt++;
        }else{
            video.get(0).pause();
            player.html("Play");
            pt++;

        }
            //console.log(pt);
        if(pt==1){
         $.ajax({
             url:"http://47.99.68.83:3000/user/play_times",
             type:"post",
             data:{av:id},
             dataType:"json",
             success(res){
             console.log(res);}
         })

        }
    })






})