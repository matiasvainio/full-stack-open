import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('render title/author', () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    user: {
      name: 'Bruce Wayne',
    },
  };

  const component = render(<Blog blog={newBlog} />);

  expect(component.container).toHaveTextContent(
    'Go To Statement Considered Harmful'
  );

  expect(component.container).toHaveTextContent('Edsger W. Dijkstra');

  expect(component.container).not.toHaveTextContent('www.google.com');
});

test('render url/likes', () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'www.testing.com',
    likes: 5,
    user: {
      name: 'Bruce Wayne',
    },
  };

  const user = {
    name: 'Bruce Wayne',
  };

  const component = render(
    <Blog blog={newBlog} user={user} setLike={jest.fn()} />
  );
  const div = component.container.querySelector('.togglableContent');
  expect(div).toHaveStyle('display: none');

  const button = component.getByText('show');
  fireEvent.click(button);

  expect(div).not.toHaveStyle('display: none');
});

test('like button clicked', () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'www.testing.com',
    likes: 5,
    user: {
      name: 'Bruce Wayne',
    },
  };

  const user = {
    name: 'Bruce Wayne',
  };

  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={newBlog} user={user} handleLike={mockHandler} />
  );

  const button = component.container.querySelector('.like-button');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
