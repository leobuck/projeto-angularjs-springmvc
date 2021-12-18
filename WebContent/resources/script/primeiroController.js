var app = angular.module('loja', []);

app.controller('primeiroController', ['$scope', function($scope) {
	$scope.user = { meuNome: 'João da Silva' };
	
	$scope.contador = 0;
	
	$scope.addContador = function() {
		$scope.contador++;
	};
	
	$scope.pessoas = ['Ana', 'Maria', 'José', 'João'];
	
}]);
