import { Box, Container, Heading, Img, SimpleGrid } from '@chakra-ui/react'

import { fetchGamePassGames } from '../clients/gamePassClient'
import { getGameId, getPosterImageUrl, getTitle } from '../meta/gamePassGame'

export default function Home({ gamePassGames }) {
  return (
    <Container maxW="960px">
      <Heading my={10}>Game Pass Critic</Heading>
      <SimpleGrid columns={3} spacing={5}>
        {gamePassGames.map((game) => {
          return (
            <Box fontSize="xs" key={getGameId(game)} height="100%">
              <Box>{getTitle(game)}</Box>
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
  return {
    props: {
      gamePassGames,
    },
  }
}
