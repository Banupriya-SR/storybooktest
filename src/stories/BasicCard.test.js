import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {BasicCard} from './BasicCard';

const objs = {
    email: "abc@gmail.com",
    phone: "+91-9089898989",
    name: "example",
    address: "banglore",
    website: "abc.com"
}
test('basic card rendering', () => {
    render(<BasicCard userDetails={objs} />);
  
    const nameItem = screen.getByTestId("name");
    expect(nameItem).toHaveTextContent("example");

    const emailItem = screen.getByTestId("email");
    expect(emailItem).toHaveTextContent("abc@gmail.com")

    const phoneItem = screen.getByTestId("phone");
    expect(phoneItem).toHaveTextContent("+91-9089898989")

    const websiteItem = screen.getByTestId("website");
    expect(websiteItem).toHaveTextContent("abc.com")

    const addressItem = screen.getByTestId("address");
    expect(addressItem).toHaveTextContent("banglore")
})
