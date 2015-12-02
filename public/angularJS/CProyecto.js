var app = angular.module('myAppProyecto',['myAppHome']);

app.controller('myCtrlAgregarProyecto',  function($scope,$http,$window) {
	//1: existe 2: no existe 3:invalido
	$scope.roles = [{valor: 1, nombre:'Diseñador'},{valor: 2, nombre:'Probador'}];
	$scope.usuarios = [
	    {username:'', rol:''},
		{username:'', rol:''},
		{username:'', rol:''},
		{username:'', rol:''},
		{username:'', rol:''}
	];
	
	$scope.estadosMsj = [
	    {username:'', msjEstado: "no existe", estado: 2, rol:''},
	    {username:'', msjEstado: "no existe", estado: 2, rol:''},
	    {username:'', msjEstado: "no existe", estado: 2, rol:''},
	    {username:'', msjEstado: "no existe", estado: 2, rol:''},
	    {username:'', msjEstado: "no existe", estado: 2, rol:''},
	];
	
	for (i = 0; i < $scope.usuarios.length; i++) { 
	      $scope.usuarios[i].msjEstado = $scope.estadosMsj[i].msjEstado;
	      $scope.usuarios[i].estado = $scope.estadosMsj[i].estado;
	}
	
	$scope.newProject = {};
	$scope.myProject = {};
	
	$scope.respuestaServidorProyecto;
	
	$scope.actualizarUsuarios = function (){
		$http.post('fusuario/validate',{nuevos: $scope.usuarios})
		.success(function(data) {
				if(data.status){
					$scope.estadosMsj = data.usuarios;
					for (i = 0; i < $scope.usuarios.length; i++) { 
					      $scope.usuarios[i].msjEstado = $scope.estadosMsj[i].msjEstado;
					      $scope.usuarios[i].estado = $scope.estadosMsj[i].estado;
					}
				}
		});
	}
	
	$scope.crearProyecto = function(){
		$scope.newProject.usuarios = $scope.usuarios;
		$http.post('/fproyecto/agregar', $scope.newProject)
		.success(function(data) {
				$scope.respuestaServer = data;
				if($scope.respuestaServer.status){
					$scope.respuestaServidorProyecto = "";
					$window.location.href = "/verProyecto";	
				}
				else{
					$scope.respuestaServidorProyecto = "No se creo proyecto";
				}
		});	
	};
	
	$scope.classEstado = function(stado){
	     if (stado==1)return "label label-success";
	     else if(stado==2)return "label label-danger";
	     else if(stado==3)return "label label-warning";   
	};	

});

app.controller('myCtrlModificarProyecto',  function($scope,$http,$window) {
	//1: existe 2: no existe 3:invalido
	$scope.roles = [{valor: 1, nombre:'Diseñador'},{valor: 2, nombre:'Probador'}];
	$scope.rol = ["","Diseñador","Probador"];
	$scope.newProject = {};
	//$scope.myProject = {};
	$scope.User = {};

	$http.post('/fproyecto/verUltimoProyecto')
	.success(function(data) { 
			if(data.status){
				$scope.newProject = data.proyecto;
				$scope.User.anteriores = data.usuarios;
			}
			else{
				alert("error Servidor");
			}
	});	
	
	$scope.User.nuevos = [
	    {username:'', rol:''},
		{username:'', rol:''},
		{username:'', rol:''},
		{username:'', rol:''},
		{username:'', rol:''}
	];
	
	$scope.estadosMsj = [
	    {username:'', msjEstado: "no existe", estado: 2, rol:''},
	    {username:'', msjEstado: "no existe", estado: 2, rol:''},
	    {username:'', msjEstado: "no existe", estado: 2, rol:''},
	    {username:'', msjEstado: "no existe", estado: 2, rol:''},
	    {username:'', msjEstado: "no existe", estado: 2, rol:''},
	];
	
	for (i = 0; i < $scope.User.nuevos.length; i++) { 
	      $scope.User.nuevos[i].msjEstado = $scope.estadosMsj[i].msjEstado;
	      $scope.User.nuevos[i].estado = $scope.estadosMsj[i].estado;
	}
	
	
	$scope.respuestaServidorProyecto;
	
	$scope.actualizarUsuarios = function (){
		$http.post('fusuario/validate',$scope.User)
		.success(function(data) {
				if(data.status){
					$scope.estadosMsj = data.usuarios;
					for (i = 0; i < $scope.User.nuevos.length; i++) { 
					      $scope.User.nuevos[i].msjEstado = $scope.estadosMsj[i].msjEstado;
					      $scope.User.nuevos[i].estado = $scope.estadosMsj[i].estado;
					}
				}
		});
	}
	
	$scope.guardarProyecto = function(){
		$scope.newProject.usuarios = $scope.User.nuevos;
		$http.post('/fproyecto/modificar', $scope.newProject)
		.success(function(data) {
				if(data.status){
					$scope.respuestaServidorProyecto = "";
					$window.location.href = "/verProyecto";	
				}
				else{
					$scope.respuestaServidorProyecto = "No se guardo proyecto";
				}
		});	
	};
	
	$scope.classEstado = function(stado){
	     if (stado==1)return "label label-success";
	     else if(stado==2)return "label label-danger";
	     else if(stado==3)return "label label-warning";   
	};	

});

app.controller('myCtrlVerProyecto',  function($scope,$http,$window) {
	
	$scope.myProject = {};
	
	$scope.respuestaServidorProyecto;

	$http.post('/fproyecto/verUltimoProyecto')
	.success(function(data){
			if(data.status)
				$scope.myProject = data.proyecto;
			else 
				alert("Problemas internos");
	});

});
