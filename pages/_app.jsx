import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'

import { GA_ID } from '../constants/constants'

const theme = extendTheme({
  fonts: {
    heading: 'halyard-display',
    body: 'halyard-display',
  },
})

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="keywords" content="xbox, gamepass" />
        <title>Game Pass Critic</title>
        <link rel="stylesheet" href="https://use.typekit.net/fff7ftw.css" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
          `,
          }}
        />
      </Helmet>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
