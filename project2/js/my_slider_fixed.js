/**
 * Created by web on 2018/11/20.
 */
var css=document.createElement("link");
 css.href="css/my_slider_fixed.css";
css.rel="stylesheet";
document.head.appendChild(css);


var img=document.querySelectorAll(".my_slider .box ul li");
var ul=document.querySelector(".my_slider .box .ul");
var wd=document.querySelector(".my_slider").style.width;
    ul.style.width=wd*img.length;
 for (var i of img){
     i.style.width=wd;
 }

