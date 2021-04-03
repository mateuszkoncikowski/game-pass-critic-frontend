import { Box, Container, Flex, Heading } from '@chakra-ui/react'

import FooterGameCard from './FooterGameCard'

const FooterSection = ({ footer: { title, games } }) => (
  <Box backgroundColor="#107c10" pb={8} display={{ base: 'none', md: 'block' }}>
    <Container maxW="container.xl">
      <Heading
        color="white"
        as="h3"
        textAlign="center"
        textTransform="uppercase"
        fontSize="3xl"
        py={8}
      >
        {title}
      </Heading>
      <Flex justifyContent="space-around" mx={20}>
        {games.map((game) => (
          <FooterGameCard key={game.gamePassId} game={game} />
        ))}
      </Flex>
    </Container>
  </Box>
)

export default FooterSection
