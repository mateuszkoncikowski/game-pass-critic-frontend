import {
  equals,
  find,
  flatten,
  head,
  includes,
  isNil,
  map,
  not,
  path,
  pathOr,
  pipe,
  prop,
  propEq,
  replace,
  toLower,
  uniq,
} from 'ramda'

export const getLocalizedProps = pipe(prop('LocalizedProperties'), head)

const getImage = (purpose) =>
  pipe(getLocalizedProps, prop('Images'), find(propEq('ImagePurpose', purpose)))

export const getPosterImageUrl = pipe(getImage('Poster'), prop('Uri'))

export const getHeroArtImageUrl = pipe(getImage('SuperHeroArt'), prop('Uri'))

export const getPlatformsInfo = (game) => ({
  isConsoleCompatible:
    getTitle(game) === 'Minecraft'
      ? true
      : pipe(
          path(['Properties', 'XboxConsoleGenCompatible']),
          isNil,
          not
        )(game),
  isPcCompatible: pipe(
    path(['DisplaySkuAvailabilities']),
    head,
    path(['Availabilities']),
    head,
    path(['Conditions', 'ClientConditions', 'AllowedPlatforms']),
    head,
    prop('PlatformName'),
    equals('Windows.Desktop')
  )(game),
})

export const getTitle = pipe(getLocalizedProps, prop('ProductTitle'))

export const getGameId = prop('ProductId')

export const getCategories = pathOr([], ['Properties', 'Categories'])

export const trimCategory = pipe(replace(/ /g, ''), toLower)

export const getGamesCategories = pipe(
  map(getCategories),
  flatten,
  uniq,
  map((category) => ({
    name: category,
    value: trimCategory(category),
  }))
)

export const filterTitle = (filter) => (game) => {
  const title = getTitle(game)

  if (filter) {
    return title.toLowerCase().includes(filter.toLowerCase())
  }
  return false
}

export const filterCategory = (filter) => (game) => {
  const categories = pipe(getCategories, map(trimCategory))(game)

  return includes(filter, categories)
}

export const filterReleaseDate = (filter) => (game) =>
  game.monthsSinceRelease <= parseInt(filter)
