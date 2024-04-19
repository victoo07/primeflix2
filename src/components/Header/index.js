import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      {/* Link para a página inicial */}
      <Link className={styles.logo} to='/'>Prime Flix</Link> {/* Logo da plataforma */}
      {/* Link para a página de favoritos */}
      <Link className={styles.favorites} to='/favorites'>
        <FontAwesomeIcon icon={faUserCircle} size='lg'/> Meus Filmes {/* Ícone de usuário e texto "Meus Filmes" */}
      </Link>
    </header>
  );
}

export default memo(Header);