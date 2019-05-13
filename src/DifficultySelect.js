import React from 'react';
import cn from 'classnames';

const DifficultySelect = ({selectedDifficulty, onChange}) => (
  <fieldset className="hidden-fieldset">
    <legend className="heading-text">Encounter Difficulty</legend>
    <div className="pure-button-group">
      <input 
        type="radio"
        id="difficulty-easy"
        className="difficulty-radio"
        name="difficulty"
        value="easy"
        checked={selectedDifficulty === "easy"}
        onChange={onChange}
      />
      <label 
        className={cn(
          'pure-button', 
          'difficulty-label',
          { 'pure-button-active': selectedDifficulty === "easy" }
        )}
        htmlFor="difficulty-easy"
      >
        Easy
      </label>
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
