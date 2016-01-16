'use strict';

var Client = require('mariasql');
var async = require('async');
var ERROR = require('../module/error.code.js');
var Module = require('../module/query.js');

var c = new Client({
  host: 'localhost',
  user: 'root',
  password: '',
  db: 'suji_dev_v12'
});

exports.checkLogin = function(datas, callback){
  var _username = datas[0];
  var _password = datas[1];
  var isSuccess = false;

  c.query('SELECT USERNAME, PASSWORD FROM USER WHERE USERNAME=:username AND PASSWORD=:password',
    {username : _username, password : _password}, function(err, row){
      if(err) throw(err);
      if(row.info.affectedRows == 1){
        isSuccess = true;
      }
      callback(isSuccess);
    });
  c.end();
};

exports.registerUser = function(datas, callback){
  var _username = datas[0];

  async.waterfall([
      function(callback){
        Module.checkExistsRows('USER', 'USERNAME', _username, function(isExist){
          if(isExist) callback(true, ERROR.DUPLICATE_USER);
          else callback(null, isExist);
        });
      },
      function(isName, callback) {
        insertData(datas, function (success) {
          if(!success) callback(true, ERROR.INSERT_USER);
          else callback(null, success);
        });
      }],
    function(err, results){
      if(err) callback(results);
      else callback(results);
    }
  );
};

function insertData(datas, callback){
  var _username = datas[0];
  var _password = datas[1];
  var _storeName = datas[2];
  var _storeAddress = datas[3];

  var isSuccess = false;

  var query = 'INSERT INTO USER(USERNAME, PASSWORD, STORE_NAME, STORE_ADDRESS) VALUES(:username, :password, :storeName, :storeAddress)';
  c.query(query, {username : _username, password : _password, storeName:_storeName, storeAddress:_storeAddress }, function(err, row){
    if(err) throw(err);
    if(row.info.affectedRows == 1){
      isSuccess = true;
    }
    callback(isSuccess);
  });
  c.end();
}

exports.selectUserTable = function(_username, callback){
  c.query('SELECT STORE_NAME, STORE_ADDRESS FROM USER WHERE USERNAME=:username',
    {username : _username}, function(err, rows){
      if(err) throw(err);
      callback(rows[0]);
    });
  c.end();
};


function insertCategories(datas, callback){
  var _username = datas[0];
  var _categoryName = datas[1];
  var isSuccess = false;

  c.query('UPDATE USER SET CATEGORIES=:categoryName WHERE USERNAME = :username',
    {categoryName : _categoryName, username : _username}, function(err, row){
    if(err) throw(err);
    if(row.info.affectedRows == 1){
        isSuccess = true;
      }
      callback(isSuccess);
    });
  c.end();
}

function updateCategories(datas, callback){
  var _username = datas[0];
  var _categoryName = datas[1];
  var _updateCategories = ',' + _categoryName;
  var isSuccess = false;

  c.query('UPDATE USER SET CATEGORIES=concat(CATEGORIES, :updateCategories) WHERE USERNAME = :username',
    {updateCategories : _updateCategories, username : _username}, function(err, row){
    if(err) throw(err);
    if(row.info.affectedRows == 1){
        isSuccess = true;
      }
      callback(isSuccess);
    });
  c.end();
}

exports.changeCategories = function(datas, callback){
  var _username = datas[0];

  async.waterfall([
      function(callback){
        Module.checkIsNull('CATEGORIES', 'USER', 'USERNAME', _username, function(isNull){
          callback(null, isNull);
        });
      },
      function(isNull, callback) {
        if(isNull){
          insertCategories(datas, function(success){
            if(!success) callback(true, ERROR.INSERT_CATEGORY_INTO_USER);
            else callback(null, success);
          })
        } else {
          updateCategories(datas, function(success){
            if(!success) callback(true, ERROR.UPDATE_CATEGORIES_IN_USER);
            else callback(null, success);
          })
        }
      }],
    function(err, results){
      if(err) callback(results);
      else callback(results);
    }
  );
};

