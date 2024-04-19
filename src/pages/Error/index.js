import { memo } from 'react'; 
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowRotateBackward } from '@fortawesome/free-solid-svg-icons'; 
import styles from './styles.module.css'; 

function Error() {//DEfine o componente funcional Erro
    return(
        <div className={styles.not_found}>
            <h1>404</h1> {/* Redefine a titulo*/}
            <h2>Oops! Página mão Encontrada</h2> {/* Reenderiza a mensagem de erro */}
            <Link to='/'> {/* reenderiza a mensagem de erro */}

                <FontAwesomeIcon icon={faArrowRotateBackward} size='lg' />{/* Vai para apagina inicial */}
                Veja todos os filmes {/* Reenderiza o texto do link */}

            </Link>
        </div>
    )
}

export default memo(Error); //Exporta o componente Erro, envolvido pela função 'memo' para otimização de renderização