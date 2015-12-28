var app = angular.module('myAppHome');

app.controller('myCtrlAgregarProyecto',  function($scope,$http,$window) {
	//1: existe 2: no existe 3:invalido
	$scope.roles = [{valor: 1, nombre:'Diseñador'},{valor: 2, nombre:'Probador'}];
	$scope.usuarios = [
	    {username:'', rol:''},
		{username:'', rol:''},
		{username:'', rol:''}
	];
	
	$scope.estadosMsj = [
	    {username:'', msjEstado: "no existe", estado: 2, rol:''},
	    {username:'', msjEstado: "no existe", estado: 2, rol:''},
	    {username:'', msjEstado: "no existe", estado: 2, rol:''}
	];
		
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
	};
	
	$scope.agregarUsuarios = function (){
		$scope.usuarios.push({username:'', rol:'',msjEstado:'',estado:''});
		$scope.estadosMsj.push({username:'', msjEstado: "no existe", estado: 2, rol:''});
	};

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
					$scope.respuestaServidorProyecto = "No se creo proyecto debido a que " + data.message;
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
	$scope.User = {};
	$scope.ProyectoGeneral = {};
	$scope.roles = [{valor: 1, nombre:'Diseñador'},{valor: 2, nombre:'Probador'}];
	$scope.rol = ["","Diseñador","Probador"];
	$scope.newProject = {};
	//$scope.myProject = {};
	$scope.User.nuevos = [
	    {username:'', rol:''},
	];
	
	$scope.estadosMsj = [
	    {username:'', msjEstado: "no existe", estado: 2, rol:''},
	];	

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
	};
	
	$scope.guardarProyecto = function(){
		$scope.ProyectoGeneral.datos = $scope.newProject;
		$scope.ProyectoGeneral.nuevos = $scope.User.nuevos;
		$scope.ProyectoGeneral.anteriores = $scope.User.anteriores;

		$http.post('/fproyecto/modificar', $scope.ProyectoGeneral)
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

	$scope.agregarUsuarios = function (){
		$scope.User.nuevos.push({username:'', rol:'',msjEstado:'',estado:''});
		$scope.estadosMsj.push({username:'', msjEstado: "no existe", estado: 2, rol:''});
	};	

	$scope.classEstado = function(stado){
	     if (stado==1)return "label label-success";
	     else if(stado==2)return "label label-danger";
	     else if(stado==3)return "label label-warning";   
	};	

});

app.controller('myCtrlVerProyecto',  function($scope,$http,$window) {

	$http.post('/fproyecto/reporte').success(function(data) {});
	
	$scope.colorEstado = function(estado){
	//2: Culminado, 1: En proceso, 0: Inhabilitado

     if (estado == 0)
	  return {color:"#7A898F"};//Plomo
     if (estado == 1)
   	  return {color:"#FFFF00"};//Amarillo
   	 if (estado == 2)
   	  return {color:"#00FF00"};//Verde
  	};

	$scope.val1=0;
	$scope.val2=0;
	$scope.val3=0;
	$scope.val4=0;
	$scope.val5=0;

	$scope.myProject = {};
	$scope.respuestaServidorProyecto;
	$scope.arrEtapas = ['','Toma y Definición de Requisitos',
									'Analisis y Diseño',
									'Codificacion',
									'Pruebas',
									'Implantacion y mantenimiento'
								];
	
	$http.post('/fproyecto/verUltimoProyecto')
	.success(function(data){
		if(data.status){
			var val1=data.proyecto.etapas[0].puntaje;
			var val2=data.proyecto.etapas[1].puntaje;
			var val3=data.proyecto.etapas[2].puntaje;
			var val4=data.proyecto.etapas[3].puntaje;
			var val5=data.proyecto.etapas[4].puntaje;
			var val1Color = $scope.colorEstado(data.proyecto.etapas[0].estado).color;
			var val2Color = $scope.colorEstado(data.proyecto.etapas[1].estado).color;
			var val3Color = $scope.colorEstado(data.proyecto.etapas[2].estado).color;
			var val4Color = $scope.colorEstado(data.proyecto.etapas[3].estado).color;
			var val5Color = $scope.colorEstado(data.proyecto.etapas[4].estado).color;
			var micolor = [val1Color,val2Color,val3Color,val4Color,val5Color];

			$scope.myProject = data.proyecto;

			$(function()	{
				//Colorbox 
				$('.gallery-zoom').colorbox({
					rel:'gallery',
					maxWidth:'90%',
					width:'800px'
				});
			});
			$('.navbar-toggle').click(function(){setTimeout(function() {donutChart.redraw();},100);});
			
			var donutChart = Morris.Donut({
			  element: 'donutChart',
			  data: [
				{label: "Etapa 1 \n"+val1, value: 100},
				{label: "Etapa 2 \n"+val2, value: 100},
				{label: "Etapa 3 \n"+val3, value: 100},
				{label: "Etapa 4 \n"+val4, value: 100},
				{label: "Etapa 5 \n"+val5, value: 100}
			  ],
			  colors: micolor
			});
		}
		else 
			alert("Problemas internos");
	});

	$scope.guardarEtapa = function (id){
		$http.post('/flista/guardarEtapa',{etapa: id})
		.success(function(data){
			if(data.status)
				$window.location.href = "/etapa";
			else 
				alert("Error del Servidor");
		});
	};



	



});
