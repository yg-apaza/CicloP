var app = angular.module('myAppUsuario',[]);

app.controller('myCtrlUsuario',  function($scope) {
 $scope.cuenta = {usuario:'',clave:''};

  $scope.ingresar = function(){
        alert(JSON.stringify($scope.cuenta));
  };
});

app.controller('myCtrlUsuarioReg',  function($scope,$http) {
	$scope.cuentaReg = {nombre:'', apellidos:'', usuario:'', correo:'', clave:'', claveVerificacion:''};
	
	$scope.registrar = function(){
		
		$http.post('/fusuario/register', $scope.cuentaReg)
		.success(function(data) {
				$scope.newPersona = {}; // Borramos los datos del formulario
				$scope.respuestaServer = data;
				alert(JSON.stringify($scope.respuestaServer));
				
		});
  };
});