import { path } from 'ramda'

export const simplifyContentfulGameEntry = (contentfulGame) => ({
  gamePassId: path(['sys', 'id'], contentfulGame),
  metaCriticScore: path(['fields', 'metaCriticScore'], contentfulGame),
  howLongToBeatCategories: path(
    ['fields', 'howLongToBeatCategories'],
    contentfulGame
  ),
  howLongToBeatHours: path(['fields', 'howLongToBeatHours'], contentfulGame),
})
