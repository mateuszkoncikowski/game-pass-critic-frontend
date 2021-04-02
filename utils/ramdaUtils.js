import {
  allPass,
  filter,
  indexBy,
  map,
  mergeRight,
  mergeWith,
  pipe,
  prop,
  propEq,
  reduce,
  reject,
  T,
  values,
} from 'ramda'

export const mergeListsWithKey = pipe(
  map(indexBy(prop('gamePassId'))),
  reduce(mergeWith(mergeRight), {}),
  values,
  reject(propEq('LastModifiedDate', undefined)),
  reject(propEq('contentfulTitle', undefined))
)

export const useFilters = (items, filters) => {
  const predicates = map((f) => (f.value === '' ? T : f.fn(f.value)))(filters)

  return filter(allPass(predicates))(items)
}
