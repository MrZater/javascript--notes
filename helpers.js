//判断是否存在myPlugin，防止重复
if (!this.myPlugin) {
    this.myPlugin = {};
}



/**
 * 给myPlugin上添加新方法，更改原型
 */
this.myPlugin.inherit = function (son, father) {
    son.prototype = Object.create(father.prototype);
    //由于son的constructor在更改指向后指向构造函数1，需要手动调整指向
    son.prototype.constructor = son;
    //获取构造函数1，方便调用
    son.prototype.uber = father
}




/**
 * 将obj1混合到obj2中产生新对象，obj1和obj2共有的属性保存obj2的值
 */
this.myPlugin.mixin = function (obj1, obj2) {
    //写法1
    //Object.assign()，将后面参数对象的属性加到第一个参数对象里面
    return Object.assign({}, obj1, obj2);


    //写法2
    // // 创建一个新对象
    // var newObj = {};
    // // 复制obj2的属性
    // for(var prop in obj2){
    //         // 保存obj2的属性
    //     newObj[prop] = obj2[prop];
    // }
    // //找到obj1中有但是obj2中没有的属性
    // for(var prop in obj1){
    //         // 判断该属性在obj2中是否存在
    //     if(!(prop in obj2)){
    //         newObj[prop] = obj1[prop];
    //     }
    // }
    // // 返回新对象
    // return newObj;
}




/**
 * 克隆，获得型数组或对象
 */
this.myPlugin.clone = function (obj, deep) {
    //判断传入的是否是数组
    if (Array.isArray(obj)) {
        //判断是否是深度克隆
        if (deep) {
            //深度克隆
            //创建新数组
            var newArr = [];
            //遍历obj的每一项，并用push将该项加到新数组中
            for (var i = 0; i < obj.length; i++) {
                //使用递归
                newArr.push(this.clone(obj[i], deep));
            }
            return newArr;
        } else {
            return obj.slice(); //复制数组
        }

    } else if (typeof obj === 'object') {
        //创建新对象
        var newObj = {};
        for (var prop in obj) {
            if (deep) {
                //深度克隆
                //使用递归
                newObj[prop] = this.clone(obj[prop], deep);
            } else {
                newObj[prop] = obj[prop];
            }
        }
        return newObj;
    } else {
        //函数、原始类型
        return obj;
    }
}



/**
 * 函数防抖
 */
this.myPlugin.debounce = function (callback, time) {
    var timer;
    //高阶函数：在函数内部返回一个新的函数，可防止全局变量污染
    return function () {
        clearTimeout(timer);
        //保存当前的传入参数，供下一个函数使用
        var args = arguments;
        timer = setTimeout(() => {
            //调用回调函数，并传入之前保存的参数
            callback.apply(null, args);
        }, time);
    }
}



/**
 * 函数节流函数
 */
this.myPlugin.throttle = function (callback, time, immediately) {
    // 第三个参数immediately,boolean类型，判断是否是立即触发，还是time时间后再触发
    //判断immediately是否传人，若没有，默认值为true
    if (immediately === undefined) {
        immediately = true;
    }
    //判断节流方式
    if (!immediately) {
        //保存时间的变量
        var t;
        return function () {
            //判断  之前是否计时  或  之前的时间与现在的时间差值是否大于time
            if (!t || Date.now() - t >= time) {
                callback.apply(null, arguments);
                //获取当前时间戳
                t = new Date();
            }
        }
    } else {
        var timer;
        //高阶函数：在函数内部返回一个新的函数，可防止全局变量污染
        return function () {
            if (timer) {
                return;
            }
            //保存当前的传入参数，供下一个函数使用
            var args = arguments;
            timer = setTimeout(() => {
                //调用回调函数，并传入之前保存的参数
                callback.apply(null, args);
                //将timer设为null，防止下次调用节流函数无法使用
                timer = null;
            }, time);
        }
    }

}

/**
 * 科里化函数
 * 在函数式编程中，科里化最重要的作用是把多参函数变为单参函数
 */
this.myPlugin.curry = function (fnc) {
    //得到从下表1开始的参数，下标0的参数为传入原始函数
    var args = Array.prototype.slice.call(arguments, 1);
    //保存当前this指向
    var that = this;
    return function () {
        //当前调用的参数
        var curArgs = Array.from(arguments);
        //全部参数
        var totalArgs = args.concat(curArgs);
        if (totalArgs.length >= fnc.length) {
            //参数数量够了
            return fnc.apply(null, totalArgs);
        } else {
            //参数数量仍然不够
            //unshift方法:在数组前面加上一项
            totalArgs.unshift(fnc);
            return that.curry.apply(that, totalArgs);
        }
    }
}


/**
 * 函数管道
 */
this.myPlugin.pipe = function () {
    var args = Array.from(arguments);
    return function (val) {

        //写法一
        // return args.reduce(function(result,func){
        //     return func(result);
        // },val)



        //写法二
        //循环遍历参数
        for (var i = 0; i < args.length; i++) {
            //保存参数中的函数
            var func = args[i];
            //执行参数中的函数，将得到的返回值重新存到val中，供下一个函数调用
            val = func(val);
        }
        //返回最终的val
        return val;
    }
}