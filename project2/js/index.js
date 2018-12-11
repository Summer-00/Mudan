/**
 * Created by web on 2018/11/20.
 */
$(function(){

    //$(".my_slider").my_slider(1000,3000);

    //切换背景图片
    $(".top .background-view")
        .mouseleave(function(){$(this).removeClass("active") })
        .on("click","div",function(){
            console.log($(this).index());
            var bgArr=["./img/background/top_background.jpg",
                "./img/background/top_background2.jpg",
                "./img/background/top_background3.jpg"
            ];
            $("<style></style>").appendTo($("head"))
                .text(`.top_index{ background-image:url("${bgArr[$(this).index()]}")  } `);

            //$(".top_index").css("background-image",`url(${bgArr[$(this).index()]})`);
            $(this).parent().removeClass("active");
            //
        })
        .prev().click(function () {
        $(this).next().addClass("active")
    });






    //顶部导航初始状态
    var h=$(window).height()*0.9;
    $(".top_in").height(h);
    $(".top").height(h);
    $(".top_index_search").css("margin-top",h*0.4);



    //侧面导航栏 滚动、回到顶部
    //console.log($(".main_content").offset().top);
    //console.log($(window).scrollTop());
    var zoom=$(".main_content>div");
    var floot_list=$(".floot_list");
    for (var j=0;j<zoom.length;j++){
        floot_list.eq(j).on("click","li", function () {

            var index=$(this).index();
            console.log(zoom.eq(index).offset().top);

            //兼容性 google是html ;firefox是body
            $("body,html").animate({scrollTop:zoom.eq(index).offset().top-0.35*$(window).height()},400)
        })
    }
    $(".floot_list>a").click(function(){
        $("body,html").animate({scrollTop:h

    },300)});


    //滚动事件控制 侧边栏 顶部特效
    $(window).scroll(function () {
        //var zoom=$(".main_content>div");

        //侧边栏隐藏
        if ($(".recommend").offset().top-$(window).scrollTop()<=0){
            floot_list.show(500);
        }else {floot_list.hide(500)}

        //侧边栏楼层跟随
        for(var i=0;i<zoom.length;i++){

            if( zoom.eq(i).offset().top-$(window).scrollTop()<=0.4*$(window).height() ){
                $(".floot_list li").eq(i).addClass("light").siblings().removeClass("light");
            }
        }

        //顶部导航特效
        if($(window).scrollTop()<h-38){
            $(".top").height(h-$(window).scrollTop()).addClass("top_index");
            //console.log($(window).height()*0.9,$(window).scrollTop());
            $(".top .container .col-md-6").css("margin-top",$(".top").height()*0.4);

        }
        else{
            $(".top").height($(".top_index_search").height()).removeClass("top_index");
            $(".top .container .col-md-6").css("margin-top",0);

        }

    });

    //console.log(animated.eq(0));
     var data="";
    //获取bilibili动画更新时间表 api 加载
    $.ajax({
        url:"http://127.0.0.1:4000/getapi/bilibiliapi",
        type:"get",
        dataType:"json",
        success(res){
            var animated=$(".animated .row .col-md-10 .row .col-md-2");
            var animatedimg=$(".animated .row .col-md-10 .row .col-md-2 a div img");

            data=res.result;
            console.log(res.result);
            var arr=[];
            for(var i=0;i<res.result.length;i++)
            {

               if(res.result[i].weekday==-1){

                   arr.push(res.result[i]);

               }

            }

                for(var j=0;j<animated.length;j++){
                    animated.eq(j).children().eq(1).html(arr[j].title).addClass("animated_title")
                        .next().html("更新至"+arr[j].bgmcount +"集").addClass("animated_info");
                    animatedimg.eq(j).attr("src",arr[j].square_cover)
                }


        }
    } );
    //切换时间表
    $(".animated .row .col-md-10 ul").on("click","a",function(e){
      e.preventDefault();
        $(this).parent().addClass("selected").siblings().removeClass("selected");
        //console.log(data);
        var arr=[];
        var newnode=$(".animated .row .col-md-10 .row .col-md-2").eq(0).clone(true);
        //console.log(newnode);
        $(".animated .row .col-md-10 .row .col-md-2").remove();
        for(i in data ) {
            //console.log(i);
            if (data[i].weekday==$(this).parent().index()-1){
                arr.push(data[i]);
                //console.log(arr)
            }
        }
        console.log(arr);
        for (j in arr ){
            var newnode2=newnode.clone(true);
            newnode2.appendTo($(".animated .row .col-md-10 .row"))
                .children().eq(1).html(arr[j].title)
                .next().html("更新至"+arr[j].bgmcount +"集");
            $(".animated .row .col-md-10 .row .col-md-2 a div img").eq(j).attr("src",arr[j].square_cover)
        }
        //animated.parent().height(2*Number(animated.height().split("px")[0])+"px" ).css("overflow","visible")




    });
    //ajax获取内容，
    //推荐
    $.ajax({
        url:"http://127.0.0.1:4000/user/recommend",
        type:"get",
        dataType:"json",
        success(res){
            //console.log(res);

            var recommendsImg=$(".recommend .row .col-md-3 img");

            for (i in res){

                recommendsImg.eq(i).attr("src",res[i].imgurl);
                recommendsImg.eq(i).next().children().eq(0).html(res[i].des_c);
                recommendsImg.eq(i).next().children().eq(1).html(res[i].title.substring(0,15)+"...");
                recommendsImg.parent().eq(i).attr("href",`player.html?id=${res[i].id}`);
            }
        }});

    //排行
    $.ajax({
        url:"http://127.0.0.1:4000/user/rank",
        type:"get",
        dataType:"json",
        success(res){
            console.log(res);
            var Img=$(".p_list .media-body img");
            console.log(Img);
            for (var i=0;i<Img.length;i++){
                Img.eq(i).attr("src",res[i].imgurl).parent().attr("href",`player.html?id=${res[i].id}`);
                Img.parent().parent().next().eq(i).children().eq(0).html("点赞数："+res[i].fabulous)
               .next().html("up主："+res[i].author)

            }

            var html=`
                <div>排行</div>
                <ul>

                    <li>
                        <a  href="player.html?id=${res[0].id}">
                            <div class="media">
                                <div class="media-body">
                                    <img src=${res[0].imgurl} alt=""/>

                                </div>
                                <p class="text-info mt-3">${res[0].fabulous}个赞</p>

                            </div>
                            <p>1.${res[0].title.substring(0,10)}...</p>
                        </a>
                    </li>

                    <li>
                        <a href="player.html?id=${res[1].id}">
                           2.${res[1].title.substring(0,10)}...
                        </a>
                    </li>

                    <li>
                        <a href="player.html?id=${res[2].id}">
                            3.${res[2].title.substring(0,10)}...
                        </a>
                    </li>
                    <li>
                        <a href="player.html?id=${res[3].id}">
                           4.${res[3].title.substring(0,10)}...
                        </a>
                    </li>
                    <li>
                        <a href="player.html?id=${res[4].id}">
                            5.${res[4].title.substring(0,10)}...
                        </a>
                    </li>
                    <li>
                        <a href="player.html?id=${res[5].id}">
                           6.${res[5].title.substring(0,10)}...
                        </a>
                    </li>
                    <li>
                        <a href="player.html?id=${res[6].id}">
                           7.${res[6].title.substring(0,10)}...
                        </a>
                    </li>
                    <li>
                        <a href="player.html?id=${res[7].id}">
                            8.${res[7].title.substring(0,10)}...
                        </a>
                    </li>
                    <li>
                        <a href="player.html?id=${res[8].id}">
                           9.${res[8].title.substring(0,10)}...
                        </a>
                    </li>
                    <li>
                        <a href="player.html?id=${res[9].id}">
                            10.${res[9].title.substring(0,10)}...
                        </a>
                    </li>

                </ul>`;

            var rank_list=$(".main_content>div>.row>.col-md-2");
            rank_list.html(html);



        }
    });
    //娱乐
    $.ajax({
        url:"http://127.0.0.1:4000/user/entertainment",
        type:"get",
        dataType:"json",
        success(res){
            //console.log(res);

            var recommendsImg=$(".main_content .entertainment>.row .col-md-10 img");

            for (i in res){

                recommendsImg.eq(i).attr("src",res[i].imgurl);
                recommendsImg.parent().next().eq(i).html(res[i].title.substring(0,15)+"...");
                recommendsImg.parent().next().next().eq(i).html(res[i].des_c);
                recommendsImg.parent().parent().eq(i).attr("href",`player.html?id=${res[i].id}`);
            }
        }});
    //以下一样
    //电影
    $.ajax({
        url:"http://127.0.0.1:4000/user/movie",
        type:"get",
        dataType:"json",
        success(res){
            //console.log(res);

            var Img=$(".main_content .movie>.row .col-md-10 img");

            for (i in res){

                Img.eq(i).attr("src",res[i].imgurl);
                Img.parent().next().eq(i).html(res[i].title.substring(0,11)+"...");
                Img.parent().next().next().eq(i).html(res[i].des_c);
                Img.parent().parent().eq(i).attr("href",`player.html?id=${res[i].id}`);
            }
        }});
    //游戏
    $.ajax({
        url:"http://127.0.0.1:4000/user/movie",
        type:"get",
        dataType:"json",
        success(res){
            //console.log(res);

            var Img=$(".main_content .game>.row .col-md-10 img");

            for (i in res){

                Img.eq(i).attr("src",res[i].imgurl);
                Img.parent().next().eq(i).html(res[i].title.substring(0,11)+"...");
                Img.parent().next().next().eq(i).html(res[i].des_c);
                Img.parent().parent().eq(i).attr("href",`player.html?id=${res[i].id}`);
            }
        }});
    //音乐
    $.ajax({
        url:"http://127.0.0.1:4000/user/movie",
        type:"get",
        dataType:"json",
        success(res){
            //console.log(res);

            var Img=$(".main_content .music>.row .col-md-10 img");

            for (i in res){

                Img.eq(i).attr("src",res[i].imgurl);
                Img.parent().next().eq(i).html(res[i].title.substring(0,11)+"...");
                Img.parent().next().next().eq(i).html(res[i].des_c);
                Img.parent().parent().eq(i).attr("href",`player.html?id=${res[i].id}`);
            }
        }});
    //科学技术
    $.ajax({
        url:"http://127.0.0.1:4000/user/movie",
        type:"get",
        dataType:"json",
        success(res){
            //console.log(res);

            var Img=$(".main_content .technology>.row .col-md-10 img");

            for (i in res){

                Img.eq(i).attr("src",res[i].imgurl);
                Img.parent().next().eq(i).html(res[i].title.substring(0,11)+"...");
                Img.parent().next().next().eq(i).html(res[i].des_c);
                Img.parent().parent().eq(i).attr("href",`player.html?id=${res[i].id}`);
            }
        }});


});