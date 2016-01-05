'use strict';
var db = require('./category.model.js');
var ERROR = require('../../../components/error.code.js');
var Module = require('../../../components/api_module.js');

exports.index = function(req, res) {
  var _username = req.params.username;
  db.selectCategoryTable(_username, function(results){
    res.send(results);
  });
};

exports.renderInsert = function(req, res) {
  res.render('v1.1/category/insert', {
    title : 'Insert Category'
  });
};

exports.insert = function(req, res) {
  var _name = req.body.name;
  var _username = req.params.username;
  var datas = [_name, _username];

  db.insertCategory(datas, function (isSuccess) {
    switch(isSuccess){
      case true:
        res.redirect('/');
        break;
      case ERROR.DUPLICATE:
        res.send('<script>alert("Error! Duplicate NAME");history.back();</script>');
        break;
      case ERROR.INSERT_CATEGORY:
        res.send('<script>alert("Error! Insert Category Error");history.back();</script>');
        break;
    }
  });
};