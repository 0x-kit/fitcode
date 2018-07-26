import React from 'react';
import { Tab, Grid } from 'semantic-ui-react';

const TabsMeals = props => {
  const { panes, handleChange } = props;
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <Tab
            menu={{
              fluid: true,
              vertical: true,
              tabular: true
            }}
            menuPosition="left"
            panes={panes}
            onTabChange={handleChange}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TabsMeals;
