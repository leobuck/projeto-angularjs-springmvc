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
import curso.angular.model.Fornecedor;

@Controller
@RequestMapping(value = "/fornecedor")
public class FornecedorController extends ImplementacaoDao<Fornecedor> implements IDao<Fornecedor> {

	public FornecedorController(Class<Fornecedor> persistenceClass) {
		super(persistenceClass);
	}

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "salvar", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity salvar(@RequestBody String jsonFornecedor) throws Exception {
		Fornecedor fornecedor = new Gson().fromJson(jsonFornecedor, Fornecedor.class);

		if (fornecedor != null && fornecedor.getAtivo() == null)
			fornecedor.setAtivo(false);

		super.salvarOuAtualizar(fornecedor);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@RequestMapping(value = "listar/{numeroPagina}", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String lista(@PathVariable("numeroPagina") int numeroPagina) throws Exception {
		return new Gson().toJson(super.consultaPaginada(numeroPagina));
	}

	@RequestMapping(value = "totalPagina", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String totalPagina() throws Exception {
		return new Gson().toJson(super.quantidadePagina());
	}

	@RequestMapping(value = "deletar/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public String deleta(@PathVariable("id") Long id) throws Exception {
		Fornecedor fornecedor = new Fornecedor();
		fornecedor.setId(id);
		super.deletar(fornecedor);
		return "";
	}

	@RequestMapping(value = "buscarFornecedor/{id}", method = RequestMethod.GET)
	@ResponseBody
	public String buscarFornecedor(@PathVariable("id") Long id) throws Exception {
		Fornecedor fornecedor = super.buscarPorId(id);
		if (fornecedor == null)
			return "{}";
		return new Gson().toJson(fornecedor);
	}
}
