const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  contentfulSpace: process.env.CONTENTFUL_SPACE,
  contentfulToken: process.env.CONTENTFUL_TOKEN,
}
