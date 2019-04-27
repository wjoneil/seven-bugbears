import React, { Component } from 'react';
import Select from 'react-select';

import * as api from './api';
import { themeReactSelect } from './chilly-bin';

class MonsterSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      monsterSets: [],
    };
  }

  componentDidMount() {
    api.getMonsterSets().then((monsterSets) => {
      this.setState({
        monsterSets: monsterSets.map((set) => ({label: set, value: set}))
      });
    })
  }

  render() {
    return (
      <>
        <label className="field-label" htmlFor="monster-select">
          Monster Sets
        </label>
        <Select
          id={"monster-select"}
          isClearable
          isSearchable
          options={this.state.monsterSets}
          onChange={this.props.onChange}
          theme={themeReactSelect}
        />
      </>
    )
  }

}

export default MonsterSelect;
