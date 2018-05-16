(function () {
    return new $()
})()
function jQuery(arg) {
    this.event = []
    switch (typeof arg) {
        case 'function':
            myAddEvent(window, 'load', arg)
            break;
        case 'string':
            switch (arg.charAt(0)) {
                case '#':
                    this.event = document.getElementById(arg.substring(1))
                    return this
                case '.':
                    this.event = getClass(document, arg.substring(1));
                    return this
                default:
                    this.event = document.getElementsByTagName(arg)
                    return this
            }
            break;
        case 'object':
            break;
    }
}
// 方法：
jQuery.prototype = {
    click: function (fn) {
        for (var i = 0; i < this.event.length; i++) {
            myAddEvent(this.event[i], 'click', fn)
        }
        return this
    },
    on: function (attr, fn) {
        for (var i = 0; i < this.event.length; i++) {
            myAddEvent(this.event[i], attr, fn)
        }
        return this
    },
    animate: function (json, fn) {
        for (var i = 0; i < this.event.length; i++) {
            startMov(this.event[i], json, fn)
        }
        return this
    },
    css: function (attr, val) {
        for (var i = 0; i < this.event.length; i++) {
            this.event[i].style[attr] = val
        }
        return this
    },
    html: function (val) {
        for (var i = 0; i < this.event.length; i++) {
            this.event[i].innerHTML = val
        }
        return val
    },
    val: function (val) {
        if (!val) {
            for (var i = 0; i < this.event.length; i++) {
                val = this.event[i].value
            }
        } else {
            for (var i = 0; i < this.event.length; i++) {
                this.event[i].value = val
            }
        }
        return val
    }
}
// 入口函数
function $(arg) {
    return new jQuery(arg)
}
$()
// 给函数绑定事件
function myAddEvent(obj, sev, fn) {
    if (obj.addachEvent) {
        obj.addachEvent('on' + sev, fn)
    } else {
        obj.addEventListener(sev, fn, false);
    }
}
// 查找指定class名称的元素,通过遍历所有的元素，查找指定的class的类名称

function getClass(ohtml, oclass) {
    var myElement = ohtml.getElementsByTagName('*')
    var result = []
    for (var i = 0; i < myElement.length; i++) {
        if (myElement[i].className == oclass) {
            result.push(myElement[i])
        }
    }
    return result;
}

function startMov(obj, json, fn) {//fn回调函数
    clearInterval(obj.timer);//执行动画之前清除动画
    var flag = true;//是否动画都完成了
    obj.timer = setInterval(function () {
        for (var attr in json) {
            var icur = 0;
            if (attr == 'opacity') {
                icur = Math.round(parseFloat(getStyle(obj, attr)) * 100);//转换成整数,并且四舍五入下
                //计算机在计算小数的时候往往是不准确的！
            }
            else {
                icur = parseInt(getStyle(obj, attr));
            }
            var speed = 0;
            speed = (json[attr] - icur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (icur != json[attr]) {
                flag = false;
            }
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (icur + speed) + ')';
                obj.style.opacity = (icur + speed) / 100;
            }
            else {
                obj.style[attr] = icur + speed + 'px';
            }
            if (flag) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
        }
    }, 30);
}
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else {
        return getComputedStyle(obj, false)[attr];
    }
}

/*传递参数对象，返回拼接之后的字符串*/
/*{‘name’:’jack,’age’:20}=>  name=jack&age=20&*/
$.getParmeter = function getParmeter(data) {
    var result = "";
    for (var key in data) {
        result = result + key + "=" + data[key] + "&";
    }
    /*将结果最后多余的&截取掉*/
    return result.slice(0, -1);
}
/*实现ajax请求*/
$.ajax = function (obj) {
    /*1.判断有没有传递参数，同时参数是否是一个对象*/
    if (obj == null || typeof obj != "object") {
        return false;
    }
    /*2.获取请求类型,如果没有传递请求方式，那么默认为get*/
    var type = obj.type || 'get';
    /*3.获取请求的url  location.pathname:就是指当前请求发起的路径*/
    var url = obj.url || location.pathname;
    /*4.获取请求传递的参数*/
    var data = obj.data || {};
    /*4.1获取拼接之后的参数*/
    data = this.getParmeter(data);
    /*5.获取请求传递的回调函数*/
    var success = obj.success || function () { };

    /*6:开始发起异步请求*/
    /*6.1:创建异步对象*/
    var xhr = new XMLHttpRequest();
    /*6.2:设置请求行,判断请求类型，以此决定是否需要拼接参数到url*/
    if (type == 'get') {
        url = url + "?" + data;
        /*重置参数，为post请求简化处理*/
        data = null;
    }
    xhr.open(type, url);
    /*6.2:设置请求头:判断请求方式，如果是post则进行设置*/
    if (type == "post") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    /*6.3:设置请求体,post请求则需要传递参数*/
    xhr.send(data);

    /*7.处理响应*/
    xhr.onreadystatechange = function () {
        /*8.判断响应是否成功*/
        if (xhr.status == 200 && xhr.readyState == 4) {
            /*客户端可用的响应结果*/
            var result = xhr.responseText;
            /*11.拿到数据，调用客户端传递过来的回调函数*/
            success(result);
        }
    }
}
$.bind = function (attr, fn) {
    $[attr] = fn;
}
