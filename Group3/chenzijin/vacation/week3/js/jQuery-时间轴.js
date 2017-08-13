$(".main .year h2 a").click(function (e) {
    e.preventDefault();//取消事件的默认行为
    //$(this).parents(".year").toggleClass("close");//该方法检查每个元素中指定的类。如果不存在则添加类，如果已设置则删除之。这就是所谓的切换效果。
    if(!$(this).find("i").hasClass("close")){
        $(this).find("i").addClass("close");
    }else{
        $(this).find("i").removeClass("close");
    }
    $(this).parents(".year").find(".list").slideToggle(400);
});
$("#openclose").click(function(){
    $(".main .year h2 a").trigger('click');
});
