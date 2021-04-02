import { path, zip } from 'ramda'

const getFieldValue = (field) => path(['fields', field])

export const simplifyContentfulGameEntry = (contentfulGame) => ({
  gamePassId: path(['sys', 'id'], contentfulGame),
  contentfulTitle: getFieldValue('title')(contentfulGame),
  metaCriticScore: getFieldValue('metaCriticScore')(contentfulGame),
  metaCriticUserScore: getFieldValue('metaCriticUserScore')(contentfulGame),
  metaCriticHref: getFieldValue('metaCriticHref')(contentfulGame),
  howLongToBeatGameId: getFieldValue('howLongToBeatGameId')(contentfulGame),
  howLongToBeatCategories: getFieldValue('howLongToBeatCategories')(
    contentfulGame
  ),
  howLongToBeatHours: getFieldValue('howLongToBeatHours')(contentfulGame),
  howLongToBeat: zip(
    getFieldValue('howLongToBeatCategories')(contentfulGame),
    getFieldValue('howLongToBeatHours')(contentfulGame)
  ),
})
