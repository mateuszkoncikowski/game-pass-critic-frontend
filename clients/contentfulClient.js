import { createClient } from 'contentful'
import { andThen, map, otherwise, path, pipe } from 'ramda'

import { config } from '../config'
import { simplifyContentfulGameEntry } from '../meta/contentfulGame'

const contentfulClient = createClient({
  accessToken: config.contentfulToken,
  space: config.contentfulSpace,
})

export const getContentfulGames = () =>
  getContentfulEntries('gamePassGame').then((games) =>
    map(simplifyContentfulGameEntry, games.items)
  )

export const getContentfulCarouselGames = (carouselId) =>
  pipe(
    getContentfulEntry,
    andThen(pipe(path(['fields', 'games']), map(simplifyContentfulGameEntry))),
    otherwise(() => [])
  )(carouselId)

export const getContentfulEntry = (entryId) =>
  contentfulClient.getEntry(entryId)

const getContentfulEntries = (contentType) =>
  contentfulClient.getEntries({ content_type: contentType, limit: 1000 })

export const getEntry = (entryId) =>
  contentfulClient
    .getEntries({
      content_type: 'gamePassGame',
      'sys.id': entryId,
    })
    .then((result) => (result.total === 1 ? result.items[0] : {}))

export const isEntryPublished = (entry) =>
  !!entry.sys.publishedVersion &&
  entry.sys.version === entry.sys.publishedVersion + 1

export const isFieldPresent = (entry, field) => path(['fields', field], entry)
