import React from 'react';
import { Grid } from 'semantic-ui-react';

const FormGrid = ({ children }) => {
  const style = { height: '100%' };
  return (
      <Grid
        className="welcome"
        textAlign="center"
        style={style}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 500 }}>
          {children}
        </Grid.Column>
      </Grid>
  );
};

export default FormGrid;
