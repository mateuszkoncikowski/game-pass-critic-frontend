import { Box, Container, Heading, Img, SimpleGrid } from '@chakra-ui/react'
import {
  filter,
  indexBy,
  map,
  mergeRight,
  mergeWith,
  pipe,
  prop,
  reduce,
  values,
} from 'ramda'

import { fetchGamePassGames } from '../clients/gamePassClient'
import { getGameTimeToBeat } from '../clients/howLongToBeatClient'
import { getGameScore } from '../clients/metacriticClient'
import { GAME_IDS } from '../constants/gamesIds'
import { getGameId, getPosterImageUrl, getTitle } from '../meta/gamePassGame'

export default function Home({ gamePassGames, gameScore, gameTimeToBeat }) {
  const gamePassGamesWithGamePassId = gamePassGames.map((gp) => ({
    ...gp,
    gamePassId: gp['ProductId'],
  }))

  const fn = pipe(
    map(indexBy(prop('gamePassId'))),
    reduce(mergeWith(mergeRight), {}),
    values
  )

  const games = fn([gameScore, gamePassGamesWithGamePassId, gameTimeToBeat])

  return (
    <Container maxW="960px">
      <Heading my={10}>Game Pass Critic</Heading>
      <SimpleGrid columns={3} spacing={5}>
        {games.map((game) => {
          return (
            <Box fontSize="xs" key={getGameId(game)} height="100%">
              <Box>{getTitle(game)}</Box>
              <Box>{game.score}</Box>
              <Box>{game.timeToBeat}</Box>
              <Img
                alt={getTitle(game)}
                borderRadius="5px"
                src={getPosterImageUrl(game)}
              />
            </Box>
          )
        })}
      </SimpleGrid>
    </Container>
  )
}

export const getStaticProps = async () => {
  const gamePassGames = await fetchGamePassGames()
  const gameScore = await pipe(
    filter((id) => !!id.metaCritic),
    getGameScore
  )(GAME_IDS)

  const gameTimeToBeat = await pipe(
    filter((id) => !!id.howLongToBeat),
    getGameTimeToBeat
  )(GAME_IDS)

  return {
    props: {
      gamePassGames,
      gameScore,
      gameTimeToBeat,
    },
  }
}
