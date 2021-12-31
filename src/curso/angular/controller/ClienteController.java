package curso.angular.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@RequestMapping(value = "salvar", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity salvar(@RequestBody String jsonCliente) throws Exception {
		Cliente cliente = new Gson().fromJson(jsonCliente, Cliente.class);
		super.salvar(cliente);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@RequestMapping(value = "listar", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String lista() throws Exception {
		return new Gson().toJson(super.listar());
	}
	
	@RequestMapping(value = "/deletar/{id}", method = RequestMethod.DELETE, headers = "Accept=application/json")
	@ResponseBody
	public String deleta(@PathVariable("id") Long id) throws Exception {
		Cliente cliente = new Cliente();
		cliente.setId(id);
		super.deletar(cliente);
		return "";
	}
}
