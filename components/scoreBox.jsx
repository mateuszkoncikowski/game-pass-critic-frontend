import { Box, Text } from '@chakra-ui/react'
import { always, cond, gte, lte, T } from 'ramda'

const getScoreColor = cond([
  [lte(75), always('green')],
  [lte(50), always('orange')],
  [gte(49), always('red')],
  [T, always('grey')],
])

export default function ScoreBox({ score }) {
  return (
    <Box
      bg={getScoreColor(score)}
      borderRadius="6px"
      h="50px"
      w="50px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="xl" fontWeight="bold" color="white">
        {score ? score : 'N/A'}
      </Text>
    </Box>
  )
}
