/**
 * Created by hp-pc on 2017/8/8.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var oCityInput = document.getElementById("aqi-city-input"),
    oValueInput = document.getElementById("aqi-value-input"),
    oTable = document.getElementById("aqi-table");

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var oCityContent = oCityInput.value.trim();
    var oValueContent = oValueInput.value.trim();
    if(!oCityContent.match(/[\u4e00-\u9fa5]/)&&!oCityContent.match(/[a-zA-Z]/)){
        alert("城市名必须为中英文字符");
        return;
    }
    if(!oValueContent.match(/^[0-9]*$/)){
        alert("空气质量指数必须为整数");
        return;
    }
    aqiData[oCityContent] = oValueContent;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    oTable.innerHTML = "";
    for(var oCityContent in aqiData){
        if(oTable.children.length === 0){
            oTable.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
        }
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = oCityContent;
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        td2.innerHTML = aqiData[oCityContent];
        tr.appendChild(td2);
        var td3 = document.createElement("td");
        td3.innerHTML = "<button class='del-btn'>删除</button>";
        tr.appendChild(td3);
        oTable.appendChild(tr);
        oCityInput.value = null;
        oValueInput.value = null;
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
    // do sth.
    var tr = target.parentElement.parentElement;
    var oCityContent = tr.children[0].innerHTML;
    delete aqiData[oCityContent];

    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var btnAdd = document.getElementById("add-btn");
    btnAdd.onclick = addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var table = document.getElementById("aqi-table");
    var arrBtnDel = table.getElementsByClassName("del-btn");
    table.addEventListener("click",function(e){
        if(e.target && e.target.nodeName == "BUTTON"){
            delBtnHandle(e.target);
        }
    })
}
init();