import { Box, Flex } from '@chakra-ui/react'

const GalleryDataRow = ({ icon, category, value, highlighted = false }) => (
  <Flex justifyContent="space-between" color="gray.600" py={1}>
    <Box>
      <Flex>
        <Box mr={1}>{icon}</Box>
        <Box fontWeight={highlighted ? 'bold' : 'normal'}>{value}</Box>
      </Flex>
    </Box>
    <Box>{category}</Box>
  </Flex>
)

export default GalleryDataRow
