import { Box, Flex, Heading } from '@chakra-ui/react'
import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'

import { getGameId, getHeroArtImageUrl, getTitle } from '../meta/gamePassGame'
import ArrowIcon from './ArrowIcon'

const arrowStyles = {
  position: 'absolute',
  zIndex: 2,
  top: 'calc(50% - 15px)',
  width: 30,
  height: 30,
  cursor: 'pointer',
}

const GameCarousel = ({ games }) => (
  <Box display={{ base: 'none', md: 'block' }}>
    <Carousel
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      autoPlay
      infiniteLoop
      interval={5000}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, left: 15 }}
          >
            <ArrowIcon color="white" direction="left" />
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, right: 15 }}
          >
            <ArrowIcon color="white" direction="right" />
          </button>
        )
      }
    >
      {games.map((carouselGame) => (
        <Box key={getGameId(carouselGame)} position="relative" color="white">
          <Image
            height="400px"
            width="1200px"
            alt={getTitle(carouselGame)}
            src={`https:${getHeroArtImageUrl(carouselGame)}`}
            className="carouselImage"
          />
          <Flex
            position="absolute"
            direction="column"
            top="0%"
            right="7%"
            height="100%"
            textAlign="right"
            justifyContent="space-around"
          >
            <Box>
              <Heading size="3xl">{carouselGame.metaCriticScore}</Heading>
              <Heading size="xl">Critic Score</Heading>
            </Box>
            <Box>
              <Heading size="3xl">{carouselGame.metaCriticUserScore}</Heading>
              <Heading size="xl">User Score</Heading>
            </Box>
            <Box>
              <Heading size="3xl">{carouselGame.howLongToBeatHours[0]}</Heading>
              <Heading size="xl">Time to beat</Heading>
            </Box>
          </Flex>
          <Flex position="absolute" left="5%" bottom="5%">
            <Box>
              <Heading size="xl">{getTitle(carouselGame)}</Heading>
            </Box>
          </Flex>
        </Box>
      ))}
    </Carousel>
  </Box>
)

export default GameCarousel
