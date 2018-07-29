import React from 'react';
import { Tab, Grid } from 'semantic-ui-react';
import _ from 'lodash';

import MealTable from 'app/home/meals/MealTable';

const TabsMeals = props => {
  const { handleChange, meals } = props;
  const transformData = meals => {
    const mapParts = _.mapKeys(meals, 'part');
    let part,
      newObj = {};
    ['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Others'].forEach(label => {
      part = mapParts[label];
      newObj[part.part] = part.products;
      newObj[part.part]['id'] = part._id;
    });
    return newObj;
  };

  const createPanes = meals => {
    let panesArr = [],
      transf;

    transf = transformData(meals);

    ['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Others'].forEach(label => {
      panesArr.push({
        menuItem: label,
        render: () => <MealTable meal={transf[label]} key={transf[label].id} />
      });
    });

    return panesArr;
  };

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <Tab
            menu={{
              secondary: true,
              pointing: true,
              fluid: true
            }}
            defaultActiveIndex={0}
            menuPosition="left"
            panes={createPanes(meals)}
            onTabChange={handleChange}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TabsMeals;
