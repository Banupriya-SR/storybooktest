import React from 'react';
import { itemData } from './constant';
import { Gallery } from './Gallery';


export default {
    title: 'Example/Gallery',
    component: Gallery,
    argTypes: {
        imageData: ""
    },
};

const Template = (args) => <Gallery {...args} />

export const ImageList = Template.bind({});
ImageList.args = {
    imageData: itemData
};






