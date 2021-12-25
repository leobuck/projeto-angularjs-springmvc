package curso.angular.controller;

import org.springframework.stereotype.Controller;

import curso.angular.dao.IDao;
import curso.angular.dao.ImplementacaoDao;
import curso.angular.model.Cliente;

@Controller
public class ClienteController extends ImplementacaoDao<Cliente> implements IDao<Cliente> {

	public ClienteController(Class<Cliente> persistenceClass) {
		super(persistenceClass);
	}

}
