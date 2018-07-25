import React from 'react';
import MainNavbar from 'components/MainNavbar';

import '../index.css';
import 'semantic-ui-css/semantic.min.css';

export default ({ children }) => {
  return (
    <div>
      <MainNavbar />
      {children}
    </div>
  );
};
