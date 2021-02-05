import { Box } from '@chakra-ui/react'

import { fetchGamePassGames } from '../clients/gamePassClient'

export default function Json({ gamePassGames }) {
  return (
    <Box fontSize="xs">
      <pre>{JSON.stringify(gamePassGames, null, 2)}</pre>
    </Box>
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
