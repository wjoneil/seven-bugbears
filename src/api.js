const baseURL = 'http://dndencounters.us-east-1.elasticbeanstalk.com';

const options = {
  mode: "cors"
}

const status = (response) => {
  if (response.ok) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const json = (response) => (response.json());

export const getMonsterSets = () => {
  return fetch(`${baseURL}/monster-sets`, options)
    .then(status)
    .then(json);
} 

export const getEncounter = (data) => {
  const {
    characterLevels, 
    monsterSets, 
    difficulty
  } = data;
  const queries = [
    `character_levels=${characterLevels.join(',')}`,
    `monster_sets=${monsterSets.join(',')}`
  ]
  if (!!difficulty) {
    queries.push(`difficulty=${difficulty}`);
  }
  
  const queryString = queries.join('&');
  return fetch(`${baseURL}/encounter?${queryString}`)
    .then(status)
    .then(json);
}

