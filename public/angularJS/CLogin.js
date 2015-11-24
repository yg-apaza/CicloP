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
					$scope.respuestaServer =  data.message;
		});
  };
});

app.controller('myCtrlUsuarioReg',  function($scope,$http,$window) {
	$scope.cuentaReg = {nombre:'', apellidos:'', usuario:'', correo:'', clave:''};
	$scope.respuestaServer = '';
	$scope.registrar = function(){
		$http.post('/fusuario/register', $scope.cuentaReg)
		.success(function(data) {
				if(data.status)
					$window.location.href = "/login";
				else{
					$scope.respuestaServer =  data.message;
				}
		});
	};
});