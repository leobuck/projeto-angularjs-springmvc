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

app.controller('listController', ['$scope', '$routeParams', '$rootScope', '$route', '$location', 
	function($scope, $routeParams, $rootScope, $route, $location) {

}]);

app.controller('editController', ['$scope', '$routeParams', '$rootScope', '$route', '$location', 
	function editController($scope, $routeParams, $rootScope, $route, $location) {
	$scope.title = 'Editar fruta';
	$scope.fruta = $routeParams.name;
	$scope.frutaIndex = $scope.frutas.indexOf($scope.fruta);
	
	$scope.salvar = function () {
		$scope.frutas[$scope.frutaIndex] = $scope.fruta;
		$location.path('/');
	};
}]);

app.controller('newController', ['$scope', '$routeParams', '$rootScope', '$route', '$location',
	function newController($scope, $routeParams, $rootScope, $route, $location) {
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

app.directive('minhaDiretiva', function() {
	return {
		template: 'Fui feito em um construtor de diretriz!'
	};
});

app.controller('personCtrl', ['$scope', function($scope) {
	$scope.firstName = 'John';
	$scope.lastName = 'Doe';
}]);

app.controller('namesCtrl', ['$scope', function($scope) {
	$scope.names = [
		{name: 'Jani', country: 'Norway'},
		{name: 'Carl', country: 'Sweden'},
		{name: 'Margareth', country: 'England'},
		{name: 'Hege', country: 'Norway'},
		{name: 'Joe', country: 'Denmark'},
		{name: 'Gustav', country: 'Sweden'},
		{name: 'Birgit', country: 'Denmark'},
		{name: 'Mary', country: 'England'},
		{name: 'Kai', country: 'Norway'}
	];
}]);

app.controller('costCtrl', ['$scope', function($scope) {
	$scope.price = 58;
}]);

app.controller('namesCtrl2', ['$scope', function($scope) {
	$scope.names = [
		'Jani',
		'Carl',
		'Margareth',
		'Hege',
		'Joe',
		'Gustav',
		'Birgit',
		'Mary',
		'Kai',
	];
}]);

app.controller('namesCtrl3', ['$scope', function($scope) {
	$scope.names = [
		'Jani',
		'Carl',
		'Margareth',
		'Hege',
		'Joe',
		'Gustav',
		'Birgit',
		'Mary',
		'Kai',
	];
}]);

app.controller('namesCtrl4', ['$scope', function($scope) {
	$scope.names = [
		{name: 'Jani', country: 'Norway'},
		{name: 'Carl', country: 'Sweden'},
		{name: 'Margareth', country: 'England'},
		{name: 'Hege', country: 'Norway'},
		{name: 'Joe', country: 'Denmark'},
		{name: 'Gustav', country: 'Sweden'},
		{name: 'Birgit', country: 'Denmark'},
		{name: 'Mary', country: 'England'},
		{name: 'Kai', country: 'Norway'}
	];
	
	$scope.orderByMe = function (x) {
		$scope.myOrderBy = x;
	};
}]);

app.controller('localizacao', ['$scope', '$location', function($scope, $location) {
	$scope.myUrl = $location.absUrl();
}]);

app.controller('controllerTimeOut', ['$scope', '$timeout', function($scope, $timeout) {
	$scope.timermsg = 'Oi!';
	$timeout(function() {
		$scope.timermsg = 'Oi depois de 3 segundos.';
	}, 3000);
}]);

app.controller('controllerIntervalo', ['$scope', '$interval', function($scope, $interval) {
	$scope.intervalo = new Date().toLocaleTimeString();
	$interval(function() {
		$scope.intervalo = new Date().toLocaleTimeString();
	}, 1000);
}]);
