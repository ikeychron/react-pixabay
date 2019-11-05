import React, { useState, useEffect } from 'react';
import Buscador from './components/Buscador';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  // State
  const [ busqueda, guardarBusqueda ] = useState('');
  const [ imagenes, guardarImagenes ] = useState([]);
  const [ paginaActual, guardarPaginaActual ] = useState(1);
  const [ totalPaginas, guardarTotalPaginas ] = useState(1);

  useEffect(() => {

    const consultarAPI = async () => {

      if(busqueda === "") return;

      const imagenenesPorPagina = 30;
      const key = "13216783-bf73060df033bd7793c360ca7";


      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();


      guardarImagenes(resultado.hits);

      // Calcular el total de páginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenenesPorPagina)
      guardarTotalPaginas( calcularTotalPaginas );

      console.log(totalPaginas);

      // Mover pantalla hacía la parte superior
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth', block: 'end'});

    }

    consultarAPI();

  }, [busqueda, paginaActual])


  const paginaAnterior = () => {

    let nuevaPaginaActual = paginaActual - 1;

    // Colocar en el State
    guardarPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    let nuevaPaginaActual = paginaActual + 1;

    // Colocar en el State
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>

        <Buscador 
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      
      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />

        { (paginaActual === 1) ? null : (
          <button onClick={paginaAnterior} type="button" className="btn btn-info mr-1">&laquo; Anterior</button>
        ) }
        
        {(paginaActual === totalPaginas) ? null : (
          <button onClick={paginaSiguiente} type="button" className="btn btn-info">Siguiente &raquo;</button>
        )}
        
      </div>
    </div>
  );
}

export default App;
