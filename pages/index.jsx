import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

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
import { Carousel } from 'react-responsive-carousel'

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
  getHeroArtImageUrl,
  getPosterImageUrl,
  getTitle,
} from '../meta/gamePassGame'
import Logo from '../public/logo.svg'
import { mergeListsWithKey, useFilters } from '../utils/ramdaUtils'

export default function Home({ games, carouselGames }) {
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
    <Container maxW="container.xl">
      <Container my={7} centerContent>
        <Logo height={30} />
      </Container>
      <Carousel showThumbs={false} showIndicators={false} showStatus={false}>
        {carouselGames.map((carouselGame) => (
          <Box key={getGameId(carouselGame)} position="relative" color="white">
            <Img
              style={{ objectFit: 'cover' }}
              height="400px"
              alt={getTitle(carouselGame)}
              src={`https:${getHeroArtImageUrl(carouselGame)}`}
            />
            <Flex
              position="absolute"
              direction="column"
              top="0%"
              right="5%"
              height="100%"
              textAlign="right"
              justifyContent="space-around"
            >
              <Box>
                <Heading size="3xl">{carouselGame.metaCriticScore}</Heading>
                <Heading size="xl">Critic Score</Heading>
              </Box>
              <Box>
                <Heading size="3xl">{carouselGame.metaCriticUserScore}</Heading>
                <Heading size="xl">User Score</Heading>
              </Box>
              <Box>
                <Heading size="3xl">
                  {carouselGame.howLongToBeatHours[0]}
                </Heading>
                <Heading size="xl">Time to beat</Heading>
              </Box>
            </Flex>
            <Flex position="absolute" left="5%" bottom="5%">
              <Box>
                <Heading size="xl">
                  <Heading size="xl">{getTitle(carouselGame)}</Heading>
                </Heading>
              </Box>
            </Flex>
          </Box>
        ))}
      </Carousel>
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
