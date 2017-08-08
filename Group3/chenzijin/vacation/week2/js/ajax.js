//创建跨浏览器对象
var EventUtil = {
    //添加事件
    addHandler : function(element,type,handler){
        if(element.addEventLister){//是否存在DOM2级方法
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){//存在的是IE方法
            element.attachEvent("on" + type,handler);
        }else{//DOM0级方法
            element["on" + type] = handler;
        }
    },
    //移除事件
    removeHandler : function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.datachEvent){
            element.datachEvent("on" + type,handler);
        }else{
            element["on" + type] = null;
        }
    },
    //返回对event对象的引用
    getEvent : function(event){
        return event ? event : window.event;
    },
    //返回事件的目标
    getTarget : function(event){
        return event.target || event.srcElement;
    },
    //取消事件的默认行为
    preventDefault : function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    }

};

//创建XHR对象
function createXHR(){
    if(typeof XMLHttpRequest != "undefined"){//检测原生XHR对象是否存在
        return new XMLHttpRequest();
    }else if(typeof ActiveXObject != "undefined"){//检测ActiveX对象
        if(typeof arguments.callee.activeXString != "string"){
            var versions = ["MSXML2.XMLhttp.6.0", "MSXML2.XMLhttp.3.0", "MSXML2.XMLhttp"];
            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {
                    //跳过
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    }else{
        throw new Error("No XHR object available.");
    }
}

var xhr = createXHR();
//为xhr对象添加事件
EventUtil.addHandler(xhr,"load",function(){
    //判断浏览器操作到哪一步
    if(xhr.readyState == 4){//读取完成
        if((xhr.status >= 200 && xhr.status < 300)||xhr.status == 304){
            var jsonText = JSON.parse(xhr.responseText);//把返回的文本解析为原生的JS值
            var oUl = document.getElementById("lesson");
            for(var i=0;i<jsonText.length;i++){
                var oLi = document.createElement("li");

                var oImg = document.createElement("img");
                oImg.src = jsonText[i].bigPhotoUrl;
                oImg.index = i+1;
                var oDiv = document.createElement("div");
                oLi.appendChild(oImg);//在li中嵌套img
                var p1 = document.createElement("p");
                p1.innerHTML = "name:<span>" + jsonText[i].name + "</span>";
                oDiv.appendChild(p1);//把p1嵌套在div中
                var p2 = document.createElement("p");
                p2.innerHTML = "provider:<span>" + jsonText[i].provider + "</span>";
                oDiv.appendChild(p2);
                var p3 = document.createElement("p");
                p3.innerHTML = "providerDesc:<span>" + jsonText[i].providerDesc + "</span>";
                oDiv.appendChild(p3);
                var p4 = document.createElement("p");
                p4.innerHTML = "targetUser:<span>" + jsonText[i].targetUser + "</span>";
                oDiv.appendChild(p4);

                oLi.appendChild(oDiv);//把div嵌套在li中
                oUl.appendChild(oLi);//把li嵌套在div中
            }
        }else{
            alert("Request was unsuccessful:" + xhr.status);
        }
    }
});


//给window设置load事件
EventUtil.addHandler(window,"load",function(event){
    //设置超时设定
    xhr.timeout = 5000;//将超时设置为2s
    xhr.ontimeout = function(){
        alert("Request did not return in five seconds");
    };
    xhr.open("get","http://study.163.com/webDev/hotcouresByCategory.htm",true);
    xhr.overrideMimeType("text/html");//重写XHR响应的MIME类型，可以保证把响应当作XML而非纯文本来处理
    xhr.send(null);

    var oUl = document.getElementById("lesson");
    oUl.style.width = 9000 + "px";
    var oBtn1  = document.getElementById("left");
    var oBtn2 = document.getElementById("right");
    var timer = null;

    function toMove(){
        if(oUl.offsetLeft < 0 && oUl.offsetLeft > -8500){
            timer = setInterval(function () {
                oUl.style.left = oUl.offsetLeft - 500 + "px";
                if (oUl.offsetLeft < -8500) {
                    oUl.style.left = 0 + "px";
                }
            }, 800);
        }
    }
    toMove();
    
    //点击自动播放
    // EventUtil.addHandler(oBtn1,"click",function(event) {
    //     clearInterval(timer);
    //     if(oUl.offsetLeft < 0){
    //         timer = setInterval(function () {
    //             oUl.style.left = oUl.offsetLeft + 500 + "px";
    //             if (oUl.offsetLeft > 0) {
    //                 oUl.style.left = -8500 + "px";
    //             }
    //         }, 800);
    //     }
    // });
    // EventUtil.addHandler(oBtn2, 'click', function(event) {
    //     clearInterval(timer);
    //     if(oUl.offsetLeft < 0 && oUl.offsetLeft > -8500){
    //         timer = setInterval(function () {
    //             oUl.style.left = oUl.offsetLeft - 500 + "px";
    //             if (oUl.offsetLeft < -8500) {
    //                 oUl.style.left = 0 + "px";
    //             }
    //         }, 800);
    //     }
    // });


    EventUtil.addHandler(oBtn1,"click",function(event) {
        clearInterval(timer);
        if(oUl.offsetLeft <= 0) {
            oUl.style.left = oUl.offsetLeft + 500 + "px";
            if (oUl.offsetLeft > 0) {
                oUl.style.left = -8500 + "px";
            }
        }
    });
    EventUtil.addHandler(oBtn2, 'click', function(event) {
        clearInterval(timer);
        if(oUl.offsetLeft <= 0 && oUl.offsetLeft >= -8500){
                oUl.style.left = oUl.offsetLeft - 500 + "px";
                if (oUl.offsetLeft < -8500) {
                    oUl.style.left = 0 + "px";
                }
        }
    });
});
