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

function Movie() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovie() {
            try {
                const response = await api.get(`movie/${id}`);
                setMovie(response.data);
                setLoading(false);
            } catch (error) {
                navigate('/', { replace: true });
            }
        }

        loadMovie();
    }, [navigate, id]);

    function conversion(mins) {
        let hrs = Math.floor(mins /  60);
        let min = mins % 60;

        hrs = hrs < 10 ? '0' + hrs : hrs;
        min = min < 10 ? '0' + min : min;

    return `${hrs}h ${min}m`;
 }

 function formatDate(date) {
    return date.split('-').reverse().join('/');
 }

 function saveMovie() {
    const myList = localStorage.getItem('@primeflix');
    let savedMovies = JSON.parse(myList) || [];

    const hasMovie = savedMovies.some((savedMovie) => savedMovie.id === movie.id);

    if (hasMovie) {
        toast.warning('Filme já está salvo em sua lisa.');
        return;
    }

    savedMovies.push(movie);
    localStorage.setItem('@primeflix', JSON.stringify(savedMovies));

    toast.success('Filme salvo com sucesso.');
 }

 if(loading) {
    return (
        <Loading text='Carregando detalhes...'/>
    );
 }

 return (
    <div className={styles.container}>
        <div className={styles.title} style={{backgroundImage: `linear-gradient(to right, rgba(var(--primeflixDark), 0.9) 100%, rgba(var(--primeflixDark), 0) 100%), url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`}}>
            <div className={styles.grid_title}>
                <div className={styles.grid_title_img}>

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
            </h1>
            <p>
                {formatDate(movie.release_date)} {`(${movie.original_language.toUpperCase()})`}
                <span>&sdot;</span>
                {movie.genres.map(u => u.name).join(', ')}
                <span>&sdot;</span>
                {conversion(movie.runtime)}
            </p>

            <div className={styles.area_buttons}>
                <a href={`https://youtube.com/results?search_query=${movie.title} Trailer`} target='blank' rel='external'>
                    <Button
                    icon={<FontAwesomeIcon icon={faTv} />}
                    text='Trailer'
                    backgroundColor='White'
                    />
                </a>
                <Button
                icon={<FontAwesomeIcon icon={faPlus} />}
                text='Salvar'
                backgroundColor='blue'
                handleOnClick={saveMovie}
                />
            </div>
        </div>
    </div>

    <div className={styles.movie_info}>
        <h1>Sinopse</h1>
        <p>{movie.overview || 'Não Disponível'}</p>
        <h2>
            <FontAwesomeIcon icon={faCheckSquare} size='xs' /> {movie.vote_average.toFixe(1)}/10
        </h2> {/*avaliação do filme*/}
    </div>
</div>
 );
}

export default memo(Movie);