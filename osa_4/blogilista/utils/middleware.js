const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    // request.json({ token: authorization.substring(7) });
    request.token = authorization.substring(7);
  }
  next();
};

module.exports = { tokenExtractor };
