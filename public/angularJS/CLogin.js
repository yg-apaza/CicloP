var app = angular.module('myAppUsuario',[]);

app.controller('myCtrlUsuario',  function($scope,$http,$window) {
  	$scope.cuenta = {username:'',password:''};
  	
  	$scope.ingresar = function(){
		$http.post('/fusuario/login', $scope.cuenta)
			.success(function(data) {
					$scope.cuenta = {}; // Borramos los datos del formulario
					$scope.respuestaServer = data;
					if($scope.respuestaServer.status)
						$window.location.href = "/home";
					else
						$scope.respuestaServerIngreso =  data.message;
			});
  	};
});

app.controller('myCtrlUsuarioReg',  function($scope,$http,$window) {
	$scope.cuentaReg = {nombre:'', apellidos:'', usuario:'', correo:'', clave:''};
	$scope.respuestaServer = '';
	$scope.claveVerificar = '';	

	$scope.registrar = function() {
		if ($scope.claveVerificar == $scope.cuentaReg.clave){ 
			$http.post('/fusuario/register', $scope.cuentaReg)
			.success(function(data) {

					if(data.status){
						$window.location.href = "/ingresar";
					}
					else {
						if(data.messageUsuario){
							$scope.respuestaServer_usuario = "Usuario registrado";
							$scope.respuestaServer_correo = "";
						}
						
						if(data.messageCorreo){
							$scope.respuestaServer_correo = "Correo registrado";
							$scope.respuestaServer_usuario = "";
						}

					}
			});
		}
	};

});

app.controller('myCtrlRecuperarCuenta', function($scope,$http,$window){
	
	$scope.correoUsuario="";

	$scope.recuperarCuenta = function (){
		$http.post('/fusuario/recuperar', {correo: $scope.correoUsuario})
		.success(function(data) {
			if(data.status){
				$window.location.href= "/cambiarClave";
			}
			else{
				$('#msjRespuesta').modal('show');
				$scope.mensajeRecuperacion = "Correo no se encuentra asociado a ninguna cuenta";
			}
			
		});
	};
});

app.controller('myCtrlCambiarClave', function($scope,$http,$window){
	
	$scope.cambiarClave = function (){
		if($scope.clave == $scope.claveVerificar){
			$http.post('/fusuario/cambiarContrasena', {token: $scope.codigo, password: $scope.clave})
			.success(function(data) {
				if(data.status){
					$('#msjRespuestaCambioClaveExito').modal('show');
					$window.location.href="/ingresar";
				}
				else
					$('#msjRespuestaCambioClaveFracaso').modal('show');
			});
		}
	};
	
});