import {
  find,
  flatten,
  head,
  map,
  pathOr,
  pipe,
  prop,
  propEq,
  replace,
  toLower,
  uniq,
} from 'ramda'

export const getLocalizedProps = pipe(prop('LocalizedProperties'), head)

export const getPosterImageUrl = pipe(
  getLocalizedProps,
  prop('Images'),
  find(propEq('ImagePurpose', 'Poster')),
  prop('Uri')
)

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
