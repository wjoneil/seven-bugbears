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

  handleMonsterChange = (monsterSets) => {
    this.setState(
      { monsterSets: monsterSets.map((set) => (set.label)) }
    );
  }

  handleEncounterSubmit = () => {
    const { characters, monsterSets } = this.state;

    //TODO: display these errors
    if (!characters.length) {
      console.error("Party is empty");
      return false;
    }
    if (!monsterSets.length) {
      console.error("Select some monsters to encounter");
      return false;
    }
    api.getEncounter(characters, monsterSets).then((encounter) => {
      if (!encounter.success) {
        console.error("Encounter api call failed");
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
    const { characters, encounterList, encounters } = this.state;

    return (
      <div className="app">
        <div className="app-container">
          <section className="encounter-form-wrapper">
            <div className="encounter-form">
              <header>
                <h1 className="encounter-form-title">D&D Encounters</h1>
              </header>
              <div className="field">
                <CharacterSelect 
                  characters={characters} 
                  onChange={this.handleCharacterChange} 
                />
              </div>
              <div className="field">
                <MonsterSelect onChange={this.handleMonsterChange} />
              </div>
              <footer className="footer">
                <button className="pure-button pure-button-primary" onClick={this.handleEncounterSubmit}>
                  Generate Encounter
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
