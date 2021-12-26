package curso.angular.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import curso.angular.dao.IDao;
import curso.angular.dao.ImplementacaoDao;
import curso.angular.model.Cliente;

@Controller
@RequestMapping(value = "/cliente")
public class ClienteController extends ImplementacaoDao<Cliente> implements IDao<Cliente> {

	public ClienteController(Class<Cliente> persistenceClass) {
		super(persistenceClass);
	}

	@RequestMapping(value = "/listar", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String lista() {
		List<Cliente> clientes = new ArrayList<>();
		
		Cliente cliente = new Cliente();
		cliente.setId(10L);
		cliente.setNome("Leo");
		cliente.setEndereco("Rua Teste");
		cliente.setTelefone("(19) 99999-9999");
		clientes.add(cliente);
		
		cliente = new Cliente();
		cliente.setId(11L);
		cliente.setNome("Ana");
		cliente.setEndereco("Rua Teste 2");
		cliente.setTelefone("(19) 99999-8888");
		clientes.add(cliente);
		
		return new Gson().toJson(clientes);
	}
}
