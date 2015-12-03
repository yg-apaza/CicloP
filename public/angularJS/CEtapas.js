var app = angular.module('myAppHome');


app.controller('myCtrlEtapasProyecto',  function($scope,$http,$window) {
	
	$scope.myProject = {};
	$scope.rol = '';
	$scope.listas = [{}];
	$scope.respuestaServidorProyecto;

	$http.post('/fproyecto/verUltimoProyecto')
	.success(function(data){
			if(data.status)
				$scope.myProject = data.proyecto;
			else 
				alert("Problemas internos");
	});	

	$http.post('/flista/rol')
	.success(function(data){
			if(data.status){
				$scope.rol = data.rol;
			 	$scope.listas  = data.listas;
			}
			else 
				alert("Problemas internos");
	});	

	

});

