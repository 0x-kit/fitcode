import React from "react";
import Header from "./Header";

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
