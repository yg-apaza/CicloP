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

	$scope.listaChekeo = function (id,rol){

		$http.post('/flista/guardarIdLista',{idLista: id})
		.success(function(data){
			if(data.status){
				if(rol==1){
					$window.location.href = "/seccion";
				}
				else if(rol==2){
					$window.location.href = "/seccionProbador";
				}
				
			}
			else 
				alert("Error del Servidor");
		});
	};


	$scope.colorEstado = function(estado){
	//0: No publicado, 1: Publicado, 2: En proceso, 3: Aprobada, 4: Desaprobada
     if (estado == 0)
	  return {color:'lead'};//plomo
     if (estado == 1)
   	  return {color:'green'};//Verde
   	 if (estado == 2)
   	  return {color:'yellow'};//Amarillo
     if (estado == 3)
   	  return {color:'blue'};//Azul
     if (estado == 4)
   	  return {color:'red'};//Rojo
  };
});

