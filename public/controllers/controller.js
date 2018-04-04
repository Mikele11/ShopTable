(function(){

function GetAllService($http){
	
	function GetAll(){
      return $http.get('/shop/');
    }
	
    var factory = {
      GetAll: GetAll
    };

    return factory;	
  }
  
  function GetByIdService($http){
	
	function GetById(id){
      return $http.get('/shop/' + id);
    }

    var factory = {
      GetById: GetById
    };

    return factory;
  }
  
  function CreateService($http){
	
	function Create(data){
      return $http.post('/shop', data);
    }

    var factory = {
      Create: Create
    };

    return factory;

  }
  
  function UpdateService($http){
	
	function Update(id,recept){
      return $http.put('/shop/' + id, recept)
    }

    var factory = {
      Update: Update
    };

    return factory;

  }
  
  function DeleteService($http){
	
    function Delete(id){
      return $http.delete('/shop/' + id);
    }

    var factory = {
      Delete: Delete
    };
	
    return factory;

  }
  
function Controller($scope, GetAllService,GetByIdService,CreateService,UpdateService,DeleteService) {

console.log("I am in controller");
	$scope.filteredTodos = []
   ,$scope.currentPage = 1
   ,$scope.numPerPage = 3
   ,$scope.maxSize = 5
   ,$scope.priceIndex = 0;

   
	var refresh = function() {
		var promise = GetAllService.GetAll();
		promise.then(function(response){
		$scope.shop = response.data;
		$scope.len=$scope.shop.length;
		$scope.page=Math.ceil($scope.len/$scope.numPerPage);
		$scope.contact = "";
		$scope.myCategory = [
			{model : "Еда"},
			{model : "Одежда"},
			{model : "Електро товары"},
			{model : "Строй материалы"}
		];
		});
	};
	refresh();
	//панинация
	$scope.numPages = function () {
		var promise = GetAllService.GetAll();
		promise.then(function(response){
			$scope.shop = response.data;
			$scope.numPages= Math.ceil($scope.shop.length / $scope.numPerPage);
		}); 
	};
	  
	var pagin = function() {
		$scope.$watch('currentPage + numPerPage', function() {
			var promise = GetAllService.GetAll();
			promise.then(function(response){
				$scope.shop = response.data;
				var begin = (($scope.currentPage - 1) * $scope.numPerPage);
				var end = begin + $scope.numPerPage; 
				$scope.filteredTodos = $scope.shop.slice(begin, end);
			});
		});
	};
	pagin();  
	//конец пагинации
	$scope.addContact = function() {
		var promise = CreateService.Create($scope.contact);
		promise.then(function(){
			pagin();			  
			refresh();
		}); 
	};
	$scope.remove = function(id) {
	  var promise = DeleteService.Delete(id);
		promise.then(function(){
			pagin();			  
			refresh();
		});  
	};

	$scope.edit = function(id) {
		var promise = GetByIdService.GetById(id);
		promise.then(function(response){
			$scope.contact = response.data;
		});
	};  

	$scope.update = function() {
		var promise = UpdateService.Update($scope.contact._id, $scope.contact);
		promise.then(function(response){
			pagin();
			refresh();
		});
	};
	$scope.deselect = function() {
		  $scope.contact = "";
	}

};//Controller

angular
.module('myApp', [])
.factory('GetAllService', GetAllService)
.factory('GetByIdService', GetByIdService)
.factory('CreateService', CreateService)
.factory('UpdateService', UpdateService)
.factory('DeleteService', DeleteService)
.controller('AppCtrl', Controller);

})();