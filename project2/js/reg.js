/**
 * Created by web on 2018/11/20.
 */
$(function () {

    $("form input[type='checkbox']").change(function(){
        console.log();
       if ($(this).is(":checked"))
           $("form button").removeAttr('disabled');

        else
           $("form button").attr('disabled',"true");
    });

    var exp1=/^1[3-9][0-9]{9}$/;
    var exp2=/^[a-zA-Z0-9]{6,16}$/;
    function vail(val,exp,span,text){
        if(!exp.test(val)){
            span.html(text).addClass("reg_err");
            return false
        }
        else
        span.html("").removeClass("reg_err");
        return true
    }

    $("form input[name='uid']").on("blur",function
        (){
       
       if(vail($(this).val(),exp1,$(this).next().children(),"请输入正确手机号")) {
           $.ajax({
               url:"http://47.99.68.83:3000/user/uid",
               type:"post",
               data:{"uid":$("form input[name='uid']").val()},
               dataType:"json",
               success:function(res){

                   console.log(res[1]);
                   if (res.Fail==1){
                       $("form input[name='uid']").next().children().html("该手机号已注册").addClass("reg_err")
                   }else{
                       $("form input[name='uid']").next().children().html("").removeClass("reg_err")
                   }
               }
           })
       }
    });

    $("form input[name='username']").on("blur",function
        (){
        
        if(vail($(this).val(),exp2,$(this).next().children(),"用户名格式错误，6-16位数字字母")) {
            $.ajax({
                url:"http://47.99.68.83:3000/user/username",
                type:"post",
                data:{"username":$("form input[name='username']").val()},
                dataType:"json",
                success:function(res){
 
                    console.log(res[1]);
                    if (res.Fail==1){
                        $("form input[name='username']").next().children().html("该id已被使用").addClass("reg_err")
                    }else{
                        $("form input[name='username']").next().children().html("").removeClass("reg_err")
                    }
                }
            })
        }
        
    });

    $("form input[name='password']").on("blur",function
        (){
        console.log($(this).next().children());
        vail($(this).val(),exp2,$(this).next().children(),"密码格式错误，6-16位数字字母")
    });

    $("form input[type='password']").eq(1).on("blur",function
        (){
        console.log(1);
       if ($(this).val()!==$("form input[name='password").val()){
           $(this).next().children().html("两次密码不一致").addClass("reg_err")
       }else{
           $(this).next().children().html("").removeClass("reg_err")

       }
    });


        $("form").on("click","button",function (e) {
            e.stopPropagation();

           var span=$("form div>span");
           if ((span.eq(0).html()==""&&span.eq(1).html()=="")&&(span.eq(2).html()==""&&span.eq(3).html()=="")){

               $.ajax({
                   url:"http://localhost:4000/user/reg",
                   type:"post",
                   data:{uid:$("form input[name='uid']").val(),
                       username:$("form input[name='username']").val(),
                        password:$("form input[name='password']").val()},
                   dataType:"json",
                   success(res){
                       if (res.ok){
                           window.location.href="./login.html"
                       }
                   }

               });




           }



           //if ($("form div>span").html()==""){

               //
           //}
        })




});