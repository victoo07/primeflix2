import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove, faVideo } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components';
import { toast } from 'react-toastify';

import styles from './styles.module.css';

// 3ª Digitação (Aqui)

function Favorites() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const myList = localStorage.getItem('@primeflix');

        setMovies(JSON.parse(myList) || []);
    }, []);

    function removeMovie(id) {
        let filterMovies = movies.filter((movie) => {
            return (movie.id !== id);
        });

        setMovies(filterMovies);

        localStorage.setItem('primeflix', JSON.stringify(filterMovies));

        toast.success('Filme removido com sucesso.');
    }

    return (
        <div className={styles.container}>
            <div className={styles.my_movies}>
                <h1>Meus Filmes</h1>
                {movies.length === 0 && (<span>Você não possui nenhum filme salvo :(</span>
            )}
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <span>
                            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                        </span>
                        <div className={styles.area_buttons}>
                            <Link to={`/movie/${movie.id}`}>
                                <Button icon={<FontAwesomeIcon icon={faVideo} size='xs' />}
                                text='Detalhes'
                                backgroundColor='blue'
                                />
                            </Link>
                            <Button icon={<FontAwesomeIcon icon={faRemove} size='xs' />}
                                text='Excluir'
                                backgroundColor='red'
                                handleOnClick={() => removeMovie(movie.id)}
                                />
                        </div>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}

export default Favorites;