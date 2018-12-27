/**
 * Created by web on 2018/11/20.
 */
$(function(){
    $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");


    $.ajax({
        url:"./header.html",
        type:"get",
        success:function(res){

            $(res).replaceAll("header");
            $.ajax({
                url:"http://47.99.68.83:3000/user/session",
                xhrFields:{withCredentials: true},
                crossDomain: true,
                type:"get",
                dataType:"json",
                success(res){
                    console.log(res);
                    if (res.username){
                        var html=`<span class="text-info">欢迎, <b class="text-danger">${res.username}</b></span>`
                        $("header .user").html(html);
                    }

                }
            });
            //if ($(".slider")){
            //    $(".top").addClass("top_index").height($(window).height()*0.95);
            //    $(".top .container").addClass("top_index_search");
            //}

        }


    });


});