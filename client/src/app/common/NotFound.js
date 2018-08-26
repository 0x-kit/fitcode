import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

const NotFound = () => {
  const style = { height: '100%' };
  return (
    <Grid className="welcome" textAlign="center" style={style} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 500 }}>
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
