import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import ErrorContainer from '../components/error/container/handle-error'
import ErrorComponent from '../components/error/component/regular-error'

test('Error should render as expected', () => {
    const wrapper = shallow(<ErrorContainer />);
    const tree = toJson(wrapper);

    expect(tree).toMatchSnapshot();
});

test('ErrorContainer should render as expected', () => {
    const wrapper = shallow(<ErrorComponent errorInfo={{ "componentStack": 'error testing text' }} error={'ReferenceError: HomeComponnt is not defined'} />);
    const textContainer = wrapper.find('.errorLocation');
    const tree = toJson(wrapper);

    expect(textContainer.length).toBe(1);
    expect(textContainer.render().text()).toEqual('Here is the error: error testing text');
    expect(tree).toMatchSnapshot();
});
