import React, { useState, useEffect } from 'react';
import './App.css';
import PlanetsContext from './context/PlanetsContext';
import PlanetsTable from './components/PlanetsTable';

function App() {
  const [planets, setPlanets] = useState({});

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
        const { results } = data;
        results.forEach((planet) => {
          delete planet.residents;
        });
        setPlanets(results);
      });
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets } }>
      <PlanetsTable />
    </PlanetsContext.Provider>
  );
}

export default App;
