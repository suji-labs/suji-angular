'use strict';

var db = require('./purchase.model.js');
var ERROR = require('../module/error.code.js');
var Module = require('../module/query.js');
var async = require('async');

exports.index = function(req, res) {
  Module.selectTableOrderBy('PURCHASE', 'PURCHASE_TIME', 'DESC', function(results){
    res.send(results);
  });
};

exports.add = function(req, res) {
  var result = false;
  console.log(req.body);

  async.each(req.body,
    function(eachItem, callbackEach) {
      var _name = eachItem.itemId;
      var _quantity = eachItem.orderedItemCnt;
      var _total_price = eachItem.totalPrice;
      var _purchase_time = eachItem.purchase_time;
      var datas = [_name, _quantity, _total_price, _purchase_time];

      db.addPurchase(datas, function(isSuccess) {
        console.log('isSuccess', isSuccess);
        switch (isSuccess) {
          case true:
            result = true;
            break;
          case ERROR.NO_NAME_IN_MENU:
            result = false;
            break;
          case ERROR.ADD_PURCHASE:
            result = false;
            break;
        }
      });
      console.log(result);
      callbackEach();
    },
    function(err) {
      if(err) throw(err);
      console.log(result);

      if (result == true) {
        res.redirect('/');
      }
      else {
        res.send('<script>alert("Error! Add PURCHASE Error");history.back();</script>');
      }
    }
  );
};

exports.delete = function(req, res){
  console.log(req.body);
  var _id = req.body.ID;
  var datas = [_id];

  db.deletePurchase(datas, function(isSuccess){
    switch(isSuccess){
      case true:
        res.status(200).send({status:'success'});
        break;
      case ERROR.NO_DATA_IN_PURCHASE:
        res.status(500).send({status:'error', message : 'Error! There is no purchase data'});
        break;
      case ERROR.DELETE_PURCHASE:
        res.status(500).send({status:'error', message : 'Error! Purchase delete error occurs'});
        break;
    }
  });
};

