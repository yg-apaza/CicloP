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


app.controller('myCtrlHome',  function($scope,$http,$window) {
	  //$scope.usuario = {username:'',nombre:'', apellidos:'', correo:''};
		
	  $http.post('/fusuario').success(function(data) {
			$scope.usuario = data;
	  });
	  $http.post('/fnotificacion').success(function(data) {
			$scope.notificaciones = data.notificaciones;
			$scope.noleidos = data.noleidos;
	  });
	  
	  $scope.colorIconClass = function(tipo){
		     if (tipo == 1)
			  return "notification-icon bg-danger";
		     if (tipo == 2)
		   	  return "notification-icon bg-success";
		     if (tipo == 3)
		   	  return "notification-icon bg-success";
		     if (tipo == 4)
		   	  return "notification-icon bg-warning";
	  };
	  
	  $scope.leerNotificacion = function(){
		  $http.post('/fnotificacion/verTodo')
			.success(function(data) {
					if(data.status)
						$scope.noleidos = 0;
		   });
	  }
	  
	  $scope.iconClass = function(tipo){
	     if (tipo == 1)
		  return "fa fa-bullhorn";
	     if (tipo == 2)
	   	  return "fa fa-group";
	     if (tipo == 3)
	   	  return "fa fa-check";
	     if (tipo == 4)
	   	  return "fa fa-warning";
	  };
	  
	  $scope.leerProyectos = function(){
		  
		  $http.post('/fproyectos/')
			.success(function(data) {
					$scope.proyectos = data;
		  });
	  }
	  
	  
	});

