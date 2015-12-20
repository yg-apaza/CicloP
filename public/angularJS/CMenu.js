var app = angular.module('myAppHome');

//MENU PARTE SUPERIOR
app.controller('myCtrlMenu',  function($scope,$http,$window) {
  $scope.rolUsuario = 'Usuario';
  $http.post('/fusuario').success(function(data) {
		$scope.usuario = data;
  });
});

//MENU PARTE SUPERIOR DENTRO DE PROYECTO
app.controller('myCtrlMenuSec',  function($scope,$http,$window) {
  //$scope.usuario = {username:'',nombre:'', apellidos:'', correo:''};
  //$scope.proyectos = [{nombre: 'proyecto 1'},{nombre: 'proyecto 2'}];

  var rolesUsuarios = ['Usuario','Diseñador','Probador','Coordinador'];
  $scope.rol = 0;
  $http.post('/flista/rol')
    .success(function(data){
      if(data.status){
          $scope.rolUsuario = rolesUsuarios[data.rol];    
          $scope.rol = data.rol;    
      }
      else 
        alert("Problemas internos");
  });

  $http.post('/fusuario').success(function(data) {
    $scope.usuario = data;
  });

}); 

//MENU PARTE INFERIOR
app.controller('myCtrlMenuProyectos',function($scope,$http,$window){
  
  $http.post('/fproyecto/verProyectos')
    .success(function(data) {
        $scope.proyectos = data;
  });

  $scope.enviarID = function(id){
    $scope.temp = {};
    $scope.temp.id = id;
    $http.post('/fproyecto/guardarId',$scope.temp)
    .success(function(data) {
        if(data.status)
          $window.location.href = "/verProyecto";     
     });
  };
});
