import { Box, Flex } from '@chakra-ui/react'

const GalleryDataRow = ({ icon, category, value }) => (
  <Flex justifyContent="space-between" color="gray.600" py={1}>
    <Box>
      <Flex>
        <Box mr={1}>{icon}</Box>
        <Box>{value}</Box>
      </Flex>
    </Box>
    <Box>{category}</Box>
  </Flex>
)

export default GalleryDataRow
