import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Spinner from '../components/spinner'

test('Spinner should render as expected', () => {
    const wrapper = shallow(<Spinner />);
    const tree = toJson(wrapper);

    expect(tree).toMatchSnapshot();
});

test('Spinner component should recive the default props', () => {
    const wrapper = shallow(<Spinner />);
    const colorContainer = wrapper.find('#colorContainer');

    //console.log(colorContainer.debug());
    expect(wrapper.exists('.spinner-border')).toBe(true);
    expect(colorContainer.prop('style')).toEqual({color: "blue"}); 
});

test('Spinner component should use the props given', () => {
    const wrapper = shallow(<Spinner
        type={'spinner-grow'}
        color = {'red'}
        align = {'text-left'}
    />);
    const colorContainer = wrapper.find('#colorContainer');

    expect(wrapper.hasClass('text-left')).toBeTruthy();
    expect(colorContainer.hasClass('spinner-grow')).toBeTruthy();
    expect(colorContainer.prop('style')).toEqual({color: "red"});
});
