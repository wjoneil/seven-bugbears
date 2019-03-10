import React from 'react';

const pluralise = (name, number) => {
  let plural = `${name}s`;
  
  if (name.endsWith('lf')) {
    plural = `${name.replace(/lf$/, 'lves')}`;
  }
  return number === 1 ? name : plural;
}

const DeleteEncounter = ({onClick}) => {
  return (
    <button onClick={onClick} className="encounter-delete pure-button">
      Close
    </button>
  );
}

const EncounterDetails = ({encounter, onClick}) => {
  const { 
    difficulty, 
    monster_set, 
    xp_value, 
    monsters 
  } = encounter;
  
  return monsters ? (
    <section className="encounter-details">
      <div>
        <header className="encounter-header">
          <h1 className="encounter-heading">{monster_set}</h1>
          <DeleteEncounter onClick={onClick}/>
        </header>
        <div className="encounter-subheading">{xp_value} xp — {difficulty} encounter</div>
      </div>
      <ul className="encounter-monsters">
      {
        monsters.map((monster) => {
          const { name, number } = monster;
          return (
            <li className="encounter-monster" key={monster.name}>
              {number} {`${pluralise(name, number)}`}
            </li>
          );
        })
      }
      </ul>
    </section>
  ) : null;
}

export default EncounterDetails;
