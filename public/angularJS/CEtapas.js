var app = angular.module('myAppHome');

app.controller('myCtrlEtapasProyecto',  function($scope,$http,$window) {
		
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

	$http.post('/flista/verEtapa')
	.success(function(data){
			if(data.status){
				$scope.etapa = data.etapa;
			}
			else 
				alert("Problemas internos");
	});

	//FUNCIONES
	
	$scope.guardarEtapa = function (id){
		$http.post('/flista/guardarEtapa',{etapa: id})
		.success(function(data){
			if(data.status)
				$window.location.href = "/etapa";
			else 
				alert("Error del Servidor");
		});
	};

	$scope.listaChekeo = function (id){
		$http.post('/flista/guardarIdLista',{idLista: id})
		.success(function(data){
			if(data.status)
				$window.location.href = "/seccion";
			else 
				alert("Error del Servidor");
		});
	}
});

