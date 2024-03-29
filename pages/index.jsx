import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

import { Container } from '@chakra-ui/react'
import { prop } from 'ramda'
import React from 'react'

import {
  getContentfulCarouselGames,
  getContentfulGames,
  getContentfulGamesRow,
} from '../clients/contentfulClient'
import { getGamePassGames } from '../clients/gamePassClient'
import FooterSection from '../components/FooterSection'
import GallerySection from '../components/GallerySection'
import GameCarousel from '../components/GameCarousel'
import LogoSection from '../components/LogoSection'
import { config } from '../config'
import { FOOTER_GAMES_ROW_ID, MAIN_CAROUSEL_ID } from '../constants/constants'
import { mergeListsWithKey } from '../utils/ramdaUtils'

export default function Home({ games, carouselGames, footerGamesRow }) {
  return (
    <>
      <Container maxW="container.xl" p={{ base: 5, md: 10 }}>
        <LogoSection />
        <GameCarousel games={carouselGames} />
        <GallerySection games={games} />
      </Container>
      <FooterSection footer={footerGamesRow} />
    </>
  )
}

export const getStaticProps = async () => {
  const gameFetchLimit = config.env === 'dev' ? 50 * 12 : null
  const gamePassGames = await getGamePassGames(gameFetchLimit)

  const contentfulGames = await getContentfulGames()
  const contentfulCarouselGames = await getContentfulCarouselGames(
    MAIN_CAROUSEL_ID
  )
  const contentfulFooterGamesRow = await getContentfulGamesRow(
    FOOTER_GAMES_ROW_ID
  )

  const footerGamesRow = {
    title: prop('title')(contentfulFooterGamesRow),
    games: mergeListsWithKey([gamePassGames, contentfulFooterGamesRow.games]),
  }

  const games = mergeListsWithKey([gamePassGames, contentfulGames])
  const carouselGames = mergeListsWithKey([
    gamePassGames,
    contentfulCarouselGames,
  ])

  return {
    props: {
      carouselGames,
      footerGamesRow,
      games,
    },
  }
}
