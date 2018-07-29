import React from 'react';
import { Table, Button } from 'semantic-ui-react';

const MealTable = props => {
  const { meal } = props;
  
  //const mealId = meal.id;

  const headerArr = [
    <Button size="tiny" compact primary>
      Add Food
    </Button>,
    'Food',
    'Grams',
    'Calories',
    'Protein',
    'Carbs',
    'Fats'
  ];

  const renderHeader = headerArr.map(header => (
    <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
  ));

  const renderFooter = (
    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell>Total</Table.HeaderCell>
        <Table.HeaderCell colSpan="6" />
      </Table.Row>
    </Table.Footer>
  );

  return (
    <div>
      {meal && (
        <Table definition selectable compact textAlign="center">
          <Table.Header fullWidth>
            <Table.Row>{renderHeader}</Table.Row>
          </Table.Header>

          <Table.Body>
            {meal.map(food => {
              const {
                _id,
                grams,
                product: { name, calories, proteins, carbs, fats, brand }
              } = food;
              return (
                <Table.Row key={_id}>
                  <Table.Cell>
                    <Button
                      circular
                      size="mini"
                      compact
                      icon="delete"
                      secondary
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {name} [{brand}]
                  </Table.Cell>
                  <Table.Cell>{grams}</Table.Cell>
                  <Table.Cell>{calories}</Table.Cell>
                  <Table.Cell>{proteins}</Table.Cell>
                  <Table.Cell>{carbs}</Table.Cell>
                  <Table.Cell>{fats}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>

          {renderFooter}
        </Table>
      )}
    </div>
  );
};

export default MealTable;
