import { Text } from '@chakra-ui/react'

import { fetchGamePassGames } from '../clients/gamePassClient'

export default function Json({ gamePassGames }) {
  return (
    <Text fontSize="xs">
      <pre>{JSON.stringify(gamePassGames, null, 2)}</pre>
    </Text>
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
