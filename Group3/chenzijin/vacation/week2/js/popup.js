var oBtn1 = document.getElementById("button2"),
    oBtn2 = document.getElementById("button3"),
    oDelete = document.getElementById("delete"),
    oUser = document.getElementById("user"),
    oPassWord = document.getElementById("password"),
    oDiv = document.getElementById("button1"),
    oMask = document.getElementById("mask"),
    oPopup = document.getElementById("popup");
oMask.style.height = document.documentElement.clientHeight + "px";
//弹出窗口的函数
function startPopup(){
    var timer = null;
    timer = setTimeout(function(){
        oDiv.style.display = "none";
        oPopup.style.display = "block";
        oMask.style.display = "block";
    },300) ;
}
oBtn1.onclick = startPopup;
//关闭窗口的函数
function stopPopup(){
    var timer = null;
    timer = setTimeout(function(){
        oPopup.style.display = "none";
        oDiv.style.display = "block";
        oMask.style.display = "none";
    },300)
}
oDelete.onclick = stopPopup;
oMask.onclick = stopPopup;
//验证用户名和密码的函数
function checkText(){
    var oUserContent = oUser.value.trim();
    var oPassWordContent = oPassWord.value.trim();
    if(oUserContent == ""){
        alert("输入的用户名不能为空！");
        return;
    }
    if(!oUserContent.match(/[\u4e00-\u9fa5]/) && !oUserContent.match(/[a-zA-Z]/)){
        alert("输入的用户名要为英文或者汉字！");
        return;
    }
    if(oPassWordContent == ""){
        alert("输入的密码不能为空！");
        return;
    }
    if(!oPassWordContent.match(/\S{6,}/)){
        alert("输入的密码至少六位！");
        return;
    }
    alert("恭喜你，登陆成功！！！");
    stopPopup();
}
oBtn2.onclick = checkText;

//拖拽函数
function toMove(ev){
    var oEvent = ev||event;
    var distanceX = oEvent.clientX - oPopup.offsetLeft;//鼠标点击物体那一刻，相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
    var distanceY = oEvent.clientY - oPopup.offsetTop;
    /*低版本ie bug:物体被拖出浏览器可是窗口外部时，还会出现滚动条，
     解决方法是采用ie浏览器独有的2个方法setCapture()\releaseCapture(),这两个方法，
     可以让鼠标滑动到浏览器外部也可以捕获到事件，而我们的bug就是当鼠标移出浏览器的时候，
     限制超过的功能就失效了。用这个方法，即可解决这个问题。注：这两个方法用于onmousedown和onmouseup中*/
    // if(typeof oPopup.setCapture() != "undefined"){
    //     oPopup.setCapture();
    // }

    document.onmousemove = function(ev){
        var oEvent = ev||window.event;
        var left = oEvent.clientX - distanceX;
        var top = oEvent.clientY - distanceY;
        //控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
        if(left < 0){
            left = 0;
        }else if(left > document.documentElement.clientWidth - oPopup.offsetWidth){
            left = document.documentElement.clientWidth - oPopup.offsetWidth;
        }
        if(top < 0){
            top = 0;
        }else if(top > document.documentElement.clientHeight - oPopup.offsetHeight){
            top = document.documentElement.clientHeight - oPopup.offsetHeight;
        }
        //重新计算物体的距离
        oPopup.style.left = left - document.documentElement.clientWidth/3 + "px";
        oPopup.style.top = top + "px";
    };
    //鼠标弹起事件
    document.onmouseup = function(){
        this.onmousemove = null;//停止移动
        this.onmouseup = null;//预防鼠标弹起来后还会循环（预防鼠标放上去的时候还会移动）

        //修复低版本IEbug
        // if(typeof oPopup.releaseCapture() != "undefined"){
        //     oPopup.releaseCapture();
        // }
    };
}
oPopup.onmousedown = toMove;
