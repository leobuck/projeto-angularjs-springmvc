package curso.angular.controller;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import curso.angular.dao.IDao;
import curso.angular.dao.ImplementacaoDao;
import curso.angular.model.Cidades;

@Controller
@RequestMapping(value = "/cidades")
public class CidadesController extends ImplementacaoDao<Cidades> implements IDao<Cidades> {

	public CidadesController(Class<Cidades> persistenceClass) {
		super(persistenceClass);
	}

	@RequestMapping(value = "listar/{estadoId}", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String lista(@PathVariable("estadoId") Long estadoId) throws Exception {
		return new Gson().toJson(listaPorEstado(estadoId));
	}
	
	@SuppressWarnings("unchecked")
	public List<Cidades> listaPorEstado(Long estadoId) throws Exception {
		Criteria criteria = getSessionFactory()
				.getCurrentSession()
				.createCriteria(getPersistenceClass());
		criteria.add(Restrictions.eq("estados.id", estadoId));
		return criteria.list();
	}
	
}
