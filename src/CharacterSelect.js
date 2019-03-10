import React from 'react';
import Select from 'react-select';

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const levelsOptions = levels.map((level) => (
  { value: level, label: `Level ${level}` }
));


const CharacterSelect = ({characters, onChange}) => {
  // const label = characters.map((item) => (item.label.toString())).join(', ');
  return (
    <Select
      isClearable
      isSearchable
      isMulti
      options={levelsOptions}
      // value={characters.length ? {label} : null}
      onChange={onChange}
    />
  );
}

export default CharacterSelect;
