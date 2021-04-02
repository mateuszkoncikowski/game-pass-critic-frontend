import {
  Box,
  Flex,
  Heading,
  Img,
  Input,
  Select,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react'
import { isEmpty } from 'ramda'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactPaginate from 'react-paginate'

import {
  filterCategory,
  filterTitle,
  getGameId,
  getGamesCategories,
  getPosterImageUrl,
  getTitle,
} from '../meta/gamePassGame'
import ClockIcon from '../public/clock.svg'
import CriticScoreIcon from '../public/criticScore.svg'
import UserScoreIcon from '../public/userScore.svg'
import { useFilters } from '../utils/ramdaUtils'
import GalleryDataRow from './GalleryDataRow'

const GallerySection = ({ games }) => {
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

  const [offset, setOffset] = useState(0)
  const [data, setData] = useState([])
  const [perPage] = useState(8)
  const [pageCount, setPageCount] = useState(0)

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setOffset(selectedPage + 1)
  }

  const calculateGamesForPagination = () => {
    const slice = filteredGames.slice(offset, offset + perPage)
    setData(slice)
    setPageCount(Math.ceil(filteredGames.length / perPage))
  }

  useEffect(() => {
    calculateGamesForPagination()
  }, [offset, filteredGames])

  return (
    <Box
      maxW="100%"
      my={10}
      p={10}
      border="1px"
      borderRadius="10px"
      borderColor="gray.100"
    >
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
        <SimpleGrid columns={4} spacingX="50px" spacingY="25px">
          {data.map((game) => (
            <Box fontSize="xs" key={getGameId(game)} height="100%">
              <Img
                alt={getTitle(game)}
                borderRadius="10px"
                src={getPosterImageUrl(game)}
              />
              <Flex pt="2" flexDirection="column">
                <Heading
                  as="h3"
                  size="xs"
                  py={2}
                  fontWeight="normal"
                  textAlign="center"
                >
                  {getTitle(game)}
                </Heading>
                <Box>
                  <GalleryDataRow
                    icon={<CriticScoreIcon />}
                    value={`${game.metaCriticScore} / 100`}
                    category="CriticScore"
                  />
                  <GalleryDataRow
                    icon={<UserScoreIcon />}
                    value={`${game.metaCriticUserScore} / 10`}
                    category="User Score"
                  />
                  {game.howLongToBeat &&
                    game.howLongToBeat.map((time, i) => (
                      <GalleryDataRow
                        key={i}
                        icon={<ClockIcon />}
                        value={time[1]}
                        category={time[0]}
                      />
                    ))}
                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </form>
      <Flex justifyContent="center" mt={10}>
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </Flex>
    </Box>
  )
}

export default GallerySection
