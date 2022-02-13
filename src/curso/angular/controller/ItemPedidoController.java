package curso.angular.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import curso.angular.dao.IDao;
import curso.angular.dao.ImplementacaoDao;
import curso.angular.model.ItemPedido;

@Controller
@RequestMapping(value = "/itempedido")
public class ItemPedidoController extends ImplementacaoDao<ItemPedido> implements IDao<ItemPedido> {

	public ItemPedidoController(Class<ItemPedido> persistenceClass) {
		super(persistenceClass);
	}

	@RequestMapping(value = "processar/{itens}")
	public @ResponseBody String processar(@PathVariable("itens") String itens) {
		
		System.out.println(itens);
		
		return "";
	}
}
