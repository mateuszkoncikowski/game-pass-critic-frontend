import { ChakraProvider } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={true}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="keywords" content="xbox, gamepass" />
        <title>Game Pass Critic</title>
      </Helmet>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
