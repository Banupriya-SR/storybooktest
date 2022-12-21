import { render, screen, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Input.stories'; // import all stories from the stories file

// Every component that is returned maps 1:1 with the stories, but they already contain all decorators from story level, meta level and global level.
const { TextField, NumberField } = composeStories(stories);


test('renders with text field', async () => {
    render(<TextField />);
    const input = screen.getByRole('textbox');
    expect(input.value).toEqual('');
    expect(input.type).toEqual("text")
});

test('onchange handler is called', () => {
    const onChangeSpy = jest.fn();
    render(<TextField onChange={onChangeSpy} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } })
    expect(input.value).toBe('test')
    expect(onChangeSpy).toHaveBeenCalled();
});

test('renders with text field', async () => {
    render(<NumberField/>);
    const numberInput = screen.getByPlaceholderText('Number');
    expect(numberInput.value).toEqual("");
    expect(numberInput.type).toEqual("number")
});

test('onchang not called for string, when type is number', () => {
    const onChangeSpy = jest.fn();
    render(<NumberField onChange={onChangeSpy} />);
    const input = screen.getByPlaceholderText('Number');
    fireEvent.change(input, {target: {value: 'test'}})
    expect(input.value).toBe('')
    expect(onChangeSpy).not.toHaveBeenCalled();
  });

  test('onchang is called for number, when type is number', () => {
    const onChangeSpy = jest.fn();
    render(<NumberField onChange={onChangeSpy} />);
    const input = screen.getByPlaceholderText('Number');
    fireEvent.change(input, {target: {value: 23}})
    expect(input.value).toBe("23")
    expect(onChangeSpy).toHaveBeenCalled();
  });