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
            //if ($(".slider")){
            //    $(".top").addClass("top_index").height($(window).height()*0.95);
            //    $(".top .container").addClass("top_index_search");
            //}

        }


    });


});