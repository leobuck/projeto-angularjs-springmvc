package curso.angular.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import curso.angular.dao.IDao;
import curso.angular.dao.ImplementacaoDao;
import curso.angular.model.Pedido;

@Controller
@RequestMapping(value = "/pedido")
public class PedidoController extends ImplementacaoDao<Pedido> implements IDao<Pedido> {

	@Autowired
	private ItemPedidoController itemPedidoController;
	
	public PedidoController(Class<Pedido> persistenceClass) {
		super(persistenceClass);
	}

}
