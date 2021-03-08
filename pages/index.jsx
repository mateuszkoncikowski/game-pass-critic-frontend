import {
  Box,
  Container,
  Flex,
  Heading,
  Img,
  Input,
  Select,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react'
import { allPass, filter, includes, isEmpty, map, pipe, T } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { getContentfulGames } from '../clients/contentfulClient'
import { fetchGamePassGames } from '../clients/gamePassClient'
import ScoreBox from '../components/scoreBox'
import {
  getCategories,
  getGameId,
  getGamesCategories,
  getPosterImageUrl,
  getTitle,
  trimCategory,
} from '../meta/gamePassGame'
import { mergeListsWithKey } from '../utils/ramdaUtils'

const useFilters = (items, filters) => {
  const predicates = map((f) => (f.value === '' ? T : f.fn(f.value)))(filters)

  return filter(allPass(predicates))(items)
}

export const filterTitle = (filter) => (game) => {
  const title = getTitle(game)

  if (filter) {
    return title.toLowerCase().includes(filter.toLowerCase())
  }
  return false
}

export const filterCategory = (filter) => (game) => {
  const categories = pipe(getCategories, map(trimCategory))(game)

  return includes(filter, categories)
}

export default function Home({ games }) {
  const [filteredGames, setFilteredGames] = useState(games)

  const { register, watch } = useForm({ mode: 'onBlur' })
  const searchedGameTitle = watch('game-filter')
  const selectedGameGenre = watch('game-genre')

  useEffect(() => {
    setFilteredGames(
      useFilters(games, [
        { value: searchedGameTitle, fn: filterTitle },
        { value: selectedGameGenre, fn: filterCategory },
      ])
    )
  }, [searchedGameTitle, selectedGameGenre])

  const categories = getGamesCategories(
    isEmpty(searchedGameTitle) ? games : filteredGames
  )

  return (
    <Container maxW="960px">
      <form>
        <Flex>
          <Heading my={10}>Game Pass Critic</Heading>
          <Spacer />
          <Flex my={10}>
            <Input
              name="game-filter"
              mr={2}
              ref={register}
              placeholder="Search for game ..."
            />
            <Select
              name="game-genre"
              ref={register}
              placeholder="Select game genre"
            >
              {categories.map((c) => (
                <option value={c.value} key={c.value}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
        <SimpleGrid columns={3} spacing={5}>
          {filteredGames.map((game) => (
            <Box fontSize="xs" key={getGameId(game)} height="100%">
              <ScoreBox score={game.metaCriticScore} />
              <Img
                alt={getTitle(game)}
                borderRadius="6px"
                src={getPosterImageUrl(game)}
              />
            </Box>
          ))}
        </SimpleGrid>
      </form>
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
