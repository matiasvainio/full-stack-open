const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    response.json({ token: authorization.substring(7) });
  }
  next();
};

module.exports = { tokenExtractor };
