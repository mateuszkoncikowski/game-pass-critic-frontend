import {
  always,
  head,
  identity,
  ifElse,
  isEmpty,
  join,
  map,
  path,
  pathOr,
  pipe,
  reject,
  split,
  zip,
} from 'ramda'

const getFieldValue = (field) => pathOr('N/A', ['fields', field])
const getNumericFieldValue = (field) => pathOr(0, ['fields', field])

const convertTimeToNumber = pipe(
  getFieldValue('howLongToBeatHours'),
  head,
  split('Hours'),
  head,
  split(''),
  map(parseInt),
  reject(isNaN),
  join('')
)

export const simplifyContentfulGameEntry = (contentfulGame) => ({
  gamePassId: path(['sys', 'id'], contentfulGame),
  contentfulTitle: getFieldValue('title')(contentfulGame),
  metaCriticScore: getNumericFieldValue('metaCriticScore')(contentfulGame),
  metaCriticUserScore: getNumericFieldValue('metaCriticUserScore')(
    contentfulGame
  ),
  metaCriticHref: getFieldValue('metaCriticHref')(contentfulGame),
  howLongToBeatGameId: getFieldValue('howLongToBeatGameId')(contentfulGame),
  howLongToBeatMainStory: pipe(
    convertTimeToNumber,
    ifElse(isEmpty, always(0), identity)
  )(contentfulGame),
  howLongToBeatCategories: getFieldValue('howLongToBeatCategories')(
    contentfulGame
  ),
  howLongToBeatHours: getFieldValue('howLongToBeatHours')(contentfulGame),
  howLongToBeat: zip(
    getFieldValue('howLongToBeatCategories')(contentfulGame),
    getFieldValue('howLongToBeatHours')(contentfulGame)
  ),
})
