const dotenv = require('dotenv')

dotenv.config()

export const config = {
  contentfulSpace: process.env.CONTENTFUL_SPACE,
  contentfulToken: process.env.CONTENTFUL_TOKEN,
}
