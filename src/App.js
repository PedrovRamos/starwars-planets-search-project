import React, { useState, useEffect } from 'react';
import './App.css';
import PlanetsContext from './context/PlanetsContext';
import PlanetsTable from './components/PlanetsTable';

function App() {
  const [planets, setPlanets] = useState({});
  const [planetsClone, setPlanetsClone] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [numberFilter, setNumberFilter] = useState({
    param1: 'population',
    param2: 'maior que',
    param3: 0,
  });

  function getPlanets() {
    setIsLoading(true);
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
        const { results } = data;
        results.forEach((planet) => {
          delete planet.residents;
        });
        setPlanets(results);
        setPlanetsClone(results);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getPlanets();
  }, []);

  function handleChange({ target }) {
    const { value } = target;
    if (value !== '') {
      setPlanets(planets.filter((planet) => planet.name.toLowerCase()
        .includes(value.toLowerCase())));
    } else {
      getPlanets();
    }
  }

  function handleFilter({ target }) {
    const { value, name } = target;
    setNumberFilter((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleClick() {
    const { param1, param2, param3 } = numberFilter;
    if (param2 === 'maior que') {
      setPlanets(planetsClone.filter((planet) => (
        Number(planet[param1]) > Number(param3)
      )));
    } else if (param2 === 'menor que') {
      setPlanets(planetsClone.filter((planet) => (
        Number(planet[param1]) < Number(param3)
      )));
    } else {
      setPlanets(planetsClone.filter((planet) => (
        Number(planet[param1]) === Number(param3)
      )));
    }
  }

  return (
    <PlanetsContext.Provider value={ { planets } }>
      <input data-testid="name-filter" type="text" onChange={ handleChange } />
      <form>
        <label htmlFor="param1-select">
          param 1:
          <select
            name="param1"
            value={ numberFilter.param1 }
            onChange={ handleFilter }
            data-testid="column-filter"
            id="param1-select"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="param2-select">
          param 2:
          <select
            name="param2"
            value={ numberFilter.param2 }
            onChange={ handleFilter }
            data-testid="comparison-filter"
            id="param2-select"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="param3-input">
          param 3:
          <input
            name="param3"
            onChange={ handleFilter }
            value={ numberFilter.param3 }
            id="param3-input"
            type="number"
            data-testid="value-filter"
          />
        </label>
        <button
          onClick={ handleClick }
          data-testid="button-filter"
          type="button"
        >
          FILTRAR
        </button>
      </form>
      { isLoading && <h1>Carregando...</h1> }
      <PlanetsTable />
    </PlanetsContext.Provider>
  );
}

export default App;
