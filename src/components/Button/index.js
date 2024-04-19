import PropTypes from 'prop-types'; // Importa PropTypes para validar as props
import styles from './styles.module.css'; // Importa estilos locais

function Button({ icon, text, backgroundColor, handleOnClick }) { 
  return (
    <button 
      className={`${styles.button} ${styles[backgroundColor]}`} // Aplica estilos dinâmicos com base na cor de fundo
      onClick={handleOnClick} // Adiciona um manipulador de evento de clique
    >
      {icon} {text} {/* Renderiza o ícone e o texto do botão */}
    </button>
  );
}

// Define as propTypes para validar as props recebidas
Button.propTypes = {
  icon: PropTypes.any, // O ícone pode ser de qualquer tipo
  text: PropTypes.string.isRequired, // O texto é uma string obrigatória
  backgroundColor: PropTypes.string.isRequired, // A cor de fundo é uma string obrigatória
  handleOnClick: PropTypes.func // O manipulador de evento de clique é uma função opcional
}

export default Button; // Exporta o componente Button
