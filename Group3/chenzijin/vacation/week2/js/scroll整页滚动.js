/**
 * Created by hp-pc on 2017/8/8.
 */
var oH1 = document.getElementsByTagName("h1"),
    oToTop = document.getElementById("toTop");

var aColor = ["#FFCFDF","#FEFDCA","#E0F9B5","#A5DEE5","#F4FA9C","#F469A9","#BA53DE","#88BEF5","#FFDE7D","#F6416C","#E84A5F","#FF9999"];
for(var i=0;i<oH1.length;i++){
    oH1[i].style.height = document.documentElement.clientHeight + 'px';
    oH1[i].style.backgroundColor = aColor[i];
    oH1[i].style.lineHeight = document.documentElement.clientHeight/1.5 +'px';
}
var oWrap = document.getElementById('wrap');
oWrap.style.height = parseInt(oH1[0].style.height)*12+"px";

//跨浏览器的事件对象
var EventUtil = {
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on" + type,handler);
        }else{
            element["on" + type] = handler;
        }
    },
    removeHandler : function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on"+type,handler);
        }else{
            element["on"+type] =null;
        }
    },
    getEvent:function(event){
        return event ? event : window.event;
    },
    getTarget : function(event){
        return event.target || event.srcElement;
    },
    preventDefault : function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    getWheelDelta : function(event){
        if(event.wheelDelta){
            return event.wheelDelta;//谷歌IE
        }else{
            return -event.detail * 40;//FF
        }
    }
};

EventUtil.addHandler(window,"load",function(){
    var oWrap = document.getElementById("wrap");
    EventUtil.addHandler(oWrap,"mousewheel",function(event){
        event = EventUtil.getEvent(event);
        EventUtil.preventDefault(event);
        if(EventUtil.getWheelDelta(event) > 0){
            goTop();
        }else{
            goBottom();
        }
    });
});

function goTop(){
    var oWrap = document.getElementById("wrap");
    var timer = null;
    var jl = 0;
    var iDv = parseInt(parseInt(oWrap.style.height) / 12);
    timer = setInterval(function() {
        if (jl < iDv - 6) {
            jl += 6;
            window.scrollBy(0, -6);
        } else {
            window.scrollBy(0, jl - iDv);
            clearInterval(timer);
        }
    }, 5);
}
function goBottom() {
    var oWrap = document.getElementById("wrap");
    var timer = null;
    var jl = 0;
    var iDv = parseInt(parseInt(oWrap.style.height) / 12);
    timer = setInterval(function() {
        if (jl < iDv - 6) {
            jl += 6;
            window.scrollBy(0, 6);
        } else {
            window.scrollBy(0, iDv - jl);
            clearInterval(timer);
        }
    }, 5);
}
function goToTop() {
    var oWrap = document.getElementById("wrap");
    var timer = null;
    var jl = 0;
    var iDv = parseInt(parseInt(oWrap.style.height)/ 12*11);
    timer = setInterval(function() {
        if (jl < iDv - 30) {
            jl += 30;
            window.scrollBy(0, -30);
        } else {
            window.scrollBy(0, jl - iDv);
            clearInterval(timer);
        }
    }, 5);
}
oToTop.onclick = goToTop;