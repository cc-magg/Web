import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import MenuContainer from '../components/menu/container/menu'
import MenuComponent from '../components/menu/component/menu'

test('Menu should render as expected', () => {
    const wrapper = shallow(<MenuContainer />);
    const tree = toJson(wrapper);

    expect(tree).toMatchSnapshot();
});

test('MenuContainer should render as expected', () => {
    const wrapper = shallow(<MenuComponent />);
    const tree = toJson(wrapper);

    expect(tree).toMatchSnapshot();
});
