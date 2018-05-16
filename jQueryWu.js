

// 页面重新加载


if (window.name != "bencalie") {
    location.reload();
    window.name = "bencalie";
} else {
    window.name = "";
}

//宇宙特效  
function canvasOne(classs, starscolor, starsamount, starsradius, movrange, speed, trailing) {
    "use strict";
    var canvas = document.getElementsByClassName(classs)[0],
        ctx = canvas.getContext('2d'),
        w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight,
        hue = starscolor,//230  
        stars = [],
        count = 0,
        maxStars = starsamount;//星星数量  

    var canvas2 = document.createElement('canvas'),
        ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    var half = canvas2.width / 2,
        gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#000');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    // End cache  

    function random(min, max) {
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }

        if (min > max) {
            var hold = max;
            max = min;
            min = hold;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x, y) {
        var max = Math.max(x, y),
            diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / movrange;
        //星星移动范围，值越大范围越小，  
    }

    var Star = function () {

        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(starsradius, this.orbitRadius) / 8;
        //星星半径大小  
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / speed;
        //星星移动速度  
        this.alpha = random(2, 10) / 10;

        count++;
        stars[count] = this;
    }

    Star.prototype.draw = function () {
        var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
            twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
    }

    for (var i = 0; i < maxStars; i++) {
        new Star();
    }

    function animation() {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = trailing; //尾巴  
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h)

        ctx.globalCompositeOperation = 'lighter';
        for (var i = 1, l = stars.length; i < l; i++) {
            stars[i].draw();
        };

        window.requestAnimationFrame(animation);
    }
    animation();
}

// 雨滴
function canvasTwo() {
    var x = 100,
        y = 0,
        w,
        h,
        canCon;
    (function setSize() {
        window.onresize = arguments.callee
        w = window.innerWidth
        h = window.innerHeight
        canvas.width = w
        canvas.height = h
    })()
    setTimeout(function () {
        canCon = canvas.getContext('2d')
        var aRain = []
        function Rain() {

        }
        function random(min, max) {
            return Math.random() * (max - min) + min
        }
        Rain.prototype = {
            init: function () {
                this.x = random(0, w)
                this.y = 0
                this.vY = random(1, 3)
                this.h = random(0.8 * h, 0.9 * h)
                this.vx = random(5, 19)
                this.vV = random(0.05, 0.1)
                this.opa = random(0.5, 1)
                this.vopa = random(0.2, 0.3)
                this.fh = random(0, 300)
            },
            draw: function () {
                if (this.y < this.h) {
                    canCon.globalAlpha = this.opa
                    canCon.beginPath()
                    canCon.fillStyle = '#31f7f7'
                    canCon.drawImage(img, this.x, this.y, this.vx, this.vx)
                }
            },
            move: function () {
                if (this.y < this.h) {
                    this.y += this.vY;
                    this.vx += this.vV;
                    this.opa += this.vopa;
                } else {
                    this.init()
                }
                this.draw()
            }
        }
        function createRain(num) {
            for (var i = 0; i < num; i++) {
                setTimeout(function () {
                    var rain = new Rain()
                    rain.init()
                    rain.draw()
                    aRain.push(rain)
                }, 200 * i)
            }
            setInterval(function () {
                canCon.fillStyle = 'rgba(0,0,0,1)'
                canCon.fillRect(0, 0, w, h)
                for (var item of aRain) {
                    item.move()
                }
            }, 30)
        }
        createRain(30)
    }, 100)
}

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
