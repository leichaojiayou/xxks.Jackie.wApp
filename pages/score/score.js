//score.js
const util = require('../../utils/util.js')
var Bmob = require('../../utils/bmob.js');
const app = getApp();
Page({
  data: {
    scores: [{ "UserId": "雪人", "UserScore": "200" }, { "UserId": "雪人", "UserScore": "300" }]
  },
  onLoad: function () {
     
    var Score = Bmob.Object.extend("UserScore");
    var query = new Bmob.Query(Score);
    var that=this;
    // 查询所有数据    
    query.find({
      success: function (results) {
        console.log("总数:" + results.length);         
        that.setData({
          scores: results 
        })
      },
      error: function (error) {
        console.log("查询出错");
      }
    });  


  }
})