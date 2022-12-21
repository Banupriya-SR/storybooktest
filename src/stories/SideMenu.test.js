import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './SideMenu.stories'; // import all stories from the stories file

// Every component that is returned maps 1:1 with the stories, but they already contain all decorators from story level, meta level and global level.
const { MenuButton } = composeStories(stories);


test('renders sidemenus', () => {
  render(<MenuButton/>); 
  const buttonElement = screen.getByTestId("longButton");
  expect(buttonElement).not.toBeNull();
});

test('onclick handler is called', () => {
    const handleClick = jest.fn();
    render(<MenuButton onSelect={handleClick} />);
    const buttonElement = screen.getByTestId("longButton");
    buttonElement.click();
    expect(handleClick).toHaveBeenCalled();
  });

