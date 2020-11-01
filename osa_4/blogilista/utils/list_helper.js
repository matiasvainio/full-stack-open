const dummy = () => 1;

const totalLikes = (blogs) => blogs.reduce((sum, order) => sum + order.likes, 0);

module.exports = {
  dummy,
  totalLikes,
};
