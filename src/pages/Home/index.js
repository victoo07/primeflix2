import { memo, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbar } from 'react-circular-progressbar';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Loading } from '../../components';

import imageNotFound from '../../assets/images/placeholder.png';
import placeholderImage from '../../assets/glyphicons/picture-grey.svg';
import loadingImage from '../../assets/images/loading.svg';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-circular-progressbar/dist/styles.css';

import styles from './styles.module.css';
import api from '../../services/api';

function Home() { //define o componente funcional Home.
    const [movies, setMovies] = useState([]); //Define o estado 'movies' para armazenar a lista de filmes.
    const [loading, setLoading] = useState(true); // Define o estado 'loading' para indicar se a página está carregando.
    const[loadingSearch, setLoadingSearch] = useState(false); //Define o estado loading para indicar se a busca esta carregando
    const[search, setSearch] = useState(''); //Define o estado "search" para armazenar o termo de busca do usuario
    const[currentPage, setCurrentPage] = useState(1); //Define o estado 'current' para armazenar o npumero da página atual
    const[counts, setCounts] = useState({ //Define o estado 'count' para armazenar informações sobre ototal de páginas e resultados 
        total_pages: 500,
        total_results: 10000

    }); 

    const formatDate = (value) => {//Função para formatar a data de lançamento do filme
        if (value === null) return 'Não Disponível';

        let options = {
            timeZone: 'America/Sao_Paulo',
            hour12: true,
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };

        const date = new Date(value);
        return date.toLocaleDateString('pt-br', options);
    }

    const handleSubmit = (e) => {//Função para lidar com o envio do formulário de pesquisa.
        e.preventDefault();

        setSearch(search); //Atualiza o termo de busca
        setCurrentPage(1); //Reseta a página atual para a primeira página
    }

    const loadMoreItems = useRef(0); //Define uma referencia para controlar o umero de vezes que o usuario carrega mais itens.

    useEffect(() => { //Efeito para carregar os filmes quando o componente é montado ou quando o termo de busca ou a página atual são alterados.
    async function loadMovies() { //Dunção assíncrona para craregar os filmes
    const params = { //Parâmetros da requisição à API
        params: {
            page: currentPage
        }
    };

    if (search !== '') { //Define a URL da API com base no termo de busca
        params.params.query = search;
    }

    const url = (search === '') ? 'movie/now_playing' : 'search/movie'; //Define  url Dda API com base no termo de busca

    const response = await api.get(url, params); //Faz a requisição à API.

    const { results, total_pages, total_results } = response.data; // Extrai os resultados da responsta da API

    setMovies((previous) => //Atualiza a lista de filmes no estado, adicionando novos filmes se a página atual for maior que 1
        currentPage === 1 ? results : [...previous, ...results]
    );
    
    setCounts({//Atualixa as informações sobre o total de páginas e resultados
        total_pages: total_pages,
        total_results: total_results
    });

    setLoadingSearch(false);//Indica que a busca não está mais carregando
    setLoading(false); //Indica que a página não est´´a mais carregando
    loadMoreItems.current = 0; //reseta o npumero de vezes que o usuário carrega mais itens.
} 

    loadMovies(); //chama a função para carregar os filmes
    }, [search, currentPage]); // o Efeito é reexecutado sempre que o termo de busca ou a página atual são alterados.

    const handleLoadMore = () => {//Função para carregar mais filmes quando o usuario clica no botão 'Carregar mais Filmes'.
        if (loadMoreItems.current < 2) { //Permitir apenas duas vezes o carregamento adicional
            setCurrentPage((page) => page + 1); //Atualiza a página atual
            setLoadingSearch(true); //Indica que a busca está carregando
            loadMoreItems.current++; //Incrementa o contados de carregamento adicional
        }
     }
     
     if(loading) { //Se a ´página estibver carregando, exive o componente de carregamento.
        return (
            <Loading text='Carregando filmes...' />
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {/* {area de título} */}
                <div className={styles.grid_title}>
                    <h1>Bem-Vindo(a).</h1>
                    <p>Milhões de Filmes, Séries e Pessoas para Descobrir. Explore já.</p>
                    <form onSubmit={handleSubmit}>
                        {/* Campo de entrada para pesquisa */}
                        <input 
                        type="search" 
                        name="search" 
                        id="search" 
                        placeholder='Pesquise pelo seu filme favorito...'
                        onChange= {handleChange}
                        value={search || ''} 
                        />
                        {/* Botão de pesquisa */}
                        <button type='submit'>
                            {/* ícone de pesquisa */}
                            <FontAwesomeIcon icon={faSearch} size='xl' /> 
                        </button>
                    </form>
                </div>
            </div>
            <div className={styles.list_movies}>
                {
                    //Mapeia os filmes e exibe cada um
                    movies.map((movie) => (
                       <article key={movie.id}>
                        {/* link para a página do filme */}
                        <Link to={`/movie/${movie.id}`}>
                            {
                                movie.poster_path !== null ? (
                                    <LazyLoadImage 
                                    src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                                    effect='blur'
                                    alt={movie.title}
                                    title={movie.title}
                                    placeholderSrc={placeholderImage}
                                    />
                                ) : (
                                    //Exib uma imagem padrão casp a imagem do filme não esteja disponível
                                    <img 
                                    src={imageNotFound} 
                                    alt={movie.title}
                                    title={movie.title} 
                                    />
                                )
                            }
                        </Link>
                            {/* Exibe a barra de progresso com a avaliação do filme */}
                            <div className={styles.progressbar}>
                                <CircularProgressbar
                                value={movie.vote_avarage *10}
                                text={`${movie.vote_avarage}%`}
                                />
                            </div>
                            <Link to={`/movie/${movie.id}`}>
                                {/* Exibe o título do filme com limita de caracteres  */}
                                <strong>
                                    {movie.title.substring(0, 18)} {movie.title.length >18 && '...'}
                                </strong>
                            </Link>
                            {/* Exibe a data de lançamento do filme formatada */}
                            <p>{formatDate(movie.release_date || null)}</p>
                       </article>
                    ))
                }

                {
                    //Exibe uma mensgem de carregamento durante a busca
                    loadingSearch && (
                        <div className={styles.search_movies}>
                            <img src={loadingImage} alt='Carregando filmes...' width={25} height={25}/>
                            <h3>Carregando filmes...</h3>
                        </div>
                    )
                }
            </div>

            {/* Botão para carregar mais filmes se a lisgga não estiver vazia */}
            {movies.length > 0 && (
                <div className={styles.search_movies}>
                    <h2 className={styles.search_h2}>
                        Nenhum filme foi encontrado, tente novamente...
                    </h2>
                </div>
            )
        }
        </div>
    );
}

export default memo(Home);