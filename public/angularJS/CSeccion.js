var app = angular.module('myAppHome');

app.controller('myCtrlSeccion',  function($scope,$http,$window) {

	//$scope.items = [{nombre:'hoho'},{nombre:'naruto'}];
	$http.post('/flista/getLista')
		.success(function(data){
			if(data.status){
				$scope.secciones = data.secciones;
			}
			else 
				alert("Problemas internos");
	});

	$scope.guardarSecciones = function (tipo){
		
		var urlGuardarSecciones = '/flista/guardarCambios';

		if(tipo=1)
			urlGuardarSecciones = '/flista/publicar';
		

		$http.post(urlGuardarSecciones,{secciones: $scope.secciones})
			.success(function(data){
				if(data.status){	
					$scope.respuestaServidor = "Se guardaron correctamente";
					$('#msjRespuesta').modal('show');
				}
				else{
					$scope.respuestaServidor = "No se guardaron correctamente";
					$('#msjRespuesta').modal('show');
				}
		});
	}
});