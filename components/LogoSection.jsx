import { Box, Container } from '@chakra-ui/react'

import Logo from '../public/logo.svg'

const LogoSection = () => (
  <Container my={7} w={{ base: '100%' }} centerContent>
    <Box>
      <Logo />
    </Box>
  </Container>
)

export default LogoSection
