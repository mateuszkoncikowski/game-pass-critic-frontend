import { Box, Text } from '@chakra-ui/react'
import { always, cond, equals, lte, T } from 'ramda'

export const scoreCond = cond([
  [lte(75), always('green')],
  [lte(50), always('orange')],
  [lte(1), always('red')],
  [equals(0), always('grey')],
  [T, always('grey')],
])

export const userScoreCond = cond([
  [lte(7.5), always('green')],
  [lte(5.0), always('orange')],
  [lte(1.0), always('red')],
  [equals(0), always('grey')],
  [T, always('grey')],
])

export default function ScoreBox({
  score,
  scoreColorsConditions,
  size,
  ...props
}) {
  return (
    <Box
      bg={scoreColorsConditions(score)}
      borderRadius="6px"
      h={size === 'small' ? '30px' : '50px'}
      w={size === 'small' ? '30px' : '50px'}
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Text
        fontSize={size === 'small' ? 'md' : 'xl'}
        fontWeight="bold"
        color="white"
      >
        {score ? score : 'N/A'}
      </Text>
    </Box>
  )
}
