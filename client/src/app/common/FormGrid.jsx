import React from 'react';
import { Grid } from 'semantic-ui-react';

const FormGrid = ({ children }) => {
  const gridStyle = { height: '100%' };
  const gridColumnStyle = { maxWidth: 500 };

  return (
    <Grid
      className="welcome"
      textAlign="center"
      style={gridStyle}
      verticalAlign="middle"
    >
      <Grid.Column style={gridColumnStyle}>
        {children}
      </Grid.Column>
    </Grid>
  );
};

export default FormGrid;
