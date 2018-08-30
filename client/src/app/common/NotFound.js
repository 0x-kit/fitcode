import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

const NotFound = () => {
  const gridStyle = { height: '100%' };
  const columnStyle = { maxWidth: 500 };
  return (
    <Grid className="welcome" textAlign="center" style={gridStyle} verticalAlign="middle">
      <Grid.Column style={columnStyle}>
        <Header as="h2" icon>
          <Icon name="game" />
          404
          <Header.Subheader>How about some good old Atari?</Header.Subheader>
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default NotFound;
