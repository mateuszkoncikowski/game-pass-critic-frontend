import { Heading } from '@chakra-ui/react'
import { map, pick, pipe } from 'ramda'

import { fetchGamePassGames } from '../clients/gamePassClient'

export default function Home({ gamePassGames }) {
  const data = pipe(map(pick(['LocalizedProperties'])))(gamePassGames)

  return (
    <>
      <Heading>Game Pass Critic</Heading>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
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
