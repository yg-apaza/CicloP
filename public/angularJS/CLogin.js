var app = angular.module('myAppUsuario',[]);

app.controller('myCtrlUsuario',  function($scope,$http,$window) {
  $scope.cuenta = {username:'',password:''};
  $scope.ingresar = function(){
	  
	  $http.post('/fusuario/login', $scope.cuenta)
		.success(function(data) {
				$scope.cuenta = {}; // Borramos los datos del formulario
				$scope.respuestaServer = data;
				if($scope.respuestaServer.status)
					$window.location.href = "/home";
				else
					alert(JSON.stringify($scope.respuestaServer));
		});
  };
});

app.controller('myCtrlUsuarioReg',  function($scope,$http) {
	$scope.cuentaReg = {nombre:'', apellidos:'', usuario:'', correo:'', clave:''};
	
	$scope.registrar = function(){
		$http.post('/fusuario/register', $scope.cuentaReg)
		.success(function(data) {
				$scope.cuentaReg = {}; // Borramos los datos del formulario
				$scope.respuestaServer = data;
				alert(JSON.stringify($scope.respuestaServer));
		});
	};
});