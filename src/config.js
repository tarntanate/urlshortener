const config = {
  port: process.env.PORT || 3000,
  mode: process.env.NODE_ENV === undefined ? 'development' : process.env.NODE_ENV,
  urlLength: 5,
  hostname: 'http://localhost',
  linkToShortUrl: '/g',
};

module.exports = config;