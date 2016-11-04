import flexboxgrid from 'flexboxgrid-sass/flexboxgrid.scss';

export default Object.keys(flexboxgrid).reduce((acc, name) => {
  const camelCaseName = name
    // kebab-case to camelCase
    .replace(/[-]+/g, ' ')
    .replace(/ (.)/g, (match) => match.toUpperCase())
    .replace(/ /g, '');
  return { ...acc, [camelCaseName]: flexboxgrid[name] };
}, {});
