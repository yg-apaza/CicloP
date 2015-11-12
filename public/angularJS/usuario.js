var app = angular.module('myAppUsuario',[]);

app.controller('myCtrlUsuario',  function($scope) {
 $scope.cuenta = {usuario:'',clave:''};

  $scope.ingresar = function(){
        alert(JSON.stringify($scope.cuenta));
  };
});

app.controller('myCtrlUsuarioReg',  function($scope) {
 $scope.cuenta = {nombre:'', apellidos:'', usuario:'', correo:'', clave1:'', clave2:''};
  $scope.registrar = function(){
        alert(JSON.stringify($scope.cuentaReg));
  };
});


$http.get('/api/cuenta').success(function(data) {
		$scope.cuenta = data;
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

