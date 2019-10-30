import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

const accountList = [{
  accountType: "IGSB",
  currency: "$",
  default: true,
  funds: 10000,
  id: 1,
  isDemo: false,
  name: "Spread bet",
  profitLoss: 0.23,
  _id: "5d9ddef4915161280000853b"
}, {
  accountType: "IGSB",
  currency: "$",
  default: false,
  funds: 1000,
  id: 2,
  isDemo: false,
  name: "New Spread bet",
  profitLoss: -679,
  _id: "5d9ddef4915161280000853c",
}]

const accountTypes = [{
  id: "IGSB",
  title: "Spread bet account",
  _id: "5d9dea6c9151612800008618"
}, {
  id: "IGCFD",
  title: "CFD account",
  _id: "5d9dea6c9151612800008619"
}]

configure({adapter: new Adapter()});

it('prep data for table', () => {
  const wrapper = shallow(<App/>);
  const instance = wrapper.instance();
  instance.makeData(accountList, accountTypes);

  expect(wrapper.state('tableData').every((elem) => 'name' in elem)).toEqual(true);
  expect(wrapper.state('tableData').every((elem) => 'profitLoss' in elem)).toEqual(true);
  expect(wrapper.state('tableData').every((elem) => 'accountType' in elem)).toEqual(true);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});