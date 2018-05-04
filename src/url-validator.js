const url = require('url')
const validUrl = require('valid-url');

function validate(inputUrl) {
  if (inputUrl === '') {
    return Promise.reject({
      statusCode: 400, // http bad request
      message: 'Url is required'
    })
  }

  let parsedUrl = url.parse(inputUrl)
  if (parsedUrl.protocol === null || parsedUrl.host === null) {
    return Promise.reject({
      statusCode: 400,
      message: 'Please use full Url (eg. http://www.yahoo.com)'
    })
  }

  // validate url using valid-url npm module
  if (validUrl.isUri(inputUrl) === undefined) {
    return Promise.reject({
      statusCode: 400,
      message: 'Please use full Url (eg. http://www.yahoo.com)'
    })
  }

  // TODO: Add a support for url for friendly url eg. google.com

  return Promise.resolve(inputUrl)
}

module.exports = validate;