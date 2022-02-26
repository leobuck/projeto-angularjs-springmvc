package curso.angular.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import curso.angular.dao.IDao;
import curso.angular.dao.ImplementacaoDao;
import curso.angular.model.ItemPedido;
import curso.angular.model.Livro;
import curso.angular.model.Pedido;

@Controller
@RequestMapping(value = "/itempedido")
public class ItemPedidoController extends ImplementacaoDao<ItemPedido> implements IDao<ItemPedido> {
	
	@Autowired
	private LivroController livroController;

	public ItemPedidoController(Class<ItemPedido> persistenceClass) {
		super(persistenceClass);
	}

	@RequestMapping(value = "processar/{itens}")
	public @ResponseBody String processar(@PathVariable("itens") String itens) throws Exception {
		List<Livro> livros = livroController.listar(itens);
		
		List<ItemPedido> itensPedido = new ArrayList<>();
		
		Pedido pedido = new Pedido();
		BigDecimal valorTotal = BigDecimal.ZERO;
		
		for (Livro livro : livros) {
			ItemPedido item = new ItemPedido();
			item.setLivro(livro);
			item.setQuantidade(1L);
			item.setPedido(pedido);
			itensPedido.add(item);
			
			valorTotal = valorTotal.add(livro.getValor());
		}
		
		pedido.setValorTotal(valorTotal);
		
		return new Gson().toJson(itensPedido);
	}
}
