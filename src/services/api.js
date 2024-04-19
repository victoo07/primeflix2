import axios from 'axios'; // Importa o módulo axios para fazer requisições HTTP.

const api = axios.create({ // Cria uma instância do axios com as seguintes configurações:
	baseURL: 'https://api.themoviedb.org/3/', // Define a URL base da API do The Movie Database.
	params: { // Define parâmetros padrão para todas as requisições feitas com essa instância do axios.
		api_key: process.env.REACT_APP_API_KEY, // Define a chave da API obtida do ambiente React.
		language: 'pt-BR' // Define o idioma das respostas da API como português do Brasil.
	}
});

export default api; // Exporta a instância do axios configurada como api.
