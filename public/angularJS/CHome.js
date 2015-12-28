var app = angular.module('myAppHome',[]);


app.controller('myCtrlHome',  function($scope,$http) {
	$scope.enviarMensaje = function (){

		$http.post('/dejarMensaje',{nombre: $scope.cliente.nombre, correo: $scope.cliente.correo, mensaje: $scope.cliente.mensaje})
		.success(function(data){
			if(data.status)
				$scope.cliente = "";
			else{
				alert("Problemas internos");
			}
		});
	};
});