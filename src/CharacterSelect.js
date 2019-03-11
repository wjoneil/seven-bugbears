import React from 'react';

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const handleOnClick = (callback, value) => {
  return () => callback(value);
};

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
        {`${count} at Level ${level}`}
      </li>
    );
  });
  return characters.length ? (
    <ul className="character-select-description--entries">
      {items}
    </ul>
  ) : (
    <span>Party is empty.</span>
  )
}

const CharacterSelect = ({characters, onChange}) => (
  <>
    <label className="field-label" htmlFor="character-select">
      Character Levels
    </label>
    <div id={"character-select"}>
      <header className="character-select-heading">
        <div className="character-select-description">
          {formatCharacterDescription(characters)}
        </div>
        <button 
          className="pure-button character-select-reset"
          onClick={handleOnClick(onChange, null)}
          >
            Reset
          </button>
      </header>
      <div className="character-select-control">
        {levels.map((level) => (
          <button 
            key={level} 
            className="pure-button" 
            onClick={handleOnClick(onChange, level)}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  </>
)

export default CharacterSelect;
