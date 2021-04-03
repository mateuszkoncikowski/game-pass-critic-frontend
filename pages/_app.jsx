import '../public/pagination.css'
import '../public/styles.css'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'halyard-display',
    body: 'halyard-display',
  },
})

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
