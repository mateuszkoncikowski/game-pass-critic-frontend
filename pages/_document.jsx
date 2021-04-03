import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react'

import { GA_ID } from '../constants/constants'

export default class extends Document {
  render() {
    return (
      <html>
        <Head>
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
            gtag('config', '${GA_ID}');
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
