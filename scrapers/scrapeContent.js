const R = require('ramda')
const fetchGamePassGames = require('../clients/gamePassClient')
const createContentfulGamePass = require('../clients/contentfulManagementClient')
const logger = require('../shared/logger')
const { getGameTimeToBeat } = require('../clients/howLongToBeatClient')
const { getGameScore } = require('../clients/metacriticClient')
const { GAME_IDS } = require('../constants/gamesIds')

;(async () => {
  const games = await fetchGamePassGames()

  for (let i = 0; i < games.length; i++) {
    const game = games[i]
    const gameIds = R.find(R.propEq('gamePassId', game.gamePassId))(GAME_IDS)

    const [metaCriticScore, howLongToBeatInAverage] = await Promise.all([
      getGameScore(gameIds),
      getGameTimeToBeat(gameIds),
    ])

    await createContentfulGamePass({
      ...game,
      howLongToBeatInAverage,
      metaCriticScore,
    }).then((entry) => entry.publish())

    logger.info(
      `Game published has been published ${i + 1}/${games.length}: ${
        game.title
      }`,
      {
        service: 'getContent scraper',
        metaCriticScore,
        howLongToBeatInAverage,
      }
    )
  }
})()
