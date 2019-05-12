import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import uuid from 'uuid/v4';
import CharacterSelect from './CharacterSelect';
import MonsterSelect from './MonsterSelect';
import DifficultySelect from './DifficultySelect';

import * as api from './api';

import './App.css';
import EncounterDetails from './EncounterDetails';

const initialState = {
  characters: [],
  difficulty: "medium",
  selectedMonsterSet: null,
  monsterSets: [],
  encounters: {},
  encounterList: [],
  showAdvanced: false
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { ...initialState }
  }

  handleReset = () => {
    this.setState(() => (
      { ...initialState }
    ));
  }

  handleAdvancedToggle = () => {
    this.setState(state => (
      { showAdvanced: !state.showAdvanced }
    ));
  }

  handleDifficultyChange = (event) => {
    const difficulty = event.target.value;
    this.setState(() => (
      { difficulty }
    ));
  }

  handleCharacterChange = (character) => {
    if (!character) {
      this.setState({
        characters: []
      });
    } else {
      this.setState(state => (
        {
          characters: [...state.characters, character.value]
        }
      ));
    }
  }

  handleMonsterChange = (monsterSet) => {
    this.setState(
      {
        selectedMonsterSet: monsterSet,
        monsterSets: ( !monsterSet ? [] : [monsterSet.label] ) 
      }
    );
  }

  handleEncounterSubmit = () => {
    const { characters, monsterSets, difficulty, showAdvanced } = this.state;

    const options = {
      characterLevels: characters,
      monsterSets: monsterSets,
      difficulty: showAdvanced ? difficulty : null,
    };

    //TODO: display these errors
    if (!characters.length) {
      console.error("Add some characters to the adventuring party.");
      return false;
    }
    if (!monsterSets.length) {
      console.error("Select some monsters to encounter.");
      return false;
    }
    api.getEncounter(options).then((encounter) => {
      if (!encounter.success) {
        console.error("Couldn't find an encounter that fit your conditions.");
        return false;
      }
      encounter.id = uuid();
      this.setState((state) => {
        const encounterList = [encounter.id, ...state.encounterList];
        const encounters = { ...state.encounters, [encounter.id]: encounter };

        return {encounterList, encounters};
      });
    }, (error) => {
      //TODO: handle errors properly
      console.error(error);
    });
  }

  handleDeleteEncounter = (encounterId) => () => {

    this.setState((state) => {
      const encounterIndex = state.encounterList.indexOf(encounterId);
      const encounterList = [ ...state.encounterList ];
      encounterList.splice(encounterIndex, 1);
      const encounters = { ...state.encounters };
      delete encounters[encounterIndex];

      return {encounterList, encounters};
    });
  }

  render() {
    const { 
      characters,
      difficulty,
      encounterList,
      encounters,
      selectedMonsterSet,
      showAdvanced
    } = this.state;

    return (
      <div className="app">
        <div className="app-container">
          <section className="encounter-form-wrapper">
            <div className="encounter-form">
              <header className="app-header">
                <h1 className="app-title">D&D Encounters</h1>
              </header>
              <h2 className="heading-text heading-text-large">Party</h2>
              <div className="field">
                <CharacterSelect 
                  characters={characters} 
                  onChange={this.handleCharacterChange} 
                />
              </div>
              <h2 className="heading-text heading-text-large">Monsters</h2>
              <p>Select a category of monsters from which to draw encounters,
                or use the advanced options to specify tags and encounter difficulty.</p>
              <div className="field">
                <MonsterSelect
                  selectedMonsterSet={selectedMonsterSet}
                  onChange={this.handleMonsterChange} />
              </div>
              <div className="field">
                <button
                    className="pure-button"
                    onClick={this.handleAdvancedToggle}
                  >
                  {showAdvanced ? 'Hide' : 'Show'} advanced options
                </button>
              </div>
              <CSSTransition
                in={showAdvanced}
                timeout={750}
                classNames="advanced"
                unmountOnExit
              >
              <div>
                <h2 className="heading-text heading-text-large">Advanced Options</h2>
                <div className="field">
                  <DifficultySelect
                    selectedDifficulty={difficulty}
                    onChange={this.handleDifficultyChange} />
                </div>
              </div>
              </CSSTransition>
              <footer className="footer">
                <button 
                  className="pure-button pure-button-primary" 
                  onClick={this.handleEncounterSubmit}
                >
                  Generate Encounter
                </button>
                <button
                  className="pure-button"
                  onClick={this.handleReset}
                >
                  Start Over
                </button>
              </footer>
            </div>
          </section>
          <section className="encounter-list">
          { !!encounterList.length && encounterList.map(encounterId => (
            <EncounterDetails 
              key={encounterId}
              encounter={encounters[encounterId]} 
              onClick={this.handleDeleteEncounter(encounterId)}
            />
          ))}
          </section>
        </div>
      </div>
    );
  }
}

export default App;
