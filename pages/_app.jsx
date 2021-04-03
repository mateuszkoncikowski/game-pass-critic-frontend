import '../public/pagination.css'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Head from 'next/Head'

const theme = extendTheme({
  fonts: {
    heading: 'halyard-display',
    body: 'halyard-display',
  },
})

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <Head>
        <title>Game Pass Critic</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
