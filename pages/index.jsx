import {
  Box,
  Container,
  Flex,
  Heading,
  Img,
  Input,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react'
import {
  always,
  filter,
  identity,
  ifElse,
  isEmpty,
  not,
  pipe,
  prop,
} from 'ramda'
import React, { useEffect, useState } from 'react'

import { fetchGamePassGames } from '../clients/gamePassClient'
import { getGameTimeToBeat } from '../clients/howLongToBeatClient'
import { getGameScore } from '../clients/metacriticClient'
import ScoreBox from '../components/scoreBox'
import { GAME_IDS } from '../constants/gamesIds'
import { getGameId, getPosterImageUrl, getTitle } from '../meta/gamePassGame'
import { mergeListsWithKey } from '../utils/ramdaUtils'

const useFilter = (items, filterValue, fn) => {
  const filterFn = ifElse(
    always(isEmpty(filterValue)),
    identity,
    filter((item) => fn(filterValue, item))
  )
  return filterFn(items)
}

export const filterGame = (filter, game) => {
  const title = getTitle(game)

  if (filter) {
    return title.toLowerCase().includes(filter.toLowerCase())
  }
  return false
}

export default function Home({ games }) {
  const [searchValue, setSearchValue] = useState('')
  const [filteredGames, setFilteredGames] = useState(games)

  useEffect(() => {
    setFilteredGames(useFilter(games, searchValue, filterGame))
  }, [searchValue])

  return (
    <Container maxW="960px">
      <Flex>
        <Heading my={10}>Game Pass Critic</Heading>
        <Spacer />
        <Input
          my={10}
          w="100"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
          placeholder="Search for game ..."
        />
      </Flex>
      <SimpleGrid columns={3} spacing={5}>
        {filteredGames.map((game) => {
          return (
            <Box fontSize="xs" key={getGameId(game)} height="100%">
              <ScoreBox score={game.score} />
              <Box>How long to beat (avg): {game.timeToBeat}</Box>
              <Img
                alt={getTitle(game)}
                borderRadius="6px"
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
  const gamesScore = await pipe(
    filter(pipe(prop('metaCritic'), isEmpty, not)),
    getGameScore
  )(GAME_IDS)

  const gamesTimeToBeat = await pipe(
    filter(pipe(prop('howLongToBeat'), isEmpty, not)),
    getGameTimeToBeat
  )(GAME_IDS)

  const games = mergeListsWithKey([gamePassGames, gamesScore, gamesTimeToBeat])

  return {
    props: {
      games,
    },
  }
}
