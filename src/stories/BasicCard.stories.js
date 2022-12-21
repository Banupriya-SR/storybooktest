import React from 'react';
import { itemData } from './constant';
import { BasicCard } from './BasicCard';


export default {
    title: 'Example/Card',
    component: BasicCard,
};

const Template = (args) => <BasicCard {...args} />

export const primaryCard = Template.bind({});
primaryCard.args = {
    userDetails: {
        email: "abc@gmail.com",
        phone: "+91-9089898989",
        name: "example",
        address: "banglore",
        website: "abc.com"
    }
};
