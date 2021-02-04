import { Box } from '@chakra-ui/react'
import { map, pipe } from 'ramda'

import { fetchGamePassGames } from '../clients/gamePassClient'
import { getGameId, getTitle } from '../meta/gamePassGame'

export default function Json({ gamePassGames }) {
  const getId = (game) => ({
    title: getTitle(game),
    gamePassId: getGameId(game),
    metaCritic: '',
  })

  const games = pipe(map(getId))(gamePassGames)

  return (
    <Box fontSize="xs">
      <pre>{JSON.stringify(gamePassGames, null, 2)}</pre>
      <pre>{JSON.stringify(games, null, 2)}</pre>
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
