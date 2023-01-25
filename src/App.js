import React, { useState, useEffect } from 'react';
import './App.css';
import PlanetsContext from './context/PlanetsContext';
import PlanetsTable from './components/PlanetsTable';

function App() {
  const [planets, setPlanets] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [numberFilter, setNumberFilter] = useState({
    param1: 'population',
    param2: 'maior que',
    param3: 0,
  });
  const [filters, setFilters] = useState([]);
  const [options, setOptions] = useState([
    'orbital_period', 'diameter',
    'surface_water', 'rotation_period', 'population']);

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
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    filters.forEach((filter) => {
      setOptions((prevState) => prevState.filter((each) => each !== filter.column));
    });
    if (filters.length !== 0) {
      fetch('https://swapi.dev/api/planets')
        .then((response) => response.json())
        .then((data) => {
          const { results } = data;
          results.forEach((planet) => {
            delete planet.residents;
          });
          let planetsFilter = results;
          filters.forEach(({ column, comparison, value }) => {
            if (comparison === 'maior que') {
              planetsFilter = planetsFilter.filter((planet) => (
                Number(planet[column]) > Number(value)
              ));
            } else if (comparison === 'menor que') {
              planetsFilter = planetsFilter.filter((planet) => (
                Number(planet[column]) < Number(value)
              ));
            } else {
              planetsFilter = planetsFilter.filter((planet) => (
                Number(planet[column]) === Number(value)
              ));
            }
          });
          setPlanets(planetsFilter);
        });
    } else {
      getPlanets();
    }
  }, [filters]);

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
    setFilters((prevState) => ([...prevState, {
      column: param1,
      comparison: param2,
      value: param3,
    }]));
  }

  function handleDeleteClick({ target }) {
    const { value } = target;
    setFilters((prevState) => prevState.filter((each) => each.column !== value));
    setOptions((prevState) => ([...prevState, value]));
  }

  function handleResetClick() {
    setFilters([]);
    setOptions(['population',
      'orbital_period', 'diameter', 'rotation_period',
      'surface_water']);
    getPlanets();
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
            { options.map((option, i) => (
              <option name="param1" key={ i } value={ option }>{option}</option>
            )) }
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
      { filters.map(({ column, comparison, value }, i) => (
        <div data-testid="filter" key={ i }>
          <p>

            {`${column} ${comparison} ${value}`}
          </p>
          <button
            onClick={ handleDeleteClick }
            value={ column }
            type="button"
          >
            x
          </button>
        </div>
      )) }
      <button
        onClick={ handleResetClick }
        data-testid="button-remove-filters"
        type="button"
      >
        RESETAR FILTRO
      </button>
      { isLoading && <h1>Carregando...</h1> }
      <PlanetsTable />
    </PlanetsContext.Provider>
  );
}

export default App;
