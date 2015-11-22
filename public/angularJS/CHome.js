var app = angular.module('myAppHome',[]);

app.controller('myCtrlHome',  function($scope,$http,$window) {
  //$scope.usuario = {username:'',nombre:'', apellidos:'', correo:''};
  $http.post('/fusuario').success(function(data) {
		$scope.usuario = data;
  });
	  
});

