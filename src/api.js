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

export const getEncounter = (characterLevels, monsterSets) => {
  const levelsQueryValue = characterLevels
    .map((item) => item.value)
    .join(',');
  const levelsQuery = `character_levels=${levelsQueryValue}`;
  const monstersQuery = `monster_sets=${monsterSets.join(',')}`;
  const queryString = [levelsQuery, monstersQuery].join('&');
  return fetch(`${baseURL}/encounter?${queryString}`)
    .then(status)
    .then(json);
}

