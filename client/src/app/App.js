import React from 'react';
import MenuContainer from 'app/menu/MenuContainer';

import '../index.css';
import 'semantic-ui-css/semantic.min.css';

export default ({ children }) => {
  return (
    <div>
      <MenuContainer />
      {children}
    </div>
  );
};
