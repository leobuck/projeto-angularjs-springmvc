var app = angular.module('loja', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when("/", { controller: "listController", templateUrl: "list.html" })
		.when("/edit/:name", { controller: "editController", templateUrl: "form.html" })
		.when("/new", { controller: "newController", templateUrl: "form.html" })
		.otherwise({ redirectTo: "/" });
});

app.run(function($rootScope) {
	$rootScope.frutas = ['Banana', 'Melancia', 'Pera'];
});

app.controller('listController', ['$scope', function($scope) {

}]);

app.controller('editController', ['$scope', function editController($scope, $location, $routeParams) {
	$scope.title = 'Editar fruta';
	$scope.fruta = $routeParams.name;
	$scope.frutaIndex = $scope.frutas.indexOf($scope.fruta);
	
	$scope.salvar = function () {
		$scope.frutas[$scope.frutaIndex] = $scope.fruta;
		$location.path('/');
	};
}]);

app.controller('newController', ['$scope', function newController($scope, $location) {
	$scope.title = 'Nova fruta';
	$scope.fruta = '';
	
	$scope.salvar = function () {
		$scope.frutas.push($scope.fruta);
		$location.path('/');
	};
}]);

app.controller('primeiroController', ['$scope', function($scope) {
	$scope.user = { meuNome: 'João da Silva' };
	
	$scope.contador = 0;
	
	$scope.addContador = function() {
		$scope.contador++;
	};
	
	$scope.pessoas = ['Ana', 'Maria', 'José', 'João'];
	
}]);