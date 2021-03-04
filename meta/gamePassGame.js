import { find, head, pipe, prop, propEq } from 'ramda'

export const getLocalizedProps = pipe(prop('LocalizedProperties'), head)

export const getPosterImageUrl = pipe(
  getLocalizedProps,
  prop('Images'),
  find(propEq('ImagePurpose', 'Poster')),
  prop('Uri')
)

export const getTitle = pipe(getLocalizedProps, prop('ProductTitle'))

export const getGameId = prop('ProductId')
