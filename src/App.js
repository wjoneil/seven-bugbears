import React, { Component } from 'react';
import uuid from 'uuid/v4';
import CharacterSelect from './CharacterSelect';
import MonsterSelect from './MonsterSelect';

import * as api from './api';

import './App.css';
import EncounterDetails from './EncounterDetails';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      monsterSets: [],
      encounters: {},
      encounterList: []
      // encounter: {
      //   "monsters": [{
      //     "number": 1,
      //     "name": "Bugbear"
      //   }, {
      //     "number": 3,
      //     "name": "Wolf"
      //   }],
      //   "difficulty": "easy",
      //   "monster_set": "bugbears",
      //   "xp_value": 250,
      //   "success": true
      // }
    };
  }

  handleCharacterChange = (value, { action }) => {
    if (action === 'clear') {
      this.setState( { characters: [] } );
    } else {
      this.setState((state, props) => (
        {
          characters: [...state.characters, value]
        }
      ));
    }
  }

  handleMonsterChange = (monsterSets) => {
    this.setState(
      { monsterSets: monsterSets.map((set) => (set.label)) }
    );
  }

  handleEncounterSubmit = () => {
    const { characters, monsterSets } = this.state;

    if (!characters.length || !monsterSets.length) {
      return false;
    }
    api.getEncounter(characters, monsterSets).then((encounter) => {
      if (!encounter.success) {
        //TODO: alert the user that the encounter didn't generate
        return false;
      }
      encounter.id = uuid();
      this.setState((state) => {
        const encounterList = [encounter.id, ...state.encounterList];
        const encounters = { ...state.encounters, [encounter.id]: encounter };

        return {encounterList, encounters};
      });
    })
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
    const { characters, encounterList, encounters } = this.state;

    return (
      <div className="app">
        <div className="app-container">
          <header>
            <h1>D&D Encounters</h1>
          </header>
          <section>
            <div className="field">
              <label>
                Character Levels
                <CharacterSelect 
                  characters={characters} 
                  onChange={this.handleCharacterChange} 
                />
              </label>
            </div>
            <div className="field">
              <label>
                Monster Sets
                <MonsterSelect onChange={this.handleMonsterChange} />
              </label>
            </div>
            <footer className="footer">
              <button className="pure-button pure-button-primary" onClick={this.handleEncounterSubmit}>
                Generate Encounter
              </button>
            </footer>
          </section>
          { !!encounterList.length && encounterList.map(encounterId => (
            <EncounterDetails 
              key={encounterId}
              encounter={encounters[encounterId]} 
              onClick={this.handleDeleteEncounter(encounterId)}
            />
          ))}
          
        </div>
      </div>
    );
  }
}

export default App;
