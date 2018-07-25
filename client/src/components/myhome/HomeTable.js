import React from 'react';
import { Table } from 'semantic-ui-react';

const header = (
  <Table.Header>
    <Table.Row textAlign="center">
      <Table.HeaderCell colSpan="5">Breakfast</Table.HeaderCell>
    </Table.Row>
    <Table.Row textAlign="center">
      <Table.HeaderCell>Food</Table.HeaderCell>
      <Table.HeaderCell>Protein</Table.HeaderCell>
      <Table.HeaderCell>Carbs</Table.HeaderCell>
      <Table.HeaderCell>Fats</Table.HeaderCell>
      <Table.HeaderCell>Calories</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

const body = (
  <Table.Body>
    <Table.Row textAlign="center">
      <Table.Cell>Apples</Table.Cell>
      <Table.Cell>0g</Table.Cell>
      <Table.Cell>0g</Table.Cell>
      <Table.Cell>0g</Table.Cell>
      <Table.Cell>200</Table.Cell>
    </Table.Row>
    <Table.Row textAlign="center">
      <Table.Cell>Orange</Table.Cell>
      <Table.Cell>0g</Table.Cell>
      <Table.Cell>0g</Table.Cell>
      <Table.Cell>0g</Table.Cell>
      <Table.Cell>310</Table.Cell>
    </Table.Row>
  </Table.Body>
);

const footer = (
  <Table.Footer>
    <Table.Row textAlign="center">
      <Table.HeaderCell>Total </Table.HeaderCell>
      <Table.HeaderCell>0g</Table.HeaderCell>
      <Table.HeaderCell>0g</Table.HeaderCell>
      <Table.HeaderCell>0g</Table.HeaderCell>
      <Table.HeaderCell>510</Table.HeaderCell>
    </Table.Row>
  </Table.Footer>
);
const HomeTable = ({ name, label, onClick, active }) => (
  <Table unstackable size="small" key="red">
    {header}
    {body}
    {footer}
  </Table>
);

export default HomeTable;
