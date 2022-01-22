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
import curso.angular.model.Livro;

@Controller
@RequestMapping(value = "/livro")
public class LivroController extends ImplementacaoDao<Livro> implements IDao<Livro> {

	public LivroController(Class<Livro> persistenceClass) {
		super(persistenceClass);
	}

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "salvar", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity salvar(@RequestBody String jsonLivro) throws Exception {
		Livro livro = new Gson().fromJson(jsonLivro, Livro.class);
		super.salvarOuAtualizar(livro);
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
		Livro livro = new Livro();
		livro.setId(id);
		super.deletar(livro);
		return "";
	}
	
	@RequestMapping(value = "buscarLivro/{id}", method = RequestMethod.GET)
	@ResponseBody
	public String buscarLivro(@PathVariable("id") Long id) throws Exception {
		Livro livro = super.buscarPorId(id);
		if (livro == null)
			return "{}";
		return new Gson().toJson(livro);
	}
}
