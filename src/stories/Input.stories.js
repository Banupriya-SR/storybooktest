import React from 'react';

import { Input } from './Input';


export default {
    title: 'Example/Input',
    component: Input,
    argTypes: {
        type: "text",
        onChange:()=>{}
    },
};

const Template = (args) => <Input {...args} />

export const TextField = Template.bind({});
TextField.args = {
    type: "text",
    label: "Text",
    required: false,
    helperText:"error",
    error:false,
    onChange: (e) => {console.log(e)}
};

export const NumberField = Template.bind({});
NumberField.args = {
    type: "number",
    label: "Number",
    required: false,
    helperText:"error",
    error:false,
    onChange: (e) => {console.log(e)}
};




