/**
 * Created by web on 2018/11/17.
 */
 jQuery.fn.my_slider =function(time1,time2){
     $("<link rel='stylesheet' href='css/my_slider.css'/>").appendTo("head");

     $("<ul></ul>").appendTo(".my_slider").addClass("point");
     var imgs=$(".my_slider .box>ul>li");
     var sliders=$(".my_slider");
     var width=sliders.width();
     var img=$(".my_slider .box ul li img");
     var i=0;
     $(".my_slider .box ul").width(width*imgs.length);
     $(".my_slider .box ul li").width(width);
     img.width("100%");


     sliders
         .on("mouseenter",function(){
            clearInterval(timer);
            $(".my_slider>ul").addClass("point_end");
        })
         .on("mouseleave",function(){
        slider();
            $(".my_slider>ul").removeClass("point_end");
        })
         .height(img.height());


     for(var j=0;j<imgs.length-1;j++ ){
         $("<li></li>").appendTo(".my_slider>ul:last-child").addClass("point_list")
     }

     var timer="";
     $(".my_slider>ul>li").eq(0).addClass("point_select").siblings().removeClass("point_select");


     function slider(){
         clearInterval(timer);
         timer=setInterval(function(){

             if (i<imgs.length-1)
                 $(".my_slider>ul>li").eq(i+1).addClass("point_select").siblings().removeClass("point_select");

             if(i<imgs.length+1)
                 imgs.eq(i+1).css({"width":"0","opacity":"0"});
             imgs.eq(i).animate({
                     width:0,
                     opacity:0
                 },
                 time1
                 ,function(){
                     i++;
                     if(i==imgs.length-1){
                         imgs.css({"width":width,"opacity":"1"});
                         i=0;
                     }
                 });
             imgs.eq(i+1).animate({
                     width:width,
                     opacity:1
                 }
                 ,time1);
             if (i==imgs.length-1)
             $(".my_slider>ul>li").eq(0).addClass("point_select").siblings().removeClass("point_select");
         },time2);



     }
     slider();


     $(".my_slider>ul>li").click(function(){
         if(i!==$(this).index()){
             imgs.eq(i).siblings().css({"width":"0","opacity":"0"});

             imgs.eq(i).animate({
                 width:0,
                 opacity:0
             },time1);
             $(".my_slider>ul").hide();

             i=$(this).index();

             $(".my_slider>ul>li").eq(i).addClass("point_select").siblings().removeClass("point_select");
             imgs.eq(i).animate({
                 width:width,
                 opacity:1
             },
                 time1,
             function(){
                 $(".my_slider>ul").show()
             }
             );
        }

     });

};