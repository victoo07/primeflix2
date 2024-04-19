import { memo } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components'; 
import { Home, Movie, Error, Favorites } from './pages'; 

// Define o componente funcional RoutesApp.
function RoutesApp() {
  return (
    // Inicia o roteador da aplicação
    <BrowserRouter> 
      <Header /> {/* Renderiza o componente Header */}
      <Routes> {/* Inicia o container para rotas */}
        <Route path='/' element={<Home />} /> {/* Define uma rota para a página inicial, renderizando o componente Home */}
        <Route path='/movie/:id' element={<Movie />} /> {/* Define uma rota para exibir detalhes de um filme específico, renderizando o componente Movie */}
        <Route path='/favorites' element={<Favorites />} /> {/* Define uma rota para a página de favoritos, renderizando o componente Favorites */}
        <Route path='*' element={<Error />} /> {/* Define uma rota para qualquer outro caminho não especificado, renderizando o componente Error */}
      </Routes> {/* Finaliza o container de rotas */}
      <Footer /> {/* Renderiza o componente Footer */}
    </BrowserRouter> 
  );
}

export default memo(RoutesApp); // Exporta o componente RoutesApp, envolvido pela função `memo` para otimização de renderização.
