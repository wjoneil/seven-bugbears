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
    primary75: '#8BC9B3',
    primary50: '#A5D5C4',
    primary25: '#CBE7DD',
    danger: '#bc0f0f',
    dangerLight: '#E6A7A7'
  }
})
