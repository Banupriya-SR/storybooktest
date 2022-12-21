import React from 'react';
import { menuOptions } from './constant';
import { SideMenu } from './SideMenu';


export default {
    title: 'Example/SideMenu',
    component: SideMenu,
    argTypes: {
        options: []
    },
};

const Template = (args) => <SideMenu {...args} />

export const MenuButton = Template.bind({});
MenuButton.args = {
    options: menuOptions
};






