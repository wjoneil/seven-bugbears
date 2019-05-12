import React from 'react';
import cn from 'classnames';

const DifficultySelect = ({selectedDifficulty, onChange}) => (
  <fieldset className="hidden-fieldset">
    <legend className="heading-text">Encounter Difficulty</legend>
    <div className="pure-button-group">
      <input 
        type="radio"
        id="difficulty-medium"
        className="difficulty-radio"
        name="difficulty"
        value="medium"
        checked={selectedDifficulty === "medium"}
        onChange={onChange}
      />
      <label 
        className={cn(
          'pure-button', 
          'difficulty-label',
          { 'pure-button-active': selectedDifficulty === "medium" }
        )}
        htmlFor="difficulty-medium"
      >
        Medium
      </label>
      <input 
        type="radio"
        id="difficulty-difficult"
        className="difficulty-radio"
        name="difficulty"
        value="difficult"
        checked={selectedDifficulty === "difficult"}
        onChange={onChange}
      />
      <label
        className={cn(
          'pure-button', 
          'difficulty-label',
          { 'pure-button-active': selectedDifficulty === "difficult" }
        )}
        htmlFor="difficulty-difficult"
      >
        Difficult
      </label>
      <input 
        type="radio"
        id="difficulty-hard"
        className="difficulty-radio"
        name="difficulty"
        value="hard"
        checked={selectedDifficulty === "hard"}
        onChange={onChange}
      />
      <label 
        className={cn(
          'pure-button', 
          'difficulty-label',
          { 'pure-button-active': selectedDifficulty === "hard" }
        )}
        htmlFor="difficulty-hard"
      >
        Hard
      </label>
    </div>
  </fieldset>
)

export default DifficultySelect;
