import { map, pick, pipe } from 'ramda'
import { fetchGamePassGames } from '../clients/gamePassClient'

export default function Home({ gamePassGames }) {
  const data = pipe(map(pick(['LocalizedProperties'])))(gamePassGames)

  return (
    <>
      <h1>Game Pass Critic</h1>
      <div>{JSON.stringify(data, null, 2)}</div>
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
