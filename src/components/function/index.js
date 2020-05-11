//数字改变（加万位）
import Vue from "vue";
Vue.filter("many", (num) => {
    var str = num + '';

    if (str.length > 4) {
        var str1 = str.substring(0, str.length - 4);
        var str2 = str.substring(str1.length, 1);
        if (str2.length == 0) {
            var str3 = str1 + "." + 0 + "万字";
        } else {
            var str3 = str1 + "." + str2 + "万字";
        }
        return str3;
    }
    else {
        return str;
    }
})

Vue.filter("_id", (time) => {
 
    var secs =parseInt(time.toString().substring(0, 8), 16) * 1000
    var t = new Date(secs)
    var year = t.getFullYear()
    var month = t.getMonth() + 1
    if (month < 10) { month = '0' + month }
    var date = t.getDate()
    if (date < 10) { date = '0' + date }
    var hours = t.getHours()
    if (hours < 10) { hours = '0' + hours }
    var minute = t.getMinutes()
    if (minute < 10) { minute = '0' + minute }
    var sec = t.getSeconds()
    if (sec < 10) { sec = '0' + sec }
    
    return year + '-' + month + '-' + date+" "+ hours+":"+minute
})
Vue.filter("date", (secs) => {
    var t = new Date(secs)
    var year = t.getFullYear()
    var month = t.getMonth() + 1
    if (month < 10) { month = '0' + month }
    var date = t.getDate()
    if (date < 10) { date = '0' + date }
    return year + '年' + month + '月' + date + '日'
})
Vue.filter("status", (status) => {

    if (status == true) {
        return "已上架"
    } else {
        return "未上架"
    }
})
Vue.filter("status5", (status) => {

    if (status == true) {
        return "正常"
    } else {
        return "封禁"
    }
})
Vue.filter("status3", (status) => {
    if (status == 2) {
        return "管理员"
    } 
    if (status == 1) {
        return "作者"
    } 
    if (status == 0) {
        return "用户"
    } 
})
Vue.filter("status1", (status) => {
    if (status == true) {
        return "封禁作品"
    } else {
        return "解除封禁"
    }
})
Vue.filter("status4", (status) => {
    if (status == true) {
        return "封禁用户"
    } else {
        return "解除封禁"
    }
})
Vue.filter("status2", (status) => {
    if (status == true) {
        return "warning"
    } else {
        return "primary"
    }
})
Vue.filter("tui", (status) => {
    if (status == true) {
        return "已推荐"
    } else {
        return "加入推荐"
    }
})
Vue.filter("min", (min) => {
    let data = "《" + min + "》"
    return data
})
Vue.filter("zhuang", (item) => {
    if(item==false){
        return "add-o"
    }else{
        return "passed"
    }
   
})
Vue.filter("reverse", (item) => {
    let data = Array.from(item);
    let data2 =data.reverse()
    let data3=data2[0].title
    return data3
})
Vue.filter("time", (time) => {
    let result=""
    let date = Date.parse(time.replace(/-/gi, "/"));
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - date;
    if (diffValue < 0) {
        //若日期不符则弹出窗口告之
        //alert("结束日期不能小于开始日期！");
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
        result =  parseInt(monthC) + "个月前";
    }
    else if (weekC >= 1) {
        result =  parseInt(weekC) + "周前";
    }
    else if (dayC >= 1) {
        result = parseInt(dayC) + "天前";
    }
    else if (hourC >= 1) {
        result =  parseInt(hourC) + "小时前";
    }
    else if (minC >= 1) {
        result = parseInt(minC) + "分钟前";
    } else
        result = "刚刚";
    return result;
})
Vue.filter("time2", (date) => {
    let result="";
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - date;
    if (diffValue < 0) {
        //若日期不符则弹出窗口告之
        //alert("结束日期不能小于开始日期！");
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
     if (dayC >= 1) {
        result = parseInt(dayC) + "天前";
    }
    else if (hourC >= 1) {
        result =  parseInt(hourC) + "小时前";
    }
    else if (minC >= 1) {
        result = parseInt(minC) + "分钟前";
    } else if (minC <= 1){
        result = "刚刚";
    }else{
        var t = new Date(date)
        var year = t.getFullYear()
        var month = t.getMonth() + 1
        if (month < 10) { month = '0' + month }
        var date = t.getDate()
        if (date < 10) { date = '0' + date }
        result= year + '年' + month + '月' + date + '日'
    }
    return result;
})



