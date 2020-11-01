const dummy = () => 1;

const totalLikes = (blogs) => blogs.reduce((sum, order) => sum + order.likes, 0);

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  }, 0);
  console.log(favorite);
  return favorite;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
