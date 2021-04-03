import { Box, Container } from '@chakra-ui/react'

import Logo from '../public/logo.svg'

const LogoSection = () => (
  <Container mb={7} w={{ base: '100%' }} centerContent>
    <Box w="80%">
      <Logo />
    </Box>
  </Container>
)

export default LogoSection
