const fs = require('fs')
const R = require('ramda')
const getGamePassGames = require('./../clients/gamePassClient')
const { getMetaCriticId } = require('../clients/metacriticClient')
const { getHowLongToBeatId } = require('../clients/howLongToBeatClient')
const logger = require('../shared/logger')

;(async () => {
  const games = await getGamePassGames()
  let gameIds = []

  for (let i = 0; i < games.length; i++) {
    const game = games[i]
    const titleToSearch = getTitleToSearch(game)

    const [metaCriticId, howLongToBeatId] = await Promise.all([
      getMetaCriticId(titleToSearch, game.gamePassId),
      getHowLongToBeatId(titleToSearch, game.gamePassId),
    ])

    logger.info(`Scraped game ${i + 1}/${games.length}: ${titleToSearch}`, {
      service: 'getIds scraper',
      howLongToBeatId,
      metaCriticId,
    })

    gameIds.push({
      title: titleToSearch,
      gamePassId: game.gamePassId,
      howLongToBeatId,
      metaCriticId,
    })
  }

  storeData(gameIds, 'result.log')
})()

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    logger.error(err)
  }
}

const STATIC_TITLES = [
  { gamePassId: '9MT8ND8BS6NB', title: 'ARK: Survival Evolved' },
  { gamePassId: '9MWB2BFF0SPD', title: 'Bloodstained: Ritual of the Night' },
  { gamePassId: '9NX9WH5F0RZD', title: 'Company of Heroes 2' },
  { gamePassId: 'C0XBNVR137DZ', title: "Don't Starve" },
  { gamePassId: '9NV3Q7WVN2RB', title: 'Endless Space 2' },
  { gamePassId: '9NF6WPNS1S73', title: 'Hearts of Iron IV' },
  { gamePassId: '', title: '' },
]

const getStaticTitle = (game) =>
  R.pipe(R.find(R.propEq('gamePassId', game.gamePassId)), R.prop('title'))

const getTitleToSearch = (game) => {
  const staticTitle = getStaticTitle(game)(STATIC_TITLES)
  return staticTitle ? staticTitle : getTitleFromGamePass(game)
}

const getTitleFromGamePass = R.pipe(
  R.prop('LocalizedProperties'),
  R.head,
  R.prop('ProductTitle'),
  R.replace(/ - game preview/i, ''),
  R.replace(/ - microsoft store edition/i, ''),
  R.replace(/microsoft store edition/i, ''),
  R.replace(/ - standard edition/i, ''),
  R.replace(/standard edition/i, ''),
  R.replace(/ - windows 10 edition/i, ''),
  R.replace(/ - windows edition/i, ''),
  R.replace(/windows 10 edition/i, ''),
  R.replace(/ - for windows 10/i, ''),
  R.replace(/ - windows 10/i, ''),
  R.replace(/windows 10/i, ''),
  R.replace(/windows/i, ''),
  R.replace(/(pc)/i, ''),
  R.replace(/- pc/i, ''),
  R.replace(/ PC/, ''),
  R.replace(/®/g, ''),
  R.replace(/™/g, ''),
  R.replace(/for windows 10/i, ''),
  R.replace(/(game preview)/i, ''),
  R.replace(/bundle/i, ''),
  R.replace(/ultimate edition/i, ''),
  R.replace(/deluxe edition/i, ''),
  R.replace(/win10/i, ''),
  R.replace(/game of the year edition/i, '')
)
