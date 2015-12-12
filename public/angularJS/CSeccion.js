var app = angular.module('myAppHome');

app.controller('myCtrlSeccion',  function($scope,$http,$window) {


	//$scope.items = [{nombre:'hoho'},{nombre:'naruto'}];

	$http.post('/flista/getLista')
	.success(function(data){
			if(data.status){
				alert(JSON.stringify(data));
				$scope.items = data.items;
			}
			else 
				alert("Problemas internos");
	});

});