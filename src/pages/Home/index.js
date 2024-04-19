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

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const[loadingSearch, setLoadingSearch] = useState(false);
  const[search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [counts, setCounts] = useState({
    total_pages: 500,
    total_results: 10000
  });

  const formatDate = (value) => {
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

const handleSubmit = (e) => {
  e.preventDefault();

  setSearch(search);
  setCurrentPage(1);
}

const handleChange = (e) => {
  setSearch(e.target.value);
  setCurrentPage(1);
}

const loadMoreItems = useRef(0);

useEffect(() => {
  async function loadMovies() {
    const params = {
      params: {
        page: currentPage
      }
    };

    if (search !== '') {
      params.params.query = search;
    }

    const url = (search === '') ? 'movie/now_playing' : 'search/movie';
    const response = await api.get(url, params);
    const { results, total_pages, total_results } = response.data;

    setMovies((previous) =>
        currentPage === 1 ? results : [...previous, ...results]
    );

    setCounts({
        total_pages: total_pages,
        total_results: total_results
    });

    setLoadingSearch(false);
    setLoading(false);
    loadMoreItems.current = 0;

  }

  loadMovies();
}, [search, currentPage]);

const handleLoadMore = () => {
  if (loadMoreItems.current < 2) {
    setCurrentPage((page) => page + 1);
    setLoadingSearch(true);
    loadMoreItems.current++;
  }
}

if (loading) {
  return (
    <Loading text='Carregando filmes...'/>
  );
}

return (
  <div className={styles.container}>
    <div className={styles.title}>
      <div className={styles.grid_title}>
        <h1>Bem-Vindo(a).</h1>
        <p>Milhões de filmes, séries e pessoas para descobrir. Explore já.</p>
        <form onSubmit={handleSubmit}>
          <input
            type='search'
            name='search'
            id='search'
            placeholder='Pesquise pelo seu filme favorito...'
            onChange={handleChange}
            value={search || ''}
            />
            <button type='submit'>
              <FontAwesomeIcon icon={faSearch} size='x1' />
            </button>
         </form>
      </div>
    </div>
    <div className={styles.list_movies}>
      { movies.map((movie) => (
        <article key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
            {
              movie.poster_path !== null ? (
                <LazyLoadImage
                  scr={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  effect='blur'
                  alt={movie.title}
                  title={movie.title}
                  placeholderScr={placeholderImage}
                  />
                ) : (
                  <img
                    src={imageNotFound}
                    alt={movie.title}
                    title= {movie.title}
                  />
                 )
               }
          </Link>

        <div className={styles.processbar}>
          <CircularProgressbar
            value={movie.vote_average * 10}
            text={`${movie.vote_average}%`}
        />
      </div>
       
        <Link to={`/movie/${movie.id}`}>
          <strong>
            {movie.title.substring(0, 18)} {movie.title.length > 18 && '...'}
          </strong>
        </Link>

      <p>{formatDate(movie.release_date || null)}</p>
    </article>
  ))
}

{
    loadingSearch && (
      <div className={styles.search_movies}>
        <img src={loadingImage} alt='Carregando filmes...' width={25} height={25}/>
        <h3>Carregando filmes...</h3>
      </div>
    )
  }
</div>

{
  movies.length > 0 && (
  <div className={styles.load_more}>
    <button onClick={handleLoadMore}>Carregar mais filmes</button>
  </div>
)}

{
  movies.length === 0 && (
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