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
import { always, filter, identity, ifElse, isEmpty } from 'ramda'
import React, { useEffect, useState } from 'react'

import { getContentfulGames } from '../clients/contentfulClient'
import fetchGamePassGames from '../clients/gamePassClient'
import ScoreBox from '../components/scoreBox'
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

  // console.log(games[0].metaCriticScore)
  // console.log(games[0])

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
              <ScoreBox score={game.metaCriticScore} />
              <Box>How long to beat (avg): {game.howLongToBeatInAverage}</Box>
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
  const contentfulGames = await getContentfulGames()

  const games = mergeListsWithKey([gamePassGames, contentfulGames])

  return {
    props: {
      games,
    },
  }
}
