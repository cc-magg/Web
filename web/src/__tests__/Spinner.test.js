import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import SpinnerContainer from '../components/spinner/container'
import SpinnerComponent from '../components/spinner/component'

test('Spinner should render as expected', () => {
    const wrapper = shallow(<SpinnerContainer />);
    const tree = toJson(wrapper);

    expect(tree).toMatchSnapshot();
});

test('Spinner component should recive the default props', () => {
    const wrapper = shallow(<SpinnerContainer />);
    const child = wrapper.find(SpinnerComponent);
    
    expect(child.props().type).toEqual("spinner-border");
    expect(child.props().color).toEqual("text-primary");
});

test('SpinnerContainer should render as expected', () => {
    const wrapper = shallow(<SpinnerComponent />);
    const tree = toJson(wrapper);

    expect(tree).toMatchSnapshot();
});
