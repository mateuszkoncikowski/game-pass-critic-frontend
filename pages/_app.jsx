import { ChakraProvider } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={true}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="keywords" content="xbox, gamepass" />
        <title>Game Pass Critic</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="../public/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="../public/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../public/favicon-16x16.png"
        />
        <link rel="manifest" href="../public/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
