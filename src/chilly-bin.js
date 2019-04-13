export const pluralise = (name, number) => {
  let plural = `${name}s`;
  
  if (name.endsWith('lf')) {
    plural = `${name.replace(/lf$/, 'lves')}`;
  }
  return number === 1 ? name : plural;
}

export const handleCallback = (callback, value) => () => callback(value);

export const noop = () => {};
