import React, { useState } from 'react';
import Select from 'react-select';

import { handleCallback, pluralise, themeReactSelect } from './chilly-bin';

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const levelsForSelect = levels.map((lvl) => ({label: `Level ${lvl}`, value: lvl}));

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    flexGrow: 1
  })
}

const accumulateCount = (accumulator, value) => {
  if (accumulator[value] !== undefined) {
    accumulator[value]++;
  } else {
    accumulator[value] = 1;
  }
  return accumulator;
}

const formatCharacterDescription = (characters) => {
  const collatedCharacters = characters.reduce(accumulateCount, {});
  const items = Object.entries(collatedCharacters).map(entry => {
    const level = entry[0];
    const count = entry[1];
    return (
      <li key={level}>
        {`${count} ${pluralise("character", count)} at Level ${level}`}
      </li>
    );
  });
  return (
    <ul className="character-select-description--entries">
      {characters.length ? items : <li>Party is empty.</li>}
    </ul>
    )
}

const CharacterSelect = ({characters, onChange}) => {
  const [level, setLevel] = useState(levelsForSelect[0]);

  return (
  <>
    <label className="field-label" htmlFor="character-select">
      Character Levels
    </label>
    <div className="character-select-control">
      <Select
        id={"character-select"}
        isSearchable={false}
        styles={customStyles}
        options={levelsForSelect}
        onChange={(value) => (setLevel(value))}
        value={level}
        theme={themeReactSelect}
      />
      <button 
        className="pure-button pure-button-primary"
        onClick={handleCallback(onChange, level)}
        >
        Add to party
      </button>
      <button
        className="pure-button"
        onClick={handleCallback(onChange, null)}
      >
        Reset
      </button>
    </div>
    {formatCharacterDescription(characters)}
  </>
  )
}

export default CharacterSelect;
