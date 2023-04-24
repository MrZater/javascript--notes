var MyFunction = {


    /**
     * 判断一个数值否是偶数
     * @param {number} n 
     * @returns boolean
     */
    isOdd: function (n) {
        return n % 2 == 0
    },




    /**
     * 判断一个数是否是素数
     * @param {number} n 
     * @returns boolean
     */
    isPrime: function (n) {
        if (n < 2) {
            return false;
        }
        for (var i = 2; i < n; i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    },




    /**
     * 对数组求和
     * @param {array} arr 
     */
    sumOfArray: function (arr) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    },



    /**
     * 得到数组中的最大值,如果数组长度为0，则返回undefined
     * @param {number} arr 
     */
    maxOfArray: function (arr) {
        if (arr.length === 0) {
            return;
        }
        var max = arr[0];
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    },

    /**
     * 得到数组中的最小值,如果数组长度为0，则返回undefined
     * @param {number} arr 
     */
    minOfArray: function (arr) {
        if (arr.length === 0) {
            return;
        }
        var min = arr[0];
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
        }
        return min;
    },



    /**
     * 判断一个数组是否是稀松数组
     * @param {array} arr
     * @returns boolean 
     */
    hasEmptyInArray: function (arr) {
        //稀松数组的特点：下标连续
        for (var i = 0; i < arr.length; i++) {
            if (!(i in arr)) {
                return true;
            }
        }
        return false;
    },




    /**
     * 判断某一年是否是闰年
     * @param {number} year 
     */
    isLeap: function (year) {
        // 400年一闰；4年一闰，百年不闰
        return year % 400 === 0 || year % 100 !== 0 && year % 4 === 0;
    },




    /**
     * 判断某年某一月的天数
     * @param {number} year 
     * @param {number} month 
     * @returns number
     */
    getDays: function (year, month) {
        if (month === 2) {
            return isLeap(year) ? 29 : 28;
        } else if (month < 8 && isOdd(month) || month > 8 && !isOdd(month)) {
            return 30;
        } else {
            return 31;
        }

    },



    /**
     * 得到数组或字符串中出现频率最高的数字和频率
     * @param {array} arr 
     * @returns object
     */
    getTopFreqInArray: function (arr) {
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            var n = arr[i];
            if (!obj[n]) {
                obj[n] = 1;
            } else {
                obj[n] += 1;
            }
        }
        var number;
        var times = 0;
        for (var prop in obj) {

            if (obj[prop] > times) {
                times = obj[prop];
                number = prop;
            }
        }
        return {
            number,
            times
        }
    },

    /**
     * 数组排列
     * @param {Array} arr 
     * @param {Function} compare 比较大小，该函数有两个参数，代表数组中的两个元素，该函数返回一个数字，
     * 如果是正数，则第一个元素比第二个元素大
     * 如果是0，则相等
     * 如果是负数，则第一个元素比第二个小
     */
    sort: function (arr, compare) {
        //判断第二个函数（排序方式）是否传递
        if (!compare) {
            compare = function (a, b) {
                if (a > b) {
                    return 1;
                } else if (a === b) {
                    return 0;
                } else {
                    return -1;
                }
            }
        }
        //冒泡排序
        for (var i = 1; i < arr.length; i++) {
            for (var j = 0; j < arr.length - 1; j++) {
                //比较arr[j]和arr[j+1]
                if (compare(arr[j], arr[j + 1]) > 0) {
                    //交换
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }

            }
        }
    },



    /**
     * 
     * @param {Array} arr 
     * @param{Function}callback 回调函数，接受两个参数
     * 分别表示数组的某一项和其下标，返回boolean
     * 满足条件返回true，否则返回false
     */
    filter: function (arr, callback) {
        //遍历数组，看每一项是否满足条件
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (callback(arr[i], i)) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    },

    /**
     * 从指定的数组中，查找第一个满足条件的元素,如果没有，返回undefined
     * @param {Array} arr 
     * @param {Function} callback 回调函数，接受两个参数
     * 分别表示数组的某一项和其下标，返回boolean
     * 满足条件返回true，否则返回false
     */
    find: function (arr, callback) {
        for (var i = 0; i < arr.length; i++) {
            if (callback(arr[i], i)) {
                return arr[i];
            }
        }

    },

    /**
     * 按照指定的条件，得到某个数组中满足条件的元素数量
     * @param {Array} arr 
     * @param {Function} callback  回调函数，接受两个参数
     * @returns number 满足数量
     */
    count: function (arr, callback) {
        var num = 0;
        for (var i = 0; i < arr.length; i++) {
            if (callback(arr[i], i)) {
                num += 1;
            }
        }
        return num;
    },

    /**
     * 得到一个最小值和最大值之间的随机整数
     * @param {*} min 最小值
     * @param {*} max 最大值(取不到最大值)
     * @returns 
     */
    getRandom: function (min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    },

    /**
     * 从出生年月日得到年龄
     * @param {*} year 
     * @param {*} month 
     * @param {*} day 
     * @returns 
     */
    getAge: function (year, month, day) {
        //得到当前日期
        var now = new Date();
        var dec = now.getFullYear() - year;
        //处理闰年
        if (month === 2 && day === 29 && !this.isLeap(now.getFullYear())) {
            day = 28;
        }
        //得到今年的生日
        var birthThisYear = new Date(now.getFullYear(), month, day);
        if (birthThisYear > now) {
            dec--;
        }
        // console.log(now.getFullYear(),dec);
        return dec;
    },


    /**
     * 得到下次生日天数
     * @param {*} month 
     * @param {*} day 
     * @returns 
     */
    getDaysToBirthday: function (month, day) {
        var now = new Date();
        var thisYear = new Date().getFullYear();
        var birthday = new Date(thisYear, month - 1, day)
        if (birthday < now) {
            birthday.setFullYear(now.getFullYear() + 1);
        }
        var timeDec = birthday - now;
        var days = Math.ceil(timeDec / (24 * 60 * 60 * 1000))
        return days
    }

}
//count()函数测试
// var arr = [31, 24, 32, 32, 17, 36, 22, 84, 22, 74, 21, 16, 26, 32, 54, 45, 7];
// var num = MyFunction.count(arr,function(item,index){
//     return item%12===0
// });
// console.log(num)



//find(从指定的数组中，查找第一个满足条件的元素)函数测试
// var arr = [31, 24, 32, 32, 17, 36, 22, 84, 22, 74, 21, 16, 26, 32, 54, 45, 7]
// var elm = MyFunction.find(arr, function (item, index) {
//     return item % 2 === 0;
// });
// console.log(elm)





//filter(筛选)函数测试
// var arr = [31, 24, 32, 32, 17, 36, 22, 84, 22, 74, 21, 16, 26, 32, 54, 45]
// var newArr = MyFunction.filter(arr, function (item, index) {
//     return item % 3 === 0 && index%2===0;
// });
// console.log(newArr)





//sort(大小排序)函数测试
// var arr = [{
//         name: 'zt',
//         age: 21,
//         weight: 70
//     },
//     {
//         name: 'zy',
//         age: 20,
//         weight: 65
//     },
//     {
//         name: 'yt',
//         age: 23,
//         weight: 80
//     },
//     {
//         name: 'qhc',
//         age: 18,
//         weight: 101
//     }
// ];
// MyFunction.sort(arr,function(a,b){
//     return a.weight-b.weight;
// });
// console.log(arr)

// var arr1 = [3,4,1,1,2,3,2,1]

// MyFunction.sort(arr1);
// console.log(arr1);