var app = angular.module('myAppHome');

app.controller('myCtrlListas',  function(objUsuario, $scope,$http,$window) {
	$scope.listasDisponibles = [{nombre:'2'}];
	$scope.listaAgregar = {};
	$scope.reutilizar = 0;
	$scope.arrListasDisponibles = ['','Lista de chequeo de requisitos',
									'Lista de chequeo de Plan de testing',
									'Lista de chequeo de artefactos de análisis y diseño',
									'Lista de chequeo de estándares de programación',
									'Lista de chequeo de interfaces a nivel comportamental',
									'Lista de chequeo de casos de prueba diseñados',
									'Lista de chequeo de casos de prueba ejecutados y de reporte de errores',
									'Lista de chequeo de instalación'
								];

	$scope.myProject = {};
	$scope.rol = 0;
	$scope.listas = [{}];
	$scope.respuestaServidorProyecto;
	$scope.etapa = 0;

	//CARGAMOS DATOS

	$http.post('/fproyecto/verUltimoProyecto')
		.success(function(data){
			if(data.status)
				$scope.myProject = data.proyecto;
			else 
				alert("Problemas internos");
	});	
	
	$http.post('/flista/listasDisponibles')
		.success(function(data){
			if(data.status){
			 	$scope.listasDisponibles  = data.listas;
			}
			else 
				alert("Problemas internos");
	});	

	$http.post('/flista/probadores')
		.success(function(data){
			if(data.status){
			 	$scope.probadores  = data.probadores;
			}
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

	$scope.agregarLista = function (id){
		$http.post('/flista/guardarLista',$scope.listaAgregar)
			.success(function(data){
				if(data.status)
					$window.location.href = "/etapa";
				else 
					alert("Error del Servidor");
			});
	};

	$scope.verificarLista = function (){
		//$scope.reutilizar = 1;

	};

});

