import { memo } from 'react'; // Importa a função memo do React para otimização de desempenho
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa o componente FontAwesomeIcon
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'; // Importa ícones de redes sociais
import styles from './styles.module.css'; // Importa estilos locais

function Footer() {
  const getCurrentYear = new Date().getFullYear(); // Obtém o ano atual

  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        {/* Links para redes sociais */}
        <a href="https://www.facebook.com/seufacebook" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebookF} className={styles.icon} /> {/* Ícone do Facebook */}
        </a>
        <a href="https://twitter.com/seutwitter" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} className={styles.icon} /> {/* Ícone do Twitter */}
        </a>
        <a href="https://www.instagram.com/seuinstagram" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className={styles.icon} /> {/* Ícone do Instagram */}
        </a>
      </div>
      {/* Informações sobre o desenvolvedor e o ano atual */}
      <p>
        <span>Prime Flix</span> &copy; {getCurrentYear}  | Desenvolvido por Ignacio Neto (:
      </p>
    </footer>
  );
}

export default memo(Footer); // Exporta o componente Footer, envolvido na função memo para otimização
