import { Box, Flex, Img } from '@chakra-ui/react'

import { getPosterImageUrl, getTitle } from '../meta/gamePassGame'
import ClockIcon from '../public/clockWhite.svg'
import CriticScoreIcon from '../public/criticWhite.svg'
import UserScoreIcon from '../public/userWhite.svg'

const FooterGameCard = ({ game }) => (
  <Box>
    <Img
      border="1px"
      borderRadius="10px"
      borderColor="#2fb12f"
      height="400px"
      transform="rotate(3deg)"
      alt={getTitle(game)}
      src={getPosterImageUrl(game)}
    />
    <Flex justifyContent="space-between" color="white" my={5}>
      <Flex flexDirection="column" alignContent="center" alignItems="center">
        <Box>
          <CriticScoreIcon />
        </Box>
        <Box>{game.metaCriticScore}</Box>
      </Flex>
      <Flex flexDirection="column" alignContent="center" alignItems="center">
        <Box>
          <UserScoreIcon />
        </Box>
        <Box>{game.metaCriticUserScore}</Box>
      </Flex>
      <Flex flexDirection="column" alignContent="center" alignItems="center">
        <Box>
          <ClockIcon />
        </Box>
        <Box>{game.howLongToBeatHours[0]}</Box>
      </Flex>
    </Flex>
  </Box>
)

export default FooterGameCard
