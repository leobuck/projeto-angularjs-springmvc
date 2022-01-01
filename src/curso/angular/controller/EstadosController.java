package curso.angular.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import curso.angular.dao.IDao;
import curso.angular.dao.ImplementacaoDao;
import curso.angular.model.Estados;

@Controller
@RequestMapping(value = "/estados")
public class EstadosController extends ImplementacaoDao<Estados> implements IDao<Estados> {

	public EstadosController(Class<Estados> persistenceClass) {
		super(persistenceClass);
	}

	@RequestMapping(value = "listar", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String lista() throws Exception {
		return new Gson().toJson(super.listar());
	}
	
}
