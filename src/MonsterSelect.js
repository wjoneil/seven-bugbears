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
    const { selectedMonsterSet } = this.props;
    return (
      <>
        <label className="heading-text" htmlFor="monster-select">
          Monster Set
        </label>
        <Select
          id={"monster-select"}
          isClearable
          isSearchable
          value={selectedMonsterSet}
          options={this.state.monsterSets}
          onChange={this.props.onChange}
          theme={themeReactSelect}
        />
      </>
    )
  }

}

export default MonsterSelect;
