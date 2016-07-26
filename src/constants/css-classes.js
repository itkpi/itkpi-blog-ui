import flexboxgridClasses from 'flexboxgrid-sass/flexboxgrid.scss';

export const fbgClasses = Object.keys(flexboxgridClasses).reduce((acc, name) => {
  const camelCaseName = name
    // kebab-case to camelCase
    .replace(/[-]+/g, ' ')
    .replace(/ (.)/g, (match) => match.toUpperCase())
    .replace(/ /g, '');
  return { ...acc, [camelCaseName]: flexboxgridClasses[name] };
}, {});
