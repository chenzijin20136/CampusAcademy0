//先为每一个required添加必填的标记，用each()方法来实现
//如果是必填的，则加红星标识
$("input.required").each(function(){//在each()方法中先是创建一个元素。然后通过append()方法将创建的元素加入到父元素后面
    var $required = $("<strong class='high'>*</strong>");//创建元素
    $(this).parent().append($required);//然后将它追加到文档中
});
//文本框失去焦点后
$("input").blur(function(){
    var $parent = $(this).parent();
    $parent.find(".formtips").remove();//删除以前的提醒元素
    //验证用户名
    if($(this).is("#username")){
        if(this.value == "" || this.value.length < 6){
            var errorMsg = "请输入至少6位的用户名";
            $parent.append("<span class='formtips onError'>" + errorMsg + "</span>");
        }else{
            var okMsg = "输入正确";
            $parent.append("<span class='formtips onSuccess'>" + okMsg + "</span>");
        }
    }
    
    //验证邮箱
    if($(this).is("#email")){
        if(this.value == "" || (this.value != "" && !/.+@.+\.[a-zA-z]{2,4}$/.test(this.value))){
            var errorMsg = "请输入正确的E-mail地址";
            $parent.append("<span class='formtips onError'>" + errorMsg + "</span>");
        }else{
            var okMsg = "输入正确";
            $parent.append("<span class='formtips onSuccess'>" + okMsg + "</span>");
        }
    }

    //验证密码
    if($(this).is("#passwordFirst")){
        if(this.value == "" || this.value.length < 6){
            var errorMsg = "输入的密码至少为6位";
            $parent.append("<span class='formtips onError'>" + errorMsg + "</span>");
    }else{
            var okMsg = "输入正确";
            $parent.append("<span class='formtips onSuccess'>" + okMsg + "</span>");
        }
    }
    //验证再次输入密码
    if($(this).is("#passwordSecond")){
        if($("#passwordFirst").val() == $(this).val() && this.value != ""){
            var okMsg = "输入正确";
            $parent.append("<span class='formtips onSuccess'>" + okMsg + "</span>");
        }else{
            var errorMsg = "两次输入的密码不一致";
            $parent.append("<span class='formtips onError'>" + errorMsg + "</span>");
        }
    }

    //验证手机号码
    if($(this).is("#phone")){
        if(this.value.length != 11 || /[^0-9]/.test(this.value)){
            var errorMsg = "输入的电话号码至少为11位";
            $parent.append("<span class='formtips onError'>" + errorMsg + "</span>");
        }else{
            var okMsg = "输入正确";
            $parent.append("<span class='formtips onSuccess'>" + okMsg + "</span>");
        }
    }

}).keyup(function(){//在用户每次松开按键时触发
    $(this).triggerHandler("blur");//triggerHandler("blur")只会触发为元素绑定的blur事件，而不触发浏览器默认的blur事件
}).focus(function(){//在元素得到焦点时触发
    $(this).triggerHandler("blur");
});


//文本框聚焦时
$("input").focus(function(){
    $(this).val("");
    if($(this).is("#passwordFirst")){
        this.type = "password";
    }
    if($(this).is("#passwordSecond")){
        this.type = "password";
    }
});

//密码失去焦点时
$("#passwordFirst").blur(function(){
    $(this).value="输入密码";
});

//提交表单，验证
$("#submit").click(function(){
    $(".required:input").trigger("blur");//用trigger()方法来触发blur事件，从而验证
    var numError = $(".onError").length;//长度为0，则为true，表单信息无误，可以提交成功
    if(numError){//如果length不为0，则有错
        return false;
    }
    alert("恭喜你，已经注册成功！！！");
});

//重置
$("#send").click(function(){
   $(".formtips").remove();
    $(".onError").remove();
});