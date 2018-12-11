/**
 * Created by web on 2018/11/20.
 */
$(function () {

    var span=$("form span");

        var uid=$("input[name='uid']");
        var password=$("input[name='password']");

        var exp1=/1[1-8][0-9]{9}/;
        var exp2=/^[a-zA-Z0-9]{6,16}$/;
        function vail(val,exp,span,text){
            if(!exp.test(val)){
                span.html(text).addClass("login_err");
                return false
            }
            else
            span.html("").removeClass("login_err");
            return true
        }



    uid.on("blur",function () {
           vail(uid.val(),exp1,span.eq(1),"请输入正确手机号");
           console.log(1);
            });
    password.on("blur",function () {
        vail(password.val(),exp2,span.eq(2),"密码格式错误6-12位数字字母");
    });

    $("form button").on("click", function () {
        if(span.eq(1).html()==""&&span.eq(2).html()==""){

               $.ajax({
                url:"http://127.0.0.1:4000/user/vail",
                type:"post",
                data:{"uid":uid.val(),"password":password.val()},
                dataType:"json",
                success:function(res){
                    console.log(res);
                    if(res.OK==0){
                        $("form").submit(
                            window.location.href="./index.html"
                            //window.location.replace("http://localhost:4000/index.html")
                        );

                    }
                    else{
                        span.eq(0).html("用户名或密码错误").addClass("login_err");
                    }
                }
           })
        }
           
    });
});






