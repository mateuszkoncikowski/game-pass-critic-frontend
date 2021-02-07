import { createClient } from 'contentful-management'
import { map, path } from 'ramda'

import { contentfulSpace, contentfulToken } from '../config'
import { simplifyContentfulGameEntry } from '../meta/contentfulGame'
import { getTitle } from '../meta/gamePassGame'

const contentfulClient = createClient({
  accessToken: contentfulToken,
})

const getEnvironment = () =>
  contentfulClient
    .getSpace(contentfulSpace)
    .then((space) => space.getEnvironment('master'))

export const createContentfulGamePass = (game) =>
  getEnvironment().then((environment) =>
    environment.createEntryWithId('gamePassGame', game.gamePassId, {
      fields: {
        title: {
          'en-US': getTitle(game),
        },
        metaCriticScore: {
          'en-US': game.metaCriticScore,
        },
        howLongToBeatInAverage: {
          'en-US': game.howLongToBeatInAverage,
        },
      },
    })
  )

export const getContentfulGames = () =>
  getContentfulEntries('gamePassGame').then((games) =>
    map(simplifyContentfulGameEntry, games.items)
  )

export const getContentfulEntry = (entryId) =>
  getEnvironment().then((environment) => environment.getEntry(entryId))

const getContentfulEntries = (contentType) =>
  getEnvironment().then((environment) =>
    environment.getEntries({ content_type: contentType, limit: 1000 })
  )

export const getEntry = (entryId) =>
  getEnvironment()
    .then((environment) =>
      environment.getEntries({
        content_type: 'gamePassGame',
        'sys.id': entryId,
      })
    )
    .then((result) => (result.total === 1 ? result.items[0] : {}))

export const isEntryPublished = (entry) =>
  !!entry.sys.publishedVersion &&
  entry.sys.version === entry.sys.publishedVersion + 1

export const isFieldPresent = (entry, field) => path(['fields', field], entry)
