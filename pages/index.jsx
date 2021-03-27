import {
  Box,
  Container,
  Flex,
  Img,
  Input,
  Select,
  SimpleGrid,
  Spacer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { isEmpty } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  getContentfulCarouselGames,
  getContentfulGames,
} from '../clients/contentfulClient'
import { fetchGamePassGames } from '../clients/gamePassClient'
import ScoreBox, { scoreCond, userScoreCond } from '../components/scoreBox'
import { config } from '../config'
import { MAIN_CAROUSEL_ID } from '../constants/constants'
import {
  filterCategory,
  filterTitle,
  getGameId,
  getGamesCategories,
  getPosterImageUrl,
  getTitle,
} from '../meta/gamePassGame'
import Logo from '../public/logo.svg'
import { mergeListsWithKey, useFilters } from '../utils/ramdaUtils'

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
    <Container maxW="100%" centerContent>
      <Box my={12}>
        <Logo height={30} />
      </Box>
      <form>
        <Flex h={100} align="center">
          <Spacer />
          <Flex>
            <Input
              name="game-filter"
              mr={2}
              ref={register}
              placeholder="Search for game"
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
            <Box fontSize="xs" key={getGameId(game)} height="100%" pb="8">
              <Flex align="flex-end" py="2">
                <ScoreBox
                  score={game.metaCriticScore}
                  scoreColorsConditions={scoreCond}
                  mr="2"
                />
                <ScoreBox
                  score={game.metaCriticUserScore}
                  scoreColorsConditions={userScoreCond}
                  size="small"
                />
              </Flex>
              <Img
                alt={getTitle(game)}
                borderRadius="6px"
                src={getPosterImageUrl(game)}
              />
              <Flex pt="2">
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Category</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {game.howLongToBeat &&
                      game.howLongToBeat.map((time, i) => (
                        <Tr key={i}>
                          <Td>{time[0]}</Td>
                          <Td>{time[1]}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </form>
    </Container>
  )
}

export const getStaticProps = async () => {
  const gameFetchLimit = config.env === 'dev' ? 15 : null
  const gamePassGames = await fetchGamePassGames(gameFetchLimit)

  const contentfulGames = await getContentfulGames()
  const contentfulCarouselGames = await getContentfulCarouselGames(
    MAIN_CAROUSEL_ID
  )

  const games = mergeListsWithKey([gamePassGames, contentfulGames])
  const carouselGames = mergeListsWithKey([
    gamePassGames,
    contentfulCarouselGames,
  ])

  return {
    props: {
      games,
      carouselGames,
    },
  }
}
