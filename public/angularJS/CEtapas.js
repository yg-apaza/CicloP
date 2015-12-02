var app = angular.module('myAppEtapa',['myAppHome']);

app.controller('myCtrlEtapasProyecto',  function($scope,$http,$window) {
	
	$scope.myProject = {};
	
	$scope.respuestaServidorProyecto;

	$http.post('/fproyecto/verUltimoProyecto')
	.success(function(data){
			if(data.status)
				$scope.myProject = data.proyecto;
			else 
				alert("Problemas internos");
	});	

	$scope.listaChekeo = function(num){
		
	};	
});

