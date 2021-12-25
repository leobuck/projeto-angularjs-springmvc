package curso.angular.dao;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(rollbackFor = Exception.class)
@Service
public interface IDao<T> {
	
	void salvar(T objeto) throws Exception;
	void deletar(T objeto) throws Exception;
	void atualizar(T objeto) throws Exception;
	void salvarOuAtualizar(T objeto) throws Exception;
	T merge(T objeto) throws Exception;
	List<T> listar() throws Exception;
}
