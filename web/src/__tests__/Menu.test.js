import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Menu from '../components/menu'
import { constants } from 'fs';

test('Menu should render as expected', () => {
    const wrapper = shallow(<Menu />);
    const tree = toJson(wrapper);

    //expect(tree).toMatchSnapshot();
});

test('Transparent Menu should be transparent', () => {
    const wrapper = shallow(<Menu menuType={'transparent'}/>);
    const nav = wrapper.find('nav');

    //console.log(nav.debug());
    expect(nav).toHaveLength(1);
    expect(nav.hasClass('transparent')).toBeTruthy();
});

test('Static Menu should be static', () => {
    const wrapper = shallow(<Menu menuType={'static'}/>);
    const nav = wrapper.find('nav');

    //console.log(nav.debug());
    expect(nav).toHaveLength(1);
    expect(nav.hasClass('static')).toBeTruthy();
});

test('Fixed Menu should be fixed', () => {
    const wrapper = shallow(<Menu menuType={'fixed'}/>);
    const nav = wrapper.find('nav');

    //console.log(nav.debug());
    expect(nav).toHaveLength(1);
    expect(nav.hasClass('fixed')).toBeTruthy();
});
