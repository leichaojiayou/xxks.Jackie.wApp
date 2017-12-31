//index.js
//获取应用实例
const app = getApp()
var minA = 1,
  maxA = 99;
var minB = 1,
  maxB = 99;
var minA_ = 1,
  maxA_ = 9;
var minB_ = 1,
  maxB_ = 9;
var A = 0;
var B = 0;
var proText = "";
var op = "+";
var ans = 0;
var myAnsValue = -1;
Page({
  data: {
    mproText: 'Ready',
    mop: "+",
    isRight: false,
    inputFocus: false,
    infoTxt: '',
    inputEnable: true,
    inputValue: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    btn1: '1',
    btn2: '2',
    btn3: '3',
    btn4: '4',
    proAuto:false
  },
  //事件处理函数
  bindViewTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  ,
  sltPlus: function () {
    op = "+";
    this.setData({ mop: op });
    this.showPro();
  }
  ,
  sltSubd: function () {
    op = "-";
    this.setData({ mop: op });
    this.showPro();
  }
  ,
  sltMult: function () {
    op = "×";
    this.setData({ mop: op });
    this.showPro();
  },
  sltDivi: function () {
    op = "÷";
    this.setData({ mop: op });
    this.showPro();
  },
  randomNum: function (minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
        break;
      default:
        return 0;
        break;
    }
  },
  showPro: function () {
    if (op === "+") {
      A = this.randomNum(minA, maxA);
      maxB = 100 - A;
      B = this.randomNum(minB, maxB);
    } else if (op === "-") {
      A = this.randomNum(minA, maxA);
      maxB = 100 - A;
      B = this.randomNum(minB, maxB);

      A = A + B;
    }
    else if (op === "×") {
      A = this.randomNum(minA_, maxA_);
      B = this.randomNum(minB_, maxB_);
    }
    else if (op === "÷") {
      A = this.randomNum(minA_, maxA_);
      B = this.randomNum(minB_, maxB_);

      A = A * B;
    }
    proText = A + op + B + "=?";
    this.setData({ mproText: proText });
    this.setData({ inputEnable: false });
    this.setData({ inputValue: '' });
    this.setData({ infoTxt: '' });
    this.MakeNumBtn();
  },
  showAns: function () {
    if (op === "+") {
      ans = A + B;
    } else if (op === "-") {
      ans = A - B;
    } else if (op === "×") {
      ans = A * B;
    } else if (op === "÷") {
      ans = A / B;
    }
    proText = A + op + B + "=" + ans;

    this.setData({ mproText: proText });
  },
  bindKeyInput: function (e) {
    myAnsValue = e.detail.value;
  },
  ansSubmit: function () {
    this.checkInput();    
  },
  focusInputEvent: function (e) {
    myAnsValue = -1;
    this.setData({ inputValue: '' });
    this.setData({ infoTxt: '' });
  },
  checkInput: function () {
    if (op === "+") {
      ans = A + B;
    } else if (op === "-") {
      ans = A - B;
    } else if (op === "×") {
      ans = A * B;
    } else if (op === "÷") {
      ans = A / B;
    }
    //console.log(myAnsValue);
    if (myAnsValue.length === undefined) {
      this.setData({ infoTxt: '' });
    } else if (parseInt(myAnsValue) === parseInt(ans)) {
      this.setData({ isRight: true });
      this.setData({ infoTxt: '✔' });
      if (this.data.proAuto === true) {
        setTimeout(function () {
          this.showPro();
        }.bind(this), 1000);
      }
    }
    else {
      this.setData({ isRight: false });
      this.setData({ infoTxt: '✘' }); 
      if (this.data.proAuto === true) {
        setTimeout(function(){
          this.showPro();
        }.bind(this), 1000);        
      }
    }
  },
  AnsInput: function (e) {
    myAnsValue = this.data.inputValue;
    myAnsValue += e.target.id;
    this.setData({ inputValue: myAnsValue });
  },
  AnsClear: function () {
    myAnsValue = -1;
    this.setData({ inputValue: '' });
    this.setData({ infoTxt: '' });
  }, 
  MakeNumBtn: function () {
    function getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    }

    if (op === "+") {
      ans = A + B;
    } else if (op === "-") {
      ans = A - B;
    } else if (op === "×") {
      ans = A * B;
    } else if (op === "÷") {
      ans = A / B;
    }
    var nums = '0123456789'
    var arrAns = [];

    var temp = ans.toString().split('');
    for (var i = 0; i < temp.length; i++) {
      if (arrAns.indexOf(temp[i]) == -1) {
        arrAns.push(temp[i]);
      }
      nums = nums.replace(temp[i], '');
    }
    arrAns = getRandomArrayElements(arrAns.concat(getRandomArrayElements(nums.split(''), 4 - arrAns.length)), 4);
    this.setData({ btn1: arrAns[0] });
    this.setData({ btn2: arrAns[1] });
    this.setData({ btn3: arrAns[2] });
    this.setData({ btn4: arrAns[3] });
  }, 
  switchChange:function(e){
    this.setData({proAuto: e.detail.value});
   
  }

})
