import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { CreateBoard } from './CreateBoard';

describe('<CreateBoard > ', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<CreateBoard />);
    })

    it('has a title', () => {
        expect(wrapper.find('span').exists()).toEqual(true);
    })

    it('should have a button', () => {
        expect(wrapper.find('button').exists()).toEqual(true);
    })
    
    it('should have three inputs', () => {
        expect(wrapper.find('input')).toHaveLength(3);
    })

    it('the second input should be for teams', () => {
        expect(wrapper.find('input').at(1).prop('id')).toEqual('team');
    })
})