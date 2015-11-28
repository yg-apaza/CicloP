var app = angular.module('myAppHome',[]);

app.controller('myCtrlHome',  function($scope,$http,$window) {
  //$scope.usuario = {username:'',nombre:'', apellidos:'', correo:''};
  //$scope.proyectos = [{nombre: 'proyecto 1'},{nombre: 'proyecto 2'}];
  
	  $http.post('/fproyecto/verProyectos')
		.success(function(data) {
				$scope.proyectos = data;
	  });
	
  $http.post('/fusuario').success(function(data) {
		$scope.usuario = data;
  });
  $http.post('/fnotificacion').success(function(data) {
		$scope.notificaciones = data.notificaciones;
		$scope.noleidos = data.noleidos;
  });
  //$http.post('/fproyectos').success(function(data) {
  //	$scope.proyectos = data;
  //});
  
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
  
});

