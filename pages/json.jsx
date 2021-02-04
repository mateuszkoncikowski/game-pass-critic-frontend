import { Box } from '@chakra-ui/react'

import { fetchGamePassGames } from '../clients/gamePassClient'
import { getGameScore } from '../clients/metacriticClient'

export default function Json({ gamePassGames, gameScore }) {
  return (
    <Box fontSize="xs">
      <div>
        {gameScore.map((s) => (
          <div key={s}>{s}</div>
        ))}
      </div>
      <pre>{JSON.stringify(gamePassGames[0], null, 2)}</pre>
    </Box>
  )
}

export const getStaticProps = async () => {
  const gamePassGames = await fetchGamePassGames()
  const gameScore = await getGameScore([
    'age-of-empires-iii-definitive-edition',
    'spelunky-2',
  ])
  return {
    props: {
      gamePassGames,
      gameScore,
    },
  }
}
