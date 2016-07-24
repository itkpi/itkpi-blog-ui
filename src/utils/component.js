import React from 'react';

export const createComponent = (Component, additionalProps = {}) => {
  return (props) => <Component {...props} {...additionalProps} />;
};
