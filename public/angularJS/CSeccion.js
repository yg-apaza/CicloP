var app = angular.module('myAppHome');

app.controller('myCtrlSeccion',  function($scope,$http,$window) {

	//$scope.items = [{nombre:'hoho'},{nombre:'naruto'}];
	$http.post('/flista/getLista')
		.success(function(data){
			if(data.status){
				$scope.nombreLista = data.nombreLista;
				$scope.secciones = data.secciones;
			}
			else 
				alert("Problemas internos");
	});

	$scope.guardarSecciones = function (tipo){
		
		var urlGuardarSecciones = '/flista/guardarCambios';

		if(tipo==1){
			urlGuardarSecciones = '/flista/publicar';
		}
		
		$http.post(urlGuardarSecciones,{secciones: $scope.secciones})
			.success(function(data){
				if(data.status){	
					$scope.respuestaServidor = "Operacion realizado con exito";
					$('#msjRespuesta').modal('show');
					$window.location.href="/etapa";
				}
				else{
					$scope.respuestaServidor = "No se pudo realizar la operacion";
					$('#msjRespuesta').modal('show');
				}
		});
	}
});