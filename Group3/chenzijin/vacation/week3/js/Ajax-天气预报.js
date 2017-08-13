$(function(){
    var json = new Array();
    $.get("http://weixin.jirengu.com/weather")
        .done(function(data){
       $.each(data,function(i,n){
           if(i == "weather"){
               $.each(n,function(i,next){
                   $.each(next,function(i,future){
                       if(i == "future"){
                           json = future;
                       }
                   });
               });
           }
       });
    }).done(function(){
        $.each(json,function(i,n){//i表示在data中的索引位置，n表示包含的信息的对象
            var oUl = "<div class='day'>";
            oUl += "<img src='http://weixin.jirengu.com/images/weather/code/"+ n["code1"] +".png'/>";
            oUl += "<img src='http://weixin.jirengu.com/images/weather/code/" + n["code2"] + ".png'/>";
            oUl += "<p>时间：" + n["day"] + "</p>";
            oUl += "<p>日期：" + n["date"] + "</p>";
            oUl += "<p>天气情况：" + n["text"] + "</p>";
            oUl += "<p>最高温度：" + n["high"] + "</p>";
            oUl += "<p>最低温度：" + n["low"] + "</p>";
            oUl += "<p>" + n["wind"] + "</p>";
            oUl = oUl + "</div>";
            $("#resText").append(oUl);
        });
    }).done(function(){
        var olist = $(".day");//获取div
        var iDay = 0;//作为控制这是第几天
        $("#next").click(function(){
            if(iDay!=(olist.length - 1)){
                $(".day").eq(iDay++).slideUp(400);
            }
        });
        $("#up").click(function(){
            if(iDay != 0){
                $(".day").eq(--iDay).slideDown(400);
            }
        });
    });
});

