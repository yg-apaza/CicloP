var app = angular.module('myAppUsuario',[]);

app.controller('myCtrlUsuario',  function($scope) {
 $scope.cuenta = {usuario:'',clave:''};

  $scope.ingresar = function(){
        alert(JSON.stringify($scope.cuenta));
  };
});

app.controller('myCtrlUsuarioReg',  function($scope,$http) {
	$scope.cuentaReg = {nombre:'a', apellidos:'a', usuario:'ss', correo:'a', clave:'s', claveVerificacion:'a'};
	alert("estas en registrar");
	$scope.registrar = function(){
		alert(JSON.stringify($scope.cuentaReg));
		$http.post('/fusuario/register', $scope.cuentaReg)
		.success(function(data) {
			
				$scope.newPersona = {}; // Borramos los datos del formulario
				$scope.personas = data;
				alert(JSON.stringify($scope.personas));
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
  };
});