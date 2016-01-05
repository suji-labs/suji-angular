(function (){

var myApp = angular.module('Manage', []);

// MANAGE VIEW
myApp.controller('ManageController', ['$scope', '$http', '$rootScope',  function($scope, $http, $rootScope) {

  $scope.now = new Date();
  $scope.username = $rootScope.globals.currentUser.username;
	$scope.logOut = function() {
	};

	var validate = function() {
		if (($scope.item.NAME === "") || ($scope.item.PRICE === "") || ($scope.item.COST === ""))
			return false;
		if ($scope.item.CATEGOTY_NAME === "") $scope.item.category = "None";

		return true;
	};

    var getStoreInfo = function(){
      $http.get('/api/v1.1/user/store/' + $scope.username).success(function(response) {
        $scope.store = response;
      });
    };
    getStoreInfo();
  var getCategories = function(){
      $http.get('/api/v1.1/category/' + $scope.username).success(function(response){
        $scope.categories = response;
      });
    };
  getCategories();

	var clear = function() {
		$scope.item = {NAME: "",
						PRICE: "",
						COST: "",
						CATEGOTY_NAME: "",
						TAX_MODE: false};
	};

	var refresh = function() {
		$http.get('/api/v1.1/menu').success(function(response) {
			$scope.itemlist = response;
		});
	};

	refresh();
	clear();

	$scope.addItem = function() {
		if (!validate()) return;

		$http.post('/api/v1.1/menu/insert', $scope.item).success(function(response) {
			if (response) console.log(response);
			refresh();
		});
		clear();
	};

	$scope.removeItem = function(name) {
		$http.post('/api/v1.1/menu/delete', name).success(function(response) {
			if (response) console.log(response);
			refresh();
		});
	};

	$scope.editItem = function(item) {
		$http.get('/api/v1.1/menu/' + item.NAME).success(function(response) {
			$scope.item = response;
		});
	};

	$scope.update = function() {
		if (!validate()) return;

		$http.put('/itemlist/' + $scope.item._id, $scope.item).success(function(response) {
			refresh();
		});
		clear();
	};
}]);

})();