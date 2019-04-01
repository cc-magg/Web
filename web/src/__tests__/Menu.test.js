import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Menu from '../components/menu'

test('Menu should render as expected', () => {
    const wrapper = shallow(<Menu />);
    const tree = toJson(wrapper);

    expect(tree).toMatchSnapshot();
});
