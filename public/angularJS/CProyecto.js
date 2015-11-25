var app = angular.module('myAppProyecto',[]);

app.controller('myCtrlAgregarProyecto',  function($scope,$http,$window) {

	$scope.roles = [{valor: 1, nombre:'Diseñador'},{valor: 2, nombre:'Probador'}];
	$scope.usuarios = [
		{username:'', msjEstado: "no existe", estado: false, rol:''},
		{username:'', msjEstado: "no existe", estado: false, rol:''},
		{username:'', msjEstado: "no existe", estado: false, rol:''},
		{username:'', msjEstado: "no existe", estado: false, rol:''},
		{username:'', msjEstado: "no existe", estado: false, rol:''}
	];

	$scope.newProject = {};
	$scope.crearProyecto = function(){
		$scope.newProject.usuarios = $scope.usuarios;
		alert(JSON.stringify($scope.newProject));
		$http.post('/fproyecto/agregar', $scope.newProject)
		.success(function(data) {
				$scope.cuenta = {}; // Borramos los datos del formulario
				$scope.respuestaServer = data;
				if($scope.respuestaServer.status)
					alert('Se creo proyecto');
				else
					alert('No Se creo proyecto');
		});
		
	};
	
	$scope.classEstado = function(stado){
	     if (stado)
		  return "label label-success";
	     else
	   	  return "label label-danger";
	};
	
	
	
});

