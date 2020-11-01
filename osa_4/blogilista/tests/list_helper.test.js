const helper = require('./test_helper');
const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('total amount of likes', () => {
    const result = listHelper.totalLikes(helper.initialBlogs);
    expect(result).toBe(36);
  });
});

describe('favorite blogs', () => {
  test('most liked blog', () => {
    const result = listHelper.favoriteBlog(helper.initialBlogs);
    expect(result).toEqual(helper.initialBlogs[2]);
  });
});
