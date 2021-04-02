import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

import { Container } from '@chakra-ui/react'
import React from 'react'

import {
  getContentfulCarouselGames,
  getContentfulGames,
} from '../clients/contentfulClient'
import { fetchGamePassGames } from '../clients/gamePassClient'
import GallerySection from '../components/GallerySection'
import GameCarousel from '../components/GameCarousel'
import LogoSection from '../components/LogoSection'
import { config } from '../config'
import { MAIN_CAROUSEL_ID } from '../constants/constants'
import { mergeListsWithKey } from '../utils/ramdaUtils'

export default function Home({ games, carouselGames }) {
  return (
    <Container maxW="container.xl">
      <LogoSection />
      <GameCarousel carouselGames={carouselGames} />
      <GallerySection games={games} />
    </Container>
  )
}

export const getStaticProps = async () => {
  const gameFetchLimit = config.env === 'dev' ? 15 : null
  const gamePassGames = await fetchGamePassGames(gameFetchLimit)

  const contentfulGames = await getContentfulGames()
  const contentfulCarouselGames = await getContentfulCarouselGames(
    MAIN_CAROUSEL_ID
  )

  const games = mergeListsWithKey([gamePassGames, contentfulGames])
  const carouselGames = mergeListsWithKey([
    gamePassGames,
    contentfulCarouselGames,
  ])

  return {
    props: {
      games,
      carouselGames,
    },
  }
}
