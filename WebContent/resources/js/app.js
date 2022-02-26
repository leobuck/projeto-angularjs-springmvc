var app = angular.module('loja', ['ngRoute', 'ngResource', 'ngAnimate', 'ngLocale']);

app.config(function($routeProvider) {
	$routeProvider
		.when("/list", { controller: "listController", templateUrl: "list.html" })
		.when("/edit/:name", { controller: "editController", templateUrl: "form.html" })
		.when("/new", { controller: "newController", templateUrl: "form.html" })
		.when("/clientelist", { controller: "clienteController", templateUrl: "cliente/list.html" })
		.when("/clienteedit/:id", { controller: "clienteController", templateUrl: "cliente/cadastro.html" })
		.when("/cliente/cadastro", { controller: "clienteController", templateUrl: "cliente/cadastro.html" })
		.when("/fornecedorlist", { controller: "fornecedorController", templateUrl: "fornecedor/list.html" })
		.when("/fornecedoredit/:id", { controller: "fornecedorController", templateUrl: "fornecedor/cadastro.html" })
		.when("/fornecedor/cadastro", { controller: "fornecedorController", templateUrl: "fornecedor/cadastro.html" })
		.when("/livrolist", { controller: "livroController", templateUrl: "livro/list.html" })
		.when("/livroedit/:id", { controller: "livroController", templateUrl: "livro/cadastro.html" })
		.when("/livro/cadastro", { controller: "livroController", templateUrl: "livro/cadastro.html" })
		.when("/loja/online", { controller: "lojaController", templateUrl: "loja/online.html" })
		.when("/loja/itens/:itens", { controller: "lojaController", templateUrl: "loja/itens.html" })
		.otherwise({ redirectTo: "/" });
});

app.controller('clienteController', ['$scope', '$http', '$location', '$routeParams',
	function($scope, $http, $location, $routeParams) {
	
	if ($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != '') {
		$scope.cliente = {'id': $routeParams.id};
		
		$http.get("cliente/buscarCliente/" + $routeParams.id).then(function(response) {
			$scope.cliente = response.data;
			
			if ($scope.cliente.foto != undefined)
				document.getElementById('imagemCliente').src = $scope.cliente.foto;
			
			setTimeout(function() {
				$("#selectEstados").prop("selectedIndex", (new Number($scope.cliente.estados.id) + 1));
				
				$http.get("cidades/listar/" + $scope.cliente.estados.id).then(function(response) {
					$scope.cidades = response.data;
					setTimeout(function() {
						$("#selectCidades").prop("selectedIndex", buscarKeyJson(response.data, 'id', $scope.cliente.cidades.id));		
					}, 1000);
				}, function(response) {
					erro("Erro: " + response.status);
				});
			}, 1000);
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
		$scope.cliente.foto = document.getElementById('imagemCliente').getAttribute('src');
		$http.post("cliente/salvar", $scope.cliente).then(function(response) {
			$scope.cliente = {};
			document.getElementById('imagemCliente').src = '';
			sucesso("Salvo com sucesso!");
		}, function(response) {
			erro("Erro: " + response.status);
		});
	}
	
	$scope.listarClientes = function(numeroPagina) {
		$scope.numeroPagina = numeroPagina;
		$http.get("cliente/listar/" + numeroPagina).then(function(response) {
			$scope.data = response.data;
			
			$http.get("cliente/totalPagina").then(function(response) {
				$scope.totalPagina = response.data;
			}, function(response) {
				erro("Erro: " + response.status);
			});
		}, function(response) {
			erro("Erro: " + response.status);
		});
	};
	
	$scope.removerCliente = function(id) {
		$http.delete("cliente/deletar/" + id).then(function(response) {
			$scope.listarClientes($scope.numeroPagina);
			sucesso("Removido com sucesso!");
		}, function(response) {
			erro("Erro: " + response.status);
		});
	};
	
	$scope.carregarEstados = function() {
		$scope.estados = [{}];
		$http.get("estados/listar").then(function(response) {
			$scope.estados = response.data;
		}, function(response) {
			erro("Erro: " + response.status);
		});
	};
	
	$scope.carregarCidades = function() {
		$scope.cidades = [{}];
		$http.get("cidades/listar/" + $scope.cliente.estados.id).then(function(response) {
			$scope.cidades = response.data;
		}, function(response) {
			erro("Erro: " + response.status);
		});
	};
	
	$scope.limparForm = function() {
		$scope.cliente = {};
		$scope.formCliente.$setPristine();
	};
	
	$scope.proximo = function() {
		if ($scope.numeroPagina < $scope.totalPagina)
			$scope.listarClientes($scope.numeroPagina + 1);
	};
	
	$scope.anterior = function() {
		if ($scope.numeroPagina > 1)
			$scope.listarClientes($scope.numeroPagina - 1);
	};
	
}]);

app.controller('fornecedorController', ['$scope', '$http', '$location', '$routeParams',
	function($scope, $http, $location, $routeParams) {
	
	if ($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != '') {
		$scope.fornecedor = {'id': $routeParams.id};
		
		$http.get("fornecedor/buscarFornecedor/" + $routeParams.id).then(function(response) {
			$scope.fornecedor = response.data;
			
			if ($scope.fornecedor.foto != undefined)
				document.getElementById('imagemFornecedor').src = $scope.fornecedor.foto;
			
			setTimeout(function() {
				$("#selectEstados").prop("selectedIndex", (new Number($scope.fornecedor.estados.id) + 1));
				
				$http.get("cidades/listar/" + $scope.fornecedor.estados.id).then(function(response) {
					$scope.cidades = response.data;
					setTimeout(function() {
						$("#selectCidades").prop("selectedIndex", buscarKeyJson(response.data, 'id', $scope.fornecedor.cidades.id));		
					}, 1000);
				}, function(response) {
					erro("Erro: " + response.status);
				});
			}, 1000);
		}, function(response) {
			erro("Erro: " + response.status);
		});
	} else {
		$scope.fornecedor = {};
	}
	
	$scope.editarFornecedor = function(id) {
		$location.path("fornecedoredit/" + id);
	}
	
	$scope.salvarFornecedor = function() {
		$scope.fornecedor.foto = document.getElementById('imagemFornecedor').getAttribute('src');
		$http.post("fornecedor/salvar", $scope.fornecedor).then(function(response) {
			$scope.fornecedor = {};
			document.getElementById('imagemFornecedor').src = '';
			sucesso("Salvo com sucesso!");
		}, function(response) {
			erro("Erro: " + response.status);
		});
	}
	
	$scope.listarFornecedores = function(numeroPagina) {
		$scope.numeroPagina = numeroPagina;
		$http.get("fornecedor/listar/" + numeroPagina).then(function(response) {
			$scope.data = response.data;
			
			$http.get("fornecedor/totalPagina").then(function(response) {
				$scope.totalPagina = response.data;
			}, function(response) {
				erro("Erro: " + response.status);
			});
		}, function(response) {
			erro("Erro: " + response.status);
		});
	};
	
	$scope.removerFornecedor = function(id) {
		$http.delete("fornecedor/deletar/" + id).then(function(response) {
			$scope.listarFornecedores($scope.numeroPagina);
			sucesso("Removido com sucesso!");
		}, function(response) {
			erro("Erro: " + response.status);
		});
	};
	
	$scope.carregarEstados = function() {
		$scope.estados = [{}];
		$http.get("estados/listar").then(function(response) {
			$scope.estados = response.data;
		}, function(response) {
			erro("Erro: " + response.status);
		});
	};
	
	$scope.carregarCidades = function() {
		$scope.cidades = [{}];
		$http.get("cidades/listar/" + $scope.fornecedor.estados.id).then(function(response) {
			$scope.cidades = response.data;
		}, function(response) {
			erro("Erro: " + response.status);
		});
	};
	
	$scope.limparForm = function() {
		$scope.fornecedor = {};
		$scope.formFornecedor.$setPristine();
	};
	
	$scope.proximo = function() {
		if ($scope.numeroPagina < $scope.totalPagina)
			$scope.listarFornecedores($scope.numeroPagina + 1);
	};
	
	$scope.anterior = function() {
		if ($scope.numeroPagina > 1)
			$scope.listarFornecedores($scope.numeroPagina - 1);
	};
	
}]);

app.controller('livroController', ['$scope', '$http', '$location', '$routeParams',
	function($scope, $http, $location, $routeParams) {
	
	if ($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != '') {
		$scope.livro = {'id': $routeParams.id};
		
		$http.get("livro/buscarLivro/" + $routeParams.id).then(function(response) {
			$scope.livro = response.data;
			
			if ($scope.livro.foto != undefined)
				document.getElementById('imagemLivro').src = $scope.livro.foto;
			
			$http.get("fornecedor/listartodos").then(function(response) {
				$scope.fornecedores = response.data;
				setTimeout(function() {
					$("#selectFornecedores").prop("selectedIndex", buscarKeyJson(response.data, 'id', $scope.livro.fornecedor.id));		
				}, 1000);
			}, function(response) {
				erro("Erro: " + response.status);
			});
		}, function(response) {
			erro("Erro: " + response.status);
		});
	} else {
		$scope.livro = {};
	}
	
	$scope.editarLivro = function(id) {
		$location.path("livroedit/" + id);
	}
	
	$scope.salvarLivro = function() {
		$scope.livro.foto = document.getElementById('imagemLivro').getAttribute('src');
		$http.post("livro/salvar", $scope.livro).then(function(response) {
			$scope.livro = {};
			document.getElementById('imagemLivro').src = '';
			sucesso("Salvo com sucesso!");
		}, function(response) {
			erro("Erro: " + response.status);
		});
	}
	
	$scope.listarLivros = function(numeroPagina) {
		$scope.numeroPagina = numeroPagina;
		$http.get("livro/listar/" + numeroPagina).then(function(response) {
			$scope.data = response.data;
			
			$http.get("livro/totalPagina").then(function(response) {
				$scope.totalPagina = response.data;
			}, function(response) {
				erro("Erro: " + response.status);
			});
		}, function(response) {
			erro("Erro: " + response.status);
		});
	};
	
	$scope.removerLivro = function(id) {
		$http.delete("livro/deletar/" + id).then(function(response) {
			$scope.listarLivros($scope.numeroPagina);
			sucesso("Removido com sucesso!");
		}, function(response) {
			erro("Erro: " + response.status);
		});
	};
	
	$scope.carregarFornecedores = function() {
		$scope.fornecedores = [{}];
		$http.get("fornecedor/listartodos").then(function(response) {
			$scope.fornecedores = response.data;
		}, function(response) {
			erro("Erro: " + response.status);
		});
	};
	
	$scope.limparForm = function() {
		$scope.livro = {};
		$scope.formLivro.$setPristine();
	};
	
	$scope.proximo = function() {
		if ($scope.numeroPagina < $scope.totalPagina)
			$scope.listarLivros($scope.numeroPagina + 1);
	};
	
	$scope.anterior = function() {
		if ($scope.numeroPagina > 1)
			$scope.listarLivros($scope.numeroPagina - 1);
	};
	
}]);

app.controller('lojaController', ['$scope', '$http', '$location', '$routeParams',
	function($scope, $http, $location, $routeParams) {

	
	if ($routeParams.itens != null && $routeParams.itens.length > 0) {
		
		$http.get("itempedido/processar/" + $routeParams.itens).then(function(response) {
			
			$scope.itensCarrinho = response.data;
			$scope.pedidoObjeto = response.data[0].pedido; 
			
		}, function(response) {
			erro("Erro: " + response.status);
		});
			
	} else {
		$scope.carrinhoLivro = new Array();	
	}
		
	$scope.listarLivros = function(numeroPagina) {
		$scope.numeroPagina = numeroPagina;
		$http.get("livro/listar/" + numeroPagina).then(function(response) {
			$scope.data = response.data;
			
			$http.get("livro/totalPagina").then(function(response) {
				$scope.totalPagina = response.data;
			}, function(response) {
				erro("Erro: " + response.status);
			});
		}, function(response) {
			erro("Erro: " + response.status);
		});
	};
	
	$scope.proximo = function() {
		if ($scope.numeroPagina < $scope.totalPagina)
			$scope.listarLivros($scope.numeroPagina + 1);
	};
	
	$scope.anterior = function() {
		if ($scope.numeroPagina > 1)
			$scope.listarLivros($scope.numeroPagina - 1);
	};

	$scope.addLivro = function(livroId) {
		$scope.carrinhoLivro.push(livroId);
	};
	
	$scope.fecharPedido = function() {
		$location.path('loja/itens/' + $scope.carrinhoLivro);
	};
}]);

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

function buscarKeyJson(obj, key, value) {
	for (var i = 0; i < obj.length; i++) {
		if (obj[i][key] == value) {
			return i + 2;
		}
	}
	return null;
}

function visualizarImg() {
	var preview = document.querySelectorAll('img').item(1);
	var file = document.querySelector('input[type=file]').files[0];
	var reader = new FileReader();
	
	reader.onloadend = function () {
		preview.src = reader.result;
	};
	
	if (file) {
		reader.readAsDataURL(file);
	} else {
		preview.src = "";
	}
}

function mostrarDescricao(descricao) {
	$('#descricaoLivro').html('<p>'+descricao+'</p>').dialog({modal: true});
}

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
