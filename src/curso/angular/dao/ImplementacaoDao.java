package curso.angular.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import curso.angular.hibernate.HibernateUtil;

@Transactional(rollbackFor = Exception.class)
@Service
public abstract class ImplementacaoDao<T> implements IDao<T> {

	private Class<T> persistenceClass;
	
	private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
	
	public ImplementacaoDao(Class<T> persistenceClass) {
		super();
		this.persistenceClass = persistenceClass;
	}
	
	@Override
	public void salvar(T objeto) throws Exception {
		sessionFactory.getCurrentSession().save(objeto);
		sessionFactory.getCurrentSession().flush();
	}
	
	@Override
	public void deletar(T objeto) throws Exception {
		sessionFactory.getCurrentSession().delete(objeto);
		sessionFactory.getCurrentSession().flush();
	}
	
	@Override
	public void atualizar(T objeto) throws Exception {
		sessionFactory.getCurrentSession().update(objeto);
		sessionFactory.getCurrentSession().flush();
	}
	
	@Override
	public void salvarOuAtualizar(T objeto) throws Exception {
		sessionFactory.getCurrentSession().saveOrUpdate(objeto);
		sessionFactory.getCurrentSession().flush();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public T merge(T objeto) throws Exception {
		T t = (T) sessionFactory.getCurrentSession().merge(objeto);
		sessionFactory.getCurrentSession().flush();
		return t;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<T> listar() throws Exception {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(persistenceClass);
		criteria.addOrder(Order.asc("id"));
		return criteria.list();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<T> listar(String ids) throws Exception {
		List<Long> longs = new ArrayList<Long>();
		
		String [] strings = ids.split(",");
		for (int i = 0; i < strings.length; i++) {
			longs.add(Long.parseLong(strings[i]));
		}
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(persistenceClass);
		criteria.add(Restrictions.in("id", longs));
		
		return criteria.list();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public T buscarPorId(Long id) throws Exception {
		return (T) sessionFactory.getCurrentSession().get(persistenceClass, id);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<T> consultaPaginada(int numeroPagina) throws Exception {
		int totalPorPagina = 6;
		int offset = (numeroPagina * totalPorPagina) - totalPorPagina;
		if (offset < 0)
			offset = 0;
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(persistenceClass);
		criteria.setFirstResult(offset);
		criteria.setMaxResults(totalPorPagina);
		criteria.addOrder(Order.asc("id"));
		
		return criteria.list();
	}
	
	@Override
	public int quantidadePagina() throws Exception {
		String sql = "SELECT COUNT(1) AS totalRegistro FROM " + persistenceClass.getSimpleName();
		int quantidadePagina = 1;
		int totalPorPagina = 6;
		
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		Object resultSet = query.uniqueResult();
		
		if (resultSet != null) {
			int totalRegistros = Integer.parseInt(resultSet.toString());
			if (totalRegistros > totalPorPagina) {
				double quantidadePaginaTemp = totalRegistros / totalPorPagina;
				if (quantidadePaginaTemp % 2 != 0) {
					quantidadePagina = (int) quantidadePaginaTemp + 1;
				} else {
					quantidadePagina = (int) quantidadePaginaTemp;
				}
			} else {
				quantidadePagina = 1;
			}
		}
		
		return quantidadePagina;
	}
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	
	public Class<T> getPersistenceClass() {
		return persistenceClass;
	}
}
