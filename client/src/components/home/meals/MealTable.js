import React from 'react';
import { Table } from 'semantic-ui-react';

const MealTable = props => {
  const { tableData } = props;
  return (
    <Table
      headerRow={headerRow}
      renderBodyRow={renderBodyRow}
      tableData={tableData}
      unstackable
      textAlign="center"
    />
  );
};

const headerRow = ['Food', 'Calories', 'Proteins', 'Carbs', 'Fats'];
const renderBodyRow = ({ name, calories, proteins, carbs, fats }, i) => ({
  key: name || `row-${i}`,
  warning: !!(name && name.match('Total')),
  cells: [name, calories, proteins, carbs, fats]
});

export default MealTable;
