const { contentfulSpace, contentfulToken } = require('../config')
const { createClient } = require('contentful-management')

const contentfulClient = createClient({
  accessToken: contentfulToken,
})

const getEnvironment = () =>
  contentfulClient
    .getSpace(contentfulSpace)
    .then((space) => space.getEnvironment('master'))

const createContentfulGamePass = (game) =>
  getEnvironment().then((environment) =>
    environment.createEntryWithId('gamePassGame', game.gamePassId, {
      fields: {
        title: {
          'en-US': game['LocalizedProperties'][0]['ProductTitle'],
        },
        metaCriticScore: {
          'en-US': game.metaCriticScore,
        },
        howLongToBeatInAverage: {
          'en-US': game.howLongToBeatInAverage,
        },
      },
    })
  )

module.exports = createContentfulGamePass
