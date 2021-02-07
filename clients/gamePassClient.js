const fetch = require('node-fetch')
const R = require('ramda')

const GAME_PASS = {
  endpoints: {
    catalog: 'https://catalog.gamepass.com/',
    displayCatalog: 'https://displaycatalog.mp.microsoft.com',
  },
  allGamesId: 'fdd9e2a7-0fee-49f6-ad69-4354098401ff',
  market: 'US',
  language: 'en-us',
  msCv: 'DGU1mcuYo0WMMp+F.1',
}

const getGamesListUrl = () => {
  const {
    endpoints: { catalog },
    language,
    market,
    allGamesId,
  } = GAME_PASS

  return `${catalog}/sigls/v2?id=${allGamesId}&language=${language}&market=${market}`
}

const getGamesContentUrl = (gamePassGamesIds) => {
  const {
    endpoints: { displayCatalog },
    market,
    language,
    msCv,
  } = GAME_PASS

  return `${displayCatalog}/v7.0/products?bigIds=${gamePassGamesIds}&market=${market}&languages=${language}&MS-CV=${msCv}`
}

const addGamePassIdPropIntoGame = (game) => ({
  ...game,
  gamePassId: game['ProductId'],
})

async function fetchGamePassGames() {
  const gamePassGamesIds = await fetch(getGamesListUrl())
    .then((res) => res.json())
    .then((data) => R.pipe(R.tail, R.map(R.prop('id')), R.join(','))(data))

  return await fetch(getGamesContentUrl(gamePassGamesIds))
    .then((res) => res.json())
    .then((data) => data['Products'])
    .then(R.map(addGamePassIdPropIntoGame))
}

module.exports = fetchGamePassGames
