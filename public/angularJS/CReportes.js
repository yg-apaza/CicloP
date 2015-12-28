var app = angular.module('myAppHome');

app.controller('myCtrlReporte',  function($scope,$http) {

	$http.post('/fproyecto/reporte').success(function(data) {});

});