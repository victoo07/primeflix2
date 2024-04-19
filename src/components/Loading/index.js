import PropTypes from 'prop-types'; // Importa PropTypes para validar as props
import styles from './styles.module.css'; // Importa estilos locais
import loadingImage from '../../assets/images/loading.svg'; // Importa a imagem de carregamento

function Loading({ text }) {
  return (
    <div className={styles.loading}>
      {/* Imagem de carregamento */}
      <img 
        src={loadingImage} 
        alt={text} 
        width={30} 
        height={30}
      />

      {/* Texto indicando o que está sendo carregado */}
      <h2>{text}</h2>
    </div>
  );
}

// Define as propTypes para validar as props recebidas
Loading.propTypes = {
  text: PropTypes.string.isRequired // O texto é uma string obrigatória
}

export default Loading; // Exporta o componente Loading
