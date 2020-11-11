import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

test('render content', () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
  };

  const component = render(<Blog blog={newBlog} />);

  expect(component.container).toHaveTextContent(
    'Go To Statement Considered Harmful'
  );
});
