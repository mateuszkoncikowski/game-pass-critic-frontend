import { Box, Flex, Heading, Img } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'

import { getGameId, getHeroArtImageUrl, getTitle } from '../meta/gamePassGame'

const GameCarousel = ({ carouselGames }) => (
  <Carousel showThumbs={false} showIndicators={false} showStatus={false}>
    {carouselGames.map((carouselGame) => (
      <Box key={getGameId(carouselGame)} position="relative" color="white">
        <Img
          style={{ objectFit: 'cover' }}
          height="400px"
          alt={getTitle(carouselGame)}
          src={`https:${getHeroArtImageUrl(carouselGame)}`}
        />
        <Flex
          position="absolute"
          direction="column"
          top="0%"
          right="5%"
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
            <Heading size="xl">
              <Heading size="xl">{getTitle(carouselGame)}</Heading>
            </Heading>
          </Box>
        </Flex>
      </Box>
    ))}
  </Carousel>
)

export default GameCarousel
