var app = angular.module('loja', ['ngRoute', 'ngResource', 'ngAnimate', 'ngLocale']);

app.config(function($routeProvider) {
	$routeProvider
		.when("/list", { controller: "listController", templateUrl: "list.html" })
		.when("/edit/:name", { controller: "editController", templateUrl: "form.html" })
		.when("/new", { controller: "newController", templateUrl: "form.html" })
		.when("/clientelist", { controller: "clienteController", templateUrl: "cliente/list.html" })
		.when("/clienteedit/:id", { controller: "clienteController", templateUrl: "cliente/cadastro.html" })
		.when("/cliente/cadastro", { controller: "clienteController", templateUrl: "cliente/cadastro.html" })
		.otherwise({ redirectTo: "/" });
});

app.controller('clienteController', ['$scope', '$http', '$location', '$routeParams',
	function($scope, $http, $location, $routeParams) {
	
	if ($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != '') {
		$scope.cliente = {'id': $routeParams.id};
		
		$http.get("cliente/buscarCliente/" + $routeParams.id).then(function(response) {
			$scope.cliente = response.data;
		}, function(response) {
			erro("Erro: " + response.status);
		});
	} else {
		$scope.cliente = {};
	}
	
	$scope.editarCliente = function(id) {
		$location.path("clienteedit/" + id);
	}
	
	$scope.salvarCliente = function() {
		$http.post("cliente/salvar", $scope.cliente).then(function(response) {
			$scope.cliente = {};
			sucesso("Salvo com sucesso!");
		}, function(response) {
			erro("Erro: " + response.status);
		});
	}
	
	$scope.listarClientes = function() {
		$http.get("cliente/listar").then(function(response) {
			$scope.data = response.data;
		}, function(response) {
			erro("Erro: " + response.status);
		});
	};
	
	$scope.removerCliente = function(id) {
		$http.delete("cliente/deletar/" + id).then(function(response) {
			$scope.listarClientes();
			sucesso("Removido com sucesso!");
		}, function(response) {
			erro("Erro: " + response.status);
		});
	};
	
	$scope.limparForm = function() {
		$scope.cliente = {};
		$scope.formCliente.$setPristine();
	};
	
	function sucesso(msg) {
		$.notify({
			message: msg
		},
		{
			type: 'success',
			timer: 1000
		});
	}
	
	function erro(msg) {
		$.notify({
			message: msg
		},
		{
			type: 'danger',
			timer: 1000
		});
	}
}]);

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

app.controller('pegarRespostaController', ['$scope', '$http', function($scope, $http) {
	$scope.pegarResposta = function() {
		$http.get("pegarResposta").then(function(response) {
			document.getElementById("resposta").value = "" + response.data;
		});
	}
}]);

app.controller('pegarRespostaController2', ['$scope', '$http', function($scope, $http) {
	$scope.pegarResposta2 = function() {
		$http.get("pegarResposta").then(function(response) {
			document.getElementById("resposta2").value = "" + response.data;
			document.getElementById("resposta3").value = "" + response.status;
			document.getElementById("resposta4").value = "" + response.statusText;
		});
	}
}]);

app.controller('pegarRespostaErroController', ['$scope', '$http', function($scope, $http) {
	$scope.pegarRespostaErro = function() {
		$http.get("pegarRespostaErro").then(function(response) {
			document.getElementById("respostaErro").value = "" + response.status;
		}, function(response) {
			document.getElementById("respostaErro").value = "" + response.status;
		});
	}
}]);

app.controller('pegarRespostaJsonController', ['$scope', '$http', function($scope, $http) {
	$http.get("pegarRespostaJson").then(function(response) {
		$scope.lista = response.data;
	});
}]);

app.controller('namesController', ['$scope', function($scope) {
	$scope.names = ["Emil", "Tobias", "Linus"];
}]);

app.controller('pessoaController', ['$scope', '$resource', function($scope, $resource) {
	//pessoas = $resource("/pessoas/:codPessoa");
	
	pessoas = $resource("/projeto-angularjs-springmvc/pessoas?codPessoa=:codPessoa");
	
	$scope.getPorId = function() {
		pessoas.get({codPessoa : $scope.codPessoa}, function(data) {
			$scope.objetoPessoa = data;
		});
	};
	
	$scope.getTodos	= function() {
		pessoas.query(function(data) {
			$scope.objetoPessoa = data;
		});
	};
	
	$scope.salvarPessoa = function() {
		p = new pessoas();
		p.numero = '12345678';
		p.$save();
	};
	
	$scope.deletarPessoa = function() {
		pessoas.$delete({codPessoa: "1"});
	};
}]);

app.controller('clickController', ['$scope', function($scope) {
	$scope.showMe = false;
	$scope.myFunc = function() {
		$scope.showMe = !$scope.showMe;
	}
}]);

app.controller('coordenadasController', ['$scope', function($scope) {
	$scope.myFunc = function(myE) {
		$scope.x = myE.clientX;
		$scope.y = myE.clientY;
	}
}]);

app.controller('formCtrl', ['$scope', function($scope) {
	$scope.master = {firstName: "John", lastName: "Doe"};
	$scope.reset = function() {
		$scope.user = angular.copy($scope.master);
	};
	$scope.reset();
}]);

app.factory("UserService", function() {
	var users = ["Ivete", "Alex", "Paulo"];
	
	return {
		all: function() {
			return users;
		},
		primeiro: function() {
			return users[0];
		}
	};	
});

primeiroUserController = app.controller('primeiroUserController',  
	function($scope, UserService) {
		$scope.primeiro = UserService.primeiro();
});

primeiroUserController.$inject = ["$scope", "UserService"];

todosUserController = app.controller('todosUserController',  
	function($scope, UserService) {
		$scope.todos = UserService.all();
});

todosUserController.$inject = ["$scope", "UserService"];

app.controller('filterController', ['$scope', function($scope) {
	$scope.friends = [
		{name: "Mario", lastName: "Souza", age: 20},
		{name: "Maria", lastName: "Quermina", age: 89},
		{name: "Paulo", lastName: "Mineiro", age: 49},
		{name: "Vanessa", lastName: "Pereira", age: 22}
	];
}]);
