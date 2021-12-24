package curso.angular.pegarresposta;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Servlet implementation class PegarRespostaJsonServlet
 */
@WebServlet("/pegarRespostaJson")
public class PegarRespostaJsonServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PegarRespostaJsonServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("application/json");
		response.setHeader("Cache-Control", "nocache");
		response.setCharacterEncoding("utf-8");
		
		JSONArray jsonArray = new JSONArray();
		
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("nome", "João");
		jsonObject.put("cidade", "São Paulo");
		jsonArray.put(jsonObject);
		
		jsonObject = new JSONObject();
		jsonObject.put("nome", "Ana");
		jsonObject.put("cidade", "Campinas");
		jsonArray.put(jsonObject);
		
		jsonObject = new JSONObject();
		jsonObject.put("nome", "Pedro");
		jsonObject.put("cidade", "Americana");
		jsonArray.put(jsonObject);
		
		jsonObject = new JSONObject();
		jsonObject.put("nome", "Maria");
		jsonObject.put("cidade", "Rio de Janeiro");
		jsonArray.put(jsonObject);
		
		jsonObject = new JSONObject();
		jsonObject.put("nome", "José");
		jsonObject.put("cidade", "Campinas");
		jsonArray.put(jsonObject);
		
		response.getWriter().write(jsonArray.toString());;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
