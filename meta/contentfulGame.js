import { path } from 'ramda'

export const simplifyContentfulGameEntry = (contentfulGame) => ({
  gamePassId: path(['sys', 'id'], contentfulGame),
  metaCriticScore: path(['fields', 'metaCriticScore', 'en-US'], contentfulGame),
  howLongToBeatCategories: path(
    ['fields', 'howLongToBeatCategories', 'en-US'],
    contentfulGame
  ),
  howLongToBeatHours: path(
    ['fields', 'howLongToBeatHours', 'en-US'],
    contentfulGame
  ),
})
