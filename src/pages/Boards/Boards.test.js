import { configure, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Boards } from './Boards';

configure({ adapter: new Adapter() });

describe('<Boards> component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Boards />);
    })

    it('should have a title', () => {
        expect(wrapper.find('p').exists()).toEqual(true);
    })

    it('the title\'s name should be boards', () => {
        expect(wrapper.find('p').at(0).text()).toEqual('Boards');
    })

    it('should have an error message', () => {
        expect(wrapper.find('p').at(1).exists()).toEqual(true);
    })
})