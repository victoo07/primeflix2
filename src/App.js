import RoutesApp from './routes'; 
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function App() { // Define o componente funcional App.
  return (
    <div className="App"> {/* Inicia um contêiner com a classe CSS 'App' */}
      <ToastContainer autoClose={3000} /> {/* Renderiza o componente ToastContainer com a propriedade autoClose definida como 3000 (3 segundos) */}
      <RoutesApp /> {/* Renderiza o componente RoutesApp */}
    </div>
  );
}

export default App; // Exporta o componente App.
