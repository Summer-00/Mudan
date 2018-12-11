/**
 * Created by SEELE on 2018/12/2.
 */

$(function(){
    var img=$(".my_slider img");
    var point=$(".box>ul:nth-child(2)>li") ;
    var i=1;
    function slider(){
        if (i==img.length-2){
            img.eq(i).removeClass().addClass("left");
            img.eq(i+1).removeClass().addClass("mid");
            img.eq(0).removeClass().addClass("right");
            img.eq(i-1).removeClass();

            point.eq(i).addClass("active").siblings().removeClass();
            i++

        }
        else if(i==img.length-1){
            img.eq(i).removeClass().addClass("left");
            img.eq(0).removeClass().addClass("mid");
            img.eq(1).removeClass().addClass("right");
            img.eq(i-1).removeClass();

            point.eq(i).addClass("active").siblings().removeClass();
            i=0;

        } else{

            img.eq(i).removeClass().addClass("left");
            img.eq(i+1).removeClass().addClass("mid");
            img.eq(i+2).removeClass().addClass("right");
            img.eq(i-1).removeClass();

            point.eq(i).addClass("active").siblings().removeClass();
            i++;
        }

    }

    var timer=setInterval(function () {
        slider();
    },3000);

    $(".box").mouseenter(function(){
        clearInterval(timer)
    }).mouseleave(function () {
        timer=setInterval(function () {
            slider();
        },2000);
    });

    point.hover(function () {
        $(this).addClass("active").siblings().removeClass();
        i=$(this).index();
        slider();

    })

});
//    $(".my_slider").my_slider(1500,2000)




