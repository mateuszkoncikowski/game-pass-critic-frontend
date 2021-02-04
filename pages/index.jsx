import { Box, Container, Heading, Img, SimpleGrid } from '@chakra-ui/react'

import { fetchGamePassGames } from '../clients/gamePassClient'
import { getPosterImageUrl, getTitle } from '../meta/gamePassGame'

export default function Home({ gamePassGames }) {
  return (
    <Container maxW="960px">
      <Heading my={10}>Game Pass Critic</Heading>
      <SimpleGrid columns={3} spacing={5}>
        {gamePassGames.map((game, index) => {
          return (
            <Box key={index} height="100%">
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
