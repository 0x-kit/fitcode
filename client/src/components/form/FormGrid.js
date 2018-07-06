import React from 'react';
import { Grid } from 'semantic-ui-react';

const FormGrid = ({ children }) => {
  return (
    <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
      <Grid.Column  style={{ maxWidth: 500 }}>
        {children}
      </Grid.Column>
    </Grid>
  );
};

export default FormGrid;
