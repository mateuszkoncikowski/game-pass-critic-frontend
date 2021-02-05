import {
  indexBy,
  map,
  mergeRight,
  mergeWith,
  pipe,
  prop,
  reduce,
  values,
} from 'ramda'

export const mergeListsWithKey = pipe(
  map(indexBy(prop('gamePassId'))),
  reduce(mergeWith(mergeRight), {}),
  values
)
