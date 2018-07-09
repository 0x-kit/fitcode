import React from 'react';
import Header from 'components/Header';

import '../index.css';
import 'semantic-ui-css/semantic.min.css';

export default ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
