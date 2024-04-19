import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateBackward } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

function Error() { //Define o componente funcional Error
    return (
    <div className={styles.not_found}> {/*Define um conteiner com a classe CSS 'not_found'*/ }
        <h1>404</h1> {/*Renderiza o titulo '404'*/}
        <h2>Oops! Página não encontrada</h2> {/*Renderiza a mensagem de texto 'Oops! Página não encontrada' */}
        <Link to='/'> {/*Renderiza um link para a página inincial */}
        <FontAwesomeIcon icon={faArrowRotateBackward} size='lg' /> {/*Renderiza um ícone de seta*/}
        Veja todos os filmes {/*Renderiza o texto do link */}
        </Link> {/*Fecha o link */}
    </div>
    );
}

export default memo(Error);