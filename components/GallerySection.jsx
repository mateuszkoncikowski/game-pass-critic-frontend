import {
  Box,
  Flex,
  Heading,
  Img,
  Input,
  Link,
  Select,
  SimpleGrid,
} from '@chakra-ui/react'
import {
  always,
  ascend,
  cond,
  descend,
  equals,
  ifElse,
  isEmpty,
  prop,
  sort,
  T,
} from 'ramda'
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
import ArrowIcon from './ArrowIcon'
import GalleryDataRow from './GalleryDataRow'

const GallerySection = ({ games }) => {
  const [filteredAndSortedGames, setFilteredAndSortedGames] = useState(games)
  const [sortDirection, setSortDirection] = useState('descend')

  const { register, watch, setValue, getValues } = useForm({
    mode: 'onBlur',
    defaultValues: { gameSort: null },
  })
  const searchedGameTitle = watch('gameFilter')
  const selectedGameGenre = watch('gameGenre')
  const categoryToSort = watch('gameSort')

  useEffect(() => {
    setValue('gameSort', 'criticScore')
  }, [])

  useEffect(() => {
    const filteredGames = useFilters(games, [
      { value: searchedGameTitle, fn: filterTitle },
      { value: selectedGameGenre, fn: filterCategory },
    ])

    const sortProp = cond([
      [equals('criticScore'), always('metaCriticScore')],
      [equals('userScore'), always('metaCriticUserScore')],
      [equals('timeToBeat'), always('howLongToBeatMainStory')],
      [T, always('metaCriticScore')],
    ])(categoryToSort)

    const sortDescend = sort(descend(prop(sortProp)))
    const sortAscend = sort(ascend(prop(sortProp)))

    const sortedGames = ifElse(
      equals('descend'),
      () => sortDescend(filteredGames),
      () => sortAscend(filteredGames)
    )(sortDirection)

    setFilteredAndSortedGames(sortedGames)
  }, [searchedGameTitle, selectedGameGenre, categoryToSort, sortDirection])

  const categories = getGamesCategories(
    isEmpty(searchedGameTitle) ? games : filteredAndSortedGames
  )

  const [offset, setOffset] = useState(0)
  const [paginatedData, setPaginatedData] = useState([])
  const [perPage] = useState(12)
  const [pageCount, setPageCount] = useState(0)

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setOffset(selectedPage * perPage)
  }

  const calculateGamesForPagination = () => {
    const slice = filteredAndSortedGames.slice(offset, offset + perPage)
    setPaginatedData(slice)
    setPageCount(Math.ceil(filteredAndSortedGames.length / perPage))
  }

  useEffect(() => {
    calculateGamesForPagination()
  }, [offset, filteredAndSortedGames])

  return (
    <Box
      maxW="100%"
      my={10}
      p={{ base: 5, md: 10 }}
      border="1px"
      borderRadius="10px"
      borderColor="gray.100"
    >
      <form>
        <Flex
          flexDirection={['column', 'column', 'row']}
          justifyContent="space-between"
          mb={10}
          alignItems="center"
        >
          <Flex alignItems="center" w="100%" mb={{ base: '4', md: '0' }}>
            <Select
              name="gameSort"
              ref={register}
              w={{ base: '100%', md: '50%' }}
              mr={5}
            >
              <option value="criticScore">Sort by: Critic Score</option>
              <option value="userScore">Sort by: User Score</option>
              <option value="timeToBeat">Sort by: Time to Beat</option>
            </Select>
            <Link mr={2} onClick={() => setSortDirection('descend')}>
              <ArrowIcon
                color={sortDirection === 'descend' ? `green` : 'gray'}
                direction="up"
              />
            </Link>
            <Link onClick={() => setSortDirection('ascend')}>
              <ArrowIcon
                color={sortDirection === 'ascend' ? `green` : 'gray'}
                direction="down"
              />
            </Link>
          </Flex>
          <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            w="100%"
            justifyContent="end"
          >
            <Input
              name="gameFilter"
              mr={2}
              mb={{ base: '4', md: '0' }}
              ref={register}
              placeholder="Search for game"
              w={{ base: '100%', md: '40%' }}
            />
            <Select
              name="gameGenre"
              ref={register}
              placeholder="Select game genre"
              w={{ base: '100%', md: '40%' }}
            >
              {categories.map((c) => (
                <option value={c.value} key={c.value}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
        <SimpleGrid
          columns={[1, 2, 3, 4]}
          spacingX={{ base: 25, lg: 50 }}
          spacingY="25px"
        >
          {paginatedData.map((game) => {
            const criticScore =
              game.metaCriticScore === 0
                ? 'N/A'
                : `${game.metaCriticScore} / 100`
            const userScore =
              game.metaCriticUserScore === 0
                ? 'N/A'
                : `${game.metaCriticUserScore} / 10`

            return (
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
                      value={criticScore}
                      category="CriticScore"
                      highlighted={getValues('gameSort') === 'criticScore'}
                    />
                    <GalleryDataRow
                      icon={<UserScoreIcon />}
                      value={userScore}
                      category="User Score"
                      highlighted={getValues('gameSort') === 'userScore'}
                    />
                    {game.howLongToBeat &&
                      game.howLongToBeat.map((time, i) => (
                        <GalleryDataRow
                          key={i}
                          icon={<ClockIcon />}
                          value={time[1]}
                          category={time[0]}
                          highlighted={
                            i === 0 && getValues('gameSort') === 'timeToBeat'
                          }
                        />
                      ))}
                  </Box>
                </Flex>
              </Box>
            )
          })}
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
