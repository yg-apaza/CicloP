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


});