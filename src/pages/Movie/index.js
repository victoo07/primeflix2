import { memo, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTv, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import imageNotFound from '../../assets/images/placeholder.png';
import placeholderImage from '../../assets/glyphicons/picture-grey.svg';

import { Button, Loading } from '../../components'; // Importação de componentes
import { toast } from 'react-toastify'; // Importação do módulo de notificações

import 'react-lazy-load-image-component/src/effects/blur.css'; // Importação de estilos

import styles from './styles.module.css'; // Importação dos estilos locais
import api from '../../services/api'; // Importação do serviço de API

function Movie(){
    const { id } = useParams(); // Obtém o ID do filme da URL
    const navigate = useNavigate(); // Função de navegação

    const [movie, setMovie] = useState({}); // Estado para armazenar detalhes do filme
    const [loading, setLoading] = useState(true);
    
useEffect(() => {
    async function loadMovie() {
        try {
            // Requisição para obter detalhes do filme pelo ID
            const response = await api.get(`movie/${id}`);
            // Atualizar o estado com os detalhes do filme e finaliza o carregamento
            setMovie(response.data);
            setLoading(false); 
        } catch (error) {
            // Em caso de erro, redireciona de volta a pagina inicial
            navigate('/', { replace: true});
        }
    }

    loadMovie(); // Chama a função para carregar os detalhes do filme
}, [navigate, id]); // Dependências do useEffect

// Função para converter minutos em horas e minutos
function conversion(mins) {
    let hrs = Math.floor(mins / 60);
    let min = mins % 60;

    hrs = hrs < 10 ? '0' + hrs : hrs;
    min = min < 10 ? '0' + min : min;

    return `${hrs}h ${min}m`;
}

// Função para formtara a data
function formatDate(date) {
    return date.split('-').reserve().join('/');
}

// Função para salvar o filme na listade favoritos
function saveMovie() {
    //Obtém a lista de filmes salva no localStorage ou cria uma nova lista vazia
    const myList = localStorage.getItem('@primeflix');
    let savedMovies = JSON.parse(myList) || [];

    // Verifica se o filme já esta na lista
    const hasMovie = savedMovies.come((savedMovies) => savedMovies.id === movie.id);

    // Se o filme já estiver na lista exibe uma mensagem de aviso
    if (hasMovie) {
        toast.warming('Filme já está salvo em sua lista.');
        return;
    }

    // Adiciona o filme à lista e atualiza o localStorage
    savedMovies.push(movie);
    localStorage.setItem('@primeflix', JSON.stringify(savedMovies));

    // Exibe uma mensagem de sucesso ao salvar o filme
    toast.success('Filme salvo com sucesso.');
}

// Se ainda estiver carregando, exibe uma mensagem de carregamento
if (loading) {
    return (
        <Loading text='Carregando detalhes...' />
    );
}

// Renderiza os detalhes do filme
return (
    <div className={styles.container}> {/* Contêiner principal */}
        <div className={styles.title} style={{ backgroundImage : `linear-gradient(to right, rgba(var (--primeflixDark), 0.9) 100%, rgba(var(--primeflixDark), 0) 100%), url('https://image.tmsb.org/t/p/original/${movie.backdrop_path}')`}}> {/* Título com imagem de fundo */}
            <div className={styles.grid_title}> {/* Grid para alinhar elementos */}
                <div className={styles.grid_title_img}> {/* Imagem do filme */}
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
                            <img
                                src={imageNotFound}
                                alt={movie.title}
                                title={movie.title}
                            />
                        )
                    }
                </div>

                <h1>
                    {movie.title}
                    <span className={styles.release_date}>
                        {movie.release_date.slice(0, 4) && `(${movie.release_date.slice(0, 4)})`}
                    </span>
                </h1> {/* Título e ano de lançamento */}
                <p>
                    {formatDate(movie.release_date)} {`(${movie.original_language.toUppercase()})`} {/* Data de lançamento, idioma original e gêneros */}
                    <span>&sdot;</span>
                    {movie.genres.map(u => u.name) .join(', ')}
                    <span>&sdot;</span>
                    {conversion(movie.runtime)} {/* Duração do filme */}
                </p>

                <div className={styles.area_buttons}> {/* Área de botôes */}
                    <a href={`https://yotube.com/results?search_query=${movie.title} Trailer`} target='blank' rel='external'> {/* Link para o trailer do filme */}
                        <Button
                            icon={<FontAwesomeIcon icon={faTv} />}
                            text='Trailer'
                            backgroundColor='white'
                        />
                    </a>
                    <Button
                            icon={<FontAwesomeIcon icon={faPlus} />}
                            text='Salvar' //Botão para salvar o filme na lista de favoritos
                            backgroundColor='blue'
                            handleOnClick={saveMovie}
                    />
                </div>
            </div>
        </div>

        <div className={styles.movie_info}> {/* Informações do filme */}
            <h1>Sinopse</h1>
            <p>{movie.overview || 'Não Disponível'}</p> {/* Sinopse do filme */}
            <h2>
                <FontAwesomeIcon icon={faCheckSquare} size='xs' /> {movie.vote_average.toFixed(1)}/10
            </h2> {/* Avaliação do filme */}
        </div>
    </div>
);
}

export default memo(Movie); // Exporta o componente Movie