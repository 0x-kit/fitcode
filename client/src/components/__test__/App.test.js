import React from 'react';
import { shallow } from 'enzyme';
import App from 'components/App';
import Header from 'components/Header';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<App />);
});

it('shows a Header', () => {
  expect(wrapped.find(Header).length).toEqual(1);
});
