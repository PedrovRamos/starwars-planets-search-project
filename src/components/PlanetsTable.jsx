import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function PlanetsTable() {
  const { planets } = useContext(PlanetsContext);

  return (
    <div>
      <table>
        <tr>
          {
            planets.length !== undefined
            && Object.keys(planets[0]).map((planetsKey, i) => (
              <th key={ i }>{planetsKey}</th>
            ))
          }
        </tr>
        {
          planets.length !== undefined
            && planets.map((planet, i) => (
              <tr key={ i }>
                {Object.values(planet)
                  .map((info, index) => <td key={ index }>{info}</td>)}
              </tr>
            ))
        }
      </table>
    </div>
  );
}

export default PlanetsTable;
