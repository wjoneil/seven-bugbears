import React from 'react';

import { pluralise } from './chilly-bin';
import Spacer from './spacer';

const coinTypes = [
  {
    type: "CP",
    description: "Copper pieces"
  },
  {
    type: "SP",
    description: "Silver pieces"
  },
  {
    type: "EP",
    description: "Electrum pieces"
  },
  {
    type: "GP",
    description: "Gold pieces"
  },
  {
    type: "PP",
    description: "Platinum pieces"
  },
]

const formatCoins = (coins) => {
  const formattedCoins = coinTypes.reduce((list, coin) => {
    const value = coins[coin.type];
    if (!!value) {
      list.push(
        <li>
          {value} <abbr title={coin.description}>{coin.type}</abbr>
        </li>
      );
    }
    return list;
  }, []);
  return (
    <ul>
      {formattedCoins}
    </ul>
  )
};

const DeleteEncounter = ({onClick}) => {
  return (
    <button onClick={onClick} className="encounter-delete pure-button">
      Close
    </button>
  );
}

const EncounterSection = ({heading, children}) => (
  <section>
    <header className="encounter-section-header">
      <h2 className="encounter-section-heading">{ heading }</h2>
    </header>
    {children}
  </section>
)

const EncounterDetails = ({encounter, onClick}) => {
  const { 
    difficulty, 
    monster_set, 
    xp_value, 
    monsters,
    treasure
  } = encounter;
  
  return monsters ? (
    <article className="encounter-details">
      <div>
        <header className="encounter-header">
          <h1 className="encounter-heading">{monster_set}</h1>
          <DeleteEncounter onClick={onClick}/>
        </header>
        <div className="encounter-subheading">{xp_value} xp — {difficulty} encounter</div>
      </div>
      <Spacer />
      <EncounterSection heading="Monsters">
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
      </EncounterSection>
      { 
        treasure ? (
          <EncounterSection heading="Treasure">
            { formatCoins(treasure.coins) }
          </EncounterSection>
        ) : null 
      }
    </article>
  ) : null;
}

export default EncounterDetails;
