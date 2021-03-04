import {
  indexBy,
  map,
  mergeRight,
  mergeWith,
  pipe,
  prop,
  propEq,
  reduce,
  reject,
  values,
} from 'ramda'

export const mergeListsWithKey = pipe(
  map(indexBy(prop('gamePassId'))),
  reduce(mergeWith(mergeRight), {}),
  values,
  reject(propEq('LastModifiedDate', undefined))
)
