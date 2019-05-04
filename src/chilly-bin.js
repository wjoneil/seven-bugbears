export const pluralise = (name, number) => {
  let plural = `${name}s`;
  
  if (name.endsWith('lf')) {
    plural = `${name.replace(/lf$/, 'lves')}`;
  }
  return number === 1 ? name : plural;
}

export const handleCallback = (callback, value) => () => callback(value);

export const noop = () => {};

export const themeReactSelect = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#72BDA3',
    primary75: '#8DCAB4',
    primary50: '#A7D6C6',
    primary25: '#C2E3D7',
    danger: '#bc0f0f',
    dangerLight: '#E6A7A7'
  }
})

export const isEmpty = (obj) => {
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
