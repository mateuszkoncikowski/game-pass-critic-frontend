import { differenceInMonths } from 'date-fns'
import { concat, head, map, pipe, prop, tail, uniq } from 'ramda'

import {
  GAME_PASS,
  getGamesContentUrl,
  getGamesListUrl,
} from '../constants/gamePassContants.js'

const getReleaseDate = pipe(
  prop('MarketProperties'),
  head,
  prop('OriginalReleaseDate')
)

const addGamePassIdPropIntoGame = (game) => ({
  ...game,
  gamePassId: game['ProductId'],
  monthsSinceRelease: differenceInMonths(
    new Date(),
    new Date(getReleaseDate(game))
  ),
})

const getGamesData = pipe(tail, map(prop('id')))

const fetchGamePassCategory = async (gamesCategoryId) =>
  await fetch(getGamesListUrl(gamesCategoryId))
    .then((res) => res.json())
    .then((data) => getGamesData(data))

export async function getGamePassGames(limit = null) {
  const [gamePassPcGamesIds, gamePassConsoleGamesIds] = await Promise.all([
    fetchGamePassCategory(GAME_PASS.categories.allPcGamesId),
    fetchGamePassCategory(GAME_PASS.categories.allConsoleGamesId),
  ])

  const uniqGameList = uniq(concat(gamePassPcGamesIds, gamePassConsoleGamesIds))
  const limitedUniqGameList = limit
    ? uniqGameList.slice(0, limit)
    : uniqGameList

  return await fetch(getGamesContentUrl(limitedUniqGameList))
    .then((res) => res.json())
    .then((data) => data['Products'])
    .then(map(addGamePassIdPropIntoGame))
}
